/**
 * Ship Slug Mapping
 * 
 * Maps ship names to their correct Widgety slugs.
 * 
 * Priority order:
 * 1. shipLinks.js (synced from CRM database)
 * 2. shipSlugOverrides (manual exceptions)
 * 3. Auto-generation
 * 
 * Format: 'Ship Name': 'widgety-slug'
 */

import { getShipLink } from './shipLinks';

export const shipSlugOverrides = {
  // Add ship name → Widgety slug mappings here for manual exceptions
  // These override both shipLinks and auto-generation
  // Example:
  // 'Queen Mary 2': 'queen-mary-ii',
  // 'L\'Austral': 'l-austral',
};

/**
 * Get the Widgety slug for a ship name
 * Checks in order: overrides → shipLinks (CRM) → auto-generation
 * 
 * @param {string} shipName - Ship name (e.g., "Resilient Lady")
 * @returns {string} Widgety slug (e.g., "resilient-lady")
 */
export function getShipSlug(shipName) {
  if (!shipName) return '';
  
  // 1. Check manual overrides first (highest priority)
  if (shipSlugOverrides[shipName]) {
    return shipSlugOverrides[shipName];
  }
  
  // 2. Check shipLinks (synced from CRM)
  const shipLink = getShipLink(shipName);
  if (shipLink && shipLink !== shipName.toLowerCase().replace(/\s+/g, '-')) {
    // If it's different from auto-generated, use it
    return shipLink;
  }
  
  // 3. Auto-generate slug (fallback)
  return shipName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')  // Remove special characters
    .replace(/-+/g, '-')  // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');  // Remove leading/trailing hyphens
}

