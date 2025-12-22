/**
 * Travel News API Service
 * Functions for fetching travel news from Supabase via RPC
 */

import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';

/**
 * Get list of published travel news articles
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of articles to return (default: 50)
 * @param {number} options.offset - Number of articles to skip (default: 0)
 * @param {boolean|null} options.featured - Filter by featured status (null = all, true = featured only, false = non-featured only)
 * @param {string|null} options.category - Filter by category: 'destination', 'cruise_line', 'travel_tips', 'industry_news', 'special_offers', 'events', 'general'
 * @param {string|null} options.tag - Filter by tag
 * @returns {Promise<{data: {news: Array, total: number, limit: number, offset: number} | null, error: Error | null}>}
 */
export async function getTravelNews({
  limit = 50,
  offset = 0,
  featured = null,
  category = null,
  tag = null
} = {}) {
  // Check if Supabase is configured
  if (!supabase) {
    logger.warn('Supabase not configured - cannot fetch travel news');
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase
      .schema('crm')
      .rpc('get_travel_news_public', {
        p_limit: limit,
        p_offset: offset,
        p_featured: featured,
        p_category: category,
        p_tag: tag
      });

    if (error) {
      // If function not found, it's OK - travel news feature might not be set up yet
      // Silently return empty - this is expected if travel news isn't configured yet
      if (error.code === 'PGRST202' || 
          error.message?.includes('not found') || 
          error.message?.includes('Searched for') ||
          error.message?.includes('Could not find')) {
        return { data: { news: [], total: 0, limit, offset }, error: null };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    // Only log if it's not a "not found" error
    if (error.code !== 'PGRST202' && !error.message?.includes('not found') && !error.message?.includes('Searched for')) {
      logger.warn('Error fetching travel news:', error.message);
    }
    return { data: null, error };
  }
}

/**
 * Get single travel news article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<{data: Object | null, error: Error | null}>}
 */
export async function getTravelNewsBySlug(slug) {
  // Check if Supabase is configured
  if (!supabase) {
    logger.warn('Supabase not configured - cannot fetch travel news article');
    return { data: null, error: new Error('Supabase not configured') };
  }

  if (!slug) {
    return { data: null, error: new Error('Slug is required') };
  }

  try {
    const { data, error } = await supabase
      .schema('crm')
      .rpc('get_travel_news_by_slug_public', {
        p_slug: slug
      });

    if (error) {
      // If function not found, return null (not an error)
      if (error.code === 'PGRST202' || 
          error.message?.includes('not found') || 
          error.message?.includes('Searched for') ||
          error.message?.includes('Could not find')) {
        return { data: null, error: null };
      }
      throw error;
    }

    // RPC returns null if not found, which is fine
    return { data, error: null };
  } catch (error) {
    if (error.code !== 'PGRST202' && !error.message?.includes('not found') && !error.message?.includes('Searched for')) {
      logger.warn('Error fetching travel news article:', error.message);
    }
    return { data: null, error };
  }
}

/**
 * Get travel news articles for a specific cruise line
 * @param {string} cruiseLineSlug - Cruise line slug (e.g., 'p-and-o-cruises')
 * @param {number} limit - Maximum number of articles to return (default: 10)
 * @returns {Promise<{data: {news: Array, total: number, cruise_line_slug: string} | null, error: Error | null}>}
 */
export async function getTravelNewsByCruiseLine(cruiseLineSlug, limit = 10) {
  // Check if Supabase is configured
  if (!supabase) {
    logger.warn('Supabase not configured - cannot fetch cruise line news');
    return { data: null, error: new Error('Supabase not configured') };
  }

  if (!cruiseLineSlug) {
    return { data: null, error: new Error('Cruise line slug is required') };
  }

  try {
    const { data, error } = await supabase
      .schema('crm')
      .rpc('get_travel_news_by_cruise_line_public', {
        p_cruise_line_slug: cruiseLineSlug,
        p_limit: limit
      });

    if (error) {
      // If function not found, return empty - feature might not be set up yet
      if (error.code === 'PGRST202' || 
          error.message?.includes('not found') || 
          error.message?.includes('Searched for') ||
          error.message?.includes('Could not find')) {
        return { data: { news: [], total: 0, cruise_line_slug: cruiseLineSlug }, error: null };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    // Only log if it's not a "not found" error
    if (error.code !== 'PGRST202' && !error.message?.includes('not found') && !error.message?.includes('Searched for')) {
      logger.warn('Error fetching cruise line news:', error.message);
    }
    return { data: null, error };
  }
}

/**
 * Increment travel news view count
 * @param {string} newsId - Article UUID
 * @returns {Promise<{data: any | null, error: Error | null}>}
 */
export async function incrementTravelNewsView(newsId) {
  // Check if Supabase is configured
  if (!supabase) {
    logger.warn('Supabase not configured - cannot track view');
    return { data: null, error: new Error('Supabase not configured') };
  }

  if (!newsId) {
    return { data: null, error: new Error('News ID is required') };
  }

  try {
    // Fire and forget - we don't need to wait for this
    const { error } = await supabase
      .schema('crm')
      .rpc('increment_travel_news_view', {
        p_news_id: newsId
      });

    if (error) {
      // Silently ignore if function doesn't exist - this is not critical
      if (error.code !== 'PGRST202' && 
          !error.message?.includes('not found') && 
          !error.message?.includes('Searched for') &&
          !error.message?.includes('Could not find')) {
        logger.warn('Error incrementing travel news view:', error);
      }
      // Don't throw - this is not critical
      return { data: null, error };
    }

    return { data: true, error: null };
  } catch (error) {
    // Silently ignore - this is not critical
    return { data: null, error };
  }
}

