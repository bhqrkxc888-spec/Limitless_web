import { useParams } from 'react-router-dom';
import { useOffer } from '../hooks/useOffers';
import { incrementOfferView } from '../services/offersAPI';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { useEffect, useMemo } from 'react';
import './OfferPage.css';

function OfferPage() {
  const { slug } = useParams();
  const { offer, loading, error } = useOffer(slug);

  // Compute default price valid until date (90 days from now) - must be before early returns
  // Using useMemo with empty deps ensures it's computed once per component instance
  const defaultPriceValidUntil = useMemo(() => {
    return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }, []);

  // Track view when offer is loaded
  useEffect(() => {
    if (offer?.id) {
      incrementOfferView(offer.id);
    }
  }, [offer?.id]);

  // Helper functions
  const formatPrice = (price, currency = 'GBP') => {
    if (!price) return '';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDuration = (nights) => {
    if (!nights) return '';
    if (nights === 1) return '1 night';
    return `${nights} nights`;
  };

  // Loading state
  if (loading) {
    return (
      <main className="offer-page">
        <SEO title="Loading Offer..." />
        <div className="container section">
          <p>Loading offer details...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !offer) {
    return (
      <main className="offer-page">
        <SEO title="Offer Not Found" />
        <div className="container section">
          <h1>Offer Not Found</h1>
          <p>Sorry, we couldn't find the offer you're looking for. It may have expired or been removed.</p>
          <div className="offer-actions">
            <Button to="/offers">View All Offers</Button>
            <Button to="/contact" variant="outline">Contact Us</Button>
          </div>
        </div>
      </main>
    );
  }

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: offer.title,
    description: offer.full_description || offer.short_description,
    url: `https://limitlesscruises.com/offers/${offer.slug}`,
    category: 'Travel Package',
    brand: {
      '@type': 'Organization',
      name: offer.cruise_line_name || 'Cruise Line'
    },
    offers: {
      '@type': 'Offer',
      price: offer.price_from,
      priceCurrency: offer.currency || 'GBP',
      availability: 'https://schema.org/InStock',
      priceValidUntil: offer.expires_at || defaultPriceValidUntil,
      url: `https://limitlesscruises.com/offers/${offer.slug}`
    },
    ...(offer.hero_image_url && {
      image: offer.hero_image_url
    })
  };

  const savingsDisplay = offer.savings_percentage
    ? `Save ${offer.savings_percentage}%`
    : offer.savings_amount
    ? `Save ${formatPrice(offer.savings_amount, offer.currency)}`
    : null;

  return (
    <main className="offer-page">
      {/* SEO */}
      <SEO
        title={offer.meta_title || offer.title}
        description={offer.meta_description || offer.short_description || offer.full_description}
        canonical={`https://limitlesscruises.com/offers/${offer.slug}`}
        keywords={offer.meta_keywords?.join(', ') || ''}
        image={offer.hero_image_url || offer.card_image_url}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={offer.title}
        subtitle={offer.short_description}
        image={offer.hero_image_url}
        imageAlt={offer.title}
        size="lg"
        align="left"
        primaryCta={{ label: 'Enquire About This Offer', to: '#enquiry-form' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Key Info Bar */}
      <section className="key-info-bar">
        <div className="container">
          <div className="key-info-grid">
            {offer.price_from && (
              <div className="key-info-item key-info-item--price">
                <span className="key-info-label">Price From</span>
                <span className="key-info-value">
                  {formatPrice(offer.price_from, offer.currency)}
                  {savingsDisplay && (
                    <span className="key-info-savings">{savingsDisplay}</span>
                  )}
                </span>
                {offer.price_basis === 'per_person' && (
                  <span className="key-info-note">per person</span>
                )}
              </div>
            )}
            {offer.duration_nights && (
              <div className="key-info-item">
                <span className="key-info-label">Duration</span>
                <span className="key-info-value">{formatDuration(offer.duration_nights)}</span>
              </div>
            )}
            {offer.departure_date && (
              <div className="key-info-item">
                <span className="key-info-label">Departure</span>
                <span className="key-info-value">{formatDate(offer.departure_date)}</span>
              </div>
            )}
            {offer.departure_port && (
              <div className="key-info-item">
                <span className="key-info-label">Departure Port</span>
                <span className="key-info-value">{offer.departure_port}</span>
              </div>
            )}
            {offer.cruise_line_name && (
              <div className="key-info-item">
                <span className="key-info-label">Cruise Line</span>
                <span className="key-info-value">{offer.cruise_line_name}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="offer-grid">
            <div className="offer-main">
              {/* Full Description */}
              {offer.full_description && (
                <div className="offer-description">
                  <div 
                    className="offer-description-content"
                    dangerouslySetInnerHTML={{ __html: offer.full_description }}
                  />
                </div>
              )}

              {/* Highlights */}
              {offer.highlights && offer.highlights.length > 0 && (
                <div className="highlights-section">
                  <SectionHeader
                    title="Offer Highlights"
                    subtitle="What makes this offer special"
                  />
                  <ul className="highlights-list">
                    {offer.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Itinerary */}
              {offer.itinerary_detailed && Array.isArray(offer.itinerary_detailed) && offer.itinerary_detailed.length > 0 && (
                <div className="itinerary-section">
                  <SectionHeader
                    title="Itinerary"
                    subtitle="Day-by-day overview"
                  />
                  <div className="itinerary-list">
                    {offer.itinerary_detailed.map((item, index) => (
                      <div key={index} className="itinerary-item">
                        <div className="itinerary-day">
                          Day {item.day || index + 1}
                        </div>
                        <div className="itinerary-content">
                          <h4>{item.location || item.port || 'At Sea'}</h4>
                          {item.description && <p>{item.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              {offer.includes && offer.includes.length > 0 && (
                <div className="includes-section">
                  <SectionHeader
                    title="What's Included"
                    subtitle="Everything that's part of this offer"
                  />
                  <ul className="includes-list">
                    {offer.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What's Not Included */}
              {offer.excludes && offer.excludes.length > 0 && (
                <div className="excludes-section">
                  <SectionHeader
                    title="What's Not Included"
                    subtitle="Items not covered by this offer"
                  />
                  <ul className="excludes-list">
                    {offer.excludes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="offer-sidebar">
              {/* Enquiry Form */}
              <div className="sidebar-card" id="enquiry-form">
                <h3>Enquire About This Offer</h3>
                <p>
                  Interested in this offer? Fill out the form below and we'll get back to you with more details and availability.
                </p>
                <ContactForm 
                  context="offer-detail"
                  offerId={offer.id}
                  offerTitle={offer.title}
                />
              </div>

              {/* Quick Info */}
              <div className="sidebar-card">
                <h3>Quick Information</h3>
                <dl className="offer-quick-info">
                  {offer.offer_type && (
                    <>
                      <dt>Offer Type</dt>
                      <dd>
                        {offer.offer_type === 'fly_cruise' ? 'Fly-Cruise' : 
                         offer.offer_type === 'cruise_only' ? 'Cruise Only' :
                         offer.offer_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </dd>
                    </>
                  )}
                  {offer.destination && (
                    <>
                      <dt>Destination</dt>
                      <dd>{offer.destination}</dd>
                    </>
                  )}
                  {offer.ship_name && (
                    <>
                      <dt>Ship</dt>
                      <dd>{offer.ship_name}</dd>
                    </>
                  )}
                  {offer.cabin_type && (
                    <>
                      <dt>Cabin Type</dt>
                      <dd>
                        {offer.cabin_type.charAt(0).toUpperCase() + offer.cabin_type.slice(1)}
                      </dd>
                    </>
                  )}
                  {offer.includes_flight && (
                    <>
                      <dt>Flight Included</dt>
                      <dd>Yes</dd>
                    </>
                  )}
                </dl>
              </div>

              {/* Contact CTA */}
              <div className="sidebar-card sidebar-card--cta">
                <h3>Prefer to Speak Directly?</h3>
                <p>Call or WhatsApp us for immediate assistance.</p>
                <div className="sidebar-cta-buttons">
                  <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
                    Call {siteConfig.phone}
                  </Button>
                  <Button 
                    href={siteConfig.whatsappUrl} 
                    variant="outline" 
                    fullWidth
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {siteConfig.whatsapp}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OfferPage;

