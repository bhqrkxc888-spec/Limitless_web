/**
 * Weather API with Supabase Caching
 * 
 * This serverless function fetches weather data from OpenWeatherMap One Call API 3.0
 * and caches results in Supabase for 1 hour to minimize API calls and serve all users.
 * 
 * Features:
 * - One Call API 3.0: Current + 48h hourly + 8d daily + alerts
 * - Server-side caching via Supabase
 * - Automatic cache expiration
 * - Fallback error handling
 */

import { createClient } from '@supabase/supabase-js';

const CACHE_TTL_HOURS = 1;
const CACHE_TTL_MS = CACHE_TTL_HOURS * 60 * 60 * 1000;
const ONECALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lon } = req.query;

  // Validate parameters
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon parameters' });
  }

  // Validate lat/lon ranges
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  
  if (isNaN(latitude) || isNaN(longitude) || 
      latitude < -90 || latitude > 90 || 
      longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Invalid lat or lon values' });
  }

  // Check API keys
  const weatherApiKey = process.env.VITE_OPENWEATHER_API_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!weatherApiKey) {
    return res.status(500).json({ error: 'Weather API key not configured' });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  // Initialize Supabase with service role key (bypasses RLS for cache management)
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const locationKey = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;

  try {
    // Step 1: Check Supabase cache
    const { data: cached, error: cacheError } = await supabase
      .from('weather_cache')
      .select('data, expires_at')
      .eq('location_key', locationKey)
      .single();

    // If cache hit and not expired, return cached data
    if (cached && !cacheError) {
      const expiresAt = new Date(cached.expires_at);
      const now = new Date();

      if (expiresAt > now) {
        // Cache is still fresh
        return res.status(200).json({
          ...cached.data,
          _cached: true,
          _cached_until: cached.expires_at
        });
      }
    }

    // Step 2: Cache miss or expired - fetch from One Call API 3.0
    const weatherUrl = `${ONECALL_URL}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric&lang=en`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.status} ${weatherResponse.statusText}`);
    }

    const weatherData = await weatherResponse.json();

    // Validate response structure
    if (!weatherData.current) {
      throw new Error('Invalid weather data received from API');
    }

    // Step 3: Store in Supabase cache
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CACHE_TTL_MS);

    const { error: upsertError } = await supabase
      .from('weather_cache')
      .upsert({
        location_key: locationKey,
        data: weatherData,
        fetched_at: now.toISOString(),
        expires_at: expiresAt.toISOString()
      }, {
        onConflict: 'location_key'
      });

    if (upsertError) {
      console.error('Failed to cache weather data:', upsertError);
      // Continue anyway - we have the data
    }

    // Step 4: Return fresh data
    return res.status(200).json({
      ...weatherData,
      _cached: false,
      _fetched_at: now.toISOString()
    });

  } catch (error) {
    console.error('Weather API error:', error);
    
    return res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
}
