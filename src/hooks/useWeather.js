/**
 * useWeather Hook
 * React hook for fetching weather data via One Call API 3.0
 * 
 * Returns:
 * - current: Current conditions
 * - hourly: 48-hour hourly forecast
 * - daily: 8-day daily forecast
 * - alerts: Weather alerts (storms, etc.)
 * - loading: Boolean
 * - error: Error message
 */

import { useState, useEffect } from 'react';
import { getOneCallWeather, processHourlyForecast, processDailyForecast } from '../services/weatherAPI';
import { apiConfig } from '../config/apiConfig';
import { logger } from '../utils/logger';

export function useWeather(lat, lon) {
  const [current, setCurrent] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);
  const [alerts, setAlerts] = useState(null);
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

    let cancelled = false;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await getOneCallWeather(lat, lon);

        if (cancelled) return;

        // Validate data structure
        if (!data || !data.current) {
          throw new Error('Invalid weather data received');
        }

        // Set current conditions
        setCurrent(data.current);

        // Process and set hourly forecast (48 hours available, show 24)
        if (data.hourly && Array.isArray(data.hourly)) {
          setHourly(processHourlyForecast(data.hourly, 48));
        } else {
          setHourly([]);
        }

        // Process and set daily forecast (8 days)
        if (data.daily && Array.isArray(data.daily)) {
          setDaily(processDailyForecast(data.daily));
        } else {
          setDaily([]);
        }

        // Set alerts if any
        if (data.alerts && Array.isArray(data.alerts)) {
          setAlerts(data.alerts);
        } else {
          setAlerts([]);
        }

      } catch (err) {
        if (!cancelled) {
          logger.error('Error fetching weather:', err);
          setError(err.message || 'Weather data unavailable');
          setCurrent(null);
          setHourly(null);
          setDaily(null);
          setAlerts(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchWeather();
    return () => { cancelled = true; };
  }, [lat, lon]);

  return { current, hourly, daily, alerts, loading, error };
}

