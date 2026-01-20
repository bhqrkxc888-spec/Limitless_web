import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPortsByRegion, getAllRegions, getPortsCountByRegion } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, Card, SectionHeader } from '../components/ui';
import { supabase, getPublicUrl } from '../lib/supabase';
import '../styles/page-header.css';
import './PortRegionPage.css';
import './PortsPage.css'; // Import for region filter styles

/**
 * Port Card with pre-fetched image URL (no individual hook call)
 */
function PortCardWithImage({ port, imageUrl }) {
  return (
    <Card 
      to={`/ports/${port.slug}`} 
      variant="default"
      className="port-card"
    >
      <Card.Image 
        src={imageUrl}
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
  const [portImages, setPortImages] = useState({});
  
  const ports = useMemo(() => 
    region ? getPortsByRegion(region.id) : []
  , [region]);
  
  // Batch fetch all port card images in a single query (avoids N+1)
  useEffect(() => {
    if (!ports.length) return;
    
    async function fetchPortImages() {
      const slugs = ports.map(p => p.slug);
      const { data: cardImages, error } = await supabase
        .from('site_images')
        .select('entity_id, bucket, path')
        .eq('entity_type', 'port-guide')
        .eq('image_type', 'card')
        .in('entity_id', slugs);
      
      if (!error && cardImages) {
        const imageMap = cardImages.reduce((acc, img) => {
          if (img.bucket && img.path) {
            acc[img.entity_id] = getPublicUrl(img.bucket, img.path);
          }
          return acc;
        }, {});
        setPortImages(imageMap);
      }
    }
    
    fetchPortImages();
  }, [ports, region?.id]);
  
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
      <section className="standard-page-header">
        <div className="container">
          <h1>{region.name} Cruise Ports</h1>
          <p>{region.description}</p>
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
                <PortCardWithImage 
                  key={port.id} 
                  port={port} 
                  imageUrl={portImages[port.slug] || null}
                />
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

