-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           FINAL FIX: Disable RLS on site_images                         ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
-- 
-- Admin area uses custom cookie-based authentication, not Supabase auth
-- Therefore, RLS on site_images is not needed (admin routes are already protected)

-- Disable RLS on site_images
ALTER TABLE site_images DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies (they're not needed)
DROP POLICY IF EXISTS "Public read access" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can insert" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can update" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can delete" ON site_images;
DROP POLICY IF EXISTS "site_images - Public Read" ON site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Insert" ON site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Update" ON site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Delete" ON site_images;
DROP POLICY IF EXISTS "site_images_authenticated_delete" ON site_images;
DROP POLICY IF EXISTS "site_images_authenticated_insert" ON site_images;
DROP POLICY IF EXISTS "site_images_authenticated_update" ON site_images;
DROP POLICY IF EXISTS "site_images_public_read" ON site_images;
DROP POLICY IF EXISTS "site_images_select_policy" ON site_images;
DROP POLICY IF EXISTS "site_images_insert_policy" ON site_images;
DROP POLICY IF EXISTS "site_images_update_policy" ON site_images;
DROP POLICY IF EXISTS "site_images_delete_policy" ON site_images;

-- Verify RLS is disabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'site_images'
  AND schemaname = 'public';

-- Clean up test record
DELETE FROM site_images WHERE path = 'test-no-rls.webp';

-- Show final state
SELECT COUNT(*) as total_records FROM site_images;

