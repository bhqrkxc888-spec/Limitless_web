-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           VERIFY & CLEANUP BUCKETS - Final Step                         ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
--
-- PURPOSE: Verify new buckets exist and delete ALL old buckets
--
-- STEP 1: Run this to see current status
-- STEP 2: Review the output
-- STEP 3: Run the DELETE commands at the bottom to remove old buckets

-- ============================================================================
-- STEP 1: CHECK CURRENT BUCKETS
-- ============================================================================

SELECT 
  id,
  name,
  public,
  file_size_limit / 1024 / 1024 AS size_limit_mb,
  array_length(allowed_mime_types, 1) AS mime_types_count,
  created_at
FROM storage.buckets
ORDER BY 
  CASE 
    WHEN id LIKE 'WEB_%' THEN 1
    WHEN id LIKE 'CMS_%' THEN 2
    WHEN id LIKE 'CRM_%' THEN 3
    ELSE 4
  END,
  id;

-- Expected buckets (9 total):
-- WEB_categories
-- WEB_cruise-lines
-- WEB_destinations
-- WEB_site
-- CMS_offers
-- CMS_guides
-- CMS_travel-news
-- CRM_assets
-- CRM_price-match-documents

-- ============================================================================
-- STEP 2: CHECK FOR FILES IN OLD BUCKETS
-- ============================================================================

-- This will show any files still in old buckets that need to be deleted
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM(metadata->>'size')::bigint / 1024 / 1024 AS total_size_mb
FROM storage.objects
WHERE bucket_id NOT LIKE 'WEB_%' 
  AND bucket_id NOT LIKE 'CMS_%' 
  AND bucket_id NOT LIKE 'CRM_%'
GROUP BY bucket_id
ORDER BY bucket_id;

-- ============================================================================
-- STEP 3: DELETE OLD BUCKETS (RUN ONLY IF YOU'RE SURE!)
-- ============================================================================

-- First, delete all files from old buckets
DELETE FROM storage.objects 
WHERE bucket_id NOT LIKE 'WEB_%' 
  AND bucket_id NOT LIKE 'CMS_%' 
  AND bucket_id NOT LIKE 'CRM_%';

-- Then delete the old buckets themselves
DELETE FROM storage.buckets 
WHERE id NOT LIKE 'WEB_%' 
  AND id NOT LIKE 'CMS_%' 
  AND id NOT LIKE 'CRM_%';

-- Verify only new buckets remain
SELECT 
  id,
  name,
  public,
  file_size_limit / 1024 / 1024 AS size_limit_mb
FROM storage.buckets
ORDER BY id;

-- Expected: 9 buckets (WEB_*, CMS_*, CRM_*)

