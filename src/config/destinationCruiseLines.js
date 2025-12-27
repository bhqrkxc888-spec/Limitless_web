// Destination-specific cruise line mappings
// Only show cruise line card slots for lines that ACTUALLY go to each destination

export const DESTINATION_CRUISE_LINE_MAP = {
  // European Destinations
  'mediterranean-cruises': {
    cruiseLines: [
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard' },
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL' },
    ]
  },
  
  'caribbean-cruises': {
    cruiseLines: [
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O' }, // P&O does some Caribbean from UK
    ]
  },
  
  'norwegian-fjords-cruises': {
    cruiseLines: [
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'atlantic-islands-cruises': {
    cruiseLines: [
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard' },
    ]
  },
  
  'alaska-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'norwegian-cruise-line', name: 'Norwegian Cruise Line', shortName: 'NCL' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'baltic-cruises': {
    cruiseLines: [
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard' },
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
    ]
  },
  
  'british-isles-cruises': {
    cruiseLines: [
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
    ]
  },
  
  'transatlantic-cruises': {
    cruiseLines: [
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
    ]
  },
  
  'hawaii-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'australia-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'adriatic-cruises': {
    cruiseLines: [
      { slug: 'msc-cruises', name: 'MSC Cruises', shortName: 'MSC' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'scandinavia-cruises': {
    cruiseLines: [
      { slug: 'p-and-o-cruises', name: 'P&O Cruises', shortName: 'P&O' },
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'cunard-cruises', name: 'Cunard', shortName: 'Cunard' },
    ]
  },
  
  'panama-canal-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'southeast-asia-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'new-zealand-cruises': {
    cruiseLines: [
      { slug: 'princess-cruises', name: 'Princess Cruises', shortName: 'Princess' },
      { slug: 'royal-caribbean', name: 'Royal Caribbean', shortName: 'Royal Caribbean' },
      { slug: 'celebrity-cruises', name: 'Celebrity Cruises', shortName: 'Celebrity' },
    ]
  },
  
  'antarctica-cruises': {
    cruiseLines: [
      // Expedition cruise lines - none of our mainstream lines go here regularly
      // Leave empty for now, use default card
    ]
  },
};

/**
 * Get cruise lines that actually sail to a specific destination
 * @param {string} destinationSlug 
 * @returns {Array} Array of cruise line objects or empty array
 */
export function getCruiseLinesForDestination(destinationSlug) {
  return DESTINATION_CRUISE_LINE_MAP[destinationSlug]?.cruiseLines || [];
}

