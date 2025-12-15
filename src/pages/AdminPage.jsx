import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPreviewAuthenticated } from '../config/launchConfig';
import PreviewGate from '../components/PreviewGate';
import SEO from '../components/SEO';
import './AdminPage.css';

/**
 * Admin Page
 * Password-protected entry point for preview access
 * Once authenticated, user can access all protected routes
 */
function AdminPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(isPreviewAuthenticated());
  const [showGate, setShowGate] = useState(!authenticated);

  // If already authenticated, show success message
  useEffect(() => {
    if (authenticated) {
      // Auto-redirect after a moment, or they can click button
      const timer = setTimeout(() => {
        navigate('/cruise-lines');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authenticated, navigate]);

  const handleSuccess = () => {
    setAuthenticated(true);
    setShowGate(false);
    // Trigger storage event to update navigation in Header/Footer
    // (Note: storage event only fires in other tabs, so we'll use a small delay + reload)
    // Actually, since we're reloading the page anyway, the navigation will update
    // But let's trigger a custom event for same-window updates
    window.dispatchEvent(new Event('preview-auth-change'));
  };

  return (
    <main className="admin-page">
      <SEO
        title="Admin Access"
        description="Preview access for protected pages"
        noindex={true}
      />

      {showGate && !authenticated ? (
        <PreviewGate showGate={true} onSuccess={handleSuccess} />
      ) : authenticated ? (
        <div className="admin-success">
          <div className="admin-success-content">
            <div className="admin-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1>Access Granted</h1>
            <p className="admin-success-message">
              You now have preview access to all protected pages. Redirecting you shortly...
            </p>
            <div className="admin-success-actions">
              <button
                onClick={() => navigate('/cruise-lines')}
                className="btn btn-primary"
              >
                View Cruise Lines
              </button>
              <button
                onClick={() => navigate('/destinations')}
                className="btn btn-outline"
              >
                View Destinations
              </button>
              <button
                onClick={() => navigate('/bucket-list')}
                className="btn btn-outline"
              >
                View Bucket List
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default AdminPage;

