import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook to fetch a single ship guide by slug from Supabase
 * @param {string} slug - Ship slug (e.g., 'iona', 'britannia')
 * @returns {Object} { ship, ratings, loading, error }
 */
export function useShipGuide(slug) {
  const [ship, setShip] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchShipGuide = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try RPC first for ship + ratings in one call
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_ship_guide_with_ratings', { p_slug: slug });

        if (!rpcError && rpcData?.ship) {
          setShip(rpcData.ship);
          setRatings(rpcData.ratings);
          setLoading(false);
          return;
        }

        // Try direct query - include draft ships (show as "Coming Soon")
        const { data, error: queryError } = await supabase
          .from('ship_guides')
          .select('*')
          .eq('slug', slug)
          .single();

        if (queryError) {
          throw queryError;
        }

        // Mark if ship is draft (for "Coming Soon" display)
        const shipData = data ? { ...data, isDraft: data.status !== 'published' } : null;
        setShip(shipData);

        // Fetch ratings separately
        const { data: ratingData } = await supabase
          .from('ship_guide_rating_stats')
          .select('*')
          .eq('ship_slug', slug)
          .single();

        if (ratingData) {
          setRatings({
            count: ratingData.rating_count || 0,
            average: ratingData.average_rating || 0,
            breakdown: {
              five: ratingData.five_star || 0,
              four: ratingData.four_star || 0,
              three: ratingData.three_star || 0,
              two: ratingData.two_star || 0,
              one: ratingData.one_star || 0
            }
          });
        }
      } catch (err) {
        console.error('Error fetching ship guide:', err);
        setError(err.message || 'Ship guide not found');
      } finally {
        setLoading(false);
      }
    };

    fetchShipGuide();
  }, [slug]);

  return { ship, ratings, loading, error };
}

/**
 * Hook to fetch all ship guides with optional filtering
 * @param {Object} options - Filter options
 * @param {string} options.cruiseLine - Filter by cruise line slug
 * @param {boolean} options.featuredOnly - Only return featured ships
 * @param {number} options.limit - Max results to return
 * @returns {Object} { ships, loading, error }
 */
export function useShipGuides(options = {}) {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cruiseLine, featuredOnly, limit } = options;

  useEffect(() => {
    const fetchShips = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('ship_guides')
          .select(`
            id, slug, name, display_name, cruise_line_slug, cruise_line_name,
            tagline, card_image_url, passenger_capacity, year_built,
            status, featured, sort_order
          `)
          .eq('status', 'published')
          .order('sort_order', { ascending: true })
          .order('name', { ascending: true });

        if (cruiseLine) {
          query = query.eq('cruise_line_slug', cruiseLine);
        }

        if (featuredOnly) {
          query = query.eq('featured', true);
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: queryError } = await query;

        if (queryError) {
          throw queryError;
        }

        setShips(data || []);
      } catch (err) {
        console.error('Error fetching ship guides:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShips();
  }, [cruiseLine, featuredOnly, limit]);

  return { ships, loading, error };
}

/**
 * Submit a rating for a ship
 * @param {Object} ratingData - Rating submission data
 * @returns {Promise<Object>} { success, error }
 */
export async function submitShipRating(ratingData) {
  try {
    const { error } = await supabase
      .from('ship_guide_ratings')
      .insert({
        ship_slug: ratingData.shipSlug,
        rating: ratingData.rating,
        review: ratingData.review || null,
        reviewer_name: ratingData.reviewerName || null,
        reviewer_email: ratingData.reviewerEmail || null,
        sailed_date: ratingData.sailedDate || null,
        cabin_type: ratingData.cabinType || null
      });

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error('Error submitting ship rating:', err);
    return { success: false, error: err.message };
  }
}

export default useShipGuide;
