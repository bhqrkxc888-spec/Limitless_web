-- Port Data System Schema
-- Enables scalable port management with dynamic cruise itinerary generation

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PORTS TABLE - Main port content storage
-- ============================================
CREATE TABLE IF NOT EXISTS ports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  
  -- Geography
  coordinates JSONB NOT NULL DEFAULT '{}',
  
  -- Port metadata
  tagline TEXT,
  description TEXT,
  port_character TEXT,
  
  -- Structured data (JSONB for flexibility)
  about_port JSONB DEFAULT '{}',
  quick_facts JSONB DEFAULT '{}',
  transport_connections JSONB DEFAULT '{}',
  getting_around JSONB DEFAULT '{}',
  must_see_sights JSONB DEFAULT '[]',
  shore_excursions JSONB DEFAULT '[]',
  nearest_beach JSONB DEFAULT '{}',
  food_and_drink JSONB DEFAULT '[]',
  insider_tips JSONB DEFAULT '[]',
  faq JSONB DEFAULT '[]',
  weather JSONB DEFAULT '{}',
  practical_info JSONB DEFAULT '{}',
  
  -- Detailed content sections (G606-style content)
  content_overview JSONB DEFAULT '{}',
  content_stay_local JSONB DEFAULT '{}',
  content_go_further JSONB DEFAULT '{}',
  content_with_kids JSONB DEFAULT '{}',
  content_accessibility JSONB DEFAULT '{}',
  content_medical JSONB DEFAULT '{}',
  content_food_drink JSONB DEFAULT '{}',
  content_practical JSONB DEFAULT '{}',
  
  -- Family-friendly structured data
  family_friendly JSONB DEFAULT '{}',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Admin
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  source_file TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_ports_slug ON ports(slug);
CREATE INDEX IF NOT EXISTS idx_ports_region ON ports(region);
CREATE INDEX IF NOT EXISTS idx_ports_country ON ports(country);
CREATE INDEX IF NOT EXISTS idx_ports_status ON ports(status);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_ports_search ON ports USING GIN (
  to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(country, '') || ' ' || COALESCE(description, ''))
);

-- ============================================
-- CRUISE_PORTS - Links cruises to ports
-- ============================================
CREATE TABLE IF NOT EXISTS cruise_ports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cruise_id UUID NOT NULL,
  port_id UUID REFERENCES ports(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  arrival_time TEXT,
  departure_time TEXT,
  overnight BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(cruise_id, day_number)
);

CREATE INDEX IF NOT EXISTS idx_cruise_ports_cruise ON cruise_ports(cruise_id);
CREATE INDEX IF NOT EXISTS idx_cruise_ports_port ON cruise_ports(port_id);

-- ============================================
-- CRUISE_SEA_DAYS - Sea day content (placeholder for ship-specific)
-- ============================================
CREATE TABLE IF NOT EXISTS cruise_sea_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cruise_id UUID NOT NULL,
  day_number INTEGER NOT NULL,
  title TEXT DEFAULT 'At Sea',
  description TEXT,
  ship_specific_content JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(cruise_id, day_number)
);

CREATE INDEX IF NOT EXISTS idx_cruise_sea_days_cruise ON cruise_sea_days(cruise_id);

-- ============================================
-- RLS POLICIES
-- ============================================
ALTER TABLE ports ENABLE ROW LEVEL SECURITY;
ALTER TABLE cruise_ports ENABLE ROW LEVEL SECURITY;
ALTER TABLE cruise_sea_days ENABLE ROW LEVEL SECURITY;

-- Ports: Permissive policies (admin auth handled at application level)
CREATE POLICY "Allow all reads" ON ports
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow all inserts" ON ports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all updates" ON ports
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all deletes" ON ports
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Public can read cruise_ports
CREATE POLICY "Allow public to read cruise_ports" ON cruise_ports
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated can manage cruise_ports
CREATE POLICY "Allow authenticated to manage cruise_ports" ON cruise_ports
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public can read sea days
CREATE POLICY "Allow public to read cruise_sea_days" ON cruise_sea_days
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated can manage sea days
CREATE POLICY "Allow authenticated to manage cruise_sea_days" ON cruise_sea_days
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_ports_timestamp ON ports;
CREATE TRIGGER update_ports_timestamp
  BEFORE UPDATE ON ports
  FOR EACH ROW
  EXECUTE FUNCTION update_ports_updated_at();

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE ports IS 'Main port guide content storage with JSONB for flexible schema evolution';
COMMENT ON COLUMN ports.slug IS 'URL-friendly identifier (e.g., southampton, la-coruna)';
COMMENT ON COLUMN ports.region IS 'Geographic grouping (e.g., uk, atlantic-coast, mediterranean)';
COMMENT ON COLUMN ports.content_overview IS 'G606-style overview section with hook, description, port info';
COMMENT ON COLUMN ports.content_stay_local IS 'Walking distance attractions, beaches, parks';
COMMENT ON COLUMN ports.content_go_further IS 'Day trips requiring transport';
COMMENT ON COLUMN ports.family_friendly IS 'Structured data for McDonald''s, ALE-HOP, parks near port';
COMMENT ON TABLE cruise_ports IS 'Junction table linking cruises to ports with day ordering';
COMMENT ON TABLE cruise_sea_days IS 'Sea day placeholder content, extensible for ship-specific features';
