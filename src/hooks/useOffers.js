/**
 * useOffers Hook
 * React hook for fetching offers data
 * Falls back to placeholder data when Supabase offers aren't available
 */

import { useState, useEffect, useCallback } from 'react';
import { getOffers, getOfferBySlug } from '../services/offersAPI';
import { logger } from '../utils/logger';

/**
 * Hook for fetching list of offers
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of offers
 * @param {number} options.offset - Number of offers to skip
 * @param {boolean|null} options.featured - Filter by featured status
 * @param {string|null} options.offerType - Filter by offer type
 * @param {string|null} options.destination - Filter by destination
 * @param {boolean} options.priority - If true, fetch immediately (for above-fold content)
 * @returns {Object} { offers: Array, total: number, loading: boolean, error: Error | null, refetch: Function }
 */
export function useOffers({
  limit = 20,
  offset = 0,
  featured = null,
  offerType = null,
  destination = null,
  priority = false
} = {}) {
  const [offers, setOffers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await getOffers({
        limit,
        offset,
        featured,
        offerType,
        destination
      });

      // Check if we got valid data from Supabase
      if (!fetchError && data && data.offers && data.offers.length > 0) {
        // Use real Supabase data
        setOffers(data.offers);
        setTotal(data.total || data.offers.length);
      } else {
        // No offers available - return empty array
        // Offers will be uploaded from CRM soon
        setOffers([]);
        setTotal(0);
        
        // Don't set error for expected cases (empty DB, function not found)
        // Only log unexpected errors for debugging
        if (fetchError && 
            fetchError.code !== 'PGRST202' && 
            !fetchError.message?.includes('not found') && 
            !fetchError.message?.includes('Searched for') &&
            !fetchError.message?.includes('Could not find') &&
            !fetchError.message?.includes('not configured')) {
          logger.warn('Offers API error:', fetchError.message);
        }
      }
    } catch (err) {
      // Unexpected error - return empty
      logger.error('Unexpected error fetching offers:', err);
      setOffers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, featured, offerType, destination]);

  useEffect(() => {
    // Priority content (above-fold) loads immediately
    // Non-priority content deferred until idle for better LCP
    if (priority) {
      fetchOffers();
      return;
    }
    
    // Defer non-priority fetch until after LCP/idle
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => fetchOffers(), { timeout: 1000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(fetchOffers, 100);
      return () => clearTimeout(timer);
    }
  }, [fetchOffers, priority]);

  return {
    offers,
    total,
    loading,
    error,
    refetch: fetchOffers
  };
}

/**
 * Hook for fetching single offer by slug
 * @param {string} slug - Offer slug
 * @returns {Object} { offer: Object | null, loading: boolean, error: Error | null }
 */
export function useOffer(slug) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchOffer() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await getOfferBySlug(slug);

        // Check if we got valid data from Supabase
        if (!fetchError && data) {
          setOffer(data);
        } else {
          // No offer found
          setOffer(null);
          
          // Only log unexpected errors
          if (fetchError && 
              fetchError.code !== 'PGRST202' && 
              !fetchError.message?.includes('not found') && 
              !fetchError.message?.includes('Searched for') &&
              !fetchError.message?.includes('Could not find') &&
              !fetchError.message?.includes('not configured')) {
            logger.warn('Offer API error:', fetchError.message);
          }
        }
      } catch (err) {
        // Unexpected error
        logger.error('Unexpected error fetching offer:', err);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    }

    fetchOffer();
  }, [slug]);

  return { offer, loading, error };
}
