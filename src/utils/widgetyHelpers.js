/**
 * Widgety Helper Functions
 * Utilities for generating Widgety widget URLs
 */

/**
 * Convert ship name to Widgety slug format
 * Examples: "Resilient Lady" -> "resilient-lady", "Queen Mary 2" -> "queen-mary-2"
 * @param {string} shipName - Ship name (e.g., "Resilient Lady")
 * @returns {string} Slug format (e.g., "resilient-lady")
 */
export function shipNameToSlug(shipName) {
  if (!shipName) return '';
  return shipName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')  // Remove special characters
    .replace(/-+/g, '-')  // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');  // Remove leading/trailing hyphens
}

/**
 * Generate Widgety ship widget URL
 * Opens ship details page with deck plans and availability
 * @param {string} shipName - Ship name (e.g., "Resilient Lady")
 * @param {string} operatorId - Optional operator ID for filtering
 * @returns {string} Widgety URL
 */
export function getWidgetyShipUrl(shipName, operatorId = null) {
  const shipSlug = shipNameToSlug(shipName);
  if (!shipSlug) return '/find-a-cruise';
  
  // Base widget path
  let widgetPath = `/widgets/ugPj5zR1QMRisywLk13B/ships/${shipSlug}.widget`;
  
  // Add operator filter if provided
  if (operatorId) {
    widgetPath += `?operator_ids[]=${operatorId}`;
  }
  
  // URL encode the widget path for the widgety-state parameter
  const encodedPath = encodeURIComponent(widgetPath);
  
  return `/find-a-cruise?widgety-state=${encodedPath}`;
}

/**
 * Generate Widgety cruise search URL with filters
 * @param {Object} filters - Search filters
 * @param {string} filters.cruiseLine - Cruise line slug
 * @param {string} filters.destination - Destination slug
 * @param {string} filters.ship - Ship name
 * @returns {string} Widgety URL
 */
export function getWidgetySearchUrl(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.cruiseLine) {
    params.append('cruise-line', filters.cruiseLine);
  }
  if (filters.destination) {
    params.append('destination', filters.destination);
  }
  if (filters.ship) {
    params.append('ship', shipNameToSlug(filters.ship));
  }
  
  const queryString = params.toString();
  return queryString ? `/find-a-cruise?${queryString}` : '/find-a-cruise';
}

