import { useState } from 'react';
import { Button } from '../ui';
import { siteConfig } from '../../config/siteConfig';
import { SITE_ASSETS } from '../../config/assetUrls';
import './CruiseConsentGate.css';

const CONSENT_KEY = 'cruise_companion_consent_g606';
const CONSENT_DATE_KEY = 'cruise_companion_consent_g606_date';

export function hasConsent() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export function setConsent() {
  if (typeof window === 'undefined') return;
  const timestamp = new Date().toISOString();
  localStorage.setItem(CONSENT_KEY, 'accepted');
  localStorage.setItem(CONSENT_DATE_KEY, timestamp);
}

function CruiseConsentGate({ onConsent }) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const handleConsent = () => {
    if (ageConfirmed && disclaimerAccepted) {
      setConsent();
      onConsent();
    }
  };

  return (
    <div className="cruise-consent-gate">
      <div className="consent-gate-container">
        {/* Logo */}
        <div className="consent-gate-logo">
          <img 
            src={SITE_ASSETS.logo} 
            alt="Limitless Cruises" 
            width="80"
            height="80"
            onError={(e) => { 
              e.target.style.display = 'none';
              const logoDiv = e.target.parentElement;
              if (logoDiv && !logoDiv.querySelector('.logo-text')) {
                const textFallback = document.createElement('div');
                textFallback.className = 'logo-text';
                textFallback.textContent = 'Limitless Cruises';
                logoDiv.appendChild(textFallback);
              }
            }}
          />
        </div>

        {/* Header */}
        <div className="consent-gate-header">
          <h1>P&O IONA | G606</h1>
          <h2>CRUISE GUIDE</h2>
          <p className="cruise-title">Spain, Portugal & Canary Islands</p>
          <p className="cruise-dates">14-28 March 2026</p>
        </div>

        <hr className="consent-divider" />

        {/* Welcome Text */}
        <div className="consent-gate-welcome">
          <p>Welcome! This guide is packed with tips, port info, and recommendations for your cruise.</p>
          <p>Before you continue, please confirm:</p>
        </div>

        {/* Checkboxes */}
        <div className="consent-checkboxes">
          <label className="consent-checkbox">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => setAgeConfirmed(e.target.checked)}
            />
            <span>I am 18 years or older</span>
          </label>

          <label className="consent-checkbox">
            <input
              type="checkbox"
              checked={disclaimerAccepted}
              onChange={(e) => setDisclaimerAccepted(e.target.checked)}
            />
            <span>I understand this is a guide only and I will verify all information before relying on it</span>
          </label>
        </div>

        <hr className="consent-divider" />

        {/* Disclaimer */}
        <div className="consent-disclaimer">
          <h3>IMPORTANT NOTICE</h3>
          <div className="disclaimer-text">
            <p>
              This Cruise Guide is created by Limitless Cruises as a helpful resource for 
              passengers on P&O Iona sailing G606, 14-28 March 2026.
            </p>
            
            <p><strong>PLEASE READ CAREFULLY:</strong></p>
            
            <ul>
              <li>This guide is for general reference and planning purposes only</li>
              <li>Information is subject to change without notice</li>
              <li>Opening times, prices, and availability should be verified directly with venues, 
                  attractions, and P&O Cruises</li>
              <li>Accessibility information is based on research and may not reflect current provisions - 
                  always contact venues directly to confirm suitability for your specific needs</li>
              <li>Excursion details are indicative only - check the P&O app or speak to Reception 
                  onboard for current options and prices</li>
              <li>Restaurant and food recommendations are suggestions based on research - verify opening 
                  times and menus before visiting</li>
              <li>Weather information is indicative of seasonal averages and may not reflect actual conditions</li>
            </ul>
            
            <p>
              Limitless Cruises accepts no responsibility for any changes, inaccuracies, closures, 
              or any decisions made based on information in this guide.
            </p>
            
            <p>
              This guide is not affiliated with or endorsed by P&O Cruises. For official cruise 
              information, visit pocruises.com or contact P&O directly.
            </p>
            
            <p>
              By continuing, you confirm you are 18 years or older and accept these terms.
            </p>
          </div>
        </div>

        <hr className="consent-divider" />

        {/* Enter Button */}
        <div className="consent-gate-button">
          <Button
            onClick={handleConsent}
            disabled={!ageConfirmed || !disclaimerAccepted}
            fullWidth
            variant="primary"
            size="lg"
          >
            ENTER CRUISE GUIDE
          </Button>
          {(!ageConfirmed || !disclaimerAccepted) && (
            <p className="button-hint">Please check both boxes above to continue</p>
          )}
        </div>

        <hr className="consent-divider" />

        {/* Footer */}
        <div className="consent-gate-footer">
          <p>Made by Limitless Cruises</p>
          <p>Personal Cruise Consultants</p>
          <p>
            <a href={siteConfig.websiteUrl || 'https://www.limitlesscruises.com'} target="_blank" rel="noopener noreferrer">
              limitlesscruises.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CruiseConsentGate;
