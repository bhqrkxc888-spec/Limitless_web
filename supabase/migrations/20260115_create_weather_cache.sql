-- Create weather_cache table for server-side caching of weather API data
-- This allows one API call to serve all users for the cache duration

CREATE TABLE IF NOT EXISTS weather_cache (
  location_key TEXT PRIMARY KEY,  -- Format: "lat,lon" e.g., "50.8998,-1.4044"
  data JSONB NOT NULL,            -- Full weather data from One Call API 3.0
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient cache expiry cleanup
CREATE INDEX IF NOT EXISTS idx_weather_cache_expires ON weather_cache(expires_at);

-- Index for timestamp queries
CREATE INDEX IF NOT EXISTS idx_weather_cache_fetched ON weather_cache(fetched_at);

-- Enable Row Level Security (RLS)
ALTER TABLE weather_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access (anyone can read cached weather)
CREATE POLICY "Allow public read access to weather cache"
  ON weather_cache
  FOR SELECT
  USING (true);

-- Policy: Allow service role to insert/update cache
CREATE POLICY "Allow service role to manage weather cache"
  ON weather_cache
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_weather_cache_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row updates
CREATE TRIGGER update_weather_cache_timestamp
  BEFORE UPDATE ON weather_cache
  FOR EACH ROW
  EXECUTE FUNCTION update_weather_cache_updated_at();

-- Comment on table
COMMENT ON TABLE weather_cache IS 'Server-side cache for OpenWeatherMap One Call API 3.0 data. Reduces API calls by serving cached data to all users.';
