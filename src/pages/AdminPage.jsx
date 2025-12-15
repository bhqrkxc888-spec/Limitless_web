import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPreviewAuthenticated, hasAdminSession } from '../config/launchConfig';
import PreviewGate from '../components/PreviewGate';
import SEO from '../components/SEO';
import './AdminPage.css';

/**
 * Preview Access Page
 * Grants access to hidden/coming-soon pages
 * Auto-grants access if logged into admin dashboard
 */
function AdminPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [showGate, setShowGate] = useState(true);
  const [isFromAdmin, setIsFromAdmin] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    // If logged into admin dashboard, auto-grant preview access
    if (hasAdminSession()) {
      sessionStorage.setItem('limitless_preview_authenticated', 'true');
      setAuthenticated(true);
      setShowGate(false);
      setIsFromAdmin(true);
      window.dispatchEvent(new Event('preview-auth-change'));
    } else if (isPreviewAuthenticated()) {
      setAuthenticated(true);
      setShowGate(false);
    }
  }, []);

  // If already authenticated, show success message and redirect
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
    window.dispatchEvent(new Event('preview-auth-change'));
  };

  return (
    <main className="admin-page">
      <SEO
        title="Preview Access"
        description="Preview access for protected pages"
        noindex={true}
      />

      {showGate && !authenticated ? (
        // Show password gate only if not logged into admin
        <PreviewGate showGate={true} onSuccess={handleSuccess} />
      ) : authenticated ? (
        <div className="admin-success">
          <div className="admin-success-content">
            <div className="admin-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1>Preview Access Granted</h1>
            <p className="admin-success-message">
              {isFromAdmin 
                ? 'You have preview access via your admin session. Redirecting...'
                : 'You now have preview access to all protected pages. Redirecting you shortly...'}
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
            {isFromAdmin && (
              <p className="admin-back-link">
                <a href="/admin">← Back to Admin Dashboard</a>
              </p>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default AdminPage;

