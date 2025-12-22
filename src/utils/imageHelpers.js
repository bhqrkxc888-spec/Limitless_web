/**
 * Image URL Helpers
 * Centralized image URL generation and optimization for LCP performance
 * Now using Vercel Blob Storage for website images
 */

import { isVercelBlobUrl } from '../lib/vercelBlob';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xrbusklskmeaamwynfmm.supabase.co';
const VERCEL_BLOB_URL = 'https://public.blob.vercel-storage.com';

// Cloudflare Images configuration
const CLOUDFLARE_ACCOUNT_ID = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_IMAGES_DOMAIN = CLOUDFLARE_ACCOUNT_ID 
  ? `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_ID}`
  : null;

/**
 * Get full URL for a Vercel Blob Storage image
 * @param {string} path - File path (e.g., 'categories/home/hero.jpg')
 * @returns {string} Full image URL
 * Note: Actual URLs are generated on upload, this is a placeholder
 */
export const getBlobUrl = (path) => {
  // Vercel Blob URLs are generated on upload
  // This is a helper for migration - actual URLs come from upload response
  return `${VERCEL_BLOB_URL}/${path}`;
};

/**
 * Legacy: Get full URL for a Supabase Storage image
 * Kept for backward compatibility during migration
 * @param {string} bucket - Storage bucket name (e.g., 'categories')
 * @param {string} path - File path within bucket (e.g., 'about/About1.webp')
 * @returns {string} Full image URL
 */
export const getStorageUrl = (bucket, path) => {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
};

/**
 * Check if URL is a Supabase Storage URL
 * @param {string} url - Image URL to check
 * @returns {boolean}
 */
export const isSupabaseUrl = (url) => {
  if (!url) return false;
  return url.includes('supabase.co/storage/v1/object/public/');
};

/**
 * Check if a string is a Cloudflare Image ID or URL
 * @param {string} str - String to check
 * @returns {boolean}
 */
export const isCloudflareImage = (str) => {
  if (!str) return false;
  
  // Check if it's a Cloudflare delivery URL
  if (str.includes('imagedelivery.net/')) return true;
  
  // Check if it's just an ID (UUID format or short hash)
  // Cloudflare IDs are typically UUIDs without dashes or short hashes
  const idPattern = /^[a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}$/i;
  const shortHashPattern = /^[a-zA-Z0-9_-]{8,}$/;
  
  return idPattern.test(str) || shortHashPattern.test(str);
};

/**
 * Extract Cloudflare Image ID from URL or return ID if already just an ID
 * @param {string} urlOrId - Cloudflare URL or image ID
 * @returns {string|null} - Image ID or null if invalid
 */
export const getCloudflareImageId = (urlOrId) => {
  if (!urlOrId) return null;
  
  // If it's already just an ID (no slashes), return it
  if (!urlOrId.includes('/')) {
    return urlOrId;
  }
  
  // Extract ID from Cloudflare URL: https://imagedelivery.net/{account-id}/{image-id}/{variant}
  const match = urlOrId.match(/imagedelivery\.net\/[^/]+\/([^/]+)/);
  if (match) {
    return match[1];
  }
  
  return null;
};

/**
 * Convert Supabase Storage URL to Image Transform URL
 * @param {string} url - Original Supabase Storage URL
 * @returns {string} Transform API URL
 */
const convertToTransformUrl = (url) => {
  if (!isSupabaseUrl(url)) return url;
  // Replace /object/ with /render/image/ for Supabase Image Transforms
  return url.replace('/storage/v1/object/', '/storage/v1/render/image/');
};

/**
 * Generate Cloudflare Images URL from image ID
 * @param {string} imageId - Cloudflare image ID
 * @param {string} variant - Variant name (default: 'public')
 * @returns {string} Full Cloudflare Images URL
 */
export const getCloudflareImageUrl = (imageId, variant = 'public') => {
  if (!CLOUDFLARE_IMAGES_DOMAIN) {
    console.warn('Cloudflare Images not configured (missing VITE_CLOUDFLARE_ACCOUNT_ID)');
    return '';
  }
  
  const cleanId = getCloudflareImageId(imageId) || imageId;
  return `${CLOUDFLARE_IMAGES_DOMAIN}/${cleanId}/${variant}`;
};

/**
 * Generate responsive Cloudflare Images URLs for different widths
 * Uses flexible variants for on-the-fly resizing
 * @param {string} imageId - Cloudflare image ID
 * @param {number[]} widths - Array of widths to generate
 * @returns {Array<{url: string, width: number}>} Array of URL/width pairs
 */
export const getCloudflareResponsiveUrls = (imageId, widths = [640, 1024, 1920]) => {
  if (!CLOUDFLARE_IMAGES_DOMAIN) return [];
  
  const cleanId = getCloudflareImageId(imageId) || imageId;
  
  // Cloudflare Images flexible variants: w={width},fit=scale-down
  return widths.map(width => ({
    url: `${CLOUDFLARE_IMAGES_DOMAIN}/${cleanId}/w=${width},fit=scale-down`,
    width
  }));
};

