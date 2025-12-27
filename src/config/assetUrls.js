/**
 * IMPORTANT: Update Asset URLs After Migration
 * 
 * After running the migration script (migrate-images-to-supabase.js),
 * you MUST update this file with the new Supabase Storage URLs.
 * 
 * Migration generates a report at: docs/MIGRATION_REPORT.md
 * Use that report to update the URLs below.
 * 
 * Format: https://[PROJECT_ID].supabase.co/storage/v1/object/public/[BUCKET]/[PATH]
 * 
 * TODO (POST-MIGRATION):
 * 1. Get your Supabase project ID from: https://supabase.com/dashboard/project/[PROJECT_ID]
 * 2. Replace [PROJECT_ID] below with your actual project ID
 * 3. Update each URL based on the migration report
 * 4. Test all pages to ensure images load correctly
 * 5. Remove this comment block after migration is complete
 */

// EXAMPLE (UPDATE THESE):
// Before migration (Vercel Blob):
// homeHero: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/site/HERO-home.webp'
//
// After migration (Supabase):
// homeHero: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/site/hero.webp'

export const SITE_ASSETS = {
  homeHero: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/site/HERO-home.webp', // TODO: Update after migration
  homeHeroMobile: null, // Optional - upload via admin interface
  ogImage: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/site/OG.webp', // TODO: Update after migration
  logo: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/logo.webp',
  favicon: 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/favicon.webp',
};

// Destination heroes - currently using old structure
// TODO: After migration, these will move to:
// https://[PROJECT].supabase.co/storage/v1/object/public/destinations/{slug}/hero.webp
export const DESTINATION_HEROES = {
  caribbean: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/caribbean-HERO.webp',
  mediterranean: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/destinations/mediterranean-HERO.webp',
  // ... add all 30 destinations
};

// Cruise line assets - currently using old structure
// TODO: After migration, these will move to:
// Logo: https://[PROJECT].supabase.co/storage/v1/object/public/cruise-lines/{slug}/logo.webp
// Hero: https://[PROJECT].supabase.co/storage/v1/object/public/cruise-lines/{slug}/hero.webp
// Card: https://[PROJECT].supabase.co/storage/v1/object/public/cruise-lines/{slug}/card.webp
export const CRUISE_LINE_LOGOS = {
  'royal-caribbean': 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/cruise-lines/logos/royal-caribbean.webp',
  // ... add all 57 cruise lines
};

export const CRUISE_LINE_HEROES = {
  'royal-caribbean': 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/cruise-lines/heroes/royal-caribbean-HERO.webp',
  // ... add all 57 cruise lines
};

export const CRUISE_LINE_CARDS = {
  'royal-caribbean': 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/cruise-lines/cards/royal-caribbean-CARD.webp',
  // ... add all 57 cruise lines
};

// Helper function to get public URL from Supabase
// Use this after migration is complete
export function getSupabaseImageUrl(bucket, path) {
  const PROJECT_ID = 'YOUR_PROJECT_ID'; // TODO: Replace with actual project ID
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${bucket}/${path}`;
}

// Helper to construct destination URLs after migration
export function getDestinationImageUrl(slug, type = 'hero') {
  return getSupabaseImageUrl('WEB_destinations', `${slug}/${type}.webp`);
}

// Helper to construct cruise line URLs after migration
export function getCruiseLineImageUrl(slug, type = 'logo') {
  return getSupabaseImageUrl('WEB_cruise-lines', `${slug}/${type}.webp`);
}

// Helper to construct ship URLs after migration
export function getShipImageUrl(cruiseLineSlug, shipSlug, type = 'hero') {
  return getSupabaseImageUrl('WEB_cruise-lines', `${cruiseLineSlug}/ships/${shipSlug}/${type}.webp`);
}

// TODO: Remove after migration and validation
export default {
  SITE_ASSETS,
  DESTINATION_HEROES,
  CRUISE_LINE_LOGOS,
  CRUISE_LINE_HEROES,
  CRUISE_LINE_CARDS
};
