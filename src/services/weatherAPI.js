/**
 * Weather API Service
 * OpenWeatherMap API integration for weather data
 * 
 * Now uses One Call API 3.0 via our serverless function with Supabase caching
 * Documentation: https://openweathermap.org/api/one-call-3
 */

import { apiConfig } from '../config/apiConfig';
import { logger } from '../utils/logger';

// Extended cache duration for development to prevent API hammering
const IS_DEV = import.meta.env.DEV;
const WEATHER_CACHE_DURATION = IS_DEV ? 86400000 : 3600000; // 24 hours in dev, 1 hour in production
const FORECAST_CACHE_DURATION = IS_DEV ? 86400000 : 3600000; // 24 hours in dev, 1 hour in production

// Simple in-memory cache (fallback only)
const cache = {
  current: new Map(),
  forecast: new Map(),
  onecall: new Map()
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

/**
 * Get One Call API 3.0 weather data (via our serverless function with Supabase caching)
 * Returns: current + 48h hourly + 8d daily + alerts
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Complete weather data
 */
export async function getOneCallWeather(lat, lon) {
  if (!apiConfig.weather.enabled) {
    throw new Error('Weather API not configured');
  }

  const cacheKey = `onecall_${lat}_${lon}`;
  const cached = cache.onecall.get(cacheKey);
  
  // Check in-memory cache first (fallback)
  if (cached && Date.now() - cached.timestamp < WEATHER_CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Call our serverless function which handles Supabase caching
    const url = `/api/weather?lat=${lat}&lon=${lon}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.current) {
      throw new Error('Invalid weather data received');
    }

    // Cache in-memory as fallback
    cache.onecall.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    logger.error('Error fetching One Call weather:', error);
    throw error;
  }
}

/**
 * Process hourly forecast data for display
 * @param {Array} hourly - Hourly array from One Call API
 * @param {number} hours - Number of hours to return (default 24)
 * @returns {Array} Processed hourly forecast
 */
export function processHourlyForecast(hourly, hours = 24) {
  if (!hourly || !Array.isArray(hourly)) {
    return [];
  }

  return hourly.slice(0, hours).map(hour => ({
    dt: hour.dt,
    time: new Date(hour.dt * 1000),
    temp: Math.round(hour.temp),
    feelsLike: Math.round(hour.feels_like),
    icon: hour.weather?.[0]?.icon || '01d',
    description: hour.weather?.[0]?.description || '',
    pop: Math.round((hour.pop || 0) * 100), // Probability of precipitation as %
    windSpeed: hour.wind_speed,
    windDeg: hour.wind_deg,
    humidity: hour.humidity,
    uvi: hour.uvi || 0,
    clouds: hour.clouds
  }));
}

/**
 * Process daily forecast data for display
 * @param {Array} daily - Daily array from One Call API
 * @returns {Array} Processed daily forecast
 */
export function processDailyForecast(daily) {
  if (!daily || !Array.isArray(daily)) {
    return [];
  }

  return daily.map(day => ({
    dt: day.dt,
    date: new Date(day.dt * 1000),
    tempDay: Math.round(day.temp.day),
    tempMin: Math.round(day.temp.min),
    tempMax: Math.round(day.temp.max),
    tempNight: Math.round(day.temp.night),
    feelsLikeDay: Math.round(day.feels_like.day),
    icon: day.weather?.[0]?.icon || '01d',
    description: day.weather?.[0]?.description || '',
    summary: day.summary || '',
    pop: Math.round((day.pop || 0) * 100),
    windSpeed: day.wind_speed,
    windDeg: day.wind_deg,
    humidity: day.humidity,
    uvi: day.uvi || 0,
    clouds: day.clouds,
    sunrise: new Date(day.sunrise * 1000),
    sunset: new Date(day.sunset * 1000)
  }));
}

