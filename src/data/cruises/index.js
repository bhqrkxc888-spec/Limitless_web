/**
 * Cruise Registry
 * 
 * Central registry for all cruise itineraries.
 * To add a new cruise, create a file in this folder and register it here.
 * 
 * Port content is AUTOMATICALLY pulled from:
 * - ports.js (familyFriendly, mustSeeSights, etc.)
 * - portContent.js (detailed narrative content)
 * 
 * You just define the itinerary (dates, ports, times) and everything else
 * is pulled from the port guides.
 */

import { g606Cruise } from './g606';

// Registry of all cruises
export const cruises = {
  'g606': g606Cruise,
  // Add more cruises here:
  // 'g701': g701Cruise,
  // 'g802': g802Cruise,
};

/**
 * Get cruise by ID
 */
export function getCruiseById(cruiseId) {
  return cruises[cruiseId] || null;
}

/**
 * Get all cruise IDs
 */
export function getAllCruiseIds() {
  return Object.keys(cruises);
}

/**
 * Check if cruise exists
 */
export function cruiseExists(cruiseId) {
  return cruiseId in cruises;
}

/**
 * Get sections available for a day type
 * This is standard across all cruises
 */
export function getSectionsForDayType(dayType) {
  switch (dayType) {
    case 'port':
      return ['overview', 'weather', 'stayLocal', 'goFurther', 'withKids', 'send', 'foodAndDrink', 'ship'];
    case 'sea':
      return ['overview', 'onTheShip', 'quietSpots', 'send', 'ship'];
    case 'embarkation':
      return ['whatToExpect', 'weather', 'gettingThere', 'tips', 'send', 'ship'];
    case 'disembarkation':
      return ['whatToExpect', 'tips', 'send', 'ship'];
    default:
      return [];
  }
}

/**
 * Get section label
 */
export function getSectionLabel(sectionKey) {
  const labels = {
    overview: 'Overview',
    weather: 'Weather',
    stayLocal: 'Stay Local',
    goFurther: 'Go Further',
    withKids: 'With Kids',
    send: 'SEND & Accessibility',
    foodAndDrink: 'Food & Drink',
    onTheShip: 'On The Ship',
    quietSpots: 'Quiet Spots',
    whatToExpect: 'What to Expect',
    gettingThere: 'Getting There',
    tips: 'Tips',
    ship: 'Ship'
  };
  return labels[sectionKey] || sectionKey;
}
