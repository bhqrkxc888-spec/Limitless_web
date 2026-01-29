import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllRegions } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, Card, SectionHeader } from '../components/ui';
import { supabase, getPublicUrl } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
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
  const [ports, setPorts] = useState([]);
  const [portImages, setPortImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [allRegionCounts, setAllRegionCounts] = useState({});
  
  // Fetch published ports for this region from Supabase
  useEffect(() => {
    if (!region) return;
    
    async function fetchRegionPorts() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('ports')
          .select('id, slug, name, country, region, tagline, show_in_menu')
          .eq('status', 'published')
          .eq('region', region.id)
          .order('name'); // A-Z sorting

        if (!error && data) {
          setPorts(data);
          
          // Batch fetch all port card images
          const slugs = data.map(p => p.slug);
          if (slugs.length > 0) {
            const { data: cardImages, error: imgError } = await supabase
              .from('site_images')
              .select('entity_id, bucket, path')
              .eq('entity_type', 'port-guide')
              .eq('image_type', 'card')
              .in('entity_id', slugs);
            
            if (!imgError && cardImages) {
              const imageMap = cardImages.reduce((acc, img) => {
                if (img.bucket && img.path) {
                  acc[img.entity_id] = getPublicUrl(img.bucket, img.path);
                }
                return acc;
              }, {});
              setPortImages(imageMap);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching region ports:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchRegionPorts();
  }, [region]);
  
  // Fetch port counts for all regions (for navigation chips)
  useEffect(() => {
    async function fetchRegionCounts() {
      try {
        const { data, error } = await supabase
          .from('ports')
          .select('region')
          .eq('status', 'published');
        
        if (!error && data) {
          const counts = data.reduce((acc, port) => {
            acc[port.region] = (acc[port.region] || 0) + 1;
            return acc;
          }, {});
          setAllRegionCounts(counts);
        }
      } catch (err) {
        console.error('Error fetching region counts:', err);
      }
    }
    
    fetchRegionCounts();
  }, []);
  
  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = Math.max(0, ports.length - itemsToShow);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  
  const visiblePorts = ports.slice(currentIndex, currentIndex + itemsToShow);
  
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
                const portCount = allRegionCounts[r.id] || 0;
                const isActive = r.id === region?.id;
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

      {/* Loading State */}
      {isLoading && (
        <section className="section">
          <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
          </div>
        </section>
      )}

      {/* Ports Carousel with Navigation Arrows */}
      {!isLoading && (
        <section className="section" style={{ paddingTop: '1rem' }}>
          <div className="container">
            <SectionHeader
              title={`All ${region.name} Ports`}
              subtitle={`${ports.length} port guide${ports.length !== 1 ? 's' : ''} available`}
            />

            {ports.length > 0 ? (
              <div style={{ position: 'relative' }}>
                {/* Previous Arrow */}
                {ports.length > itemsToShow && (
                  <button
                    onClick={goToPrev}
                    aria-label="Previous ports"
                    style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      background: 'white',
                      border: '2px solid var(--border-default)',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                      e.currentTarget.style.color = 'inherit';
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                )}

                <div className="ports-grid">
                  {visiblePorts.map((port) => (
                    <PortCardWithImage 
                      key={port.id} 
                      port={port} 
                      imageUrl={portImages[port.slug] || null}
                    />
                  ))}
                </div>

                {/* Next Arrow */}
                {ports.length > itemsToShow && (
                  <button
                    onClick={goToNext}
                    aria-label="Next ports"
                    style={{
                      position: 'absolute',
                      right: '-20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      background: 'white',
                      border: '2px solid var(--border-default)',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                      e.currentTarget.style.color = 'inherit';
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <div className="no-ports">
                <p>No published port guides for this region yet.</p>
                <Button to="/ports">View All Regions</Button>
              </div>
            )}
          </div>
        </section>
      )}

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

