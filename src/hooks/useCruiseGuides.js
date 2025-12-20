import { useState, useEffect } from 'react';
import { getCruiseGuides } from '../services/cruiseGuidesAPI';

/**
 * Hook to fetch cruise guides
 * @param {Object} options - Fetch options
 * @returns {{ guides: Array, total: number, loading: boolean, error: Error|null }}
 */
export function useCruiseGuides(options = {}) {
  const [guides, setGuides] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract options to avoid object reference issues
  const limit = options.limit;
  const offset = options.offset;
  const featured = options.featured;
  const guideType = options.guideType;

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
  }, [limit, offset, featured, guideType]);

  return { guides, total, loading, error };
}

