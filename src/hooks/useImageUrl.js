/**
 * React Hook for fetching image URLs from Supabase
 * Automatically checks site_images table and falls back to constructed URLs
 */

import { useState, useEffect } from 'react';
import { getImageUrlFromDb } from '../utils/imageLoader';
import { getDestinationImageUrl, getBucketListImageUrl, getCruiseLineImageUrl, getShipImageUrl, getPageHeroImageUrl, getPortGuideImageUrl } from '../config/assetUrls';
import { PLACEHOLDER_IMAGE } from '../config/assetUrls';
import { getImageSlugForDestination } from '../config/destinationSlugMapping';

/**
 * Hook to get destination image URL
 * Automatically maps data slugs (e.g., "mediterranean-cruises") to image slugs (e.g., "mediterranean")
 * 
 * Performance: Returns direct URL immediately (no grey box), DB check in background
 */
export function useDestinationImage(slug, type = 'hero', destinationName = '') {
  // Compute direct URL immediately to avoid grey box flash
  const imageSlug = slug ? getImageSlugForDestination(slug) : null;
  const directUrl = imageSlug ? getDestinationImageUrl(imageSlug, type) : PLACEHOLDER_IMAGE;
  
  const [imageUrl, setImageUrl] = useState(() => directUrl);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(() => !slug);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    const currentImageSlug = getImageSlugForDestination(slug);
    const currentDirectUrl = getDestinationImageUrl(currentImageSlug, type);
    
    // Set direct URL immediately (image starts loading now)
    setImageUrl(currentDirectUrl);
    setIsPlaceholder(false);

    // Check database in background - only update if different URL found
    getImageUrlFromDb('destination', currentImageSlug, type, currentDirectUrl)
      .then(url => {
        // Only update if DB returned a different, valid URL
        if (url && url !== currentDirectUrl && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
          setImageUrl(url);
        }
        setLoading(false);
      })
      .catch(() => {
        // Keep direct URL, just mark loading complete
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
 * Performance: Returns direct URL immediately (no grey box), DB check in background
 */
export function useBucketListImage(id, type = 'hero', experienceName = '') {
  // Compute direct URL immediately to avoid grey box flash
  const directUrl = id ? getBucketListImageUrl(id, type) : PLACEHOLDER_IMAGE;
  
  const [imageUrl, setImageUrl] = useState(() => directUrl);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(() => !id);

  useEffect(() => {
    if (!id) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    let cancelled = false;
    const currentDirectUrl = getBucketListImageUrl(id, type);
    
    // Set direct URL immediately (image starts loading now)
    setImageUrl(currentDirectUrl);
    setIsPlaceholder(false);

    // Check database in background - only update if different URL found
    const fetchFromDb = () => {
      if (cancelled) return;
      getImageUrlFromDb('bucket-list', id, type, currentDirectUrl)
        .then(url => {
          if (cancelled) return;
          // Only update if DB returned a different, valid URL
          if (url && url !== currentDirectUrl && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
            setImageUrl(url);
          }
          setLoading(false);
        })
        .catch(() => {
          if (cancelled) return;
          // Keep direct URL, just mark loading complete
          setLoading(false);
        });
    };

    // Defer DB check to not block LCP
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
 * 
 * Performance: Returns direct URL immediately (no grey box), DB check in background
 */
export function useCruiseLineImage(slug, type = 'logo', cruiseLineName = '') {
  // Compute direct URL immediately to avoid grey box flash
  const directUrl = slug ? getCruiseLineImageUrl(slug, type) : PLACEHOLDER_IMAGE;
  
  const [imageUrl, setImageUrl] = useState(() => directUrl);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(() => !slug);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    const currentDirectUrl = getCruiseLineImageUrl(slug, type);
    
    // Set direct URL immediately (image starts loading now)
    setImageUrl(currentDirectUrl);
    setIsPlaceholder(false);

    // Check database in background - only update if different URL found
    getImageUrlFromDb('cruise-line', slug, type, currentDirectUrl)
      .then(url => {
        // Only update if DB returned a different, valid URL
        if (url && url !== currentDirectUrl && !url.includes('placeholder') && url !== PLACEHOLDER_IMAGE) {
          setImageUrl(url);
        }
        setLoading(false);
      })
      .catch(() => {
        // Keep direct URL, just mark loading complete
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
 * Performance: Returns direct URL immediately (no grey box), DB check in background
 */
export function usePortGuideImage(slug, type = 'hero', portName = '', country = '') {
  // Compute direct URL immediately to avoid grey box flash
  const directUrl = slug ? getPortGuideImageUrl(slug, type) : PLACEHOLDER_IMAGE;
  
  const [imageUrl, setImageUrl] = useState(() => directUrl);
  const [loading, setLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(() => !slug);

  useEffect(() => {
    if (!slug) {
      setImageUrl(PLACEHOLDER_IMAGE);
      setLoading(false);
      setIsPlaceholder(true);
      return;
    }

    let cancelled = false;
    const currentDirectUrl = getPortGuideImageUrl(slug, type);
    
    // Set direct URL immediately (image starts loading now)
    setImageUrl(currentDirectUrl);
    setIsPlaceholder(false);

    // Check database in background - only update if different URL found
    getImageUrlFromDb('port-guide', slug, type, currentDirectUrl)
      .then(url => {
        if (cancelled) return;
        // Only update if DB returned a different, valid URL
        if (url && url !== currentDirectUrl && !url.includes('placeholder')) {
          setImageUrl(url);
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        // Keep direct URL, just mark loading complete
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
 * Performance: Returns direct URL immediately (no grey box), DB check in background
 */
export function usePageHeroImage(slug) {
  // Compute direct URL immediately to avoid grey box flash
  const directUrl = slug ? getPageHeroImageUrl(slug) : null;
  
  const [imageUrl, setImageUrl] = useState(() => directUrl);
  const [loading, setLoading] = useState(true);
  const [hasImage, setHasImage] = useState(() => !!slug);

  useEffect(() => {
    if (!slug) {
      setImageUrl(null);
      setLoading(false);
      setHasImage(false);
      return;
    }

    const currentDirectUrl = getPageHeroImageUrl(slug);
    
    // Set direct URL immediately (image starts loading now)
    setImageUrl(currentDirectUrl);
    setHasImage(true);

    // Page heroes are stored with entity_type='site', entity_id='site', image_type='page-hero-{slug}'
    const imageType = `page-hero-${slug}`;
    
    // Check database in background - only update if different URL found
    getImageUrlFromDb('site', 'site', imageType, currentDirectUrl)
      .then(url => {
        // Only update if DB returned a different, valid URL
        if (url && url !== currentDirectUrl && !url.includes('placeholder')) {
          setImageUrl(url);
        }
        setLoading(false);
      })
      .catch(() => {
        // Keep direct URL, just mark loading complete
        setLoading(false);
      });
  }, [slug]);

  return { imageUrl, loading, hasImage };
}
