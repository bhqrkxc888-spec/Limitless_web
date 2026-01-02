/**
 * Universal Image Resolver
 * Bulletproof image URL resolution for Admin→Site image mapping
 * 
 * Handles all image formats:
 * - Absolute HTTP(S) URLs
 * - Supabase Storage URLs
 * - Vercel Blob URLs
 * - Relative paths
 * - Invalid/empty values → fallback
 * 
 * Dev-mode logging for debugging image issues
 */

import { isSupabaseUrl } from './imageHelpers';
import { isVercelBlobUrl } from '../lib/vercelBlob';
import { PLACEHOLDER_IMAGE } from '../config/assetUrls';

// Dev-only image resolution log
const imageResolutionLog = [];
const MAX_LOG_ENTRIES = 100;

/**
 * Log image resolution for dev-mode debugging
 * @param {object} entry - Log entry with entity, raw value, resolved value, status
 */
function logImageResolution(entry) {
  if (!import.meta.env?.DEV) return;
  
  imageResolutionLog.unshift({
    timestamp: new Date().toISOString(),
    ...entry
  });
  
  // Keep only last N entries
  if (imageResolutionLog.length > MAX_LOG_ENTRIES) {
    imageResolutionLog.pop();
  }
  
  // Console log for failures
  if (entry.status === 'invalid' || entry.status === 'empty') {
    console.warn(
      `[Image Resolver] ${entry.status.toUpperCase()} image:`,
      `\n  Entity: ${entry.entityType}/${entry.entityId}`,
      `\n  Type: ${entry.imageType}`,
      `\n  Raw: ${entry.rawValue}`,
      `\n  Resolved: ${entry.resolvedValue}`
    );
  }
}

/**
 * Get the image resolution log (dev-mode only)
 * @returns {array} Log entries
 */
export function getImageResolutionLog() {
  return [...imageResolutionLog];
}

/**
 * Clear the image resolution log
 */
export function clearImageResolutionLog() {
  imageResolutionLog.length = 0;
}

/**
 * Check if a value is a valid image URL/path
 * @param {any} value - Value to check
 * @returns {boolean}
 */
function isValidImageValue(value) {
  if (!value) return false;
  if (typeof value !== 'string') return false;
  
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed === 'null' || trimmed === 'undefined') return false;
  
  return true;
}

/**
 * Check if a URL is absolute (starts with http:// or https://)
 * @param {string} url - URL to check
 * @returns {boolean}
 */
function isAbsoluteUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Check if a path is relative (starts with /)
 * @param {string} path - Path to check
 * @returns {boolean}
 */
function isRelativePath(path) {
  return path.startsWith('/');
}

/**
 * Resolve an image source to a usable URL
 * Handles all formats and provides fallback for invalid values
 * 
 * @param {any} value - Raw image value (URL, path, or invalid)
 * @param {object} options - Resolution options
 * @param {string} options.entityType - Entity type (e.g., 'offer', 'destination')
 * @param {string} options.entityId - Entity ID/slug
 * @param {string} options.imageType - Image type (e.g., 'hero', 'card')
 * @param {string} options.fallback - Custom fallback URL (optional)
 * @param {boolean} options.silent - Don't log resolution (optional)
 * @returns {string} Resolved image URL
 */
export function resolveImageSrc(value, options = {}) {
  const {
    entityType = 'unknown',
    entityId = 'unknown',
    imageType = 'unknown',
    fallback = PLACEHOLDER_IMAGE,
    silent = false
  } = options;
  
  // Log helper
  const log = (status, resolvedValue) => {
    if (!silent) {
      logImageResolution({
        entityType,
        entityId,
        imageType,
        rawValue: String(value),
        resolvedValue,
        status
      });
    }
  };
  
  // Handle empty/invalid values
  if (!isValidImageValue(value)) {
    log('empty', fallback);
    return fallback;
  }
  
  const trimmedValue = value.trim();
  
  // Handle absolute URLs (most common for Supabase/Blob)
  if (isAbsoluteUrl(trimmedValue)) {
    // Validate it's a proper image URL
    if (isSupabaseUrl(trimmedValue) || isVercelBlobUrl(trimmedValue)) {
      log('resolved-absolute', trimmedValue);
      return trimmedValue;
    }
    
    // Generic HTTP(S) URL - trust it
    try {
      new URL(trimmedValue); // Validate it's a valid URL
      log('resolved-absolute', trimmedValue);
      return trimmedValue;
    } catch {
      log('invalid', fallback);
      return fallback;
    }
  }
  
  // Handle relative paths (e.g., /images/...)
  if (isRelativePath(trimmedValue)) {
    // Relative paths are served from public folder
    log('resolved-relative', trimmedValue);
    return trimmedValue;
  }
  
  // Handle protocol-relative URLs (//example.com/image.jpg)
  if (trimmedValue.startsWith('//')) {
    const protocolRelativeUrl = `https:${trimmedValue}`;
    log('resolved-protocol-relative', protocolRelativeUrl);
    return protocolRelativeUrl;
  }
  
  // If we get here, value format is unrecognized
  // Log as invalid and return fallback
  log('invalid', fallback);
  return fallback;
}

/**
 * Batch resolve multiple image sources
 * Useful for galleries, lists, etc.
 * 
 * @param {array} values - Array of raw image values
 * @param {object} options - Resolution options (same as resolveImageSrc)
 * @returns {array} Array of resolved URLs
 */
export function resolveImageSrcBatch(values, options = {}) {
  if (!Array.isArray(values)) return [];
  
  return values
    .map((value, index) => resolveImageSrc(value, {
      ...options,
      entityId: `${options.entityId || 'batch'}-${index}`
    }))
    .filter(url => url !== PLACEHOLDER_IMAGE); // Filter out placeholders from batch
}

/**
 * Get image resolution statistics (dev-mode only)
 * @returns {object} Stats: total, resolved, empty, invalid
 */
export function getImageResolutionStats() {
  if (!import.meta.env?.DEV) {
    return { total: 0, resolved: 0, empty: 0, invalid: 0 };
  }
  
  const stats = {
    total: imageResolutionLog.length,
    resolved: 0,
    empty: 0,
    invalid: 0
  };
  
  imageResolutionLog.forEach(entry => {
    if (entry.status === 'resolved-absolute' || entry.status === 'resolved-relative' || entry.status === 'resolved-protocol-relative') {
      stats.resolved++;
    } else if (entry.status === 'empty') {
      stats.empty++;
    } else if (entry.status === 'invalid') {
      stats.invalid++;
    }
  });
  
  return stats;
}

