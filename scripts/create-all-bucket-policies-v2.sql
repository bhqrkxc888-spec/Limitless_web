-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           DELETE ALL OLD POLICIES & CREATE NEW ONES                     ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- ============================================================================
-- STEP 1: Delete ALL existing policies on storage.objects
-- ============================================================================

DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Insert" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated insert" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete" ON storage.objects;

-- Drop any other variations that might exist
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated insert" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete" ON storage.objects;

-- ============================================================================
-- STEP 2: Create unique policies for each bucket
-- ============================================================================

-- WEB_site Policies (4 policies)
CREATE POLICY "WEB_site - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_site');

CREATE POLICY "WEB_site - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_site');

CREATE POLICY "WEB_site - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_site')
WITH CHECK (bucket_id = 'WEB_site');

CREATE POLICY "WEB_site - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_site');

-- WEB_destinations Policies (4 policies)
CREATE POLICY "WEB_destinations - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_destinations');

CREATE POLICY "WEB_destinations - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_destinations');

CREATE POLICY "WEB_destinations - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_destinations')
WITH CHECK (bucket_id = 'WEB_destinations');

CREATE POLICY "WEB_destinations - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_destinations');

-- WEB_cruise-lines Policies (4 policies)
CREATE POLICY "WEB_cruise-lines - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_cruise-lines');

CREATE POLICY "WEB_cruise-lines - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_cruise-lines');

CREATE POLICY "WEB_cruise-lines - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines')
WITH CHECK (bucket_id = 'WEB_cruise-lines');

CREATE POLICY "WEB_cruise-lines - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines');

-- WEB_categories Policies (4 policies)
CREATE POLICY "WEB_categories - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_categories');

CREATE POLICY "WEB_categories - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_categories');

CREATE POLICY "WEB_categories - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_categories')
WITH CHECK (bucket_id = 'WEB_categories');

CREATE POLICY "WEB_categories - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_categories');

-- CMS_offers Policies (4 policies)
CREATE POLICY "CMS_offers - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CMS_offers');

CREATE POLICY "CMS_offers - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CMS_offers');

CREATE POLICY "CMS_offers - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CMS_offers')
WITH CHECK (bucket_id = 'CMS_offers');

CREATE POLICY "CMS_offers - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CMS_offers');

-- CMS_guides Policies (4 policies)
CREATE POLICY "CMS_guides - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CMS_guides');

CREATE POLICY "CMS_guides - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CMS_guides');

CREATE POLICY "CMS_guides - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CMS_guides')
WITH CHECK (bucket_id = 'CMS_guides');

CREATE POLICY "CMS_guides - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CMS_guides');

-- CMS_travel-news Policies (4 policies)
CREATE POLICY "CMS_travel-news - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CMS_travel-news');

CREATE POLICY "CMS_travel-news - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CMS_travel-news');

CREATE POLICY "CMS_travel-news - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CMS_travel-news')
WITH CHECK (bucket_id = 'CMS_travel-news');

CREATE POLICY "CMS_travel-news - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CMS_travel-news');

-- CRM_assets Policies (4 policies)
CREATE POLICY "CRM_assets - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CRM_assets');

CREATE POLICY "CRM_assets - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CRM_assets');

CREATE POLICY "CRM_assets - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CRM_assets')
WITH CHECK (bucket_id = 'CRM_assets');

CREATE POLICY "CRM_assets - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CRM_assets');

-- CRM_price-match-documents Policies (4 policies)
CREATE POLICY "CRM_price-match-documents - Public Read"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CRM_price-match-documents');

CREATE POLICY "CRM_price-match-documents - Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CRM_price-match-documents');

CREATE POLICY "CRM_price-match-documents - Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CRM_price-match-documents')
WITH CHECK (bucket_id = 'CRM_price-match-documents');

CREATE POLICY "CRM_price-match-documents - Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CRM_price-match-documents');

-- ============================================================================
-- STEP 3: Verify all policies were created (should show 36 policies)
-- ============================================================================

SELECT 
  policyname,
  cmd
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
ORDER BY policyname;