/**
 * Get optimized image URL
 * Works with Cloudflare Images, Vercel Blob, and Supabase Storage URLs
 * 
 * @param {string} url - Original image URL or Cloudflare ID
 * @param {object} options - Transform options
 * @param {number} options.width - Target width in pixels
 * @param {number} options.height - Target height in pixels (optional - omit to maintain aspect ratio)
 * @param {number} options.quality - Quality 1-100 (default: 85)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url) return url;
  
  // Cloudflare Images: Generate URL from ID or extract from URL
  if (isCloudflareImage(url)) {
    const imageId = getCloudflareImageId(url);
    const { width, quality = 85 } = options;
    
    if (width) {
      // Use flexible variants for custom sizing
      // Format: w={width},fit=scale-down,q={quality}
      return getCloudflareImageUrl(imageId, `w=${width},fit=scale-down,q=${quality}`);
    }
    
    // No transforms requested, use 'public' variant
    return getCloudflareImageUrl(imageId, 'public');
  }
  
  // Vercel Blob URLs are automatically optimized by Vercel's CDN
  // No manual transforms needed - return as-is
  if (isVercelBlobUrl(url)) {
    return url;
  }
  
  // Legacy: Supabase Image Transforms (for backward compatibility)
  if (isSupabaseUrl(url)) {
    const {
      width,
      height,
      quality = 85
    } = options;
    
    const transformUrl = convertToTransformUrl(url);
    const params = new URLSearchParams();
    
    if (width) params.set('width', String(width));
    if (height) params.set('height', String(height));
    if (quality) params.set('quality', String(quality));
    
    return params.toString() ? `${transformUrl}?${params}` : transformUrl;
  }
  
  // External URLs pass through unchanged
  return url;
};

/**
 * Generate responsive srcset for an image
 * Works with Cloudflare Images, Vercel Blob, and Supabase URLs
 * 
 * @param {string} url - Original image URL or Cloudflare ID
 * @param {number[]} widths - Array of widths to generate (default: [640, 1024, 1920])
 * @param {object} options - Transform options (quality, etc.)
 * @returns {string} srcset string or empty string if not optimizable
 */
export const generateSrcSet = (url, widths = [640, 1024, 1920], options = {}) => {
  if (!url) return '';
  
  // Cloudflare Images: generate responsive URLs with flexible variants
  if (isCloudflareImage(url)) {
    const { quality = 85 } = options;
    const imageId = getCloudflareImageId(url);
    
    return widths
      .map(width => {
        const variant = `w=${width},fit=scale-down,q=${quality}`;
        const optimizedUrl = getCloudflareImageUrl(imageId, variant);
        return `${optimizedUrl} ${width}w`;
      })
      .join(', ');
  }
  
  // Vercel Blob: return empty (Vercel Image component handles srcset automatically)
  if (isVercelBlobUrl(url)) {
    return '';
  }
  
  // Supabase: generate srcset manually
  if (isSupabaseUrl(url)) {
    const { quality = 85 } = options;
    
    return widths
      .map(width => {
        const optimizedUrl = getOptimizedImageUrl(url, { width, quality });
        return `${optimizedUrl} ${width}w`;
      })
      .join(', ');
  }
  
  // External URLs: no srcset
  return '';
};

/**
 * Get About page images
 */
export const aboutImages = {
  katherine1: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/About1.webp',
  katherine2: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/About2.webp',
  katherine3: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/About3.webp',
  holidayEliteLogo: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/about/HolidayEliteLogo.png'
};

/**
 * Get Homepage hero image
 * Now uses centralized config with proper fallback
 */
import { SITE_ASSETS, PLACEHOLDER_IMAGE } from '../config/assetUrls';
export const homeHeroImages = [SITE_ASSETS.homeHero || PLACEHOLDER_IMAGE];

/**
 * Image paths for Vercel Blob uploads
 * Use these paths when uploading images
 */
export const IMAGE_PATHS = {
  ABOUT: {
    KATHERINE_1: 'categories/about/katherine-1.webp',
    KATHERINE_2: 'categories/about/katherine-2.webp',
    KATHERINE_3: 'categories/about/katherine-3.webp',
    HOLIDAY_ELITE_LOGO: 'categories/about/holiday-elite-logo.png'
  },
  HOME: {
    HERO: 'categories/home/hero.jpeg'
  },
  DESTINATIONS: {
    // Add destination image paths as needed
  },
  CRUISE_LINES: {
    // Add cruise line image paths as needed
  }
};

/**
 * Placeholder image paths (in /public)
 */
export const PLACEHOLDERS = {
  hero: '/images/placeholders/hero.svg',
  logo: '/images/placeholders/logo.svg',
  ogImage: '/images/placeholders/og-image.svg',
};

/**
 * Validate and normalize an image URL with fallback to placeholder
 * @param {string} url - Image URL to validate
 * @param {string} fallback - Fallback placeholder type ('hero', 'logo', 'ogImage')
 * @returns {string} Valid image URL or placeholder
 */
export function normalizeImageUrl(url, fallback = 'hero') {
  // If no URL provided, return placeholder
  if (!url) {
    return PLACEHOLDERS[fallback] || PLACEHOLDERS.hero;
  }
  
  // If URL is already a valid absolute URL, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If URL starts with /, it's a valid public path
  if (url.startsWith('/')) {
    return url;
  }
  
  // Otherwise, it's invalid - return placeholder
  return PLACEHOLDERS[fallback] || PLACEHOLDERS.hero;
}

/**
 * Get hero image with fallback
 * @param {string} url - Hero image URL
 * @returns {string} Valid hero image URL
 */
export function getHeroImage(url) {
  return normalizeImageUrl(url, 'hero');
}

/**
 * Get logo image with fallback
 * @param {string} url - Logo image URL
 * @returns {string} Valid logo image URL
 */
export function getLogoImage(url) {
  return normalizeImageUrl(url, 'logo');
}

/**
 * Get OG/social image with fallback
 * @param {string} url - OG image URL
 * @returns {string} Valid OG image URL
 */
export function getOgImage(url) {
  return normalizeImageUrl(url, 'ogImage');
}

/**
 * Get card/thumbnail image with fallback
 * @param {string} url - Card image URL
 * @returns {string} Valid card image URL
 */
export function getCardImage(url) {
  return normalizeImageUrl(url, 'hero');
}

