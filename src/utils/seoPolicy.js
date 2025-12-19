/**
 * Central SEO Policy - Single Source of Truth
 * 
 * Controls indexation decisions, canonical URL normalization, and sitemap inclusion.
 * Used by both the SEO component and sitemap generator.
 * 
 * Integrates with publishStatus.js to respect draft/preview/published states.
 */

import { siteConfig } from '../config/siteConfig';
import { getPublishStatus, shouldIndex as publishShouldIndex } from '../config/publishStatus';

// ============================================================================
// TRACKING PARAMETERS TO STRIP
// ============================================================================

const TRACKING_PARAMS = [
  // Campaign tracking
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  // Ad platform click IDs
  'gclid', 'fbclid', 'msclkid', 'dclid', 'twclid', 'li_fat_id',
  // Analytics
  '_ga', '_gl', '_gac',
  // Email marketing
  'mc_cid', 'mc_eid',
  // Generic
  'ref', 'source', 'affiliate',
  // Internal
  '_seo_scan', 'preview', 'debug'
];

// Filter/sort params that should not create separate indexable URLs
const FILTER_PARAMS = ['filter', 'sort', 'order', 'page', 'limit', 'offset'];

// ============================================================================
// NOINDEX PATTERNS
// ============================================================================

// Routes that should always be noindex (regex patterns)
const NOINDEX_PATTERNS = [
  /^\/travel-news\/category\/.*/,   // Category archives (thin content)
  /^\/travel-news\/tag\/.*/,        // Tag archives (thin content)
  /^\/admin(\/.*)?$/,               // All admin pages
  /^\/preview(\/.*)?$/,             // Preview pages
  /^\/search(\/.*)?$/,              // Search results (if added)
  /^\/account(\/.*)?$/,             // Account pages (if added)
  /^\/login(\/.*)?$/,               // Login pages (if added)
  /^\/register(\/.*)?$/,            // Register pages (if added)
  /^\/cart(\/.*)?$/,                // Cart pages (if added)
  /^\/checkout(\/.*)?$/,            // Checkout pages (if added)
];

// Query params that trigger noindex
const NOINDEX_QUERY_PARAMS = ['preview', 's', 'search', 'q'];

// ============================================================================
// ROBOTS.TXT BLOCKED PATHS
// ============================================================================

export const BLOCKED_PATHS = [
  '/admin/',
  '/api/',
  '/preview',
];

// ============================================================================
// URL NORMALIZATION
// ============================================================================

/**
 * Normalize a URL by stripping tracking params and applying canonical rules
 * @param {string} url - URL to normalize (can be full URL or path)
 * @returns {string} Normalized canonical URL
 */
export function normalizeUrl(url) {
  try {
    const baseUrl = siteConfig.siteUrl || 'https://limitlesscruises.com';
    const urlObj = new URL(url, baseUrl);
    
    // Strip tracking and filter params
    [...TRACKING_PARAMS, ...FILTER_PARAMS].forEach(param => {
      urlObj.searchParams.delete(param);
    });
    
    // Normalize pathname: remove trailing slash except for root
    let pathname = urlObj.pathname;
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    
    // Rebuild URL
    const search = urlObj.searchParams.toString();
    const queryString = search ? `?${search}` : '';
    
    return `${baseUrl}${pathname}${queryString}`;
  } catch {
    // If URL parsing fails, return as-is with base URL prepended
    const baseUrl = siteConfig.siteUrl || 'https://limitlesscruises.com';
    return url.startsWith('http') ? url : `${baseUrl}${url}`;
  }
}

/**
 * Get canonical URL for a path
 * @param {string} path - Page path (e.g., '/about' or '/travel-news/my-article')
 * @returns {string} Full canonical URL
 */
export function getCanonicalUrl(path) {
  if (!path) {
    return siteConfig.siteUrl || 'https://limitlesscruises.com';
  }
  
  // Handle full URLs
  if (path.startsWith('http')) {
    return normalizeUrl(path);
  }
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return normalizeUrl(normalizedPath);
}

// ============================================================================
// INDEXATION POLICY
// ============================================================================

/**
 * Determine if a path should be indexed
 * @param {string} path - Page path (without query string)
 * @param {URLSearchParams|null} searchParams - Query parameters
 * @returns {boolean} True if page should be indexed
 */
