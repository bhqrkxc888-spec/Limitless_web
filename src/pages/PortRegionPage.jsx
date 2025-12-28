import { useParams, Link } from 'react-router-dom';
import { getPortsByRegion, getAllRegions } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader } from '../components/ui';
import { getSupabaseImageUrl } from '../config/assetUrls';
import './PortRegionPage.css';

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
  const heroImage = getSupabaseImageUrl('WEB_categories', `ports/${region.id}/hero.webp`);

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
        description={`Comprehensive guides to cruise ports in ${region.name}. Discover things to do, shore excursions, and insider tips for your cruise.`}
        canonical={`https://www.limitlesscruises.com/ports/region/${region.slug}`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={`${region.name} Cruise Ports`}
        subtitle={region.description}
        image={heroImage}
        imageAlt={`${region.name} cruise ports`}
        size="md"
        align="center"
        primaryCta={{ label: 'Find a Cruise', to: '/find-a-cruise' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Ports Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title={`All ${region.name} Ports`}
            subtitle={`${ports.length} port guide${ports.length !== 1 ? 's' : ''} available`}
          />

          {ports.length > 0 ? (
            <div className="ports-grid">
              {ports.map((port) => {
                const portImage = getSupabaseImageUrl('WEB_categories', `ports/${region.id}/${port.slug}/card.webp`);
                
                return (
                  <Card 
                    key={port.id} 
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
                        <span className="port-country">{port.country}</span>
                      </div>
                      <Card.Description>{port.tagline}</Card.Description>
                      <div className="port-quick-info">
                        <span>{port.quickFacts.currency}</span>
                        <span>{port.quickFacts.portType}</span>
                        {port.quickFacts.walkable && <span>✓ Walkable</span>}
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}
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

