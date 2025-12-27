-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           COMPREHENSIVE RLS DIAGNOSTIC                                   ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- 1. Check current authentication state
SELECT 
  auth.uid() as current_user_id,
  auth.role() as current_role,
  current_user as postgres_user;

-- 2. Check RLS status on ALL relevant tables
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('site_images', 'objects')
  AND schemaname IN ('public', 'storage')
ORDER BY schemaname, tablename;

-- 3. Check ALL policies on storage.objects
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
ORDER BY policyname;

-- 4. Check ALL policies on site_images
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'site_images' 
  AND schemaname = 'public'
ORDER BY policyname;

-- 5. Check if buckets exist and are public
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets
WHERE name LIKE 'WEB_%' OR name LIKE 'CMS_%' OR name LIKE 'CRM_%'
ORDER BY name;

-- 6. Try a test insert to site_images (this will show the actual error)
-- Comment out if you don't want to test
/*
INSERT INTO site_images (
  bucket, path, entity_type, entity_id, image_type, alt_text, format
) VALUES (
  'WEB_site', 'test-diagnostic.webp', 'site', 'test', 'hero', 'Test Image', 'webp'
);
*/

-- 7. Check if there's a constraint issue
SELECT
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'site_images'::regclass;

