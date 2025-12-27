-- ============================================================================
-- SITE IMAGES BUCKET STRUCTURE SETUP
-- ============================================================================
-- 
-- This script creates/verifies the Supabase Storage bucket structure for
-- static site images (cruise lines, destinations, site assets).
--
-- These buckets are for static marketing assets, separate from CMS content
-- buckets (offers, news, guides) which are org-scoped.
--
-- USAGE:
--   1. Run this in Supabase Dashboard → SQL Editor
--   2. Or via CLI: psql $DATABASE_URL -f scripts/setup-site-images-buckets.sql
--
-- BUCKETS CREATED:
--   - cruise-lines: Cruise line logos, heroes, cards
--   - destinations: Destination hero images
--   - site: Site-wide assets (homepage hero, logo, favicon, OG image, about page images)
--
-- FOLDER STRUCTURE (created manually or via API):
--   cruise-lines/
--     ├── logos/
--     ├── heroes/
--     └── cards/
--   destinations/
--   site/
--
-- ============================================================================

DO $$ 
BEGIN
  -- ========================================================================
  -- 1. CRUISE LINES BUCKET
  -- ========================================================================
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'cruise-lines') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'cruise-lines',
      'cruise-lines',
      true,  -- Public bucket for website display
      2097152, -- 2MB limit (sufficient for WebP images)
      ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
    );
    RAISE NOTICE '✓ Created cruise-lines storage bucket';
  ELSE
    RAISE NOTICE '→ cruise-lines bucket already exists';
    -- Update settings to ensure correct configuration
    UPDATE storage.buckets
    SET 
      public = true,
      file_size_limit = 2097152,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
    WHERE id = 'cruise-lines';
    RAISE NOTICE '→ Updated cruise-lines bucket settings';
  END IF;

  -- ========================================================================
  -- 2. DESTINATIONS BUCKET
  -- ========================================================================
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'destinations') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'destinations',
      'destinations',
      true,
      2097152, -- 2MB
      ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
    );
    RAISE NOTICE '✓ Created destinations storage bucket';
  ELSE
    RAISE NOTICE '→ destinations bucket already exists';
    UPDATE storage.buckets
    SET 
      public = true,
      file_size_limit = 2097152,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
    WHERE id = 'destinations';
    RAISE NOTICE '→ Updated destinations bucket settings';
  END IF;

  -- ========================================================================
  -- 3. SITE ASSETS BUCKET
  -- ========================================================================
  -- Note: This might be called 'site' or might use 'categories' bucket
  -- Creating 'site' as a dedicated bucket for site-wide assets
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'site') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'site',
      'site',
      true,
      2097152, -- 2MB
      ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']::text[]
    );
    RAISE NOTICE '✓ Created site storage bucket';
  ELSE
    RAISE NOTICE '→ site bucket already exists';
    UPDATE storage.buckets
    SET 
      public = true,
      file_size_limit = 2097152,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']::text[]
    WHERE id = 'site';
    RAISE NOTICE '→ Updated site bucket settings';
  END IF;

  -- ========================================================================
  -- 4. CATEGORIES BUCKET (NEW)
  -- ========================================================================
  -- For category card images (luxury, family, river, expedition, adults-only, budget)
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'categories') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'categories',
      'categories',
      true,
      2097152, -- 2MB
      ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
    );
    RAISE NOTICE '✓ Created categories storage bucket';
  ELSE
    RAISE NOTICE '→ categories bucket already exists';
    UPDATE storage.buckets
    SET 
      public = true,
      file_size_limit = 2097152,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
    WHERE id = 'categories';
    RAISE NOTICE '→ Updated categories bucket settings';
  END IF;

  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✓ Bucket setup complete!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'NEXT STEPS:';
  RAISE NOTICE '1. Set up storage policies (see instructions below)';
  RAISE NOTICE '2. Create folder structure in Supabase Dashboard:';
  RAISE NOTICE '   - cruise-lines/{cruise-line-slug}/';
  RAISE NOTICE '   - cruise-lines/{cruise-line-slug}/ships/{ship-slug}/';
  RAISE NOTICE '   - destinations/{destination-slug}/';
  RAISE NOTICE '   - site/';
  RAISE NOTICE '   - site/team/';
  RAISE NOTICE '   - categories/';
  RAISE NOTICE '3. Set up storage policies for ALL buckets (see below)';
  RAISE NOTICE '4. Start uploading images via admin interface!';
  RAISE NOTICE '';
  RAISE NOTICE 'NOTE: This script creates 4 buckets: cruise-lines, destinations, site, categories';
  RAISE NOTICE 'CMS content buckets (offers, news, guides) and CRM assets remain separate.';
  RAISE NOTICE '';

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating buckets: %', SQLERRM;
    RAISE NOTICE 'You may need to create buckets manually in Supabase Dashboard';
