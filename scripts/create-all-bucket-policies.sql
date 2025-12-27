-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           CREATE ALL BUCKET POLICIES - Perfect Structure                ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
--
-- This creates policies for all 9 buckets:
-- - WEB_site, WEB_destinations, WEB_cruise-lines, WEB_categories
-- - CMS_offers, CMS_guides, CMS_travel-news
-- - CRM_assets, CRM_price-match-documents
--
-- Each bucket gets 4 policies:
-- 1. Public Read (SELECT) - anyone can view
-- 2. Authenticated Insert - logged-in users can upload
-- 3. Authenticated Update - logged-in users can update
-- 4. Authenticated Delete - logged-in users can delete

-- ============================================================================
-- WEB_site Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_site');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_site');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_site')
WITH CHECK (bucket_id = 'WEB_site');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_site');

-- ============================================================================
-- WEB_destinations Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_destinations');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_destinations');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_destinations')
WITH CHECK (bucket_id = 'WEB_destinations');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_destinations');

-- ============================================================================
-- WEB_cruise-lines Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_cruise-lines');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_cruise-lines');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines')
WITH CHECK (bucket_id = 'WEB_cruise-lines');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_cruise-lines');

-- ============================================================================
-- WEB_categories Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'WEB_categories');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'WEB_categories');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'WEB_categories')
WITH CHECK (bucket_id = 'WEB_categories');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'WEB_categories');

-- ============================================================================
-- CMS_offers Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CMS_offers');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CMS_offers');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CMS_offers')
WITH CHECK (bucket_id = 'CMS_offers');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CMS_offers');

-- ============================================================================
-- CMS_guides Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CMS_guides');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CMS_guides');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CMS_guides')
WITH CHECK (bucket_id = 'CMS_guides');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CMS_guides');

-- ============================================================================
-- CMS_travel-news Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CMS_travel-news');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CMS_travel-news');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CMS_travel-news')
WITH CHECK (bucket_id = 'CMS_travel-news');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CMS_travel-news');

-- ============================================================================
-- CRM_assets Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CRM_assets');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CRM_assets');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CRM_assets')
WITH CHECK (bucket_id = 'CRM_assets');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CRM_assets');

-- ============================================================================
-- CRM_price-match-documents Policies
-- ============================================================================

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'CRM_price-match-documents');

CREATE POLICY "Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'CRM_price-match-documents');

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'CRM_price-match-documents')
WITH CHECK (bucket_id = 'CRM_price-match-documents');

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'CRM_price-match-documents');

-- ============================================================================
-- DONE! All 9 buckets now have complete policies (36 policies total)
-- ============================================================================

-- Verify policies were created:
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'objects'
ORDER BY policyname, cmd;

