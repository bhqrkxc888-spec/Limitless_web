/**
 * Destination Slug Mapping
 * 
 * Maps data/destinations.js slugs (used on website pages) 
 * to config/destinations.js slugs (used for image storage in database)
 * 
 * Website pages use: "mediterranean-cruises", "norwegian-fjords-cruises"
 * Database images use: "mediterranean", "norway"
 */

// Map from data slug to image slug (config slug)
export const destinationSlugToImageSlug = {
  // Exact mappings where slugs differ significantly
  'norwegian-fjords-cruises': 'norway',
  'australia-cruises': 'australia-new-zealand',
  'greek-isles-cruises': 'greek-islands',
  'scandinavia-cruises': 'scandinavia',
  'southeast-asia-cruises': 'southeast-asia',
  'norway-cruises': 'norway', // Also map norway-cruises if it exists
  
  // Standard mappings (just remove -cruises suffix)
  'mediterranean-cruises': 'mediterranean',
  'caribbean-cruises': 'caribbean',
  'alaska-cruises': 'alaska',
  'baltic-cruises': 'baltic',
  'british-isles-cruises': 'british-isles',
  'transatlantic-cruises': 'transatlantic',
  'hawaii-cruises': 'hawaii',
  'canada-new-england-cruises': 'canada-new-england',
  'panama-canal-cruises': 'panama-canal',
  'south-america-cruises': 'south-america',
  'japan-cruises': 'japan',
  'asia-cruises': 'asia',
  'iceland-cruises': 'iceland',
  'bermuda-cruises': 'bermuda',
  'mexico-cruises': 'mexico',
  'world-cruise-cruises': 'world-cruise',
  'northern-europe-cruises': 'northern-europe',
  'middle-east-cruises': 'dubai-middle-east',
  'adriatic-cruises': 'adriatic',
  'canary-islands-cruises': 'canary-islands',
  'atlantic-islands-cruises': 'atlantic-islands',
  'antarctica-cruises': 'antarctica',
  'eastern-mediterranean-cruises': 'eastern-mediterranean',
  'western-mediterranean-cruises': 'western-mediterranean',
};

/**
 * Get the image slug for a given destination data slug
 * @param {string} dataSlug - The slug from data/destinations.js (e.g., "mediterranean-cruises")
 * @returns {string} - The image slug for database lookup (e.g., "mediterranean")
 */
export function getImageSlugForDestination(dataSlug) {
  // First check explicit mapping
  if (destinationSlugToImageSlug[dataSlug]) {
    return destinationSlugToImageSlug[dataSlug];
  }
  
  // Try removing -cruises suffix
  const withoutCruises = dataSlug.replace(/-cruises$/, '');
  
  return withoutCruises;
}

/**
 * Get the data slug for a given image slug (reverse lookup)
 * @param {string} imageSlug - The slug from config/destinations.js (e.g., "mediterranean")
 * @returns {string} - The data slug (e.g., "mediterranean-cruises")
 */
export function getDataSlugForImageSlug(imageSlug) {
  // Find in mapping
  for (const [dataSlug, imgSlug] of Object.entries(destinationSlugToImageSlug)) {
    if (imgSlug === imageSlug) {
      return dataSlug;
    }
  }
  
  // Default: add -cruises suffix
  return `${imageSlug}-cruises`;
}

export default {
  destinationSlugToImageSlug,
  getImageSlugForDestination,
  getDataSlugForImageSlug
};

