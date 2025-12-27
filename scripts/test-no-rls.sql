-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           NUCLEAR OPTION: Completely disable RLS for testing            ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
-- 
-- This will TEMPORARILY disable RLS to isolate if it's a policy issue
-- WARNING: Only use for testing/debugging!

-- Disable RLS on site_images completely
ALTER TABLE site_images DISABLE ROW LEVEL SECURITY;

-- Verify it's disabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'site_images'
  AND schemaname = 'public';

-- Try inserting a test record
INSERT INTO site_images (
  bucket, path, entity_type, entity_id, image_type, alt_text, format
) VALUES (
  'WEB_site', 'test-no-rls.webp', 'site', 'test', 'hero', 'Test', 'webp'
)
ON CONFLICT (bucket, path) DO UPDATE
SET alt_text = EXCLUDED.alt_text;

-- Check if it worked
SELECT * FROM site_images WHERE path = 'test-no-rls.webp';

-- ============================================================================
-- If this works, the issue is 100% with the policies
-- If this fails, the issue is somewhere else (constraints, permissions, etc)
-- ============================================================================

