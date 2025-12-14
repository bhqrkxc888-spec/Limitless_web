/**
 * Marine Weather API Service
 * StormGlass API integration for sea conditions
 * 
 * Documentation: https://docs.stormglass.io/
 * Alternative: Can use OpenWeatherMap marine data if preferred
 */

import { apiConfig } from '../config/apiConfig';

// Extended cache duration for development to prevent API hammering
const IS_DEV = import.meta.env.DEV;
const MARINE_CACHE_DURATION = IS_DEV ? 86400000 : 21600000; // 24 hours in dev, 6 hours in production

// Simple in-memory cache
const cache = new Map();

/**
 * Get current sea conditions for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Sea conditions data
 */
export async function getSeaConditions(lat, lon) {
  if (!apiConfig.marine.enabled) {
    throw new Error('Marine API not configured');
  }

  const cacheKey = `marine_${lat}_${lon}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < MARINE_CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Get current and 24h forecast
    const start = new Date();
    const end = new Date();
    end.setHours(end.getHours() + 24);

    const url = `${apiConfig.marine.baseUrl}/weather/point?lat=${lat}&lng=${lon}&params=waveHeight,wavePeriod,waveDirection,waterTemperature,windSpeed,windDirection&start=${start.toISOString()}&end=${end.toISOString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': apiConfig.marine.apiKey
      }
    });
    
    if (!response.ok) {
      throw new Error(`Marine API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the result
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    console.error('Error fetching sea conditions:', error);
    throw error;
  }
}

/**
 * Get current sea state description
 * @param {number} waveHeight - Wave height in meters
 * @returns {string} Sea state description
 */
export function getSeaStateDescription(waveHeight) {
  if (waveHeight < 0.5) return 'Calm';
  if (waveHeight < 1.0) return 'Slight';
  if (waveHeight < 1.5) return 'Moderate';
  if (waveHeight < 2.5) return 'Rough';
  if (waveHeight < 4.0) return 'Very Rough';
  return 'High';
}

/**
 * Format wave height
 * @param {number} height - Wave height in meters
 * @returns {string} Formatted wave height
 */
export function formatWaveHeight(height) {
  return `${height.toFixed(1)}m`;
}

/**
 * Format water temperature
 * @param {number} temp - Temperature in Celsius
 * @returns {string} Formatted temperature
 */
export function formatWaterTemperature(temp) {
  return `${Math.round(temp)}°C`;
}

/**
 * Get current conditions from hourly data
 * @param {Object} data - API response data
 * @returns {Object|null} Current conditions
 */
export function getCurrentSeaConditions(data) {
  if (!data || !data.hours || data.hours.length === 0) {
    return null;
  }

  const current = data.hours[0];
  const waveHeight = current.waveHeight?.sg || current.waveHeight?.noaa || 0;
  const wavePeriod = current.wavePeriod?.sg || current.wavePeriod?.noaa || 0;
  const waveDirection = current.waveDirection?.sg || current.waveDirection?.noaa || 0;
  const waterTemp = current.waterTemperature?.sg || current.waterTemperature?.noaa || null;
  const windSpeed = current.windSpeed?.sg || current.windSpeed?.noaa || 0;
  const windDirection = current.windDirection?.sg || current.windDirection?.noaa || 0;

  return {
    waveHeight,
    wavePeriod,
    waveDirection,
    waterTemperature: waterTemp,
    windSpeed,
    windDirection,
    seaState: getSeaStateDescription(waveHeight)
  };
}

