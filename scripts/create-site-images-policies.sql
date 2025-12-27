-- ============================================================================
-- SITE_IMAGES TABLE RLS POLICIES
-- ============================================================================
-- 
-- Enable RLS and create policies for the site_images table

-- Enable RLS on the table
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public can read all images
CREATE POLICY "Public read access"
ON site_images
FOR SELECT
TO authenticated, anon
USING (true);

-- Policy 2: Authenticated users can insert images
CREATE POLICY "Authenticated users can insert"
ON site_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Authenticated users can update images
CREATE POLICY "Authenticated users can update"
ON site_images
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Authenticated users can delete images
CREATE POLICY "Authenticated users can delete"
ON site_images
FOR DELETE
TO authenticated
USING (true);

-- Verify policies were created
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

