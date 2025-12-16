/**
 * Site Launch Configuration
 * Control which pages are accessible before full launch
 */

// Check if site is fully launched (defaults to false for coming soon mode)
const envSiteLaunched = import.meta.env.VITE_SITE_LAUNCHED === 'true';

// Check if user is authenticated for preview mode
// Uses sessionStorage (more secure, clears on browser close)
// Also checks for admin dashboard session
export const isPreviewAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false; // Server-side, no preview mode
  }
  
  // Check sessionStorage (legacy preview auth)
  if (sessionStorage.getItem('limitless_preview_authenticated') === 'true') {
    return true;
  }
  
  // Check for admin dashboard session (cookie-based)
  // If logged into admin, automatically have preview access
  if (document.cookie.includes('admin_session_active=true')) {
    return true;
  }
  
  return false;
};

// Check if user has admin session (logged into monitoring dashboard)
export const hasAdminSession = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return document.cookie.includes('admin_session_active=true');
};

// Site is launched if either env var is true OR user is preview authenticated
export const isSiteLaunched = () => {
  return envSiteLaunched || isPreviewAuthenticated();
};

// Clear preview authentication (useful for logout)
export const clearPreviewAuth = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('limitless_preview_authenticated');
  }
};

/**
 * Public routes - always accessible
 */
export const publicRoutes = [
  '/',
  '/find-a-cruise',
  '/contact',
  '/about',
  '/travel-news',
  '/offers',
  '/website-terms',
  '/privacy-policy',
  '/booking-terms',
  '/cookie-policy',
  '/price-match-guarantee'
];

/**
 * Protected routes - only accessible when site is launched
 */
export const protectedRoutes = [
  '/cruise-lines',
  '/cruise-lines/:slug',
  '/destinations',
  '/destinations/:slug',
  '/bucket-list',
  '/bucket-list/:slug',
  '/cruises/:slug'
];

/**
 * Check if a route is public (always accessible)
 */
export const isPublicRoute = (pathname) => {
  // Exact matches
  if (publicRoutes.includes(pathname)) {
    return true;
  }
  
  // Check for dynamic route matches
  return publicRoutes.some(route => {
    // Simple pattern matching for dynamic routes
    if (route.includes(':')) {
      const pattern = route.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    }
    return false;
  });
};

/**
 * Check if a route is protected (requires launch)
 */
export const isProtectedRoute = (pathname) => {
  // If site is launched, all routes are accessible
  if (isSiteLaunched()) {
    return false;
  }
  
  // Check if this is a protected route
  return protectedRoutes.some(route => {
    // Convert route pattern to regex
    const pattern = route.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });
};

