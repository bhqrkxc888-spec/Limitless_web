/**
 * Dynamic Image Component
 * Fetches image URL from Supabase database, falls back to constructed URL
 * Use this for destination cards, bucket list cards, etc. where images are uploaded via admin
 * 
 * Note: These components include width/height for CLS prevention and lazy loading by default.
 * The container should define dimensions via CSS aspect-ratio.
 */

import { useState, useEffect } from 'react';
import { getImageUrlFromDb } from '../utils/imageLoader';
import { getDestinationImageUrl, getBucketListImageUrl } from '../config/assetUrls';

/**
 * Destination Card Image - fetches from DB
 * Default dimensions: 800x450 (16:9 ratio), can be overridden via props
 */
export function DestinationCardImage({ slug, alt, width = 800, height = 450, loading = 'lazy', ...props }) {
  const [src, setSrc] = useState(getDestinationImageUrl(slug, 'card'));

  useEffect(() => {
    if (!slug) return;
    
    const fallback = getDestinationImageUrl(slug, 'card');
    setSrc(fallback); // Show fallback immediately
    
    getImageUrlFromDb('destination', slug, 'card', fallback)
      .then(url => setSrc(url))
      .catch(() => setSrc(fallback));
  }, [slug]);

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
  const [src, setSrc] = useState(getBucketListImageUrl(slug, 'card'));

  useEffect(() => {
    if (!slug) return;
    
    const fallback = getBucketListImageUrl(slug, 'card');
    setSrc(fallback); // Show fallback immediately
    
    getImageUrlFromDb('bucket-list', slug, 'card', fallback)
      .then(url => setSrc(url))
      .catch(() => setSrc(fallback));
  }, [slug]);

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

