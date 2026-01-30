import { useState, useEffect, useMemo } from 'react';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, Card } from '../components/ui';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import '../styles/page-header.css';
import './PortsPage.css';

const SUPABASE_URL = 'https://xrbusklskmeaamwynfmm.supabase.co';
const BUCKET = 'WEB_port-guides';

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
 * Region definitions (static - these don't change)
 */
const REGIONS = [
  { id: 'mediterranean', slug: 'mediterranean', name: 'Mediterranean' },
  { id: 'atlantic-coast', slug: 'atlantic-coast', name: 'Atlantic Coast' },
  { id: 'atlantic-islands', slug: 'atlantic-islands', name: 'Atlantic Islands' },
  { id: 'north-africa', slug: 'north-africa', name: 'North Africa' },
  { id: 'norwegian-fjords', slug: 'norwegian-fjords', name: 'Norwegian Fjords' },
  { id: 'united-kingdom', slug: 'united-kingdom', name: 'United Kingdom' },
  // Future regions - will show when ports are published
  { id: 'caribbean', slug: 'caribbean', name: 'Caribbean' },
  { id: 'alaska', slug: 'alaska', name: 'Alaska' },
  { id: 'iceland', slug: 'iceland', name: 'Iceland' },
  { id: 'canada-new-england', slug: 'canada-new-england', name: 'Canada & New England' },
  { id: 'northern-europe', slug: 'northern-europe', name: 'Northern Europe' },
  { id: 'middle-east', slug: 'middle-east', name: 'Middle East' },
  { id: 'asia-pacific', slug: 'asia-pacific', name: 'Asia Pacific' },
  { id: 'south-america', slug: 'south-america', name: 'South America' },
];

/**
 * Ports Hub Page
 * Only shows ports with show_in_menu = true
 */
function PortsPage() {
  const [ports, setPorts] = useState([]);
  const [portImages, setPortImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [carouselIndexes, setCarouselIndexes] = useState({});
  const [itemsToShow, setItemsToShow] = useState(3);

  // Responsive carousel items
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

  // Fetch ports AND batch-fetch all card images in parallel
  useEffect(() => {
    async function fetchMenuPorts() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('ports')
          .select('id, slug, name, country, region, tagline, show_in_menu')
          .eq('status', 'published')
          .eq('show_in_menu', true)
          .order('name'); // A-Z sorting

        if (!error && data) {
          setPorts(data);
          
          // Fetch card images directly from storage for each port
          const slugs = data.map(p => p.slug);
          if (slugs.length > 0) {
            const imageMap = {};
            // Check storage directly for card.webp in each port folder
            await Promise.all(slugs.map(async (slug) => {
              try {
                const { data: files } = await supabase.storage
                  .from(BUCKET)
                  .list(slug, { limit: 20 });
                
                if (files) {
                  const cardFile = files.find(f => 
                    f.name && (f.name.toLowerCase() === 'card.webp' || f.name.toLowerCase() === 'card.jpg' || f.name.toLowerCase() === 'card.png')
                  );
                  if (cardFile) {
                    imageMap[slug] = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${slug}/${cardFile.name}`;
                  }
                }
              } catch (err) {
                console.error(`Error fetching card image for ${slug}:`, err);
              }
            }));
            setPortImages(imageMap);
          }
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
  
  // Navigation handlers for each region carousel
  const goToNext = (regionId, totalPorts) => {
    setCarouselIndexes(prev => {
      const currentIndex = prev[regionId] || 0;
      const maxIndex = Math.max(0, totalPorts - itemsToShow);
      return {
        ...prev,
        [regionId]: currentIndex >= maxIndex ? 0 : currentIndex + 1
      };
    });
  };

  const goToPrev = (regionId, totalPorts) => {
    setCarouselIndexes(prev => {
      const currentIndex = prev[regionId] || 0;
      const maxIndex = Math.max(0, totalPorts - itemsToShow);
      return {
        ...prev,
        [regionId]: currentIndex <= 0 ? maxIndex : currentIndex - 1
      };
    });
  };

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

      {/* Hero Section - Compact */}
      <section className="standard-page-header">
        <div className="container">
          <h1>Cruise Port Guides</h1>
          <p>
            Find things to do, shore excursions, restaurants, and insider tips from experienced cruisers.
          </p>
        </div>
      </section>

      {/* Region Navigation - Below Hero */}
      {activeRegions.length > 0 && (
        <section className="regions-nav-section">
          <div className="container">
            <div className="regions-quick-nav">
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
          </div>
        </section>
      )}

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

      {/* Featured Ports by Region with Carousel Navigation */}
      {!isLoading && activeRegions.map((region) => {
        const regionPorts = portsByRegion[region.id] || [];
        if (regionPorts.length === 0) return null;
        
        const currentIndex = carouselIndexes[region.id] || 0;
        const visiblePorts = regionPorts.slice(currentIndex, currentIndex + itemsToShow);

        return (
          <section key={region.id} className="section ports-region-section">
            <div className="container">
              <div className="region-section-header">
                <h2>{region.name}</h2>
                {regionPorts.length > itemsToShow && (
                  <Link to={`/ports/region/${region.slug}`} className="view-all-link">
                    View all {regionPorts.length} ports →
                  </Link>
                )}
              </div>

              <div style={{ position: 'relative' }}>
                {/* Previous Arrow */}
                {regionPorts.length > itemsToShow && (
                  <button
                    onClick={() => goToPrev(region.id, regionPorts.length)}
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
                {regionPorts.length > itemsToShow && (
                  <button
                    onClick={() => goToNext(region.id, regionPorts.length)}
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
