-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  FINAL NUCLEAR FIX - Check BOTH storage.objects AND site_images RLS    ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- ============================================================================
-- PART 1: Check RLS on storage.objects (THIS might be the real issue!)
-- ============================================================================

SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE (tablename = 'objects' AND schemaname = 'storage')
   OR (tablename = 'site_images' AND schemaname = 'public');

-- ============================================================================
-- PART 2: Check storage bucket policies for WEB_site
-- ============================================================================

SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND (policyname LIKE '%WEB_site%' OR policyname LIKE '%site%')
ORDER BY policyname;

-- ============================================================================
-- PART 3: Check if WEB_site bucket exists and is public
-- ============================================================================

SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE name = 'WEB_site';

-- ============================================================================
-- PART 4: Test upload to storage directly
-- ============================================================================

-- This will show if storage.objects RLS is blocking uploads
-- Run this and check the error message

-- Test insert to storage.objects (simulating file upload)
-- Note: This might fail, but the ERROR MESSAGE will tell us what's wrong!

/*
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('WEB_site', 'test-storage.webp', auth.uid(), '{}'::jsonb);
*/

-- ============================================================================
-- PART 5: Show ALL policies on storage.objects
-- ============================================================================

SELECT 
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage'
ORDER BY policyname;

-- ============================================================================
-- RESULTS INTERPRETATION:
-- ============================================================================
-- If RLS on storage.objects = TRUE → That's your problem!
-- If no policies exist for WEB_site bucket → That's your problem!
-- If bucket doesn't exist or isn't public → That's your problem!

