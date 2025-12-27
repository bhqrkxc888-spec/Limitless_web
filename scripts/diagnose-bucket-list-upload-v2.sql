-- Fixed: Check bucket list upload issue (without created_at column)

-- 1. List all buckets
SELECT id, name, public, file_size_limit
FROM storage.buckets
WHERE name LIKE '%categ%' OR name LIKE '%bucket%';

-- 2. Check storage policies for WEB_categories
SELECT 
    policyname, 
    cmd, 
    roles
FROM pg_policies
WHERE tablename = 'objects' 
AND policyname LIKE '%categories%'
ORDER BY policyname;

-- 3. Test if we can see objects in WEB_categories
SELECT name, bucket_id
FROM storage.objects
WHERE bucket_id = 'WEB_categories'
LIMIT 10;

-- 4. Check site_images table structure first
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'site_images'
ORDER BY ordinal_position;

-- 5. Check site_images table for bucket-list entries
SELECT entity_type, entity_id, image_type, bucket, path, seo_compliant
FROM site_images
WHERE entity_type = 'bucket-list'
LIMIT 10;

-- 6. Check if there are ANY entries in site_images
SELECT entity_type, COUNT(*) as count
FROM site_images
GROUP BY entity_type
ORDER BY count DESC;

