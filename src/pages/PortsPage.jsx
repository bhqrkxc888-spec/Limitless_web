import { getAllRegions, getPortsByRegion, getPortsCountByRegion } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, Card, SectionHeader } from '../components/ui';
import { Link } from 'react-router-dom';
import { usePortGuideImage } from '../hooks/useImageUrl';
import './PortsPage.css';

/**
 * Port Card with Database Image
 */
function PortCardWithImage({ port }) {
  const { imageUrl: portImage } = usePortGuideImage(port.slug, 'card');
  
  return (
    <Card 
      to={`/ports/${port.slug}`} 
      variant="default"
      className="port-card"
    >
      <Card.Image 
        src={portImage}
        alt={`${port.name} cruise port`}
        aspectRatio="3/2"
      />
      <Card.Content>
        <div className="port-card-header">
          <Card.Title as="h3">{port.name}</Card.Title>
          <span className="port-card-subtitle">{port.country}</span>
        </div>
        <Card.Description>{port.tagline}</Card.Description>
        <div className="port-card-button-wrapper">
          <span className="btn btn-outline btn-sm port-card-button">
            View Port Guide →
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}

/**
 * Ports Hub Page
 * Lists all port regions and featured ports
 */
function PortsPage() {
  const regions = getAllRegions();

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Port Guides',
    description: 'Comprehensive guides to cruise ports around the world',
    itemListElement: regions.map((region, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Place',
        name: region.name,
        url: `https://www.limitlesscruises.com/ports/region/${region.slug}`,
      },
    })),
  };

  return (
    <main className="ports-page">
      {/* SEO */}
      <SEO
        title="Cruise Port Guides | Things to Do & Shore Excursions"
        description="Comprehensive cruise port guides with things to do, shore excursions, food recommendations, and insider tips. Plan your perfect port day."
        canonical="https://www.limitlesscruises.com/ports"
        structuredData={structuredData}
      />

      {/* Hero Section - No hero requirement */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1>Cruise Port Guides</h1>
            <p className="page-header-subtitle">Everything you need to know for your port days</p>
            <div className="page-header-actions">
              <Button to="/find-a-cruise" variant="primary">Find a Cruise</Button>
              <Button href={`tel:${siteConfig.phone}`} variant="outline">Call {siteConfig.phone}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
        <div className="container">
          <div className="ports-intro text-center">
            <h2>Plan Your Perfect Port Day</h2>
            <p className="lead">
              Our comprehensive port guides help you make the most of your time ashore. 
              Find things to do, shore excursions, restaurants, and insider tips 
              from experienced cruisers.
            </p>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            title="Browse by Region"
            subtitle="Select a region to explore its cruise ports"
            align="center"
          />

          <div className="regions-grid">
            {regions.map((region) => {
              const portCount = getPortsCountByRegion(region.id);
              
              return (
                <Link
                  key={region.id}
                  to={`/ports/region/${region.slug}`}
                  className="region-link-card"
                >
                  <div className="region-card-content">
                    <h3>{region.name}</h3>
                    <p>{region.description}</p>
                    <div className="region-meta">
                      <span className="port-count">{portCount} port{portCount !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Ports by Region */}
      {regions.map((region) => {
        const ports = getPortsByRegion(region.id);
        if (ports.length === 0) return null;

        return (
          <section key={region.id} className="section">
            <div className="container">
              <div className="region-section-header">
                <SectionHeader
                  title={`${region.name} Ports`}
                  subtitle={`Popular cruise ports in ${region.name}`}
                  align="center"
                />
              </div>

              <div className="ports-grid">
                {ports.slice(0, 3).map((port) => (
                  <PortCardWithImage key={port.id} port={port} />
                ))}
              </div>
              
              <div className="view-all-container">
                <Link to={`/ports/region/${region.slug}`} className="view-all-link">
                  View all {region.name} ports →
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Book Your Cruise?</h2>
          <p>
            Speak with your dedicated cruise consultant for expert advice on itineraries and destinations.
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

export default PortsPage;

