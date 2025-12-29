/**
 * Smart Placeholder Image Generator
 * 
 * Generates relevant, high-quality placeholder images using Unsplash
 * when real images haven't been uploaded yet.
 * 
 * All images are royalty-free and can be used commercially.
 */

// Unsplash Source API (free, no API key needed)
const UNSPLASH_BASE = 'https://source.unsplash.com';

/**
 * Get a relevant placeholder image for a port guide
 * @param {string} portSlug - e.g., "barcelona", "santorini"
 * @param {string} imageType - "hero", "beach", "attraction-1", etc.
 * @param {string} portName - Full port name for better search
 * @param {string} country - Country name for context
 * @returns {string} Unsplash image URL
 */
export function getPortPlaceholderImage(portSlug, imageType, portName = '', country = '') {
  // Size based on image type
  const sizes = {
    hero: '1600x900',
    card: '800x600',
    beach: '800x600',
    'attraction-1': '600x400',
    'attraction-2': '600x400',
    'attraction-3': '600x400',
    'attraction-4': '600x400',
    'attraction-5': '600x400',
    'attraction-6': '600x400',
  };
  
  const size = sizes[imageType] || '800x600';
  
  // Build search query based on image type
  let query = '';
  
  if (imageType === 'hero') {
    // Hero images: port/city skyline or harbor
    query = `${portName || portSlug},harbor,cruise,coast`;
  } else if (imageType === 'beach') {
    // Beach images
    query = `${portName || portSlug},beach,coast,mediterranean`;
  } else if (imageType.startsWith('attraction')) {
    // Attraction images: landmarks, sights
    query = `${portName || portSlug},landmark,architecture,tourism`;
  } else {
    // Default
    query = `${portName || portSlug},travel`;
  }
  
  // Encode and build URL
  const encodedQuery = encodeURIComponent(query);
  
  // Use featured endpoint for consistent, high-quality images
  // Add port slug as seed for consistent images per port
  return `${UNSPLASH_BASE}/featured/${size}/?${encodedQuery}&sig=${portSlug}-${imageType}`;
}

/**
 * Get a relevant placeholder for destinations
 * @param {string} destinationSlug - e.g., "mediterranean", "caribbean"
 * @param {string} imageType - "hero", "card", etc.
 * @param {string} destinationName - Full destination name
 * @returns {string} Unsplash image URL
 */
export function getDestinationPlaceholderImage(destinationSlug, imageType, destinationName = '') {
  const size = imageType === 'hero' ? '1600x900' : '800x600';
  const name = destinationName || destinationSlug;
  
  // Destination-specific keywords
  const query = `${name},cruise,travel,ocean,vacation`;
  const encodedQuery = encodeURIComponent(query);
  
  return `${UNSPLASH_BASE}/featured/${size}/?${encodedQuery}&sig=${destinationSlug}-${imageType}`;
}

/**
 * Get a relevant placeholder for cruise lines
 * @param {string} cruiseLineSlug - e.g., "norwegian", "celebrity"
 * @param {string} imageType - "hero", "logo", "ship", etc.
 * @param {string} cruiseLineName - Full cruise line name
 * @returns {string} Unsplash image URL
 */
export function getCruiseLinePlaceholderImage(cruiseLineSlug, imageType, cruiseLineName = '') {
  const size = imageType === 'hero' ? '1600x900' : imageType === 'logo' ? '400x400' : '800x600';
  const name = cruiseLineName || cruiseLineSlug;
  
  let query = '';
  if (imageType === 'hero' || imageType === 'ship') {
    query = `${name},cruise,ship,ocean,luxury`;
  } else if (imageType === 'logo') {
    query = `cruise,ship,logo,maritime`;
  } else {
    query = `${name},cruise,travel`;
  }
  
  const encodedQuery = encodeURIComponent(query);
  return `${UNSPLASH_BASE}/featured/${size}/?${encodedQuery}&sig=${cruiseLineSlug}-${imageType}`;
}

/**
 * Get a relevant placeholder for bucket list experiences
 * @param {string} experienceId - e.g., "northern-lights"
 * @param {string} imageType - "hero", "card", etc.
 * @param {string} experienceName - Full experience name
 * @returns {string} Unsplash image URL
 */
export function getBucketListPlaceholderImage(experienceId, imageType, experienceName = '') {
  const size = imageType === 'hero' ? '1600x900' : '800x600';
  const name = experienceName || experienceId.replace(/-/g, ' ');
  
  const query = `${name},travel,adventure,bucket list`;
  const encodedQuery = encodeURIComponent(query);
  
  return `${UNSPLASH_BASE}/featured/${size}/?${encodedQuery}&sig=${experienceId}-${imageType}`;
}

/**
 * Get a relevant placeholder for categories
 * @param {string} categorySlug - e.g., "river-cruises", "family-cruises"
 * @param {string} imageType - "hero", "card", etc.
 * @param {string} categoryName - Full category name
 * @returns {string} Unsplash image URL
 */
export function getCategoryPlaceholderImage(categorySlug, imageType, categoryName = '') {
  const size = imageType === 'hero' ? '1600x900' : '800x600';
  const name = categoryName || categorySlug.replace(/-/g, ' ');
  
  const query = `${name},cruise,travel,vacation`;
  const encodedQuery = encodeURIComponent(query);
  
  return `${UNSPLASH_BASE}/featured/${size}/?${encodedQuery}&sig=${categorySlug}-${imageType}`;
}

/**
 * Check if a URL is a placeholder image
 * @param {string} url 
 * @returns {boolean}
 */
export function isPlaceholderImage(url) {
  if (!url) return true;
  return url.includes('source.unsplash.com') || 
         url.includes('/images/placeholders/') ||
         url.includes('placeholder');
}

/**
 * Get keyword-based placeholder for any entity type
 * @param {string} keywords - Search keywords
 * @param {string} size - Image size "WIDTHxHEIGHT"
 * @returns {string} Unsplash URL
 */
export function getKeywordPlaceholder(keywords, size = '800x600') {
  const encodedKeywords = encodeURIComponent(keywords);
  return `${UNSPLASH_BASE}/featured/${size}/?${encodedKeywords}`;
}

export default {
  getPortPlaceholderImage,
  getDestinationPlaceholderImage,
  getCruiseLinePlaceholderImage,
  getBucketListPlaceholderImage,
  getCategoryPlaceholderImage,
  isPlaceholderImage,
  getKeywordPlaceholder
};

