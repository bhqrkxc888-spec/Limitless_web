import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SkipperChat from '../components/skipper/SkipperChat';
import './SkipperBetaPage.css';

const VALID_KEYS = ['sk_test_2026', 'sk_demo_dane', 'sk_family_test'];

function SkipperBetaPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Prevent body scroll when Skipper is open
    document.body.style.overflow = 'hidden';
    
    // Set page title and meta tags
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex';

    // Check for stored key in sessionStorage
    const storedKey = sessionStorage.getItem('skipper_access_key');
    if (storedKey && VALID_KEYS.includes(storedKey)) {
      document.title = 'The Skipper - AI Travel Advisor (Beta)';
      setHasAccess(true);
      setIsChecking(false);
      return;
    }

    // Check for key in URL
    const urlKey = searchParams.get('key');
    if (urlKey && VALID_KEYS.includes(urlKey)) {
      sessionStorage.setItem('skipper_access_key', urlKey);
      document.title = 'The Skipper - AI Travel Advisor (Beta)';
      setHasAccess(true);
      setIsChecking(false);
      return;
    }

    // No valid key found
    document.title = 'Access Required - The Skipper Beta';
    setHasAccess(false);
    setIsChecking(false);

    // Cleanup: restore body scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchParams]);

  if (isChecking) {
    return (
      <div className="skipper-beta-page">
        <div className="access-checking">
          <div className="spinner"></div>
          <p>Checking access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="skipper-beta-page">
          <div className="access-denied">
            <div className="access-denied-content">
              <h1>🔒 Access Required</h1>
              <p>This is a private beta. You need a valid access key to continue.</p>
              <p>If you have an access key, add it to the URL:</p>
              <code>/skipper-beta?key=YOUR_KEY</code>
              <button onClick={() => navigate('/concierge')} className="btn-primary">
                Use Package Concierge Form Instead
              </button>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="skipper-beta-page">
        <div className="beta-banner">
          <span>⚠️ PRIVATE BETA - Testing Only</span>
          <button onClick={() => navigate('/concierge')} className="switch-form-btn">
            Switch to Form
          </button>
        </div>
        <SkipperChat />
      </div>
  );
}

export default SkipperBetaPage;
