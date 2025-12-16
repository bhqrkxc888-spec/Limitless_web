/**
 * Image URL Helpers
 * Centralized image URL generation and optimization for LCP performance
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xrbusklskmeaamwynfmm.supabase.co';

/**
 * Get full URL for a Supabase Storage image
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
 * Get optimized image URL with Supabase Image Transforms
 * Only transforms Supabase Storage URLs; external URLs pass through unchanged.
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
  
  // If not Supabase URL, return as-is (external images like Unsplash)
  if (!isSupabaseUrl(url)) return url;
  
  const {
    width,
    height,
    quality = 85
    // format parameter removed - Supabase doesn't support it
  } = options;
  
  const transformUrl = convertToTransformUrl(url);
  const params = new URLSearchParams();
  
  // Only add width - let height auto-calculate to preserve aspect ratio
  if (width) params.set('width', String(width));
  if (height) params.set('height', String(height));
  if (quality) params.set('quality', String(quality));
  // Don't add format parameter - not supported by Supabase Image Transforms
  
  return params.toString() ? `${transformUrl}?${params}` : transformUrl;
};

/**
 * Generate responsive srcset for an image
 * Only generates srcset for Supabase URLs; returns empty string for external URLs.
 * 
 * @param {string} url - Original image URL
 * @param {number[]} widths - Array of widths to generate (default: [640, 1024, 1920])
 * @param {object} options - Transform options (quality, format, etc.)
 * @returns {string} srcset string or empty string if not Supabase URL
 */
export const generateSrcSet = (url, widths = [640, 1024, 1920], options = {}) => {
  if (!url || !isSupabaseUrl(url)) return '';
  
  const { quality = 85 } = options;
  
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(url, { width, quality });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
};

/**
 * Get About page images
 */
export const aboutImages = {
  katherine1: getStorageUrl('categories', 'about/About1.webp'),
  katherine2: getStorageUrl('categories', 'about/About2.webp'),
  katherine3: getStorageUrl('categories', 'about/About3.webp'),
  holidayEliteLogo: getStorageUrl('categories', 'about/HolidayEliteLogo.png')
};

/**
 * Get Homepage hero image
 */
export const homeHeroImages = [
  getStorageUrl('categories', 'Home/hero-2.jpeg') // Riviera Maya Caribbean beach
];

/**
 * Future: Easy to switch to custom domain
 * Just change SUPABASE_URL to your CDN/custom domain
 * Example: 'https://images.limitlesscruises.com'
 */

