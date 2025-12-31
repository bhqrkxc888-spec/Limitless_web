import { useParams } from 'react-router-dom';
import { getCruiseLineBySlug } from '../data/cruiseLines';
import { getTravelNewsByCruiseLine } from '../services/travelNewsAPI';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, Card, SectionHeader, Accordion, DataTable } from '../components/ui';
import NewsCard from '../components/NewsCard';
import { useEffect, useState } from 'react';
import { getOgImage } from '../utils/imageHelpers';
import { shipNameToSlug } from '../utils/widgetyHelpers';
import { useCruiseLineImage, useShipImage } from '../hooks/useImageUrl';
import './CruiseLinePage.css';

/**
 * Ship Card Component
 * Individual ship card with image from database or fallback
 */
function ShipCard({ ship, cruiseLineSlug, shipSlug, shipPageUrl, cruiseLineName }) {
  const { imageUrl: shipImageUrl } = useShipImage(cruiseLineSlug, shipSlug, 'card', ship);
  
  return (
    <Card 
      href={shipPageUrl}
      variant="default"
      className="ship-card"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        // Ensure it opens in new tab even if href is relative
        e.preventDefault();
        window.open(shipPageUrl, '_blank', 'noopener,noreferrer');
      }}
    >
      <Card.Image 
        src={shipImageUrl} 
        alt={`${ship} - ${cruiseLineName}`}
        aspectRatio="16/10"
      />
      <Card.Content>
        <Card.Title as="h3">{ship}</Card.Title>
        <Card.Description>View deck plans, staterooms & itineraries</Card.Description>
      </Card.Content>
    </Card>
  );
}

/**
 * CruiseLinePage Template
 * 
 * A flexible, data-driven template for cruise line pages.
 * Renders sections conditionally based on available data:
 * - Hero (always)
 * - Why Choose (if whyChoose array exists)
 * - Destinations with images (if destinationImages exists)
 * - Kids Club (if kidsClub exists)
 * - Accessibility & Loyalty (if either exists)
 * - Simple highlights (fallback if no whyChoose)
 * - CTA (always)
 */
