import { useParams } from 'react-router-dom';
import { getDestinationBySlug } from '../data/destinations';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import './DestinationPage.css';

function DestinationPage() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);

  // Handle destination not found
  if (!destination) {
    return (
      <main className="destination-page">
        <SEO title="Destination Not Found" />
        <div className="container section">
          <h1>Destination Not Found</h1>
          <p>Sorry, we couldn't find the destination you're looking for.</p>
          <Button to="/">Return Home</Button>
        </div>
      </main>
    );
  }

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    url: `https://limitlesscruises.com/destinations/${destination.slug}`
  };

  return (
    <main className="destination-page">
      {/* SEO */}
      <SEO
        title={destination.meta?.title || `${destination.name} Cruises`}
        description={destination.meta?.description || destination.description}
        canonical={`https://limitlesscruises.com/destinations/${destination.slug}`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={`${destination.name} Cruises`}
        subtitle={destination.description}
        image={destination.image}
        imageAlt={`${destination.name} cruise destination`}
        size="md"
        align="left"
        primaryCta={{ label: 'Search Cruises', to: '/find-a-cruise' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Highlights Section */}
      <section className="section">
        <div className="container">
          <div className="destination-grid">
            {/* Main Content */}
            <div className="destination-main">
              <SectionHeader
                title={`Why Visit the ${destination.name}?`}
              />

              <div className="highlights-list">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <div className="highlight-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>

              {/* Regions */}
              {destination.regions && destination.regions.length > 0 && (
                <div className="regions-section mt-12">
                  <h3>Regions to Explore</h3>
                  <div className="regions-list">
                    {destination.regions.map((region, index) => (
                      <span key={index} className="region-tag">{region}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Best Time to Visit */}
              {destination.bestTime && (
                <div className="best-time-section mt-12">
                  <h3>Best Time to Cruise</h3>
                  <div className="best-time-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <span>{destination.bestTime}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="destination-sidebar">
              <div className="sidebar-card">
                <h3>Book Your {destination.name} Cruise</h3>
                <p>
                  Get expert advice on {destination.name} cruises from your personal cruise consultant.
                </p>
                <div className="sidebar-cta">
                  <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
                    Call {siteConfig.phone}
                  </Button>
                  <Button to="/find-a-cruise" variant="outline" fullWidth>
                    Search Cruises
                  </Button>
                </div>
              </div>

              {/* Popular Cruise Lines */}
              {destination.cruiseLines && destination.cruiseLines.length > 0 && (
                <div className="sidebar-card">
                  <h3>Popular Cruise Lines</h3>
                  <ul className="cruise-lines-list">
                    {destination.cruiseLines.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Explore the {destination.name}?</h2>
          <p>
            Speak with your personal cruise consultant today for expert advice and the best prices.
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
      </section>
    </main>
  );
}

export default DestinationPage;
