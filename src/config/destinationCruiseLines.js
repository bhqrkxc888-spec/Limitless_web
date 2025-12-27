/**
 * Destination to Cruise Line Mappings
 * 
 * Structure:
 * - slug: cruise line slug (MUST match cruiseLines.js)
 * - name: full name
 * - shortName: abbreviated name for UI
 * - priority: 1-10 (10 = core line, build images first)
 * - type: 'mainstream' | 'luxury' | 'expedition' | 'luxury-expedition'
 * 
 * Priority Guide:
 * - 9-10: Must-have lines - build first
 * - 7-8: Important but secondary - build next
 * - 4-6: Nice-to-have - lower priority
 * - 1-3: Low frequency/specialist - only after main set
 * 
 * VALID CRUISE LINE SLUGS (from cruiseLines.js):
 * - p-and-o-cruises
 * - royal-caribbean
 * - msc-cruises
 * - norwegian-cruise-line
 * - disney-cruise-line
 * - celebrity-cruises
 * - fred-olsen-cruises
 * - holland-america-line
 * - marella-cruises
 * - virgin-voyages-cruises
 * - viking-cruises
 * - seabourn-cruises
 * - princess-cruises
 * - azamara-cruises
 * - cunard-cruises
 * - ae-expeditions
 * - hurtigruten (expedition)
 * - silversea (luxury-expedition)
 * - ponant (luxury-expedition)
 */

export const DESTINATION_CRUISE_LINE_MAP = {
  // ============================================================================
  // MAIN DESTINATIONS
  // ============================================================================
  
  'mediterranean-cruises': {
    cruiseLines: [
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 10, type: 'mainstream' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 10, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 9, type: 'mainstream' },
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL', priority: 8, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O', priority: 6, type: 'mainstream' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard', priority: 5, type: 'mainstream' },
    ]
  },
  
  'caribbean-cruises': {
    cruiseLines: [
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 10, type: 'mainstream' },
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL', priority: 9, type: 'mainstream' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 9, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 8, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 7, type: 'mainstream' },
      { slug: 'virgin-voyages-cruises', name: 'Virgin Voyages', shortName: 'Virgin', priority: 6, type: 'mainstream' },
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O', priority: 3, type: 'mainstream' },
    ]
  },
  
  'norwegian-fjords-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 9, type: 'mainstream' },
      { slug: 'hurtigruten', name: 'Hurtigruten', shortName: 'Hurtigruten', priority: 9, type: 'expedition' },
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O', priority: 8, type: 'mainstream' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 7, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 7, type: 'mainstream' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard', priority: 6, type: 'mainstream' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 6, type: 'luxury-expedition' },
    ]
  },
  
  'alaska-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 10, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 9, type: 'mainstream' },
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL', priority: 9, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 8, type: 'mainstream' },
      { slug: 'holland-america-line', name: 'Holland America', shortName: 'Holland America', priority: 8, type: 'mainstream' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 4, type: 'luxury-expedition' },
    ]
  },
  
  'baltic-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 8, type: 'mainstream' },
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O', priority: 7, type: 'mainstream' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 7, type: 'mainstream' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard', priority: 6, type: 'mainstream' },
    ]
  },
  
  'canary-islands-cruises': {
    cruiseLines: [
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O', priority: 8, type: 'mainstream' },
      { slug: 'marella-cruises', name: 'Marella Cruises', shortName: 'Marella', priority: 7, type: 'mainstream' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 6, type: 'mainstream' },
      { slug: 'fred-olsen-cruises', name: 'Fred. Olsen', shortName: 'Fred. Olsen', priority: 6, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 5, type: 'mainstream' },
    ]
  },
  
  'british-isles-cruises': {
    cruiseLines: [
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard', priority: 10, type: 'mainstream' },
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O', priority: 9, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 7, type: 'mainstream' },
      { slug: 'fred-olsen-cruises', name: 'Fred. Olsen', shortName: 'Fred. Olsen', priority: 6, type: 'mainstream' },
    ]
  },
  
  'transatlantic-cruises': {
    cruiseLines: [
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard', priority: 10, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 7, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
    ]
  },
  
  'hawaii-cruises': {
    cruiseLines: [
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL', priority: 10, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 6, type: 'mainstream' },
    ]
  },
  
  'australia-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 9, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 6, type: 'mainstream' },
    ]
  },
  
  'greek-isles-cruises': {
    cruiseLines: [
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 9, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 9, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 9, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 7, type: 'mainstream' },
    ]
  },
  
  'adriatic-cruises': {
    cruiseLines: [
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 10, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 8, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 7, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
    ]
  },
  
  'scandinavia-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O', priority: 7, type: 'mainstream' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard', priority: 6, type: 'mainstream' },
    ]
  },
  
  'canada-new-england-cruises': {
    cruiseLines: [
      { slug: 'holland-america-line', name: 'Holland America', shortName: 'Holland America', priority: 9, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 8, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
    ]
  },
  
  'panama-canal-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 10, type: 'mainstream' },
      { slug: 'holland-america-line', name: 'Holland America', shortName: 'Holland America', priority: 8, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 8, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
    ]
  },
  
  'southeast-asia-cruises': {
    cruiseLines: [
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 8, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 7, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
    ]
  },
  
  'south-america-cruises': {
    cruiseLines: [
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 8, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 7, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 6, type: 'mainstream' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 6, type: 'luxury' },
    ]
  },
  
  'middle-east-cruises': {
    cruiseLines: [
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 9, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 8, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 7, type: 'mainstream' },
    ]
  },
  
  'new-zealand-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 9, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 9, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
    ]
  },
  
  'iceland-cruises': {
    cruiseLines: [
      { slug: 'hurtigruten', name: 'Hurtigruten', shortName: 'Hurtigruten', priority: 9, type: 'expedition' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 7, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 6, type: 'mainstream' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 6, type: 'luxury-expedition' },
    ]
  },
  
  'japan-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 10, type: 'mainstream' },
      { slug: 'holland-america-line', name: 'Holland America', shortName: 'Holland America', priority: 8, type: 'mainstream' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean', priority: 7, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 6, type: 'mainstream' },
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL', priority: 6, type: 'mainstream' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 5, type: 'luxury' },
    ]
  },
  
  // ============================================================================
  // BUCKET LIST EXPERIENCES
  // ============================================================================
  
  'antarctica-cruises': {
    cruiseLines: [
      { slug: 'hurtigruten', name: 'Hurtigruten', shortName: 'Hurtigruten', priority: 10, type: 'expedition' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 9, type: 'luxury-expedition' },
      { slug: 'ponant', name: 'Ponant', shortName: 'Ponant', priority: 8, type: 'luxury-expedition' },
      { slug: 'seabourn-cruises', name: 'Seabourn', shortName: 'Seabourn', priority: 7, type: 'luxury-expedition' },
    ]
  },
  
  'galapagos-cruises': {
    cruiseLines: [
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 10, type: 'mainstream' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 9, type: 'luxury-expedition' },
    ]
  },
  
  'arctic-northern-lights-cruises': {
    cruiseLines: [
      { slug: 'hurtigruten', name: 'Hurtigruten', shortName: 'Hurtigruten', priority: 10, type: 'expedition' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 8, type: 'luxury-expedition' },
      { slug: 'ponant', name: 'Ponant', shortName: 'Ponant', priority: 7, type: 'luxury-expedition' },
      { slug: 'fred-olsen-cruises', name: 'Fred. Olsen', shortName: 'Fred. Olsen', priority: 6, type: 'mainstream' },
    ]
  },
  
  'amazon-river-cruises': {
    cruiseLines: [
      { slug: 'viking-cruises', name: 'Viking', shortName: 'Viking', priority: 8, type: 'luxury' },
    ]
  },
  
  'european-river-cruises': {
    cruiseLines: [
      { slug: 'viking-cruises', name: 'Viking', shortName: 'Viking', priority: 10, type: 'luxury' },
    ]
  },
  
  'great-barrier-reef-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 7, type: 'mainstream' },
      { slug: 'silversea', name: 'Silversea', shortName: 'Silversea', priority: 7, type: 'luxury' },
    ]
  },
  
  'polynesian-islands-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity', priority: 7, type: 'mainstream' },
    ]
  },
  
  'world-cruises': {
    cruiseLines: [
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard', priority: 10, type: 'mainstream' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess', priority: 8, type: 'mainstream' },
      { slug: 'viking-cruises', name: 'Viking', shortName: 'Viking', priority: 8, type: 'luxury' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC', priority: 7, type: 'mainstream' },
      { slug: 'holland-america-line', name: 'Holland America', shortName: 'Holland America', priority: 7, type: 'mainstream' },
    ]
  },
};

