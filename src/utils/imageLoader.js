/**
 * Image Loader Utility
 * Fetches actual image URLs from site_images table in Supabase
 * Falls back to constructed URLs if not found in database
 */

import { supabase, getPublicUrl } from '../lib/supabase';
import { getDestinationImageUrl, getBucketListImageUrl, getCruiseLineImageUrl } from '../config/assetUrls';
import { PLACEHOLDER_IMAGE } from '../config/assetUrls';
import { getDestinationForBucketList } from '../config/bucketListDestinationMapping';
import { logger } from './logger';

// Cache for image URLs to avoid repeated queries
// Cache persists for the session - cleared manually or on full page reload
const imageCache = new Map();

/**
 * Get image URL from site_images table
 * @param {string} entityType - 'destination', 'bucket-list', 'cruise-line', etc.
 * @param {string} entityId - The slug/ID of the entity
 * @param {string} imageType - 'hero', 'card', 'logo', etc.
 * @param {string} fallbackUrl - URL to use if not found in database
 * @returns {Promise<string>} The image URL
 */
export async function getImageUrlFromDb(entityType, entityId, imageType, fallbackUrl = null) {
  if (!supabase) {
    return fallbackUrl || PLACEHOLDER_IMAGE;
  }

  // Check cache first
  const cacheKey = `${entityType}:${entityId}:${imageType}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  try {
    const { data, error } = await supabase
      .from('site_images')
      .select('bucket, path')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .eq('image_type', imageType)
      .maybeSingle();

    if (error) {
      logger.warn(`Error fetching image from DB: ${error.message}`);
      const url = fallbackUrl || PLACEHOLDER_IMAGE;
      imageCache.set(cacheKey, url);
      return url;
    }

    if (data && data.bucket && data.path) {
      const url = getPublicUrl(data.bucket, data.path);
      imageCache.set(cacheKey, url);
      return url;
    }

    // Not found in database, use fallback
    const url = fallbackUrl || PLACEHOLDER_IMAGE;
    imageCache.set(cacheKey, url);
    return url;
  } catch (error) {
    logger.warn(`Error in getImageUrlFromDb: ${error.message}`);
    const url = fallbackUrl || PLACEHOLDER_IMAGE;
    imageCache.set(cacheKey, url);
    return url;
  }
}

/**
 * Get destination image URL (checks database first, then falls back)
 */
export async function getDestinationImage(slug, type = 'hero') {
  const fallback = getDestinationImageUrl(slug, type);
  return getImageUrlFromDb('destination', slug, type, fallback);
}

/**
 * Get bucket list image URL (checks database first, then falls back to destination images)
 * Note: bucket-list uses 'id' as entityId in database, not slug
 * Some bucket list experiences share images with destinations
 */
export async function getBucketListImage(id, type = 'hero') {
  if (!id) return PLACEHOLDER_IMAGE;
  
  // First try bucket list images
  const bucketListFallback = getBucketListImageUrl(id, type);
  const bucketListUrl = await getImageUrlFromDb('bucket-list', id, type, null);
  
  // If found in bucket list, return it
  if (bucketListUrl && bucketListUrl !== PLACEHOLDER_IMAGE) {
    return bucketListUrl;
  }
  
  // Check if we can use destination images (image sharing)
  const destinationSlug = getDestinationForBucketList(id);
  
  if (destinationSlug) {
    const destinationFallback = getDestinationImageUrl(destinationSlug, type);
    const destinationUrl = await getImageUrlFromDb('destination', destinationSlug, type, null);
    
    // If found in destination, return it
    if (destinationUrl && destinationUrl !== PLACEHOLDER_IMAGE) {
      return destinationUrl;
    }
    
    // Fallback to constructed destination URL
    if (destinationFallback && destinationFallback !== PLACEHOLDER_IMAGE) {
      return destinationFallback;
    }
  }
  
  // Final fallback to bucket list constructed URL or placeholder
  return bucketListFallback || PLACEHOLDER_IMAGE;
}

/**
 * Get cruise line image URL (checks database first, then falls back)
 */
export async function getCruiseLineImage(slug, type = 'logo') {
  const fallback = getCruiseLineImageUrl(slug, type);
  return getImageUrlFromDb('cruise-line', slug, type, fallback);
}

/**
 * Preload multiple images at once (for performance)
 */
export async function preloadImages(imageRequests) {
  const promises = imageRequests.map(({ entityType, entityId, imageType, fallbackUrl }) =>
    getImageUrlFromDb(entityType, entityId, imageType, fallbackUrl)
  );
  return Promise.all(promises);
}

/**
 * Clear the image cache (useful after uploads)
 */
export function clearImageCache() {
  imageCache.clear();
  if (process.env.NODE_ENV === 'development') {
    console.log('[ImageLoader] Cache manually cleared');
  }
}

// Expose cache clear globally for debugging
if (typeof window !== 'undefined') {
  window.clearImageCache = clearImageCache;
}

/**
 * Clear cache for a specific entity
 */
export function clearEntityCache(entityType, entityId) {
  const keysToDelete = [];
  for (const key of imageCache.keys()) {
    if (key.startsWith(`${entityType}:${entityId}:`)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach(key => imageCache.delete(key));
}

