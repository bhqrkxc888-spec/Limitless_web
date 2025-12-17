/**
 * Asset Helpers
 * Helper functions to get asset URLs with Supabase fallback
 */

import { supabase } from '../lib/supabase';
import { logger } from './logger';

// Cache for asset lookups
const assetCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get asset URL from Supabase site_assets, with fallback
 * @param {string} assetType - Type of asset (destination_hero, cruise_line_logo, etc.)
 * @param {string} entityKey - Entity identifier (slug, id, etc.)
 * @param {string} fallbackUrl - Fallback URL if asset not found
 * @returns {Promise<string>} Asset URL
 */
export async function getAssetUrl(assetType, entityKey, fallbackUrl) {
  // Check cache first
  const cacheKey = `${assetType}-${entityKey || 'null'}`;
  const cached = assetCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.url;
  }

  // If no Supabase, return fallback immediately
  if (!supabase) {
    return fallbackUrl;
  }

  try {
    const { data, error } = await supabase
      .schema('web')
      .from('site_assets')
      .select('url')
      .eq('asset_type', assetType)
      .eq('entity_key', entityKey || null)
      .single();

    if (error) {
      // No asset found, use fallback
      if (error.code === 'PGRST116') {
        logger.info(`No asset found for ${assetType}/${entityKey}, using fallback`);
        return fallbackUrl;
      }
      throw error;
    }

    // Cache and return
    assetCache.set(cacheKey, { url: data.url, timestamp: Date.now() });
    return data.url;
  } catch (err) {
    logger.error(`Error fetching asset ${assetType}/${entityKey}:`, err);
    return fallbackUrl;
  }
}

/**
 * Get destination hero image
 * @param {string} slug - Destination slug
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getDestinationHero(slug, fallbackUrl) {
  return getAssetUrl('destination_hero', slug, fallbackUrl);
}

/**
 * Get cruise line logo
 * @param {string} cruiseLineId - Cruise line ID
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getCruiseLineLogo(cruiseLineId, fallbackUrl) {
  return getAssetUrl('cruise_line_logo', cruiseLineId, fallbackUrl);
}

/**
 * Get cruise line card image
 * @param {string} cruiseLineId - Cruise line ID
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getCruiseLineCard(cruiseLineId, fallbackUrl) {
  return getAssetUrl('cruise_line_card', cruiseLineId, fallbackUrl);
}

/**
 * Get cruise line hero image
 * @param {string} cruiseLineId - Cruise line ID
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getCruiseLineHero(cruiseLineId, fallbackUrl) {
  return getAssetUrl('cruise_line_hero', cruiseLineId, fallbackUrl);
}

/**
 * Get ship card image
 * @param {string} shipKey - Ship key (cruiseLineId-ship-name)
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getShipCard(shipKey, fallbackUrl) {
  return getAssetUrl('ship_card', shipKey, fallbackUrl);
}

/**
 * Get ship hero image
 * @param {string} shipKey - Ship key (cruiseLineId-ship-name)
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getShipHero(shipKey, fallbackUrl) {
  return getAssetUrl('ship_hero', shipKey, fallbackUrl);
}

/**
 * Get site logo
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getSiteLogo(fallbackUrl) {
  return getAssetUrl('site_logo', null, fallbackUrl);
}

/**
 * Get favicon
 * @param {string} fallbackUrl - Fallback URL
 * @returns {Promise<string>}
 */
export async function getFavicon(fallbackUrl) {
  return getAssetUrl('favicon', null, fallbackUrl);
}

/**
 * Clear asset cache (useful after uploads)
 */
export function clearAssetCache() {
  assetCache.clear();
}

/**
 * Pre-fetch multiple assets (for performance)
 * @param {Array<{assetType: string, entityKey: string, fallbackUrl: string}>} assets
 * @returns {Promise<void>}
 */
export async function prefetchAssets(assets) {
  if (!supabase) return;

  try {
    // Fetch all assets in parallel
    const promises = assets.map(async ({ assetType, entityKey, fallbackUrl }) => {
      try {
        const url = await getAssetUrl(assetType, entityKey, fallbackUrl);
        return { assetType, entityKey, url };
      } catch {
        return { assetType, entityKey, url: fallbackUrl };
      }
    });

    await Promise.all(promises);
  } catch (error) {
    logger.error('Error prefetching assets:', error);
  }
}

