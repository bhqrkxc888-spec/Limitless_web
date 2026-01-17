import { useParams, Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { getPortBySlug, getAdjacentPorts } from '../data/ports';
import { getPortContent, hasDetailedContent } from '../data/portContent';
import { siteConfig } from '../config/siteConfig';
import SEO, { getBreadcrumbSchema } from '../components/SEO';
import HeroSection from '../components/HeroSection';
import OptimizedImage from '../components/OptimizedImage';
import { Button, SectionHeader } from '../components/ui';
import { SITE_ASSETS } from '../config/assetUrls';
import { usePortGuideImage } from '../hooks/useImageUrl';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { DetailedPortGuide } from './DetailedPortGuide';
import PortGuideFeedback from '../components/port/PortGuideFeedback';
import PortGuideReviews from '../components/port/PortGuideReviews';
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
  const { prev: prevPort, next: nextPort } = getAdjacentPorts(slug);
  const [weatherIndex, setWeatherIndex] = useState(0);

  // Ensure page starts at top on load and when port changes
  useEffect(() => {
    // Immediate scroll to top - override browser scroll restoration
    window.scrollTo(0, 0);
    // Double-check after a tick (catches async rendering issues)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  // Get port data first for image context
  const portName = port?.name || '';
  const portCountry = port?.country || '';
  
  // Check if port has detailed G606-style content
  const detailedContent = getPortContent(slug);
  const hasDetailed = hasDetailedContent(slug);
  
  // Load images from database with smart placeholders
  const { imageUrl: heroImage } = usePortGuideImage(slug, 'hero', portName, portCountry);
  const { imageUrl: beachImage } = usePortGuideImage(slug, 'beach', portName, portCountry);
  
  // Load attraction images (up to 6)
  const { imageUrl: attraction1Image } = usePortGuideImage(slug, 'attraction-1', portName, portCountry);
  const { imageUrl: attraction2Image } = usePortGuideImage(slug, 'attraction-2', portName, portCountry);
  const { imageUrl: attraction3Image } = usePortGuideImage(slug, 'attraction-3', portName, portCountry);
  const { imageUrl: attraction4Image } = usePortGuideImage(slug, 'attraction-4', portName, portCountry);
  const { imageUrl: attraction5Image } = usePortGuideImage(slug, 'attraction-5', portName, portCountry);
  const { imageUrl: attraction6Image } = usePortGuideImage(slug, 'attraction-6', portName, portCountry);
  
  const attractionImages = [attraction1Image, attraction2Image, attraction3Image, attraction4Image, attraction5Image, attraction6Image];

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

  // Image URLs now loaded via usePortGuideImage hook above

  // Structured Data for SEO - TouristDestination + FAQPage schemas
  const destinationSchema = {
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

  // FAQ Schema for rich snippets (only if port has FAQ data)
  const faqSchema = port.faq?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: port.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  // Breadcrumb schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.limitlesscruises.com/' },
    { name: 'Port Guides', url: 'https://www.limitlesscruises.com/ports' },
    { name: port.name, url: `https://www.limitlesscruises.com/ports/${port.slug}` }
  ]);

  // Combine schemas - SEO component handles arrays
  const structuredData = faqSchema 
    ? [destinationSchema, faqSchema, breadcrumbSchema] 
    : [destinationSchema, breadcrumbSchema];

  // Format date as DD MONTH YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Get current date for "last updated"
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

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

  // Get season class for weather card
  const getSeasonClass = (monthName) => {
    const summerMonths = ['Jun', 'Jul', 'Aug'];
    const winterMonths = ['Dec', 'Jan', 'Feb'];
    
    if (summerMonths.includes(monthName)) return 'weather-card-summer';
    if (winterMonths.includes(monthName)) return 'weather-card-winter';
    return 'weather-card-spring';
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

      {/* Main Content */}
      <article className="port-content">
        <div className="container">

          {/* Coming Soon Banner for Template Ports */}
          {port.status === 'template' && (
            <div className="port-coming-soon-banner">
              <div className="coming-soon-content">
                <h3>Full Guide Coming Soon</h3>
                <p>We're currently gathering detailed information for {port.name}. In the meantime, basic port information is available above. Full guide with attractions, dining, and local tips will be published shortly.</p>
              </div>
            </div>
          )}

          {/* Render Detailed G606-style content if available */}
          {hasDetailed && detailedContent ? (
            <DetailedPortGuide 
              slug={slug}
              portName={portName}
              portCountry={portCountry}
              detailedContent={detailedContent}
              port={port}
            />
          ) : (
            <>
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
                  // Get pre-loaded attraction image
                  const itemImage = attractionImages[index];
                  
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
                        <div className="attraction-header">
                          <h3>{item.title}</h3>
                          {item.duration && (
                            <span className="attraction-duration">{item.duration}</span>
                          )}
                        </div>
                        <p>{item.description}</p>
                        
                        {/* Highlights */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="attraction-highlights">
                            {item.highlights.map((highlight, i) => (
                              <span key={i} className="highlight-tag">{highlight}</span>
                            ))}
                          </div>
                        )}
                        
                        {/* Good For */}
                        {item.goodFor && item.goodFor.length > 0 && (
                          <div className="attraction-good-for">
                            <strong>Good for:</strong> {item.goodFor.join(', ')}
                          </div>
                        )}
                        
                        {/* Tips - Stacked vertically, 1 per row */}
                        {item.tips && item.tips.length > 0 && (
                          <div className="attraction-tips">
                            <strong>Insider Tips:</strong>
                            <ul>
                              {item.tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="attraction-footer">
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title + ', ' + port.name)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="google-maps-link"
                          >
                            Google Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                  
                  {/* Beach characteristics - v4 format */}
                  {(port.nearestBeach.type || port.nearestBeach.waterEntry || port.nearestBeach.shelter) && (
                    <div className="beach-characteristics">
                      {port.nearestBeach.type && <span className="beach-tag">{port.nearestBeach.type}</span>}
                      {port.nearestBeach.waterEntry && <span className="beach-tag">{port.nearestBeach.waterEntry}</span>}
                      {port.nearestBeach.shelter && <span className="beach-tag">{port.nearestBeach.shelter}</span>}
                      {port.nearestBeach.crowdLevel && <span className="beach-tag">{port.nearestBeach.crowdLevel}</span>}
                    </div>
                  )}
                  
                  {/* Best for - v4 format */}
                  {port.nearestBeach.bestFor && port.nearestBeach.bestFor.length > 0 && (
                    <div className="beach-best-for">
                      <strong>Best for:</strong> {port.nearestBeach.bestFor.join(', ')}
                    </div>
                  )}
                  
                  {/* Access info - v4 format or fallback to v3 distance */}
                  <div className="beach-access">
                    {port.nearestBeach.access ? (
                      <>
                        {port.nearestBeach.access.walkTime && <p><strong>Walk:</strong> {port.nearestBeach.access.walkTime}</p>}
                        {port.nearestBeach.access.taxiTime && <p><strong>Taxi:</strong> {port.nearestBeach.access.taxiTime}</p>}
                        {port.nearestBeach.access.busRoute && <p><strong>Bus:</strong> {port.nearestBeach.access.busRoute} (check local bus schedules for full details)</p>}
                        {port.nearestBeach.access.notes && <p className="access-notes">{port.nearestBeach.access.notes}</p>}
                      </>
                    ) : port.nearestBeach.distance && (
                      <p><strong>Getting there:</strong> {port.nearestBeach.distance}</p>
                    )}
                  </div>
                  
                  {/* Insider tip - v4 format */}
                  {port.nearestBeach.tip && (
                    <div className="beach-tip">
                      <strong>Tip:</strong> {port.nearestBeach.tip}
                    </div>
                  )}
                  
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(port.nearestBeach.name + ', ' + port.name)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="google-maps-link google-maps-link-large"
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* Food and Drink */}
          {port.foodAndDrink && port.foodAndDrink.length > 0 && (
            <section className="port-section port-food">
              <h2>Where to Eat and Drink</h2>
              <div className="food-grid">
                {port.foodAndDrink.map((place, index) => (
                  <div key={index} className="food-card-simple">
                    <span className="food-type">{place.type}</span>
                    <h3>{place.name}</h3>
                    <p>{place.description}</p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ', ' + port.name)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="google-maps-link"
                    >
                      Google Maps
                    </a>
                  </div>
                ))}
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
                    <div key={idx} className={`weather-card ${getSeasonClass(month.month)}`}>
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
            </>
          )}

        </div>
      </article>

      {/* Rating & Feedback Section - Single location per port guide */}
      <section className="port-feedback-section">
        <div className="container">
          <div className="feedback-container">
            {/* Star Rating Form */}
            <div className="feedback-rating">
              <SectionHeader
                title="Rate This Port Guide"
                subtitle="Help other cruise passengers plan their visit"
              />
              <PortGuideFeedback portSlug={port.slug} portName={port.name} />
            </div>

            {/* Display Reviews */}
            <div className="feedback-reviews">
              <PortGuideReviews portSlug={port.slug} />
            </div>
          </div>
        </div>
      </section>

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

      {/* Port Navigation Footer */}
      <section className="port-navigation-footer">
        <div className="container">
          <div className="port-nav-links">
            {prevPort && (
              <Link to={`/ports/${prevPort.slug}`} className="port-nav-link port-nav-prev">
                ← {prevPort.name}
              </Link>
            )}
            <Link to="/ports" className="port-nav-link port-nav-home">
              Back to Port Guides
            </Link>
            {nextPort && (
              <Link to={`/ports/${nextPort.slug}`} className="port-nav-link port-nav-next">
                {nextPort.name} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer Footer */}
      <footer className="port-footer">
        <div className="container">
          <p className="disclaimer-text">
            <strong>Disclaimer:</strong> This guide is compiled from publicly available information and our interpretation of that data. 
            Port facilities, transport links, opening hours, and prices may change. Always verify current details with the cruise line, 
            port authority, or official tourism websites before travel. Prices and availability are indicative only.
          </p>
          <p className="update-date">
            Guide last updated: {formatDate(port.lastUpdated || currentDate)}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default PortGuidePage;
