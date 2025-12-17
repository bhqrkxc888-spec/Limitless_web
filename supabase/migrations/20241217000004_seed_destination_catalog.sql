-- Migration: Seed destination catalog from existing data
-- Description: Populate web.destination_catalog with destinations from the website

-- ============================================================================
-- Seed web.destination_catalog
-- ============================================================================

INSERT INTO web.destination_catalog (slug, name, region, enabled, sort_order)
VALUES
  ('mediterranean-cruises', 'Mediterranean', 'Europe', true, 10),
  ('caribbean-cruises', 'Caribbean', 'Americas', true, 20),
  ('norwegian-fjords-cruises', 'Norwegian Fjords', 'Europe', true, 30),
  ('atlantic-islands-cruises', 'Atlantic Islands', 'Europe', true, 40),
  ('alaska-cruises', 'Alaska', 'Americas', true, 50),
  ('baltic-cruises', 'Baltic & Northern Europe', 'Europe', true, 60),
  ('british-isles-cruises', 'British Isles', 'Europe', true, 70),
  ('transatlantic-cruises', 'Transatlantic', 'Atlantic', true, 80),
  ('hawaii-cruises', 'Hawaii', 'Pacific', true, 90),
  ('australia-cruises', 'Australia', 'Pacific', true, 100),
  ('greek-isles-cruises', 'Greek Isles', 'Europe', true, 110),
  ('adriatic-cruises', 'Adriatic', 'Europe', true, 120),
  ('scandinavia-cruises', 'Scandinavia', 'Europe', true, 130),
  ('canada-new-england-cruises', 'Canada & New England', 'Americas', true, 140),
  ('panama-canal-cruises', 'Panama Canal', 'Americas', true, 150),
  ('southeast-asia-cruises', 'Southeast Asia', 'Asia', true, 160)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- Verify seed data
-- ============================================================================

-- These queries are for reference only (commented out for migration)
-- SELECT COUNT(*) as destination_count FROM web.destination_catalog;
-- SELECT * FROM web.destination_catalog ORDER BY sort_order;

