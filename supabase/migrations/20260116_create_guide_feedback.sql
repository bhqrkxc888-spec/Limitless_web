-- Guide Feedback Table
-- Tracks user feedback on cruise guide sections (Yes/No helpful votes)

CREATE TABLE IF NOT EXISTS guide_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cruise_code TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  port_name TEXT,
  section_key TEXT NOT NULL,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  session_id TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_guide_feedback_cruise ON guide_feedback(cruise_code);
CREATE INDEX IF NOT EXISTS idx_guide_feedback_day ON guide_feedback(day_number);
CREATE INDEX IF NOT EXISTS idx_guide_feedback_section ON guide_feedback(section_key);
CREATE INDEX IF NOT EXISTS idx_guide_feedback_session ON guide_feedback(session_id);

-- Enable RLS
ALTER TABLE guide_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public feedback)
CREATE POLICY "Allow anonymous feedback inserts" ON guide_feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated reads (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON guide_feedback
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE guide_feedback IS 'Stores user feedback votes on cruise guide sections';
COMMENT ON COLUMN guide_feedback.cruise_code IS 'Cruise identifier (e.g., G606)';
COMMENT ON COLUMN guide_feedback.day_number IS 'Day number in the cruise itinerary';
COMMENT ON COLUMN guide_feedback.port_name IS 'Name of the port (null for sea days)';
COMMENT ON COLUMN guide_feedback.section_key IS 'Section identifier (overview, weather, stayLocal, etc.)';
COMMENT ON COLUMN guide_feedback.is_helpful IS 'True if user voted Yes, False if voted No';
COMMENT ON COLUMN guide_feedback.session_id IS 'Anonymous session identifier for deduplication';
