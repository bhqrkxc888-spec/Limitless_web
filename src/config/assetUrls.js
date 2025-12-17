/**
 * Asset URLs Configuration
 * 
 * All static website images are hardcoded here.
 * To update: Upload to Vercel Blob, paste URL here, deploy.
 * 
 * Vercel Blob Dashboard: https://vercel.com/[your-team]/[project]/stores
 */

// Base URL for your Vercel Blob storage
export const BLOB_BASE = 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com';

// ============================================================================
// SITE-WIDE ASSETS
// Set to actual URL when uploaded, null when not yet uploaded
// ============================================================================

export const SITE_ASSETS = {
  // Homepage hero image (16:9, 1920x1080+)
  homeHero: null,
  
  // Social share image for Facebook/Twitter/LinkedIn (1200x630)
  ogImage: null,
  
  // Site logo (transparent PNG or SVG)
  logo: null,
  
  // Favicon (512x512 PNG)
  favicon: null,
};

// ============================================================================
// DESTINATION HEROES
// Upload path: destinations/{slug}-hero.webp
// Set to actual URL when uploaded, null when not yet uploaded
// ============================================================================

export const DESTINATION_HEROES = {
  'caribbean': null,
  'mediterranean': null,
  'northern-europe': null,
  'alaska': null,
  'asia': null,
  'australia-new-zealand': null,
  'south-america': null,
  'africa': null,
  'middle-east': null,
  'hawaii': null,
  'transatlantic': null,
  'world-cruises': null,
};

// ============================================================================
// CRUISE LINE ASSETS
// Upload paths:
//   - cruise-lines/{id}-logo.webp (transparent)
//   - cruise-lines/{id}-hero.webp (16:9)
//   - cruise-lines/{id}-card.webp (16:9)
// Set to actual URL when uploaded, null when not yet uploaded
// ============================================================================

export const CRUISE_LINE_LOGOS = {
  'royal-caribbean': null,
  'celebrity-cruises': null,
  'norwegian-cruise-line': null,
  'princess-cruises': null,
  'carnival-cruise-line': null,
  'holland-america': null,
  'msc-cruises': null,
  'disney-cruise-line': null,
  'cunard': null,
  'p-and-o-cruises': null,
  'viking-ocean': null,
  'silversea': null,
  'regent-seven-seas': null,
  'seabourn': null,
  'oceania-cruises': null,
  'azamara': null,
  'windstar-cruises': null,
  'hurtigruten': null,
  'virgin-voyages': null,
  'explora-journeys': null,
};

export const CRUISE_LINE_HEROES = {
  'royal-caribbean': null,
  'celebrity-cruises': null,
  'norwegian-cruise-line': null,
  'princess-cruises': null,
  'carnival-cruise-line': null,
  'holland-america': null,
  'msc-cruises': null,
  'disney-cruise-line': null,
  'cunard': null,
  'p-and-o-cruises': null,
  'viking-ocean': null,
  'silversea': null,
  'regent-seven-seas': null,
  'seabourn': null,
  'oceania-cruises': null,
  'azamara': null,
  'windstar-cruises': null,
  'hurtigruten': null,
  'virgin-voyages': null,
  'explora-journeys': null,
};

export const CRUISE_LINE_CARDS = {
  'royal-caribbean': null,
  'celebrity-cruises': null,
  'norwegian-cruise-line': null,
  'princess-cruises': null,
  'carnival-cruise-line': null,
  'holland-america': null,
  'msc-cruises': null,
  'disney-cruise-line': null,
  'cunard': null,
  'p-and-o-cruises': null,
  'viking-ocean': null,
  'silversea': null,
  'regent-seven-seas': null,
  'seabourn': null,
  'oceania-cruises': null,
  'azamara': null,
  'windstar-cruises': null,
  'hurtigruten': null,
  'virgin-voyages': null,
  'explora-journeys': null,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get destination hero image URL
 * @param {string} slug - Destination slug
 * @param {string} fallback - Fallback URL if not found
 */
export function getDestinationHero(slug, fallback = '') {
  return DESTINATION_HEROES[slug] || fallback;
}

/**
 * Get cruise line logo URL
 * @param {string} id - Cruise line ID
 * @param {string} fallback - Fallback URL if not found
 */
export function getCruiseLineLogo(id, fallback = '') {
  return CRUISE_LINE_LOGOS[id] || fallback;
}

/**
 * Get cruise line hero image URL
 * @param {string} id - Cruise line ID
 * @param {string} fallback - Fallback URL if not found
 */
export function getCruiseLineHero(id, fallback = '') {
  return CRUISE_LINE_HEROES[id] || fallback;
}

/**
 * Get cruise line card image URL
 * @param {string} id - Cruise line ID
 * @param {string} fallback - Fallback URL if not found
 */
export function getCruiseLineCard(id, fallback = '') {
  return CRUISE_LINE_CARDS[id] || fallback;
}

// ============================================================================
// PLACEHOLDER IMAGE
// Used when an image hasn't been uploaded yet
// ============================================================================

export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect fill="%231a1f2e" width="400" height="225"/%3E%3Ctext fill="%234a5568" font-family="system-ui" font-size="14" text-anchor="middle" x="200" y="112"%3EImage Coming Soon%3C/text%3E%3C/svg%3E';
