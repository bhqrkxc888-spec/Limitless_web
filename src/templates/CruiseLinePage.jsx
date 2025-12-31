import { useParams } from 'react-router-dom';
import { getCruiseLineBySlug } from '../data/cruiseLines';
import { destinations } from '../data/destinations';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader, DataTable, Accordion } from '../components/ui';
import Carousel from '../components/Carousel';
import { shipNameToSlug } from '../utils/widgetyHelpers';
import { useCruiseLineImage, useShipImage } from '../hooks/useImageUrl';
import { getCruiseLinePlaceholderImage } from '../utils/placeholderImages';
import './CruiseLinePage.css';

/**
 * Helper: Convert destination name to slug
 */
function destinationNameToSlug(name) {
  if (!name) return '';
  // Try to find in destinations data first
  const destination = destinations.find(d => 
    d.name.toLowerCase() === name.toLowerCase() ||
    d.name.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(d.name.toLowerCase())
  );
  if (destination) return destination.slug;
  
  // Fallback: generate slug from name
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-cruises';
}

/**
 * Helper: Map whyChoose item to gallery image type
 */
function mapWhyChooseToImage(whyChooseItem, galleryImages) {
  const title = whyChooseItem.title.toLowerCase();
  const description = whyChooseItem.description.toLowerCase();
  
  // Priority mapping - specific to cruise line content
  if (title.includes('fleet') || title.includes('ship') || description.includes('ship') || description.includes('mega-ship')) {
    return galleryImages.exterior || galleryImages.interior || null;
  }
  if (title.includes('dining') || title.includes('food') || title.includes('restaurant') || title.includes('culinary') || description.includes('dining') || description.includes('food') || description.includes('cuisine')) {
    return galleryImages.food || null;
  }
  if (title.includes('entertainment') || title.includes('show') || title.includes('theatre') || description.includes('entertainment') || description.includes('broadway')) {
    return galleryImages.entertainment || null;
  }
  if (title.includes('cabin') || title.includes('suite') || title.includes('stateroom') || description.includes('cabin') || description.includes('suite')) {
    return galleryImages.cabin || null;
  }
  if (title.includes('kids') || title.includes('club') || title.includes('family') || description.includes('kids') || description.includes('children')) {
    return galleryImages.entertainment || galleryImages.interior || null;
  }
  if (title.includes('pool') || title.includes('water') || title.includes('island') || title.includes('beach') || description.includes('pool') || description.includes('waterpark') || description.includes('island')) {
    return galleryImages.pool || galleryImages.exterior || null;
  }
  if (title.includes('value') || title.includes('service') || title.includes('luxury') || title.includes('all-inclusive') || description.includes('value') || description.includes('service')) {
    return galleryImages.pool || galleryImages.interior || null;
  }
  
  // Default fallback
  return galleryImages.interior || galleryImages.exterior || galleryImages.pool || null;
}

/**
 * Ship Card Component for Fleet Carousel
 */
