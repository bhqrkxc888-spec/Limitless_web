-- Migration: Create asset management tables
-- Description: Tables for website asset management (images, logos, etc.)

-- ============================================================================
-- Create web.site_assets table
-- ============================================================================

CREATE TABLE IF NOT EXISTS web.site_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_type text NOT NULL CHECK (asset_type IN (
    'site_logo',
    'favicon',
    'destination_hero',
    'cruise_line_logo',
    'cruise_line_card',
    'cruise_line_hero',
    'ship_card',
    'ship_hero'
  )),
  entity_key text NULL, -- null for site assets; slug/key for destination/line/ship
  url text NOT NULL,
  width int,
  height int,
  bytes int,
  mime text,
  has_alpha boolean,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(asset_type, entity_key)
);

-- Index for faster lookups
CREATE INDEX idx_site_assets_type_key ON web.site_assets(asset_type, entity_key);
CREATE INDEX idx_site_assets_updated ON web.site_assets(updated_at DESC);

-- ============================================================================
-- Create web.destination_catalog table
-- ============================================================================

CREATE TABLE IF NOT EXISTS web.destination_catalog (
  slug text PRIMARY KEY,
  name text NOT NULL,
  region text NULL,
  enabled boolean DEFAULT true,
  sort_order int DEFAULT 0
);

-- Index for enabled destinations
CREATE INDEX idx_destination_catalog_enabled ON web.destination_catalog(enabled, sort_order);

-- ============================================================================
-- RLS Policies
-- ============================================================================

-- Enable RLS
ALTER TABLE web.site_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE web.destination_catalog ENABLE ROW LEVEL SECURITY;

-- Public SELECT policies
CREATE POLICY "Public can view site assets"
  ON web.site_assets FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view destination catalog"
  ON web.destination_catalog FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin policies for site_assets (authenticated users can modify)
CREATE POLICY "Authenticated can insert site assets"
  ON web.site_assets FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update site assets"
  ON web.site_assets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete site assets"
  ON web.site_assets FOR DELETE
  TO authenticated
  USING (true);

-- Admin policies for destination_catalog
CREATE POLICY "Authenticated can insert destinations"
  ON web.destination_catalog FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update destinations"
  ON web.destination_catalog FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete destinations"
  ON web.destination_catalog FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- Add helpful comments
-- ============================================================================

COMMENT ON TABLE web.site_assets IS 'Stores website asset metadata (images, logos) with links to Vercel Blob storage';
COMMENT ON TABLE web.destination_catalog IS 'Editable catalog of destinations for the website';

COMMENT ON COLUMN web.site_assets.entity_key IS 'Null for site-level assets, slug/key for entity-specific assets';
COMMENT ON COLUMN web.site_assets.has_alpha IS 'True if image has transparency channel (required for logos)';

