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
  isPlaceholderImage,
  getKeywordPlaceholder
};

