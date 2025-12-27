-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           DIAGNOSTIC: Check RLS and Auth Status                          ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- 1. Check if RLS is enabled on site_images
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'site_images';

-- 2. Check all policies on site_images
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'site_images'
ORDER BY policyname;

-- 3. Check if current user is authenticated
SELECT 
  auth.uid() as user_id,
  auth.role() as user_role,
  current_user as db_user;

-- 4. Test INSERT permission
-- This will show if the policy allows insert
EXPLAIN (VERBOSE) 
INSERT INTO site_images (
  bucket, path, entity_type, entity_id, image_type, alt_text, format
) VALUES (
  'WEB_site', 'test.webp', 'site', 'test', 'hero', 'Test', 'webp'
);

