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

  useEffect(() => {
    let cancelled = false;

    async function fetchGuides() {
      try {
        setLoading(true);
        setError(null);
        const result = await getCruiseGuides(options);
        
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
  }, [
    options.limit,
    options.offset,
    options.featured,
    options.guideType,
    options.cruiseLineSlug,
    options.destinationSlug,
  ]);

  return { guides, total, loading, error };
}

