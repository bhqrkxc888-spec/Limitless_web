/**
 * useOffers Hook
 * React hook for fetching offers data
 * Falls back to placeholder data when Supabase offers aren't available
 */

import { useState, useEffect, useCallback } from 'react';
import { getOffers, getOfferBySlug } from '../services/offersAPI';
import { useRefreshOnFocus } from './usePageVisibility';
import { logger } from '../utils/logger';
import { hardcodedOffers } from '../data/hardcodedOffers';

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

      // Get database offers
      let dbOffers = [];
      if (!fetchError && data && data.offers && data.offers.length > 0) {
        dbOffers = data.offers;
      } else if (fetchError && 
          fetchError.code !== 'PGRST202' && 
          !fetchError.message?.includes('not found') && 
          !fetchError.message?.includes('Searched for') &&
          !fetchError.message?.includes('Could not find') &&
          !fetchError.message?.includes('not configured')) {
        logger.warn('Offers API error:', fetchError.message);
      }

      // Filter hard-coded offers based on query parameters
      // Only include published hardcoded offers
      let filteredHardcodedOffers = hardcodedOffers.filter(offer => offer.published !== false);
      
      // Apply featured filter
      if (featured !== null) {
        filteredHardcodedOffers = filteredHardcodedOffers.filter(
          offer => offer.featured === featured
        );
      }
      
      // Apply offer type filter
      if (offerType) {
        filteredHardcodedOffers = filteredHardcodedOffers.filter(
          offer => offer.offer_type === offerType
        );
      }
      
      // Apply destination filter
      if (destination) {
        filteredHardcodedOffers = filteredHardcodedOffers.filter(
          offer => offer.destination === destination
        );
      }

      // Merge hard-coded offers with database offers
      // Hard-coded offers appear first (featured)
      const mergedOffers = [...filteredHardcodedOffers, ...dbOffers];
      
      // Apply pagination after merging
      const paginatedOffers = mergedOffers.slice(offset, offset + limit);
      
      setOffers(paginatedOffers);
      setTotal(mergedOffers.length);
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

  // Refresh data when page becomes visible after being stale
  useRefreshOnFocus(fetchOffers, [offers]);

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

        // First check hard-coded offers (only if published)
        const hardcodedOffer = hardcodedOffers.find(offer => offer.slug === slug && offer.published !== false);
        
        if (hardcodedOffer) {
          setOffer(hardcodedOffer);
          setLoading(false);
          return;
        }

        // If not found in hard-coded, fetch from database
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
