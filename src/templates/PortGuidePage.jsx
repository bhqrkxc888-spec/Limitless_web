import { useParams, Link } from 'react-router-dom';
import { getPortBySlug, getRegionBySlug } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import OptimizedImage from '../components/OptimizedImage';
import { Button, SectionHeader, Card } from '../components/ui';
import { getSupabaseImageUrl, SITE_ASSETS } from '../config/assetUrls';
import './PortGuidePage.css';

// Fallback hero image uses site's default hero or logo
const FALLBACK_HERO = SITE_ASSETS.heroDefault || '/images/placeholders/coming-soon.svg';

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

  // Construct hero image URL with fallback
  const heroImage = getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/hero.webp`) || FALLBACK_HERO;

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

              {/* About the Port */}
              {port.aboutPort && (
                <div className="port-section">
                  <SectionHeader
                    title="About the Cruise Port"
                    subtitle="Terminal information and access"
                  />
                  <div className="about-port-content">
                    <p>{port.aboutPort.overview}</p>
                    {port.aboutPort.terminals && (
                      <div className="port-info-item">
                        <h4>🚢 Terminals</h4>
                        <p>{port.aboutPort.terminals}</p>
                      </div>
                    )}
                    {port.aboutPort.shuttle && (
                      <div className="port-info-item">
                        <h4>🚌 Shuttle Service</h4>
                        <p>{port.aboutPort.shuttle}</p>
                      </div>
                    )}
                    {port.aboutPort.walkability && (
                      <div className="port-info-item">
                        <h4>🚶 Walkability</h4>
                        <p>{port.aboutPort.walkability}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Getting Around - MOVED UP for logical flow */}
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
                  {port.gettingAround.sightseeingBus && (
                    <div className="getting-around-item getting-around-full">
                      <h4>🚍 Sightseeing Bus</h4>
                      <p>{port.gettingAround.sightseeingBus}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Transport Connections */}
              {port.transportConnections && (
                <div className="port-section">
                  <SectionHeader
                    title="Airport, Trains & Cruise Lines"
                    subtitle="Getting to and from the port"
                  />
                  <div className="transport-grid">
                    {port.transportConnections.airport && (
                      <div className="transport-item">
                        <h4>✈️ {port.transportConnections.airport.name}</h4>
                        <p><strong>Distance:</strong> {port.transportConnections.airport.distance}</p>
                        <p>{port.transportConnections.airport.options}</p>
                      </div>
                    )}
                    {port.transportConnections.trains && (
                      <div className="transport-item">
                        <h4>🚆 Train Connections</h4>
                        <p><strong>{port.transportConnections.trains.mainStation}:</strong> {port.transportConnections.trains.description}</p>
                        {port.transportConnections.trains.localHubs && (
                          <p>{port.transportConnections.trains.localHubs}</p>
                        )}
                      </div>
                    )}
                    {port.transportConnections.cruiseLines && (
                      <div className="transport-item transport-item-full">
                        <h4>🛳️ Cruise Lines</h4>
                        <p>{port.transportConnections.cruiseLines}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Must-See Sights */}
              {port.mustSeeSights && port.mustSeeSights.length > 0 && (
                <div className="port-section">
                  <SectionHeader
                    title={`Must-See Sights in ${port.name}`}
                    subtitle="The headline attractions you shouldn't miss"
                  />
                  <div className="must-see-grid">
                    {port.mustSeeSights.map((sight, index) => {
                      // Build image URL if sight has image reference
                      const sightImage = sight.image 
                        ? getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/${sight.image}`)
                        : null;
                      
                      return (
                        <div key={index} className="must-see-card">
                          {sightImage && (
                            <div className="must-see-image">
                              <OptimizedImage
                                src={sightImage}
                                alt={sight.title}
                                width={400}
                                height={250}
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
                            </div>
                          )}
                          <div className="must-see-content">
                            <h3>{sight.title}</h3>
                            <p>{sight.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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

              {/* Nearest Beach */}
              {port.nearestBeach && (
                <div className="port-section">
                  <SectionHeader
                    title="Nearest Beach"
                    subtitle={port.nearestBeach.name}
                  />
                  <div className="beach-info">
                    <p>{port.nearestBeach.description}</p>
                    <p className="beach-distance"><strong>Getting there:</strong> {port.nearestBeach.distance}</p>
                  </div>
                </div>
              )}

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

              {/* Time Required */}
              {port.timeRequired && (
                <div className="port-section">
                  <SectionHeader
                    title="Time Required"
                    subtitle={port.timeRequired.intro}
                  />
                  <div className="time-required-content">
                    <ul className="time-estimates-list">
                      {port.timeRequired.estimates.map((item, index) => (
                        <li key={index}>
                          <span className="sight-name">{item.sight}</span>
                          <span className="sight-time">{item.time}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="time-summary">{port.timeRequired.summary}</p>
                  </div>
                </div>
              )}

              {/* Insider Tips */}
              {port.insiderTips && port.insiderTips.length > 0 && (
                <div className="port-section">
                  <SectionHeader
                    title="Top Tips"
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

              {/* FAQ Section */}
              {port.faq && port.faq.length > 0 && (
                <div className="port-section">
                  <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle={`Common questions about visiting ${port.name}`}
                  />
                  <div className="faq-list">
                    {port.faq.map((item, index) => (
                      <div key={index} className="faq-item">
                        <h4>{item.question}</h4>
                        <p>{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weather Section */}
              {port.weather && (
                <div className="port-section">
                  <SectionHeader
                    title={`${port.name} Weather Guide`}
                    subtitle={port.weather.intro}
                  />
                  <div className="weather-content">
                    <div className="weather-table-wrapper">
                      <table className="weather-table">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>High °C</th>
                            <th>Low °C</th>
                            <th>Rain mm</th>
                            <th>Sun Days</th>
                            <th>Sea °C</th>
                          </tr>
                        </thead>
                        <tbody>
                          {port.weather.months.map((m, index) => (
                            <tr key={index}>
                              <td>{m.month}</td>
                              <td>{m.highC}°</td>
                              <td>{m.lowC}°</td>
                              <td>{m.rainMm}</td>
                              <td>{m.sunDays}</td>
                              <td>{m.seaTempC}°</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {port.weather.bestTime && (
                      <div className="best-time-visit">
                        <h4>Best Time to Visit</h4>
                        <ul>
                          <li><strong>Best overall:</strong> {port.weather.bestTime.overall}</li>
                          <li><strong>Peak season:</strong> {port.weather.bestTime.hottest}</li>
                          <li><strong>Quieter months:</strong> {port.weather.bestTime.quietest}</li>
                        </ul>
                        <p className="recommendation">{port.weather.bestTime.recommendation}</p>
                      </div>
                    )}
                  </div>
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

