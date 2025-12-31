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
  // Format: 'Ship Name': 'widgety-slug' or 'full-url'
  // Example:
  // 'Resilient Lady': 'resilient-lady',
  // 'Queen Mary 2': 'queen-mary-ii',
};

/**
 * Get ship link/slug for a ship name
 * Checks shipLinks first, then falls back to slug generation
 * 
 * @param {string} shipName - Ship name (e.g., "Resilient Lady")
 * @returns {string} Ship slug or URL
 */
export function getShipLink(shipName) {
  if (!shipName) return '';
  
  // Check if we have a stored link
  if (shipLinks[shipName]) {
    return shipLinks[shipName];
  }
  
  // Fallback to slug generation (for backwards compatibility)
  return shipName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