function FleetShipCard({ ship, cruiseLineSlug, shipSlug, shipPageUrl, cruiseLineName }) {
  const { imageUrl: shipImageUrl, isPlaceholder } = useShipImage(cruiseLineSlug, shipSlug, 'card', ship);
  const hasImage = !isPlaceholder && !shipImageUrl.includes('placeholder');
  
  return (
    <Card 
      href={hasImage ? shipPageUrl : undefined}
      variant="default"
      className="fleet-ship-card"
      target={hasImage ? "_blank" : undefined}
      rel={hasImage ? "noopener noreferrer" : undefined}
      onClick={hasImage ? (e) => {
        e.preventDefault();
        window.open(shipPageUrl, '_blank', 'noopener,noreferrer');
      } : undefined}
    >
      {hasImage ? (
        <Card.Image 
          src={shipImageUrl} 
          alt={`${ship} - ${cruiseLineName}`}
          aspectRatio="4/3"
        />
      ) : (
        <div className="ship-card-placeholder">
          <p>Image Coming Soon</p>
        </div>
      )}
      <Card.Content>
        <Card.Title as="h3">{ship}</Card.Title>
        <Card.Description>
          {hasImage ? 'View Ship →' : 'Ship information coming soon'}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

/**
 * CruiseLinePage Template - SEO Optimized 7-Section Layout
 */
function CruiseLinePage() {
  const { slug } = useParams();
  const cruiseLine = getCruiseLineBySlug(slug);

  // Load all gallery images - MUST be called before early return (React hooks rules)
  const exteriorImage = useCruiseLineImage(cruiseLine?.slug || '', 'exterior', cruiseLine?.name || '');
  const interiorImage = useCruiseLineImage(cruiseLine?.slug || '', 'interior', cruiseLine?.name || '');
  const entertainmentImage = useCruiseLineImage(cruiseLine?.slug || '', 'entertainment', cruiseLine?.name || '');
  const foodImage = useCruiseLineImage(cruiseLine?.slug || '', 'food', cruiseLine?.name || '');
  const cabinImage = useCruiseLineImage(cruiseLine?.slug || '', 'cabin', cruiseLine?.name || '');
  const poolImage = useCruiseLineImage(cruiseLine?.slug || '', 'pool', cruiseLine?.name || '');
  const logoImage = useCruiseLineImage(cruiseLine?.slug || '', 'logo', cruiseLine?.name || '');

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

  const galleryImages = {
    exterior: exteriorImage.imageUrl,
    interior: interiorImage.imageUrl,
    entertainment: entertainmentImage.imageUrl,
    food: foodImage.imageUrl,
    cabin: cabinImage.imageUrl,
    pool: poolImage.imageUrl
  };

  // Check if adults-only
  const isAdultsOnly = cruiseLine.suitableFor?.some(item => 
    item.toLowerCase().includes('adults') || item.toLowerCase().includes('adults-only')
  ) && !cruiseLine.suitableFor?.some(item => item.toLowerCase().includes('families'));

  // SEO Meta
  const seoTitle = `${cruiseLine.name} Cruises 2026 | Kids Clubs, Ships & Loyalty Programme`;
  const seoDescription = `${cruiseLine.name} cruise guide: best kids clubs, full fleet, loyalty benefits, top destinations. Book ${cruiseLine.name} holidays`;

  // Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: cruiseLine.name,
    description: cruiseLine.description,
    url: `https://www.limitlesscruises.com/cruise-lines/${cruiseLine.slug}`
  };

  return (
    <main className="cruise-line-page cruise-line-page-seo">
      {/* SEO */}
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`https://www.limitlesscruises.com/cruise-lines/${cruiseLine.slug}`}
        structuredData={structuredData}
      />

      {/* Section 1: Hero */}
      <section className="cruise-line-hero-section">
        <div className="cruise-line-hero-wrapper">
      <HeroSection
            title={`${cruiseLine.name} Cruises | Ships, Kids Clubs & Loyalty Guide 2026`}
            subtitle={cruiseLine.tagline}
            image={null}
            imageAlt=""
        size="md"
        align="left"
            primaryCta={{ label: `Call Free ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
            secondaryCta={{ label: `Find ${cruiseLine.name} Cruises`, to: '/find-a-cruise' }}
          />
          {logoImage.imageUrl && !logoImage.imageUrl.includes('placeholder') && (
            <div className="cruise-line-hero-logo">
              <img src={logoImage.imageUrl} alt={`${cruiseLine.name} logo`} />
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Why Choose [Line] - Image Cards */}
      {cruiseLine.whyChoose && cruiseLine.whyChoose.length > 0 && (
        <section className="cruise-line-section">
          <div className="container">
            <SectionHeader
              title={`Why Choose ${cruiseLine.name}?`}
              align="center"
            />
            <div className="why-choose-grid">
              {cruiseLine.whyChoose.map((item, index) => {
                const matchedImage = mapWhyChooseToImage(item, galleryImages);
                // Use placeholder if no valid image found
                const imageUrl = (matchedImage && !matchedImage.includes('placeholder'))
                  ? matchedImage
                  : (galleryImages.interior && !galleryImages.interior.includes('placeholder'))
                    ? galleryImages.interior
                    : (galleryImages.exterior && !galleryImages.exterior.includes('placeholder'))
                      ? galleryImages.exterior
                      : getCruiseLinePlaceholderImage(cruiseLine.slug, 'card');
                
                return (
                  <Card key={index} variant="default" className="why-choose-card">
                    <Card.Image 
                      src={imageUrl} 
                      alt={item.title}
                      aspectRatio="4/3"
                    />
                  <Card.Content>
                    <Card.Title as="h3">{item.title}</Card.Title>
                    <Card.Description>{item.description}</Card.Description>
                  </Card.Content>
                </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Our Fleet - Carousel */}
      {cruiseLine.ships && cruiseLine.ships.length > 0 && (
        <section className="cruise-line-section section-alt">
          <div className="container">
            <SectionHeader
              title={`The ${cruiseLine.shortName} Fleet`}
              subtitle={`Explore the ships of ${cruiseLine.name}`}
              align="center"
            />
            <Carousel itemsToShow={3} layout="grid">
              {cruiseLine.ships.map((ship, index) => {
                const shipSlug = shipNameToSlug(ship);
                const shipPageUrl = `/ships/${shipSlug}`;
                return (
                  <FleetShipCard
                    key={index}
                    ship={ship}
                    cruiseLineSlug={cruiseLine.slug}
                    shipSlug={shipSlug}
                    shipPageUrl={shipPageUrl}
                    cruiseLineName={cruiseLine.name}
                  />
                );
              })}
            </Carousel>
          </div>
        </section>
      )}

      {/* Section 4: Top Destinations - Top 5 Pills */}
      {cruiseLine.destinationImages && cruiseLine.destinationImages.length > 0 && (
        <section className="cruise-line-section">
          <div className="container">
            <SectionHeader
              title={`Where ${cruiseLine.shortName} Sails Most`}
              align="center"
            />
            <div className="destinations-pills-row">
              {cruiseLine.destinationImages.slice(0, 5).map((dest, index) => {
                const destSlug = destinationNameToSlug(dest.name);
                return (
                  <a
                    key={index}
                    href={`/destinations/${destSlug}`}
                    className="destination-pill"
                  >
                    {dest.name} →
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Families & Kids - ALWAYS SHOW */}
      <section className="cruise-line-section section-alt">
          <div className="container">
          <div className="families-kids-content">
            <div className="families-kids-images">
              {isAdultsOnly ? (
                <>
                  <div className="families-kids-image">
                    <img 
                      src={
                        (galleryImages.interior && !galleryImages.interior.includes('placeholder')) 
                          ? galleryImages.interior 
                          : (galleryImages.exterior && !galleryImages.exterior.includes('placeholder'))
                            ? galleryImages.exterior
                            : getCruiseLinePlaceholderImage(cruiseLine.slug, 'card')
                      } 
                      alt="Adults-only relaxation"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="families-kids-image">
                    <img 
                      src={
                        (galleryImages.exterior && !galleryImages.exterior.includes('placeholder'))
                          ? galleryImages.exterior
                          : (galleryImages.interior && !galleryImages.interior.includes('placeholder'))
                            ? galleryImages.interior
                            : getCruiseLinePlaceholderImage(cruiseLine.slug, 'card')
                      } 
                      alt="Adults-only pool area"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="families-kids-image">
                    <img 
                      src={
                        (galleryImages.entertainment && !galleryImages.entertainment.includes('placeholder'))
                          ? galleryImages.entertainment
                          : (galleryImages.interior && !galleryImages.interior.includes('placeholder'))
                            ? galleryImages.interior
                            : getCruiseLinePlaceholderImage(cruiseLine.slug, 'card')
                      } 
                      alt="Kids club activities"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                  <div className="families-kids-image">
                    <img 
                      src={
                        (galleryImages.interior && !galleryImages.interior.includes('placeholder'))
                          ? galleryImages.interior
                          : (galleryImages.entertainment && !galleryImages.entertainment.includes('placeholder'))
                            ? galleryImages.entertainment
                            : getCruiseLinePlaceholderImage(cruiseLine.slug, 'card')
                      } 
                      alt="Family-friendly facilities"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="families-kids-text">
              <h2>Is {cruiseLine.name} Good for Families?</h2>
              {isAdultsOnly || cruiseLine.kidsClub === null ? (
                <div className="adults-only-message">
                  <p><strong>Adults-only experience (16+ minimum age)</strong></p>
                  <p>
                    {cruiseLine.kidsClub === null 
                      ? `${cruiseLine.name} offers a sophisticated adults-only experience (16+) perfect for mature travellers, couples, and multi-generational groups seeking relaxed elegance. No dedicated kids clubs as all ships operate adults-only policy. Focus on destination immersion, guest lectures, classical music, and evening ballroom dancing. Intergenerational appeal for grandparents with adult children/grandchildren. Perfect for discerning British travellers seeking small-ship intimacy without family facilities.`
                      : `${cruiseLine.name} offers a sophisticated, adults-only cruise experience perfect for couples and groups seeking peaceful, child-free relaxation.`
                    }
                  </p>
                </div>
              ) : cruiseLine.kidsClub ? (
                <>
                  <p>{cruiseLine.kidsClub.intro}</p>
                  {cruiseLine.kidsClub.ageGroups && (
                    <div className="kids-club-table">
                              <DataTable
                                columns={[
                                  { key: 'age', label: 'Age' },
                          { key: 'club', label: 'Club Name' },
                                  { key: 'morning', label: 'Morning' },
                                  { key: 'afternoon', label: 'Afternoon' },
                                  { key: 'evening', label: 'Evening' }
                                ]}
                                rows={cruiseLine.kidsClub.ageGroups}
                                variant="striped"
                                compact
                              />
                            </div>
                  )}
                </>
              ) : (
                <p>{cruiseLine.name} welcomes families with dedicated kids' facilities and family-friendly activities.</p>
              )}
            </div>
            </div>
          </div>
        </section>

      {/* Section 6: Loyalty Programme - ALWAYS SHOW */}
      <section className="cruise-line-section">
          <div className="container">
          <div className="loyalty-content">
            <div className="loyalty-text">
              {cruiseLine.loyaltyProgram ? (
                <>
                  <h2>Join {cruiseLine.name} {cruiseLine.loyaltyProgram.name}</h2>
                  <p>{cruiseLine.loyaltyProgram.intro}</p>
                  {cruiseLine.loyaltyProgram.tiers && (
                    <div className="loyalty-table">
                              <DataTable
                                columns={[
                                  { key: 'tier', label: 'Tier' },
                                  { key: 'points', label: 'Points' },
                          { key: 'benefits', label: 'Benefits' }
                                ]}
                                rows={cruiseLine.loyaltyProgram.tiers}
                                variant="striped"
                                compact
                              />
                    </div>
                  )}
                              {cruiseLine.loyaltyProgram.pointsInfo && (
                    <div className="loyalty-key-benefits">
                      <h3>Key Benefits</h3>
                      <p>{cruiseLine.loyaltyProgram.pointsInfo}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2>Join {cruiseLine.name} Loyalty Programme</h2>
                  <p>{cruiseLine.name} offers a loyalty programme to reward repeat guests with exclusive benefits, discounts, and special recognition. Contact us to learn more about membership tiers and benefits.</p>
                </>
              )}
            </div>
            </div>
          </div>
        </section>

      {/* Section 7: FAQ - SEO Gold */}
      <section className="cruise-line-section section-alt">
          <div className="container">
            <SectionHeader
            title={`Frequently Asked Questions about ${cruiseLine.name}`}
            subtitle="Everything you need to know before booking"
              align="center"
          />
          <div className="cruise-line-faq">
            <Accordion
              items={
                cruiseLine.faq && cruiseLine.faq.length > 0
                  ? cruiseLine.faq.map((item, index) => ({
                      id: `faq-${index + 1}`,
                      title: item.question,
                      content: item.answer
                    }))
                  : [
                      {
                        id: 'faq-1',
                        title: `What makes ${cruiseLine.name} different from other cruise lines?`,
                        content: (() => {
                          const taglinePart = cruiseLine.tagline ? ` - ${cruiseLine.tagline}` : ' offers a unique cruise experience';
                          const descPart = cruiseLine.description || (() => {
                            const focus = cruiseLine.category === 'luxury' ? 'luxury and sophistication' : 
                                         cruiseLine.category === 'premium' ? 'premium service and comfort' : 
                                         'value and family-friendly experiences';
                            return `With a focus on ${focus}, ${cruiseLine.name} provides exceptional service and memorable voyages.`;
                          })();
                          return `${cruiseLine.name}${taglinePart}. ${descPart}`;
                        })()
                      },
                      {
                        id: 'faq-2',
                        title: `What destinations does ${cruiseLine.name} sail to?`,
                        content: (() => {
                          const destPart = cruiseLine.destinationImages && cruiseLine.destinationImages.length > 0
                            ? `destinations including ${cruiseLine.destinationImages.slice(0, 3).map(d => d.name).join(', ')}`
                            : 'a wide range of destinations worldwide';
                          const portType = cruiseLine.category === 'luxury' ? 'exotic' : 'popular';
                          return `${cruiseLine.name} offers cruises to ${destPart}. From ${portType} ports to hidden gems, there's an itinerary to suit every traveller.`;
                        })()
                      },
                      {
                        id: 'faq-3',
                        title: `Is ${cruiseLine.name} suitable for families?`,
                        content: isAdultsOnly 
                          ? `${cruiseLine.name} is an adults-only cruise line, perfect for couples and groups seeking a child-free, sophisticated cruise experience.`
                          : (() => {
                              const facilities = cruiseLine.kidsClub 
                                ? `offers excellent family facilities including ${cruiseLine.kidsClub.name || 'dedicated kids clubs'}`
                                : 'welcomes families';
                              const activities = cruiseLine.kidsClub 
                                ? 'age-appropriate activities and programs'
                                : 'family-friendly amenities and activities';
                              return `${cruiseLine.name} ${facilities} with ${activities}.`;
                            })()
                      },
                      {
                        id: 'faq-4',
                        title: `What is included in a ${cruiseLine.name} cruise?`,
                        content: (() => {
                          const amenities = cruiseLine.kidsClub ? 'kids club access' : 'access to onboard amenities';
                          const extras = cruiseLine.category === 'luxury' 
                            ? 'Many luxury amenities, premium dining, and beverages may also be included.'
                            : 'Additional services like specialty dining, spa treatments, and shore excursions are available at extra cost.';
                          return `A ${cruiseLine.name} cruise typically includes accommodation, main dining, entertainment, use of pools and fitness facilities, and ${amenities}. ${extras}`;
                        })()
                      },
                      {
                        id: 'faq-5',
                        title: `How do I join ${cruiseLine.name}'s loyalty programme?`,
                        content: cruiseLine.loyaltyProgram
                          ? `Join ${cruiseLine.loyaltyProgram.name} by sailing with ${cruiseLine.name}. ${cruiseLine.loyaltyProgram.intro || 'Earn points with each cruise and unlock exclusive benefits, discounts, and recognition as you progress through the tiers.'}`
                          : `${cruiseLine.name} offers a loyalty programme to reward repeat guests. Contact us to learn more about membership benefits and how to join.`
                      },
                      {
                        id: 'faq-6',
                        title: `What should I know before booking a ${cruiseLine.name} cruise?`,
                        content: `Before booking, consider your preferred destinations, travel dates, and cabin type. ${cruiseLine.category === 'luxury' ? 'Luxury cruises offer all-inclusive experiences with premium amenities.' : cruiseLine.category === 'premium' ? 'Premium cruises balance comfort and value with enhanced service.' : 'Mainstream cruises offer great value with family-friendly options.'} Our cruise consultants can help you find the perfect ${cruiseLine.name} itinerary for your needs.`
                      }
                    ]
              }
              allowMultiple={true}
            />
          </div>
          </div>
        </section>

      {/* Section 8: CTA */}
      <section className="cruise-line-cta section-dark">
        <div className="container">
          <div className="cta-content">
            <h2>Book your {cruiseLine.name} cruise today</h2>
            <div className="cta-buttons">
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
              <Button to="/find-a-cruise" variant="outline" size="lg" className="btn-outline-white">
                Find Cruises
              </Button>
            </div>
            <div className="trust-badges">
              <span>ABTA Protected</span>
              <span>ATOL Protected</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CruiseLinePage;
