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
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!slug) {
      setImageUrl(null);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    const imageSlug = getImageSlugForDestination(slug);
    const fallback = getDestinationImageUrl(imageSlug, type);

    getImageUrlFromDb('destination', imageSlug, type, fallback)
      .then(url => {
        if (url && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
          setImageUrl(url);
          setIsPlaceholder(false);
        } else {
          setImageUrl(null);
          setIsPlaceholder(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setImageUrl(null);
        setIsPlaceholder(true);
        setLoading(false);
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
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!id) {
      setImageUrl(null);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    let cancelled = false;
    const bucketListFallback = getBucketListImageUrl(id, type);

    const fetchFromDb = () => {
      if (cancelled) return;
      getImageUrlFromDb('bucket-list', id, type, bucketListFallback)
        .then(url => {
          if (cancelled) return;
          if (url && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
            setImageUrl(url);
            setIsPlaceholder(false);
          } else {
            setImageUrl(null);
            setIsPlaceholder(true);
          }
          setLoading(false);
        })
        .catch(() => {
          if (cancelled) return;
          setImageUrl(null);
          setIsPlaceholder(true);
          setLoading(false);
        });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(fetchFromDb, { timeout: 2000 });
    } else {
      setTimeout(fetchFromDb, 100);
    }

    return () => { cancelled = true; };
  }, [id, type, experienceName]);

  return { imageUrl, loading, isPlaceholder };
}

/**
 * Hook to get cruise line image URL
 */
export function useCruiseLineImage(slug, type = 'logo', cruiseLineName = '') {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  useEffect(() => {
    if (!slug) {
      setImageUrl(null);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    const fallback = getCruiseLineImageUrl(slug, type);

    getImageUrlFromDb('cruise-line', slug, type, fallback)
      .then(url => {
        if (url && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
          setImageUrl(url);
          setIsPlaceholder(false);
        } else {
          setImageUrl(null);
          setIsPlaceholder(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setImageUrl(null);
        setIsPlaceholder(true);
        setLoading(false);
      });
  }, [slug, type, cruiseLineName]);

  return { imageUrl, loading, isPlaceholder };
}

/**
 * Hook to get port guide image URL
 * Note: port-guide uses 'slug' as entityId in database (e.g., 'barcelona')
 * Images are uploaded as: WEB_categories/{slug}/{imageType}.webp
 * 
 * Optimized: Checks database first, only shows placeholder if no real image exists
 */
export function usePortGuideImage(slug, type = 'hero', portName = '', country = '') {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  useEffect(() => {
    if (!slug) {
      setImageUrl(null);
      setIsPlaceholder(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    getImageUrlFromDb('port-guide', slug, type, null)
      .then(url => {
        if (cancelled) return;
        if (url && !url.includes('placeholder')) {
          setImageUrl(url);
          setIsPlaceholder(false);
        } else {
          setImageUrl(null);
          setIsPlaceholder(true);
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setImageUrl(null);
        setIsPlaceholder(true);
        setLoading(false);
      });

    return () => { cancelled = true; };
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
 * 
 * Fixed: Removed redundant fetch() pre-validation that caused double-requests.
 * The <img> tag handles 404s gracefully, no need to pre-check with fetch().
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
        // If we have a valid URL (not a placeholder), use it
        // Let the <img> tag handle loading - no need to pre-validate with fetch()
        if (url && !url.includes('placeholder')) {
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  return { imageUrl, loading, hasImage };
}
