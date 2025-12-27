-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║           SITE_IMAGES TABLE - RLS POLICIES                               ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
-- 
-- This creates policies for the site_images DATABASE TABLE
-- (NOT storage buckets - those are handled in create-all-bucket-policies-v2.sql)

-- ============================================================================
-- STEP 1: Drop any existing policies to avoid conflicts
-- ============================================================================

DROP POLICY IF EXISTS "Public read access" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can insert" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can update" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can delete" ON site_images;
DROP POLICY IF EXISTS "site_images - Public Read" ON site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Insert" ON site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Update" ON site_images;
DROP POLICY IF EXISTS "site_images - Authenticated Delete" ON site_images;

-- ============================================================================
-- STEP 2: Enable RLS on the table
-- ============================================================================

ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 3: Create policies with unique names
-- ============================================================================

-- Policy 1: Anyone can read images (public + authenticated)
CREATE POLICY "site_images - Public Read"
ON site_images
FOR SELECT
TO authenticated, anon
USING (true);

-- Policy 2: Authenticated users can insert
CREATE POLICY "site_images - Authenticated Insert"
ON site_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Authenticated users can update
CREATE POLICY "site_images - Authenticated Update"
ON site_images
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Authenticated users can delete
CREATE POLICY "site_images - Authenticated Delete"
ON site_images
FOR DELETE
TO authenticated
USING (true);

-- ============================================================================
-- STEP 4: Verify policies were created
-- ============================================================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'site_images'
ORDER BY policyname;
