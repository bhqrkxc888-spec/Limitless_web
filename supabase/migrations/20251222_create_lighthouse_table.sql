-- Create website_lighthouse table for storing Lighthouse audit results
-- This table stores performance, accessibility, best practices, and SEO scores
-- from Google PageSpeed Insights API

CREATE TABLE IF NOT EXISTS website_lighthouse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  strategy TEXT NOT NULL CHECK (strategy IN ('desktop', 'mobile')),
  performance_score INTEGER NOT NULL CHECK (performance_score >= 0 AND performance_score <= 100),
  accessibility_score INTEGER NOT NULL CHECK (accessibility_score >= 0 AND accessibility_score <= 100),
  best_practices_score INTEGER NOT NULL CHECK (best_practices_score >= 0 AND best_practices_score <= 100),
  seo_score INTEGER NOT NULL CHECK (seo_score >= 0 AND seo_score <= 100),
  
  -- Core Web Vitals (in milliseconds)
  lcp NUMERIC,
  fid NUMERIC,
  cls NUMERIC,
  fcp NUMERIC,
  tti NUMERIC,
  speed_index NUMERIC,
  tbt NUMERIC,
  
  -- Opportunities and diagnostics (stored as JSONB)
  opportunities JSONB DEFAULT '[]'::jsonb,
  diagnostics JSONB DEFAULT '[]'::jsonb,
  
  -- Full raw data from PageSpeed Insights (for detailed analysis)
  raw_data JSONB,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_created_at ON website_lighthouse(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_strategy ON website_lighthouse(strategy);
CREATE INDEX IF NOT EXISTS idx_website_lighthouse_url ON website_lighthouse(url);

-- Add RLS policies (if RLS is enabled)
ALTER TABLE website_lighthouse ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all results
CREATE POLICY "Allow authenticated users to read lighthouse results"
  ON website_lighthouse
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow service role to insert (for API endpoints)
CREATE POLICY "Allow service role to insert lighthouse results"
  ON website_lighthouse
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Add comment
COMMENT ON TABLE website_lighthouse IS 'Stores Lighthouse audit results from Google PageSpeed Insights API';
COMMENT ON COLUMN website_lighthouse.strategy IS 'Audit strategy: desktop or mobile';
COMMENT ON COLUMN website_lighthouse.opportunities IS 'JSON array of optimization opportunities';
COMMENT ON COLUMN website_lighthouse.diagnostics IS 'JSON array of diagnostic information';
COMMENT ON COLUMN website_lighthouse.raw_data IS 'Full raw response from PageSpeed Insights API';