function CruiseLinePage() {
  const { slug } = useParams();
  const cruiseLine = getCruiseLineBySlug(slug);
  const [cruiseLineNews, setCruiseLineNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Load cruise line logo for header (must be called unconditionally)
  // Hook will handle null/undefined gracefully
  const { imageUrl: logoUrl } = useCruiseLineImage(cruiseLine?.slug || '', 'logo', cruiseLine?.name || '');

  // Fetch cruise line news
  useEffect(() => {
    if (!cruiseLine?.slug) return;
    
    async function fetchNews() {
      setLoadingNews(true);
      const { data } = await getTravelNewsByCruiseLine(cruiseLine.slug, 3);
      if (data?.news) {
        setCruiseLineNews(data.news);
      }
      setLoadingNews(false);
    }
    
    fetchNews();
  }, [cruiseLine?.slug]);

  // Handle cruise line not found
  if (!cruiseLine) {
    return (
      <main className="cruise-line-page">
        <SEO title="Cruise Line Not Found" />
        <div className="container section">
          <h1>Cruise Line Not Found</h1>
          <p>Sorry, we couldn't find the cruise line you're looking for.</p>
          <Button to="/cruise-lines">View All Cruise Lines</Button>
        </div>
      </main>
    );
  }

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: cruiseLine.name,
    description: cruiseLine.description,
    url: `https://www.limitlesscruises.com/cruise-lines/${cruiseLine.slug}`
  };

  // Check what extended content is available
  const hasWhyChoose = cruiseLine.whyChoose && cruiseLine.whyChoose.length > 0;
  const hasDestinationImages = cruiseLine.destinationImages && cruiseLine.destinationImages.length > 0;
  const hasKidsClub = cruiseLine.kidsClub;
  const hasAccessibility = cruiseLine.accessibility;
  const hasLoyaltyProgram = cruiseLine.loyaltyProgram;

  return (
    <main className="cruise-line-page">
      {/* SEO */}
      <SEO
        title={cruiseLine.meta?.title || `${cruiseLine.name} Cruises`}
        description={cruiseLine.meta?.description || cruiseLine.description}
        canonical={`https://www.limitlesscruises.com/cruise-lines/${cruiseLine.slug}`}
        image={getOgImage(cruiseLine.image)}
        structuredData={structuredData}
      />

      {/* Header Section with Logo */}
      <section className="cruise-line-header-section">
        <div className="container">
          <div className="cruise-line-header">
            {/* Logo at Top */}
            {logoUrl && !logoUrl.includes('placeholder') && (
              <div className="cruise-line-logo-top">
                <img 
                  src={logoUrl} 
                  alt={`${cruiseLine.name} logo`}
                  className="cruise-line-logo-header"
                />
              </div>
            )}
            
            <div className="cruise-line-header-content">
              <h1 className="cruise-line-header-title">{cruiseLine.name}</h1>
              <p className="cruise-line-header-subtitle">{cruiseLine.description}</p>
              <div className="cruise-line-header-cta">
                <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                  Call {siteConfig.phone}
                </Button>
                <Button to="/find-a-cruise" variant="outline" size="lg">
                  Find a Cruise
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Disclaimer */}
      <section className="section">
        <div className="container">
          <div className="cruise-line-disclaimer">
            <p>
              <strong>Note:</strong> Cruise line data is currently under development and construction for an improved experience. 
              Some information may be updated as we enhance our content.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Card Grid */}
      {hasWhyChoose ? (
        <section className="section">
          <div className="container">
            <SectionHeader
              title={`Why Choose ${cruiseLine.name}?`}
              subtitle={cruiseLine.tagline}
              align="center"
            />

            <div className="grid grid-3">
              {cruiseLine.whyChoose.map((item, index) => (
                <Card key={index} variant="default">
                  <Card.Content>
                    <Card.Title as="h3">{item.title}</Card.Title>
                    <Card.Description>{item.description}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Fallback: Simple Highlights Section */
        <section className="section">
          <div className="container">
            <div className="cruise-line-grid">
              {/* Main Content */}
              <div className="cruise-line-main">
                <header className="section-header">
                  <h2 className="section-header-title">Why Choose {cruiseLine.name}?</h2>
                </header>

                <div className="highlights-grid">
                  {cruiseLine.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-card">
                      <div className="highlight-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <p className="highlight-text">{highlight}</p>
                    </div>
                  ))}
                </div>

                {/* Ships Section */}
                {cruiseLine.ships && cruiseLine.ships.length > 0 && (
                  <div className="ships-section mt-12">
                    <h3 className="section-subtitle">The Fleet</h3>
                    {/* Ship Cards Grid */}
                    <div className="ships-cards-grid">
                      {cruiseLine.ships.map((ship, index) => {
                        // Generate ship page URL (opens in new tab)
                        const shipSlug = shipNameToSlug(ship);
                        const shipPageUrl = `/ships/${shipSlug}`;
                        
                        return (
                          <ShipCard 
                            key={index}
                            ship={ship}
                            cruiseLineSlug={cruiseLine.slug}
                            shipSlug={shipSlug}
                            shipPageUrl={shipPageUrl}
                            cruiseLineName={cruiseLine.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Destinations Section */}
                {cruiseLine.destinations && cruiseLine.destinations.length > 0 && (
                  <div className="destinations-section mt-12">
                    <h3 className="section-subtitle">Popular Destinations</h3>
                    <div className="destinations-list">
                      {cruiseLine.destinations.map((destination, index) => (
                        <span key={index} className="destination-tag">{destination}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="cruise-line-sidebar">
                <SidebarContent cruiseLine={cruiseLine} />
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Destination Images Grid */}
      {hasDestinationImages && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader
              title={`Popular ${cruiseLine.shortName} Destinations`}
              subtitle="Book with Limitless Cruises for expert advice and exclusive savings"
              align="center"
            />

            <div className="grid grid-3">
              {cruiseLine.destinationImages.map((region, index) => (
                <Card key={index} to="/find-a-cruise" variant="default">
                  <Card.Image src={region.image} alt={region.alt} aspectRatio="16/10" />
                  <Card.Content>
                    <Card.Title as="h3">{region.name}</Card.Title>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Kids Club Section */}
      {hasKidsClub && (
        <section className="section">
          <div className="container">
            <SectionHeader
              title={cruiseLine.kidsClub.name}
              subtitle="Safe, supervised fun for the whole family, included in your cruise fare"
            />

            <div className="content-grid">
              <div className="content-main">
                <div className="info-card">
                  <p>{cruiseLine.kidsClub.intro}</p>
                  {cruiseLine.kidsClub.detail && (
                    <p><strong>What to expect:</strong> {cruiseLine.kidsClub.detail}</p>
                  )}
                </div>

                {/* Highlights list if available */}
                {cruiseLine.kidsClub.highlights && cruiseLine.kidsClub.highlights.length > 0 && (
                  <div className="info-card">
                    <ul className="tips-list">
                      {cruiseLine.kidsClub.highlights.map((highlight, index) => (
                        <li key={index}>
                          <strong>{highlight.title}:</strong> {highlight.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accordions */}
                <div className="accordion-wrapper">
                  {cruiseLine.kidsClub.ageGroups && (
                    <Accordion
                      variant="separated"
                      items={[
                        {
                          id: 'age-groups',
                          title: 'Age Groups & Schedule',
                          content: (
                            <>
                              <DataTable
                                columns={[
                                  { key: 'club', label: 'Club' },
                                  { key: 'age', label: 'Age' },
                                  { key: 'morning', label: 'Morning' },
                                  { key: 'afternoon', label: 'Afternoon' },
                                  { key: 'evening', label: 'Evening' }
                                ]}
                                rows={cruiseLine.kidsClub.ageGroups}
                                variant="striped"
                                compact
                              />
                              {cruiseLine.kidsClub.note && (
                                <p className="note">{cruiseLine.kidsClub.note}</p>
                              )}
                            </>
                          )
                        }
                      ]}
                      defaultOpen="age-groups"
                    />
                  )}

                  {cruiseLine.kidsClub.costsInfo && (
                    <Accordion
                      variant="separated"
                      items={[
                        {
                          id: 'costs-prebooking',
                          title: 'Costs and Pre Booking',
                          content: (
                            <div>
                              <p>{cruiseLine.kidsClub.costsInfo}</p>
                              {cruiseLine.kidsClub.note && (
                                <ul className="tips-list" style={{ marginTop: '12px' }}>
                                  <li>Spaces operate to capacity limits for safety. Arrive early for popular sessions.</li>
                                  <li>Share allergies, medical needs and authorised pick up adults during registration.</li>
                                  <li>Check the Daily Programme or app for the latest times and themed events.</li>
                                </ul>
                              )}
                            </div>
                          )
                        }
                      ]}
                    />
                  )}
                </div>
              </div>

              <aside className="content-sidebar">
                {cruiseLine.kidsClub.quickFacts && cruiseLine.kidsClub.quickFacts.length > 0 && (
                  <div className="sidebar-card">
                    <h3 className="sidebar-title">Quick Facts</h3>
                    <ul className="facts-list">
                      {cruiseLine.kidsClub.quickFacts.map((fact, index) => (
                        <li key={index}>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Accessibility & Loyalty Section */}
      {(hasAccessibility || hasLoyaltyProgram) && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader
              title="Accessibility & Loyalty"
              align="center"
            />

            <div className="dual-section">
              {/* Accessibility */}
              {hasAccessibility && (
                <div className="section-card">
                  <h3>Accessibility Support</h3>
                  <p>{cruiseLine.accessibility.intro}</p>
                  
                  {cruiseLine.accessibility.tips && (
                    <Accordion
                      variant="bordered"
                      items={[
                        {
                          id: 'accessibility-tips',
                          title: 'Accessibility Tips',
                          content: (
                            <ul className="tips-list">
                              {cruiseLine.accessibility.tips.map((tip, index) => (
                                <li key={index}>
                                  <strong>{tip.title}:</strong> {tip.description}
                                </li>
                              ))}
                            </ul>
                          )
                        }
                      ]}
                    />
                  )}
                </div>
              )}

              {/* Loyalty Program */}
              {hasLoyaltyProgram && (
                <div className="section-card">
                  <h3>{cruiseLine.loyaltyProgram.name}</h3>
                  <p>{cruiseLine.loyaltyProgram.intro}</p>

                  {cruiseLine.loyaltyProgram.tiers && (
                    <Accordion
                      variant="bordered"
                      items={[
                        {
                          id: 'loyalty-tiers',
                          title: 'Benefits by Tier',
                          content: (
                            <>
                              <DataTable
                                columns={[
                                  { key: 'tier', label: 'Tier' },
                                  { key: 'points', label: 'Points' },
                                  { key: 'benefits', label: 'Key Benefits' }
                                ]}
                                rows={cruiseLine.loyaltyProgram.tiers}
                                variant="striped"
                                compact
                              />
                              {cruiseLine.loyaltyProgram.pointsInfo && (
                                <p className="note">{cruiseLine.loyaltyProgram.pointsInfo}</p>
                              )}
                            </>
                          )
                        }
                      ]}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Fleet & Ships (for pages with whyChoose but showing ships) */}
      {hasWhyChoose && cruiseLine.ships && cruiseLine.ships.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="cruise-line-grid">
              <div className="cruise-line-main">
                <SectionHeader
                  title={`The ${cruiseLine.shortName} Fleet`}
                  subtitle={`Explore the ships of ${cruiseLine.name}`}
                />

                {/* Ship Cards Grid */}
                <div className="ships-cards-grid">
                  {cruiseLine.ships.map((ship, index) => {
                    // Generate ship page URL (opens in new tab)
                    const shipSlug = shipNameToSlug(ship);
                    const shipPageUrl = `/ships/${shipSlug}`;
                    
                    return (
                      <ShipCard 
                        key={index}
                        ship={ship}
                        cruiseLineSlug={cruiseLine.slug}
                        shipSlug={shipSlug}
                        shipPageUrl={shipPageUrl}
                        cruiseLineName={cruiseLine.name}
                      />
                    );
                  })}
                </div>

                {/* Destinations */}
                {cruiseLine.destinations && cruiseLine.destinations.length > 0 && !hasDestinationImages && (
                  <div className="destinations-section mt-12">
                    <h3 className="section-subtitle">Popular Destinations</h3>
                    <div className="destinations-list">
                      {cruiseLine.destinations.map((destination, index) => (
                        <span key={index} className="destination-tag">{destination}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside className="cruise-line-sidebar">
                <SidebarContent cruiseLine={cruiseLine} />
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Latest News Section */}
      {!loadingNews && cruiseLineNews.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Latest Updates"
              title={`${cruiseLine.name} News`}
              subtitle={`Stay up to date with the latest news and announcements from ${cruiseLine.name}`}
              align="center"
            />
            <div className="grid grid-3">
              {cruiseLineNews.map((article) => (
                <NewsCard key={article.id} article={article} variant="default" />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Button to="/travel-news" variant="outline">
                View All Travel News
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Book Your {cruiseLine.shortName} Cruise?</h2>
            <p>
              Speak with your dedicated cruise consultant today. We'll help you find the perfect {cruiseLine.name} cruise at the best price.
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
        </div>
      </section>
    </main>
  );
}

/**
 * Sidebar Content Component
 * Reused in multiple places
 */
function SidebarContent({ cruiseLine }) {
  // Load logo for sidebar
  const { imageUrl: logoUrl } = useCruiseLineImage(cruiseLine.slug, 'logo', cruiseLine.name);
  
  return (
    <>
      {/* Logo in Sidebar (if available) */}
      {logoUrl && !logoUrl.includes('placeholder') && (
        <div className="sidebar-card sidebar-logo-card">
          <img 
            src={logoUrl} 
            alt={`${cruiseLine.name} logo`}
            className="cruise-line-logo-sidebar"
          />
        </div>
      )}
      
      <div className="sidebar-card">
        <h3 className="sidebar-title">Book Your {cruiseLine.shortName} Cruise</h3>
        <p className="sidebar-text">
          Get expert advice and the best prices on {cruiseLine.name} cruises from your dedicated cruise consultant.
        </p>
        <div className="sidebar-cta">
          <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
            Call {siteConfig.phone}
          </Button>
          <Button to="/contact" variant="outline" fullWidth>
            Request a Quote
          </Button>
        </div>
      </div>

      {/* Suitable For */}
      {cruiseLine.suitableFor && cruiseLine.suitableFor.length > 0 && (
        <div className="sidebar-card">
          <h3 className="sidebar-title">Perfect For</h3>
          <ul className="suitable-list">
            {cruiseLine.suitableFor.map((item, index) => (
              <li key={index}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trust Badges */}
      <div className="sidebar-card sidebar-trust">
        <div className="trust-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          <span>ABTA Protected</span>
        </div>
        <div className="trust-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>Personal Service</span>
        </div>
        <div className="trust-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
          <span>Price Match*</span>
        </div>
      </div>
    </>
  );
}

export default CruiseLinePage;
