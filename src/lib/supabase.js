import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
const isConfigured = supabaseUrl && supabaseAnonKey;

if (!isConfigured) {
  logger.warn('Supabase environment variables not configured. Contact form will be unavailable.');
}

// Only create client if configured, otherwise create a mock that won't throw
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} bucket - The storage bucket name (e.g., 'cruise-lines')
 * @param {string} path - The file path within the bucket
 * @param {object} options - Upload options
 * @returns {Promise<{data, error}>}
 */
export async function uploadImage(file, bucket, path, options = {}) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: options.upsert !== undefined ? options.upsert : true, // Default to true to allow replacements
        ...options
      });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    logger.error('Error uploading image:', error);
    return { data: null, error };
  }
}

/**
 * Get public URL for an image in Supabase Storage
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The file path within the bucket
 * @returns {string} The public URL
 */
export function getPublicUrl(bucket, path) {
  if (!supabase) {
    // Return placeholder when Supabase not configured
    return '/images/placeholders/hero.svg';
  }
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Upload a document to Supabase Storage (for price match quotes, etc.)
 * @param {File} file - The file to upload
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The file path within the bucket
 * @returns {Promise<{data, error}>}
 */
export async function uploadDocument(file, bucket, path) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    logger.error('Error uploading document:', error);
    return { data: null, error };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The file path within the bucket
 * @returns {Promise<{data, error}>}
 */
export async function deleteImage(bucket, path) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    logger.error('Error deleting image:', error);
    return { data: null, error };
  }
}

/**
 * List files in a storage bucket
 * @param {string} bucket - The storage bucket name
 * @param {string} folder - Optional folder path
 * @returns {Promise<{data, error}>}
 */
export async function listFiles(bucket, folder = '') {
  if (!supabase) {
    return { data: [], error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    logger.error('Error listing files:', error);
    return { data: null, error };
  }
}

