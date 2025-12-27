-- Fix: Add 'bucket-list' to entity_type check constraint

-- Step 1: Drop the existing check constraint
ALTER TABLE site_images 
DROP CONSTRAINT IF EXISTS site_images_entity_type_check;

-- Step 2: Add new constraint with 'bucket-list' included
ALTER TABLE site_images 
ADD CONSTRAINT site_images_entity_type_check 
CHECK (entity_type IN ('site', 'destination', 'cruise-line', 'ship', 'category', 'bucket-list'));

-- Verify the constraint
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'site_images'::regclass
AND conname = 'site_images_entity_type_check';

