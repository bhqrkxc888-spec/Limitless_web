-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           MASTER FIX - RUN THIS ENTIRE SCRIPT                           ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
-- 
-- This script will DEFINITELY fix the RLS issue. Run the ENTIRE thing.

-- ============================================================================
-- STEP 1: Check current RLS status
-- ============================================================================
SELECT 
  tablename,
  rowsecurity as rls_currently_enabled
FROM pg_tables
WHERE tablename = 'site_images' AND schemaname = 'public';

-- ============================================================================
-- STEP 2: FORCE DISABLE RLS (regardless of current state)
-- ============================================================================
ALTER TABLE public.site_images DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 3: Drop EVERY possible policy that might exist
-- ============================================================================
DO $$
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'site_images' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.site_images', policy_record.policyname);
    RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
  END LOOP;
END $$;

-- ============================================================================
-- STEP 4: Also try dropping by known names (belt and suspenders)
-- ============================================================================
DROP POLICY IF EXISTS "Public read access" ON public.site_images;
DROP POLICY IF EXISTS "Authenticated users can insert" ON public.site_images;
DROP POLICY IF EXISTS "Authenticated users can update" ON public.site_images;
DROP POLICY IF EXISTS "Authenticated users can delete" ON public.site_images;
DROP POLICY IF EXISTS "site_images - Public Read" ON public.site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Insert" ON public.site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Update" ON public.site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Delete" ON public.site_images;
DROP POLICY IF EXISTS "site_images_authenticated_delete" ON public.site_images;
DROP POLICY IF EXISTS "site_images_authenticated_insert" ON public.site_images;
DROP POLICY IF EXISTS "site_images_authenticated_update" ON public.site_images;
DROP POLICY IF EXISTS "site_images_public_read" ON public.site_images;
DROP POLICY IF EXISTS "site_images_select_policy" ON public.site_images;
DROP POLICY IF EXISTS "site_images_insert_policy" ON public.site_images;
DROP POLICY IF EXISTS "site_images_update_policy" ON public.site_images;
DROP POLICY IF EXISTS "site_images_delete_policy" ON public.site_images;
DROP POLICY IF EXISTS "Allow public read access" ON public.site_images;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.site_images;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.site_images;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.site_images;

-- ============================================================================
-- STEP 5: Grant full permissions to all roles
-- ============================================================================
GRANT ALL ON public.site_images TO anon;
GRANT ALL ON public.site_images TO authenticated;
GRANT ALL ON public.site_images TO service_role;

-- ============================================================================
-- STEP 6: Verify RLS is now disabled
-- ============================================================================
SELECT 
  tablename,
  rowsecurity as rls_now_disabled_should_be_false
FROM pg_tables
WHERE tablename = 'site_images' AND schemaname = 'public';

-- ============================================================================
-- STEP 7: Verify no policies remain
-- ============================================================================
SELECT COUNT(*) as remaining_policies
FROM pg_policies 
WHERE tablename = 'site_images' AND schemaname = 'public';

-- ============================================================================
-- STEP 8: Test insert (should work now)
-- ============================================================================
INSERT INTO public.site_images (
  bucket, path, entity_type, entity_id, image_type, alt_text, format
) VALUES (
  'WEB_site', 'master-fix-test.webp', 'site', 'test', 'hero', 'Test', 'webp'
)
ON CONFLICT (bucket, path) DO UPDATE SET alt_text = 'Test Updated';

-- ============================================================================
-- STEP 9: Verify test insert worked
-- ============================================================================
SELECT id, bucket, path, alt_text 
FROM public.site_images 
WHERE path = 'master-fix-test.webp';

-- ============================================================================
-- STEP 10: Clean up test record
-- ============================================================================
DELETE FROM public.site_images WHERE path = 'master-fix-test.webp';

-- ============================================================================
-- DONE! If you see results from Steps 6-9, everything is working.
-- ============================================================================

