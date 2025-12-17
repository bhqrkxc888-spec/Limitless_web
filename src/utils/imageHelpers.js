/**
 * Image URL Helpers
 * Centralized image URL generation and optimization for LCP performance
 * Now using Vercel Blob Storage for website images
 */

import { isVercelBlobUrl } from '../lib/vercelBlob';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xrbusklskmeaamwynfmm.supabase.co';
const VERCEL_BLOB_URL = 'https://public.blob.vercel-storage.com';

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
 * Get optimized image URL
 * Works with both Vercel Blob and Supabase Storage URLs
 * 
 * @param {string} url - Original image URL
 * @param {object} options - Transform options
 * @param {number} options.width - Target width in pixels
 * @param {number} options.height - Target height in pixels (optional - omit to maintain aspect ratio)
 * @param {number} options.quality - Quality 1-100 (default: 85)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url) return url;
  
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
 * Works with both Vercel Blob and Supabase URLs
 * 
 * @param {string} url - Original image URL
 * @param {number[]} widths - Array of widths to generate (default: [640, 1024, 1920])
 * @param {object} options - Transform options (quality, etc.)
 * @returns {string} srcset string or empty string if not optimizable
 */
export const generateSrcSet = (url, widths = [640, 1024, 1920], options = {}) => {
  if (!url) return '';
  
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

