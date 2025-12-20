import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import Breadcrumbs from '../components/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';
import { hasConsent, loadScriptsWithConsent } from '../utils/consentManager';
import { Button } from '../components/ui';
import './FindCruisePage.css';

function FindCruisePage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Find a Cruise', path: '/find-a-cruise' }
  ];
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);

  useEffect(() => {
    // Widgety scripts - only load if consent is given
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

      // Load scripts if consent is given
      loadScriptsWithConsent(scripts, {
        attributes: { 'data-widgety': 'true', 'defer': 'true' }
      })
        .then((results) => {
          // Check if at least one script loaded successfully
          const success = results.some(result => result === true);
          if (success) {
            setScriptsLoaded(true);
            setShowConsentPrompt(false);
          }
        })
        .catch((error) => {
          console.error('Error loading Widgety scripts:', error);
          // Still try to show the widget - it might work even if scripts partially loaded
          setScriptsLoaded(true);
          setShowConsentPrompt(false);
        });
    };

    // Defer Widgety scripts until page is interactive (prevents blocking render)
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => loadWidgetyScripts(), { timeout: 2000 });
    } else {
      setTimeout(loadWidgetyScripts, 1000);
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      if (hasConsent() && !scriptsLoaded) {
        loadWidgetyScripts();
      }
    };

    window.addEventListener('cookie-consent-changed', handleConsentChange);
    return () => {
      window.removeEventListener('cookie-consent-changed', handleConsentChange);
    };
  }, [scriptsLoaded]);

  return (
    <main className="find-cruise-elegant">
      <SEO
        title="Find Your Perfect Cruise | Bespoke Selection Service | Limitless Cruises"
        description="Discover your ideal cruise holiday with expert guidance. River cruises, ocean voyages, expedition adventures - all personally curated for you."
        canonical="https://www.limitlesscruises.com/find-a-cruise"
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero */}
      <section className="finder-hero">
        <div className="container">
          <h1>Find Your Perfect Cruise</h1>
          <p className="finder-hero-lead">
            Search cruises below or tell us what you're looking for and we'll find the best options with exclusive pricing. <a href="/about" className="inline-link">Learn more about our approach</a>.
          </p>
        </div>
      </section>

      {/* Widget Section */}
      <section className="finder-widget-section">
        <div className="container">
          <div className="finder-widget-intro">
            <p>
              <strong>This is not a live booking engine.</strong> We personally match your preferences with the best available 
              options and respond with tailored recommendations you won't find online.
            </p>
          </div>

          <div className="finder-widget-container">
            {showConsentPrompt && !scriptsLoaded ? (
              <div className="widget-consent-prompt">
                <div className="widget-consent-content">
                  <h3>Cookie Consent Required</h3>
                  <p>
                    The cruise search widget uses cookies to provide you with the best experience. 
                    Please accept cookies in the banner below to load the search widget.
                  </p>
                  <p className="widget-consent-note">
                    <small>This widget is provided by Widgety and may set cookies on their domain.</small>
                  </p>
                  <Button onClick={() => window.dispatchEvent(new Event('show-cookie-consent'))}>
                    Review Cookie Settings
                  </Button>
                </div>
              </div>
            ) : scriptsLoaded ? (
              <iframe 
                className="widgety-cruise-tour-search" 
                frameBorder="0" 
                height="600" 
                preview-nav="true" 
                results-nav="true" 
                src="//www.widgety.co.uk/widgets/ugPj5zR1QMRisywLk13B.widget"
                tabs="true" 
                width="100%"
                title="Cruise Search Widget"
              />
            ) : (
              <div className="widget-loading">
                <p>Loading cruise search widget...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="finder-contact-section">
        <div className="container">
          <div className="finder-contact-layout">
            <div className="finder-contact-info">
              <h2>Can't Find What You're Looking For?</h2>
              <p>
                Tell us your ideal cruise and we'll search all major cruise lines 
                to find the perfect match with exclusive pricing.
              </p>
              <div className="finder-quick-contact">
                <a href={`tel:${siteConfig.phone}`} className="finder-contact-link">
                  <span className="finder-contact-icon">📞</span>
                  <span>{siteConfig.phone}</span>
                </a>
                <a href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} target="_blank" rel="noopener noreferrer" className="finder-contact-link">
                  <span className="finder-contact-icon">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="finder-form-wrapper">
              <ContactForm context="find-a-cruise-elegant" />
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Lines */}
      <section className="finder-cruiselines">
        <div className="container">
          <h2>We Work With Leading Cruise Lines</h2>
          <p className="cruiselines-list">
            P&O Cruises, MSC Cruises, Royal Caribbean, Norwegian Cruise Line, Disney Cruise Line,
            Celebrity Cruises, Princess Cruises, Viking, Seabourn, Azamara, Cunard, Fred. Olsen, 
            Marella Cruises, Ambassador Cruise Line, Explora Journeys, and more.
          </p>

          <div className="finder-info-grid">
            <div className="finder-info-card">
              <h3>Popular Destinations</h3>
              <ul>
                <li>Mediterranean & Greek Isles</li>
                <li>Caribbean & Canary Islands</li>
                <li>Norwegian Fjords & Baltic</li>
                <li>Alaska & Canada</li>
                <li>Asia & Far East</li>
              </ul>
            </div>

            <div className="finder-info-card">
              <h3>Cruise Types</h3>
              <ul>
                <li>Family cruises with kids clubs</li>
                <li>Adults-only sailings</li>
                <li>Luxury & expedition cruises</li>
                <li>UK sailings (no-fly)</li>
                <li>World cruises & grand voyages</li>
              </ul>
            </div>

            <div className="finder-info-card">
              <h3>We Can Help With</h3>
              <ul>
                <li>School holiday dates</li>
                <li>Accessible cabins & support</li>
                <li>Pre/post cruise hotels</li>
                <li>Flight arrangements</li>
                <li>Special occasions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FindCruisePage;
