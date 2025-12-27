-- ============================================================================
-- SITE IMAGES METADATA TABLE
-- ============================================================================
-- 
-- This table stores metadata for all static site images (destinations, cruise
-- lines, ships, categories, site assets, team photos).
--
-- Purpose: Track image compliance, validation warnings, ALT text, and upload history
-- Note: CMS content (offers, news, guides) continues to use existing tables
--
-- ============================================================================

CREATE TABLE IF NOT EXISTS site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Storage location
  bucket TEXT NOT NULL,
  path TEXT NOT NULL,
  
  -- Entity association
  entity_type TEXT NOT NULL, -- 'site', 'destination', 'cruise-line', 'ship', 'category', 'team'
  entity_id TEXT, -- slug or identifier (e.g., 'caribbean', 'royal-caribbean')
  image_type TEXT NOT NULL, -- 'hero', 'card', 'logo', 'exterior', 'deck', 'suite', 'dining', etc.
  
  -- Image metadata
  alt_text TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  file_size INTEGER, -- bytes
  format TEXT, -- 'webp', 'jpeg', 'png', 'svg'
  
  -- Audit trail
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id),
  
  -- SEO compliance tracking
  seo_compliant BOOLEAN DEFAULT true,
  validation_warnings JSONB, -- Array of warning objects: [{type: 'file_size', message: '...'}]
  
  -- Ensure unique paths per bucket
  UNIQUE(bucket, path),
  
  -- Indexes for common queries
  CONSTRAINT site_images_entity_type_check CHECK (
    entity_type IN ('site', 'destination', 'cruise-line', 'ship', 'category', 'team')
  ),
  CONSTRAINT site_images_format_check CHECK (
    format IN ('webp', 'jpeg', 'png', 'svg', 'jpg')
  )
);

-- Create indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_site_images_entity ON site_images(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_site_images_bucket_path ON site_images(bucket, path);
CREATE INDEX IF NOT EXISTS idx_site_images_compliance ON site_images(seo_compliant);
CREATE INDEX IF NOT EXISTS idx_site_images_uploaded_at ON site_images(uploaded_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- RLS is DISABLED because admin area uses custom cookie-based auth
-- Admin routes are already protected by the custom authentication system
ALTER TABLE site_images DISABLE ROW LEVEL SECURITY;

-- Note: If you switch to Supabase auth in the future, enable RLS and use:
-- ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "site_images_public_read" ON site_images FOR SELECT USING (true);
-- CREATE POLICY "site_images_authenticated_insert" ON site_images FOR INSERT WITH CHECK (true);
-- CREATE POLICY "site_images_authenticated_update" ON site_images FOR UPDATE USING (true);
-- CREATE POLICY "site_images_authenticated_delete" ON site_images FOR DELETE USING (true);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get all images for an entity
CREATE OR REPLACE FUNCTION get_entity_images(
  p_entity_type TEXT,
  p_entity_id TEXT
)
RETURNS TABLE (
  id UUID,
  bucket TEXT,
  path TEXT,
  image_type TEXT,
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  format TEXT,
  seo_compliant BOOLEAN,
  validation_warnings JSONB,
  uploaded_at TIMESTAMPTZ,
  public_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    si.id,
    si.bucket,
    si.path,
    si.image_type,
    si.alt_text,
    si.width,
    si.height,
    si.file_size,
    si.format,
    si.seo_compliant,
    si.validation_warnings,
    si.uploaded_at,
    -- Construct public URL (note: replace with your project URL)
    'https://' || current_setting('app.settings.supabase_project_id', true) || 
    '.supabase.co/storage/v1/object/public/' || si.bucket || '/' || si.path AS public_url
  FROM site_images si
  WHERE si.entity_type = p_entity_type
    AND si.entity_id = p_entity_id
  ORDER BY si.image_type, si.uploaded_at DESC;
END;
$$;

-- Function to check compliance status for an entity
CREATE OR REPLACE FUNCTION check_entity_compliance(
  p_entity_type TEXT,
  p_entity_id TEXT
)
RETURNS TABLE (
  total_images INTEGER,
  compliant_images INTEGER,
  images_with_warnings INTEGER,
  compliance_percentage NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total INTEGER;
  v_compliant INTEGER;
  v_warnings INTEGER;
BEGIN
  SELECT 
    COUNT(*)::INTEGER,
    COUNT(*) FILTER (WHERE seo_compliant = true)::INTEGER,
    COUNT(*) FILTER (WHERE validation_warnings IS NOT NULL AND jsonb_array_length(validation_warnings) > 0)::INTEGER
  INTO v_total, v_compliant, v_warnings
  FROM site_images
  WHERE entity_type = p_entity_type
    AND entity_id = p_entity_id;
  
  RETURN QUERY
  SELECT 
    v_total,
    v_compliant,
    v_warnings,
    CASE WHEN v_total > 0 THEN ROUND((v_compliant::NUMERIC / v_total::NUMERIC) * 100, 2) ELSE 0 END;
END;
$$;

-- ============================================================================
-- SAMPLE QUERIES
-- ============================================================================
-- 
-- Get all destination images:
--   SELECT * FROM get_entity_images('destination', 'caribbean');
--
-- Check compliance for a cruise line:
--   SELECT * FROM check_entity_compliance('cruise-line', 'royal-caribbean');
--
-- Get all non-compliant images:
--   SELECT * FROM site_images WHERE seo_compliant = false;
--
-- Get images with specific warnings:
--   SELECT * FROM site_images 
--   WHERE validation_warnings @> '[{"type": "file_size"}]'::jsonb;
--
-- ============================================================================

COMMENT ON TABLE site_images IS 'Metadata for static site images with SEO compliance tracking';
COMMENT ON COLUMN site_images.entity_type IS 'Type of entity: site, destination, cruise-line, ship, category, team';
COMMENT ON COLUMN site_images.entity_id IS 'Slug or identifier for the entity (e.g., caribbean, royal-caribbean)';
COMMENT ON COLUMN site_images.image_type IS 'Type of image: hero, card, logo, exterior, deck, suite, dining, pool, entertainment, spa, theater';
COMMENT ON COLUMN site_images.validation_warnings IS 'JSON array of validation warnings: [{type, message, severity}]';
COMMENT ON COLUMN site_images.seo_compliant IS 'True if image passes all validation rules without errors';

