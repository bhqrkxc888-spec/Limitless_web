/**
 * Ship Guide Page Template
 * Comprehensive cruise ship guide with tabbed navigation
 * Similar architecture to Port Guides for consistency
 * 
 * Tabs: Overview, Cabins, Deckplans, Onboard, Food & Drink, Entertainment,
 *       Activities, Family, Kids, Accessibility, Wellness, FAQ
 */

import { useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShipGuide } from '../hooks/useShipGuide';
import { siteConfig } from '../config/siteConfig';
import SEO, { getBreadcrumbSchema } from '../components/SEO';
import HeroSection from '../components/HeroSection';
import OptimizedImage from '../components/OptimizedImage';
import { Button, SectionHeader } from '../components/ui';
import SocialShare from '../components/SocialShare';
import { 
  Eye, Bed, Map, Ship, Utensils, Music, Activity, Users, 
  Baby, Accessibility, Heart, HelpCircle, Anchor, ChevronRight,
  Star, Calendar, Ruler, Users2, Loader2
} from 'lucide-react';
import './ShipGuidePage.css';

// Ship guide section definitions
const SHIP_SECTIONS = [
  { key: 'overview', label: 'Overview', icon: Eye },
  { key: 'cabins', label: 'Cabins', icon: Bed },
  { key: 'deckplans', label: 'Deck Plans', icon: Map },
  { key: 'onboard', label: 'Onboard', icon: Ship },
  { key: 'dining', label: 'Food & Drink', icon: Utensils },
  { key: 'entertainment', label: 'Entertainment', icon: Music },
  { key: 'activities', label: 'Activities', icon: Activity },
  { key: 'family', label: 'Family', icon: Users },
  { key: 'kids', label: 'Kids', icon: Baby },
  { key: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { key: 'wellness', label: 'Wellness', icon: Heart },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
];

function ShipGuidePage() {
  const { slug } = useParams();
  const { ship, ratings, loading, error } = useShipGuide(slug);
  const [activeSection, setActiveSection] = useState('overview');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const scrollAnchorRef = useRef(null);

  // Tab click handler - update state and scroll to anchor
  const handleTabChange = (sectionKey) => {
    setActiveSection(sectionKey);
    setHasUserInteracted(true);
    requestAnimationFrame(() => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  // Check which sections have content
  const hasContent = useMemo(() => {
    if (!ship) return {};
    return {
      overview: true, // Always show overview
      cabins: !!ship.cabins && Object.keys(ship.cabins).length > 0,
      deckplans: !!ship.deck_plans && ship.deck_plans.length > 0,
      onboard: !!ship.onboard && Object.keys(ship.onboard).length > 0,
      dining: !!ship.dining && Object.keys(ship.dining).length > 0,
      entertainment: !!ship.entertainment && Object.keys(ship.entertainment).length > 0,
      activities: !!ship.activities && Object.keys(ship.activities).length > 0,
      family: !!ship.family && Object.keys(ship.family).length > 0,
      kids: !!ship.kids && Object.keys(ship.kids).length > 0,
      accessibility: !!ship.accessibility && Object.keys(ship.accessibility).length > 0,
      wellness: !!ship.wellness && Object.keys(ship.wellness).length > 0,
      faq: !!ship.faq && ship.faq.length > 0,
    };
  }, [ship]);

  // Filter to only show tabs with content
  const availableSections = SHIP_SECTIONS.filter(section => hasContent[section.key]);

  // Structured data for SEO
  const structuredData = useMemo(() => {
    if (!ship) return null;

    const shipSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: ship.display_name || ship.name,
      description: ship.meta_description || ship.description,
      url: `https://www.limitlesscruises.com/ships/${ship.slug}`,
      image: ship.hero_image_url || ship.card_image_url,
      brand: {
        '@type': 'Organization',
        name: ship.cruise_line_name
      },
      category: 'Cruise Ship',
      ...(ratings?.count >= 5 ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: ratings.average,
          reviewCount: ratings.count,
          bestRating: 5,
          worstRating: 1
        }
      } : {})
    };

    // FAQ Schema
    const faqSchema = ship.faq?.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ship.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    } : null;

    // Breadcrumb schema
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.limitlesscruises.com/' },
      { name: 'Ships', url: 'https://www.limitlesscruises.com/ships' },
      { name: ship.display_name || ship.name, url: `https://www.limitlesscruises.com/ships/${ship.slug}` }
    ]);

    return faqSchema 
      ? [shipSchema, faqSchema, breadcrumbSchema]
      : [shipSchema, breadcrumbSchema];
  }, [ship, ratings]);

  // Loading state
  if (loading) {
    return (
      <main className="ship-guide-page">
        <SEO title="Loading Ship Guide..." />
        <div className="container section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Loader2 size={48} className="loading-spinner" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      </main>
    );
  }

  // Error state
  if (error || !ship) {
    return (
      <main className="ship-guide-page">
        <SEO title="Ship Guide Not Found" />
        <div className="container section">
          <div className="ship-not-found">
            <Anchor size={64} className="not-found-icon" />
            <h1>Ship Guide Not Found</h1>
            <p>Sorry, we couldn't find the ship guide you're looking for.</p>
            <Button to="/ships">View All Ships</Button>
          </div>
        </div>
      </main>
    );
  }

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection ship={ship} ratings={ratings} />;
      case 'cabins':
        return <CabinsSection cabins={ship.cabins} shipName={ship.name} />;
      case 'deckplans':
        return <DeckPlansSection deckPlans={ship.deck_plans} shipName={ship.name} />;
      case 'onboard':
        return <OnboardSection onboard={ship.onboard} />;
      case 'dining':
        return <DiningSection dining={ship.dining} />;
      case 'entertainment':
        return <EntertainmentSection entertainment={ship.entertainment} />;
      case 'activities':
        return <ActivitiesSection activities={ship.activities} />;
      case 'family':
        return <FamilySection family={ship.family} />;
      case 'kids':
        return <KidsSection kids={ship.kids} />;
      case 'accessibility':
        return <AccessibilitySection accessibility={ship.accessibility} />;
      case 'wellness':
        return <WellnessSection wellness={ship.wellness} />;
      case 'faq':
        return <FAQSection faq={ship.faq} shipName={ship.name} />;
      default:
        return <OverviewSection ship={ship} ratings={ratings} />;
    }
  };

  return (
    <main className="ship-guide-page">
      {/* SEO */}
      <SEO
        title={ship.meta_title || `${ship.display_name || ship.name} | ${ship.cruise_line_name} Ship Guide`}
        description={ship.meta_description || ship.description || `Complete guide to ${ship.name}. Discover cabins, dining, entertainment, activities, and everything you need to know before sailing.`}
        canonical={`https://www.limitlesscruises.com/ships/${ship.slug}`}
        keywords={ship.meta_keywords?.join(', ') || `${ship.name}, ${ship.cruise_line_name}, cruise ship, ship guide`}
        image={ship.hero_image_url || ship.card_image_url}
        type="article"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={ship.display_name || ship.name}
        subtitle={ship.tagline || `${ship.cruise_line_name}`}
        image={ship.hero_image_url}
        imageAlt={`${ship.name} cruise ship`}
        size="md"
        align="left"
      />

      {/* Main Content */}
      <article className="ship-content">
        <div className="container">
          
          {/* Share and Breadcrumb Row */}
          <div className="ship-header-actions">
            <Link to="/ships" className="ship-back-link">
              <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              All Ships
            </Link>
            <SocialShare
              url={`https://www.limitlesscruises.com/ships/${ship.slug}`}
              title={`${ship.name} Ship Guide | ${ship.cruise_line_name}`}
              description={ship.description || `Complete guide to ${ship.name}`}
            />
          </div>

          {/* Section Tabs - Scrollable */}
          <nav className="ship-section-tabs" aria-label="Ship guide sections">
            <div className="ship-tabs-scroll">
              {availableSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.key;
                
                return (
                  <button
                    key={section.key}
                    onClick={() => handleTabChange(section.key)}
                    className={`ship-section-tab ${isActive ? 'active' : ''}`}
                    aria-pressed={isActive}
                    aria-label={`View ${section.label} section`}
                  >
                    <Icon size={16} className="tab-icon" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Scroll anchor */}
          <div 
            ref={scrollAnchorRef} 
            className={hasUserInteracted ? 'scroll-anchor' : 'scroll-anchor-inactive'} 
            aria-hidden="true" 
          />

          {/* Section Content */}
          <div className="ship-section-content">
            {renderSectionContent()}
          </div>

        </div>
      </article>

      {/* CTA Section */}
      <section className="ship-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Sail on {ship.name}?</h2>
            <p>
              Speak with our cruise consultants to find the perfect {ship.cruise_line_name} itinerary.
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

      {/* Footer Navigation */}
      <section className="ship-navigation-footer">
        <div className="container">
          <div className="ship-nav-links">
            <Link to="/ships" className="ship-nav-link">
              Back to All Ships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========================================
   SECTION COMPONENTS
   ======================================== */

function SubSection({ title, children }) {
  return (
    <div className="ship-subsection">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function OverviewSection({ ship, ratings }) {
  return (
    <div className="section-overview">
      <div className="section-intro">
        <h2>Welcome Aboard {ship.display_name || ship.name}</h2>
      </div>

      {/* Ship Stats */}
      <div className="ship-stats-grid">
        {ship.year_built && (
          <div className="ship-stat">
            <Calendar size={20} />
            <div>
              <span className="stat-label">Built</span>
              <span className="stat-value">{ship.year_built}</span>
            </div>
          </div>
        )}
        {ship.passenger_capacity && (
          <div className="ship-stat">
            <Users2 size={20} />
            <div>
              <span className="stat-label">Guests</span>
              <span className="stat-value">{ship.passenger_capacity.toLocaleString()}</span>
            </div>
          </div>
        )}
        {ship.crew_count && (
          <div className="ship-stat">
            <Anchor size={20} />
            <div>
              <span className="stat-label">Crew</span>
              <span className="stat-value">{ship.crew_count.toLocaleString()}</span>
            </div>
          </div>
        )}
        {ship.deck_count && (
          <div className="ship-stat">
            <Map size={20} />
            <div>
              <span className="stat-label">Decks</span>
              <span className="stat-value">{ship.deck_count}</span>
            </div>
          </div>
        )}
        {ship.gross_tonnage && (
          <div className="ship-stat">
            <Ship size={20} />
            <div>
              <span className="stat-label">Tonnage</span>
              <span className="stat-value">{ship.gross_tonnage.toLocaleString()} GT</span>
            </div>
          </div>
        )}
        {ship.length_meters && (
          <div className="ship-stat">
            <Ruler size={20} />
            <div>
              <span className="stat-label">Length</span>
              <span className="stat-value">{ship.length_meters}m</span>
            </div>
          </div>
        )}
      </div>

      {/* Rating Summary */}
      {ratings?.count >= 5 && (
        <div className="ship-rating-summary">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                fill={star <= Math.round(ratings.average) ? '#B9953C' : 'none'}
                stroke="#B9953C"
              />
            ))}
          </div>
          <span className="rating-text">
            {ratings.average} out of 5 ({ratings.count} reviews)
          </span>
        </div>
      )}

      <hr className="section-divider" />

      {/* Description */}
      {ship.description && (
        <div className="ship-description">
          {ship.description.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      )}

      {/* Highlights */}
      {ship.highlights && ship.highlights.length > 0 && (
        <>
          <hr className="section-divider" />
          <SubSection title="Ship Highlights">
            <ul className="highlights-list">
              {ship.highlights.map((highlight, idx) => (
                <li key={idx}>
                  <Star size={16} fill="#B9953C" stroke="#B9953C" />
                  {highlight}
                </li>
              ))}
            </ul>
          </SubSection>
        </>
      )}

      {/* Overview Content */}
      {ship.overview_content && Object.keys(ship.overview_content).length > 0 && (
        <>
          {ship.overview_content.introduction && (
            <>
              <hr className="section-divider" />
              <SubSection title="About This Ship">
                <p>{ship.overview_content.introduction}</p>
              </SubSection>
            </>
          )}
          {ship.overview_content.ideal_for && (
            <>
              <hr className="section-divider" />
              <SubSection title="Ideal For">
                <p>{ship.overview_content.ideal_for}</p>
              </SubSection>
            </>
          )}
        </>
      )}
    </div>
  );
}

function CabinsSection({ cabins, shipName }) {
  if (!cabins || Object.keys(cabins).length === 0) {
    return <p>Cabin information coming soon.</p>;
  }

  return (
    <div className="section-cabins">
      <div className="section-intro">
        <h2>Cabins &amp; Staterooms</h2>
        <p>Accommodation options on {shipName}</p>
      </div>

      <hr className="section-divider" />

      {cabins.categories && cabins.categories.map((category, idx) => (
        <div key={idx} className="cabin-category">
          <h3>{category.name}</h3>
          {category.description && <p>{category.description}</p>}
          
          {category.types && category.types.length > 0 && (
            <div className="cabin-types-grid">
              {category.types.map((type, typeIdx) => (
                <div key={typeIdx} className="cabin-type-card">
                  {type.image && (
                    <div className="cabin-image">
                      <OptimizedImage src={type.image} alt={type.name} />
                    </div>
                  )}
                  <div className="cabin-details">
                    <h4>{type.name}</h4>
                    {type.size && <p className="cabin-size">Size: {type.size}</p>}
                    {type.sleeps && <p className="cabin-sleeps">Sleeps: {type.sleeps}</p>}
                    {type.features && (
                      <ul className="cabin-features">
                        {type.features.map((feature, fIdx) => (
                          <li key={fIdx}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <hr className="section-divider" />
        </div>
      ))}

      {cabins.tips && (
        <div className="tip-box">
          <strong>Cabin Tips</strong>
          <p>{cabins.tips}</p>
        </div>
      )}
    </div>
  );
}

function DeckPlansSection({ deckPlans, shipName }) {
  if (!deckPlans || deckPlans.length === 0) {
    return <p>Deck plans coming soon.</p>;
  }

  return (
    <div className="section-deckplans">
      <div className="section-intro">
        <h2>Deck Plans</h2>
        <p>Explore the decks of {shipName}</p>
      </div>

      <hr className="section-divider" />

      <div className="deck-plans-list">
        {deckPlans.map((deck, idx) => (
          <div key={idx} className="deck-item">
            <h3>Deck {deck.number}: {deck.name}</h3>
            {deck.highlights && deck.highlights.length > 0 && (
              <ul className="deck-highlights">
                {deck.highlights.map((highlight, hIdx) => (
                  <li key={hIdx}>{highlight}</li>
                ))}
              </ul>
            )}
            {deck.image && (
              <div className="deck-image">
                <OptimizedImage src={deck.image} alt={`Deck ${deck.number} - ${deck.name}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function OnboardSection({ onboard }) {
  if (!onboard || Object.keys(onboard).length === 0) {
    return <p>Onboard information coming soon.</p>;
  }

  return (
    <div className="section-onboard">
      <div className="section-intro">
        <h2>Onboard Experience</h2>
        <p>What to expect when you sail</p>
      </div>

      <hr className="section-divider" />

      {onboard.introduction && (
        <div className="onboard-intro">
          <p>{onboard.introduction}</p>
        </div>
      )}

      {onboard.amenities && onboard.amenities.length > 0 && (
        <>
          <SubSection title="Ship Amenities">
            <div className="amenities-grid">
              {onboard.amenities.map((amenity, idx) => (
                <div key={idx} className="amenity-card">
                  <h4>{amenity.name}</h4>
                  <p>{amenity.description}</p>
                  {amenity.location && <p className="amenity-location">Location: {amenity.location}</p>}
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {onboard.tips && (
        <div className="tip-box">
          <strong>Onboard Tips</strong>
          <p>{onboard.tips}</p>
        </div>
      )}
    </div>
  );
}

function DiningSection({ dining }) {
  if (!dining || Object.keys(dining).length === 0) {
    return <p>Dining information coming soon.</p>;
  }

  return (
    <div className="section-dining">
      <div className="section-intro">
        <h2>Food &amp; Drink</h2>
        <p>Restaurants, bars, and culinary experiences</p>
      </div>

      <hr className="section-divider" />

      {dining.introduction && (
        <div className="dining-intro">
          <p>{dining.introduction}</p>
        </div>
      )}

      {dining.restaurants && dining.restaurants.length > 0 && (
        <>
          <SubSection title="Restaurants">
            <div className="venue-grid">
              {dining.restaurants.map((restaurant, idx) => (
                <div key={idx} className="venue-card">
                  {restaurant.image && (
                    <div className="venue-image">
                      <OptimizedImage src={restaurant.image} alt={restaurant.name} />
                    </div>
                  )}
                  <div className="venue-details">
                    <h4>{restaurant.name}</h4>
                    {restaurant.cuisine && <p className="venue-type">{restaurant.cuisine}</p>}
                    <p>{restaurant.description}</p>
                    {restaurant.dress_code && <p className="venue-dress">Dress: {restaurant.dress_code}</p>}
                    {restaurant.cost && <p className="venue-cost">{restaurant.cost}</p>}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {dining.bars && dining.bars.length > 0 && (
        <>
          <SubSection title="Bars &amp; Lounges">
            <div className="venue-grid">
              {dining.bars.map((bar, idx) => (
                <div key={idx} className="venue-card venue-card--small">
                  <h4>{bar.name}</h4>
                  <p>{bar.description}</p>
                  {bar.specialties && <p className="venue-specialties">Known for: {bar.specialties}</p>}
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {dining.room_service && (
        <>
          <SubSection title="Room Service">
            <p>{dining.room_service}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {dining.dietary && (
        <div className="tip-box">
          <strong>Dietary Requirements</strong>
          <p>{dining.dietary}</p>
        </div>
      )}
    </div>
  );
}

function EntertainmentSection({ entertainment }) {
  if (!entertainment || Object.keys(entertainment).length === 0) {
    return <p>Entertainment information coming soon.</p>;
  }

  return (
    <div className="section-entertainment">
      <div className="section-intro">
        <h2>Entertainment</h2>
        <p>Shows, music, and nightlife</p>
      </div>

      <hr className="section-divider" />

      {entertainment.introduction && (
        <div className="entertainment-intro">
          <p>{entertainment.introduction}</p>
        </div>
      )}

      {entertainment.venues && entertainment.venues.length > 0 && (
        <>
          <SubSection title="Entertainment Venues">
            <div className="venue-grid">
              {entertainment.venues.map((venue, idx) => (
                <div key={idx} className="venue-card">
                  <h4>{venue.name}</h4>
                  <p>{venue.description}</p>
                  {venue.capacity && <p className="venue-capacity">Capacity: {venue.capacity}</p>}
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {entertainment.shows && entertainment.shows.length > 0 && (
        <>
          <SubSection title="Shows &amp; Productions">
            <ul className="shows-list">
              {entertainment.shows.map((show, idx) => (
                <li key={idx}>{show}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {entertainment.live_music && (
        <>
          <SubSection title="Live Music">
            <p>{entertainment.live_music}</p>
          </SubSection>
        </>
      )}
    </div>
  );
}

function ActivitiesSection({ activities }) {
  if (!activities || Object.keys(activities).length === 0) {
    return <p>Activities information coming soon.</p>;
  }

  return (
    <div className="section-activities">
      <div className="section-intro">
        <h2>Activities</h2>
        <p>Sports, fitness, and enrichment</p>
      </div>

      <hr className="section-divider" />

      {activities.pools && activities.pools.length > 0 && (
        <>
          <SubSection title="Pools &amp; Water Features">
            <div className="activities-grid">
              {activities.pools.map((pool, idx) => (
                <div key={idx} className="activity-card">
                  <h4>{pool.name}</h4>
                  <p>{pool.description}</p>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {activities.sports && activities.sports.length > 0 && (
        <>
          <SubSection title="Sports &amp; Recreation">
            <ul className="activities-list">
              {activities.sports.map((sport, idx) => (
                <li key={idx}>{sport}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {activities.enrichment && activities.enrichment.length > 0 && (
        <>
          <SubSection title="Enrichment &amp; Classes">
            <ul className="activities-list">
              {activities.enrichment.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
        </>
      )}
    </div>
  );
}

function FamilySection({ family }) {
  if (!family || Object.keys(family).length === 0) {
    return <p>Family information coming soon.</p>;
  }

  return (
    <div className="section-family">
      <div className="section-intro">
        <h2>Family Facilities</h2>
        <p>Everything for families sailing together</p>
      </div>

      <hr className="section-divider" />

      {family.introduction && (
        <div className="family-intro">
          <p>{family.introduction}</p>
        </div>
      )}

      {family.highlights && family.highlights.length > 0 && (
        <>
          <SubSection title="Family Highlights">
            <ul className="highlights-list">
              {family.highlights.map((highlight, idx) => (
                <li key={idx}>
                  <Star size={16} fill="#B9953C" stroke="#B9953C" />
                  {highlight}
                </li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {family.dining && (
        <>
          <SubSection title="Family Dining">
            <p>{family.dining}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {family.cabins && (
        <>
          <SubSection title="Family Cabins">
            <p>{family.cabins}</p>
          </SubSection>
        </>
      )}
    </div>
  );
}

function KidsSection({ kids }) {
  if (!kids || Object.keys(kids).length === 0) {
    return <p>Kids club information coming soon.</p>;
  }

  return (
    <div className="section-kids">
      <div className="section-intro">
        <h2>Kids &amp; Teens</h2>
        <p>Youth clubs and activities by age group</p>
      </div>

      <hr className="section-divider" />

      {kids.introduction && (
        <div className="kids-intro">
          <p>{kids.introduction}</p>
        </div>
      )}

      {kids.clubs && kids.clubs.length > 0 && (
        <>
          {kids.clubs.map((club, idx) => (
            <div key={idx}>
              <SubSection title={club.name}>
                <p className="age-range">Ages: {club.ages}</p>
                <p>{club.description}</p>
                {club.activities && club.activities.length > 0 && (
                  <ul className="activities-list">
                    {club.activities.map((activity, aIdx) => (
                      <li key={aIdx}>{activity}</li>
                    ))}
                  </ul>
                )}
                {club.hours && <p className="club-hours">Hours: {club.hours}</p>}
              </SubSection>
              <hr className="section-divider" />
            </div>
          ))}
        </>
      )}

      {kids.teen_zone && (
        <>
          <SubSection title="Teen Zone">
            <p>{kids.teen_zone.description}</p>
            {kids.teen_zone.features && (
              <ul className="activities-list">
                {kids.teen_zone.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {kids.babysitting && (
        <div className="tip-box">
          <strong>Babysitting Services</strong>
          <p>{kids.babysitting}</p>
        </div>
      )}
    </div>
  );
}

function AccessibilitySection({ accessibility }) {
  if (!accessibility || Object.keys(accessibility).length === 0) {
    return <p>Accessibility information coming soon.</p>;
  }

  return (
    <div className="section-accessibility">
      <div className="section-intro">
        <h2>Accessibility &amp; SEND</h2>
        <p>Information for guests with accessibility needs</p>
      </div>

      <hr className="section-divider" />

      {accessibility.introduction && (
        <div className="accessibility-intro">
          <p>{accessibility.introduction}</p>
        </div>
      )}

      {accessibility.cabins && (
        <>
          <SubSection title="Accessible Cabins">
            <p>{accessibility.cabins}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {accessibility.mobility && (
        <>
          <SubSection title="Mobility">
            <p>{accessibility.mobility}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {accessibility.visual && (
        <>
          <SubSection title="Visual Impairments">
            <p>{accessibility.visual}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {accessibility.hearing && (
        <>
          <SubSection title="Hearing Impairments">
            <p>{accessibility.hearing}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {accessibility.sensory && (
        <>
          <SubSection title="Sensory Considerations">
            <p>{accessibility.sensory}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {accessibility.contact && (
        <div className="tip-box">
          <strong>Accessibility Support</strong>
          <p>{accessibility.contact}</p>
        </div>
      )}
    </div>
  );
}

function WellnessSection({ wellness }) {
  if (!wellness || Object.keys(wellness).length === 0) {
    return <p>Wellness information coming soon.</p>;
  }

  return (
    <div className="section-wellness">
      <div className="section-intro">
        <h2>Wellness</h2>
        <p>Spa, gym, and beauty services</p>
      </div>

      <hr className="section-divider" />

      {wellness.introduction && (
        <div className="wellness-intro">
          <p>{wellness.introduction}</p>
        </div>
      )}

      {wellness.spa && (
        <>
          <SubSection title="Spa">
            <p>{wellness.spa.description}</p>
            {wellness.spa.treatments && wellness.spa.treatments.length > 0 && (
              <ul className="treatments-list">
                {wellness.spa.treatments.map((treatment, idx) => (
                  <li key={idx}>{treatment}</li>
                ))}
              </ul>
            )}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {wellness.thermal && (
        <>
          <SubSection title="Thermal Suite">
            <p>{wellness.thermal}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {wellness.gym && (
        <>
          <SubSection title="Fitness Centre">
            <p>{wellness.gym.description}</p>
            {wellness.gym.equipment && wellness.gym.equipment.length > 0 && (
              <ul className="equipment-list">
                {wellness.gym.equipment.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            {wellness.gym.classes && <p>Classes: {wellness.gym.classes}</p>}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {wellness.salon && (
        <>
          <SubSection title="Beauty Salon">
            <p>{wellness.salon}</p>
          </SubSection>
        </>
      )}
    </div>
  );
}

function FAQSection({ faq, shipName }) {
  if (!faq || faq.length === 0) {
    return <p>FAQ coming soon.</p>;
  }

  return (
    <div className="section-faq">
      <div className="section-intro">
        <h2>Frequently Asked Questions</h2>
        <p>Common questions about {shipName}</p>
      </div>

      <hr className="section-divider" />

      <div className="faq-list">
        {faq.map((item, idx) => (
          <div key={idx} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShipGuidePage;
