import { siteConfig } from '../config/siteConfig';
import { comingSoonConfig } from '../config/comingSoonConfig';
import SEO from '../components/SEO';
import ComingSoonCountdown from '../components/ComingSoonCountdown';
import ContactForm from '../components/ContactForm';
import { Button, SectionHeader } from '../components/ui';
import './HomePage.css';

function HomePage() {
  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.siteName,
    description: siteConfig.tagline,
    url: 'https://new.limitlesscruises.com',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    memberOf: {
      '@type': 'Organization',
      name: 'ABTA',
      identifier: 'P7541'
    }
  };

  return (
    <main className="home-page home-coming-soon">
      {/* SEO */}
      <SEO
        title="New Website Coming Soon - Cruise Holidays & Expert Advice"
        description="Limitless Cruises is upgrading our website. We remain fully open for cruise enquiries and bookings with preferential rates and expert advice."
        canonical="https://new.limitlesscruises.com"
        structuredData={structuredData}
      />

      {/* Coming Soon Intro */}
      <section className="section">
        <div className="container">
          <div className="coming-soon-intro">
            <h1 className="coming-soon-title">{comingSoonConfig.title}</h1>
            <p className="coming-soon-subtitle">{comingSoonConfig.subtitle}</p>
            <p className="coming-soon-message">{comingSoonConfig.message}</p>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                <span>ABTA Protected</span>
              </div>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                </svg>
                <span>Personal Service</span>
              </div>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      {comingSoonConfig.features.showCountdown && (
        <section className="section section-alt">
          <div className="container">
            <ComingSoonCountdown targetDate={comingSoonConfig.launchDate} />
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="section">
        <div className="container">
          <div className="quick-actions">
            <div className="quick-action-card">
              <div className="quick-action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h2>Find Your Perfect Cruise</h2>
              <p>Use our cruise finder to search sailings from all major cruise lines and get a personalised quote.</p>
              <Button to="/find-a-cruise" variant="primary" size="lg">
                Find a Cruise
              </Button>
            </div>

            <div className="quick-action-card">
              <div className="quick-action-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h2>Get Expert Advice</h2>
              <p>Speak with your personal cruise consultant for tailored recommendations and exclusive offers.</p>
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      {comingSoonConfig.features.showContactForm && (
        <section className="section section-alt" id="contact">
          <div className="container">
            <SectionHeader
              title="Get in Touch"
              subtitle="Send us your cruise enquiry and we'll respond within 24 hours with personalised recommendations and pricing."
              align="center"
            />

            <ContactForm context="home-coming-soon" />
          </div>
        </section>
      )}

      {/* TODO: Full home page content will be restored here after launch
          - Featured cruise lines grid
          - Why choose us section
          - Featured destinations
          - Cruise types/categories
          - Latest offers (from CRM)
      */}
    </main>
  );
}

export default HomePage;
