/**
 * Bucket List to Destination Image Mapping
 * 
 * Some bucket list experiences share images with destinations.
 * This mapping allows bucket list experiences to use destination images
 * when bucket list-specific images aren't available.
 */

export const bucketListToDestinationMapping = {
  // Antarctica Expeditions → Antarctica destination
  'antarctica': 'antarctica',
  
  // Northern Lights & Arctic → Norway destination (Northern Lights are in Arctic/Norway)
  'northern-lights': 'norway',
  
  // Galápagos Islands → No direct destination match (unique bucket list)
  // 'galapagos': null,
  
  // Japan & Asia Cruises → Japan or Asia destinations
  'japan-asia': 'japan', // Primary match to Japan, can also use Asia
  
  // Rocky Mountaineer & Alaska → Alaska destination
  'rocky-mountaineer-alaska': 'alaska',
  
  // South America → South America destination
  'south-america': 'south-america',
  
  // Pacific & New Zealand → Australia & New Zealand destination
  'pacific-new-zealand': 'australia-new-zealand',
  
  // Middle East → Dubai & Middle East destination
  'middle-east': 'dubai-middle-east',
  
  // World Cruises → World Cruise destination (if exists) or can use multiple
  'world-cruises': 'world-cruise',
  
  // Transatlantic Crossings → Transatlantic destination
  'transatlantic-crossings': 'transatlantic',
  
  // European River Cruises → Mediterranean (most European river cruises are in this region)
  'european-rivers': 'mediterranean',
  
  // Great Barrier Reef → Australia & New Zealand destination
  'great-barrier-reef': 'australia-new-zealand',
  
  // Iceland Circumnavigation → Iceland destination
  'iceland-circumnavigation': 'iceland',
  
  // Grand Voyages → World Cruise destination (extended voyages)
  'grand-voyages': 'world-cruise',
  
  // Midnight Sun Voyages → Norway destination (same region as Northern Lights)
  'midnight-sun': 'norway',
};

/**
 * Get destination slug for a bucket list experience
 * @param {string} bucketListId - Bucket list experience ID
 * @returns {string|null} Destination slug or null if no match
 */
export function getDestinationForBucketList(bucketListId) {
  return bucketListToDestinationMapping[bucketListId] || null;
}

/**
 * Check if bucket list experience can share images with a destination
 * @param {string} bucketListId - Bucket list experience ID
 * @returns {boolean} True if mapping exists
 */
export function canShareDestinationImages(bucketListId) {
  return bucketListId in bucketListToDestinationMapping;
}

