import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import { SectionHeader } from '../components/ui';
import './FindCruisePage.css';

function FindCruisePage() {
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
              to find the perfect sailing for you—whether you're looking for a family getaway, adults-only escape, or luxury voyage.
            </p>
            <p>
              This is <strong>not a live booking engine</strong>. We personally match your preferences with the best available options
              and respond with tailored recommendations and pricing you won't find online.
            </p>
          </div>

          {/* TODO: Future cruise finder widget/API integration will go here */}
          <div className="finder-widget-placeholder">
            <div className="placeholder-content">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
              <h3>Cruise Search Widget Coming Soon</h3>
              <p>
                Our new search interface is being developed. For now, use the form below to tell us what you're looking for
                and we'll do the searching for you.
              </p>
            </div>
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
