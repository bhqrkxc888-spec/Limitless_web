/**
 * Dynamic Image Component
 * Fetches image URL from Supabase database, falls back to constructed URL
 * Use this for destination cards, bucket list cards, etc. where images are uploaded via admin
 */

import { useState, useEffect } from 'react';
import { getImageUrlFromDb } from '../utils/imageLoader';
import { getDestinationImageUrl, getBucketListImageUrl } from '../config/assetUrls';

/**
 * Destination Card Image - fetches from DB
 */
export function DestinationCardImage({ slug, alt, ...props }) {
  const [src, setSrc] = useState(getDestinationImageUrl(slug, 'card'));

  useEffect(() => {
    if (!slug) return;
    
    const fallback = getDestinationImageUrl(slug, 'card');
    setSrc(fallback); // Show fallback immediately
    
    getImageUrlFromDb('destination', slug, 'card', fallback)
      .then(url => setSrc(url))
      .catch(() => setSrc(fallback));
  }, [slug]);

  return <img src={src} alt={alt} {...props} />;
}

/**
 * Bucket List Card Image - fetches from DB
 */
export function BucketListCardImage({ slug, alt, ...props }) {
  const [src, setSrc] = useState(getBucketListImageUrl(slug, 'card'));

  useEffect(() => {
    if (!slug) return;
    
    const fallback = getBucketListImageUrl(slug, 'card');
    setSrc(fallback); // Show fallback immediately
    
    getImageUrlFromDb('bucket-list', slug, 'card', fallback)
      .then(url => setSrc(url))
      .catch(() => setSrc(fallback));
  }, [slug]);

  return <img src={src} alt={alt} {...props} />;
}