END $$;

-- ============================================================================
-- STORAGE POLICIES SETUP INSTRUCTIONS
-- ============================================================================
-- 
-- Storage policies must be created via Supabase Dashboard (requires 
-- superuser privileges). Create the following policies for each bucket:
--
-- For each bucket (cruise-lines, destinations, site, categories):
--
-- 1. PUBLIC READ POLICY
--    Name: {bucket}_public_read
--    Operation: SELECT
--    Target roles: public (or anon + authenticated)
--    USING expression: bucket_id = '{bucket}'
--
-- 2. AUTHENTICATED INSERT POLICY
--    Name: {bucket}_authenticated_insert
--    Operation: INSERT
--    Target roles: authenticated
--    WITH CHECK expression: bucket_id = '{bucket}'
--
-- 3. AUTHENTICATED UPDATE POLICY
--    Name: {bucket}_authenticated_update
--    Operation: UPDATE
--    Target roles: authenticated
--    USING expression: bucket_id = '{bucket}'
--    WITH CHECK expression: bucket_id = '{bucket}'
--
-- 4. AUTHENTICATED DELETE POLICY
--    Name: {bucket}_authenticated_delete
--    Operation: DELETE
--    Target roles: authenticated
--    USING expression: bucket_id = '{bucket}'
--
-- HOW TO CREATE POLICIES IN SUPABASE DASHBOARD:
--   1. Go to Supabase Dashboard → Storage
--   2. Select bucket (e.g., 'cruise-lines')
--   3. Go to 'Policies' tab
--   4. Click "New Policy"
--   5. Select "For full customization" (custom policy)
--   6. Fill in:
--      - Policy name: cruise-lines_public_read
--      - Allowed operation: SELECT
--      - Target roles: Check 'public' (or both anon + authenticated)
--      - USING expression: bucket_id = 'cruise-lines'
--   7. Click "Save"
--   8. Repeat for INSERT, UPDATE, DELETE (authenticated only)
--   9. Repeat all 4 policies for: destinations, site, categories
--
-- TOTAL: 4 policies × 4 buckets = 16 policies to create manually
--
-- ALTERNATIVE (SQL - if you have superuser access):
--   See detailed policy creation SQL in IMAGE_MANAGEMENT_GUIDE.md
--
-- ============================================================================
-- VERIFY BUCKETS EXIST
-- ============================================================================

SELECT 
  id as bucket_id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id IN ('cruise-lines', 'destinations', 'site', 'categories')
ORDER BY id;

-- ============================================================================
-- NOTES
-- ============================================================================
--
-- FOLDER STRUCTURE (NEW - Per Plan):
--   Folders are created automatically when you upload files with paths like:
--
--   cruise-lines/
--     ├── {cruise-line-slug}/
--     │   ├── logo.webp
--     │   ├── hero.webp
--     │   ├── card.webp
--     │   └── ships/
--     │       └── {ship-slug}/
--     │           ├── hero.webp
--     │           ├── card.webp
--     │           ├── exterior.webp (REQUIRED)
--     │           ├── deck.webp (REQUIRED)
--     │           ├── suite.webp (REQUIRED)
--     │           ├── dining.webp (REQUIRED)
--     │           ├── pool.webp (optional)
--     │           ├── entertainment.webp (optional)
--     │           ├── spa.webp (optional)
--     │           └── theater.webp (optional)
--
--   destinations/
--     └── {destination-slug}/
--         ├── hero.webp (1920×800)
--         ├── card.webp (400×300)
--         └── mobile.webp (800×600, optional)
--
--   site/
--     ├── hero.webp (1920×1080)
--     ├── hero-mobile.webp (800×600, optional)
--     ├── logo.webp (512×512 or SVG)
--     ├── og-image.webp (1200×630)
--     ├── favicon.ico
--     └── team/
--         ├── 001.webp (1200×800)
--         ├── 002.webp
--         └── 003.webp
--
--   categories/
--     ├── luxury.webp (400×300)
--     ├── family.webp
--     ├── river.webp
--     ├── expedition.webp
--     ├── adults-only.webp
--     └── budget.webp
--
-- URL FORMAT:
--   https://{project-id}.supabase.co/storage/v1/object/public/{bucket}/{path}
--
-- EXAMPLE URLS (NEW STRUCTURE):
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/cruise-lines/royal-caribbean/logo.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/cruise-lines/royal-caribbean/hero.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/cruise-lines/royal-caribbean/ships/symphony-of-the-seas/hero.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/cruise-lines/royal-caribbean/ships/symphony-of-the-seas/exterior.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/caribbean/hero.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/destinations/caribbean/card.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/site/hero.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/site/team/001.webp
--   https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/categories/luxury.webp
--
-- ============================================================================

