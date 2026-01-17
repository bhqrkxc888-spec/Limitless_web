/**
 * Marine Weather API with Supabase Caching
 * 
 * This serverless function fetches marine weather data from Stormglass.io
 * and caches results in Supabase for 24 hours to stay within free tier (10 requests/day).
 * 
 * Features:
 * - Stormglass marine data: Wave height, water temp, swell, wind
 * - Server-side caching via Supabase (24-hour TTL)
 * - Automatic cache expiration
 * - Fallback error handling
 */

import { createClient } from '@supabase/supabase-js';

const CACHE_TTL_HOURS = 24; // Cache for 24 hours to respect 10 requests/day limit
const CACHE_TTL_MS = CACHE_TTL_HOURS * 60 * 60 * 1000;
const STORMGLASS_URL = 'https://api.stormglass.io/v2/weather/point';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, portId } = req.query;

  // Validate parameters
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  // Validate lat/lng ranges
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  if (isNaN(latitude) || isNaN(longitude) || 
      latitude < -90 || latitude > 90 || 
      longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Invalid lat or lng values' });
  }

  // Check API keys
  const stormglassApiKey = process.env.STORM_GLASS_API;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stormglassApiKey) {
    return res.status(500).json({ error: 'Stormglass API key not configured' });
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
      .from('marine_weather_cache')
      .select('data, expires_at, fetched_at')
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
          _cached_until: cached.expires_at,
          _fetched_at: cached.fetched_at,
          _note: 'Marine data refreshed daily'
        });
      }
    }

    // Step 2: Cache miss or expired - fetch from Stormglass API
    // Request wave height, water temperature, swell, wind
    const params = [
      'waterTemperature',
      'waveHeight',
      'wavePeriod',
      'waveDirection',
      'swellHeight',
      'swellPeriod',
      'swellDirection',
      'windSpeed',
      'windDirection',
      'currentSpeed',
      'currentDirection'
    ].join(',');

    const stormglassUrl = `${STORMGLASS_URL}?lat=${latitude}&lng=${longitude}&params=${params}`;
    
    const stormglassResponse = await fetch(stormglassUrl, {
      headers: {
        'Authorization': stormglassApiKey
      }
    });

    if (!stormglassResponse.ok) {
      const errorText = await stormglassResponse.text();
      console.error('Stormglass API error:', stormglassResponse.status, errorText);
      
      // If we have expired cache data, return it with a warning
      if (cached) {
        return res.status(200).json({
          ...cached.data,
          _cached: true,
          _stale: true,
          _cached_until: cached.expires_at,
          _note: 'Using cached data (API temporarily unavailable)'
        });
      }
      
      throw new Error(`Stormglass API error: ${stormglassResponse.status}`);
    }

    const stormglassData = await stormglassResponse.json();

    // Process the data - get the current/nearest hour data
    const processedData = processMarineData(stormglassData);

    // Step 3: Store in Supabase cache
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CACHE_TTL_MS);

    const { error: upsertError } = await supabase
      .from('marine_weather_cache')
      .upsert({
        location_key: locationKey,
        port_id: portId || null,
        data: processedData,
        fetched_at: now.toISOString(),
        expires_at: expiresAt.toISOString()
      }, {
        onConflict: 'location_key'
      });

    if (upsertError) {
      console.error('Failed to cache marine weather data:', upsertError);
      // Continue anyway - we have the data
    }

    // Step 4: Return fresh data
    return res.status(200).json({
      ...processedData,
      _cached: false,
      _fetched_at: now.toISOString(),
      _note: 'Marine data refreshed daily'
    });

  } catch (error) {
    console.error('Marine weather API error:', error);
    
    return res.status(500).json({ 
      error: 'Failed to fetch marine weather data',
      message: error.message 
    });
  }
}

/**
 * Process Stormglass API response to extract current/relevant data
 */
function processMarineData(rawData) {
  if (!rawData.hours || rawData.hours.length === 0) {
    return { error: 'No marine data available' };
  }

  // Find the current hour or closest future hour
  const now = new Date();
  let currentData = rawData.hours[0];
  
  for (const hourData of rawData.hours) {
    const hourTime = new Date(hourData.time);
    if (hourTime >= now) {
      currentData = hourData;
      break;
    }
    currentData = hourData; // Keep the most recent past hour
  }

  // Extract values (Stormglass provides multiple sources, we'll use the first available)
  const getValue = (obj) => {
    if (!obj) return null;
    // Prefer noaa, then sg, then any available
    return obj.noaa ?? obj.sg ?? obj.dwd ?? obj.meto ?? Object.values(obj)[0] ?? null;
  };

  return {
    time: currentData.time,
    waterTemperature: {
      value: getValue(currentData.waterTemperature),
      unit: '°C'
    },
    waveHeight: {
      value: getValue(currentData.waveHeight),
      unit: 'm'
    },
    wavePeriod: {
      value: getValue(currentData.wavePeriod),
      unit: 's'
    },
    waveDirection: {
      value: getValue(currentData.waveDirection),
      unit: '°'
    },
    swellHeight: {
      value: getValue(currentData.swellHeight),
      unit: 'm'
    },
    swellPeriod: {
      value: getValue(currentData.swellPeriod),
      unit: 's'
    },
    swellDirection: {
      value: getValue(currentData.swellDirection),
      unit: '°'
    },
    windSpeed: {
      value: getValue(currentData.windSpeed),
      unit: 'm/s'
    },
    windDirection: {
      value: getValue(currentData.windDirection),
      unit: '°'
    },
    currentSpeed: {
      value: getValue(currentData.currentSpeed),
      unit: 'm/s'
    },
    // Calculated/derived fields for display
    conditions: getConditionsDescription(getValue(currentData.waveHeight), getValue(currentData.windSpeed)),
    swimmingSafe: isSwimmingSafe(getValue(currentData.waveHeight), getValue(currentData.currentSpeed))
  };
}

/**
 * Get human-readable conditions description
 */
function getConditionsDescription(waveHeight, windSpeed) {
  if (waveHeight === null) return 'Unknown';
  
  if (waveHeight < 0.3 && (windSpeed === null || windSpeed < 5)) {
    return 'Calm - ideal for swimming';
  } else if (waveHeight < 0.5 && (windSpeed === null || windSpeed < 8)) {
    return 'Light waves - good for swimming';
  } else if (waveHeight < 1.0) {
    return 'Moderate waves - swim with caution';
  } else if (waveHeight < 2.0) {
    return 'Choppy - experienced swimmers only';
  } else {
    return 'Rough - not recommended for swimming';
  }
}

/**
 * Determine if conditions are safe for swimming
 */
function isSwimmingSafe(waveHeight, currentSpeed) {
  if (waveHeight === null) return null;
  
  const waveSafe = waveHeight < 1.0;
  const currentSafe = currentSpeed === null || currentSpeed < 0.5;
  
  return waveSafe && currentSafe;
}
