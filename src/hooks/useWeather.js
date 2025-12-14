/**
 * useWeather Hook
 * React hook for fetching weather data
 */

import { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast, groupForecastByDay } from '../services/weatherAPI';
import { apiConfig } from '../config/apiConfig';

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

        setCurrent(currentData);
        setForecast(groupForecastByDay(forecastData.list));
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lon]);

  return { current, forecast, loading, error };
}

