-- SAFE FIX: Make alt_text nullable (non-destructive)
-- This allows uploads even if alt text is empty initially

ALTER TABLE site_images 
ALTER COLUMN alt_text DROP NOT NULL;

-- Verify the change
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'site_images' 
AND column_name = 'alt_text';

