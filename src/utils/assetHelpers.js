/**
 * Asset Helpers
 * Simple helper functions to get hardcoded asset URLs
 * 
 * All URLs are defined in src/config/assetUrls.js
 * To update images: Upload to Vercel Blob, update URL in config, deploy.
 */

import {
  SITE_ASSETS,
  DESTINATION_HEROES,
  CRUISE_LINE_LOGOS,
  CRUISE_LINE_HEROES,
  CRUISE_LINE_CARDS,
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
// ============================================================================

export function getDestinationHero(slug, fallback = PLACEHOLDER_IMAGE) {
  return DESTINATION_HEROES[slug] || fallback;
}

// ============================================================================
// CRUISE LINE ASSETS
// ============================================================================

export function getCruiseLineLogo(id, fallback = PLACEHOLDER_IMAGE) {
  return CRUISE_LINE_LOGOS[id] || fallback;
}

export function getCruiseLineHero(id, fallback = PLACEHOLDER_IMAGE) {
  return CRUISE_LINE_HEROES[id] || fallback;
}

export function getCruiseLineCard(id, fallback = PLACEHOLDER_IMAGE) {
  return CRUISE_LINE_CARDS[id] || fallback;
}

// ============================================================================
// SHIP ASSETS (ships use cruise line images for now)
// ============================================================================

export function getShipHero(shipKey, fallback = PLACEHOLDER_IMAGE) {
  // Ship key format: cruiseLineId-ship-name
  // For now, fall back to cruise line hero
  const cruiseLineId = shipKey?.split('-')[0];
  return CRUISE_LINE_HEROES[cruiseLineId] || fallback;
}

export function getShipCard(shipKey, fallback = PLACEHOLDER_IMAGE) {
  const cruiseLineId = shipKey?.split('-')[0];
  return CRUISE_LINE_CARDS[cruiseLineId] || fallback;
}

// ============================================================================
// UTILITY
// ============================================================================

export { PLACEHOLDER_IMAGE };
