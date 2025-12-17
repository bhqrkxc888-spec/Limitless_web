-- Migration: Add home_hero and og_image asset types
-- Description: Extend site_assets table to support home page hero and social share images

-- ============================================================================
-- Update the asset_type check constraint
-- ============================================================================

-- Drop the existing constraint
ALTER TABLE web.site_assets DROP CONSTRAINT IF EXISTS site_assets_asset_type_check;

-- Add new constraint with additional asset types
ALTER TABLE web.site_assets ADD CONSTRAINT site_assets_asset_type_check 
CHECK (asset_type IN (
  'site_logo',
  'favicon',
  'home_hero',
  'og_image',
  'destination_hero',
  'cruise_line_logo',
  'cruise_line_card',
  'cruise_line_hero',
  'ship_card',
  'ship_hero'
));

-- ============================================================================
-- Add helpful comments
-- ============================================================================

COMMENT ON COLUMN web.site_assets.asset_type IS 'Asset type: site_logo, favicon, home_hero, og_image, destination_hero, cruise_line_*, ship_*';

