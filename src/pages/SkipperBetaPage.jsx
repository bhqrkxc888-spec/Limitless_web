import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SkipperChat from '../components/skipper/SkipperChat';
import SkipperInfo from '../components/skipper/SkipperInfo';
import './SkipperBetaPage.css';

const VALID_KEYS = ['sk_test_2026', 'sk_demo_dane', 'sk_family_test'];

function SkipperBetaPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

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

  // Add ESC key listener to close Skipper
  useEffect(() => {
    if (!hasAccess) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [hasAccess, navigate]);

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
          <div className="beta-banner-left">
            <span className="beta-badge">⚠️ PRIVATE BETA</span>
            <span className="beta-text">Testing Only</span>
          </div>
          <div className="beta-banner-right">
            <button 
              onClick={() => setShowInfo(true)} 
              className="info-btn" 
              title="About The Skipper"
              aria-label="About The Skipper"
            >
              ?
            </button>
            <button onClick={() => navigate('/concierge')} className="switch-form-btn">
              📋 Switch to Form
            </button>
            <button onClick={() => navigate('/')} className="close-skipper-btn" title="Close and return to website">
              ✕ Close
            </button>
          </div>
        </div>
        <SkipperChat />
        <SkipperInfo isOpen={showInfo} onClose={() => setShowInfo(false)} />
      </div>
  );
}

export default SkipperBetaPage;
