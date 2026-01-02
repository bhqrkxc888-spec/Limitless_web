import { useParams } from 'react-router-dom';
import { getDestinationBySlug } from '../data/destinations';
import { siteConfig } from '../config/siteConfig';
import SEO, { getBreadcrumbSchema } from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import { getOgImage } from '../utils/imageHelpers';
import { useDestinationImage } from '../hooks/useImageUrl';
import './DestinationPage.css';

// Weather carousel temporarily disabled - will reintroduce with improved port data
// import SeaConditions from '../components/SeaConditions';
// import PortsWeatherCarousel from '../components/PortsWeatherCarousel';

function DestinationPage() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);
  
  // Load hero image from database
  const { imageUrl: heroImage } = useDestinationImage(destination?.slug, 'hero', destination?.name);

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
  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    url: `https://www.limitlesscruises.com/destinations/${destination.slug}`
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.limitlesscruises.com/' },
    { name: 'Destinations', url: 'https://www.limitlesscruises.com/destinations' },
    { name: destination.name, url: `https://www.limitlesscruises.com/destinations/${destination.slug}` }
  ]);

  const structuredData = [destinationSchema, breadcrumbSchema];

  return (
    <main className="destination-page">
      {/* SEO */}
      <SEO
        title={destination.meta?.title || `${destination.name} Cruises`}
        description={destination.meta?.description || destination.description}
        canonical={`https://www.limitlesscruises.com/destinations/${destination.slug}`}
        image={getOgImage(heroImage)}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={`${destination.name} Cruises`}
        subtitle={destination.description}
        image={heroImage}
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{destination.bestTime}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="destination-sidebar">
              {/* Weather carousel temporarily disabled - will reintroduce with improved data */}
              
              <div className="sidebar-card">
                <h3>Book Your {destination.name} Cruise</h3>
                <p>
                  Get expert advice on {destination.name} cruises from your dedicated cruise consultant.
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

              {/* Popular Cruise Lines - Moved Down */}
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
    </main>
  );
}

export default DestinationPage;
