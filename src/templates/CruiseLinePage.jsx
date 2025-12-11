import { useParams } from 'react-router-dom';
import { getCruiseLineBySlug } from '../data/cruiseLines';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button } from '../components/ui';
import './CruiseLinePage.css';

function CruiseLinePage() {
  const { slug } = useParams();
  const cruiseLine = getCruiseLineBySlug(slug);

  // Handle cruise line not found
  if (!cruiseLine) {
    return (
      <main className="cruise-line-page">
        <SEO title="Cruise Line Not Found" />
        <div className="container section">
          <h1>Cruise Line Not Found</h1>
          <p>Sorry, we couldn't find the cruise line you're looking for.</p>
          <Button to="/cruise-lines">View All Cruise Lines</Button>
        </div>
      </main>
    );
  }

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: cruiseLine.name,
    description: cruiseLine.description,
    url: `https://new.limitlesscruises.com/cruise-lines/${cruiseLine.slug}`
  };

  return (
    <main className="cruise-line-page">
      {/* SEO */}
      <SEO
        title={cruiseLine.meta?.title || `${cruiseLine.name} Cruises`}
        description={cruiseLine.meta?.description || cruiseLine.description}
        canonical={`https://new.limitlesscruises.com/cruise-lines/${cruiseLine.slug}`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={cruiseLine.name}
        subtitle={cruiseLine.description}
        image={cruiseLine.image}
        imageAlt={`${cruiseLine.name} cruise ship`}
        size="md"
        align="left"
        primaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
        secondaryCta={{ label: 'Get a Quote', to: '/contact' }}
      />

      {/* Highlights Section */}
      <section className="section">
        <div className="container">
          <div className="cruise-line-grid">
            {/* Main Content */}
            <div className="cruise-line-main">
              <header className="section-header">
                <h2 className="section-header-title">Why Choose {cruiseLine.name}?</h2>
              </header>

              <div className="highlights-grid">
                {cruiseLine.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-card">
                    <div className="highlight-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="highlight-text">{highlight}</p>
                  </div>
                ))}
              </div>

              {/* Ships Section */}
              {cruiseLine.ships && cruiseLine.ships.length > 0 && (
                <div className="ships-section mt-12">
                  <h3 className="section-subtitle">The Fleet</h3>
                  <div className="ships-list">
                    {cruiseLine.ships.map((ship, index) => (
                      <span key={index} className="ship-badge">{ship}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Destinations Section */}
              {cruiseLine.destinations && cruiseLine.destinations.length > 0 && (
                <div className="destinations-section mt-12">
                  <h3 className="section-subtitle">Popular Destinations</h3>
                  <div className="destinations-list">
                    {cruiseLine.destinations.map((destination, index) => (
                      <span key={index} className="destination-tag">{destination}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="cruise-line-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Book Your {cruiseLine.shortName} Cruise</h3>
                <p className="sidebar-text">
                  Get expert advice and the best prices on {cruiseLine.name} cruises from your personal cruise consultant.
                </p>
                <div className="sidebar-cta">
                  <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
                    Call {siteConfig.phone}
                  </Button>
                  <Button to="/contact" variant="outline" fullWidth>
                    Request a Quote
                  </Button>
                </div>
              </div>

              {/* Suitable For */}
              {cruiseLine.suitableFor && cruiseLine.suitableFor.length > 0 && (
                <div className="sidebar-card">
                  <h3 className="sidebar-title">Perfect For</h3>
                  <ul className="suitable-list">
                    {cruiseLine.suitableFor.map((item, index) => (
                      <li key={index}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust Badges */}
              <div className="sidebar-card sidebar-trust">
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  <span>ABTA Protected</span>
                </div>
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span>Personal Service</span>
                </div>
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  <span>Price Match</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Book Your {cruiseLine.shortName} Cruise?</h2>
            <p>
              Speak with your personal cruise consultant today. We'll help you find the perfect {cruiseLine.name} cruise at the best price.
            </p>
            <div className="cta-buttons">
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
              <Button to="/find-a-cruise" variant="outline" size="lg" className="btn-outline-white">
                Search Cruises
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CruiseLinePage;
