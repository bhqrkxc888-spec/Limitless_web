/**
 * React Hook for fetching image URLs from Supabase
 * Automatically checks site_images table and falls back to constructed URLs
 */

import { useState, useEffect } from 'react';
import { getImageUrlFromDb } from '../utils/imageLoader';
import { getDestinationImageUrl, getBucketListImageUrl, getCruiseLineImageUrl, getShipImageUrl } from '../config/assetUrls';
import { PLACEHOLDER_IMAGE } from '../config/assetUrls';
import { getDestinationForBucketList } from '../config/bucketListDestinationMapping';
import { getImageSlugForDestination } from '../config/destinationSlugMapping';

/**
 * Hook to get destination image URL
 * Automatically maps data slugs (e.g., "mediterranean-cruises") to image slugs (e.g., "mediterranean")
 */
export function useDestinationImage(slug, type = 'hero', destinationName = '') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    // Map the slug to the image slug used in database
    // This handles cases like "mediterranean-cruises" -> "mediterranean"
    // or "norwegian-fjords-cruises" -> "norway"
    const imageSlug = getImageSlugForDestination(slug);

    // Import the placeholder generator
    import('../utils/placeholderImages.js').then(({ getDestinationPlaceholderImage }) => {
      // Generate smart placeholder
      const smartPlaceholder = getDestinationPlaceholderImage(imageSlug, type, destinationName);
      setImageUrl(smartPlaceholder);
      
      const fallback = getDestinationImageUrl(imageSlug, type);
      
      getImageUrlFromDb('destination', imageSlug, type, fallback)
        .then(url => {
          if (url && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
            setImageUrl(url);
            setIsPlaceholder(false);
          } else {
            setIsPlaceholder(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setIsPlaceholder(true);
          setLoading(false);
        });
    });
  }, [slug, type, destinationName]);

  return { imageUrl, loading, isPlaceholder };
}

/**
 * Hook to get bucket list image URL
 * Note: bucket-list uses 'id' as entityId in database, not slug
 * Automatically checks destination images if bucket list image not found (image sharing)
 */
export function useBucketListImage(id, type = 'hero', experienceName = '') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!id) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    // Import the placeholder generator
    import('../utils/placeholderImages.js').then(({ getBucketListPlaceholderImage }) => {
      const smartPlaceholder = getBucketListPlaceholderImage(id, type, experienceName);
      setImageUrl(smartPlaceholder);
      
      const bucketListFallback = getBucketListImageUrl(id, type);
      
      // First try bucket list images
      getImageUrlFromDb('bucket-list', id, type, null)
        .then(bucketListUrl => {
          // If found in bucket list, use it
          if (bucketListUrl && bucketListUrl !== PLACEHOLDER_IMAGE) {
            setImageUrl(bucketListUrl);
            setIsPlaceholder(false);
            setLoading(false);
            return;
          }
          
          // Check if we can use destination images (image sharing)
          const destinationSlug = getDestinationForBucketList(id);
          if (destinationSlug) {
            const destinationFallback = getDestinationImageUrl(destinationSlug, type);
            return getImageUrlFromDb('destination', destinationSlug, type, destinationFallback);
          }
          
          setIsPlaceholder(true);
          return bucketListFallback;
        })
        .then(url => {
          if (url && url !== smartPlaceholder) {
            setImageUrl(url || bucketListFallback);
            setIsPlaceholder(false);
          } else {
            setIsPlaceholder(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setIsPlaceholder(true);
          setLoading(false);
        });
    });
  }, [id, type, experienceName]);

  return { imageUrl, loading, isPlaceholder };
}

/**
 * Hook to get cruise line image URL
 */
export function useCruiseLineImage(slug, type = 'logo', cruiseLineName = '') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    // Import the placeholder generator
    import('../utils/placeholderImages.js').then(({ getCruiseLinePlaceholderImage }) => {
      const smartPlaceholder = getCruiseLinePlaceholderImage(slug, type, cruiseLineName);
      setImageUrl(smartPlaceholder);
      
      const fallback = getCruiseLineImageUrl(slug, type);
      
      getImageUrlFromDb('cruise-line', slug, type, fallback)
        .then(url => {
          if (url && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
            setImageUrl(url);
            setIsPlaceholder(false);
          } else {
            setIsPlaceholder(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setIsPlaceholder(true);
          setLoading(false);
        });
    });
  }, [slug, type, cruiseLineName]);

  return { imageUrl, loading, isPlaceholder };
}

