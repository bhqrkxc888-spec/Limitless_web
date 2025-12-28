-- ============================================================================
-- FIX: site_images entity_type constraint
-- ============================================================================
-- 
-- Problem: The site_images table constraint doesn't allow 'port-guide' or 
-- 'bucket-list' entity types, causing uploads to fail with constraint error
--
-- Error: "new row for relation \"site_images\" violates check constraint 
-- \"site_images_entity_type_check\""
--
-- Solution: Drop old constraint and add new one with all required types
-- ============================================================================

-- Drop the old constraint
ALTER TABLE site_images 
DROP CONSTRAINT IF EXISTS site_images_entity_type_check;

-- Add new constraint with ALL entity types
ALTER TABLE site_images
ADD CONSTRAINT site_images_entity_type_check CHECK (
  entity_type IN (
    'site',
    'destination', 
    'cruise-line',
    'ship',
    'category',
    'team',
    'port-guide',    -- ✅ ADDED for port guide images
    'bucket-list'    -- ✅ ADDED for bucket list experience images
  )
);

-- Verify the constraint exists
SELECT 
  conname AS constraint_name,
  pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conname = 'site_images_entity_type_check';

-- ============================================================================
-- Expected Output:
-- ============================================================================
-- constraint_name              | constraint_definition
-- -----------------------------|--------------------------------------------
-- site_images_entity_type_check | CHECK (entity_type IN ('site', 'destination', 
--                               |   'cruise-line', 'ship', 'category', 'team', 
--                               |   'port-guide', 'bucket-list'))
-- ============================================================================

COMMENT ON CONSTRAINT site_images_entity_type_check ON site_images IS 
'Ensures entity_type is one of: site, destination, cruise-line, ship, category, team, port-guide, bucket-list';

