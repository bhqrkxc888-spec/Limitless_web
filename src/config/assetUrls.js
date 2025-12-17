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
// ============================================================================

export const SITE_ASSETS = {
  // Homepage hero image (16:9, 1920x1080+)
  homeHero: `${BLOB_BASE}/site/home-hero.webp`,
  
  // Social share image for Facebook/Twitter/LinkedIn (1200x630)
  ogImage: `${BLOB_BASE}/site/og-image.webp`,
  
  // Site logo (transparent PNG or SVG)
  logo: `${BLOB_BASE}/site/logo.webp`,
  
  // Favicon (512x512 PNG)
  favicon: `${BLOB_BASE}/site/favicon.png`,
};

// ============================================================================
// DESTINATION HEROES
// Upload path: destinations/{slug}-HERO.webp
// ============================================================================

export const DESTINATION_HEROES = {
  'caribbean': `${BLOB_BASE}/destinations/caribbean-HERO.webp`,
  'mediterranean': `${BLOB_BASE}/destinations/mediterranean-HERO.webp`,
  'northern-europe': `${BLOB_BASE}/destinations/northern-europe-HERO.webp`,
  'alaska': `${BLOB_BASE}/destinations/alaska-HERO.webp`,
  'asia': `${BLOB_BASE}/destinations/asia-HERO.webp`,
  'australia-new-zealand': `${BLOB_BASE}/destinations/australia-new-zealand-HERO.webp`,
  'south-america': `${BLOB_BASE}/destinations/south-america-HERO.webp`,
  'africa': `${BLOB_BASE}/destinations/africa-HERO.webp`,
  'middle-east': `${BLOB_BASE}/destinations/middle-east-HERO.webp`,
  'hawaii': `${BLOB_BASE}/destinations/hawaii-HERO.webp`,
  'transatlantic': `${BLOB_BASE}/destinations/transatlantic-HERO.webp`,
  'world-cruises': `${BLOB_BASE}/destinations/world-cruises-HERO.webp`,
};

// ============================================================================
// CRUISE LINE ASSETS
// Upload paths:
//   - cruise-lines/{id}-LOGO.webp (transparent)
//   - cruise-lines/{id}-HERO.webp (16:9)
//   - cruise-lines/{id}-CARD.webp (16:9)
// ============================================================================

export const CRUISE_LINE_LOGOS = {
  'royal-caribbean': `${BLOB_BASE}/cruise-lines/royal-caribbean-LOGO.webp`,
  'celebrity-cruises': `${BLOB_BASE}/cruise-lines/celebrity-cruises-LOGO.webp`,
  'norwegian-cruise-line': `${BLOB_BASE}/cruise-lines/norwegian-cruise-line-LOGO.webp`,
  'princess-cruises': `${BLOB_BASE}/cruise-lines/princess-cruises-LOGO.webp`,
  'carnival-cruise-line': `${BLOB_BASE}/cruise-lines/carnival-cruise-line-LOGO.webp`,
  'holland-america': `${BLOB_BASE}/cruise-lines/holland-america-LOGO.webp`,
  'msc-cruises': `${BLOB_BASE}/cruise-lines/msc-cruises-LOGO.webp`,
  'disney-cruise-line': `${BLOB_BASE}/cruise-lines/disney-cruise-line-LOGO.webp`,
  'cunard': `${BLOB_BASE}/cruise-lines/cunard-LOGO.webp`,
  'p-and-o-cruises': `${BLOB_BASE}/cruise-lines/p-and-o-cruises-LOGO.webp`,
  'viking-ocean': `${BLOB_BASE}/cruise-lines/viking-ocean-LOGO.webp`,
  'silversea': `${BLOB_BASE}/cruise-lines/silversea-LOGO.webp`,
  'regent-seven-seas': `${BLOB_BASE}/cruise-lines/regent-seven-seas-LOGO.webp`,
  'seabourn': `${BLOB_BASE}/cruise-lines/seabourn-LOGO.webp`,
  'oceania-cruises': `${BLOB_BASE}/cruise-lines/oceania-cruises-LOGO.webp`,
  'azamara': `${BLOB_BASE}/cruise-lines/azamara-LOGO.webp`,
  'windstar-cruises': `${BLOB_BASE}/cruise-lines/windstar-cruises-LOGO.webp`,
  'hurtigruten': `${BLOB_BASE}/cruise-lines/hurtigruten-LOGO.webp`,
  'virgin-voyages': `${BLOB_BASE}/cruise-lines/virgin-voyages-LOGO.webp`,
  'explora-journeys': `${BLOB_BASE}/cruise-lines/explora-journeys-LOGO.webp`,
};

