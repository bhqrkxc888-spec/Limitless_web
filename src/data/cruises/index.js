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
import { g639Cruise } from './g639';
import { g640Cruise } from './g640';

// Registry of all cruises
export const cruises = {
  'g606': g606Cruise,
  'g639': g639Cruise,
  'g640': g640Cruise,
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
      return ['overview', 'weather', 'stayLocal', 'goFurther', 'withKids', 'send', 'medical', 'foodAndDrink'];
    case 'sea':
      return ['overview', 'onTheShip', 'quietSpots', 'send'];
    case 'embarkation':
      return ['whatToExpect', 'weather', 'gettingThere', 'tips', 'send'];
    case 'disembarkation':
      return ['whatToExpect', 'tips', 'send'];
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
    medical: 'Medical',
    foodAndDrink: 'Food & Drink',
    onTheShip: 'On The Ship',
    quietSpots: 'Quiet Spots',
    whatToExpect: 'What to Expect',
    gettingThere: 'Getting There',
    tips: 'Tips'
  };
  return labels[sectionKey] || sectionKey;
}
