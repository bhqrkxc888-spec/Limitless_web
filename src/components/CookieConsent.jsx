import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui';
import { setConsentStatus, hasConsentDecision } from '../utils/consentManager';
import CookieSettings from './CookieSettings';
import './CookieConsent.css';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasConsentDecision()) {
      // Always render to prevent CLS, but show after a short delay for better UX
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    setConsentStatus('accepted');
    setIsVisible(false);
    // Scripts will load automatically via consent-aware loaders
  };

  const rejectCookies = () => {
    setConsentStatus('rejected');
    setIsVisible(false);
    // Scripts will remain blocked
  };

  // Always render if we should (user hasn't made a choice yet) to prevent CLS
  // Hide with CSS instead of returning null
  if (!shouldRender) return null;

  return (
    <div 
      className={`cookie-consent ${!isVisible ? 'cookie-consent--hidden' : ''}`}
      role="dialog" 
      aria-label="Cookie consent" 
      aria-live="polite"
      aria-hidden={!isVisible}
    >
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h3>We Use Cookies</h3>
          <p>
            We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. 
            By clicking "Accept All", you consent to our use of cookies. 
            <Link to="/cookie-policy"> Learn more about our cookie policy</Link>.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowCookieSettings(true)}
            className="cookie-consent-settings"
          >
            Cookie Settings
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={rejectCookies}
            className="cookie-consent-reject"
          >
            Reject
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={acceptCookies}
            className="cookie-consent-accept"
          >
            Accept All
          </Button>
        </div>
      </div>
      
      <CookieSettings 
        isOpen={showCookieSettings} 
        onClose={() => setShowCookieSettings(false)} 
      />
    </div>
  );
}

export default CookieConsent;

