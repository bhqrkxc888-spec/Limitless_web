/**
 * G606 Port Content
 * Imports from shared portContent.js and adds cruise-specific overrides
 * (e.g., arrival/departure times specific to this cruise)
 */

import { getPortContent as getSharedPortContent } from '../portContent';

// G606-specific port content with cruise-specific overrides
export const g606PortContent = {
  'la-coruna': {
    ...getSharedPortContent('a-coruna'),
    // Cruise-specific overrides (if needed)
    overview: {
      ...getSharedPortContent('a-coruna')?.overview,
      arriveTime: 'TBC',
      departTime: 'TBC'
    }
  },
  'tenerife': {
    ...getSharedPortContent('santa-cruz-de-tenerife'),
    overview: {
      ...getSharedPortContent('santa-cruz-de-tenerife')?.overview,
      arriveTime: 'TBC',
      departTime: 'TBC'
    }
  },
  'gran-canaria': {
    ...getSharedPortContent('las-palmas-gran-canaria'),
    overview: {
      ...getSharedPortContent('las-palmas-gran-canaria')?.overview,
      arriveTime: 'TBC',
      departTime: 'TBC'
    }
  },
  'lanzarote': {
    ...getSharedPortContent('lanzarote'),
    overview: {
      ...getSharedPortContent('lanzarote')?.overview,
      arriveTime: 'TBC',
      departTime: 'TBC'
    }
  },
  'cadiz': {
    ...getSharedPortContent('cadiz'),
    overview: {
      ...getSharedPortContent('cadiz')?.overview,
      arriveTime: 'TBC',
      departTime: 'TBC'
    }
  },
  'lisbon': {
    ...getSharedPortContent('lisbon'),
    overview: {
      ...getSharedPortContent('lisbon')?.overview,
      arriveTime: 'TBC',
      departTime: 'TBC'
    }
  }
};

/**
 * Get port content for G606 cruise
 * Falls back to shared content if not found
 */
export function getG606PortContent(portSlug) {
  return g606PortContent[portSlug] || getSharedPortContent(portSlug);
}
