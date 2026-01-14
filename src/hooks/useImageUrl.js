/**
 * React Hook for fetching image URLs from Supabase
 * Automatically checks site_images table and falls back to constructed URLs
 */

import { useState, useEffect } from 'react';
import { getImageUrlFromDb } from '../utils/imageLoader';
import { getDestinationImageUrl, getBucketListImageUrl, getCruiseLineImageUrl, getShipImageUrl, getPageHeroImageUrl } from '../config/assetUrls';
import { PLACEHOLDER_IMAGE } from '../config/assetUrls';
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
 * Only uses bucket list-specific images (no image sharing)
 * 
 * Performance: Database lookup is deferred until after LCP/idle
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

    let cancelled = false;
    
    // Import the placeholder generator and set placeholder immediately
    import('../utils/placeholderImages.js').then(({ getBucketListPlaceholderImage }) => {
      if (cancelled) return;
      const smartPlaceholder = getBucketListPlaceholderImage(id, type, experienceName);
      setImageUrl(smartPlaceholder);
      
      const bucketListFallback = getBucketListImageUrl(id, type);
      
      // Defer database lookup until after LCP/idle for better mobile performance
      const fetchFromDb = () => {
        if (cancelled) return;
        getImageUrlFromDb('bucket-list', id, type, bucketListFallback)
          .then(url => {
            if (cancelled) return;
            if (url && url !== PLACEHOLDER_IMAGE && url !== smartPlaceholder) {
              setImageUrl(url);
              setIsPlaceholder(false);
            } else {
              setIsPlaceholder(true);
            }
            setLoading(false);
          })
          .catch(() => {
            if (cancelled) return;
            setIsPlaceholder(true);
            setLoading(false);
          });
      };
      
      // Use requestIdleCallback to defer DB lookup
      if ('requestIdleCallback' in window) {
        requestIdleCallback(fetchFromDb, { timeout: 2000 });
      } else {
        setTimeout(fetchFromDb, 100);
      }
    });
    
    return () => { cancelled = true; };
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
  // Compute direct URL immediately from props to avoid initial placeholder flash
  // Images are uploaded to this exact path, so we can show it right away
  const directUrl = (cruiseLineSlug && shipSlug) 
    ? getShipImageUrl(cruiseLineSlug, shipSlug, type)
    : PLACEHOLDER_IMAGE;
  
  const [imageUrl, setImageUrl] = useState(() => directUrl);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(() => !cruiseLineSlug || !shipSlug);

  useEffect(() => {
    if (!cruiseLineSlug || !shipSlug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    const entityId = `${cruiseLineSlug}/ships/${shipSlug}`;
    const currentDirectUrl = getShipImageUrl(cruiseLineSlug, shipSlug, type);
    
    // Set direct URL immediately (already set in initial state, but update if props changed)
    setImageUrl(currentDirectUrl);
    setIsPlaceholder(false);
    
    // Check database in parallel (may have better URL or metadata)
    // This happens in background and updates if database has different URL
    getImageUrlFromDb('ship', entityId, type, currentDirectUrl)
      .then(url => {
        // If database has a valid URL that's different from direct URL, use it
        if (url && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE && url !== currentDirectUrl) {
          setImageUrl(url);
        }
        // If database returned placeholder/direct URL, we already have direct URL set, so keep it
        setLoading(false);
      })
      .catch(() => {
        // Database query failed, but we already have direct URL set, so we're good
        setLoading(false);
      });
  }, [cruiseLineSlug, shipSlug, type, shipName]);

  return { imageUrl, loading, isPlaceholder };
}

/**
 * Hook to get page hero image URL (for listing pages like /destinations, /cruise-types, /bucket-list)
 */
export function usePageHeroImage(slug) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    if (!slug) {
      setImageUrl(null);
      setLoading(false);
      setHasImage(false);
      return;
    }

    // Page heroes are stored with entity_type='site', entity_id='site', image_type='page-hero-{slug}'
    const imageType = `page-hero-${slug}`;
    const fallback = getPageHeroImageUrl(slug);
    
    getImageUrlFromDb('site', 'site', imageType, fallback)
      .then(url => {
        // Check if image actually exists (not a placeholder or error)
        if (url && !url.includes('placeholder')) {
          // Test if image is accessible
          return fetch(url, { method: 'HEAD' })
            .then(response => {
              if (response.ok) {
                setImageUrl(url);
                setHasImage(true);
              } else {
                setImageUrl(null);
                setHasImage(false);
              }
            })
            .catch(() => {
              setImageUrl(null);
              setHasImage(false);
            });
        } else {
          setImageUrl(null);
          setHasImage(false);
        }
      })
      .catch(() => {
        setImageUrl(null);
        setHasImage(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  return { imageUrl, loading, hasImage };
}
