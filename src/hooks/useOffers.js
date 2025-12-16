/**
 * useOffers Hook
 * React hook for fetching offers data
 * Falls back to placeholder data when Supabase offers aren't available
 */

import { useState, useEffect, useCallback } from 'react';
import { getOffers, getOfferBySlug } from '../services/offersAPI';
import { placeholderOffers, getPlaceholderOfferBySlug } from '../data/placeholderOffers';
import { logger } from '../utils/logger';

/**
 * Apply filters to placeholder offers
 */
function filterPlaceholderOffers(offers, { featured, destination, offerType, offset, limit }) {
  let filtered = [...offers];
  
  if (featured !== null && featured !== undefined) {
    filtered = filtered.filter(o => o.featured === featured);
  }
  if (destination) {
    filtered = filtered.filter(o => 
      o.destination?.toLowerCase().includes(destination.toLowerCase())
    );
  }
  if (offerType) {
    filtered = filtered.filter(o => o.offer_type === offerType);
  }
  
  // Apply pagination
  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);
  
  return { offers: paginated, total };
}

/**
 * Hook for fetching list of offers
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of offers
 * @param {number} options.offset - Number of offers to skip
 * @param {boolean|null} options.featured - Filter by featured status
 * @param {string|null} options.offerType - Filter by offer type
 * @param {string|null} options.destination - Filter by destination
 * @returns {Object} { offers: Array, total: number, loading: boolean, error: Error | null, refetch: Function }
 */
export function useOffers({
  limit = 20,
  offset = 0,
  featured = null,
  offerType = null,
  destination = null
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
        // Fall back to placeholder offers:
        // - When Supabase returns empty data
        // - When there's an error (function not found, not configured, etc.)
        const filtered = filterPlaceholderOffers(placeholderOffers, {
          featured,
          destination,
          offerType,
          offset,
          limit
        });
        setOffers(filtered.offers);
        setTotal(filtered.total);
        
        // Don't set error for expected cases (empty DB, function not found)
        // Only log unexpected errors for debugging
        if (fetchError && 
            fetchError.code !== 'PGRST202' && 
            !fetchError.message?.includes('not found') && 
            !fetchError.message?.includes('Searched for') &&
            !fetchError.message?.includes('Could not find') &&
            !fetchError.message?.includes('not configured')) {
          logger.warn('Offers API error, using placeholder data:', fetchError.message);
        }
      }
    } catch (err) {
      // Unexpected error - still fall back to placeholders
      logger.error('Unexpected error fetching offers:', err);
      
      const filtered = filterPlaceholderOffers(placeholderOffers, {
        featured,
        destination,
        offerType,
        offset,
        limit
      });
      setOffers(filtered.offers);
      setTotal(filtered.total);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, featured, offerType, destination]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

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
          // Fall back to placeholder offer
          const placeholderOffer = getPlaceholderOfferBySlug(slug);
          setOffer(placeholderOffer);
          
          // Only log unexpected errors
          if (fetchError && 
              fetchError.code !== 'PGRST202' && 
              !fetchError.message?.includes('not found') && 
              !fetchError.message?.includes('Searched for') &&
              !fetchError.message?.includes('Could not find') &&
              !fetchError.message?.includes('not configured')) {
            logger.warn('Offer API error, using placeholder data:', fetchError.message);
          }
        }
      } catch (err) {
        // Unexpected error - still try placeholder
        logger.error('Unexpected error fetching offer:', err);
        const placeholderOffer = getPlaceholderOfferBySlug(slug);
        setOffer(placeholderOffer);
      } finally {
        setLoading(false);
      }
    }

    fetchOffer();
  }, [slug]);

  return { offer, loading, error };
}
