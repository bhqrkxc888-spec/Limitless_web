import { useParams, Link } from 'react-router-dom';
import { useOffer } from '../hooks/useOffers';
import { useTrustBadges } from '../hooks/useTrustBadges';
import { incrementOfferView } from '../services/offersAPI';
import { siteConfig } from '../config/siteConfig';
import SEO, { getBreadcrumbSchema } from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import { OfferEnquiryModal } from '../components/enquiry-forms';
// V2 Components
import AccommodationCard from '../components/AccommodationCard';
import AirportPricingList from '../components/AirportPricingTable';
import OnboardCreditBadge from '../components/OnboardCreditBadge';
import SoloTravellerInfo from '../components/SoloTravellerInfo';
import OptimizedImage from '../components/OptimizedImage';
import { createSanitizedMarkup } from '../utils/sanitizeHtml';
import { useEffect, useMemo, useState, lazy, Suspense, Component } from 'react';
import './OfferPage.css';

// Lazy-load heavy Mapbox component
const InteractiveItineraryMap = lazy(() => import('../components/InteractiveItineraryMap'));

// Error boundary specifically for the map - prevents map errors from crashing the page
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '300px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.95rem' }}>
            Interactive map unavailable
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Please see the itinerary details above
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function OfferPage() {
  const { slug } = useParams();
  
  // Validate slug format
  const isValidSlug = slug && /^[a-z0-9-]+$/i.test(slug);
  
  const { offer, loading, error } = useOffer(isValidSlug ? slug : null);
  const trustBadges = useTrustBadges(offer?.organisation_id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  // Compute default price valid until date (90 days from now) - must be before early returns
  const defaultPriceValidUntil = useMemo(() => {
    return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }, []);

  // Track view when offer is loaded
  useEffect(() => {
    if (offer?.id) {
      incrementOfferView(offer.id);
    }
  }, [offer?.id]);

  // Collect all images for gallery - with deduplication
  // NOTE: Hero images removed from offers - cleaner design without destination hero banners
  const galleryImages = useMemo(() => {
    if (!offer) return [];
    const images = [];
    const seenUrls = new Set();
    
    // Helper to validate URL is a proper image URL
    const isValidImageUrl = (url) => {
      if (!url || typeof url !== 'string') return false;
      const trimmed = url.trim();
      if (!trimmed) return false;
      // Must be a full URL (http/https) or a valid relative path
      return trimmed.startsWith('http://') || 
             trimmed.startsWith('https://') || 
             trimmed.startsWith('/');
    };
    
    // Helper to add image only if not already seen and valid
    const addImage = (url, alt) => {
      if (!url) return;
      
      let fullUrl = url;
      
      // All images are now full URLs from Supabase Storage
      // No conversion needed
      
      if (isValidImageUrl(fullUrl) && !seenUrls.has(fullUrl)) {
        seenUrls.add(fullUrl);
        images.push({ url: fullUrl, alt });
      }
    };
    
    // Priority 1: Card image (primary image for offers)
    if (offer.card_image_url) {
      addImage(offer.card_image_url, `${offer.title}`);
    }
    
    // Then gallery images (only add if not already shown)
    if (offer.gallery_images && Array.isArray(offer.gallery_images)) {
      offer.gallery_images.forEach((img, idx) => {
        const imgUrl = typeof img === 'string' ? img : img?.url;
        const imgAlt = typeof img === 'string' ? `${offer.title} - Gallery ${idx + 1}` : (img?.alt || `${offer.title} - Gallery ${idx + 1}`);
        addImage(imgUrl, imgAlt);
      });
    }
    
    return images;
  }, [offer]);

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

  const formatShortDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDuration = (nights) => {
    if (!nights) return '';
    if (nights === 1) return '1 night';
    return `${nights} nights`;
  };

  const getOfferTypeLabel = (type) => {
    if (!type) return '';
    switch(type) {
      case 'fly_cruise': return 'Fly-Cruise Package';
      case 'cruise_only': return 'Cruise Only';
      case 'bucket_list': return 'Bucket List Experience';
      case 'special_offer': return 'Special Offer';
      default: return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  // V2: Calculate lowest price from airport_prices
  const getDisplayPrice = (offerData) => {
    if (!offerData) return null;
    if (offerData.airport_prices?.length > 0) {
      // Filter out null/undefined/invalid prices before finding minimum
      const prices = offerData.airport_prices
        .map(ap => ap?.price)
        .filter(price => typeof price === 'number' && !isNaN(price) && price > 0);
      return prices.length > 0 ? Math.min(...prices) : offerData.price_from;
    }
    return offerData.price_from;
  };

  // V2: Calculate total package nights (prefixed with _ as it's reserved for future use)
  const _getTotalPackageNights = (offerData) => {
    if (!offerData) return 0;
    return (offerData.pre_stay_nights || 0) + 
           (offerData.duration_nights || 0) + 
           (offerData.post_stay_nights || 0);
  };

  // V2: Check for accommodation
  const hasAccommodation = (offerData) => {
    return offerData?.pre_stay_hotel_name || offerData?.post_stay_hotel_name;
  };

  // V2: Capitalize helper
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Safe render helper - prevents React error #310 if data is object instead of string
  const safeRender = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object') {
      // If it's an object, try to get a displayable value
      return value.name || value.label || value.title || value.value || JSON.stringify(value);
    }
    return String(value);
  };

  // Structured Data for SEO - MUST be before early returns to avoid hook order issues
  const structuredData = useMemo(() => {
    if (!offer) return null;
    
    // Helper to get display price
    const displayPrice = offer.airport_prices?.length > 0 
      ? Math.min(...offer.airport_prices.map(ap => ap.price))
      : offer.price_from;
    
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: offer.title || '',
      description: offer.short_description || '',
      url: `https://www.limitlesscruises.com/offers/${offer.slug}`,
      category: 'Travel Package',
      brand: {
        '@type': 'Organization',
        name: offer.cruise_line_name || 'Cruise Line'
      },
      offers: {
        '@type': 'Offer',
        price: displayPrice || 0,
        priceCurrency: offer.currency || 'GBP',
        availability: 'https://schema.org/InStock',
        priceValidUntil: offer.expires_at || defaultPriceValidUntil,
        url: `https://www.limitlesscruises.com/offers/${offer.slug}`
      }
    };

    // Add images if available
    if (galleryImages.length > 0) {
      data.image = galleryImages.map(img => img.url).filter(Boolean);
    }

    // Add breadcrumb schema
    const breadcrumb = getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.limitlesscruises.com/' },
      { name: 'Offers', url: 'https://www.limitlesscruises.com/offers' },
      { name: offer.title || 'Offer', url: `https://www.limitlesscruises.com/offers/${offer.slug}` }
    ]);

    return [data, breadcrumb];
  }, [offer, galleryImages, defaultPriceValidUntil]);

  // Loading state
  if (loading) {
    return (
      <main className="offer-page">
        <SEO title="Loading Offer..." />
        <div className="container section">
          <div className="offer-loading">
            <div className="offer-loading__spinner"></div>
            <p>Loading offer details...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (!isValidSlug || error || !offer) {
    return (
      <main className="offer-page">
        <SEO title="Offer Not Found" />
        <div className="container section">
          <div className="offer-not-found">
            <div className="offer-not-found__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <h1>Offer Not Available</h1>
            <p>{!isValidSlug ? 'Invalid offer URL.' : 'This offer may have expired or been removed.'} Our offers are being updated regularly - check back soon or contact us for current availability.</p>
            <div className="offer-not-found__actions">
              <Button to="/offers" variant="primary">View All Offers</Button>
              <Button to="/contact" variant="outline">Contact Us</Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const savingsDisplay = offer.savings_percentage
    ? `${offer.savings_percentage}%`
    : offer.savings_amount
    ? formatPrice(offer.savings_amount, offer.currency)
    : null;

  return (
    <main className="offer-page">
      {/* SEO */}
      <SEO
        title={offer.meta_title || `${offer.title} | Cruise Offer`}
        description={offer.meta_description || offer.short_description || offer.full_description}
        canonical={`https://www.limitlesscruises.com/offers/${offer.slug}`}
        keywords={offer.meta_keywords?.join(', ') || ''}
        image={galleryImages[0]?.url}
        structuredData={structuredData}
      />

      {/* Offer Header with Gallery */}
      <section className="offer-header">
        <div className="container">
          {/* Full-width title and category */}
          <div className="offer-header__top">
            {offer.offer_type && (
              <span className="offer-type-tag">
                {getOfferTypeLabel(offer.offer_type)}
              </span>
            )}
            <h1 className="offer-header__title">{offer.title}</h1>
            {offer.short_description && (
              <p className="offer-header__description">{offer.short_description}</p>
            )}
          </div>

          {/* Magazine-style layout: Image + Details side by side */}
          <div className="offer-header__layout">
            {/* Gallery Section */}
            <div className="offer-gallery">
              {(() => {
                // Filter out images that failed to load
                const validImages = galleryImages.filter(img => !failedImages.has(img.url));
                
                // Handler for image load errors
                const handleImageError = (url) => {
                  setFailedImages(prev => new Set([...prev, url]));
                  // If current selected image failed, move to next valid one
                  if (galleryImages[selectedImage]?.url === url) {
                    const nextValidIndex = galleryImages.findIndex((img, idx) => 
                      idx !== selectedImage && !failedImages.has(img.url)
                    );
                    if (nextValidIndex >= 0) {
                      setSelectedImage(nextValidIndex);
                    }
                  }
                };
                
                // Ensure selected index is valid after filtering
                const safeSelectedImage = validImages.length > 0 
                  ? Math.min(selectedImage, validImages.length - 1) 
                  : 0;
                
                if (validImages.length > 0 && validImages[safeSelectedImage]) {
                  return (
                    <>
                      <div className="offer-gallery__main">
                        <OptimizedImage
                          src={validImages[safeSelectedImage]?.url}
                          alt={validImages[safeSelectedImage]?.alt}
                          width={1200}
                          height={675}
                          priority={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                          srcsetWidths={[640, 1024, 1200, 1920]}
                          quality={85}
                          entityType="offer"
                          entityId={offer?.slug || slug}
                          imageType="gallery-main"
                          onError={() => handleImageError(validImages[safeSelectedImage]?.url)}
                        />
                        {savingsDisplay && (
                          <div className="offer-gallery__savings">
                            Save {savingsDisplay}
                          </div>
                        )}
                        {offer.featured && (
                          <div className="offer-gallery__featured">Featured</div>
                        )}
                      </div>
                      {validImages.length > 1 && (
                        <div className="offer-gallery__thumbs">
                          {validImages.map((img, idx) => (
                            <button
                              key={idx}
                              className={`offer-gallery__thumb ${safeSelectedImage === idx ? 'offer-gallery__thumb--active' : ''}`}
                              onClick={() => setSelectedImage(idx)}
                              aria-label={`View image ${idx + 1}`}
                            >
                              <OptimizedImage
                                src={img.url}
                                alt={img.alt}
                                width={150}
                                height={100}
                                priority={false}
                                sizes="150px"
                                srcsetWidths={[150, 300]}
                                quality={75}
                                entityType="offer"
                                entityId={offer?.slug || slug}
                                imageType={`gallery-thumb-${idx}`}
                                onError={() => handleImageError(img.url)}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                }
                
                return (
                  <div className="offer-gallery__placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
                );
              })()}
            </div>

            {/* Offer Info - Details and Pricing */}
            <div className="offer-header__info">
              {/* Quick Details */}
              <div className="offer-quick-details">
                {offer.cruise_line_name && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 18l18-6-18-6v12z"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Cruise Line</span>
                      <span className="offer-quick-detail__value">{offer.cruise_line_name}</span>
                    </div>
                  </div>
                )}
                {offer.ship_name && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 18v-7a4 4 0 0 0-4-4H4"/>
                      <path d="M6 18H2v-3"/>
                      <path d="M22 18h-4v-7"/>
                      <path d="M18 5v2"/>
                      <path d="M22 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Ship</span>
                      <span className="offer-quick-detail__value">{offer.ship_name}</span>
                    </div>
                  </div>
                )}
                {offer.destination && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Destination</span>
                      <span className="offer-quick-detail__value">{offer.destination}</span>
                    </div>
                  </div>
                )}
                {offer.duration_nights && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Duration</span>
                      <span className="offer-quick-detail__value">{formatDuration(offer.duration_nights)}</span>
                    </div>
                  </div>
                )}
                {offer.departure_date && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Departure</span>
                      <span className="offer-quick-detail__value">{formatShortDate(offer.departure_date)}</span>
                    </div>
                  </div>
                )}
                {offer.departure_port && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                      <path d="M2 12h20"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Departs From</span>
                      <span className="offer-quick-detail__value">{offer.departure_port}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Card */}
              <div className="offer-pricing-card">
                <div className="offer-pricing-card__main">
                  {offer.original_price && (
                    <div className="offer-pricing-card__was">
                      <span className="label">Was</span>
                      <span className="price">{formatPrice(offer.original_price, offer.currency)}</span>
                    </div>
                  )}
                  <div className="offer-pricing-card__now">
                    <span className="label">From</span>
                    <span className="price">{formatPrice(getDisplayPrice(offer), offer.currency)}</span>
                    {offer.price_basis === 'per_person' && (
                      <span className="basis">per person</span>
                    )}
                  </div>
                  {savingsDisplay && (
                    <div className="offer-pricing-card__savings">
                      <span>You Save {savingsDisplay}</span>
                    </div>
                  )}
                </div>
                
                {/* V2: Deposit Info */}
                {offer.deposit_amount && (
                  <div className="offer-pricing-card__deposit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span>Secure with just {formatPrice(offer.deposit_amount, offer.currency)} deposit</span>
                  </div>
                )}
                
                {offer.price_notes && (
                  <p className="offer-pricing-card__notes">{offer.price_notes}</p>
                )}
                
                {/* V2: OBC Badge */}
                {offer.onboard_credit_amount && offer.onboard_credit_amount > 0 && (
                  <OnboardCreditBadge 
                    amount={offer.onboard_credit_amount} 
                    currency={offer.onboard_credit_currency || 'USD'} 
                    variant="card"
                  />
                )}
                
                {/* Departure airport info */}
                {offer.includes_flight && (
                  <div className="offer-pricing-card__departure">
                    {offer.airport_prices?.length > 1 ? (
                      <>
                        <span className="label">Flying from {offer.airport_prices.length} UK airports</span>
                        <a href="#airport-pricing" className="link">See all prices →</a>
                      </>
                    ) : (
                      offer.departure_airport && (
                        <span className="label">Flying from {offer.departure_airport}</span>
                      )
                    )}
                  </div>
                )}
                
                <div className="offer-pricing-card__actions" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <Button 
                    onClick={() => setShowEnquiryModal(true)}
                    variant="outline" 
                    size="md" 
                    fullWidth
                  >
                    Check Availability
                  </Button>
                </div>
                
                {/* Financial Protection Badges */}
                {(offer.abta_protected !== false || offer.atol_protected || offer.includes_flight) && (
                  <div className="offer-pricing-card__protection">
                    <span className="protection-label">Your booking is protected</span>
                    <div className="protection-badges">
                      {offer.abta_protected !== false && (
                        <div className="protection-badge protection-badge--abta" title="ABTA Protected">
                          {trustBadges.abta.logoUrl ? (
                            <img 
                              src={trustBadges.abta.logoUrl} 
                              alt="ABTA Protected" 
                              style={trustBadges.abta.invert ? { filter: 'brightness(0) invert(1)' } : {}}
                              onError={(e) => { e.target.style.display = 'none'; if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                            />
                          ) : null}
                          <span className="protection-badge__text" style={trustBadges.abta.logoUrl ? { display: 'none' } : {}}>
                            ABTA {offer.abta_number || trustBadges.abta.number || ''}
                          </span>
                        </div>
                      )}
                      {(offer.atol_protected || offer.includes_flight) && trustBadges.atol.enabled && (
                        <div className="protection-badge protection-badge--atol" title="ATOL Protected">
                          {trustBadges.atol.logoUrl ? (
                            <img 
                              src={trustBadges.atol.logoUrl} 
                              alt="ATOL Protected"
                              style={trustBadges.atol.invert ? { filter: 'brightness(0) invert(1)' } : {}}
                              onError={(e) => { e.target.style.display = 'none'; if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                            />
                          ) : null}
                          <span className="protection-badge__text" style={trustBadges.atol.logoUrl ? { display: 'none' } : {}}>
                            ATOL {offer.atol_number || trustBadges.atol.number || ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR PACKAGE INCLUDES - Key Selling Points */}
      <section className="section offer-package-section">
        <div className="container">
          <h2 className="offer-package-section__title">Your Package Includes</h2>
          <div className="offer-package-cards">
            {/* Flights Card */}
            {offer.includes_flight && (
              <div className="offer-package-card offer-package-card--flights">
                <div className="offer-package-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                  </svg>
                </div>
                <h3 className="offer-package-card__title">Return Flights Included</h3>
                <ul className="offer-package-card__details">
                  {offer.departure_airport && (
                    <li>
                      <strong>From:</strong> {offer.departure_airport}
                    </li>
                  )}
                  <li>
                    <strong>Type:</strong> {offer.flight_direct ? 'Direct Flight' : 'Connecting Flight'}
                  </li>
                  {offer.flight_class && (
                    <li>
                      <strong>Class:</strong> {capitalize(offer.flight_class)}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Transfers Card */}
            {offer.transfer_included && (
              <div className="offer-package-card offer-package-card--transfers">
                <div className="offer-package-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="2"/>
                    <path d="M16 8h4l3 3v5h-3"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <h3 className="offer-package-card__title">Transfers Included</h3>
                <ul className="offer-package-card__details">
                  <li>Airport to cruise port</li>
                  <li>Cruise port to airport</li>
                  <li>No hidden transport costs</li>
                </ul>
              </div>
            )}

            {/* Cruise/Dining Card - Always show */}
            <div className="offer-package-card offer-package-card--cruise">
              <div className="offer-package-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18l18-6-18-6v12z"/>
                </svg>
              </div>
              <h3 className="offer-package-card__title">
                {offer.duration_nights}-Night {offer.category === 'luxury' ? 'Luxury' : ''} Cruise
              </h3>
              <ul className="offer-package-card__details">
                <li><strong>Ship:</strong> {offer.ship_name || 'TBC'}</li>
                {offer.cabin_type && (
                  <li><strong>Cabin:</strong> {capitalize(offer.cabin_type)} Stateroom</li>
                )}
                {offer.includes && offer.includes.some(i => 
                  i.toLowerCase().includes('all-inclusive') || 
                  i.toLowerCase().includes('dining') ||
                  i.toLowerCase().includes('drinks')
                ) && (
                  <li><strong>Dining:</strong> All-Inclusive</li>
                )}
              </ul>
            </div>

            {/* Pre-Stay Hotel Card */}
            {offer.pre_stay_hotel_name && (
              <div className="offer-package-card offer-package-card--hotel">
                <div className="offer-package-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                    <path d="M1 21h22"/>
                    <path d="M9 7h1"/>
                    <path d="M9 11h1"/>
                    <path d="M14 7h1"/>
                    <path d="M14 11h1"/>
                  </svg>
                </div>
                <h3 className="offer-package-card__title">Pre-Cruise Stay</h3>
                <ul className="offer-package-card__details">
                  <li className="offer-package-card__highlight">
                    {offer.pre_stay_nights} night{offer.pre_stay_nights > 1 ? 's' : ''} included
                  </li>
                  <li><strong>Hotel:</strong> {offer.pre_stay_hotel_name}</li>
                  {offer.pre_stay_hotel_stars && (
                    <li><strong>Rating:</strong> {offer.pre_stay_hotel_stars}★</li>
                  )}
                  {offer.pre_stay_location && (
                    <li><strong>Location:</strong> {offer.pre_stay_location}</li>
                  )}
                </ul>
              </div>
            )}

            {/* Post-Stay Hotel Card */}
            {offer.post_stay_hotel_name && (
              <div className="offer-package-card offer-package-card--hotel">
                <div className="offer-package-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                    <path d="M1 21h22"/>
                    <path d="M9 7h1"/>
                    <path d="M9 11h1"/>
                    <path d="M14 7h1"/>
                    <path d="M14 11h1"/>
                  </svg>
                </div>
                <h3 className="offer-package-card__title">Post-Cruise Stay</h3>
                <ul className="offer-package-card__details">
                  <li className="offer-package-card__highlight">
                    {offer.post_stay_nights} night{offer.post_stay_nights > 1 ? 's' : ''} included
                  </li>
                  <li><strong>Hotel:</strong> {offer.post_stay_hotel_name}</li>
                  {offer.post_stay_hotel_stars && (
                    <li><strong>Rating:</strong> {offer.post_stay_hotel_stars}★</li>
                  )}
                  {offer.post_stay_location && (
                    <li><strong>Location:</strong> {offer.post_stay_location}</li>
                  )}
                </ul>
              </div>
            )}

            {/* Onboard Credit Card */}
            {offer.onboard_credit_amount > 0 && (
              <div className="offer-package-card offer-package-card--obc">
                <div className="offer-package-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 10h20"/>
                  </svg>
                </div>
                <h3 className="offer-package-card__title">Onboard Credit</h3>
                <ul className="offer-package-card__details">
                  <li className="offer-package-card__highlight">
                    {offer.onboard_credit_currency === 'USD' ? '$' : '£'}{offer.onboard_credit_amount} to spend onboard
                  </li>
                  <li>Use on spa, excursions, drinks & more</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content - Full Width */}
      <section className="section offer-content-section">
        <div className="container">
          <div className="offer-single-column">
              {/* Why Book This Cruise - Compelling Description */}
              {offer.full_description && (
                <div className="offer-section offer-section--description">
                  <h2 className="offer-section__title offer-section__title--large">Why Book This Cruise</h2>
                  <div 
                    className="offer-description-content"
                    dangerouslySetInnerHTML={createSanitizedMarkup(offer.full_description)}
                  />
                </div>
              )}

              {/* Highlights */}
              {offer.highlights && offer.highlights.length > 0 && (
                <div className="offer-section">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    What Makes This Special
                  </h2>
                  <ul className="offer-highlights-list">
                    {offer.highlights.map((highlight, index) => (
                      <li key={index}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        {safeRender(highlight)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Itinerary - Map & Timeline Side by Side */}
              {(offer.itinerary_summary || 
                (offer.show_itinerary_map !== false && offer.itinerary_map_url) ||
                (offer.ports_of_call && offer.ports_of_call.length > 0) ||
                (offer.itinerary_detailed && offer.itinerary_detailed.length > 0)) && (
                <div className="offer-section">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Itinerary
                  </h2>
                  {offer.itinerary_summary && (
                    <p className="offer-itinerary-summary">{offer.itinerary_summary}</p>
                  )}
                  
                  {offer.ports_of_call && offer.ports_of_call.length > 0 && (
                    <div className="offer-ports">
                      <div className="offer-ports-list">
                        {offer.ports_of_call.map((port, idx) => (
                          <span key={idx} className="offer-port-tag">{safeRender(port)}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Map with Integrated Day-by-Day Sidebar */}
                  {offer.itinerary_detailed && Array.isArray(offer.itinerary_detailed) && offer.itinerary_detailed.length > 0 && offer.show_itinerary_map !== false && (
                    <div className="offer-itinerary-map-section">
                      <Suspense fallback={
                        <div style={{ 
                          minHeight: '400px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: '#f5f5f5',
                          borderRadius: '8px'
                        }}>
                          <p>Loading interactive map...</p>
                        </div>
                      }>
                        <MapErrorBoundary>
                          <InteractiveItineraryMap 
                            itinerary={offer.itinerary_detailed}
                            title={offer.title}
                          />
                        </MapErrorBoundary>
                      </Suspense>
                    </div>
                  )}
                </div>
              )}

              {/* What's Included / Excluded */}
              <div className="offer-inclusions-grid">
                {offer.includes && offer.includes.length > 0 && (
                  <div className="offer-section offer-section--includes">
                    <h2 className="offer-section__title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      What's Included
                    </h2>
                    <ul className="offer-includes-list">
                      {offer.includes.map((item, index) => (
                        <li key={index}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {safeRender(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {offer.excludes && offer.excludes.length > 0 && (
                  <div className="offer-section offer-section--excludes">
                    <h2 className="offer-section__title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      Not Included
                    </h2>
                    <ul className="offer-excludes-list">
                      {offer.excludes.map((item, index) => (
                        <li key={index}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                          {safeRender(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* V2: Airport Pricing List (only shows if multiple airports) */}
              {offer.airport_prices?.length > 1 && (
                <div className="offer-section" id="airport-pricing">
                  <AirportPricingList 
                    airportPrices={offer.airport_prices}
                    currency={offer.currency}
                    priceBasis={offer.price_basis}
                  />
                </div>
              )}

              {/* V2: Accommodation Cards - Show if has hotel stays */}
              {hasAccommodation(offer) && (
                <div className="offer-section offer-accommodation-section">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                      <path d="M1 21h22"/>
                    </svg>
                    Your Accommodation
                  </h2>
                  <div className="offer-accommodation-grid">
                    {offer.pre_stay_hotel_name && (
                      <AccommodationCard
                        type="pre"
                        hotelName={offer.pre_stay_hotel_name}
                        stars={offer.pre_stay_hotel_stars}
                        nights={offer.pre_stay_nights}
                        location={offer.pre_stay_location}
                        includes={offer.pre_stay_includes}
                      />
                    )}
                    {offer.post_stay_hotel_name && (
                      <AccommodationCard
                        type="post"
                        hotelName={offer.post_stay_hotel_name}
                        stars={offer.post_stay_hotel_stars}
                        nights={offer.post_stay_nights}
                        location={offer.post_stay_location}
                        includes={offer.post_stay_includes}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* V2: Solo Traveller Info */}
              {offer.solo_supplement && offer.solo_supplement > 0 && (
                <div className="offer-section">
                  <SoloTravellerInfo 
                    soloSupplement={offer.solo_supplement}
                    currency={offer.currency}
                    variant="default"
                  />
                </div>
              )}

              {/* Perfect For / Ideal For - Lower priority */}
              {(offer.suitable_for?.length > 0 || offer.best_for) && (
                <div className="offer-audience-grid">
                  {offer.suitable_for && offer.suitable_for.length > 0 && (
                    <div className="offer-section offer-section--audience">
                      <h2 className="offer-section__title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        Perfect For
                      </h2>
                      <div className="offer-suitable-for">
                        {offer.suitable_for.map((item, idx) => (
                          <span key={idx} className="offer-suitable-tag">{safeRender(item)}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {offer.best_for && (
                    <div className="offer-section offer-section--ideal">
                      <h2 className="offer-section__title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Ideal For
                      </h2>
                      <p className="offer-ideal-description">{safeRender(offer.best_for)}</p>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Enquiry Section - Full Width at Bottom */}
      <section className="section offer-enquiry-section" id="enquiry-form">
        <div className="container">
          <div className="offer-enquiry-stack">
            {/* Enquiry CTA */}
            <div className="offer-enquiry-form-card">
              <h2>Interested in This Offer?</h2>
              <p>
                Check availability and get personalised information about cabin options, pricing, and package add-ons.
              </p>
              <Button 
                onClick={() => setShowEnquiryModal(true)}
                variant="primary"
                size="lg"
                fullWidth
              >
                Check Availability
              </Button>
            </div>

            {/* Contact CTA - Stacked Below */}
            <div className="offer-enquiry-cta-card">
              <h3>Prefer to Speak Directly?</h3>
              <p>Call or WhatsApp us for immediate assistance and expert advice.</p>
              <div className="offer-enquiry-buttons">
                <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '20px', height: '20px', marginRight: '8px'}}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call {siteConfig.phone}
                </Button>
                <Button 
                  href={siteConfig.whatsappUrl} 
                  variant="outline" 
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '20px', height: '20px', marginRight: '8px'}}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  WhatsApp {siteConfig.whatsapp}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Offers */}
      <section className="offer-back-section">
        <div className="container">
          <Link to="/offers" className="offer-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to All Offers
          </Link>
        </div>
      </section>

      {/* Enquiry Modal */}
      <OfferEnquiryModal
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        offer={offer}
      />
    </main>
  );
}

export default OfferPage;