export const CRUISE_LINE_HEROES = {
  'royal-caribbean': `${BLOB_BASE}/cruise-lines/royal-caribbean-HERO.webp`,
  'celebrity-cruises': `${BLOB_BASE}/cruise-lines/celebrity-cruises-HERO.webp`,
  'norwegian-cruise-line': `${BLOB_BASE}/cruise-lines/norwegian-cruise-line-HERO.webp`,
  'princess-cruises': `${BLOB_BASE}/cruise-lines/princess-cruises-HERO.webp`,
  'carnival-cruise-line': `${BLOB_BASE}/cruise-lines/carnival-cruise-line-HERO.webp`,
  'holland-america': `${BLOB_BASE}/cruise-lines/holland-america-HERO.webp`,
  'msc-cruises': `${BLOB_BASE}/cruise-lines/msc-cruises-HERO.webp`,
  'disney-cruise-line': `${BLOB_BASE}/cruise-lines/disney-cruise-line-HERO.webp`,
  'cunard': `${BLOB_BASE}/cruise-lines/cunard-HERO.webp`,
  'p-and-o-cruises': `${BLOB_BASE}/cruise-lines/p-and-o-cruises-HERO.webp`,
  'viking-ocean': `${BLOB_BASE}/cruise-lines/viking-ocean-HERO.webp`,
  'silversea': `${BLOB_BASE}/cruise-lines/silversea-HERO.webp`,
  'regent-seven-seas': `${BLOB_BASE}/cruise-lines/regent-seven-seas-HERO.webp`,
  'seabourn': `${BLOB_BASE}/cruise-lines/seabourn-HERO.webp`,
  'oceania-cruises': `${BLOB_BASE}/cruise-lines/oceania-cruises-HERO.webp`,
  'azamara': `${BLOB_BASE}/cruise-lines/azamara-HERO.webp`,
  'windstar-cruises': `${BLOB_BASE}/cruise-lines/windstar-cruises-HERO.webp`,
  'hurtigruten': `${BLOB_BASE}/cruise-lines/hurtigruten-HERO.webp`,
  'virgin-voyages': `${BLOB_BASE}/cruise-lines/virgin-voyages-HERO.webp`,
  'explora-journeys': `${BLOB_BASE}/cruise-lines/explora-journeys-HERO.webp`,
};

export const CRUISE_LINE_CARDS = {
  'royal-caribbean': `${BLOB_BASE}/cruise-lines/royal-caribbean-CARD.webp`,
  'celebrity-cruises': `${BLOB_BASE}/cruise-lines/celebrity-cruises-CARD.webp`,
  'norwegian-cruise-line': `${BLOB_BASE}/cruise-lines/norwegian-cruise-line-CARD.webp`,
  'princess-cruises': `${BLOB_BASE}/cruise-lines/princess-cruises-CARD.webp`,
  'carnival-cruise-line': `${BLOB_BASE}/cruise-lines/carnival-cruise-line-CARD.webp`,
  'holland-america': `${BLOB_BASE}/cruise-lines/holland-america-CARD.webp`,
  'msc-cruises': `${BLOB_BASE}/cruise-lines/msc-cruises-CARD.webp`,
  'disney-cruise-line': `${BLOB_BASE}/cruise-lines/disney-cruise-line-CARD.webp`,
  'cunard': `${BLOB_BASE}/cruise-lines/cunard-CARD.webp`,
  'p-and-o-cruises': `${BLOB_BASE}/cruise-lines/p-and-o-cruises-CARD.webp`,
  'viking-ocean': `${BLOB_BASE}/cruise-lines/viking-ocean-CARD.webp`,
  'silversea': `${BLOB_BASE}/cruise-lines/silversea-CARD.webp`,
  'regent-seven-seas': `${BLOB_BASE}/cruise-lines/regent-seven-seas-CARD.webp`,
  'seabourn': `${BLOB_BASE}/cruise-lines/seabourn-CARD.webp`,
  'oceania-cruises': `${BLOB_BASE}/cruise-lines/oceania-cruises-CARD.webp`,
  'azamara': `${BLOB_BASE}/cruise-lines/azamara-CARD.webp`,
  'windstar-cruises': `${BLOB_BASE}/cruise-lines/windstar-cruises-CARD.webp`,
  'hurtigruten': `${BLOB_BASE}/cruise-lines/hurtigruten-CARD.webp`,
  'virgin-voyages': `${BLOB_BASE}/cruise-lines/virgin-voyages-CARD.webp`,
  'explora-journeys': `${BLOB_BASE}/cruise-lines/explora-journeys-CARD.webp`,
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

