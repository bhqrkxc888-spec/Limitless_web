import { useParams, Link } from 'react-router-dom';
import { getPortBySlug, getRegionBySlug } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader, Card } from '../components/ui';
import { getSupabaseImageUrl } from '../config/assetUrls';
import './PortGuidePage.css';

/**
 * Port Guide Page Template
 * Comprehensive cruise port guide with things to do, practical info, etc.
 */
function PortGuidePage() {
  const { slug } = useParams();
  const port = getPortBySlug(slug);

  // Handle port not found
  if (!port) {
    return (
      <main className="port-guide-page">
        <SEO title="Port Guide Not Found" />
        <div className="container section">
          <h1>Port Guide Not Found</h1>
          <p>Sorry, we couldn't find the port guide you're looking for.</p>
          <Button to="/ports">View All Port Guides</Button>
        </div>
      </main>
    );
  }

  const region = getRegionBySlug(port.region);

  // Construct hero image URL
  const heroImage = getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/hero.webp`);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: `${port.name} Cruise Port`,
    description: port.description,
    url: `https://www.limitlesscruises.com/ports/${port.slug}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: port.coordinates.lat,
      longitude: port.coordinates.lon,
    },
    containedInPlace: {
      '@type': 'Country',
      name: port.country,
    },
  };

  // Category icons
  const categoryIcons = {
    culture: '🏛️',
    history: '🏰',
    nature: '🌿',
    beach: '🏖️',
    food: '🍽️',
    shopping: '🛍️',
    exploration: '🚶',
    experience: '✨',
    attraction: '🎢',
  };

  return (
    <main className="port-guide-page">
      {/* SEO */}
      <SEO
        title={port.meta?.title || `${port.name} Cruise Port Guide`}
        description={port.meta?.description || port.description}
        canonical={`https://www.limitlesscruises.com/ports/${port.slug}`}
        keywords={port.meta?.keywords?.join(', ') || ''}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={port.name}
        subtitle={port.tagline}
        image={heroImage}
        imageAlt={`${port.name} cruise port`}
        size="md"
        align="left"
        primaryCta={{ label: 'Find Cruises', to: '/find-a-cruise' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Quick Facts Bar */}
      <section className="port-quick-facts">
        <div className="container">
          <div className="quick-facts-grid">
            <div className="quick-fact">
              <span className="quick-fact-icon">💱</span>
              <span className="quick-fact-label">Currency</span>
              <span className="quick-fact-value">{port.quickFacts.currency}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-icon">🗣️</span>
              <span className="quick-fact-label">Language</span>
              <span className="quick-fact-value">{port.quickFacts.language}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-icon">🕐</span>
              <span className="quick-fact-label">Timezone</span>
              <span className="quick-fact-value">{port.quickFacts.timezone}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-icon">🚢</span>
              <span className="quick-fact-label">Port Type</span>
              <span className="quick-fact-value">{port.quickFacts.portType}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-icon">{port.quickFacts.walkable ? '✅' : '🚌'}</span>
              <span className="quick-fact-label">Walkable</span>
              <span className="quick-fact-value">{port.quickFacts.walkable ? 'Yes' : 'Transport needed'}</span>
            </div>
            <div className="quick-fact">
              <span className="quick-fact-icon">{port.quickFacts.tenderRequired ? '🚤' : '🛳️'}</span>
              <span className="quick-fact-label">Tender</span>
              <span className="quick-fact-value">{port.quickFacts.tenderRequired ? 'Required' : 'Docks at pier'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="port-guide-grid">
            {/* Main Content Column */}
            <div className="port-guide-main">
              {/* Introduction */}
              <div className="port-intro">
                <p className="lead">{port.description}</p>
              </div>

              {/* Things to Do */}
              {port.thingsToDo && port.thingsToDo.length > 0 && (
                <div className="port-section">
                  <SectionHeader
                    title={`Things to Do in ${port.name}`}
                    subtitle="Our top recommendations for your port day"
                  />
                  <div className="things-to-do-grid">
                    {port.thingsToDo.map((thing, index) => (
                      <div key={index} className="thing-card">
                        <div className="thing-card-header">
                          <span className="thing-category-icon">
                            {categoryIcons[thing.category] || '📍'}
                          </span>
                          <div className="thing-meta">
                            <span className="thing-duration">{thing.duration}</span>
                            <span className="thing-price">{thing.price}</span>
                          </div>
                        </div>
                        <h3>{thing.title}</h3>
                        <p>{thing.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shore Excursions */}
              {port.shoreExcursions && port.shoreExcursions.length > 0 && (
                <div className="port-section">
                  <SectionHeader
                    title="Shore Excursions"
                    subtitle="Popular tours and day trips from the port"
                  />
                  <div className="excursions-list">
                    {port.shoreExcursions.map((excursion, index) => (
                      <div key={index} className="excursion-card">
                        <h3>{excursion.title}</h3>
                        <p>{excursion.description}</p>
                        <div className="excursion-meta">
                          <span className="excursion-duration">⏱️ {excursion.duration}</span>
                          <span className="excursion-book">📋 {excursion.bookWith}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Getting Around */}
              <div className="port-section">
                <SectionHeader
                  title="Getting Around"
                  subtitle="How to navigate from port to attractions"
                />
                <div className="getting-around-grid">
                  <div className="getting-around-item">
                    <h4>🚢 From the Port</h4>
                    <p>{port.gettingAround.fromPort}</p>
                  </div>
                  <div className="getting-around-item">
                    <h4>🚌 Public Transport</h4>
                    <p>{port.gettingAround.publicTransport}</p>
                  </div>
                  <div className="getting-around-item">
                    <h4>🚕 Taxis</h4>
                    <p>{port.gettingAround.taxis}</p>
                  </div>
                  <div className="getting-around-item">
                    <h4>🚶 Walking</h4>
                    <p>{port.gettingAround.walkingDistance}</p>
                  </div>
                </div>
              </div>

              {/* Food & Drink */}
              {port.foodAndDrink && port.foodAndDrink.length > 0 && (
                <div className="port-section">
                  <SectionHeader
                    title="Food & Drink"
                    subtitle="Where to eat and drink"
                  />
                  <div className="food-drink-list">
                    {port.foodAndDrink.map((place, index) => (
                      <div key={index} className="food-drink-item">
                        <h4>{place.name}</h4>
                        <span className="place-type">{place.type}</span>
                        <p>{place.description}</p>
                        <span className="price-range">{place.priceRange}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Insider Tips */}
              {port.insiderTips && port.insiderTips.length > 0 && (
                <div className="port-section">
                  <SectionHeader
                    title="Insider Tips"
                    subtitle="Advice from experienced cruisers"
                  />
                  <ul className="insider-tips-list">
                    {port.insiderTips.map((tip, index) => (
                      <li key={index}>
                        <span className="tip-icon">💡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="port-guide-sidebar">
              {/* Book CTA */}
              <div className="sidebar-card sidebar-cta-card">
                <h3>Cruise to {port.name}</h3>
                <p>Find cruises calling at {port.name} and book with your dedicated cruise consultant.</p>
                <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
                  Call {siteConfig.phone}
                </Button>
                <Button to="/find-a-cruise" variant="outline" fullWidth style={{ marginTop: '0.5rem' }}>
                  Search Cruises
                </Button>
              </div>

              {/* Practical Info */}
              <div className="sidebar-card">
                <h3>Practical Information</h3>
                <dl className="practical-info-list">
                  <dt>Best Time to Visit</dt>
                  <dd>{port.practicalInfo.bestTimeToVisit}</dd>
                  
                  <dt>Cruise Terminals</dt>
                  <dd>{port.practicalInfo.cruiseTerminals.join(', ')}</dd>
                  
                  <dt>Nearest Airport</dt>
                  <dd>{port.practicalInfo.nearbyAirport}</dd>
                  
                  <dt>Visa Info</dt>
                  <dd>{port.practicalInfo.visaInfo}</dd>
                </dl>
              </div>

              {/* Related Destinations */}
              {port.relatedDestinations && port.relatedDestinations.length > 0 && (
                <div className="sidebar-card">
                  <h3>Related Cruises</h3>
                  <ul className="related-destinations-list">
                    {port.relatedDestinations.map((dest, index) => (
                      <li key={index}>
                        <Link to={`/destinations/${dest}`}>
                          {dest.replace(/-cruises$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cruises
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Explore {port.name}?</h2>
          <p>
            Speak with your dedicated cruise consultant to find cruises visiting {port.name}.
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

export default PortGuidePage;

