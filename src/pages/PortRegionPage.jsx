import { useParams, Link } from 'react-router-dom';
import { getPortsByRegion, getAllRegions, getPortsCountByRegion } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, Card, SectionHeader } from '../components/ui';
import { usePortGuideImage } from '../hooks/useImageUrl';
import './PortRegionPage.css';
import './PortsPage.css'; // Import for region filter styles

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
 * Port Region Page
 * Lists all ports in a specific region
 */
function PortRegionPage() {
  const { slug } = useParams();
  const region = getAllRegions().find(r => r.slug === slug);
  
  // Handle region not found
  if (!region) {
    return (
      <main className="port-region-page">
        <SEO title="Region Not Found" />
        <div className="container section">
          <h1>Region Not Found</h1>
          <p>Sorry, we couldn't find the region you're looking for.</p>
          <Button to="/ports">View All Port Guides</Button>
        </div>
      </main>
    );
  }

  const ports = getPortsByRegion(region.id);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${region.name} Cruise Ports`,
    description: region.description,
    itemListElement: ports.map((port, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristDestination',
        name: port.name,
        url: `https://www.limitlesscruises.com/ports/${port.slug}`,
      },
    })),
  };

  return (
    <main className="port-region-page">
      {/* SEO */}
      <SEO
        title={`${region.name} Cruise Port Guides | Things to Do & Tips`}
        description={`Comprehensive guides to cruise ports in ${region.name}. Find things to do, shore excursions, and insider tips for your cruise.`}
        canonical={`https://www.limitlesscruises.com/ports/region/${region.slug}`}
        structuredData={structuredData}
      />

      {/* Hero Section - No hero requirement */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1>{region.name} Cruise Ports</h1>
            <p className="page-header-subtitle">{region.description}</p>
            <div className="page-header-actions">
              <Button to="/find-a-cruise" variant="primary">Find a Cruise</Button>
              <Button href={`tel:${siteConfig.phone}`} variant="outline">Call {siteConfig.phone}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Region Quick-Nav Filter */}
      <section className="section ports-intro-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="regions-quick-nav">
            <span className="regions-label">Browse by Region:</span>
            <div className="regions-chips">
              <Link
                to="/ports"
                className="region-chip"
                style={{ fontWeight: '600' }}
              >
                ← All Ports
              </Link>
              {getAllRegions().map((r) => {
                const portCount = getPortsCountByRegion(r.id);
                const isActive = r.id === region.id;
                return (
                  <Link
                    key={r.id}
                    to={`/ports/region/${r.slug}`}
                    className={`region-chip ${isActive ? 'region-chip-active' : ''}`}
                  >
                    {r.name}
                    <span className="chip-count">{portCount}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ports Grid */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <SectionHeader
            title={`All ${region.name} Ports`}
            subtitle={`${ports.length} port guide${ports.length !== 1 ? 's' : ''} available`}
          />

          {ports.length > 0 ? (
            <div className="ports-grid">
              {ports.map((port) => (
                <PortCardWithImage key={port.id} port={port} />
              ))}
            </div>
          ) : (
            <div className="no-ports">
              <p>Port guides for this region are coming soon.</p>
              <Button to="/ports">View All Regions</Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Cruise to {region.name}</h2>
          <p>
            Speak with your dedicated cruise consultant for expert advice on {region.name} cruises.
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

export default PortRegionPage;

