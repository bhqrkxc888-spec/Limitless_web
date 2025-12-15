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

    async function fetchMarineWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await getSeaConditions(lat, lon);
        const current = getCurrentSeaConditions(data);

        setConditions(current);
      } catch (err) {
        logger.error('Error fetching sea conditions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMarineWeather();
  }, [lat, lon]);

  return { conditions, loading, error };
}

