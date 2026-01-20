import { useState, useEffect, useCallback } from 'react';
import { getCruiseGuides } from '../services/cruiseGuidesAPI';
import { useRefreshOnFocus } from './usePageVisibility';

/**
 * Hook to fetch cruise guides
 * @param {Object} options - Fetch options
 * @returns {{ guides: Array, total: number, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useCruiseGuides(options = {}) {
  const [guides, setGuides] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchKey, setFetchKey] = useState(0);

  // Extract options to avoid object reference issues
  const limit = options.limit;
  const offset = options.offset;
  const featured = options.featured;
  const guideType = options.guideType;

  const refetch = useCallback(() => {
    setFetchKey(k => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchGuides() {
      try {
        setLoading(true);
        setError(null);
        const result = await getCruiseGuides({ limit, offset, featured, guideType });
        
        if (!cancelled) {
          setGuides(result.guides || []);
          setTotal(result.total || 0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setGuides([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchGuides();

    return () => {
      cancelled = true;
    };
  }, [limit, offset, featured, guideType, fetchKey]);

  // Refresh data when page becomes visible after being stale
  useRefreshOnFocus(refetch, [guides]);

  return { guides, total, loading, error, refetch };
}

