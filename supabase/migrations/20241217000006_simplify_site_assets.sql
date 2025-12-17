-- Migration: Simplify site_assets table
-- Description: Remove unnecessary metadata columns, keep only essentials

-- Drop unnecessary columns if they exist
ALTER TABLE web.site_assets DROP COLUMN IF EXISTS width;
ALTER TABLE web.site_assets DROP COLUMN IF EXISTS height;
ALTER TABLE web.site_assets DROP COLUMN IF EXISTS bytes;
ALTER TABLE web.site_assets DROP COLUMN IF EXISTS mime;
ALTER TABLE web.site_assets DROP COLUMN IF EXISTS has_alpha;

-- Ensure we have the essential columns
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'web' AND table_name = 'site_assets' AND column_name = 'id') THEN
    ALTER TABLE web.site_assets ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'web' AND table_name = 'site_assets' AND column_name = 'asset_type') THEN
    ALTER TABLE web.site_assets ADD COLUMN asset_type text NOT NULL;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'web' AND table_name = 'site_assets' AND column_name = 'entity_key') THEN
    ALTER TABLE web.site_assets ADD COLUMN entity_key text NULL;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'web' AND table_name = 'site_assets' AND column_name = 'url') THEN
    ALTER TABLE web.site_assets ADD COLUMN url text NOT NULL;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'web' AND table_name = 'site_assets' AND column_name = 'updated_at') THEN
    ALTER TABLE web.site_assets ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Update asset_type constraint to include all types
ALTER TABLE web.site_assets DROP CONSTRAINT IF EXISTS site_assets_asset_type_check;
ALTER TABLE web.site_assets ADD CONSTRAINT site_assets_asset_type_check 
CHECK (asset_type IN (
  'site_logo', 'favicon', 'home_hero', 'og_image',
  'destination_hero', 'cruise_line_logo', 'cruise_line_card', 
  'cruise_line_hero', 'ship_card', 'ship_hero'
));

-- Comment on the simplified structure
COMMENT ON TABLE web.site_assets IS 'Minimal asset tracking: just asset_type, entity_key, url, and updated_at';

