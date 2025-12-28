import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
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
 * Full-width, comprehensive cruise port guide
 * Clean, modern, sophisticated design
 */
function PortGuidePage() {
  const { slug } = useParams();
  const port = getPortBySlug(slug);
  const [weatherIndex, setWeatherIndex] = useState(0);

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
      latitude: port.coordinates.lat,
      longitude: port.coordinates.lon,
    },
    containedInPlace: {
      '@type': 'Country',
      name: port.country,
    },
  };

  // Combine must-see sights and things to do, removing duplicates
  const allAttractions = [];
  const seenTitles = new Set();
  
  if (port.mustSeeSights) {
    port.mustSeeSights.forEach(sight => {
      if (!seenTitles.has(sight.title.toLowerCase())) {
        seenTitles.add(sight.title.toLowerCase());
        allAttractions.push({ ...sight, featured: true });
      }
    });
  }
  
  if (port.thingsToDo) {
    port.thingsToDo.forEach(thing => {
      if (!seenTitles.has(thing.title.toLowerCase())) {
        seenTitles.add(thing.title.toLowerCase());
        allAttractions.push({ ...thing, featured: false });
      }
    });
  }

  // Format date as DD MONTH YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Weather navigation
  const weatherMonths = port.weather?.months || [];
  const visibleWeatherCount = 3;
  const canScrollLeft = weatherIndex > 0;
  const canScrollRight = weatherIndex < weatherMonths.length - visibleWeatherCount;

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

      {/* Navigation and Quick Facts */}
      <section className="port-nav-section">
        <div className="container">
          <Link to="/ports" className="port-back-button">
            <ArrowLeft size={18} />
            <span>Back to Port Guides</span>
          </Link>
          
          <div className="port-quick-facts">
            <div className="quick-fact-item">
              <span className="quick-fact-label">Currency</span>
              <span className="quick-fact-value">{port.quickFacts.currency}</span>
            </div>
            <div className="quick-fact-item">
              <span className="quick-fact-label">Language</span>
              <span className="quick-fact-value">{port.quickFacts.language}</span>
            </div>
            <div className="quick-fact-item">
              <span className="quick-fact-label">Timezone</span>
              <span className="quick-fact-value">{port.quickFacts.timezone}</span>
            </div>
            <div className="quick-fact-item">
              <span className="quick-fact-label">Port Type</span>
              <span className="quick-fact-value">{port.quickFacts.portType}</span>
            </div>
            <div className="quick-fact-item">
              <span className="quick-fact-label">Walkability</span>
              <span className="quick-fact-value">{port.quickFacts.walkable ? 'Walkable from port' : 'Transport recommended'}</span>
            </div>
            <div className="quick-fact-item">
              <span className="quick-fact-label">Docking</span>
              <span className="quick-fact-value">{port.quickFacts.tenderRequired ? 'Tender required' : 'Pier docking'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Full Width */}
      <article className="port-guide-content">
        <div className="container">
          
          {/* About the Port */}
          {port.aboutPort && (
            <section className="port-section">
              <h2>About {port.name} Cruise Port</h2>
              <p className="port-lead">{port.aboutPort.overview}</p>
              
              {port.aboutPort.terminals && (
                <div className="port-info-block">
                  <h3>Cruise Terminals</h3>
                  <p>{port.aboutPort.terminals}</p>
                </div>
              )}
              
              {port.aboutPort.shuttle && (
                <div className="port-info-block">
                  <h3>Shuttle Services</h3>
                  <p>{port.aboutPort.shuttle}</p>
                </div>
              )}
              
              {port.aboutPort.walkability && (
                <div className="port-info-block">
                  <h3>Getting into Town</h3>
                  <p>{port.aboutPort.walkability}</p>
                </div>
              )}
              
              {/* Practical Info integrated here */}
              {port.practicalInfo && (
                <>
                  <div className="port-info-block">
                    <h3>Best Time to Visit</h3>
                    <p>{port.practicalInfo.bestTimeToVisit}</p>
                  </div>
                  
                  {port.practicalInfo.nearbyAirport && (
                    <div className="port-info-block">
                      <h3>Nearest Airport</h3>
                      <p>{port.practicalInfo.nearbyAirport}</p>
                    </div>
                  )}
                  
                  {port.practicalInfo.visaInfo && (
                    <div className="port-info-block">
                      <h3>Visa Information</h3>
                      <p>{port.practicalInfo.visaInfo}</p>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {/* Getting Around - 3 Column Grid */}
          {port.gettingAround && (
            <section className="port-section">
              <h2>Getting Around {port.name}</h2>
              <div className="getting-around-grid">
                <div className="getting-around-card">
                  <h3>From the Port</h3>
                  <p>{port.gettingAround.fromPort}</p>
                </div>
                <div className="getting-around-card">
                  <h3>Public Transport</h3>
                  <p>{port.gettingAround.publicTransport}</p>
                </div>
                <div className="getting-around-card">
                  <h3>Taxis</h3>
                  <p>{port.gettingAround.taxis}</p>
                </div>
                {port.gettingAround.walkingDistance && (
                  <div className="getting-around-card">
                    <h3>Walking</h3>
                    <p>{port.gettingAround.walkingDistance}</p>
                  </div>
                )}
                {port.gettingAround.sightseeingBus && (
                  <div className="getting-around-card">
                    <h3>Sightseeing Bus</h3>
                    <p>{port.gettingAround.sightseeingBus}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Transport Connections */}
          {port.transportConnections && (
            <section className="port-section">
              <h2>Airport and Train Connections</h2>
              <div className="transport-grid">
                {port.transportConnections.airport && (
                  <div className="transport-card">
                    <h3>{port.transportConnections.airport.name}</h3>
                    <p><strong>Distance:</strong> {port.transportConnections.airport.distance}</p>
                    <p>{port.transportConnections.airport.options}</p>
                  </div>
                )}
                {port.transportConnections.trains && (
                  <div className="transport-card">
                    <h3>Train Connections</h3>
                    <p><strong>{port.transportConnections.trains.mainStation}:</strong> {port.transportConnections.trains.description}</p>
                    {port.transportConnections.trains.localHubs && (
                      <p>{port.transportConnections.trains.localHubs}</p>
                    )}
                  </div>
                )}
                {port.transportConnections.cruiseLines && (
                  <div className="transport-card transport-card-wide">
                    <h3>Cruise Lines Using This Port</h3>
                    <p>{port.transportConnections.cruiseLines}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Things to See and Do - Combined, 3 Column Grid */}
          {allAttractions.length > 0 && (
            <section className="port-section">
              <h2>Things to See and Do in {port.name}</h2>
              <p className="section-intro">
                {port.timeRequired?.intro || `Our top recommendations for your day in ${port.name}.`}
              </p>
              
              <div className="attractions-grid">
                {allAttractions.map((item, index) => {
                  // Build image URL if available
                  const itemImage = item.image 
                    ? getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/${item.image}`)
                    : null;
                  
                  // Get time estimate if available
                  const timeEstimate = port.timeRequired?.estimates?.find(
                    e => e.sight.toLowerCase().includes(item.title.toLowerCase().split(' ')[0])
                  );
                  
                  return (
                    <div key={index} className={`attraction-card ${item.featured ? 'attraction-featured' : ''}`}>
                      {itemImage && (
                        <div className="attraction-image">
                          <OptimizedImage
                            src={itemImage}
                            alt={item.title}
                            width={400}
                            height={250}
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="attraction-content">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {(item.duration || timeEstimate) && (
                          <span className="attraction-duration">
                            Allow {item.duration || timeEstimate?.time}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {port.timeRequired?.summary && (
                <div className="time-summary-box">
                  <p>{port.timeRequired.summary}</p>
                </div>
              )}
            </section>
          )}

          {/* Shore Excursions */}
          {port.shoreExcursions && port.shoreExcursions.length > 0 && (
            <section className="port-section">
              <h2>Popular Excursions from {port.name}</h2>
              <div className="excursions-grid">
                {port.shoreExcursions.map((excursion, index) => (
                  <div key={index} className="excursion-card">
                    <h3>{excursion.title}</h3>
                    <p>{excursion.description}</p>
                    <div className="excursion-details">
                      <span className="excursion-duration">Duration: {excursion.duration}</span>
                      <span className="excursion-book">Book via: {excursion.bookWith}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Nearest Beach - With Image */}
          {port.nearestBeach && (
            <section className="port-section">
              <h2>Nearest Beach</h2>
              <div className="beach-section">
                <div className="beach-image-container">
                  <OptimizedImage
                    src={beachImage}
                    alt={`${port.nearestBeach.name} beach near ${port.name}`}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="beach-details">
                  <h3>{port.nearestBeach.name}</h3>
                  <p>{port.nearestBeach.description}</p>
                  <div className="beach-getting-there">
                    <strong>Getting there:</strong> {port.nearestBeach.distance}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Food and Drink - Cards without prices */}
          {port.foodAndDrink && port.foodAndDrink.length > 0 && (
            <section className="port-section">
              <h2>Where to Eat and Drink</h2>
              <div className="food-grid">
                {port.foodAndDrink.map((place, index) => {
                  const foodImage = getSupabaseImageUrl('WEB_categories', `ports/${port.region}/${port.slug}/food-${index + 1}.webp`);
                  return (
                    <div key={index} className="food-card">
                      <div className="food-image">
                        <OptimizedImage
                          src={foodImage}
                          alt={`${place.name} - ${place.type}`}
                          width={300}
                          height={200}
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                      <div className="food-content">
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

          {/* Insider Tips */}
          {port.insiderTips && port.insiderTips.length > 0 && (
            <section className="port-section">
              <h2>Local Tips</h2>
              <ul className="tips-list">
                {port.insiderTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Weather - Carousel Cards */}
          {weatherMonths.length > 0 && (
            <section className="port-section">
              <h2>{port.name} Weather Guide</h2>
              {port.weather?.intro && <p className="section-intro">{port.weather.intro}</p>}
              
              <div className="weather-carousel">
                <button 
                  className="weather-nav weather-nav-left"
                  onClick={() => setWeatherIndex(Math.max(0, weatherIndex - 1))}
                  disabled={!canScrollLeft}
                  aria-label="View previous months"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="weather-cards-container">
                  <div 
                    className="weather-cards"
                    style={{ transform: `translateX(-${weatherIndex * (100 / visibleWeatherCount)}%)` }}
                  >
                    {weatherMonths.map((month, index) => (
                      <div key={index} className="weather-card">
                        <h3>{month.month}</h3>
                        <div className="weather-temps">
                          <div className="weather-high">
                            <span className="temp-value">{month.highC}</span>
                            <span className="temp-label">High</span>
                          </div>
                          <div className="weather-low">
                            <span className="temp-value">{month.lowC}</span>
                            <span className="temp-label">Low</span>
                          </div>
                        </div>
                        <div className="weather-details">
                          <div className="weather-detail">
                            <span className="detail-label">Rain</span>
                            <span className="detail-value">{month.rainMm}mm</span>
                          </div>
                          <div className="weather-detail">
                            <span className="detail-label">Sun Days</span>
                            <span className="detail-value">{month.sunDays}</span>
                          </div>
                          <div className="weather-detail">
                            <span className="detail-label">Sea Temp</span>
                            <span className="detail-value">{month.seaTempC}C</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="weather-nav weather-nav-right"
                  onClick={() => setWeatherIndex(Math.min(weatherMonths.length - visibleWeatherCount, weatherIndex + 1))}
                  disabled={!canScrollRight}
                  aria-label="View next months"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              {port.weather?.bestTime && (
                <div className="best-time-section">
                  <h3>Best Time to Visit</h3>
                  <p><strong>Best overall:</strong> {port.weather.bestTime.overall}</p>
                  <p><strong>Peak season:</strong> {port.weather.bestTime.hottest}</p>
                  <p><strong>Quieter months:</strong> {port.weather.bestTime.quietest}</p>
                  {port.weather.bestTime.recommendation && (
                    <p className="recommendation">{port.weather.bestTime.recommendation}</p>
                  )}
                </div>
              )}
            </section>
          )}

          {/* FAQ Section */}
          {port.faq && port.faq.length > 0 && (
            <section className="port-section">
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

      {/* CTA Section - Moved to bottom */}
      <section className="port-cta-section">
        <div className="container">
          <div className="port-cta-content">
            <h2>Ready to Cruise to {port.name}?</h2>
            <p>
              Speak with your dedicated cruise consultant to find cruises visiting {port.name}.
              We will help you find the perfect itinerary for your holiday.
            </p>
            <div className="port-cta-buttons">
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

      {/* Disclaimer */}
      <footer className="port-disclaimer">
        <div className="container">
          <p>
            This guide is provided for informational purposes only. Details such as opening times, 
            prices, and availability may change. We recommend verifying information before your visit. 
            Guide last updated: {formatDate(port.lastUpdated || new Date().toISOString())}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default PortGuidePage;
