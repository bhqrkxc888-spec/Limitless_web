-- Check Bucket List Images in Database
SELECT 
  entity_id as experience_id,
  image_type,
  bucket,
  path,
  uploaded_at,
  seo_compliant
FROM site_images
WHERE entity_type = 'bucket-list'
ORDER BY entity_id, image_type;

-- Count by experience
SELECT 
  entity_id as experience_id,
  COUNT(*) as image_count,
  COUNT(CASE WHEN image_type = 'hero' THEN 1 END) as hero_count,
  COUNT(CASE WHEN image_type = 'card' THEN 1 END) as card_count
FROM site_images
WHERE entity_type = 'bucket-list'
GROUP BY entity_id
ORDER BY entity_id;

-- All 15 experiences (from data file)
-- Compare with database results above
-- Expected IDs:
-- world-cruises, antarctica, japan-asia, rocky-mountaineer-alaska,
-- galapagos, northern-lights, south-america, middle-east,
-- pacific-new-zealand, transatlantic-crossings, iceland-circumnavigation,
-- european-rivers, great-barrier-reef, midnight-sun, grand-voyages
