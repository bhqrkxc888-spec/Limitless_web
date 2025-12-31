/**
 * Ship Slug Mapping
 * 
 * Simple slug generation for ship names.
 * Used for entityIds in image storage (e.g., "p-and-o-cruises/ships/iona")
 * 
 * Priority order:
 * 1. shipSlugOverrides (manual exceptions)
 * 2. Auto-generation from ship name
 * 
 * NOTE: This is ONLY for generating slugs from ship names.
 * For Widgety links/URLs, use getShipLink() from shipLinks.js instead.
 * 
 * Format: 'Ship Name': 'widgety-slug'
 */

export const shipSlugOverrides = {
  // Add ship name → slug mappings here for manual exceptions
  // Example:
  // 'Queen Mary 2': 'queen-mary-ii',
  // 'L\'Austral': 'l-austral',
};

/**
 * Get the slug for a ship name
 * Used for entityIds in image storage
 * 
 * @param {string} shipName - Ship name (e.g., "Iona")
 * @returns {string} Slug (e.g., "iona")
 */
export function getShipSlug(shipName) {
  if (!shipName) return '';
  
  // 1. Check manual overrides first (highest priority)
  if (shipSlugOverrides[shipName]) {
    return shipSlugOverrides[shipName];
  }
  
  // 2. Auto-generate slug from name (simple conversion)
  return shipName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')  // Remove special characters
    .replace(/-+/g, '-')  // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');  // Remove leading/trailing hyphens
}

