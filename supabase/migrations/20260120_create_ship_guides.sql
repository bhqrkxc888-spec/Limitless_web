-- Ship Guides System Schema
-- Comprehensive cruise ship information with tabbed sections
-- Similar architecture to Port Guides for consistency

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SHIP_GUIDES TABLE - Main ship content storage
-- ============================================
CREATE TABLE IF NOT EXISTS ship_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  
  -- Basic ship info
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  cruise_line_slug TEXT NOT NULL,
  cruise_line_name TEXT NOT NULL,
  
  -- Ship specifications
  year_built INTEGER,
  year_refurbished INTEGER,
  gross_tonnage INTEGER,
  length_meters DECIMAL(6,2),
  beam_meters DECIMAL(5,2),
  passenger_capacity INTEGER,
  crew_count INTEGER,
  deck_count INTEGER,
  speed_knots DECIMAL(4,1),
  
  -- Hero and card images
  hero_image_url TEXT,
  card_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  
  -- Overview section
  tagline TEXT,
  description TEXT,
  highlights JSONB DEFAULT '[]',
  overview_content JSONB DEFAULT '{}',
  
  -- Cabins section (stateroom types, suites, etc)
  cabins JSONB DEFAULT '{}',
  
  -- Deck plans
  deck_plans JSONB DEFAULT '[]',
  
  -- Onboard amenities
  onboard JSONB DEFAULT '{}',
  
  -- Food & Drink
  dining JSONB DEFAULT '{}',
  
  -- Entertainment
  entertainment JSONB DEFAULT '{}',
  
  -- Activities
  activities JSONB DEFAULT '{}',
  
  -- Family facilities
  family JSONB DEFAULT '{}',
  
  -- Kids clubs and youth programs
  kids JSONB DEFAULT '{}',
  
  -- Accessibility & SEND
  accessibility JSONB DEFAULT '{}',
  
  -- Wellness (Spa, Gym, Beauty)
  wellness JSONB DEFAULT '{}',
  
  -- FAQ
  faq JSONB DEFAULT '[]',
  
  -- Additional structured data
  practical_info JSONB DEFAULT '{}',
  whats_included JSONB DEFAULT '[]',
  dress_code JSONB DEFAULT '{}',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Schema.org structured data hints
  schema_data JSONB DEFAULT '{}',
  
  -- Admin
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  -- Timestamps
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_ship_guides_slug ON ship_guides(slug);
CREATE INDEX IF NOT EXISTS idx_ship_guides_cruise_line ON ship_guides(cruise_line_slug);
CREATE INDEX IF NOT EXISTS idx_ship_guides_status ON ship_guides(status);
CREATE INDEX IF NOT EXISTS idx_ship_guides_featured ON ship_guides(featured) WHERE featured = true;

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_ship_guides_search ON ship_guides USING GIN (
  to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(cruise_line_name, '') || ' ' || COALESCE(description, ''))
);

-- ============================================
-- SHIP_GUIDE_RATINGS - User ratings for ships
-- ============================================
CREATE TABLE IF NOT EXISTS ship_guide_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ship_slug TEXT NOT NULL REFERENCES ship_guides(slug) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  reviewer_name TEXT,
  reviewer_email TEXT,
  sailed_date DATE,
  cabin_type TEXT,
  verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ship_ratings_slug ON ship_guide_ratings(ship_slug);
CREATE INDEX IF NOT EXISTS idx_ship_ratings_status ON ship_guide_ratings(status);

-- Rating stats view
CREATE OR REPLACE VIEW ship_guide_rating_stats AS
SELECT 
  ship_slug,
  COUNT(*) as rating_count,
  ROUND(AVG(rating)::numeric, 1) as average_rating,
  COUNT(*) FILTER (WHERE rating = 5) as five_star,
  COUNT(*) FILTER (WHERE rating = 4) as four_star,
  COUNT(*) FILTER (WHERE rating = 3) as three_star,
  COUNT(*) FILTER (WHERE rating = 2) as two_star,
  COUNT(*) FILTER (WHERE rating = 1) as one_star
FROM ship_guide_ratings
WHERE status = 'approved'
GROUP BY ship_slug;

-- ============================================
-- RLS POLICIES
-- ============================================
ALTER TABLE ship_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ship_guide_ratings ENABLE ROW LEVEL SECURITY;

-- Ship guides: Public read, authenticated write
CREATE POLICY "Allow public to read ship_guides" ON ship_guides
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published' OR status = 'draft');

CREATE POLICY "Allow authenticated to manage ship_guides" ON ship_guides
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ratings: Public read approved, anyone can insert
CREATE POLICY "Allow public to read approved ratings" ON ship_guide_ratings
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Allow anyone to submit ratings" ON ship_guide_ratings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated to manage ratings" ON ship_guide_ratings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ship_guides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_ship_guides_timestamp ON ship_guides;
CREATE TRIGGER update_ship_guides_timestamp
  BEFORE UPDATE ON ship_guides
  FOR EACH ROW
  EXECUTE FUNCTION update_ship_guides_updated_at();

-- ============================================
-- RPC: Get ship guide by slug with ratings
-- ============================================
CREATE OR REPLACE FUNCTION get_ship_guide_with_ratings(p_slug TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'ship', row_to_json(s),
    'ratings', (
      SELECT json_build_object(
        'count', COALESCE(r.rating_count, 0),
        'average', COALESCE(r.average_rating, 0),
        'breakdown', json_build_object(
          'five', COALESCE(r.five_star, 0),
          'four', COALESCE(r.four_star, 0),
          'three', COALESCE(r.three_star, 0),
          'two', COALESCE(r.two_star, 0),
          'one', COALESCE(r.one_star, 0)
        )
      )
      FROM ship_guide_rating_stats r
      WHERE r.ship_slug = s.slug
    )
  ) INTO result
  FROM ship_guides s
  WHERE s.slug = p_slug;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE ship_guides IS 'Comprehensive cruise ship guides with tabbed content sections';
COMMENT ON COLUMN ship_guides.slug IS 'URL-friendly identifier (e.g., iona, britannia, arvia)';
COMMENT ON COLUMN ship_guides.cabins IS 'Stateroom types, suites, cabin features and deck locations';
COMMENT ON COLUMN ship_guides.deck_plans IS 'Deck-by-deck layout information and highlights';
COMMENT ON COLUMN ship_guides.dining IS 'Restaurants, cafes, bars, room service info';
COMMENT ON COLUMN ship_guides.entertainment IS 'Shows, theatre, live music, cinema, activities';
COMMENT ON COLUMN ship_guides.activities IS 'Pools, sports, fitness, classes, enrichment';
COMMENT ON COLUMN ship_guides.family IS 'Family-friendly facilities and services';
COMMENT ON COLUMN ship_guides.kids IS 'Kids clubs by age group, teen zones, activities';
COMMENT ON COLUMN ship_guides.accessibility IS 'Accessible cabins, facilities, mobility services';
COMMENT ON COLUMN ship_guides.wellness IS 'Spa, gym, beauty salon, thermal suite';
