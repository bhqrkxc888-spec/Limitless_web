/**
 * Publish Status Configuration
 * 
 * Controls which sections of the site are published, in preview, or still in draft.
 * 
 * Status levels:
 * - 'published': Fully live, indexed by search engines, included in sitemap
 * - 'preview': Accessible with preview unlock, but noindex and excluded from sitemap
 * - 'draft': Shows "Coming Soon" message, noindex, excluded from sitemap
 * 
 * To publish a section:
 * 1. Change status from 'draft' to 'published'
 * 2. Rebuild with: npm run build:ssg
 * 3. Deploy
 * 
 * No code changes needed - just update this config file.
 */

export const PUBLISH_STATUS = {
  // Core pages (always published)
  home: 'published',
  about: 'published',
  contact: 'published',
  findACruise: 'published',
  
  // Content hubs
  offers: 'published',
  travelNews: 'published',
  cruiseGuides: 'draft',        // Not ready yet
  
  // Cruise content
  destinations: 'published',     // 16 destination pages
  cruiseLines: 'published',      // 16 cruise line pages
  cruiseTypes: 'published',      // 7 cruise type pages
  bucketList: 'published',       // 17 bucket list experiences
  
  // Support pages
  faq: 'published',
  testimonials: 'draft',         // Needs real testimonials
  
  // Legal pages (always published)
  legal: 'published',
  
  // Admin/internal (never indexed, always protected)
  admin: 'protected',
  preview: 'protected',
};

/**
 * Get publish status for a route
 * @param {string} path - Route path (e.g., '/destinations/caribbean-cruises')
 * @returns {string} Status: 'published' | 'preview' | 'draft' | 'protected'
 */
export function getPublishStatus(path) {
  // Normalize path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Admin and preview routes are always protected
  if (normalizedPath.startsWith('/admin') || normalizedPath.startsWith('/preview')) {
    return 'protected';
  }
  
  // Root/home
  if (normalizedPath === '/') {
    return PUBLISH_STATUS.home;
  }
  
  // Core pages
  if (normalizedPath === '/about') return PUBLISH_STATUS.about;
  if (normalizedPath === '/contact') return PUBLISH_STATUS.contact;
  if (normalizedPath === '/find-a-cruise') return PUBLISH_STATUS.findACruise;
  
  // Content hubs and their detail pages
  if (normalizedPath === '/offers' || normalizedPath.startsWith('/offers/')) {
    return PUBLISH_STATUS.offers;
  }
  if (normalizedPath === '/travel-news' || normalizedPath.startsWith('/travel-news/')) {
    // Category and tag archives are utility pages (noindex regardless of publish status)
    if (normalizedPath.includes('/category/') || normalizedPath.includes('/tag/')) {
      return 'utility'; // Special status for archives
    }
    return PUBLISH_STATUS.travelNews;
  }
  if (normalizedPath === '/cruise-guides' || normalizedPath.startsWith('/cruise-guides/')) {
    return PUBLISH_STATUS.cruiseGuides;
  }
  
  // Cruise content
  if (normalizedPath === '/destinations' || normalizedPath.startsWith('/destinations/')) {
    return PUBLISH_STATUS.destinations;
  }
  if (normalizedPath === '/cruise-lines' || normalizedPath.startsWith('/cruise-lines/')) {
    return PUBLISH_STATUS.cruiseLines;
  }
  if (normalizedPath === '/cruise-types' || normalizedPath.startsWith('/cruise-types/')) {
    return PUBLISH_STATUS.cruiseTypes;
  }
  if (normalizedPath.startsWith('/cruises/')) {
    // /cruises/:slug uses CategoryPage for cruise types
    return PUBLISH_STATUS.cruiseTypes;
  }
  if (normalizedPath === '/bucket-list' || normalizedPath.startsWith('/bucket-list/')) {
    return PUBLISH_STATUS.bucketList;
  }
  
  // Support pages
  if (normalizedPath === '/faq') return PUBLISH_STATUS.faq;
  if (normalizedPath === '/testimonials') return PUBLISH_STATUS.testimonials;
  
  // Legal pages (always published)
  if (['/privacy-policy', '/cookie-policy', '/booking-terms', '/website-terms', '/price-match-guarantee'].includes(normalizedPath)) {
    return PUBLISH_STATUS.legal;
  }
  
  // Default: draft (safer than published)
  return 'draft';
}

/**
 * Check if a route is published
 * @param {string} path - Route path
 * @returns {boolean} True if published
 */
export function isPublished(path) {
  return getPublishStatus(path) === 'published';
}

/**
 * Check if a route should be indexed
 * @param {string} path - Route path
 * @returns {boolean} True if should be indexed
 */
export function shouldIndex(path) {
  const status = getPublishStatus(path);
  // Only published pages should be indexed
  // Utility pages (archives) are never indexed
  return status === 'published';
}

/**
 * Check if a route should be in sitemap
 * @param {string} path - Route path
 * @returns {boolean} True if should be in sitemap
 */
export function shouldIncludeInSitemap(path) {
  const status = getPublishStatus(path);
  // Only published pages in sitemap
  // Exclude protected, draft, preview, and utility pages
  return status === 'published';
}

/**
 * Get all published routes for prerendering/sitemap
 * @returns {Array<string>} List of published route patterns
 */
export function getPublishedRoutes() {
  const routes = [];
  
  // Add routes based on publish status
  if (PUBLISH_STATUS.home === 'published') routes.push('/');
  if (PUBLISH_STATUS.about === 'published') routes.push('/about');
  if (PUBLISH_STATUS.contact === 'published') routes.push('/contact');
  if (PUBLISH_STATUS.findACruise === 'published') routes.push('/find-a-cruise');
  if (PUBLISH_STATUS.offers === 'published') routes.push('/offers');
  if (PUBLISH_STATUS.travelNews === 'published') routes.push('/travel-news');
  if (PUBLISH_STATUS.cruiseGuides === 'published') routes.push('/cruise-guides');
  if (PUBLISH_STATUS.destinations === 'published') routes.push('/destinations');
  if (PUBLISH_STATUS.cruiseLines === 'published') routes.push('/cruise-lines');
  if (PUBLISH_STATUS.cruiseTypes === 'published') routes.push('/cruise-types');
  if (PUBLISH_STATUS.bucketList === 'published') routes.push('/bucket-list');
  if (PUBLISH_STATUS.faq === 'published') routes.push('/faq');
  if (PUBLISH_STATUS.testimonials === 'published') routes.push('/testimonials');
  
  // Legal pages (always published)
  if (PUBLISH_STATUS.legal === 'published') {
    routes.push('/privacy-policy');
    routes.push('/cookie-policy');
    routes.push('/booking-terms');
    routes.push('/website-terms');
    routes.push('/price-match-guarantee');
  }
  
  return routes;
}

/**
 * Check if detail pages for a section should be included
 * @param {string} section - Section name (e.g., 'destinations')
 * @returns {boolean} True if detail pages should be included
 */
export function shouldIncludeDetailPages(section) {
  return PUBLISH_STATUS[section] === 'published';
}

export default {
  PUBLISH_STATUS,
  getPublishStatus,
  isPublished,
  shouldIndex,
  shouldIncludeInSitemap,
  getPublishedRoutes,
  shouldIncludeDetailPages,
};

