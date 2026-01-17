-- Port Guide Ratings and Reviews Table
-- Tracks user ratings (1-5 stars) and optional reviews for port guides

CREATE TABLE IF NOT EXISTS port_guide_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  port_slug TEXT NOT NULL,
  port_name TEXT NOT NULL,
  
  -- Rating (required)
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Optional review
  review_title TEXT,
  review_text TEXT,
  reviewer_name TEXT,
  reviewer_location TEXT,
  visit_date DATE,
  cruise_line TEXT,
  
  -- Permission and moderation
  allow_publish BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  
  -- Helpfulness votes
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID, -- References web.admin_users(id) but FK omitted for flexibility
  
  -- Anonymous tracking
  user_agent TEXT,
  session_id TEXT,
  ip_address INET,
  
  -- Admin notes
  admin_notes TEXT
);

-- Port Guide Rating Helpfulness Votes
-- Tracks whether users found reviews helpful
CREATE TABLE IF NOT EXISTS port_guide_rating_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating_id UUID NOT NULL REFERENCES port_guide_ratings(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(rating_id, session_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_port_ratings_slug ON port_guide_ratings(port_slug);
CREATE INDEX IF NOT EXISTS idx_port_ratings_approved ON port_guide_ratings(is_approved) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_port_ratings_featured ON port_guide_ratings(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_port_ratings_created ON port_guide_ratings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_port_ratings_rating ON port_guide_ratings(rating);
CREATE INDEX IF NOT EXISTS idx_port_rating_votes_rating ON port_guide_rating_votes(rating_id);
CREATE INDEX IF NOT EXISTS idx_port_rating_votes_session ON port_guide_rating_votes(session_id);

-- Enable RLS
ALTER TABLE port_guide_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE port_guide_rating_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for port_guide_ratings

-- Allow anonymous inserts (for public ratings)
CREATE POLICY "Allow anonymous rating inserts" ON port_guide_ratings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public to read approved ratings only
CREATE POLICY "Allow public to read approved ratings" ON port_guide_ratings
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

-- Allow authenticated users (admins) to see all ratings
CREATE POLICY "Allow authenticated full read access" ON port_guide_ratings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update ratings (approval, featured, etc.)
CREATE POLICY "Allow authenticated updates" ON port_guide_ratings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete ratings
CREATE POLICY "Allow authenticated deletes" ON port_guide_ratings
  FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for port_guide_rating_votes

-- Allow anonymous inserts (for helpfulness votes)
CREATE POLICY "Allow anonymous vote inserts" ON port_guide_rating_votes
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public to read vote counts
CREATE POLICY "Allow public to read votes" ON port_guide_rating_votes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Function to update rating helpful counts
CREATE OR REPLACE FUNCTION update_rating_helpful_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE port_guide_ratings
    SET 
      helpful_count = helpful_count + CASE WHEN NEW.is_helpful THEN 1 ELSE 0 END,
      not_helpful_count = not_helpful_count + CASE WHEN NOT NEW.is_helpful THEN 1 ELSE 0 END
    WHERE id = NEW.rating_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update helpful counts
CREATE TRIGGER update_rating_helpful_counts_trigger
  AFTER INSERT ON port_guide_rating_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_rating_helpful_counts();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_port_rating_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on changes
CREATE TRIGGER update_port_rating_timestamp
  BEFORE UPDATE ON port_guide_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_port_rating_updated_at();

-- View for aggregate port ratings (for quick lookups)
CREATE OR REPLACE VIEW port_guide_rating_stats AS
SELECT 
  port_slug,
  port_name,
  COUNT(*) as total_reviews,
  AVG(rating)::DECIMAL(3,2) as average_rating,
  COUNT(*) FILTER (WHERE rating = 5) as five_star_count,
  COUNT(*) FILTER (WHERE rating = 4) as four_star_count,
  COUNT(*) FILTER (WHERE rating = 3) as three_star_count,
  COUNT(*) FILTER (WHERE rating = 2) as two_star_count,
  COUNT(*) FILTER (WHERE rating = 1) as one_star_count,
  COUNT(*) FILTER (WHERE is_featured = true) as featured_count,
  COUNT(*) FILTER (WHERE is_verified = true) as verified_count,
  MAX(created_at) as latest_review_date
FROM port_guide_ratings
WHERE is_approved = true
GROUP BY port_slug, port_name;

-- Grant access to views
GRANT SELECT ON port_guide_rating_stats TO anon, authenticated;

-- Comments for documentation
COMMENT ON TABLE port_guide_ratings IS 'Stores user ratings and reviews for port guides';
COMMENT ON COLUMN port_guide_ratings.rating IS '1-5 star rating (required)';
COMMENT ON COLUMN port_guide_ratings.allow_publish IS 'User permission to publish review publicly';
COMMENT ON COLUMN port_guide_ratings.is_approved IS 'Admin approval status';
COMMENT ON COLUMN port_guide_ratings.is_featured IS 'Featured/highlighted review';
COMMENT ON COLUMN port_guide_ratings.is_verified IS 'Verified cruise passenger (booking reference checked)';
COMMENT ON COLUMN port_guide_ratings.helpful_count IS 'Number of users who found this review helpful';
COMMENT ON COLUMN port_guide_ratings.not_helpful_count IS 'Number of users who did not find this review helpful';

COMMENT ON TABLE port_guide_rating_votes IS 'Tracks helpfulness votes on reviews';
COMMENT ON VIEW port_guide_rating_stats IS 'Aggregated rating statistics per port for quick lookups';
