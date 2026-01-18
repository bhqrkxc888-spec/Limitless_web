import { useState, useEffect, useMemo } from 'react';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, Card } from '../components/ui';
import { Link } from 'react-router-dom';
import { usePortGuideImage } from '../hooks/useImageUrl';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import './PortsPage.css';

/**
 * Port Card with Database Image
 */
function PortCardWithImage({ port }) {
  const { imageUrl: portImage, isPlaceholder } = usePortGuideImage(port.slug, 'card');
  
  // Debug: Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Port Card: ${port.slug} | Image: ${isPlaceholder ? 'placeholder' : 'real'}`);
  }
  
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
 * Region definitions (static - these don't change)
 */
const REGIONS = [
  { id: 'mediterranean', slug: 'mediterranean', name: 'Mediterranean' },
  { id: 'atlantic-coast', slug: 'atlantic-coast', name: 'Atlantic Coast' },
  { id: 'atlantic-islands', slug: 'atlantic-islands', name: 'Atlantic Islands' },
  { id: 'norwegian-fjords', slug: 'norwegian-fjords', name: 'Norwegian Fjords' },
  { id: 'uk', slug: 'united-kingdom', name: 'United Kingdom' },
];

/**
 * Ports Hub Page
 * Only shows ports with show_in_menu = true
 */
function PortsPage() {
  const [ports, setPorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch only menu-visible ports from Supabase
  useEffect(() => {
    async function fetchMenuPorts() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('ports')
          .select('id, slug, name, country, region, tagline, show_in_menu, is_complete')
          .eq('status', 'published')
          .eq('show_in_menu', true)
          .order('name');

        if (!error && data) {
          setPorts(data);
        } else {
          console.error('Error fetching ports:', error);
        }
      } catch (err) {
        console.error('Ports fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenuPorts();
  }, []);

  // Group ports by region
  const portsByRegion = useMemo(() => {
    const grouped = {};
    ports.forEach(port => {
      if (!grouped[port.region]) {
        grouped[port.region] = [];
      }
      grouped[port.region].push(port);
    });
    return grouped;
  }, [ports]);

  // Filter regions to only those with ports
  const activeRegions = useMemo(() => {
    return REGIONS.filter(region => 
      portsByRegion[region.id] && portsByRegion[region.id].length > 0
    );
  }, [portsByRegion]);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Port Guides',
    description: 'Comprehensive guides to cruise ports around the world',
    itemListElement: activeRegions.map((region, index) => ({
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

      {/* Hero Section with Region Navigation */}
      <section className="page-header ports-hero">
        <div className="container">
          <div className="page-header-content">
            <h1>Cruise Port Guides</h1>
            <p className="page-header-subtitle">
              Find things to do, shore excursions, restaurants, and insider tips from experienced cruisers.
            </p>
            
            {/* Region Quick-Nav */}
            {activeRegions.length > 0 && (
              <div className="regions-quick-nav" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <span className="regions-label">Browse by Region:</span>
                <div className="regions-chips">
                  {activeRegions.map((region) => {
                    const portCount = portsByRegion[region.id]?.length || 0;
                    return (
                      <Link
                        key={region.id}
                        to={`/ports/region/${region.slug}`}
                        className="region-chip"
                      >
                        {region.name}
                        <span className="chip-count">{portCount}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="page-header-actions">
              <Button to="/find-a-cruise" variant="primary">Find a Cruise</Button>
              <Button href={`tel:${siteConfig.phone}`} variant="outline">Call {siteConfig.phone}</Button>
            </div>
            
            {/* Development Notice - subtle */}
            <p style={{
              marginTop: '1.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              opacity: 0.7
            }}>
              Port guides are in development and updated daily
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="section">
          <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
          </div>
        </section>
      )}


      {/* No Ports Message */}
      {!isLoading && ports.length === 0 && (
        <section className="section">
          <div className="container text-center" style={{ padding: '4rem 0' }}>
            <h2>Coming Soon</h2>
            <p>We're working on comprehensive port guides. Check back soon!</p>
          </div>
        </section>
      )}

      {/* Featured Ports by Region */}
      {!isLoading && activeRegions.map((region) => {
        const regionPorts = portsByRegion[region.id] || [];
        if (regionPorts.length === 0) return null;

        return (
          <section key={region.id} className="section ports-region-section">
            <div className="container">
              <div className="region-section-header">
                <h2>{region.name}</h2>
                {regionPorts.length > 3 && (
                  <Link to={`/ports/region/${region.slug}`} className="view-all-link">
                    View all {regionPorts.length} ports →
                  </Link>
                )}
              </div>

              <div className="ports-grid">
                {regionPorts.slice(0, 3).map((port) => (
                  <PortCardWithImage key={port.id} port={port} />
                ))}
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