/**
 * Hook to get port guide image URL
 * Note: port-guide uses 'slug' as entityId in database (e.g., 'barcelona')
 * Images are uploaded as: WEB_categories/{slug}/{imageType}.webp
 * 
 * Falls back to smart Unsplash placeholders when no image is uploaded
 */
export function usePortGuideImage(slug, type = 'hero', portName = '', country = '') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    // Import the placeholder generator
    import('../utils/placeholderImages.js').then(({ getPortPlaceholderImage }) => {
      // Generate smart placeholder based on port context
      const smartPlaceholder = getPortPlaceholderImage(slug, type, portName, country);
      setImageUrl(smartPlaceholder);
      
      // Try to get real image from database
      getImageUrlFromDb('port-guide', slug, type, null)
        .then(url => {
          if (url && !url.includes('placeholder')) {
            setImageUrl(url);
            setIsPlaceholder(false);
          } else {
            // Keep the smart placeholder
            setIsPlaceholder(true);
          }
          setLoading(false);
        })
        .catch(() => {
          // Keep the smart placeholder
          setIsPlaceholder(true);
          setLoading(false);
        });
    });
  }, [slug, type, portName, country]);

  return { imageUrl, loading, isPlaceholder };
}

/**
 * Hook to get ship image URL
 * Note: Ships use entityId format: "{cruiseLineSlug}/ships/{shipSlug}"
 * Images are uploaded as: WEB_cruise-lines/{cruiseLineSlug}/ships/{shipSlug}/{imageType}.webp
 * 
 * Follows same pattern as other image hooks (useCruiseLineImage, useDestinationImage):
 * 1. Check database first (source of truth for metadata and validation)
 * 2. Fall back to direct URL construction (images are stored at this exact path)
 * 3. Only mark as non-placeholder if we have a valid URL from database or direct construction
 * 4. Card.Image component handles 404 errors gracefully
 */
export function useShipImage(cruiseLineSlug, shipSlug, type = 'card', shipName = '') {
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!cruiseLineSlug || !shipSlug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    const entityId = `${cruiseLineSlug}/ships/${shipSlug}`;
    
    // Construct direct URL as fallback (images are stored at this exact path in Supabase Storage)
    const directUrl = getShipImageUrl(cruiseLineSlug, shipSlug, type);
    
    // Import the placeholder generator
    import('../utils/placeholderImages.js').then(({ getCruiseLinePlaceholderImage }) => {
      // Start with cruise line placeholder as initial fallback (same pattern as other hooks)
      const smartPlaceholder = getCruiseLinePlaceholderImage(cruiseLineSlug, 'card', '');
      setImageUrl(smartPlaceholder);
      
      // Check database first (source of truth) with direct URL as fallback
      getImageUrlFromDb('ship', entityId, type, directUrl)
        .then(url => {
          // Use URL if it's valid and not a placeholder
          if (url && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
            setImageUrl(url);
            setIsPlaceholder(false);
          } else if (directUrl && directUrl !== PLACEHOLDER_IMAGE) {
            // Database didn't have it, but images are uploaded to this exact path
            // Use direct URL - Card.Image component will handle 404 errors gracefully
            setImageUrl(directUrl);
            setIsPlaceholder(false);
          } else {
            setIsPlaceholder(true);
          }
          setLoading(false);
        })
        .catch(() => {
          // Database query failed, use direct URL fallback if available
          if (directUrl && directUrl !== PLACEHOLDER_IMAGE) {
            setImageUrl(directUrl);
            setIsPlaceholder(false);
          } else {
            setIsPlaceholder(true);
          }
          setLoading(false);
        });
    });
  }, [cruiseLineSlug, shipSlug, type, shipName]);

  return { imageUrl, loading, isPlaceholder };
}

