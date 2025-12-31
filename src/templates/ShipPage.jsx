import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import SEO from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import { hasConsent, loadScriptsWithConsent } from '../utils/consentManager';
import { logger } from '../utils/logger';
import './ShipPage.css';

/**
 * ShipPage Template
 * 
 * Dedicated page for individual cruise ships with Widgety widget integration.
 * Opens in new tab with close button functionality.
 */
function ShipPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  const [shipName, setShipName] = useState('');

  // Convert slug back to ship name for display
  useEffect(() => {
    if (slug) {
      // Convert slug (e.g., "resilient-lady") to ship name (e.g., "Resilient Lady")
      const name = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setShipName(name);
    }
  }, [slug]);

  // Load Widgety scripts
  useEffect(() => {
    const scripts = [
      'https://www.widgety.co.uk/assets/widgety_iframe-338e444fa45e2af836a1c162ed7b7fa3b57d6267f6e30c026f7d582a77e34dd7.js',
      'https://www.widgety.co.uk/assets/deep_linking_iframe-4355a96984c672f2dbc8ef1db67edcde1065f89371539db26a3483f3a6551479.js',
      'https://www.widgety.co.uk/assets/widgety_cruise_tour_search_navigation_script-e5c46a5521b82182ecdc1564d7f90c5cfb653f3ffed29c4220e85749607af1de.js'
    ];

    const loadWidgetyScripts = () => {
      if (!hasConsent()) {
        setShowConsentPrompt(true);
        return;
      }

      loadScriptsWithConsent(scripts, {
        attributes: { 'data-widgety': 'true', 'defer': 'true' }
      })
        .then((results) => {
          const success = results.some(result => result === true);
          if (success) {
            setScriptsLoaded(true);
            setShowConsentPrompt(false);
          }
        })
        .catch((error) => {
          logger.error('Error loading Widgety scripts:', error);
          setScriptsLoaded(true);
          setShowConsentPrompt(false);
        });
    };

    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(loadWidgetyScripts, { timeout: 2000 });
    } else {
      setTimeout(loadWidgetyScripts, 100);
    }
  }, []);

  // Generate Widgety iframe src URL for this ship
  // Try URL parameters in addition to iframe attributes
  // Widgety may support: preview-nav, results-nav, tabs, search, hide-buttons, etc.
  const widgetyIframeSrc = slug 
    ? `//www.widgety.co.uk/widgets/ugPj5zR1QMRisywLk13B/ships/${slug}.widget?preview-nav=false&results-nav=false&tabs=false&search=false&hide-buttons=true&navigation=false`
    : '//www.widgety.co.uk/widgets/ugPj5zR1QMRisywLk13B.widget?preview-nav=false&results-nav=false&tabs=false&search=false';

  // Close button handler - closes window/tab if opened in new tab, otherwise navigates back
  const handleClose = () => {
    // Check if opened in new window/tab
    if (window.opener || window.history.length <= 1) {
      // If opened in new tab, try to close it
      window.close();
      // Fallback: navigate to home if close fails (some browsers block window.close())
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          navigate('/');
        }
      }, 100);
    } else {
      // Navigate back if opened in same tab
      navigate(-1);
    }
  };

  // SEO data
  const seoTitle = shipName ? `${shipName} | Ship Information & Deck Plans` : 'Ship Information';
  const seoDescription = shipName 
    ? `Explore ${shipName} - view deck plans, staterooms, dining options, and itineraries. Book your cruise with Limitless Cruises.`
    : 'View detailed ship information, deck plans, and availability.';

  return (
    <main className="ship-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`https://www.limitlesscruises.com/ships/${slug}`}
      />

      {/* Header with Close Button */}
      <header className="ship-page-header">
        <div className="container">
          <div className="ship-page-header-content">
            <div className="ship-page-title">
              <h1>{shipName || 'Ship Information'}</h1>
              <p className="ship-page-subtitle">Deck Plans, Staterooms & Itineraries</p>
            </div>
            <button
              className="ship-page-close-btn"
              onClick={handleClose}
              aria-label="Close ship information page"
              title="Close (or press Escape)"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Widget Section */}
      <section className="ship-widget-section">
        <div className="container">
          {showConsentPrompt && !scriptsLoaded ? (
            <div className="widget-consent-prompt">
              <div className="widget-consent-content">
                <h3>Cookie Consent Required</h3>
                <p>
                  The ship information widget uses cookies to provide you with the best experience. 
                  Please accept cookies in the banner below to load the ship details.
                </p>
                <p className="widget-consent-note">
                  <small>This widget is provided by Widgety and may set cookies on their domain.</small>
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.dispatchEvent(new Event('show-cookie-consent'))}
                >
                  Review Cookie Settings
                </button>
              </div>
            </div>
          ) : scriptsLoaded ? (
            <div className="ship-widget-container">
              <iframe 
                className="widgety-cruise-tour-search" 
                frameBorder="0" 
                height="860" 
                preview-nav="false" 
                results-nav="false" 
                src={widgetyIframeSrc}
                tabs="false"
                search="false"
                hide-search="true"
                show-holiday-button="false"
                show-ship-button="false"
                hide-buttons="true"
                navigation="false"
                width="100%"
                title={`${shipName} - Ship Information`}
              />
            </div>
          ) : (
            <div className="widget-loading">
              <div className="loading-spinner" />
              <p>Loading ship information...</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="ship-page-footer">
        <div className="container">
          <div className="ship-page-cta">
            <h2>Ready to Book Your Cruise?</h2>
            <p>
              Speak with your dedicated cruise consultant for expert advice and exclusive pricing.
            </p>
            <div className="ship-page-cta-buttons">
              <a href={`tel:${siteConfig.phone}`} className="btn btn-primary">
                Call {siteConfig.phone}
              </a>
              <button onClick={handleClose} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShipPage;

