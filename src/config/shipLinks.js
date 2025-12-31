/**
 * Ship Links Configuration
 * 
 * Maps ship names to their Widgety ship information URLs.
 * This file is synced from the CRM database (crm.cruise_ships.ship_info_url).
 * 
 * Format: 'Ship Name': 'widgety-url-or-slug'
 * 
 * To update: Run the sync script or manually update from CRM.
 * 
 * @see scripts/sync-ship-links.js for syncing from CRM database
 */

export const shipLinks = {
  // Ship links synced from CRM database (crm.cruise_ships.ship_info_url)
  // Format: 'Ship Name': 'widgety-slug' or 'full-widgety-url'
  // Can be either:
  // - Widgety slug (e.g., 'resilient-lady') - will be converted to Widgety URL
  // - Full Widgety URL (e.g., 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=...')
  
  // P&O Cruises Ships
  'Arcadia': 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=%2Fwidgets%2FugPj5zR1QMRisywLk13B%2Fships%2Farcadia.widget%3Foperator_ids%255B%255D%3D36',
  'Arvia': 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=%2Fwidgets%2FugPj5zR1QMRisywLk13B%2Fships%2Farvia.widget%3Foperator_ids%255B%255D%3D36',
  'Aurora': 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=%2Fwidgets%2FugPj5zR1QMRisywLk13B%2Fships%2Faurora.widget%3Foperator_ids%255B%255D%3D36',
  'Azura': 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=%2Fwidgets%2FugPj5zR1QMRisywLk13B%2Fships%2Fazura.widget%3Foperator_ids%255B%255D%3D36',
  'Britannia': 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=%2Fwidgets%2FugPj5zR1QMRisywLk13B%2Fships%2Fbritannia.widget%3Foperator_ids%255B%255D%3D36',
  'Iona': 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=%2Fwidgets%2FugPj5zR1QMRisywLk13B%2Fships%2Fiona.widget%3Foperator_ids%255B%255D%3D36',
  'Ventura': 'https://www.limitlesscruises.com/find-a-cruise?widgety-state=%2Fwidgets%2FugPj5zR1QMRisywLk13B%2Fships%2Fventura.widget%3Foperator_ids%255B%255D%3D36',
};

/**
 * Get ship link/slug for a ship name
 * Checks shipLinks first, then falls back to slug generation
 * 
 * @param {string} shipName - Ship name (e.g., "Resilient Lady")
 * @returns {string} Ship slug or full Widgety URL
 */
export function getShipLink(shipName) {
  if (!shipName) return '';
  
  // Check if we have a stored link
  if (shipLinks[shipName]) {
    // If it's already a full URL, return it
    if (shipLinks[shipName].startsWith('http')) {
      return shipLinks[shipName];
    }
    // Otherwise return the slug (will be converted to Widgety URL)
    return shipLinks[shipName];
  }
  
  // Fallback: return null so caller can use slug generation
  return null;
}

