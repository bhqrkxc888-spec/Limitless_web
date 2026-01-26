-- Phase 4A: Add Flexible Subsections Support
-- Enables dynamic 1-N subsections per port guide area
-- Maintains backward compatibility with existing rigid structure

-- ============================================
-- MIGRATION STRATEGY
-- ============================================
-- 1. No schema changes needed - JSONB already supports any structure
-- 2. This migration adds comments/documentation only
-- 3. New structure: content_stay_local.subsections[] array
-- 4. Old structure still works (backward compatible)

-- ============================================
-- NEW FLEXIBLE STRUCTURE DOCUMENTATION
-- ============================================
COMMENT ON COLUMN ports.content_stay_local IS 
'Walking distance content. NEW STRUCTURE (recommended):
{
  "overview": "Section introduction text",
  "subsections": [
    {
      "id": "unique-slug",
      "title": "Any Title Here",
      "type": "attraction|food|shopping|beach|park|transport",
      "distance": "5 minutes",
      "terrain": "flat|some-hills|steep|mixed",
      "content": "Description...",
      "highlights": ["Point 1", "Point 2"],
      "mapLink": "https://maps.google.com/...",
      "hours": "9:00-17:00",
      "accessibility": "Wheelchair accessible"
    }
  ]
}
OLD STRUCTURE (still supported): { "quickWalk": [...], "longerWalk": [...], "beach": {...} }';

COMMENT ON COLUMN ports.content_go_further IS 
'Day trips requiring transport. NEW STRUCTURE (recommended):
{
  "overview": "Section introduction text",
  "subsections": [
    {
      "id": "unique-slug",
      "title": "Any Title Here",
      "type": "attraction|food|town|nature|historic",
      "distance": "30 minutes by train",
      "content": "Description...",
      "highlights": ["Point 1", "Point 2"],
      "transport": "Train from port, €10 return",
      "mapLink": "https://maps.google.com/...",
      "allowTime": "Full day recommended"
    }
  ]
}
OLD STRUCTURE (still supported): { "attractions": [...] }';

COMMENT ON COLUMN ports.content_with_kids IS 
'Family-friendly activities. NEW STRUCTURE (recommended):
{
  "overview": "Section introduction text",
  "subsections": [
    {
      "id": "unique-slug",
      "title": "Any Title Here",
      "type": "park|beach|attraction|indoor|outdoor",
      "ageGroups": ["toddlers", "older-kids", "teens"],
      "content": "Description...",
      "highlights": ["Point 1", "Point 2"],
      "facilities": "Toilets, cafe, play area",
      "duration": "2-3 hours"
    }
  ]
}
OLD STRUCTURE (still supported): { "toddlers": [...], "olderKids": [...], "easyDay": {...} }';

COMMENT ON COLUMN ports.content_food_drink IS 
'Food and drink recommendations. NEW STRUCTURE (recommended):
{
  "overview": "Section introduction text",
  "subsections": [
    {
      "id": "unique-slug",
      "title": "Any Title Here",
      "type": "restaurant|cafe|bar|market|specialty",
      "cuisine": "Local seafood",
      "content": "Description...",
      "priceIndicator": "budget|mid-range|upscale",
      "location": "Old Town, near cathedral",
      "specialty": "Pulpo a la gallega"
    }
  ]
}
OLD STRUCTURE (still supported): { "restaurants": [...], "localSpecialty": "...", "drinkingWater": "..." }';

