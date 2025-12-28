-- ============================================================================
-- SUPABASE STORAGE BUCKET POLICIES
-- ============================================================================
-- 
-- USE THIS IF: Storage policies are not automatically created
-- 
-- WHEN TO USE: After creating buckets in Supabase Dashboard, if images
-- still don't upload, run these policies in the SQL editor
-- 
-- ============================================================================

-- ============================================================================
-- WEB_cruise-lines Bucket Policies
-- ============================================================================

-- Public SELECT (anyone can view images on website)
CREATE POLICY "cruise_lines_public_select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'WEB_cruise-lines');

-- Authenticated INSERT (admin can upload)
CREATE POLICY "cruise_lines_authenticated_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_cruise-lines');

-- Authenticated UPDATE (admin can replace images)
CREATE POLICY "cruise_lines_authenticated_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines')
WITH CHECK (bucket_id = 'WEB_cruise-lines');

-- Authenticated DELETE (admin can delete images)
CREATE POLICY "cruise_lines_authenticated_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines');

-- ============================================================================
-- WEB_destinations Bucket Policies
-- ============================================================================

CREATE POLICY "destinations_public_select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'WEB_destinations');

CREATE POLICY "destinations_authenticated_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_destinations');

CREATE POLICY "destinations_authenticated_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_destinations')
WITH CHECK (bucket_id = 'WEB_destinations');

CREATE POLICY "destinations_authenticated_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_destinations');

-- ============================================================================
-- WEB_categories Bucket Policies (Port Guides + Categories + Bucket List)
-- ============================================================================

CREATE POLICY "categories_public_select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'WEB_categories');

CREATE POLICY "categories_authenticated_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_categories');

CREATE POLICY "categories_authenticated_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_categories')
WITH CHECK (bucket_id = 'WEB_categories');

CREATE POLICY "categories_authenticated_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_categories');

-- ============================================================================
-- WEB_site Bucket Policies (Site-wide assets: logos, favicons, etc.)
-- ============================================================================

CREATE POLICY "site_public_select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'WEB_site');

CREATE POLICY "site_authenticated_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_site');

CREATE POLICY "site_authenticated_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_site')
WITH CHECK (bucket_id = 'WEB_site');

CREATE POLICY "site_authenticated_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_site');

-- ============================================================================
-- HOW TO RUN THESE POLICIES
-- ============================================================================
-- 
-- 1. Go to Supabase Dashboard
-- 2. Click "SQL Editor" in left sidebar
-- 3. Click "New query"
-- 4. Copy and paste this entire file
-- 5. Click "Run" button
-- 6. Verify: No errors should appear
-- 
-- ============================================================================

-- ============================================================================
-- VERIFY POLICIES (Run this to check if policies exist)
-- ============================================================================

-- Check all storage policies
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

-- ============================================================================
-- TROUBLESHOOTING
-- ============================================================================
-- 
-- If policies already exist, you'll get errors like:
-- "policy already exists for table objects"
-- 
-- To fix: Delete existing policies first, then re-run:
-- 
-- DROP POLICY IF EXISTS "cruise_lines_public_select" ON storage.objects;
-- DROP POLICY IF EXISTS "destinations_public_select" ON storage.objects;
-- DROP POLICY IF EXISTS "categories_public_select" ON storage.objects;
-- DROP POLICY IF EXISTS "site_public_select" ON storage.objects;
-- 
-- Then re-run the CREATE POLICY statements above.
-- 
-- ============================================================================

