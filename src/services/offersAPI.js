/**
 * Offers API Service
 * Functions for fetching offers from Supabase via RPC
 */

import { supabase } from '../lib/supabase';

/**
 * Get list of published offers
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of offers to return (default: 20)
 * @param {number} options.offset - Number of offers to skip (default: 0)
 * @param {boolean|null} options.featured - Filter by featured status (null = all, true = featured only, false = non-featured only)
 * @param {string|null} options.offerType - Filter by offer type ('cruise_only', 'fly_cruise', 'bucket_list', etc.)
 * @param {string|null} options.destination - Filter by destination (e.g., 'Caribbean', 'Mediterranean')
 * @returns {Promise<{data: {offers: Array, total: number, limit: number, offset: number} | null, error: Error | null}>}
 */
export async function getOffers({
  limit = 20,
  offset = 0,
  featured = null,
  offerType = null,
  destination = null
} = {}) {
  // Check if Supabase is configured
  if (!supabase) {
    console.warn('Supabase not configured - cannot fetch offers');
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase.rpc('get_offers_public', {
      p_limit: limit,
      p_offset: offset,
      p_featured: featured,
      p_offer_type: offerType,
      p_destination: destination
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching offers:', error);
    return { data: null, error };
  }
}

/**
 * Get single offer by slug
 * @param {string} slug - Offer slug
 * @returns {Promise<{data: Object | null, error: Error | null}>}
 */
export async function getOfferBySlug(slug) {
  // Check if Supabase is configured
  if (!supabase) {
    console.warn('Supabase not configured - cannot fetch offer');
    return { data: null, error: new Error('Supabase not configured') };
  }

  if (!slug) {
    return { data: null, error: new Error('Slug is required') };
  }

  try {
    const { data, error } = await supabase.rpc('get_offer_by_slug_public', {
      p_slug: slug
    });

    if (error) throw error;

    // RPC returns null if not found, which is fine
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching offer:', error);
    return { data: null, error };
  }
}

/**
 * Increment offer view count
 * @param {string} offerId - Offer UUID
 * @returns {Promise<{data: any | null, error: Error | null}>}
 */
export async function incrementOfferView(offerId) {
  // Check if Supabase is configured
  if (!supabase) {
    console.warn('Supabase not configured - cannot track view');
    return { data: null, error: new Error('Supabase not configured') };
  }

  if (!offerId) {
    return { data: null, error: new Error('Offer ID is required') };
  }

  try {
    // Fire and forget - we don't need to wait for this
    const { error } = await supabase.rpc('increment_offer_view', {
      p_offer_id: offerId
    });

    if (error) {
      console.warn('Error incrementing offer view:', error);
      // Don't throw - this is not critical
      return { data: null, error };
    }

    return { data: true, error: null };
  } catch (error) {
    console.warn('Error incrementing offer view:', error);
    // Don't throw - this is not critical
    return { data: null, error };
  }
}

