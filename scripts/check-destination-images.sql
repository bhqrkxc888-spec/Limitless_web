-- ============================================================================
-- Destination Images Verification Queries
-- ============================================================================
-- Run these queries in your Supabase SQL Editor to check for issues
-- ============================================================================

-- 1. OVERVIEW: All destination images grouped by destination
-- ============================================================================
SELECT 
  entity_id as destination_slug,
  COUNT(*) as total_images,
  COUNT(CASE WHEN image_type = 'hero' THEN 1 END) as hero_count,
  COUNT(CASE WHEN image_type = 'card' THEN 1 END) as card_count,
  COUNT(CASE WHEN image_type LIKE 'card-%' THEN 1 END) as cruise_line_cards,
  COUNT(CASE WHEN image_type LIKE 'gallery-%' THEN 1 END) as gallery_images,
  COUNT(CASE WHEN image_type = 'mobile' THEN 1 END) as mobile_count,
  array_agg(DISTINCT image_type ORDER BY image_type) as all_image_types
FROM site_images
WHERE entity_type = 'destination'
GROUP BY entity_id
ORDER BY entity_id;

-- ============================================================================
-- 2. DUPLICATE PATHS: Find any duplicate (bucket, path) combinations
-- ============================================================================
SELECT 
  bucket,
  path,
  COUNT(*) as duplicate_count,
  array_agg(id ORDER BY uploaded_at DESC) as record_ids,
  array_agg(entity_id ORDER BY uploaded_at DESC) as entity_ids,
  array_agg(image_type ORDER BY uploaded_at DESC) as image_types,
  array_agg(uploaded_at ORDER BY uploaded_at DESC) as upload_times
FROM site_images
WHERE entity_type = 'destination'
GROUP BY bucket, path
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, path;

-- ============================================================================
-- 3. WRONG BUCKET: Check if any destination images are in wrong bucket
-- ============================================================================
SELECT 
  bucket,
  COUNT(*) as count,
  array_agg(DISTINCT entity_id) as destinations
FROM site_images
WHERE entity_type = 'destination'
GROUP BY bucket
ORDER BY bucket;

-- Expected: All should be in 'WEB_destinations' bucket

-- ============================================================================
-- 4. INCORRECT PATH FORMAT: Check for paths that don't match expected format
-- ============================================================================
SELECT 
  id,
  entity_id,
  image_type,
  path,
  bucket,
  uploaded_at
FROM site_images
WHERE entity_type = 'destination'
  AND (
    -- Path doesn't start with entity_id/
    path NOT LIKE entity_id || '/%'
    -- Or has extra slashes or wrong structure
    OR path LIKE '%/%/%'
    OR path NOT LIKE '%.%'  -- Missing file extension
  )
ORDER BY entity_id, image_type;

-- Expected format: {entity_id}/{image_type}.{ext}
-- Example: caribbean/hero.webp

-- ============================================================================
-- 5. MISSING REQUIRED IMAGES: Destinations without hero or card
-- ============================================================================
-- Destinations missing HERO
SELECT 
  'Missing Hero' as issue_type,
  entity_id as destination_slug
FROM site_images
WHERE entity_type = 'destination'
  AND entity_id NOT IN (
    SELECT DISTINCT entity_id 
    FROM site_images 
    WHERE entity_type = 'destination' 
      AND image_type = 'hero'
  )
GROUP BY entity_id

UNION ALL

-- Destinations missing CARD
SELECT 
  'Missing Card' as issue_type,
  entity_id as destination_slug
FROM site_images
WHERE entity_type = 'destination'
  AND entity_id NOT IN (
    SELECT DISTINCT entity_id 
    FROM site_images 
    WHERE entity_type = 'destination' 
      AND image_type = 'card'
  )
GROUP BY entity_id

ORDER BY issue_type, destination_slug;

-- ============================================================================
-- 6. DETAILED LIST: All destination images with full details
-- ============================================================================
SELECT 
  entity_id as destination,
  image_type,
  bucket,
  path,
  format,
  width,
  height,
  file_size,
  seo_compliant,
  uploaded_at,
  id as record_id
FROM site_images
WHERE entity_type = 'destination'
ORDER BY entity_id, 
  CASE image_type
    WHEN 'hero' THEN 1
    WHEN 'card' THEN 2
    WHEN 'mobile' THEN 3
    ELSE 4
  END,
  image_type;

-- ============================================================================
-- 7. SUMMARY STATISTICS
-- ============================================================================
SELECT 
  'Total Destination Images' as metric,
  COUNT(*)::text as value
FROM site_images
WHERE entity_type = 'destination'

UNION ALL

SELECT 
  'Unique Destinations' as metric,
  COUNT(DISTINCT entity_id)::text as value
FROM site_images
WHERE entity_type = 'destination'

UNION ALL

SELECT 
  'Destinations with Hero' as metric,
  COUNT(DISTINCT entity_id)::text as value
FROM site_images
WHERE entity_type = 'destination' AND image_type = 'hero'

UNION ALL

SELECT 
  'Destinations with Card' as metric,
  COUNT(DISTINCT entity_id)::text as value
FROM site_images
WHERE entity_type = 'destination' AND image_type = 'card'

UNION ALL

SELECT 
  'Images in Wrong Bucket' as metric,
  COUNT(*)::text as value
FROM site_images
WHERE entity_type = 'destination' AND bucket != 'WEB_destinations'

UNION ALL

SELECT 
  'Duplicate Paths' as metric,
  COUNT(*)::text as value
FROM (
  SELECT bucket, path
  FROM site_images
  WHERE entity_type = 'destination'
  GROUP BY bucket, path
  HAVING COUNT(*) > 1
) duplicates;

-- ============================================================================
-- 8. CRUISE LINE SPECIFIC CARDS: List all cruise-line-specific cards
-- ============================================================================
SELECT 
  entity_id as destination,
  image_type,
  REPLACE(image_type, 'card-', '') as cruise_line_slug,
  path,
  uploaded_at
FROM site_images
WHERE entity_type = 'destination'
  AND image_type LIKE 'card-%'
ORDER BY entity_id, image_type;

-- ============================================================================
-- 9. GALLERY IMAGES: List all gallery images
-- ============================================================================
SELECT 
  entity_id as destination,
  image_type,
  path,
  uploaded_at
FROM site_images
WHERE entity_type = 'destination'
  AND image_type LIKE 'gallery-%'
ORDER BY entity_id, image_type;

-- ============================================================================
-- 10. PATH VALIDATION: Check path structure matches expected pattern
-- ============================================================================
SELECT 
  entity_id,
  image_type,
  path,
  CASE 
    WHEN path = entity_id || '/' || image_type || '.' || COALESCE(format, 'webp') THEN '✅ Correct'
    ELSE '⚠️ Unexpected format'
  END as path_status,
  entity_id || '/' || image_type || '.' || COALESCE(format, 'webp') as expected_path
FROM site_images
WHERE entity_type = 'destination'
ORDER BY path_status DESC, entity_id, image_type;

