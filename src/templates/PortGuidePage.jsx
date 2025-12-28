import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { getPortBySlug } from '../data/ports';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import OptimizedImage from '../components/OptimizedImage';
import { Button, SectionHeader } from '../components/ui';
import { getSupabaseImageUrl, SITE_ASSETS } from '../config/assetUrls';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import './PortGuidePage.css';

// Fallback hero image
const FALLBACK_HERO = SITE_ASSETS.heroDefault || '/images/placeholders/coming-soon.svg';

/**
 * Port Guide Page Template
 * Premium, comprehensive cruise port guide
 * Clean, modern design with proper visual hierarchy
 */
function PortGuidePage() {
  const { slug } = useParams();
  const port = getPortBySlug(slug);
  const [weatherIndex, setWeatherIndex] = useState(0);

  // Combine attractions - ONLY use mustSeeSights if available, otherwise thingsToDo
  // This prevents duplication
  const attractions = useMemo(() => {
    if (!port) return [];
    if (port.mustSeeSights && port.mustSeeSights.length > 0) {
      return port.mustSeeSights.map(sight => ({
        ...sight,
        // Add time estimate if available
        duration: port.timeRequired?.estimates?.find(
          e => sight.title.toLowerCase().includes(e.sight.toLowerCase().split(',')[0].toLowerCase())
        )?.time || null
      }));
    }
    return port.thingsToDo || [];
  }, [port]);

  // Handle port not found
  if (!port) {
    return (
      <main className="port-guide-page">
        <SEO title="Port Guide Not Found" />
        <div className="container section">
          <h1>Port Guide Not Found</h1>
          <p>Sorry, we could not find the port guide you are looking for.</p>
          <Button to="/ports">View All Port Guides</Button>
        </div>
      </main>
    );
  }

  // Construct image URLs
  const heroImage = getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/hero.webp`) || FALLBACK_HERO;
  const beachImage = getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/beach.webp`);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: `${port.name} Cruise Port`,
    description: port.description,
    url: `https://www.limitlesscruises.com/ports/${port.slug}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: port.coordinates?.lat,
      longitude: port.coordinates?.lon,
    },
    containedInPlace: {
      '@type': 'Country',
      name: port.country,
    },
  };

  // Format date as DD MONTH YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Weather data
  const weatherMonths = port.weather?.months || [];
  const visibleWeatherCount = 3;
  const maxIndex = Math.max(0, weatherMonths.length - visibleWeatherCount);

  const handleWeatherPrev = () => {
    setWeatherIndex(prev => Math.max(0, prev - 1));
  };

  const handleWeatherNext = () => {
    setWeatherIndex(prev => Math.min(maxIndex, prev + 1));
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
        subtitle={port.description}
        image={heroImage}
        imageAlt={`${port.name} cruise port`}
        size="md"
        align="left"
      />

      {/* Back Navigation */}
      <div className="port-nav-bar">
        <div className="container">
          <Link to="/ports" className="port-back-btn">
            <ArrowLeft size={18} />
            <span>Back to Port Guides</span>
          </Link>
        </div>
      </div>

      {/* Quick Facts Bar */}
      <section className="port-facts-bar">
        <div className="container">
          <div className="facts-grid">
            <div className="fact-box">
              <span className="fact-label">Currency</span>
              <span className="fact-value">{port.quickFacts?.currency || 'EUR'}</span>
            </div>
            <div className="fact-box">
              <span className="fact-label">Language</span>
              <span className="fact-value">{port.quickFacts?.language || 'Local'}</span>
            </div>
            <div className="fact-box">
              <span className="fact-label">Timezone</span>
              <span className="fact-value">{port.quickFacts?.timezone || 'Local'}</span>
            </div>
            <div className="fact-box">
              <span className="fact-label">Port Type</span>
              <span className="fact-value">{port.quickFacts?.portType || 'Pier'}</span>
            </div>
            <div className="fact-box">
              <span className="fact-label">Walkable</span>
              <span className="fact-value">{port.quickFacts?.walkable ? 'Yes' : 'Transport needed'}</span>
            </div>
            <div className="fact-box">
              <span className="fact-label">Tender</span>
              <span className="fact-value">{port.quickFacts?.tenderRequired ? 'Required' : 'No'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="port-content">
        <div className="container">

          {/* Introduction */}
          <section className="port-intro">
            <p className="intro-text">{port.description}</p>
            {port.timeRequired?.summary && (
              <div className="intro-highlight">
                <p>{port.timeRequired.summary}</p>
              </div>
            )}
          </section>

          {/* About the Port */}
          {port.aboutPort && (
            <section className="port-section port-about">
              <h2>About {port.name} Cruise Port</h2>
              <div className="about-grid">
                <div className="about-card">
                  <h3>Overview</h3>
                  <p>{port.aboutPort.overview}</p>
                </div>
                {port.aboutPort.terminals && (
                  <div className="about-card">
                    <h3>Cruise Terminals</h3>
                    <p>{port.aboutPort.terminals}</p>
                  </div>
                )}
                {port.aboutPort.shuttle && (
                  <div className="about-card">
                    <h3>Shuttle Services</h3>
                    <p>{port.aboutPort.shuttle}</p>
                  </div>
                )}
                {port.aboutPort.walkability && (
                  <div className="about-card">
                    <h3>Getting into Town</h3>
                    <p>{port.aboutPort.walkability}</p>
                  </div>
                )}
                {port.practicalInfo?.bestTimeToVisit && (
                  <div className="about-card">
                    <h3>Best Time to Visit</h3>
                    <p>{port.practicalInfo.bestTimeToVisit}</p>
                  </div>
                )}
                {port.practicalInfo?.visaInfo && (
                  <div className="about-card">
                    <h3>Visa Information</h3>
                    <p>{port.practicalInfo.visaInfo}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Things to See and Do */}
          {attractions.length > 0 && (
            <section className="port-section port-attractions">
              <h2>Things to See and Do</h2>
              <div className="attractions-grid">
                {attractions.slice(0, 6).map((item, index) => {
                  const itemImage = item.image 
                    ? getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/${item.image}`)
                    : null;
                  
                  return (
                    <div key={index} className="attraction-card">
                      <div className="attraction-image">
                        <OptimizedImage
                          src={itemImage}
                          alt={item.title}
                          width={400}
                          height={280}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="attraction-body">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {item.duration && (
                          <span className="attraction-time">Allow {item.duration}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Weather Section */}
          {weatherMonths.length > 0 && (
            <section className="port-section port-weather">
              <h2>{port.name} Weather</h2>
              {port.weather?.intro && <p className="section-intro">{port.weather.intro}</p>}
              
              <div className="weather-carousel-wrapper">
                <button 
                  className="weather-arrow weather-arrow-left"
                  onClick={handleWeatherPrev}
                  disabled={weatherIndex === 0}
                  aria-label="Previous months"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="weather-track">
                  {weatherMonths.slice(weatherIndex, weatherIndex + visibleWeatherCount).map((month, idx) => (
                    <div key={idx} className="weather-card">
                      <div className="weather-month">{month.month}</div>
                      <div className="weather-temps">
                        <div className="temp-high">
                          <span className="temp-num">{month.highC}°</span>
                          <span className="temp-type">High</span>
                        </div>
                        <div className="temp-low">
                          <span className="temp-num">{month.lowC}°</span>
                          <span className="temp-type">Low</span>
                        </div>
                      </div>
                      <div className="weather-stats">
                        <div className="stat">
                          <span className="stat-val">{month.rainMm}mm</span>
                          <span className="stat-lbl">Rain</span>
                        </div>
                        <div className="stat">
                          <span className="stat-val">{month.sunDays}</span>
                          <span className="stat-lbl">Sun Days</span>
                        </div>
                        <div className="stat">
                          <span className="stat-val">{month.seaTempC}°</span>
                          <span className="stat-lbl">Sea</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="weather-arrow weather-arrow-right"
                  onClick={handleWeatherNext}
                  disabled={weatherIndex >= maxIndex}
                  aria-label="Next months"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {port.weather?.bestTime && (
                <div className="best-time-box">
                  <h3>When to Visit</h3>
                  <div className="best-time-grid">
                    <div className="best-time-item">
                      <strong>Best overall</strong>
                      <p>{port.weather.bestTime.overall}</p>
                    </div>
                    <div className="best-time-item">
                      <strong>Peak season</strong>
                      <p>{port.weather.bestTime.hottest}</p>
                    </div>
                    <div className="best-time-item">
                      <strong>Quieter months</strong>
                      <p>{port.weather.bestTime.quietest}</p>
                    </div>
                  </div>
                  {port.weather.bestTime.recommendation && (
                    <p className="best-time-rec">{port.weather.bestTime.recommendation}</p>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Nearest Beach */}
          {port.nearestBeach && (
            <section className="port-section port-beach">
              <h2>Nearest Beach</h2>
              <div className="beach-layout">
                <div className="beach-image">
                  <OptimizedImage
                    src={beachImage}
                    alt={`${port.nearestBeach.name} near ${port.name}`}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="beach-info">
                  <h3>{port.nearestBeach.name}</h3>
                  <p>{port.nearestBeach.description}</p>
                  <div className="beach-distance">
                    <strong>Getting there:</strong> {port.nearestBeach.distance}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Food and Drink */}
          {port.foodAndDrink && port.foodAndDrink.length > 0 && (
            <section className="port-section port-food">
              <h2>Where to Eat and Drink</h2>
              <div className="food-grid">
                {port.foodAndDrink.map((place, index) => {
                  const foodImage = getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/food-${index + 1}.webp`);
                  return (
                    <div key={index} className="food-card">
                      <div className="food-image">
                        <OptimizedImage
                          src={foodImage}
                          alt={place.name}
                          width={300}
                          height={200}
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <div className="food-body">
                        <span className="food-type">{place.type}</span>
                        <h3>{place.name}</h3>
                        <p>{place.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Getting Around */}
          {port.gettingAround && (
            <section className="port-section port-getting-around">
              <h2>Getting Around {port.name}</h2>
              <div className="transport-grid">
                <div className="transport-card">
                  <h3>From the Port</h3>
                  <p>{port.gettingAround.fromPort}</p>
                </div>
                <div className="transport-card">
                  <h3>Public Transport</h3>
                  <p>{port.gettingAround.publicTransport}</p>
                </div>
                <div className="transport-card">
                  <h3>Taxis</h3>
                  <p>{port.gettingAround.taxis}</p>
                </div>
                {port.gettingAround.walkingDistance && (
                  <div className="transport-card">
                    <h3>Walking</h3>
                    <p>{port.gettingAround.walkingDistance}</p>
                  </div>
                )}
                {port.gettingAround.sightseeingBus && (
                  <div className="transport-card">
                    <h3>Sightseeing Bus</h3>
                    <p>{port.gettingAround.sightseeingBus}</p>
                  </div>
                )}
                <div className="transport-card">
                  <h3>Accessibility</h3>
                  <p>Most major attractions are accessible. The port area and main tourist zones have step-free access. Check with your cruise line for specific mobility assistance.</p>
                </div>
              </div>
            </section>
          )}

          {/* Local Tips */}
          {port.insiderTips && port.insiderTips.length > 0 && (
            <section className="port-section port-tips">
              <h2>Local Tips</h2>
              <div className="tips-grid">
                {port.insiderTips.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Airport and Transport Connections - 3 Column */}
          {port.transportConnections && (
            <section className="port-section port-transport">
              <h2>Airport and Transport Connections</h2>
              <div className="connections-grid-three">
                {port.transportConnections.airport && (
                  <div className="connection-card">
                    <h3>{port.transportConnections.airport.name}</h3>
                    <p><strong>Distance:</strong> {port.transportConnections.airport.distance}</p>
                    <p>{port.transportConnections.airport.options}</p>
                  </div>
                )}
                {port.transportConnections.trains && (
                  <div className="connection-card">
                    <h3>Train Connections</h3>
                    <p><strong>{port.transportConnections.trains.mainStation}</strong></p>
                    <p>{port.transportConnections.trains.description}</p>
                    {port.transportConnections.trains.localHubs && (
                      <p>{port.transportConnections.trains.localHubs}</p>
                    )}
                  </div>
                )}
                {port.gettingAround?.taxis && (
                  <div className="connection-card">
                    <h3>Taxis</h3>
                    <p>{port.gettingAround.taxis}</p>
                    {port.practicalInfo?.nearbyAirport && (
                      <p><strong>To Airport:</strong> {port.practicalInfo.nearbyAirport}</p>
                    )}
                  </div>
                )}
              </div>
              {port.transportConnections.cruiseLines && (
                <div className="cruise-lines-note">
                  <p>{port.transportConnections.cruiseLines}</p>
                </div>
              )}
            </section>
          )}

          {/* FAQ */}
          {port.faq && port.faq.length > 0 && (
            <section className="port-section port-faq">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {port.faq.map((item, index) => (
                  <div key={index} className="faq-item">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </article>

      {/* CTA Section */}
      <section className="port-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Cruise to {port.name}?</h2>
            <p>
              Speak with your dedicated cruise consultant to find cruises visiting {port.name}. 
              We will help you find the perfect itinerary for your holiday.
            </p>
            <div className="cta-buttons">
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
              <Button to="/find-a-cruise" variant="outline" size="lg">
                Find a Cruise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Footer */}
      <footer className="port-footer">
        <div className="container">
          <p>
            This guide is provided for informational purposes only. Details such as opening times 
            and availability may change. We recommend verifying information before your visit.
          </p>
          <p className="update-date">
            Guide last updated: {formatDate(port.lastUpdated || '2025-01-01')}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default PortGuidePage;
