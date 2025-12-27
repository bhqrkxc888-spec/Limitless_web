-- ============================================================================
-- PERFECT BUCKET STRUCTURE - CREATE NEW BUCKETS WITH PROPER NAMES
-- ============================================================================
-- This creates new buckets with CMS_ and CRM_ prefixes
-- Files will need to be moved from old buckets to new buckets
--
-- IMPORTANT: This doesn't delete old buckets or files - it just creates new ones
-- After files are migrated, we can delete old buckets manually
-- ============================================================================

-- Step 1: Create new CMS buckets
-- ============================================================================

-- 1. CMS_offers (replacing offers)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'CMS_offers',
  'CMS_offers',
  true,
  10485760, -- 10MB (same as guides)
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 2. CMS_guides (replacing guides)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'CMS_guides',
  'CMS_guides',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 3. CMS_travel-news (replacing travel-news)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'CMS_travel-news',
  'CMS_travel-news',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create new CRM buckets
-- ============================================================================

-- 4. CRM_assets (replacing crm-assets)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'CRM_assets',
  'CRM_assets',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 5. CRM_price-match-documents (replacing price-match-documents)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'CRM_price-match-documents',
  'CRM_price-match-documents',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT 
  id as bucket_id,
  name,
  public,
  file_size_limit / 1024 / 1024 as size_limit_mb,
  created_at
FROM storage.buckets
ORDER BY id;

-- ============================================================================
-- NEXT STEPS (AFTER RUNNING THIS)
-- ============================================================================
--
-- 1. Run this script to create new buckets
-- 2. Update all code to reference new bucket names (I'll do this automatically)
-- 3. For CMS content:
--    - Since it's currently working, we can keep old buckets temporarily
--    - New content will go to new buckets
--    - Old content stays in old buckets until manually migrated
-- 4. For CRM:
--    - Same approach - new content to new buckets
--    - Old content stays until migrated
-- 5. After all code is updated and tested, manually delete old buckets:
--    - offers (→ CMS_offers)
--    - guides (→ CMS_guides)
--    - travel-news (→ CMS_travel-news)
--    - crm-assets (→ CRM_assets)
--    - price-match-documents (→ CRM_price-match-documents)
--
-- ============================================================================

