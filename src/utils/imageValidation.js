/**
 * Image Validation Utility
 * 
 * Provides comprehensive validation for image uploads including:
 * - File size validation (with warning and error thresholds)
 * - Dimension validation (with flexible ±10% tolerance)
 * - Format validation (WebP preferred)
 * - ALT text validation (required)
 * 
 * Returns validation results with status: 'pass', 'warning', or 'error'
 */

import { logger } from './logger';

// ============================================================================
// VALIDATION THRESHOLDS
// ============================================================================

export const FILE_SIZE_LIMITS = {
  // Heroes (large images)
  hero: {
    warning: 200 * 1024, // 200KB
    error: 500 * 1024,   // 500KB
  },
  // Cards (medium images)
  card: {
    warning: 50 * 1024,  // 50KB
    error: 100 * 1024,   // 100KB
  },
  // Logos (small images)
  logo: {
    warning: 20 * 1024,  // 20KB
    error: 50 * 1024,    // 50KB
  },
  // Gallery images (similar to heroes)
  gallery: {
    warning: 200 * 1024, // 200KB
    error: 500 * 1024,   // 500KB
  },
  // Default for other types
  default: {
    warning: 200 * 1024,
    error: 500 * 1024,
  },
};

export const DIMENSION_SPECS = {
  // Site assets
  'site-hero': { width: 1920, height: 1080 },
  'site-hero-mobile': { width: 768, height: 1024 },
  'site-logo': { width: 400, height: 120 },
  'site-og-image': { width: 1200, height: 630 },
  'site-favicon': { width: 512, height: 512 },
  
  // About page Katherine photos (all portrait)
  'site-katherine1': { width: 800, height: 1000 },
  'site-katherine2': { width: 800, height: 1000 },
  'site-katherine3': { width: 800, height: 1000 },
  
  // Destination images
  'destination-hero': { width: 1920, height: 800 },
  'destination-card': { width: 400, height: 300 },
  'destination-mobile': { width: 800, height: 600 },
  
  // Cruise line images
  'cruise-line-logo': { width: 400, height: 200 },
  'cruise-line-hero': { width: 1920, height: 800 },
  'cruise-line-card': { width: 400, height: 300 },
  
  // Ship images
  'ship-hero': { width: 1920, height: 800 },
  'ship-card': { width: 400, height: 300 },
  'ship-exterior': { width: 1920, height: 1080 },
  'ship-deck': { width: 1920, height: 1080 },
  'ship-suite': { width: 1920, height: 1080 },
  'ship-dining': { width: 1920, height: 1080 },
  'ship-pool': { width: 1920, height: 1080 },
  'ship-entertainment': { width: 1920, height: 1080 },
  'ship-spa': { width: 1920, height: 1080 },
  'ship-theater': { width: 1920, height: 1080 },
  
  // Category images
  'category-card': { width: 400, height: 300 },
  
  // Team images
  'team-gallery': { width: 1200, height: 800 },
};

export const ALLOWED_FORMATS = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
export const PREFERRED_FORMAT = 'image/webp';

export const DIMENSION_TOLERANCE = 0.10; // ±10%

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate file size
 * @param {File} file - The file to validate
 * @param {string} imageType - Type of image (hero, card, logo, etc.)
 * @returns {Object} { status: 'pass'|'warning'|'error', message: string }
 */
export function validateFileSize(file, imageType) {
  if (!file) {
    return { status: 'error', message: 'No file provided' };
  }

  const fileSize = file.size;
  const limits = FILE_SIZE_LIMITS[imageType] || FILE_SIZE_LIMITS.default;

  if (fileSize > limits.error) {
    return {
      status: 'error',
      message: `File size (${formatFileSize(fileSize)}) exceeds maximum (${formatFileSize(limits.error)}). Please optimize the image.`,
      details: { fileSize, limit: limits.error }
    };
  }

  if (fileSize > limits.warning) {
    return {
      status: 'warning',
      message: `File size (${formatFileSize(fileSize)}) is larger than recommended (${formatFileSize(limits.warning)}). Consider optimizing for better page load performance.`,
      details: { fileSize, limit: limits.warning }
    };
  }

  return {
    status: 'pass',
    message: `File size (${formatFileSize(fileSize)}) is optimal.`,
    details: { fileSize }
  };
}

