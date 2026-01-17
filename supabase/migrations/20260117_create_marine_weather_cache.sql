-- Create marine_weather_cache table for server-side caching of Stormglass marine API data
-- Uses 24-hour cache to respect free tier limit (10 requests/day)
-- This allows one API call per port per day to serve all users

CREATE TABLE IF NOT EXISTS marine_weather_cache (
  location_key TEXT PRIMARY KEY,  -- Format: "lat,lon" e.g., "43.3713,-8.3964"
  port_id TEXT,                   -- Port identifier for easier lookup
  data JSONB NOT NULL,            -- Full marine weather data from Stormglass
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient cache expiry cleanup
CREATE INDEX IF NOT EXISTS idx_marine_weather_cache_expires ON marine_weather_cache(expires_at);

-- Index for port lookups
CREATE INDEX IF NOT EXISTS idx_marine_weather_cache_port ON marine_weather_cache(port_id);

-- Index for timestamp queries
CREATE INDEX IF NOT EXISTS idx_marine_weather_cache_fetched ON marine_weather_cache(fetched_at);

-- Enable Row Level Security (RLS)
ALTER TABLE marine_weather_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access (anyone can read cached marine weather)
CREATE POLICY "Allow public read access to marine weather cache"
  ON marine_weather_cache
  FOR SELECT
  USING (true);

-- Policy: Allow service role to insert/update cache
CREATE POLICY "Allow service role to manage marine weather cache"
  ON marine_weather_cache
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_marine_weather_cache_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row updates
CREATE TRIGGER update_marine_weather_cache_timestamp
  BEFORE UPDATE ON marine_weather_cache
  FOR EACH ROW
  EXECUTE FUNCTION update_marine_weather_cache_updated_at();

-- Comment on table
COMMENT ON TABLE marine_weather_cache IS 'Server-side cache for Stormglass marine weather API data. 24-hour cache to respect free tier (10 requests/day).';
