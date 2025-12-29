/**
 * useMarineWeather Hook
 * React hook for fetching sea conditions data
 */

import { useState, useEffect } from 'react';
import { getSeaConditions, getCurrentSeaConditions } from '../services/marineAPI';
import { apiConfig } from '../config/apiConfig';
import { logger } from '../utils/logger';

export function useMarineWeather(lat, lon) {
  const [conditions, setConditions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      return;
    }

    if (!apiConfig.marine.enabled) {
      setLoading(false);
      setError('Marine API not configured');
      return;
    }

    let cancelled = false;

    async function fetchMarineWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await getSeaConditions(lat, lon);
        const current = getCurrentSeaConditions(data);

        if (!cancelled) {
          setConditions(current);
        }
      } catch (err) {
        if (!cancelled) {
          logger.error('Error fetching sea conditions:', err);
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMarineWeather();
    return () => { cancelled = true; };
  }, [lat, lon]);

  return { conditions, loading, error };
}

