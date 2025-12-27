/**
 * React Hook for fetching image URLs from Supabase
 * Automatically checks site_images table and falls back to constructed URLs
 */

import { useState, useEffect } from 'react';
import { getImageUrlFromDb } from '../utils/imageLoader';
import { getDestinationImageUrl, getBucketListImageUrl, getCruiseLineImageUrl } from '../config/assetUrls';
import { PLACEHOLDER_IMAGE } from '../config/assetUrls';

/**
 * Hook to get destination image URL
 */
export function useDestinationImage(slug, type = 'hero') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      return;
    }

    const fallback = getDestinationImageUrl(slug, type);
    setImageUrl(fallback); // Set fallback immediately for better UX
    
    getImageUrlFromDb('destination', slug, type, fallback)
      .then(url => {
        setImageUrl(url);
        setLoading(false);
      })
      .catch(() => {
        setImageUrl(fallback);
        setLoading(false);
      });
  }, [slug, type]);

  return { imageUrl, loading };
}

/**
 * Hook to get bucket list image URL
 * Note: bucket-list uses 'id' as entityId in database, not slug
 */
export function useBucketListImage(id, type = 'hero') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      return;
    }

    const fallback = getBucketListImageUrl(id, type);
    setImageUrl(fallback); // Set fallback immediately
    
    getImageUrlFromDb('bucket-list', id, type, fallback)
      .then(url => {
        setImageUrl(url);
        setLoading(false);
      })
      .catch(() => {
        setImageUrl(fallback);
        setLoading(false);
      });
  }, [id, type]);

  return { imageUrl, loading };
}

/**
 * Hook to get cruise line image URL
 */
export function useCruiseLineImage(slug, type = 'logo') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      return;
    }

    const fallback = getCruiseLineImageUrl(slug, type);
    setImageUrl(fallback); // Set fallback immediately
    
    getImageUrlFromDb('cruise-line', slug, type, fallback)
      .then(url => {
        setImageUrl(url);
        setLoading(false);
      })
      .catch(() => {
        setImageUrl(fallback);
        setLoading(false);
      });
  }, [slug, type]);

  return { imageUrl, loading };
}