export function shouldIndex(path, searchParams = null) {
  // Normalize path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // FIRST: Check publish status - draft/preview pages are NEVER indexed
  if (!publishShouldIndex(normalizedPath)) {
    return false;
  }
  
  // Check against noindex patterns (utility pages)
  for (const pattern of NOINDEX_PATTERNS) {
    if (pattern.test(normalizedPath)) {
      return false;
    }
  }
  
  // Check for noindex query params
  if (searchParams) {
    for (const param of NOINDEX_QUERY_PARAMS) {
      if (searchParams.has(param)) {
        return false;
      }
    }
    
    // Check for pagination (noindex if page > 1)
    const page = searchParams.get('page');
    if (page && parseInt(page, 10) > 1) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get robots meta content for a path
 * @param {string} path - Page path
 * @param {URLSearchParams|null} searchParams - Query parameters
 * @returns {string} Robots meta content
 */
export function getRobotsMeta(path, searchParams = null) {
  return shouldIndex(path, searchParams) ? 'index, follow' : 'noindex, follow';
}

/**
 * Check if a path should be included in sitemap
 * @param {string} path - Page path
 * @returns {boolean} True if page should be in sitemap
 */
export function shouldIncludeInSitemap(path) {
  // Must be published (checked via shouldIndex which calls publishShouldIndex)
  if (!shouldIndex(path, null)) {
    return false;
  }
  
  // Must not be a blocked path
  for (const blocked of BLOCKED_PATHS) {
    if (path.startsWith(blocked.replace(/\/$/, ''))) {
      return false;
    }
  }
  
  return true;
}

// ============================================================================
// PAGE TYPES
// ============================================================================

export const PAGE_TYPES = {
  HOME: 'home',
  CORE: 'core',           // About, Contact, Find a Cruise
  HUB: 'hub',             // Destinations, Cruise Lines, etc.
  DETAIL: 'detail',       // Individual destination, cruise line
  ARTICLE: 'article',     // Blog posts, news articles
  LEGAL: 'legal',         // Privacy policy, terms
  UTILITY: 'utility',     // 404, archives (noindex)
};

/**
 * Get page type from path
 * @param {string} path - Page path
 * @returns {string} Page type constant
 */
export function getPageType(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  if (normalizedPath === '/') return PAGE_TYPES.HOME;
  
  // Core pages
  if (/^\/(about|contact|find-a-cruise)$/.test(normalizedPath)) {
    return PAGE_TYPES.CORE;
  }
  
  // Hub pages
  if (/^\/(destinations|cruise-lines|cruise-types|bucket-list|travel-news|cruise-guides|offers|faq|testimonials)$/.test(normalizedPath)) {
    return PAGE_TYPES.HUB;
  }
  
  // Article pages
  if (/^\/travel-news\/[^\/]+$/.test(normalizedPath) && 
      !normalizedPath.includes('/category/') && 
      !normalizedPath.includes('/tag/')) {
    return PAGE_TYPES.ARTICLE;
  }
  
  // Detail pages
  if (/^\/(destinations|cruise-lines|cruise-types|bucket-list|cruise-guides|offers)\/[^\/]+$/.test(normalizedPath)) {
    return PAGE_TYPES.DETAIL;
  }
  
  // Legal pages
  if (/^\/(privacy-policy|cookie-policy|website-terms|booking-terms|price-match-guarantee)$/.test(normalizedPath)) {
    return PAGE_TYPES.LEGAL;
  }
  
  // Utility pages (archives, admin, etc.)
  if (/^\/travel-news\/(category|tag)\//.test(normalizedPath) || 
      /^\/admin/.test(normalizedPath)) {
    return PAGE_TYPES.UTILITY;
  }
  
  return PAGE_TYPES.DETAIL;
}

// ============================================================================
// COMPLETE SEO POLICY HELPER
// ============================================================================

/**
 * Get complete SEO policy for a page
 * @param {string} path - Page path
 * @param {Object} options - Additional options
 * @returns {Object} Complete SEO policy
 */
export function getSEOPolicy(path, options = {}) {
  const searchParams = options.searchParams || null;
  const forceNoindex = options.noindex || false;
  
  const isIndexable = !forceNoindex && shouldIndex(path, searchParams);
  const pageType = getPageType(path);
  
  return {
    path,
    canonical: getCanonicalUrl(path),
    robots: isIndexable ? 'index, follow' : 'noindex, follow',
    shouldIndex: isIndexable,
    includeSitemap: isIndexable && shouldIncludeInSitemap(path),
    pageType,
  };
}

// ============================================================================
// ROUTE CLASSIFICATION (for documentation and validation)
// ============================================================================

export const ROUTE_CLASSIFICATION = {
  indexable: {
    static: [
      '/',
      '/about',
      '/contact',
      '/find-a-cruise',
      '/offers',
      '/travel-news',
      '/cruise-guides',
      '/destinations',
      '/cruise-lines',
      '/cruise-types',
      '/bucket-list',
      '/faq',
      '/testimonials',
      '/privacy-policy',
      '/cookie-policy',
      '/booking-terms',
      '/website-terms',
      '/price-match-guarantee',
    ],
    dynamic: [
      '/destinations/:slug',
      '/cruise-lines/:slug',
      '/cruises/:slug',         // CategoryPage (cruise types detail pages)
      '/bucket-list/:slug',
      '/travel-news/:slug',
      '/cruise-guides/:slug',
      '/offers/:slug',
    ],
  },
  noindex: [
    '/travel-news/category/:category',
    '/travel-news/tag/:tag',
    '/admin/*',
    '/preview',
    '/* (404)',
  ],
  blocked: [
    '/admin/',
    '/api/',
    '/preview',
  ],
};

export default {
  normalizeUrl,
  getCanonicalUrl,
  shouldIndex,
  getRobotsMeta,
  shouldIncludeInSitemap,
  getSEOPolicy,
  getPageType,
  PAGE_TYPES,
  ROUTE_CLASSIFICATION,
  BLOCKED_PATHS,
};

