-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  COMPLETE STORAGE FIX - ALL WEB BUCKETS                                 ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Drop ALL old "Authenticated" policies for WEB buckets
DROP POLICY IF EXISTS "WEB_site - Authenticated Insert" ON storage.objects;
DROP POLICY IF EXISTS "WEB_site - Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "WEB_site - Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "WEB_destinations - Authenticated Insert" ON storage.objects;
DROP POLICY IF EXISTS "WEB_destinations - Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "WEB_destinations - Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "WEB_cruise-lines - Authenticated Insert" ON storage.objects;
DROP POLICY IF EXISTS "WEB_cruise-lines - Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "WEB_cruise-lines - Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "WEB_categories - Authenticated Insert" ON storage.objects;
DROP POLICY IF EXISTS "WEB_categories - Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "WEB_categories - Authenticated Delete" ON storage.objects;

-- Create NEW "Public" policies (allows cookie-based auth)
-- WEB_site
CREATE POLICY "WEB_site - Public Insert" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'WEB_site');
CREATE POLICY "WEB_site - Public Update" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'WEB_site');
CREATE POLICY "WEB_site - Public Delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'WEB_site');

-- WEB_destinations
CREATE POLICY "WEB_destinations - Public Insert" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'WEB_destinations');
CREATE POLICY "WEB_destinations - Public Update" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'WEB_destinations');
CREATE POLICY "WEB_destinations - Public Delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'WEB_destinations');

-- WEB_cruise-lines
CREATE POLICY "WEB_cruise-lines - Public Insert" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'WEB_cruise-lines');
CREATE POLICY "WEB_cruise-lines - Public Update" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'WEB_cruise-lines');
CREATE POLICY "WEB_cruise-lines - Public Delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'WEB_cruise-lines');

-- WEB_categories
CREATE POLICY "WEB_categories - Public Insert" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'WEB_categories');
CREATE POLICY "WEB_categories - Public Update" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'WEB_categories');
CREATE POLICY "WEB_categories - Public Delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'WEB_categories');

-- Verify (should show 'public' as roles)
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%WEB_%'
ORDER BY policyname;

