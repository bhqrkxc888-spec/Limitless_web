/**
 * Dynamic Image Component
 * Fetches image URL from Supabase database, falls back to constructed URL
 * Use this for destination cards, bucket list cards, etc. where images are uploaded via admin
 * 
 * Note: These components include width/height for CLS prevention and lazy loading by default.
 * The container should define dimensions via CSS aspect-ratio.
 * 
 * Fix: Initial state is set to fallback URL directly (no double render).
 * DB fetch only updates if a different URL is found.
 */

import { useState, useEffect, useMemo } from 'react';
import { getImageUrlFromDb } from '../utils/imageLoader';
import { getDestinationImageUrl, getBucketListImageUrl } from '../config/assetUrls';

/**
 * Destination Card Image - fetches from DB
 * Default dimensions: 800x450 (16:9 ratio), can be overridden via props
 */
export function DestinationCardImage({ slug, alt, width = 800, height = 450, loading = 'lazy', ...props }) {
  // Compute fallback synchronously to avoid flash
  const fallback = useMemo(() => getDestinationImageUrl(slug, 'card'), [slug]);
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    if (!slug) return;
    
    // Only fetch from DB, don't re-set fallback (already in state)
    getImageUrlFromDb('destination', slug, 'card', fallback)
      .then(url => {
        // Only update if DB returned a different URL
        if (url && url !== fallback) {
          setSrc(url);
        }
      })
      .catch(() => {
        // Keep current src (already fallback)
      });
  }, [slug, fallback]);

  // Update src if slug changes (new fallback)
  useEffect(() => {
    setSrc(fallback);
  }, [fallback]);

  return (
    <img 
      src={src} 
      alt={alt} 
      width={width}
      height={height}
      loading={loading}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      {...props} 
    />
  );
}

/**
 * Bucket List Card Image - fetches from DB
 * Default dimensions: 800x450 (16:9 ratio), can be overridden via props
 */
export function BucketListCardImage({ slug, alt, width = 800, height = 450, loading = 'lazy', ...props }) {
  // Compute fallback synchronously to avoid flash
  const fallback = useMemo(() => getBucketListImageUrl(slug, 'card'), [slug]);
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    if (!slug) return;
    
    // Only fetch from DB, don't re-set fallback (already in state)
    getImageUrlFromDb('bucket-list', slug, 'card', fallback)
      .then(url => {
        // Only update if DB returned a different URL
        if (url && url !== fallback) {
          setSrc(url);
        }
      })
      .catch(() => {
        // Keep current src (already fallback)
      });
  }, [slug, fallback]);

  // Update src if slug changes (new fallback)
  useEffect(() => {
    setSrc(fallback);
  }, [fallback]);

  return (
    <img 
      src={src} 
      alt={alt} 
      width={width}
      height={height}
      loading={loading}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      {...props} 
    />
  );
}