/**
 * Get cruise lines that sail to a specific destination
 * @param {string} destinationSlug 
 * @returns {Array} Array of cruise line objects sorted by priority (highest first)
 */
export function getCruiseLinesForDestination(destinationSlug) {
  const lines = DESTINATION_CRUISE_LINE_MAP[destinationSlug]?.cruiseLines || [];
  // Sort by priority (highest first)
  return [...lines].sort((a, b) => b.priority - a.priority);
}

/**
 * Get only high-priority cruise lines (priority >= 7)
 * @param {string} destinationSlug 
 * @returns {Array} Array of high-priority cruise line objects
 */
export function getHighPriorityCruiseLines(destinationSlug) {
  return getCruiseLinesForDestination(destinationSlug).filter(line => line.priority >= 7);
}

/**
 * Get luxury/expedition lines for a destination
 * @param {string} destinationSlug 
 * @returns {Array} Array of luxury/expedition cruise line objects
 */
export function getLuxuryExpeditionLines(destinationSlug) {
  return getCruiseLinesForDestination(destinationSlug).filter(
    line => line.type === 'luxury' || line.type === 'expedition' || line.type === 'luxury-expedition'
  );
}

/**
 * Get mainstream lines for a destination
 * @param {string} destinationSlug 
 * @returns {Array} Array of mainstream cruise line objects
 */
export function getMainstreamLines(destinationSlug) {
  return getCruiseLinesForDestination(destinationSlug).filter(line => line.type === 'mainstream');
}