/**
 * Validate image dimensions
 * @param {HTMLImageElement|Object} image - Image element or object with width/height
 * @param {string} entityType - Type of entity (site, destination, cruise-line, ship, category)
 * @param {string} imageType - Type of image (hero, card, logo, etc.)
 * @returns {Object} { status: 'pass'|'warning'|'error', message: string }
 */
export function validateDimensions(image, entityType, imageType) {
  if (!image || !image.width || !image.height) {
    return { status: 'error', message: 'Unable to read image dimensions' };
  }

  const actualWidth = image.width;
  const actualHeight = image.height;

  // Construct spec key (e.g., 'destination-hero', 'ship-exterior')
  const specKey = `${entityType}-${imageType}`;
  const expectedDims = DIMENSION_SPECS[specKey];

  if (!expectedDims) {
    // No specific dimension requirement for this type
    return {
      status: 'pass',
      message: `Dimensions: ${actualWidth}×${actualHeight}`,
      details: { width: actualWidth, height: actualHeight }
    };
  }

  const widthDiff = Math.abs(actualWidth - expectedDims.width) / expectedDims.width;
  const heightDiff = Math.abs(actualHeight - expectedDims.height) / expectedDims.height;

  // Check if within tolerance
  if (widthDiff > DIMENSION_TOLERANCE || heightDiff > DIMENSION_TOLERANCE) {
    return {
      status: 'error',
      message: `Dimensions (${actualWidth}×${actualHeight}) differ by more than 10% from expected (${expectedDims.width}×${expectedDims.height}). Please resize the image.`,
      details: {
        actual: { width: actualWidth, height: actualHeight },
        expected: expectedDims,
        widthDiff: (widthDiff * 100).toFixed(1),
        heightDiff: (heightDiff * 100).toFixed(1)
      }
    };
  }

  if (widthDiff > 0.01 || heightDiff > 0.01) {
    return {
      status: 'warning',
      message: `Dimensions (${actualWidth}×${actualHeight}) are close to expected (${expectedDims.width}×${expectedDims.height}) but not exact. Consider resizing for pixel-perfect display.`,
      details: {
        actual: { width: actualWidth, height: actualHeight },
        expected: expectedDims
      }
    };
  }

  return {
    status: 'pass',
    message: `Dimensions (${actualWidth}×${actualHeight}) match expected perfectly.`,
    details: {
      actual: { width: actualWidth, height: actualHeight },
      expected: expectedDims
    }
  };
}

/**
 * Validate image format
 * @param {File} file - The file to validate
 * @returns {Object} { status: 'pass'|'warning'|'error', message: string }
 */
export function validateFormat(file) {
  if (!file) {
    return { status: 'error', message: 'No file provided' };
  }

  const fileType = file.type.toLowerCase();

  if (!ALLOWED_FORMATS.includes(fileType)) {
    return {
      status: 'error',
      message: `Format (${fileType}) is not allowed. Please use WebP, JPEG, or PNG.`,
      details: { format: fileType, allowed: ALLOWED_FORMATS }
    };
  }

  if (fileType !== PREFERRED_FORMAT) {
    return {
      status: 'warning',
      message: `Format (${fileType}) is allowed but WebP is preferred for better performance and smaller file sizes.`,
      details: { format: fileType, preferred: PREFERRED_FORMAT }
    };
  }

  return {
    status: 'pass',
    message: `Format (${fileType}) is optimal.`,
    details: { format: fileType }
  };
}

/**
 * Validate ALT text
 * @param {string} altText - The ALT text to validate
 * @returns {Object} { status: 'pass'|'warning'|'error', message: string }
 */
export function validateAltText(altText) {
  if (!altText || altText.trim() === '') {
    return {
      status: 'error',
      message: 'ALT text is required for accessibility and SEO. Please provide a descriptive ALT text.',
      details: { length: 0 }
    };
  }

  const trimmedText = altText.trim();
  const length = trimmedText.length;

  if (length < 5) {
    return {
      status: 'warning',
      message: `ALT text is very short (${length} characters). Consider adding more descriptive text for better SEO.`,
      details: { length, text: trimmedText }
    };
  }

  if (length > 125) {
    return {
      status: 'warning',
      message: `ALT text is quite long (${length} characters). Consider shortening for better readability (recommended < 125 characters).`,
      details: { length, text: trimmedText }
    };
  }

  return {
    status: 'pass',
    message: `ALT text (${length} characters) is appropriate.`,
    details: { length, text: trimmedText }
  };
}

