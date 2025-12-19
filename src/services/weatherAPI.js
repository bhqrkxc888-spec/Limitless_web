/**
 * Weather API Service
 * OpenWeatherMap API integration for weather data
 * 
 * Documentation: https://openweathermap.org/api
 */

import { apiConfig } from '../config/apiConfig';
import { logger } from '../utils/logger';

// Extended cache duration for development to prevent API hammering
const IS_DEV = import.meta.env.DEV;
const WEATHER_CACHE_DURATION = IS_DEV ? 86400000 : 3600000; // 24 hours in dev, 1 hour in production
const FORECAST_CACHE_DURATION = IS_DEV ? 86400000 : 3600000; // 24 hours in dev, 1 hour in production

// Simple in-memory cache
const cache = {
  current: new Map(),
  forecast: new Map()
};

/**
 * Get current weather for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Current weather data
 */
export async function getCurrentWeather(lat, lon) {
  if (!apiConfig.weather.enabled) {
    throw new Error('Weather API not configured');
  }

  const cacheKey = `current_${lat}_${lon}`;
  const cached = cache.current.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < WEATHER_CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url = `${apiConfig.weather.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiConfig.weather.apiKey}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the result
    cache.current.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    logger.error('Error fetching current weather:', error);
    throw error;
  }
}

/**
 * Get 5-day weather forecast
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} 5-day forecast data
 */
export async function getWeatherForecast(lat, lon) {
  if (!apiConfig.weather.enabled) {
    throw new Error('Weather API not configured');
  }

  const cacheKey = `forecast_${lat}_${lon}`;
  const cached = cache.forecast.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < FORECAST_CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url = `${apiConfig.weather.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiConfig.weather.apiKey}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the result
    cache.forecast.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    logger.error('Error fetching weather forecast:', error);
    throw error;
  }
}

/**
 * Get weather icon URL
 * @param {string} iconCode - Icon code from API (e.g., '01d')
 * @returns {string} Icon URL
 */
export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Format temperature with unit
 * @param {number} temp - Temperature in Celsius
 * @returns {string} Formatted temperature
 */
export function formatTemperature(temp) {
  return `${Math.round(temp)}°C`;
}

/**
 * Group forecast by day (takes 3-hour intervals and groups into days)
 * @param {Array} list - Forecast list from API
 * @returns {Array} Forecast grouped by day
 */
export function groupForecastByDay(list) {
  if (!list || !Array.isArray(list) || list.length === 0) {
    return [];
  }

  const days = {};
  
  list.forEach(item => {
    // Validate item structure
    if (!item || !item.dt || !item.main || !item.weather || !Array.isArray(item.weather) || item.weather.length === 0) {
      return; // Skip invalid items
    }

    try {
      const date = new Date(item.dt * 1000);
      if (isNaN(date.getTime())) {
        return; // Skip invalid dates
      }
      
      const dayKey = date.toDateString();
      
      if (!days[dayKey]) {
        days[dayKey] = {
          date: date,
          temps: [],
          conditions: [],
          icons: []
        };
      }
      
      if (typeof item.main.temp === 'number') {
        days[dayKey].temps.push(item.main.temp);
      }
      if (item.weather[0].main) {
        days[dayKey].conditions.push(item.weather[0].main);
      }
      if (item.weather[0].icon) {
        days[dayKey].icons.push(item.weather[0].icon);
      }
    } catch (err) {
      logger.warn('Error processing forecast item:', err);
      // Continue processing other items
    }
  });

  return Object.values(days)
    .filter(day => day.temps.length > 0 && day.icons.length > 0) // Only return valid days
    .map(day => ({
      date: day.date,
      high: Math.round(Math.max(...day.temps)),
      low: Math.round(Math.min(...day.temps)),
      condition: day.conditions[Math.floor(day.conditions.length / 2)] || 'N/A', // Middle of day
      icon: day.icons[Math.floor(day.icons.length / 2)] || '01d' // Default icon if missing
    }))
    .slice(0, 5); // Limit to 5 days
}

