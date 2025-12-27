-- ============================================================================
-- PERFECT BUCKET STRUCTURE - RENAME EXISTING BUCKETS
-- ============================================================================
-- This renames existing buckets to have consistent CMS_ and CRM_ prefixes
--
-- Run this after creating the WEB_ buckets
-- ============================================================================

-- Step 1: Rename CMS content buckets
-- ============================================================================

-- 1. Rename offers → CMS_offers
UPDATE storage.buckets 
SET id = 'CMS_offers', name = 'CMS_offers'
WHERE id = 'offers';

UPDATE storage.objects 
SET bucket_id = 'CMS_offers'
WHERE bucket_id = 'offers';

-- 2. Rename guides → CMS_guides
UPDATE storage.buckets 
SET id = 'CMS_guides', name = 'CMS_guides'
WHERE id = 'guides';

UPDATE storage.objects 
SET bucket_id = 'CMS_guides'
WHERE bucket_id = 'guides';

-- 3. Rename travel-news → CMS_travel-news
UPDATE storage.buckets 
SET id = 'CMS_travel-news', name = 'CMS_travel-news'
WHERE id = 'travel-news';

UPDATE storage.objects 
SET bucket_id = 'CMS_travel-news'
WHERE bucket_id = 'travel-news';

-- Step 2: Rename CRM buckets
-- ============================================================================

-- 4. Rename crm-assets → CRM_assets
UPDATE storage.buckets 
SET id = 'CRM_assets', name = 'CRM_assets'
WHERE id = 'crm-assets';

UPDATE storage.objects 
SET bucket_id = 'CRM_assets'
WHERE bucket_id = 'crm-assets';

-- 5. Rename price-match-documents → CRM_price-match-documents
UPDATE storage.buckets 
SET id = 'CRM_price-match-documents', name = 'CRM_price-match-documents'
WHERE id = 'price-match-documents';

UPDATE storage.objects 
SET bucket_id = 'CRM_price-match-documents'
WHERE bucket_id = 'price-match-documents';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT 
  id as bucket_id,
  name,
  public,
  file_size_limit,
  created_at
FROM storage.buckets
ORDER BY id;

-- Expected output:
-- CMS_guides
-- CMS_offers
-- CMS_travel-news
-- CRM_assets
-- CRM_price-match-documents
-- WEB_categories
-- WEB_cruise-lines
-- WEB_destinations
-- WEB_site

