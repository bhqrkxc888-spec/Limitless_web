import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui';
import { getConsentStatus, setConsentStatus } from '../utils/consentManager';
import './CookieSettings.css';

function CookieSettings({ isOpen, onClose }) {
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    performance: false,
    functionality: false,
    marketing: false
  });

  useEffect(() => {
    if (isOpen) {
      // Load current preferences
      const currentStatus = getConsentStatus();
      if (currentStatus === 'accepted') {
        // If previously accepted, assume all non-essential were accepted
        setPreferences({
          essential: true,
          performance: true,
          functionality: true,
          marketing: true
        });
      } else if (currentStatus === 'rejected') {
        // If previously rejected, only essential
        setPreferences({
          essential: true,
          performance: false,
          functionality: false,
          marketing: false
        });
      }
    }
  }, [isOpen]);

  const handleToggle = (category) => {
    if (category === 'essential') return; // Essential cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    // If any non-essential cookies are accepted, set status to 'accepted'
    // Otherwise, set to 'rejected'
    const hasNonEssential = preferences.performance || preferences.functionality || preferences.marketing;
    const status = hasNonEssential ? 'accepted' : 'rejected';
    
    setConsentStatus(status, {
      cookieCategories: preferences,
      consentMethod: 'settings'
    });
    
    onClose();
    
    // Reload page to apply changes
    window.location.reload();
  };

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      performance: true,
      functionality: true,
      marketing: true
    });
    setConsentStatus('accepted', {
      cookieCategories: {
        essential: true,
        performance: true,
        functionality: true,
        marketing: true
      },
      consentMethod: 'settings'
    });
    onClose();
    window.location.reload();
  };

  const handleRejectAll = () => {
    setPreferences({
      essential: true,
      performance: false,
      functionality: false,
      marketing: false
    });
    setConsentStatus('rejected', {
      cookieCategories: {
        essential: true,
        performance: false,
        functionality: false,
        marketing: false
      },
      consentMethod: 'settings'
    });
    onClose();
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="cookie-settings-overlay" onClick={onClose}>
      <div className="cookie-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cookie-settings-header">
          <h2>Cookie Settings</h2>
          <button 
            className="cookie-settings-close" 
            onClick={onClose}
            aria-label="Close cookie settings"
          >
            ×
          </button>
        </div>

        <div className="cookie-settings-content">
          <p className="cookie-settings-intro">
            We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. 
            You can choose which types of cookies to accept. Essential cookies are required for the website to function properly.
          </p>

          <Link to="/cookie-policy" className="cookie-settings-link">
            Learn more about our cookie policy
          </Link>

          <div className="cookie-settings-categories">
            <div className="cookie-category">
              <div className="cookie-category-header">
                <div>
                  <h3>Essential Cookies</h3>
                  <p>Required for the website to function properly. These cannot be disabled.</p>
                </div>
                <label className="cookie-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences.essential} 
                    disabled
                    readOnly
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-category">
              <div className="cookie-category-header">
                <div>
                  <h3>Performance Cookies</h3>
                  <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
                </div>
                <label className="cookie-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences.performance}
                    onChange={() => handleToggle('performance')}
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-category">
              <div className="cookie-category-header">
                <div>
                  <h3>Functionality Cookies</h3>
                  <p>Remember your preferences and personalize your experience.</p>
                </div>
                <label className="cookie-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences.functionality}
                    onChange={() => handleToggle('functionality')}
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-category">
              <div className="cookie-category-header">
                <div>
                  <h3>Marketing Cookies</h3>
                  <p>Used to deliver relevant advertisements and track campaign effectiveness.</p>
                </div>
                <label className="cookie-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing}
                    onChange={() => handleToggle('marketing')}
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="cookie-settings-footer">
          <div className="cookie-settings-quick-actions">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRejectAll}
            >
              Reject All
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
          </div>
          <Button 
            variant="primary" 
            onClick={handleSave}
            className="cookie-settings-save"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieSettings;

