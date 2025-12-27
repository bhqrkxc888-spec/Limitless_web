/**
 * Asset Helpers
 * Automatically constructs image URLs from Supabase Storage based on entity slugs
 * 
 * Images uploaded via admin interface automatically work - no manual URL updates needed!
 * Upload path pattern: {bucket}/{entity-slug}/{image-type}.webp
 */

import {
  SITE_ASSETS,
  getDestinationImageUrl,
  getCruiseLineImageUrl,
  getShipImageUrl,
  getCategoryImageUrl,
  getBucketListImageUrl,
  PLACEHOLDER_IMAGE,
} from '../config/assetUrls';

// ============================================================================
// SITE ASSETS
// ============================================================================

export function getHomeHero() {
  return SITE_ASSETS.homeHero || PLACEHOLDER_IMAGE;
}

export function getOgImage() {
  return SITE_ASSETS.ogImage || PLACEHOLDER_IMAGE;
}

export function getSiteLogo() {
  return SITE_ASSETS.logo || PLACEHOLDER_IMAGE;
}

export function getFavicon() {
  return SITE_ASSETS.favicon || '/favicon.ico';
}

// ============================================================================
// DESTINATION ASSETS
// Automatically uses images uploaded to: WEB_destinations/{slug}/hero.webp
// ============================================================================

export function getDestinationHero(slug, fallback = PLACEHOLDER_IMAGE) {
  if (!slug) return fallback;
  // Automatically constructs URL from uploaded image path
  return getDestinationImageUrl(slug, 'hero');
}

export function getDestinationCard(slug, fallback = PLACEHOLDER_IMAGE) {
  if (!slug) return fallback;
  return getDestinationImageUrl(slug, 'card');
}

// ============================================================================
// CRUISE LINE ASSETS
// Automatically uses images uploaded to: WEB_cruise-lines/{slug}/{type}.webp
// ============================================================================

export function getCruiseLineLogo(slug, fallback = PLACEHOLDER_IMAGE) {
  if (!slug) return fallback;
  // Automatically constructs URL from uploaded image path
  return getCruiseLineImageUrl(slug, 'logo');
}

export function getCruiseLineHero(slug, fallback = PLACEHOLDER_IMAGE) {
  if (!slug) return fallback;
  return getCruiseLineImageUrl(slug, 'hero');
}

export function getCruiseLineCard(slug, fallback = PLACEHOLDER_IMAGE) {
  if (!slug) return fallback;
  return getCruiseLineImageUrl(slug, 'card');
}

// Legacy function name support (for backwards compatibility)
export function getCruiseLineLogoById(id, fallback = PLACEHOLDER_IMAGE) {
  return getCruiseLineLogo(id, fallback);
}

export function getCruiseLineHeroById(id, fallback = PLACEHOLDER_IMAGE) {
  return getCruiseLineHero(id, fallback);
}

export function getCruiseLineCardById(id, fallback = PLACEHOLDER_IMAGE) {
  return getCruiseLineCard(id, fallback);
}

// ============================================================================
// SHIP ASSETS
// Automatically uses images uploaded to: WEB_cruise-lines/{cruiseLineSlug}/ships/{shipSlug}/{type}.webp
// ============================================================================

export function getShipHero(cruiseLineSlug, shipSlug, fallback = PLACEHOLDER_IMAGE) {
  if (!cruiseLineSlug || !shipSlug) return fallback;
  return getShipImageUrl(cruiseLineSlug, shipSlug, 'hero');
}

export function getShipCard(cruiseLineSlug, shipSlug, fallback = PLACEHOLDER_IMAGE) {
  if (!cruiseLineSlug || !shipSlug) return fallback;
  return getShipImageUrl(cruiseLineSlug, shipSlug, 'card');
}

// Legacy function support (shipKey format: "cruiseLineSlug-ship-slug")
export function getShipHeroByKey(shipKey, fallback = PLACEHOLDER_IMAGE) {
  if (!shipKey) return fallback;
  const parts = shipKey.split('-');
  if (parts.length < 2) return fallback;
  // Simplified - assumes cruise line slug is first part
  // For full implementation, need to parse cruise line + ship slugs properly
  return fallback;
}

export function getShipCardByKey(shipKey, fallback = PLACEHOLDER_IMAGE) {
  return getShipHeroByKey(shipKey, fallback);
}

// ============================================================================
// CATEGORY ASSETS
// Automatically uses images uploaded to: WEB_categories/{slug}/card.webp
// ============================================================================

export function getCategoryCard(slug, fallback = PLACEHOLDER_IMAGE) {
  if (!slug) return fallback;
  return getCategoryImageUrl(slug, 'card');
}

export function getCategoryHero(slug, fallback = PLACEHOLDER_IMAGE) {
  if (!slug) return fallback;
  return getCategoryImageUrl(slug, 'hero');
}

// ============================================================================
// BUCKET LIST ASSETS
// Automatically uses images uploaded to: WEB_categories/bucket-list/{slug}/{type}.webp
// ============================================================================

export function getBucketListHero(id, fallback = PLACEHOLDER_IMAGE) {
  if (!id) return fallback;
  // Note: bucket-list uses 'id' as entityId in database, not slug
  return getBucketListImageUrl(id, 'hero');
}

export function getBucketListCard(id, fallback = PLACEHOLDER_IMAGE) {
  if (!id) return fallback;
  // Note: bucket-list uses 'id' as entityId in database, not slug
  return getBucketListImageUrl(id, 'card');
}

// ============================================================================
// DESTINATION GALLERY IMAGES (for SEO-rich content)
// Upload to: WEB_destinations/{slug}/gallery-1.webp, gallery-2.webp, etc.
// ============================================================================

export function getDestinationGallery(slug, count = 3) {
  if (!slug) return [];
  const gallery = [];
  for (let i = 1; i <= count; i++) {
    gallery.push(getDestinationImageUrl(slug, `gallery-${i}`));
  }
  return gallery;
}

// ============================================================================
// UTILITY
// ============================================================================

export { PLACEHOLDER_IMAGE };
