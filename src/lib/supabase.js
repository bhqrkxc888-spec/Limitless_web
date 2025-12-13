import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Some features will be unavailable.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} bucket - The storage bucket name (e.g., 'cruise-lines')
 * @param {string} path - The file path within the bucket
 * @returns {Promise<{data, error}>}
 */
export async function uploadImage(file, bucket, path) {
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
    console.error('Error uploading image:', error);
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
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The file path within the bucket
 * @returns {Promise<{data, error}>}
 */
export async function deleteImage(bucket, path) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error deleting image:', error);
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
    console.error('Error listing files:', error);
    return { data: null, error };
  }
}