/**
 * Get overall validation status from multiple validation results
 * @param {Array<Object>} validations - Array of validation results
 * @returns {string} 'pass' | 'warning' | 'error'
 */
export function getOverallStatus(validations) {
  if (!validations || validations.length === 0) {
    return 'error';
  }

  const hasError = validations.some(v => v.status === 'error');
  const hasWarning = validations.some(v => v.status === 'warning');

  if (hasError) return 'error';
  if (hasWarning) return 'warning';
  return 'pass';
}

/**
 * Validate all aspects of an image
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {string} options.entityType - Type of entity (site, destination, cruise-line, ship, category)
 * @param {string} options.imageType - Type of image (hero, card, logo, etc.)
 * @param {string} options.altText - ALT text for the image
 * @returns {Promise<Object>} Validation results
 */
export async function validateImage(file, options) {
  const { entityType, imageType, altText } = options;

  try {
    // Validate format (synchronous)
    const formatResult = validateFormat(file);

    // Validate file size (synchronous)
    const fileSizeResult = validateFileSize(file, imageType);

    // Validate ALT text (synchronous)
    const altTextResult = validateAltText(altText);

    // Validate dimensions (asynchronous - need to load image)
    const dimensionsResult = await validateImageDimensions(file, entityType, imageType);

    const validations = [formatResult, fileSizeResult, altTextResult, dimensionsResult];
    const overallStatus = getOverallStatus(validations);
    const seoCompliant = overallStatus !== 'error';

    // Collect warnings for storage
    const warnings = validations
      .filter(v => v.status === 'warning' || v.status === 'error')
      .map(v => ({
        type: v.message.includes('size') ? 'file_size' :
              v.message.includes('Dimensions') ? 'dimensions' :
              v.message.includes('Format') ? 'format' :
              v.message.includes('ALT') ? 'alt_text' : 'unknown',
        message: v.message,
        severity: v.status
      }));

    return {
      valid: overallStatus !== 'error',
      status: overallStatus,
      seoCompliant,
      validations,
      warnings,
      details: {
        format: formatResult.details,
        fileSize: fileSizeResult.details,
        altText: altTextResult.details,
        dimensions: dimensionsResult.details
      }
    };
  } catch (error) {
    logger.error('Error validating image:', error);
    return {
      valid: false,
      status: 'error',
      seoCompliant: false,
      validations: [{
        status: 'error',
        message: `Validation error: ${error.message}`
      }],
      warnings: [{
        type: 'validation_error',
        message: error.message,
        severity: 'error'
      }]
    };
  }
}

/**
 * Load image and validate dimensions (helper function)
 * @param {File} file - The file to validate
 * @param {string} entityType - Type of entity
 * @param {string} imageType - Type of image
 * @returns {Promise<Object>} Validation result
 */
async function validateImageDimensions(file, entityType, imageType) {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(validateDimensions(img, entityType, imageType));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        status: 'error',
        message: 'Unable to load image for dimension validation',
        details: {}
      });
    };

    img.src = objectUrl;
  });
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "250 KB")
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Get file size category for an image type
 * @param {string} imageType - Type of image
 * @returns {string} Category: 'hero', 'card', 'logo', or 'default'
 */
export function getFileSizeCategory(imageType) {
  if (imageType.includes('hero')) return 'hero';
  if (imageType.includes('card')) return 'card';
  if (imageType.includes('logo')) return 'logo';
  if (['exterior', 'deck', 'suite', 'dining', 'pool', 'entertainment', 'spa', 'theater'].includes(imageType)) {
    return 'gallery';
  }
  return 'default';
}

/**
 * Get expected dimensions for an image type
 * @param {string} entityType - Type of entity
 * @param {string} imageType - Type of image
 * @returns {Object|null} Expected dimensions or null if no spec exists
 */
export function getExpectedDimensions(entityType, imageType) {
  const specKey = `${entityType}-${imageType}`;
  return DIMENSION_SPECS[specKey] || null;
}

export default {
  validateFileSize,
  validateDimensions,
  validateFormat,
  validateAltText,
  validateImage,
  getOverallStatus,
  formatFileSize,
  getFileSizeCategory,
  getExpectedDimensions,
  FILE_SIZE_LIMITS,
  DIMENSION_SPECS,
  ALLOWED_FORMATS,
  PREFERRED_FORMAT,
  DIMENSION_TOLERANCE
};

