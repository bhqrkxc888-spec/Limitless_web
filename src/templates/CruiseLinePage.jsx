import { useParams } from 'react-router-dom';
import { getCruiseLineBySlug } from '../data/cruiseLines';
import { destinations } from '../data/destinations';
import { siteConfig } from '../config/siteConfig';
import SEO, { getBreadcrumbSchema } from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader, DataTable, Accordion } from '../components/ui';
import Carousel from '../components/Carousel';
import { shipNameToSlug } from '../utils/widgetyHelpers';
import { useCruiseLineImage, useShipImage } from '../hooks/useImageUrl';
import { getCruiseLinePlaceholderImage } from '../utils/placeholderImages';
import { PLACEHOLDER_IMAGE } from '../config/assetUrls';
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
 * Ship Card Component for Fleet Carousel
 * Images are loaded from: WEB_cruise-lines/{cruiseLineSlug}/ships/{shipSlug}/card.webp
 * All images managed via Admin → Images → Cruise Lines & Ships
 */
function FleetShipCard({ ship, cruiseLineSlug, shipSlug, cruiseLineName }) {
  const { imageUrl: shipImageUrl, isPlaceholder } = useShipImage(cruiseLineSlug, shipSlug, 'card', ship);
  
  // Show image if we have a valid URL (not a placeholder)
  // Card.Image component handles 404 errors gracefully
  const hasImage = !isPlaceholder && 
                   shipImageUrl && 
                   shipImageUrl !== PLACEHOLDER_IMAGE && 
                   !shipImageUrl.includes('placeholder');
  
  return (
    <Card 
      variant="default"
      className="fleet-ship-card"
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
          {hasImage ? `${cruiseLineName} ship` : 'Ship information coming soon'}
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

  // Load all images - MUST be called before early return (React hooks rules)
  // Why Choose images (one per card - 6 images)
  const whyChoose1Image = useCruiseLineImage(cruiseLine?.slug || '', 'why-choose-1', cruiseLine?.name || '');
  const whyChoose2Image = useCruiseLineImage(cruiseLine?.slug || '', 'why-choose-2', cruiseLine?.name || '');
  const whyChoose3Image = useCruiseLineImage(cruiseLine?.slug || '', 'why-choose-3', cruiseLine?.name || '');
  const whyChoose4Image = useCruiseLineImage(cruiseLine?.slug || '', 'why-choose-4', cruiseLine?.name || '');
  const whyChoose5Image = useCruiseLineImage(cruiseLine?.slug || '', 'why-choose-5', cruiseLine?.name || '');
  const whyChoose6Image = useCruiseLineImage(cruiseLine?.slug || '', 'why-choose-6', cruiseLine?.name || '');
  // Families & Kids images (2 specific images)
  const familiesKids1Image = useCruiseLineImage(cruiseLine?.slug || '', 'families-kids-1', cruiseLine?.name || '');
  const familiesKids2Image = useCruiseLineImage(cruiseLine?.slug || '', 'families-kids-2', cruiseLine?.name || '');
  // Logo
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

  // Why Choose images array (direct mapping - one image per card)
  const whyChooseImages = [
    whyChoose1Image.imageUrl,
    whyChoose2Image.imageUrl,
    whyChoose3Image.imageUrl,
    whyChoose4Image.imageUrl,
    whyChoose5Image.imageUrl,
    whyChoose6Image.imageUrl
  ];

  // Check if adults-only
  const isAdultsOnly = cruiseLine.suitableFor?.some(item => 
    item.toLowerCase().includes('adults') || item.toLowerCase().includes('adults-only')
  ) && !cruiseLine.suitableFor?.some(item => item.toLowerCase().includes('families'));

  // SEO Meta
  const seoTitle = `${cruiseLine.name} Cruises 2026 | Kids Clubs, Ships & Loyalty Programme`;
  const seoDescription = `${cruiseLine.name} cruise guide: best kids clubs, full fleet, loyalty benefits, top destinations. Book ${cruiseLine.name} holidays`;

  // Structured Data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: cruiseLine.name,
    description: cruiseLine.description,
    url: `https://www.limitlesscruises.com/cruise-lines/${cruiseLine.slug}`
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.limitlesscruises.com/' },
    { name: 'Cruise Lines', url: 'https://www.limitlesscruises.com/cruise-lines' },
    { name: cruiseLine.name, url: `https://www.limitlesscruises.com/cruise-lines/${cruiseLine.slug}` }
  ]);

  const structuredData = [organizationSchema, breadcrumbSchema];

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
      {/* All images managed via Admin → Images → Cruise Lines & Ships */}
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
      {/* Images: why-choose-1 through why-choose-6 (one per card, upload via Admin → Images → Cruise Lines & Ships) */}
      {cruiseLine.whyChoose && cruiseLine.whyChoose.length > 0 && (
        <section className="cruise-line-section">
          <div className="container">
            <SectionHeader
              title={`Why Choose ${cruiseLine.name}?`}
              align="center"
            />
            <div className="why-choose-grid">
              {cruiseLine.whyChoose.map((item, index) => {
                // Direct mapping - each card has its own specific image (why-choose-1, why-choose-2, etc.)
                const imageUrl = (whyChooseImages[index] && !whyChooseImages[index].includes('placeholder'))
                  ? whyChooseImages[index]
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
      {/* Ship card images: Upload via Admin → Images → Cruise Lines & Ships → Select Cruise Line → Ship Card Images */}
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
                return (
                  <FleetShipCard
                    key={index}
                    ship={ship}
                    cruiseLineSlug={cruiseLine.slug}
                    shipSlug={shipSlug}
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
      {/* Images: families-kids-1, families-kids-2 (upload via Admin → Images → Cruise Lines & Ships) */}
      <section className="cruise-line-section section-alt">
        <div className="container">
          <div className="families-kids-content">
            <div className="families-kids-images">
              <div className="families-kids-image">
                <img 
                  src={
                    (familiesKids1Image.imageUrl && !familiesKids1Image.imageUrl.includes('placeholder'))
                      ? familiesKids1Image.imageUrl
                      : getCruiseLinePlaceholderImage(cruiseLine.slug, 'card')
                  } 
                  alt={isAdultsOnly ? "Adults-only relaxation" : "Pool / Family Entertainment"}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="families-kids-image">
                <img 
                  src={
                    (familiesKids2Image.imageUrl && !familiesKids2Image.imageUrl.includes('placeholder'))
                      ? familiesKids2Image.imageUrl
                      : getCruiseLinePlaceholderImage(cruiseLine.slug, 'card')
                  } 
                  alt={isAdultsOnly ? "Adults-only pool area" : "Kids Entertainment / Kids Club"}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
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
                <p>{cruiseLine.kidsClub.intro}</p>
              ) : (
                <p>{cruiseLine.name} welcomes families with dedicated kids' facilities and family-friendly activities.</p>
              )}
            </div>
          </div>
          {/* Kids Club Table - Full Width Below 2-Column Layout */}
          {cruiseLine.kidsClub && cruiseLine.kidsClub.ageGroups && !isAdultsOnly && (
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

      {/* Disclaimer Section */}
      <section className="cruise-line-section">
        <div className="container">
          <div className="cruise-line-disclaimer">
            <p>
              <strong>Please Note:</strong> The images, facilities, and amenities shown on this page are general representations of {cruiseLine.name}'s offerings. Individual ships may vary in specific features, layouts, dining venues, entertainment options, and onboard facilities. Ship features, activities, bars, restaurants, and amenities may differ between vessels within the fleet. For specific details about a particular ship, please contact us or refer to individual ship information pages.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CruiseLinePage;
