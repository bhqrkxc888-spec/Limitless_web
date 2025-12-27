-- Check if WEB_categories bucket exists and verify its policies

-- 1. List all buckets
SELECT id, name, public, file_size_limit, allowed_mime_types, created_at
FROM storage.buckets
WHERE name LIKE '%categ%' OR name LIKE '%bucket%';

-- 2. Check storage policies for WEB_categories
SELECT 
    policyname, 
    cmd, 
    roles,
    qual as "using_clause",
    with_check as "with_check_clause"
FROM pg_policies
WHERE tablename = 'objects' 
AND policyname LIKE '%categories%'
ORDER BY policyname;

-- 3. Test if we can see objects in WEB_categories
SELECT name, bucket_id, created_at, metadata
FROM storage.objects
WHERE bucket_id = 'WEB_categories'
LIMIT 10;

-- 4. Check site_images table for bucket-list entries
SELECT *
FROM site_images
WHERE entity_type = 'bucket-list'
ORDER BY created_at DESC
LIMIT 10;

