import { useParams, Link } from 'react-router-dom';
import { useOffer } from '../hooks/useOffers';
import { incrementOfferView } from '../services/offersAPI';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { Button, SectionHeader } from '../components/ui';
import ContactForm from '../components/ContactForm';
// V2 Components
import AccommodationCard from '../components/AccommodationCard';
import AirportPricingList from '../components/AirportPricingTable';
import OnboardCreditBadge from '../components/OnboardCreditBadge';
import SoloTravellerInfo from '../components/SoloTravellerInfo';
import OptimizedImage from '../components/OptimizedImage';
import InteractiveItineraryMap from '../components/InteractiveItineraryMap';
import { useEffect, useMemo, useState } from 'react';
import './OfferPage.css';

function OfferPage() {
  const { slug } = useParams();
  const { offer, loading, error } = useOffer(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());

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
      if (isValidImageUrl(url) && !seenUrls.has(url)) {
        seenUrls.add(url);
        images.push({ url, alt });
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
      return Math.min(...offerData.airport_prices.map(ap => ap.price));
    }
    return offerData.price_from;
  };

  // V2: Calculate total package nights
  const getTotalPackageNights = (offerData) => {
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
    
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: offer.title || '',
      description: offer.short_description || '',
      url: `https://limitlesscruises.com/offers/${offer.slug}`,
      category: 'Travel Package',
      brand: {
        '@type': 'Organization',
        name: offer.cruise_line_name || 'Cruise Line'
      },
      offers: {
        '@type': 'Offer',
        price: getDisplayPrice(offer) || 0,
        priceCurrency: offer.currency || 'GBP',
        availability: 'https://schema.org/InStock',
        priceValidUntil: offer.expires_at || defaultPriceValidUntil,
        url: `https://limitlesscruises.com/offers/${offer.slug}`
      }
    };

    // Add images if available
    if (galleryImages.length > 0) {
      data.image = galleryImages.map(img => img.url).filter(Boolean);
    }

    return data;
  }, [
    offer?.title,
    offer?.short_description,
    offer?.slug,
    offer?.cruise_line_name,
    offer?.currency,
    offer?.expires_at,
    offer?.price_from,
    offer?.airport_prices,
    galleryImages,
    defaultPriceValidUntil
  ]);

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
  if (error || !offer) {
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
            <p>This offer may have expired or been removed. Our offers are being updated regularly - check back soon or contact us for current availability.</p>
            <div className="offer-not-found__actions">
              <Button to="/offers" variant="primary">View All Offers</Button>
              <Button to="/contact" variant="outline">Contact Us</Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Offers', path: '/offers' },
    { label: offer.title || 'Offer' }
  ];

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
        canonical={`https://limitlesscruises.com/offers/${offer.slug}`}
        keywords={offer.meta_keywords?.join(', ') || ''}
        image={galleryImages[0]?.url}
        structuredData={structuredData}
      />

      {/* Breadcrumbs */}
      <div className="offer-breadcrumbs">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

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
                // Ensure selected index is valid
                const safeSelectedImage = Math.min(selectedImage, Math.max(0, validImages.length - 1));
                
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
                
                if (validImages.length > 0) {
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
                  <Button href="#enquiry-form" variant="outline" size="md" fullWidth>
                    Enquire Now
                  </Button>
                  <Button href={`tel:${siteConfig.phone}`} variant="ghost" size="sm" fullWidth style={{ marginTop: '0.5rem', opacity: 0.8 }}>
                    Or call {siteConfig.phone}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Full Width */}
      <section className="section offer-content-section">
        <div className="container">
          <div className="offer-single-column">
              {/* V2: Package Summary - Show if has accommodation */}
              {hasAccommodation(offer) && (
                <div className="offer-section offer-package-summary">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M3 9h18"/>
                      <path d="M9 21V9"/>
                    </svg>
                    {getTotalPackageNights(offer)}-Night Package Includes
                  </h2>
                  <div className="offer-package-items">
                    {offer.pre_stay_hotel_name && (
                      <div className="offer-package-item offer-package-item--hotel">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                          <path d="M1 21h22"/>
                        </svg>
                        <span>
                          <strong>{offer.pre_stay_nights} nights</strong> at {offer.pre_stay_hotel_name}
                          {offer.pre_stay_hotel_stars && ` (${offer.pre_stay_hotel_stars}★)`}
                          {offer.pre_stay_location && ` in ${offer.pre_stay_location}`}
                        </span>
                      </div>
                    )}
                    <div className="offer-package-item offer-package-item--cruise">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 18l18-6-18-6v12z"/>
                      </svg>
                      <span>
                        <strong>{offer.duration_nights}-night cruise</strong> on {offer.ship_name}
                        {offer.cabin_type && ` in ${capitalize(offer.cabin_type)} Stateroom`}
                      </span>
                    </div>
                    {offer.post_stay_hotel_name && (
                      <div className="offer-package-item offer-package-item--hotel">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                          <path d="M1 21h22"/>
                        </svg>
                        <span>
                          <strong>{offer.post_stay_nights} nights</strong> at {offer.post_stay_hotel_name}
                          {offer.post_stay_hotel_stars && ` (${offer.post_stay_hotel_stars}★)`}
                          {offer.post_stay_location && ` in ${offer.post_stay_location}`}
                        </span>
                      </div>
                    )}
                    {offer.includes_flight && (
                      <div className="offer-package-item offer-package-item--flight">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                        </svg>
                        <span>
                          <strong>Return flights</strong>
                          {offer.flight_direct && ' (direct)'} included
                        </span>
                      </div>
                    )}
                    {offer.transfer_included && (
                      <div className="offer-package-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="3" width="15" height="13" rx="2"/>
                          <path d="M16 8h4l3 3v5h-3"/>
                          <circle cx="5.5" cy="18.5" r="2.5"/>
                          <circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                        <span><strong>Transfers</strong> included</span>
                      </div>
                    )}
                    {offer.onboard_credit_amount > 0 && (
                      <div className="offer-package-item offer-package-item--obc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="8" width="18" height="4" rx="1"/>
                          <path d="M12 8v13"/>
                        </svg>
                        <span>
                          <strong>Up to {offer.onboard_credit_currency === 'USD' ? '$' : '£'}{offer.onboard_credit_amount}</strong> onboard credit
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* V2: Accommodation Cards */}
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

              {/* Full Description - Prominent */}
              {offer.full_description && (
                <div className="offer-section offer-section--description">
                  <h2 className="offer-section__title offer-section__title--large">About This {offer.offer_type === 'cruise_only' ? 'Cruise' : 'Offer'}</h2>
                  <div 
                    className="offer-description-content"
                    dangerouslySetInnerHTML={{ __html: offer.full_description }}
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
                    Offer Highlights
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

                  {/* Map & Day-by-Day Side by Side */}
                  {offer.itinerary_detailed && Array.isArray(offer.itinerary_detailed) && offer.itinerary_detailed.length > 0 && (
                    <div className="offer-itinerary-grid">
                      {/* Interactive Map */}
                      {offer.show_itinerary_map !== false && (
                        <div className="offer-itinerary-map-column">
                          <InteractiveItineraryMap 
                            itinerary={offer.itinerary_detailed}
                            title={offer.title}
                          />
                        </div>
                      )}
                      
                      {/* Day-by-Day Timeline */}
                      <div className="offer-itinerary-timeline-column">
                        <h3>Day-by-Day</h3>
                        <div className="offer-itinerary-timeline">
                          {offer.itinerary_detailed.map((item, index) => (
                            <div key={index} className="offer-itinerary-item">
                              <div className="offer-itinerary-day">
                                <span className="day-number">Day {item.day || index + 1}</span>
                              </div>
                              <div className="offer-itinerary-content">
                                <h4>{safeRender(item.location || item.port || 'At Sea')}</h4>
                                {item.description && <p>{safeRender(item.description)}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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

              {/* Suitable For / Best For */}
              {(offer.suitable_for?.length > 0 || offer.best_for) && (
                <div className="offer-section">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Perfect For
                  </h2>
                  <div className="offer-perfect-for">
                    {offer.suitable_for && offer.suitable_for.length > 0 && (
                      <div className="offer-suitable-for">
                        {offer.suitable_for.map((item, idx) => (
                          <span key={idx} className="offer-suitable-tag">{safeRender(item)}</span>
                        ))}
                      </div>
                    )}
                    {offer.best_for && (
                      <p className="offer-best-for">
                        <strong>Best for:</strong> {safeRender(offer.best_for)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Flight Details (for fly-cruise) */}
              {offer.includes_flight && (
                <div className="offer-section">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                    </svg>
                    Flight Details
                  </h2>
                  <div className="offer-flight-details">
                    {offer.departure_airport && !offer.airport_prices?.length && (
                      <div className="offer-flight-detail">
                        <span className="label">Departure Airport:</span>
                        <span className="value">{offer.departure_airport}</span>
                      </div>
                    )}
                    {offer.flight_class && (
                      <div className="offer-flight-detail">
                        <span className="label">Class:</span>
                        <span className="value">{capitalize(offer.flight_class)}</span>
                      </div>
                    )}
                    {offer.flight_direct !== undefined && !offer.airport_prices?.length && (
                      <div className="offer-flight-detail">
                        <span className="label">Flight Type:</span>
                        <span className="value">{offer.flight_direct ? 'Direct flight' : 'Connecting flight'}</span>
                      </div>
                    )}
                    {offer.transfer_included !== undefined && (
                      <div className="offer-flight-detail">
                        <span className="label">Transfers:</span>
                        <span className="value">{offer.transfer_included ? 'Included' : 'Not included'}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

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

              {/* Regions */}
              {offer.regions && offer.regions.length > 0 && (
                <div className="offer-section">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M2 12h20"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Regions Visited
                  </h2>
                  <div className="offer-regions">
                    {offer.regions.map((region, idx) => (
                      <span key={idx} className="offer-region-tag">{safeRender(region)}</span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Enquiry Section - Full Width at Bottom */}
      <section className="section offer-enquiry-section" id="enquiry-form">
        <div className="container">
          <div className="offer-enquiry-stack">
            {/* Enquiry Form */}
            <div className="offer-enquiry-form-card">
              <h2>Enquire About This Offer</h2>
              <p>
                Interested in this cruise? Fill out the form and we'll get back to you with availability and booking details.
              </p>
              <ContactForm 
                context="offer-detail"
                offerId={offer.id}
                offerTitle={offer.title}
              />
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
    </main>
  );
}

export default OfferPage;
