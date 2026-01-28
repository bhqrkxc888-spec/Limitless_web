import { useParams, Link } from 'react-router-dom';
import { useOffer } from '../hooks/useOffers';
import { useTrustBadges } from '../hooks/useTrustBadges';
import { incrementOfferView } from '../services/offersAPI';
import SEO, { getBreadcrumbSchema, getEventSchema } from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import { OfferEnquiryModal } from '../components/enquiry-forms';
// V2 Components
import AccommodationCard from '../components/AccommodationCard';
import AirportPricingList from '../components/AirportPricingTable';
import OnboardCreditBadge from '../components/OnboardCreditBadge';
import SoloTravellerInfo from '../components/SoloTravellerInfo';
import OptimizedImage from '../components/OptimizedImage';
import HolidaySummary from '../components/HolidaySummary';
import SocialShare from '../components/SocialShare';
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
  // Always use GBP for UK market - ignore any other currency values
  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
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
  // Calculate TOTAL holiday duration (pre-cruise + cruise + post-cruise)
  const getTotalHolidayNights = (offerData) => {
    if (!offerData) return 0;
    const preNights = parseInt(offerData.pre_stay_nights) || 0;
    const cruiseNights = parseInt(offerData.duration_nights) || 0;
    const postNights = parseInt(offerData.post_stay_nights) || 0;
    return preNights + cruiseNights + postNights;
  };

  // V2: Extract hotel stays from itinerary_detailed (supports multi-city)
  const extractHotelStays = (offerData) => {
    if (!offerData?.itinerary_detailed || !Array.isArray(offerData.itinerary_detailed)) {
      return [];
    }
    
    const hotelStays = [];
    let currentStay = null;
    
    for (const item of offerData.itinerary_detailed) {
      if (item.type === 'hotel') {
        const city = item.port || item.location || item.city || 'Hotel Stay';
        const hotelName = item.hotel_name || item.hotelName || null;
        const segment = item.segment || 'pre_cruise';
        
        // Check if this is a continuation of the same hotel stay
        if (currentStay && 
            currentStay.city === city && 
            currentStay.hotelName === hotelName &&
            currentStay.segment === segment) {
          // Same hotel, increment nights
          currentStay.nights += 1;
        } else {
          // New hotel stay - save current and start new
          if (currentStay) {
            hotelStays.push(currentStay);
          }
          currentStay = {
            city,
            hotelName,
            segment,
            nights: 1,
            description: item.description || null,
            stars: item.hotel_stars || item.stars || null,
            includes: item.includes || []
          };
        }
      } else if (currentStay) {
        // Non-hotel item - save current stay
        hotelStays.push(currentStay);
        currentStay = null;
      }
    }
    
    // Don't forget the last stay
    if (currentStay) {
      hotelStays.push(currentStay);
    }
    
    return hotelStays;
  };

  // V2: Check for accommodation (from itinerary or legacy fields)
  const hasAccommodation = (offerData) => {
    // First check itinerary_detailed for hotel entries
    const hotelStays = extractHotelStays(offerData);
    if (hotelStays.length > 0) return true;
    
    // Fallback to legacy single-hotel fields
    return offerData?.pre_stay_hotel_name || offerData?.post_stay_hotel_name;
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
      description: offer.short_description || offer.full_description?.substring(0, 300) || '',
      url: `https://www.limitlesscruises.com/offers/${offer.slug}`,
      category: 'Cruise Holiday',
      brand: {
        '@type': 'Organization',
        name: offer.cruise_line_name || 'Cruise Line'
      },
      offers: {
        '@type': 'Offer',
        price: displayPrice || 0,
        priceCurrency: 'GBP',
        availability: offer.status === 'sold_out' 
          ? 'https://schema.org/SoldOut' 
          : 'https://schema.org/InStock',
        priceValidUntil: offer.expires_at || defaultPriceValidUntil,
        url: `https://www.limitlesscruises.com/offers/${offer.slug}`,
        seller: {
          '@type': 'TravelAgency',
          name: 'Limitless Cruises',
          url: 'https://www.limitlesscruises.com'
        },
        itemCondition: 'https://schema.org/NewCondition'
      },
      additionalProperty: [
        ...(offer.duration_nights ? [{
          '@type': 'PropertyValue',
          name: 'Duration',
          value: `${offer.duration_nights} nights`
        }] : []),
        ...(offer.ship_name ? [{
          '@type': 'PropertyValue',
          name: 'Ship',
          value: offer.ship_name
        }] : []),
        ...(offer.departure_port ? [{
          '@type': 'PropertyValue',
          name: 'Departure Port',
          value: offer.departure_port
        }] : [])
      ]
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

    // Add Event schema for cruise departures (helps with Google Events rich results)
    const schemas = [data, breadcrumb];
    
    if (offer.departure_date) {
      const eventSchema = getEventSchema({
        title: offer.title,
        description: offer.short_description || offer.full_description?.substring(0, 200),
        url: `https://www.limitlesscruises.com/offers/${offer.slug}`,
        departureDate: offer.departure_date,
        returnDate: offer.return_date,
        departurePort: offer.departure_port,
        cruiseLine: offer.cruise_line_name,
        shipName: offer.ship_name,
        price: displayPrice,
        image: galleryImages[0]?.url,
      });
      schemas.push(eventSchema);
    }

    return schemas;
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
    ? formatPrice(offer.savings_amount)
    : null;

  return (
    <main className="offer-page">
      {/* SEO */}
      <SEO
        title={offer.meta_title || `${offer.title} | Cruise Offer`}
        description={offer.meta_description || offer.short_description || offer.full_description}
        canonical={`https://www.limitlesscruises.com/offers/${offer.slug}`}
        keywords={offer.meta_keywords?.join(', ') || ''}
        image={offer.card_image_url || galleryImages[0]?.url}
        structuredData={structuredData}
      />

      {/* Back Link at Top */}
      <div className="offer-back-top">
        <div className="container">
          <Link to="/offers" className="offer-back-link offer-back-link--top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to All Offers
          </Link>
        </div>
      </div>

      {/* Offer Header with Gallery */}
      <section className="offer-header">
        <div className="container">
          {/* Full-width title and category */}
          <div className="offer-header__top">
            <div className="offer-header__title-row">
              <h1 className="offer-header__title">{offer.title}</h1>
              <div className="offer-header__share">
                <SocialShare 
                  url={`https://www.limitlesscruises.com/offers/${offer.slug}`}
                  title={`${offer.title} | Limitless Cruises`}
                  description={offer.short_description || `Check out this amazing cruise offer: ${offer.title}`}
                />
              </div>
            </div>
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
                      <span className="offer-quick-detail__value">
                        {offer.destination.charAt(0).toUpperCase() + offer.destination.slice(1)}
                      </span>
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
                      <span className="offer-quick-detail__value">
                        {(() => {
                          const totalNights = getTotalHolidayNights(offer);
                          const cruiseNights = parseInt(offer.duration_nights) || 0;
                          // If there's pre/post stays, show total with breakdown
                          if (totalNights > cruiseNights) {
                            return `${totalNights} nights`;
                          }
                          return formatDuration(offer.duration_nights);
                        })()}
                      </span>
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
                {/* Show sailing date if it differs from departure (package with pre-stay) */}
                {offer.sailing_date && offer.sailing_date !== offer.departure_date && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 6.5v7.5M19 13.5c0-4-7-7-7-7s-7 3-7 7c0 1.66 7 4 7 4s7-2.34 7-4z"/>
                      <path d="M1 20h22"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Cruise Departs</span>
                      <span className="offer-quick-detail__value">{formatShortDate(offer.sailing_date)}</span>
                    </div>
                  </div>
                )}
                {/* Return date */}
                {offer.return_date && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Returns</span>
                      <span className="offer-quick-detail__value">{formatShortDate(offer.return_date)}</span>
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
                {offer.cabin_type && (
                  <div className="offer-quick-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 4v16"/>
                      <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
                      <path d="M2 17h20"/>
                      <path d="M6 8v9"/>
                    </svg>
                    <div>
                      <span className="offer-quick-detail__label">Cabin Type</span>
                      <span className="offer-quick-detail__value">
                        {offer.cabin_type.charAt(0).toUpperCase() + offer.cabin_type.slice(1)}
                      </span>
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
                      <span className="price">{formatPrice(offer.original_price)}</span>
                    </div>
                  )}
                  <div className="offer-pricing-card__now">
                    <span className="label">From</span>
                    <span className="price">{formatPrice(getDisplayPrice(offer))}</span>
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
                    <span>Secure with just {formatPrice(offer.deposit_amount)} deposit{offer.price_basis === 'per_person' ? ' pp' : ''}</span>
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
                
                {/* Departure airport and flight class info */}
                {offer.includes_flight && (
                  <div className="offer-pricing-card__departure">
                    {offer.flight_class && offer.flight_class !== 'economy' && (
                      <span className="flight-class-badge">
                        {offer.flight_class === 'premium_economy' ? 'Premium Economy' :
                         offer.flight_class === 'business' ? 'Business Class' :
                         offer.flight_class === 'first' ? 'First Class' :
                         offer.flight_class.charAt(0).toUpperCase() + offer.flight_class.slice(1)} flights
                      </span>
                    )}
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
                
                {/* Financial Protection Badges - Using actual logos */}
                {(offer.abta_protected !== false || offer.atol_protected || offer.includes_flight) && (
                  <div className="offer-pricing-card__protection">
                    <span className="protection-label">Your booking is protected</span>
                    <div className="protection-badges">
                      {offer.abta_protected !== false && trustBadges.abta.logoUrl && (
                        <div className="protection-badge protection-badge--abta" title="ABTA Protected">
                          <img 
                            src={trustBadges.abta.logoUrl} 
                            alt="ABTA Protected"
                          />
                        </div>
                      )}
                      {(offer.atol_protected || offer.includes_flight) && trustBadges.atol.logoUrl && (
                        <div className="protection-badge protection-badge--atol" title="ATOL Protected">
                          <img 
                            src={trustBadges.atol.logoUrl} 
                            alt="ATOL Protected"
                          />
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

      {/* YOUR HOLIDAY AT A GLANCE - Journey Segments */}
      {offer.itinerary_detailed && Array.isArray(offer.itinerary_detailed) && offer.itinerary_detailed.length > 0 && (
        <section className="section offer-holiday-summary-section">
          <div className="container">
            <HolidaySummary 
              itinerary={offer.itinerary_detailed}
              cruiseDurationNights={offer.duration_nights ? parseInt(offer.duration_nights) : null}
            />
          </div>
        </section>
      )}

      {/* Main Content - Full Width */}
      <section className="section offer-content-section">
        <div className="container">
          <div className="offer-single-column">
              {/* Holiday Highlights - Single Column Layout */}
              {(offer.full_description || (offer.highlights && offer.highlights.length > 0)) && (
                <div className="offer-section offer-section--highlights">
                  <h2 className="offer-section__title offer-section__title--large">Holiday Highlights</h2>
                  
                  {/* Description Paragraphs */}
                  {offer.full_description && (
                    <div className="offer-description-content">
                      <div 
                        dangerouslySetInnerHTML={createSanitizedMarkup(offer.full_description)}
                      />
                    </div>
                  )}
                  
                  {/* Highlights List - Below Description */}
                  {offer.highlights && offer.highlights.length > 0 && (
                    <ul className="offer-highlights-list" style={{ marginTop: '2rem' }}>
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
                  )}
                </div>
              )}

              {/* Extras Available - Paid Add-ons */}
              {offer.extras_available && offer.extras_available.length > 0 && (
                <div className="offer-section">
                  <h2 className="offer-section__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M2 12h20"/>
                    </svg>
                    Extras Available
                  </h2>
                  <p className="offer-section__subtitle" style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                    Optional paid extras to enhance your cruise experience
                  </p>
                  <ul className="offer-extras-list">
                    {offer.extras_available.map((extra, index) => (
                      <li key={index}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                          <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                        {safeRender(extra)}
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

                  {/* Interactive Map with Integrated Day-by-Day Sidebar */}
                  {/* Note: Port pills removed - redundant with map sidebar */}
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
                      {/* Auto-add transfers if included but not in list */}
                      {offer.transfer_included && !offer.includes?.some(i => 
                        typeof i === 'string' && i.toLowerCase().includes('transfer')
                      ) && (
                        <li>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Airport transfers included
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Optional Extras - from extras_available (paid add-ons) */}
                {offer.extras_available && offer.extras_available.length > 0 && (
                  <div className="offer-section offer-section--optional-extras">
                    <h2 className="offer-section__title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      Optional Extras
                    </h2>
                    <ul className="offer-optional-extras-list">
                      {offer.extras_available.map((item, index) => (
                        <li key={index}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v20M2 12h20"/>
                          </svg>
                          {safeRender(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Full-Width Disclaimer - What's NOT Included */}
              {offer.excludes && offer.excludes.length > 0 && (
                <div className="offer-disclaimer-box">
                  <p>
                    <strong>Please note:</strong> {offer.excludes.join(', ')} are not included in the price.
                  </p>
                </div>
              )}

              {/* V2: Airport Pricing List (only shows if multiple airports) */}
              {offer.airport_prices?.length > 1 && (
                <div className="offer-section" id="airport-pricing">
                  <AirportPricingList 
                    airportPrices={offer.airport_prices}
                    priceBasis={offer.price_basis}
                  />
                </div>
              )}

              {/* V2: Accommodation Cards - Show if has hotel stays */}
              {/* Supports multi-city packages via itinerary_detailed, with legacy fallback */}
              {hasAccommodation(offer) && (() => {
                const hotelStays = extractHotelStays(offer);
                const hasItineraryHotels = hotelStays.length > 0;
                
                return (
                  <div className="offer-section offer-accommodation-section">
                    <h2 className="offer-section__title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                        <path d="M1 21h22"/>
                      </svg>
                      Your Accommodation
                    </h2>
                    <div className="offer-accommodation-grid">
                      {hasItineraryHotels ? (
                        // Render from itinerary_detailed (supports multi-city)
                        hotelStays.map((stay, index) => (
                          <AccommodationCard
                            key={`${stay.city}-${index}`}
                            type={stay.segment}
                            hotelName={stay.hotelName}
                            stars={stay.stars}
                            nights={stay.nights}
                            city={stay.city}
                            description={stay.description}
                            includes={stay.includes}
                          />
                        ))
                      ) : (
                        // Fallback to legacy single-hotel fields
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* V2: Solo Traveller Info */}
              {offer.solo_supplement && offer.solo_supplement > 0 && (
                <div className="offer-section">
                  <SoloTravellerInfo 
                    soloSupplement={offer.solo_supplement}
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
          <div className="offer-enquiry-combined">
            <div className="offer-enquiry-main">
              <h2>Interested in This Offer?</h2>
              <p>
                Check availability and get personalised information about cabin options, pricing, and package add-ons.
              </p>
              <p className="offer-enquiry-cabins-note">
                Other cabin types available on enquiry.
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
