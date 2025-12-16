import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationBySlug } from '../data/destinations';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import SeaConditions from '../components/SeaConditions';
import PortAttractions from '../components/PortAttractions';
import PortsWeatherCarousel from '../components/PortsWeatherCarousel';
import { Button, SectionHeader } from '../components/ui';
import './DestinationPage.css';

function DestinationPage() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);
  // Initialize selectedPort with first port or destination coordinates to prevent layout shift
  const initialPort = destination?.coordinates?.ports?.[0] || (destination?.coordinates ? {
    name: destination.name,
    coordinates: {
      lat: destination.coordinates.lat,
      lon: destination.coordinates.lon
    }
  } : null);
  const [selectedPort, setSelectedPort] = useState(initialPort);

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
              {/* Ports Weather Carousel - Default to Mediterranean ports */}
              <PortsWeatherCarousel 
                ports={destination.coordinates?.ports && destination.coordinates.ports.length > 1 
                  ? destination.coordinates.ports 
                  : undefined}
                title={`${destination.name} Port Conditions`}
                onPortChange={setSelectedPort}
                selectedPort={selectedPort}
              />

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

          {/* Port Attractions Widget - Full Width Below Grid */}
          {destination.coordinates && (
            <div className="attractions-fullwidth">
              <PortAttractions 
                lat={selectedPort?.coordinates?.lat || destination.coordinates.lat} 
                lon={selectedPort?.coordinates?.lon || destination.coordinates.lon}
                destinationName={destination.name}
                portName={selectedPort?.name}
                regions={destination.regions}
                fullWidth
                availablePorts={destination.coordinates?.ports || []}
                selectedPortName={selectedPort?.name}
                onPortChange={setSelectedPort}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DestinationPage;
