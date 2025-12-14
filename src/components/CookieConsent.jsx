import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui';
import './CookieConsent.css';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
    // Optionally clear any existing cookies here if needed
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent" aria-live="polite">
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
    </div>
  );
}

export default CookieConsent;

