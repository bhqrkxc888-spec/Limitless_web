import { useLocation } from 'react-router-dom';
import { isPublicRoute, isPreviewAuthenticated } from '../config/launchConfig';
import { Button } from './ui';
import './ProtectedRoute.css';

/**
 * ProtectedRoute Component
 * Redirects to /admin for password or shows coming soon message
 */
function ProtectedRoute({ children }) {
  const location = useLocation();
  const pathname = location.pathname;

  // If site is fully launched (env var), allow access - no password needed
  if (import.meta.env.VITE_SITE_LAUNCHED === 'true') {
    return children;
  }

  // If this is a public route, allow access
  if (isPublicRoute(pathname)) {
    return children;
  }

  // If already authenticated via admin page, allow access
  if (isPreviewAuthenticated()) {
    return children;
  }

  // Not authenticated - show coming soon with admin link
  return <ComingSoonMessage />;
}

/**
 * Coming Soon Message Component
 * Shown when protected routes are accessed without authentication
 */
function ComingSoonMessage() {
  return (
    <main className="coming-soon-page">
      <div className="container">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h1>Coming Soon</h1>
          <p className="coming-soon-message">
            This section of our website is currently being finalized. 
            We're working hard to bring you an exceptional experience.
          </p>
          <p className="coming-soon-submessage">
            In the meantime, you can explore our cruise finder, get in touch with us, 
            or learn more about us.
          </p>
          <div className="coming-soon-cta">
            <Button to="/find-a-cruise" variant="primary" size="lg">
              Find a Cruise
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
            <Button to="/" variant="secondary" size="lg">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}


export default ProtectedRoute;

