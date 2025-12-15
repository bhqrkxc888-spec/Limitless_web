/**
 * useTravelNews Hook
 * React hook for fetching travel news data
 */

import { useState, useEffect, useCallback } from 'react';
import { getTravelNews, getTravelNewsBySlug } from '../services/travelNewsAPI';
import { logger } from '../utils/logger';

/**
 * Hook for fetching list of travel news articles
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of articles
 * @param {number} options.offset - Number of articles to skip
 * @param {boolean|null} options.featured - Filter by featured status
 * @param {string|null} options.category - Filter by category
 * @param {string|null} options.tag - Filter by tag
 * @returns {Object} { news: Array, total: number, loading: boolean, error: Error | null, refetch: Function }
 */
export function useTravelNews({
  limit = 50,
  offset = 0,
  featured = null,
  category = null,
  tag = null
} = {}) {
  const [news, setNews] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await getTravelNews({
        limit,
        offset,
        featured,
        category,
        tag
      });

      if (fetchError) {
        // If function not found, it's OK - travel news might not be set up yet
        // Silently handle this - don't treat as error
        if (fetchError.code === 'PGRST202' || 
            fetchError.message?.includes('not found') || 
            fetchError.message?.includes('Searched for') ||
            fetchError.message?.includes('Could not find')) {
          setNews([]);
          setTotal(0);
          setError(null); // Don't treat as error
          return;
        }
        throw fetchError;
      }

      if (data) {
        setNews(data.news || []);
        setTotal(data.total || 0);
      } else {
        setNews([]);
        setTotal(0);
      }
    } catch (err) {
      // Only log non-"function not found" errors
      if (err.code !== 'PGRST202' && 
          !err.message?.includes('not found') && 
          !err.message?.includes('Searched for') &&
          !err.message?.includes('Could not find')) {
        logger.error('Error fetching travel news:', err);
      }
      setError(err);
      setNews([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, featured, category, tag]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    total,
    loading,
    error,
    refetch: fetchNews
  };
}

/**
 * Hook for fetching single travel news article by slug
 * @param {string} slug - Article slug
 * @returns {Object} { article: Object | null, loading: boolean, error: Error | null }
 */
export function useTravelNewsArticle(slug) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchArticle() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await getTravelNewsBySlug(slug);

        if (fetchError) {
          // If function not found, silently handle
          if (fetchError.code === 'PGRST202' || 
              fetchError.message?.includes('not found') || 
              fetchError.message?.includes('Searched for') ||
              fetchError.message?.includes('Could not find')) {
            setArticle(null);
            setError(null);
            return;
          }
          throw fetchError;
        }

        setArticle(data || null);
      } catch (err) {
        // Only log non-"function not found" errors
        if (err.code !== 'PGRST202' && 
            !err.message?.includes('not found') && 
            !err.message?.includes('Searched for') &&
            !err.message?.includes('Could not find')) {
          logger.error('Error fetching travel news article:', err);
        }
        setError(err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
}

