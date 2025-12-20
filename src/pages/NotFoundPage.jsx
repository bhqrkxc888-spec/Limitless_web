import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SEO from '../components/SEO';
import { Button } from '../components/ui';
import { logError } from '../services/errorTracking';
import './NotFoundPage.css';

function NotFoundPage() {
  const location = useLocation();
  
  // Track 404 errors for monitoring
  useEffect(() => {
    logError(new Error('404 Page Not Found'), {
      errorType: 'navigation',
      severity: 'warning',
      context: {
        path: location.pathname,
        search: location.search,
        referrer: document.referrer
      }
    }).catch(() => {
      // Silently fail if tracking fails
    });
  }, [location.pathname, location.search]);
  
  return (
    <main className="not-found-page">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        noindex={true}
      />
      <div className="container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-heading">Page Not Found</h2>
          <p className="not-found-text">
            Sorry, we couldn't find the page you're looking for. 
            It may have been moved, deleted, or the URL might be incorrect.
          </p>
          <div className="not-found-actions">
            <Button to="/" variant="primary" size="lg">
              Return Home
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
          <div className="not-found-links">
            <h3>Popular Pages:</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/find-a-cruise">Find a Cruise</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;

