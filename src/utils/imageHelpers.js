/**
 * Image URL Helpers
 * Centralized image URL generation for easy updates
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
 * Get About page images
 */
export const aboutImages = {
  katherine1: getStorageUrl('categories', 'about/About1.webp'),
  katherine2: getStorageUrl('categories', 'about/About2.webp'),
  katherine3: getStorageUrl('categories', 'about/About3.webp'),
  holidayEliteLogo: getStorageUrl('categories', 'about/HolidayEliteLogo.png')
};

/**
 * Future: Easy to switch to custom domain
 * Just change SUPABASE_URL to your CDN/custom domain
 * Example: 'https://images.limitlesscruises.com'
 */

