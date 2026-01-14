/**
 * Asset URLs Configuration
 * All images are now stored in Supabase Storage and accessed via helper functions
 * Images uploaded via admin interface automatically work with these helpers
 */

// Helper function to get public URL from Supabase Storage
// Images uploaded via admin automatically follow this pattern
export function getSupabaseImageUrl(bucket, path) {
  const PROJECT_ID = 'xrbusklskmeaamwynfmm';
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${bucket}/${path}`;
}

export const SITE_ASSETS = {
  homeHero: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/hero.webp',
  homeHeroMobile: null, // Optional - upload via admin interface
  // OG Image for social sharing - using About2.webp as fallback
  // Note: For optimal social sharing, upload a 1200x630 og-image.webp via admin
  ogImage: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/categories/about/About2.webp',
  logo: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/logo.webp',
  favicon: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/favicon.webp',
};


// Helper to construct destination image URLs (automatically uses uploaded images)
// Upload path: WEB_destinations/{slug}/{type}.webp
export function getDestinationImageUrl(slug, type = 'hero') {
  return getSupabaseImageUrl('WEB_destinations', `${slug}/${type}.webp`);
}

// Helper to construct cruise line image URLs (automatically uses uploaded images)
// Upload path: WEB_cruise-lines/{slug}/{type}.webp
export function getCruiseLineImageUrl(slug, type = 'logo') {
  return getSupabaseImageUrl('WEB_cruise-lines', `${slug}/${type}.webp`);
}

// Helper to construct ship image URLs (automatically uses uploaded images)
// Upload path: WEB_cruise-lines/{cruiseLineSlug}/ships/{shipSlug}/{type}.webp
export function getShipImageUrl(cruiseLineSlug, shipSlug, type = 'hero') {
  return getSupabaseImageUrl('WEB_cruise-lines', `${cruiseLineSlug}/ships/${shipSlug}/${type}.webp`);
}

// Helper to construct category image URLs
export function getCategoryImageUrl(slug, type = 'card') {
  return getSupabaseImageUrl('WEB_categories', `${slug}/${type}.webp`);
}

// Helper to construct bucket list experience image URLs
// Note: Images are stored at WEB_categories/{slug}/{type}.webp (not bucket-list/{slug}/...)
export function getBucketListImageUrl(slug, type = 'hero') {
  return getSupabaseImageUrl('WEB_categories', `${slug}/${type}.webp`);
}

// Helper to construct page hero image URLs (for listing pages like /destinations, /cruise-types, /bucket-list)
// Upload path: WEB_page-heroes/{slug}/hero.webp
export function getPageHeroImageUrl(slug) {
  return getSupabaseImageUrl('WEB_page-heroes', `${slug}/hero.webp`);
}

// ============================================================================
// PLACEHOLDER IMAGE - Shown when no image exists
// ============================================================================
export const PLACEHOLDER_IMAGE = '/images/placeholders/hero.svg';

// ============================================================================
// IMAGE SPECS FOR SEO & PERFORMANCE
// ============================================================================
// Optimal images per entity type:
// 
// DESTINATIONS (for max SEO):
// - hero.webp (1920×1080) - Main page hero, required
// - card.webp (600×400) - Listing cards, required
// - gallery-1.webp, gallery-2.webp, gallery-3.webp (1200×800) - Optional gallery
// 
// CRUISE LINES:
// - logo.webp (400×200) - Logo, required
// - hero.webp (1920×1080) - Page hero, required
// - card.webp (600×400) - Listing cards, required
// 
// SHIPS:
// - hero.webp (1920×800) - Ship page hero
// - card.webp (600×400) - Listing card
// - exterior.webp, deck.webp, suite.webp, dining.webp, pool.webp (1920×1080) - Gallery
// ============================================================================

export default {
  SITE_ASSETS,
  PLACEHOLDER_IMAGE
};
