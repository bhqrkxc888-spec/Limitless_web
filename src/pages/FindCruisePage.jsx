import { useEffect } from 'react';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import { SectionHeader } from '../components/ui';
import './FindCruisePage.css';

function FindCruisePage() {
  useEffect(() => {
    // Load Widgety scripts
    const scripts = [
      'https://www.widgety.co.uk/assets/widgety_iframe-338e444fa45e2af836a1c162ed7b7fa3b57d6267f6e30c026f7d582a77e34dd7.js',
      'https://www.widgety.co.uk/assets/deep_linking_iframe-4355a96984c672f2dbc8ef1db67edcde1065f89371539db26a3483f3a6551479.js',
      'https://www.widgety.co.uk/assets/widgety_cruise_tour_search_navigation_script-e5c46a5521b82182ecdc1564d7f90c5cfb653f3ffed29c4220e85749607af1de.js'
    ];

    const loadedScripts = scripts.map(src => {
      const script = document.createElement('script');
      script.src = src;
      script.setAttribute('data-widgety', 'true');
      script.async = true;
      document.body.appendChild(script);
      return script;
    });

    // Cleanup function
    return () => {
      loadedScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <main className="find-cruise-page" role="region" aria-label="Find your perfect cruise">
      <SEO
        title="Find Your Perfect Cruise - Search & Enquire"
        description="Search for your ideal cruise holiday with expert help from Limitless Cruises. We'll find and match the best options for you."
        canonical="https://new.limitlesscruises.com/find-a-cruise"
      />

      {/* Header */}
      <div className="finder-header">
        <div className="container">
          <h1>Find Your Perfect Cruise</h1>
        </div>
      </div>

      <div className="container">
        <div className="finder-content">
          {/* Intro */}
          <div className="finder-intro">
            <p className="finder-lead">
              <strong>Limitless Cruises is your independent cruise specialist.</strong> We work with all major cruise lines
              to find the perfect sailing for you, whether you're looking for a family getaway, adults-only escape, or luxury voyage.
            </p>
            <p>
              This is <strong>not a live booking engine</strong>. We personally match your preferences with the best available options
              and respond with tailored recommendations and pricing you won't find online.
            </p>
          </div>

          {/* Widgety Cruise Finder Widget */}
          <div className="finder-widget-container">
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
          </div>

          {/* Contact Form */}
          <section className="finder-enquiry-section">
            <SectionHeader
              title="Tell Us What You're Looking For"
              subtitle="Share your ideal cruise details and we'll find the best matches with exclusive pricing."
              align="center"
            />

            <ContactForm context="find-a-cruise" />
          </section>

          {/* Help Section */}
          <section className="finder-help">
            <h2>We Work With Leading Cruise Lines</h2>
            <p className="finder-help-intro">
              Including P&O Cruises, MSC Cruises, Royal Caribbean, Norwegian Cruise Line, Disney Cruise Line,
              Celebrity Cruises, Princess Cruises, Viking, Seabourn, Azamara, Cunard, Fred. Olsen, Marella Cruises,
              Ambassador Cruise Line, Explora Journeys, and more.
            </p>

            <div className="finder-help-grid">
              <div className="help-card">
                <h3>Popular Destinations</h3>
                <ul>
                  <li>Mediterranean & Greek Isles</li>
                  <li>Caribbean & Canary Islands</li>
                  <li>Norwegian Fjords & Baltic</li>
                  <li>Alaska & Canada</li>
                  <li>Asia & Far East</li>
                  <li>Antarctica & Arctic</li>
                </ul>
              </div>

              <div className="help-card">
                <h3>Cruise Types</h3>
                <ul>
                  <li>Family cruises with kids clubs</li>
                  <li>Adults-only sailings</li>
                  <li>Luxury & expedition cruises</li>
                  <li>UK sailings (no-fly)</li>
                  <li>World cruises & grand voyages</li>
                  <li>Themed sailings & events</li>
                </ul>
              </div>

              <div className="help-card">
                <h3>We Can Help With</h3>
                <ul>
                  <li>School holiday dates</li>
                  <li>Accessible cabins & support</li>
                  <li>Pre/post cruise hotels</li>
                  <li>Flight arrangements</li>
                  <li>Special occasions</li>
                  <li>Group bookings</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default FindCruisePage;
