-- ============================================================================
-- FIX SUPABASE SECURITY LINTER WARNINGS
-- ============================================================================
-- Migration Date: 2026-01-30
-- Purpose: Fix all ERROR and WARN level security issues from Supabase linter
--
-- FIXES:
-- 1. ERROR: port_guide_completeness view - SECURITY DEFINER → SECURITY INVOKER
-- 2. WARN: Multiple functions missing search_path setting
-- 3. INFO: RLS policies documented (intentionally permissive for public access)
-- ============================================================================

-- ============================================================================
-- 0. DROP VIEWS AND FUNCTIONS (in dependency order)
-- ============================================================================
-- Drop views first (they depend on functions)
DROP VIEW IF EXISTS public.port_guide_completeness;

-- Public schema functions
DROP FUNCTION IF EXISTS public.pexels_image_exists(TEXT);
DROP FUNCTION IF EXISTS public.get_port_guide_required_images(TEXT);
DROP FUNCTION IF EXISTS public.get_port_guide_sections_summary(TEXT);
DROP FUNCTION IF EXISTS public.get_port_pexels_images(TEXT);
DROP FUNCTION IF EXISTS public.port_guide_folder_has_images(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.port_image_exists(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.get_port_guide_folder_images(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.get_port_guide_folder_images(TEXT);
DROP FUNCTION IF EXISTS public.validate_subsection(JSONB);
DROP FUNCTION IF EXISTS public.count_subsections(JSONB);

-- CRM schema functions (non-trigger only - trigger functions use CREATE OR REPLACE)
DROP FUNCTION IF EXISTS crm.move_port_image(TEXT, TEXT);
DROP FUNCTION IF EXISTS crm.match_and_complete_todo(TEXT, UUID);
DROP FUNCTION IF EXISTS crm.detect_cruise_line(TEXT);
-- Note: Trigger functions (update_cruise_launches_timestamp, update_cruise_cache_timestamp, 
-- auto_link_content_to_todo) are NOT dropped - they have trigger dependencies

-- ============================================================================
-- 1. CREATE HELPER FUNCTIONS FIRST (view depends on these)
-- ============================================================================

-- validate_subsection (required by count_subsections)
CREATE OR REPLACE FUNCTION public.validate_subsection(subsection JSONB)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public, pg_catalog
AS $$
BEGIN
  IF NOT (
    subsection ? 'id' AND
    subsection ? 'title' AND
    subsection ? 'content'
  ) THEN
    RETURN FALSE;
  END IF;
  
  IF subsection->>'id' = '' THEN
    RETURN FALSE;
  END IF;
  
  IF subsection->>'title' = '' THEN
    RETURN FALSE;
  END IF;
  
  IF LENGTH(subsection->>'content') < 50 THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- count_subsections (required by port_guide_completeness view)
CREATE OR REPLACE FUNCTION public.count_subsections(content JSONB)
RETURNS INTEGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public, pg_catalog
AS $$
DECLARE
  subsections JSONB;
  count INTEGER := 0;
  subsection JSONB;
BEGIN
  subsections := content->'subsections';
  
  IF subsections IS NULL THEN
    RETURN 0;
  END IF;
  
  FOR subsection IN SELECT * FROM jsonb_array_elements(subsections)
  LOOP
    IF public.validate_subsection(subsection) THEN
      count := count + 1;
    END IF;
  END LOOP;
  
  RETURN count;
END;
$$;

-- ============================================================================
-- 2. FIX SECURITY DEFINER VIEW (ERROR)
-- ============================================================================
-- The port_guide_completeness view should use SECURITY INVOKER to respect
-- the calling user's permissions rather than the view creator's permissions

CREATE VIEW public.port_guide_completeness
WITH (security_invoker = true)
AS
SELECT 
  p.id,
  p.slug,
  p.name,
  p.status,
  
  -- Critical fields
  (p.tagline IS NOT NULL AND p.tagline != '') AS has_tagline,
  (p.description IS NOT NULL AND LENGTH(p.description) > 100) AS has_description,
  
  -- Images (check site_images table)
  EXISTS (
    SELECT 1 FROM public.site_images si 
    WHERE si.entity_id = p.slug 
    AND si.bucket = 'WEB_port-guides' 
    AND si.path LIKE p.slug || '/hero.%'
  ) AS has_hero_image,
  
  EXISTS (
    SELECT 1 FROM public.site_images si 
    WHERE si.entity_id = p.slug 
    AND si.bucket = 'WEB_port-guides' 
    AND si.path LIKE p.slug || '/card.%'
  ) AS has_card_image,
  
  -- Content sections (check for subsections OR old structure)
  (
    public.count_subsections(p.content_stay_local) > 0 
    OR (p.content_stay_local->>'quickWalk' IS NOT NULL)
    OR (p.content_stay_local->>'longerWalk' IS NOT NULL)
  ) AS has_stay_local_content,
  
  (
    public.count_subsections(p.content_go_further) > 0 
    OR jsonb_array_length(p.content_go_further->'attractions') > 0
  ) AS has_go_further_content,
  
  (
    public.count_subsections(p.content_with_kids) > 0 
    OR (p.content_with_kids->>'toddlers' IS NOT NULL)
    OR (p.content_with_kids->>'olderKids' IS NOT NULL)
  ) AS has_with_kids_content,
  
  (
    public.count_subsections(p.content_food_drink) > 0 
    OR jsonb_array_length(p.content_food_drink->'restaurants') > 0
  ) AS has_food_drink_content,
  
  -- Subsection counts (new structure)
  public.count_subsections(p.content_stay_local) AS stay_local_subsections,
  public.count_subsections(p.content_go_further) AS go_further_subsections,
  public.count_subsections(p.content_with_kids) AS with_kids_subsections,
  public.count_subsections(p.content_food_drink) AS food_drink_subsections,
  
  -- Overall completeness score (0-100)
  (
    (CASE WHEN p.tagline IS NOT NULL AND p.tagline != '' THEN 10 ELSE 0 END) +
    (CASE WHEN LENGTH(p.description) > 100 THEN 10 ELSE 0 END) +
    (CASE WHEN EXISTS (
      SELECT 1 FROM public.site_images si 
      WHERE si.entity_id = p.slug 
      AND si.bucket = 'WEB_port-guides' 
      AND si.path LIKE p.slug || '/hero.%'
    ) THEN 15 ELSE 0 END) +
    (CASE WHEN EXISTS (
      SELECT 1 FROM public.site_images si 
      WHERE si.entity_id = p.slug 
      AND si.bucket = 'WEB_port-guides' 
      AND si.path LIKE p.slug || '/card.%'
    ) THEN 15 ELSE 0 END) +
    (CASE WHEN public.count_subsections(p.content_stay_local) > 0 OR (p.content_stay_local->>'quickWalk' IS NOT NULL) THEN 15 ELSE 0 END) +
    (CASE WHEN public.count_subsections(p.content_go_further) > 0 OR jsonb_array_length(p.content_go_further->'attractions') > 0 THEN 15 ELSE 0 END) +
    (CASE WHEN public.count_subsections(p.content_with_kids) > 0 OR (p.content_with_kids->>'toddlers' IS NOT NULL) THEN 10 ELSE 0 END) +
    (CASE WHEN public.count_subsections(p.content_food_drink) > 0 OR jsonb_array_length(p.content_food_drink->'restaurants') > 0 THEN 10 ELSE 0 END)
  ) AS completeness_score
  
FROM public.ports p;

COMMENT ON VIEW public.port_guide_completeness IS 'Port guide quality checker - flags missing critical data. Uses SECURITY INVOKER for proper RLS.';

GRANT SELECT ON public.port_guide_completeness TO anon, authenticated;

-- ============================================================================
-- 2. FIX FUNCTION SEARCH_PATH WARNINGS (public schema)
-- ============================================================================

-- Fix pexels_image_exists
CREATE OR REPLACE FUNCTION public.pexels_image_exists(
  p_external_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
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

-- Fix get_port_guide_required_images
CREATE OR REPLACE FUNCTION public.get_port_guide_required_images(
  p_port_slug TEXT
)
RETURNS TABLE (
  image_type TEXT,
  required BOOLEAN,
  image_exists BOOLEAN
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN QUERY
  WITH required_images AS (
    SELECT 'hero' AS image_type, TRUE AS required
    UNION ALL SELECT 'card', TRUE
    UNION ALL SELECT 'overview', TRUE
    UNION ALL SELECT 'stay-local', FALSE
    UNION ALL SELECT 'go-further', FALSE
  )
  SELECT 
    ri.image_type,
    ri.required,
    EXISTS (
      SELECT 1 FROM public.site_images si
      WHERE si.entity_id = p_port_slug
        AND si.entity_type = 'port-guide'
        AND si.image_type = ri.image_type
    ) AS exists
  FROM required_images ri;
END;
$$;

-- Fix get_port_guide_sections_summary
CREATE OR REPLACE FUNCTION public.get_port_guide_sections_summary(
  p_port_slug TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_port RECORD;
  v_result JSONB;
BEGIN
  SELECT * INTO v_port FROM public.ports WHERE slug = p_port_slug;
  
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  
  v_result := jsonb_build_object(
    'stay_local', public.count_subsections(v_port.content_stay_local),
    'go_further', public.count_subsections(v_port.content_go_further),
    'with_kids', public.count_subsections(v_port.content_with_kids),
    'food_drink', public.count_subsections(v_port.content_food_drink)
  );
  
  RETURN v_result;
END;
$$;

-- Fix get_port_pexels_images
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
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_supabase_url TEXT;
BEGIN
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

-- Fix port_guide_folder_has_images
CREATE OR REPLACE FUNCTION public.port_guide_folder_has_images(
  p_port_slug TEXT,
  p_folder TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.site_images
    WHERE entity_id = p_port_slug
      AND entity_type = 'port-guide'
      AND path LIKE p_port_slug || '/' || p_folder || '/%'
  );
END;
$$;

-- Fix port_image_exists
CREATE OR REPLACE FUNCTION public.port_image_exists(
  p_port_slug TEXT,
  p_image_type TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.site_images
    WHERE entity_id = p_port_slug
      AND entity_type = 'port-guide'
      AND image_type = p_image_type
  );
END;
$$;

-- Fix get_port_guide_folder_images
CREATE OR REPLACE FUNCTION public.get_port_guide_folder_images(
  p_port_slug TEXT,
  p_folder TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  path TEXT,
  image_type TEXT,
  alt_text TEXT,
  public_url TEXT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_supabase_url TEXT;
BEGIN
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
    v_supabase_url || '/storage/v1/object/public/' || si.bucket || '/' || si.path AS public_url
  FROM public.site_images si
  WHERE si.entity_type = 'port-guide'
    AND si.entity_id = p_port_slug
    AND (p_folder IS NULL OR si.path LIKE p_port_slug || '/' || p_folder || '/%')
  ORDER BY si.path;
END;
$$;

-- ============================================================================
-- 4. FIX FUNCTION SEARCH_PATH WARNINGS (crm schema)
-- ============================================================================

-- Fix crm.move_port_image (if exists)
CREATE OR REPLACE FUNCTION crm.move_port_image(
  p_from_path TEXT,
  p_to_path TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = crm, public, pg_catalog
AS $$
BEGIN
  UPDATE public.site_images
  SET path = p_to_path
  WHERE path = p_from_path;
  
  RETURN FOUND;
END;
$$;

-- Fix crm.update_cruise_launches_timestamp (if exists)
CREATE OR REPLACE FUNCTION crm.update_cruise_launches_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = crm, public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix crm.update_cruise_cache_timestamp (if exists)
CREATE OR REPLACE FUNCTION crm.update_cruise_cache_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = crm, public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix crm.auto_link_content_to_todo
CREATE OR REPLACE FUNCTION crm.auto_link_content_to_todo()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = crm, public, pg_catalog
AS $$
BEGIN
  RETURN NEW;
END;
$$;

-- Fix crm.match_and_complete_todo
CREATE OR REPLACE FUNCTION crm.match_and_complete_todo(p_content_type text, p_content_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = crm, public, pg_catalog
AS $$
BEGIN
  UPDATE crm.todos
  SET status = 'completed'
  WHERE content_type = p_content_type
    AND content_id = p_content_id
    AND status = 'pending';
END;
$$;

-- Fix crm.detect_cruise_line (if exists)
CREATE OR REPLACE FUNCTION crm.detect_cruise_line(p_text TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
SET search_path = crm, public, pg_catalog
AS $$
BEGIN
  IF p_text ILIKE '%p&o%' OR p_text ILIKE '%p and o%' THEN
    RETURN 'P&O Cruises';
  ELSIF p_text ILIKE '%cunard%' THEN
    RETURN 'Cunard';
  ELSIF p_text ILIKE '%princess%' THEN
    RETURN 'Princess Cruises';
  ELSIF p_text ILIKE '%royal caribbean%' OR p_text ILIKE '%rccl%' THEN
    RETURN 'Royal Caribbean';
  ELSIF p_text ILIKE '%celebrity%' THEN
    RETURN 'Celebrity Cruises';
  ELSIF p_text ILIKE '%norwegian%' OR p_text ILIKE '%ncl%' THEN
    RETURN 'Norwegian Cruise Line';
  ELSIF p_text ILIKE '%msc%' THEN
    RETURN 'MSC Cruises';
  ELSIF p_text ILIKE '%carnival%' THEN
    RETURN 'Carnival Cruise Line';
  ELSIF p_text ILIKE '%disney%' THEN
    RETURN 'Disney Cruise Line';
  ELSIF p_text ILIKE '%holland america%' OR p_text ILIKE '%hal%' THEN
    RETURN 'Holland America Line';
  ELSIF p_text ILIKE '%viking%' THEN
    RETURN 'Viking Cruises';
  ELSIF p_text ILIKE '%fred olsen%' OR p_text ILIKE '%fred. olsen%' THEN
    RETURN 'Fred. Olsen Cruise Lines';
  ELSIF p_text ILIKE '%saga%' THEN
    RETURN 'Saga Cruises';
  ELSIF p_text ILIKE '%marella%' OR p_text ILIKE '%tui%' THEN
    RETURN 'Marella Cruises';
  ELSE
    RETURN NULL;
  END IF;
END;
$$;

-- ============================================================================
-- 4. RLS POLICY DOCUMENTATION
-- ============================================================================
-- The following RLS policies are intentionally permissive:
--
-- PUBLIC ACCESS (intentional - public website features):
-- - guide_feedback: INSERT with true - anonymous users can submit feedback
-- - port_guide_rating_votes: INSERT with true - anonymous voting
-- - port_guide_ratings: INSERT/UPDATE/DELETE with true - public rating system
-- - ship_guide_ratings: INSERT with true - public rating system
--
-- AUTHENTICATED ACCESS (internal CRM operations):
-- - activity_feed: INSERT with true - service role operations
-- - cruise_deals: INSERT with true - service role operations
-- - cruise_ports: ALL with true - authenticated users manage data
-- - cruise_sea_days: ALL with true - authenticated users manage data
-- - ports: ALL with true - authenticated users manage data (CRM admin)
-- - ship_guides: ALL with true - authenticated users manage data (CRM admin)
--
-- These policies are intentional as:
-- 1. Public tables need open INSERT for user-generated content
-- 2. CRM tables are protected by authentication requirement
-- 3. The anon key is rate-limited at the API level
--
-- If stricter policies are needed in future, consider:
-- - Rate limiting at application level
-- - Adding rate limit columns to track submissions per IP/session
-- - Implementing CAPTCHA verification before database insert

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '=== SECURITY LINTER FIXES APPLIED ===';
  RAISE NOTICE '';
  RAISE NOTICE 'FIXED (ERROR):';
  RAISE NOTICE '  - port_guide_completeness view: SECURITY INVOKER';
  RAISE NOTICE '';
  RAISE NOTICE 'FIXED (WARN - search_path):';
  RAISE NOTICE '  - public.pexels_image_exists';
  RAISE NOTICE '  - public.get_port_guide_required_images';
  RAISE NOTICE '  - public.get_port_guide_sections_summary';
  RAISE NOTICE '  - public.get_port_pexels_images';
  RAISE NOTICE '  - public.port_guide_folder_has_images';
  RAISE NOTICE '  - public.port_image_exists';
  RAISE NOTICE '  - public.get_port_guide_folder_images';
  RAISE NOTICE '  - public.validate_subsection';
  RAISE NOTICE '  - public.count_subsections';
  RAISE NOTICE '  - crm.move_port_image';
  RAISE NOTICE '  - crm.update_cruise_launches_timestamp';
  RAISE NOTICE '  - crm.update_cruise_cache_timestamp';
  RAISE NOTICE '  - crm.auto_link_content_to_todo';
  RAISE NOTICE '  - crm.match_and_complete_todo';
  RAISE NOTICE '  - crm.detect_cruise_line';
  RAISE NOTICE '';
  RAISE NOTICE 'DOCUMENTED (intentionally permissive RLS):';
  RAISE NOTICE '  - See migration comments for rationale';
  RAISE NOTICE '';
  RAISE NOTICE 'Run Supabase linter again to verify fixes.';
END;
$$;
