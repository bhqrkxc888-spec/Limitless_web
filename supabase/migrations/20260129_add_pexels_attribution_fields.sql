-- ============================================================================
-- ADD PEXELS API ATTRIBUTION FIELDS TO SITE_IMAGES
-- ============================================================================
-- Migration Date: 2026-01-29
-- Purpose: Enable tracking of Pexels API-sourced images with proper attribution
--
-- CHANGES:
-- 1. Add source field to distinguish manual vs API-fetched images
-- 2. Add photographer attribution fields (name, URL)
-- 3. Add search query tracking for debugging/analytics
-- 4. Add external_id for Pexels image reference
-- 5. Create indexes for efficient querying
-- ============================================================================

-- Add source field to track image origin
ALTER TABLE public.site_images
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual';

COMMENT ON COLUMN public.site_images.source IS 
'Image source: "manual" for uploaded images, "pexels" for API-fetched images';

-- Add photographer attribution fields
ALTER TABLE public.site_images
ADD COLUMN IF NOT EXISTS photographer_name TEXT;

ALTER TABLE public.site_images
ADD COLUMN IF NOT EXISTS photographer_url TEXT;

COMMENT ON COLUMN public.site_images.photographer_name IS 
'Photographer name for attribution (required for Pexels images)';

COMMENT ON COLUMN public.site_images.photographer_url IS 
'Link to photographer profile on Pexels';

-- Add search query tracking
ALTER TABLE public.site_images
ADD COLUMN IF NOT EXISTS search_query TEXT;

COMMENT ON COLUMN public.site_images.search_query IS 
'Search query used to find this image via Pexels API';

-- Add external ID for Pexels reference
ALTER TABLE public.site_images
ADD COLUMN IF NOT EXISTS external_id TEXT;

COMMENT ON COLUMN public.site_images.external_id IS 
'External image ID from Pexels API for reference/deduplication';

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Index for filtering by source (manual vs pexels)
CREATE INDEX IF NOT EXISTS idx_site_images_source 
ON public.site_images(source);

-- Index for finding images by external ID (prevent duplicates)
CREATE INDEX IF NOT EXISTS idx_site_images_external_id 
ON public.site_images(external_id) 
WHERE external_id IS NOT NULL;

-- Composite index for Pexels images by port
CREATE INDEX IF NOT EXISTS idx_site_images_pexels_port 
ON public.site_images(entity_id, source) 
WHERE entity_type = 'port-guide' AND source = 'pexels';

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get all Pexels images for a port with attribution
CREATE OR REPLACE FUNCTION public.get_port_pexels_images(
  p_port_slug TEXT
)
RETURNS TABLE (
  id UUID,
  path TEXT,
  image_type TEXT,
  alt_text TEXT,
  photographer_name TEXT,
  photographer_url TEXT,
  search_query TEXT,
  external_id TEXT,
  public_url TEXT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
DECLARE
  v_supabase_url TEXT;
BEGIN
  -- Get Supabase project URL
  BEGIN
    v_supabase_url := current_setting('app.settings.supabase_url', true);
  EXCEPTION WHEN OTHERS THEN
    v_supabase_url := 'https://xrbusklskmeaamwynfmm.supabase.co';
  END;

  RETURN QUERY
  SELECT 
    si.id,
    si.path,
    si.image_type,
    si.alt_text,
    si.photographer_name,
    si.photographer_url,
    si.search_query,
    si.external_id,
    v_supabase_url || '/storage/v1/object/public/' || si.bucket || '/' || si.path AS public_url
  FROM public.site_images si
  WHERE si.entity_type = 'port-guide'
    AND si.entity_id = p_port_slug
    AND si.source = 'pexels'
  ORDER BY si.image_type, si.path;
END;
$$;

COMMENT ON FUNCTION public.get_port_pexels_images IS 
'Get all Pexels-sourced images for a port guide with attribution data.
Example: SELECT * FROM get_port_pexels_images(''barcelona'');';

-- Function to check if Pexels image already exists (by external_id)
CREATE OR REPLACE FUNCTION public.pexels_image_exists(
  p_external_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 
    FROM public.site_images
    WHERE external_id = p_external_id
      AND source = 'pexels'
  );
END;
$$;

COMMENT ON FUNCTION public.pexels_image_exists IS 
'Check if a Pexels image has already been imported (prevents duplicates).
Example: SELECT pexels_image_exists(''12345678'');';

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_port_pexels_images TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.pexels_image_exists TO anon, authenticated;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '=== PEXELS ATTRIBUTION MIGRATION COMPLETE ===';
  RAISE NOTICE '';
  RAISE NOTICE 'New columns added to site_images:';
  RAISE NOTICE '  - source (default: manual)';
  RAISE NOTICE '  - photographer_name';
  RAISE NOTICE '  - photographer_url';
  RAISE NOTICE '  - search_query';
  RAISE NOTICE '  - external_id';
  RAISE NOTICE '';
  RAISE NOTICE 'New functions:';
  RAISE NOTICE '  - get_port_pexels_images(port_slug)';
  RAISE NOTICE '  - pexels_image_exists(external_id)';
  RAISE NOTICE '';
  RAISE NOTICE 'Verify with: SELECT column_name FROM information_schema.columns WHERE table_name = ''site_images'';';
END;
$$;
