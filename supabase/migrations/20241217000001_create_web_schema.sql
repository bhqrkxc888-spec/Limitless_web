-- Migration: Create web schema and tables for website admin
-- Description: Add web.site_settings and web.site_documents tables for managing
-- legal documents and business info through the admin interface

-- Create web schema
CREATE SCHEMA IF NOT EXISTS web;

-- ============================================================================
-- web.site_settings table
-- ============================================================================
-- Stores site-wide configuration including contact info, socials, and hours
CREATE TABLE IF NOT EXISTS web.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key text UNIQUE NOT NULL,
  site_logo_url text,
  favicon_url text,
  contact_json jsonb DEFAULT '{}'::jsonb,
  socials_json jsonb DEFAULT '{}'::jsonb,
  opening_hours_json jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Index for fast lookup by site_key
CREATE INDEX IF NOT EXISTS idx_site_settings_site_key ON web.site_settings(site_key);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION web.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = web, public;

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON web.site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON web.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION web.update_updated_at_column();

-- ============================================================================
-- web.site_documents table
-- ============================================================================
-- Stores legal documents and other site content
CREATE TABLE IF NOT EXISTS web.site_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_site_documents_slug ON web.site_documents(slug);
CREATE INDEX IF NOT EXISTS idx_site_documents_status ON web.site_documents(status);

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_site_documents_updated_at ON web.site_documents;
CREATE TRIGGER update_site_documents_updated_at
  BEFORE UPDATE ON web.site_documents
  FOR EACH ROW
  EXECUTE FUNCTION web.update_updated_at_column();

-- Trigger to set published_at when status changes to published
CREATE OR REPLACE FUNCTION web.set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  ELSIF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = web, public;

DROP TRIGGER IF EXISTS set_site_documents_published_at ON web.site_documents;
CREATE TRIGGER set_site_documents_published_at
  BEFORE UPDATE ON web.site_documents
  FOR EACH ROW
  EXECUTE FUNCTION web.set_published_at();

-- ============================================================================
-- RLS Policies
-- ============================================================================

-- Enable RLS
ALTER TABLE web.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE web.site_documents ENABLE ROW LEVEL SECURITY;

-- Public read access to site_settings
DROP POLICY IF EXISTS "Public can view site settings" ON web.site_settings;
CREATE POLICY "Public can view site settings"
  ON web.site_settings
  FOR SELECT
  USING (true);

-- Public can only view published documents
DROP POLICY IF EXISTS "Public can view published documents" ON web.site_documents;
CREATE POLICY "Public can view published documents"
  ON web.site_documents
  FOR SELECT
  USING (status = 'published');

-- Authenticated users (admin) have full access to site_settings
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON web.site_settings;
CREATE POLICY "Authenticated users can manage site settings"
  ON web.site_settings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users (admin) have full access to site_documents
DROP POLICY IF EXISTS "Authenticated users can manage site documents" ON web.site_documents;
CREATE POLICY "Authenticated users can manage site documents"
  ON web.site_documents
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- Comments for documentation
-- ============================================================================

COMMENT ON SCHEMA web IS 'Schema for website-specific data managed through admin interface';
COMMENT ON TABLE web.site_settings IS 'Site-wide settings including contact info, socials, and opening hours';
COMMENT ON TABLE web.site_documents IS 'Legal documents and other site content with draft/published workflow';
COMMENT ON COLUMN web.site_settings.site_key IS 'Unique key for the site instance (use "main")';
COMMENT ON COLUMN web.site_settings.contact_json IS 'JSON object with phone, email, address fields';
COMMENT ON COLUMN web.site_settings.socials_json IS 'JSON object with social media URLs';
COMMENT ON COLUMN web.site_settings.opening_hours_json IS 'JSON object with opening hours per day';
COMMENT ON COLUMN web.site_documents.slug IS 'URL-friendly identifier (e.g., terms, privacy, booking-terms)';
COMMENT ON COLUMN web.site_documents.status IS 'Publication status: draft or published';

