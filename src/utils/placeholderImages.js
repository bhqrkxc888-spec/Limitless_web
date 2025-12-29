/**
 * Smart Placeholder Image Generator
 * 
 * Generates simple "Image Coming Soon" placeholders with ship icon.
 * Replaces Unsplash integration - user will add images systematically.
 */

// Simple data URI placeholder with "Image Coming Soon" and ship icon
const createPlaceholder = (width, height) => {
  // SVG with ship icon and "Image Coming Soon" text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#2c3e50"/>
      <g transform="translate(${width/2}, ${height/2 - 30})">
        <path d="M-30,0 L-20,-10 L20,-10 L30,0 L25,10 L-25,10 Z M-15,-10 L-15,-20 L-10,-25 L10,-25 L15,-20 L15,-10" 
              fill="#d4af37" stroke="#d4af37" stroke-width="2"/>
      </g>
      <text x="50%" y="${height/2 + 40}" font-family="system-ui, -apple-system, sans-serif" 
            font-size="20" font-weight="600" fill="#d4af37" text-anchor="middle">
        Image Coming Soon
      </text>
      <text x="50%" y="${height/2 + 65}" font-family="system-ui, -apple-system, sans-serif" 
            font-size="14" fill="#95a5a6" text-anchor="middle">
        High-quality images will be added shortly
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/**
 * Get a placeholder for any image type
 * @param {string} imageType - "hero", "card", "beach", "attraction-1", etc.
 * @returns {string} Data URI with SVG placeholder
 */
export function getPlaceholder(imageType) {
  // Size based on image type
  const sizes = {
    hero: [1600, 900],
    card: [800, 600],
    beach: [800, 600],
    'attraction-1': [600, 400],
    'attraction-2': [600, 400],
    'attraction-3': [600, 400],
    'attraction-4': [600, 400],
    'attraction-5': [600, 400],
    'attraction-6': [600, 400],
  };
  
  const [width, height] = sizes[imageType] || [800, 600];
  return createPlaceholder(width, height);
}

/**
 * Get a placeholder for port guide images
 */
export function getPortPlaceholderImage(portSlug, imageType) {
  return getPlaceholder(imageType);
}

/**
 * Get a placeholder for destinations
 */
export function getDestinationPlaceholderImage(destinationSlug, imageType) {
  return getPlaceholder(imageType);
}

/**
 * Get a placeholder for cruise lines
 */
export function getCruiseLinePlaceholderImage(cruiseLineSlug, imageType) {
  return getPlaceholder(imageType);
}

/**
 * Get a placeholder for bucket list experiences
 */
export function getBucketListPlaceholderImage(experienceId, imageType) {
  return getPlaceholder(imageType);
}

/**
 * Get a placeholder for categories
 */
export function getCategoryPlaceholderImage(categorySlug, imageType) {
  return getPlaceholder(imageType);
}

/**
 * Check if a URL is a placeholder image
 * @param {string} url 
 * @returns {boolean}
 */
export function isPlaceholderImage(url) {
  if (!url) return true;
  return url.startsWith('data:image/svg') || 
         url.includes('/images/placeholders/') ||
         url.includes('placeholder');
}

/**
 * Get keyword-based placeholder
 */
export function getKeywordPlaceholder(keywords, size = '800x600') {
  const [width, height] = size.split('x').map(Number);
  return createPlaceholder(width, height);
}

export default {
  getPlaceholder,
  getPortPlaceholderImage,
  getDestinationPlaceholderImage,
  getCruiseLinePlaceholderImage,
  getBucketListPlaceholderImage,
  getCategoryPlaceholderImage,
  isPlaceholderImage,
  getKeywordPlaceholder
};

