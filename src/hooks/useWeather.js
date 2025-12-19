/**
 * useWeather Hook
 * React hook for fetching weather data
 */

import { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast, groupForecastByDay } from '../services/weatherAPI';
import { apiConfig } from '../config/apiConfig';
import { logger } from '../utils/logger';

export function useWeather(lat, lon) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      return;
    }

    if (!apiConfig.weather.enabled) {
      setLoading(false);
      setError('Weather API not configured');
      return;
    }

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const [currentData, forecastData] = await Promise.all([
          getCurrentWeather(lat, lon),
          getWeatherForecast(lat, lon)
        ]);

        // Validate current data structure
        if (!currentData || !currentData.weather || !Array.isArray(currentData.weather) || currentData.weather.length === 0) {
          throw new Error('Invalid weather data received');
        }

        // Validate forecast data structure
        if (!forecastData || !forecastData.list || !Array.isArray(forecastData.list)) {
          logger.warn('Invalid forecast data structure, using empty forecast');
          setCurrent(currentData);
          setForecast([]);
        } else {
          setCurrent(currentData);
          setForecast(groupForecastByDay(forecastData.list));
        }
      } catch (err) {
        logger.error('Error fetching weather:', err);
        setError(err.message || 'Weather data unavailable');
        setCurrent(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lon]);

  return { current, forecast, loading, error };
}

