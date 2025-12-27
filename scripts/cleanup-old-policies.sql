-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           DELETE ALL OLD/ORPHANED POLICIES - FINAL CLEANUP              ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
--
-- This deletes all old policies from deleted buckets, keeping ONLY the 36 new ones

-- Old policies from deleted buckets (badges, pwa-icons, etc.)
DROP POLICY IF EXISTS "Allow authenticated delete 1peuqw_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates 1peuqw_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads 1peuqw_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read 1peuqw_0" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete badges" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update badges" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload badges" ON storage.objects;
DROP POLICY IF EXISTS "public_read_badges" ON storage.objects;

-- Old price-match policies
DROP POLICY IF EXISTS "Allow authenticated users to delete price match documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to read price match documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow public price match document uploads" ON storage.objects;

-- Old cruise-lines policies
DROP POLICY IF EXISTS "auth_delete_cruise_lines 16h5rlz_0" ON storage.objects;
DROP POLICY IF EXISTS "auth_update_cruise_lines" ON storage.objects;
DROP POLICY IF EXISTS "auth_upload_cruise_lines 16h5rlz_0" ON storage.objects;
DROP POLICY IF EXISTS "public_read_cruise_lines 16h5rlz_0" ON storage.objects;

-- Old destinations policies
DROP POLICY IF EXISTS "auth_delete_destinations" ON storage.objects;
DROP POLICY IF EXISTS "auth_update_destinations" ON storage.objects;
DROP POLICY IF EXISTS "auth_upload_destinations 1ca4i05_0" ON storage.objects;
DROP POLICY IF EXISTS "public_read_destinations 1ca4i05_0" ON storage.objects;

-- Old guides policies (org-scoped)
DROP POLICY IF EXISTS "guides_org_delete" ON storage.objects;
DROP POLICY IF EXISTS "guides_org_insert" ON storage.objects;
DROP POLICY IF EXISTS "guides_org_update" ON storage.objects;
DROP POLICY IF EXISTS "guides_public_read" ON storage.objects;

-- Old news policies (org-scoped)
DROP POLICY IF EXISTS "news_org_delete" ON storage.objects;
DROP POLICY IF EXISTS "news_org_insert" ON storage.objects;
DROP POLICY IF EXISTS "news_org_update" ON storage.objects;
DROP POLICY IF EXISTS "news_public_read" ON storage.objects;

-- Old offers policies (org-scoped)
DROP POLICY IF EXISTS "offers_org_delete" ON storage.objects;
DROP POLICY IF EXISTS "offers_org_insert" ON storage.objects;
DROP POLICY IF EXISTS "offers_org_update" ON storage.objects;
DROP POLICY IF EXISTS "offers_public_read" ON storage.objects;

-- Old PWA icons policies
DROP POLICY IF EXISTS "pwa_icons_org_delete" ON storage.objects;
DROP POLICY IF EXISTS "pwa_icons_org_update" ON storage.objects;
DROP POLICY IF EXISTS "pwa_icons_org_upload" ON storage.objects;
DROP POLICY IF EXISTS "pwa_icons_public_read" ON storage.objects;

-- ============================================================================
-- Verify ONLY the 36 new policies remain
-- ============================================================================

SELECT 
  policyname,
  cmd
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
ORDER BY policyname;

-- Expected result: ONLY 36 policies (4 per bucket × 9 buckets)
-- All should start with bucket names: CMS_*, CRM_*, WEB_*

