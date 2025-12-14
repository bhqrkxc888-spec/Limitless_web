/**
 * useOffers Hook
 * React hook for fetching offers data
 */

import { useState, useEffect } from 'react';
import { getOffers, getOfferBySlug } from '../services/offersAPI';

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

  const fetchOffers = async () => {
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

      if (fetchError) throw fetchError;

      if (data) {
        setOffers(data.offers || []);
        setTotal(data.total || 0);
      } else {
        setOffers([]);
        setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError(err);
      setOffers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [limit, offset, featured, offerType, destination]);

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

        if (fetchError) throw fetchError;

        setOffer(data || null);
      } catch (err) {
        console.error('Error fetching offer:', err);
        setError(err);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    }

    fetchOffer();
  }, [slug]);

  return { offer, loading, error };
}

