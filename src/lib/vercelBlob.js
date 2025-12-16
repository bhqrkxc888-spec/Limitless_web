/**
 * Vercel Blob Storage Integration
 * Handles image uploads and URL generation for Vercel Blob
 */

import { put, list, del } from '@vercel/blob';
import logger from '../utils/logger';

/**
 * Upload an image to Vercel Blob
 * @param {File} file - The file to upload
 * @param {string} path - The file path (e.g., 'categories/home/hero.jpg')
 * @returns {Promise<{url: string, error: null} | {url: null, error: Error}>}
 */
export async function uploadImageToBlob(file, path) {
  try {
    const blob = await put(path, file, {
      access: 'public',
      addRandomSuffix: false, // Keep exact filename for consistency
    });

    logger.info('Image uploaded to Vercel Blob:', blob.url);
    return { url: blob.url, error: null };
  } catch (error) {
    logger.error('Error uploading image to Vercel Blob:', error);
    return { url: null, error };
  }
}

/**
 * List all images in Vercel Blob (optional, for admin purposes)
 * @param {string} prefix - Optional prefix to filter results (e.g., 'categories/')
 * @returns {Promise<Array>}
 */
export async function listBlobImages(prefix = '') {
  try {
    const { blobs } = await list({ prefix });
    return blobs;
  } catch (error) {
    logger.error('Error listing Vercel Blob images:', error);
    return [];
  }
}

/**
 * Delete an image from Vercel Blob
 * @param {string} url - The blob URL to delete
 * @returns {Promise<{success: boolean, error: null | Error}>}
 */
export async function deleteImageFromBlob(url) {
  try {
    await del(url);
    logger.info('Image deleted from Vercel Blob:', url);
    return { success: true, error: null };
  } catch (error) {
    logger.error('Error deleting image from Vercel Blob:', error);
    return { success: false, error };
  }
}

/**
 * Check if a URL is a Vercel Blob URL
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export function isVercelBlobUrl(url) {
  if (!url) return false;
  return url.includes('public.blob.vercel-storage.com') || 
         url.includes('blob.vercel-storage.com');
}

/**
 * Get optimized image URL for Vercel Blob
 * Note: Vercel automatically optimizes images served through their CDN
 * No manual transforms needed - just use the URL directly
 * 
 * @param {string} url - Original Vercel Blob URL
 * @returns {string} Same URL (Vercel handles optimization automatically)
 */
export function getOptimizedBlobUrl(url) {
  // Vercel Blob + Vercel Image Optimization handles this automatically
  // when using the Next.js Image component or similar
  return url;
}

