/**
 * Image Naming Convention Utilities
 * 
 * Automatically generates card and hero image URLs based on a base image name
 * 
 * Convention:
 * - Card images (1600×900): filename-CARD.jpg
 * - Hero images (1920×1080): filename-HERO.jpg
 * 
 * Example:
 * Base: "norwegian-fjords"
 * Card: "norwegian-fjords-CARD.jpg"
 * Hero: "norwegian-fjords-HERO.jpg"
 */

/**
 * Get card image URL from base URL or full URL
 * @param {string} imageUrl - Base URL or full image URL
 * @returns {string} Card image URL
 */
export function getCardImageUrl(imageUrl) {
  if (!imageUrl) return null;
  
  // If already has -CARD suffix, return as-is
  if (imageUrl.includes('-CARD.')) {
    return imageUrl;
  }
  
  // If has -HERO suffix, replace with -CARD
  if (imageUrl.includes('-HERO.')) {
    return imageUrl.replace('-HERO.', '-CARD.');
  }
  
  // If has file extension, insert -CARD before it
  const lastDot = imageUrl.lastIndexOf('.');
  if (lastDot > 0) {
    const basePath = imageUrl.substring(0, lastDot);
    const extension = imageUrl.substring(lastDot);
    return `${basePath}-CARD${extension}`;
  }
  
  // No extension, just append
  return `${imageUrl}-CARD.jpg`;
}

/**
 * Get hero image URL from base URL or full URL
 * @param {string} imageUrl - Base URL or full image URL
 * @returns {string} Hero image URL
 */
export function getHeroImageUrl(imageUrl) {
  if (!imageUrl) return null;
  
  // If already has -HERO suffix, return as-is
  if (imageUrl.includes('-HERO.')) {
    return imageUrl;
  }
  
  // If has -CARD suffix, replace with -HERO
  if (imageUrl.includes('-CARD.')) {
    return imageUrl.replace('-CARD.', '-HERO.');
  }
  
  // If has file extension, insert -HERO before it
  const lastDot = imageUrl.lastIndexOf('.');
  if (lastDot > 0) {
    const basePath = imageUrl.substring(0, lastDot);
    const extension = imageUrl.substring(lastDot);
    return `${basePath}-HERO${extension}`;
  }
  
  // No extension, just append
  return `${imageUrl}-HERO.jpg`;
}

/**
 * Get base image path without -CARD or -HERO suffix
 * @param {string} imageUrl - Full image URL
 * @returns {string} Base image path
 */
export function getBaseImagePath(imageUrl) {
  if (!imageUrl) return null;
  
  return imageUrl
    .replace('-CARD.', '.')
    .replace('-HERO.', '.');
}

/**
 * Check if URL is a card image
 * @param {string} imageUrl - Image URL
 * @returns {boolean}
 */
export function isCardImage(imageUrl) {
  return imageUrl && imageUrl.includes('-CARD.');
}

/**
 * Check if URL is a hero image
 * @param {string} imageUrl - Image URL
 * @returns {boolean}
 */
export function isHeroImage(imageUrl) {
  return imageUrl && imageUrl.includes('-HERO.');
}

/**
 * Generate suggested filename for upload
 * @param {string} offerTitle - Offer title or name
 * @param {string} type - 'card' or 'hero'
 * @returns {string} Suggested filename
 */
export function generateImageFilename(offerTitle, type = 'card') {
  if (!offerTitle) return null;
  
  // Convert to URL-friendly slug
  const slug = offerTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const suffix = type === 'hero' ? 'HERO' : 'CARD';
  return `${slug}-${suffix}.jpg`;
}

/**
 * Parse image filename to extract info
 * @param {string} filename - Image filename
 * @returns {object} Parsed info { name, type, extension }
 */
export function parseImageFilename(filename) {
  if (!filename) return null;
  
  const lastDot = filename.lastIndexOf('.');
  const baseName = lastDot > 0 ? filename.substring(0, lastDot) : filename;
  const extension = lastDot > 0 ? filename.substring(lastDot + 1) : 'jpg';
  
  let type = 'unknown';
  let name = baseName;
  
  if (baseName.endsWith('-CARD')) {
    type = 'card';
    name = baseName.substring(0, baseName.length - 5);
  } else if (baseName.endsWith('-HERO')) {
    type = 'hero';
    name = baseName.substring(0, baseName.length - 5);
  }
  
  return {
    name,
    type,
    extension,
    fullName: filename
  };
}