-- ============================================
-- HELPER FUNCTION: Validate Subsection Structure
-- ============================================
CREATE OR REPLACE FUNCTION validate_subsection(subsection JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check required fields exist
  IF NOT (
    subsection ? 'id' AND
    subsection ? 'title' AND
    subsection ? 'content'
  ) THEN
    RETURN FALSE;
  END IF;
  
  -- Check id is not empty
  IF subsection->>'id' = '' THEN
    RETURN FALSE;
  END IF;
  
  -- Check title is not empty
  IF subsection->>'title' = '' THEN
    RETURN FALSE;
  END IF;
  
  -- Check content has minimum length
  IF LENGTH(subsection->>'content') < 50 THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- HELPER FUNCTION: Count Valid Subsections
-- ============================================
CREATE OR REPLACE FUNCTION count_subsections(content JSONB)
RETURNS INTEGER AS $$
DECLARE
  subsections JSONB;
  count INTEGER := 0;
  subsection JSONB;
BEGIN
  -- Get subsections array
  subsections := content->'subsections';
  
  -- Return 0 if no subsections
  IF subsections IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Count valid subsections
  FOR subsection IN SELECT * FROM jsonb_array_elements(subsections)
  LOOP
    IF validate_subsection(subsection) THEN
      count := count + 1;
    END IF;
  END LOOP;
  
  RETURN count;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- HELPER VIEW: Port Guide Completeness
-- ============================================
CREATE OR REPLACE VIEW port_guide_completeness AS
SELECT 
  p.id,
  p.slug,
  p.name,
  p.status,
  
  -- Critical fields
  (p.tagline IS NOT NULL AND p.tagline != '') AS has_tagline,
  (p.description IS NOT NULL AND LENGTH(p.description) > 100) AS has_description,
  
  -- Images (check site_images table)
  EXISTS (
    SELECT 1 FROM site_images si 
    WHERE si.entity_id = p.slug 
    AND si.bucket = 'WEB_port-guides' 
    AND si.path LIKE p.slug || '/hero.%'
  ) AS has_hero_image,
  
  EXISTS (
    SELECT 1 FROM site_images si 
    WHERE si.entity_id = p.slug 
    AND si.bucket = 'WEB_port-guides' 
    AND si.path LIKE p.slug || '/card.%'
  ) AS has_card_image,
  
  -- Content sections (check for subsections OR old structure)
  (
    count_subsections(p.content_stay_local) > 0 
    OR (p.content_stay_local->>'quickWalk' IS NOT NULL)
    OR (p.content_stay_local->>'longerWalk' IS NOT NULL)
  ) AS has_stay_local_content,
  
  (
    count_subsections(p.content_go_further) > 0 
    OR jsonb_array_length(p.content_go_further->'attractions') > 0
  ) AS has_go_further_content,
  
  (
    count_subsections(p.content_with_kids) > 0 
    OR (p.content_with_kids->>'toddlers' IS NOT NULL)
    OR (p.content_with_kids->>'olderKids' IS NOT NULL)
  ) AS has_with_kids_content,
  
  (
    count_subsections(p.content_food_drink) > 0 
    OR jsonb_array_length(p.content_food_drink->'restaurants') > 0
  ) AS has_food_drink_content,
  
  -- Subsection counts (new structure)
  count_subsections(p.content_stay_local) AS stay_local_subsections,
  count_subsections(p.content_go_further) AS go_further_subsections,
  count_subsections(p.content_with_kids) AS with_kids_subsections,
  count_subsections(p.content_food_drink) AS food_drink_subsections,
  
  -- Overall completeness score (0-100)
  (
    (CASE WHEN p.tagline IS NOT NULL AND p.tagline != '' THEN 10 ELSE 0 END) +
    (CASE WHEN LENGTH(p.description) > 100 THEN 10 ELSE 0 END) +
    (CASE WHEN EXISTS (
      SELECT 1 FROM site_images si 
      WHERE si.entity_id = p.slug 
      AND si.bucket = 'WEB_port-guides' 
      AND si.path LIKE p.slug || '/hero.%'
    ) THEN 15 ELSE 0 END) +
    (CASE WHEN EXISTS (
      SELECT 1 FROM site_images si 
      WHERE si.entity_id = p.slug 
      AND si.bucket = 'WEB_port-guides' 
      AND si.path LIKE p.slug || '/card.%'
    ) THEN 15 ELSE 0 END) +
    (CASE WHEN count_subsections(p.content_stay_local) > 0 OR (p.content_stay_local->>'quickWalk' IS NOT NULL) THEN 15 ELSE 0 END) +
    (CASE WHEN count_subsections(p.content_go_further) > 0 OR jsonb_array_length(p.content_go_further->'attractions') > 0 THEN 15 ELSE 0 END) +
    (CASE WHEN count_subsections(p.content_with_kids) > 0 OR (p.content_with_kids->>'toddlers' IS NOT NULL) THEN 10 ELSE 0 END) +
    (CASE WHEN count_subsections(p.content_food_drink) > 0 OR jsonb_array_length(p.content_food_drink->'restaurants') > 0 THEN 10 ELSE 0 END)
  ) AS completeness_score
  
FROM ports p;

COMMENT ON VIEW port_guide_completeness IS 'Port guide quality checker - flags missing critical data';

-- ============================================
-- GRANTS
-- ============================================
GRANT SELECT ON port_guide_completeness TO anon, authenticated;
