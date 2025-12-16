/**
 * DevModeIndicator Component
 * Shows a small indicator when viewing protected/hidden pages
 * Only visible when authenticated via preview mode (not in production)
 */
import { useLocation } from 'react-router-dom';
import { isPreviewAuthenticated } from '../config/launchConfig';
import './DevModeIndicator.css';

// Protected routes that are hidden from public
const protectedRoutes = [
  '/cruise-lines',
  '/destinations',
  '/bucket-list',
  '/cruise-types',
  '/faq',
  '/testimonials'
];

function DevModeIndicator() {
  const location = useLocation();
  
  // Only show if user is preview authenticated (not when site is fully launched)
  const envLaunched = import.meta.env.VITE_SITE_LAUNCHED === 'true';
  if (envLaunched || !isPreviewAuthenticated()) {
    return null;
  }

  // Check if current route is protected
  const isProtectedPage = protectedRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(`${route}/`)
  );

  if (!isProtectedPage) {
    return null;
  }

  return (
    <div className="dev-mode-indicator">
      <div className="dev-mode-badge">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
        <span>Hidden Page</span>
      </div>
      <div className="dev-mode-tooltip">
        This page is hidden from the public navigation.<br/>
        Only visible to authenticated users.
      </div>
    </div>
  );
}

export default DevModeIndicator;

