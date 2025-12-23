import { Link } from 'react-router-dom';
import { Card } from './ui';
import OptimizedImage from './OptimizedImage';
import { getCardImageUrl } from '../utils/imageNaming';
import { isSupabaseUrl } from '../utils/imageHelpers';
import './OfferCard.css';

/**
 * OfferCard Component
 * Displays a single offer in card format
 * @param {Object} props
 * @param {Object} props.offer - Offer object
 * @param {string} props.variant - 'default' | 'featured' | 'compact' | 'horizontal' | 'hero'
 */
function OfferCard({ offer, variant = 'default' }) {
  if (!offer) return null;

  // Helper to validate URL is a proper image URL
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    if (!trimmed) return false;
    // All images are now full URLs (Supabase or Vercel Blob)
    return trimmed.startsWith('http://') || 
           trimmed.startsWith('https://') || 
           trimmed.startsWith('/');
  };

  // Smart image selection: use explicit URLs or auto-generate from naming convention
  const getCardImage = () => {
    if (isValidImageUrl(offer.card_image_url)) return offer.card_image_url;
    if (offer.image_url) {
      const generatedUrl = getCardImageUrl(offer.image_url);
      if (isValidImageUrl(generatedUrl)) return generatedUrl;
    }
    return null;
  };

  // For hero variant cards, just use the card image (hero images removed from offers)
  const cardImageUrl = getCardImage();
  const heroImageUrl = cardImageUrl; // Hero variant now uses card image

  const formatPrice = (price, currency = 'GBP') => {
    const formattedPrice = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
    return formattedPrice;
  };

  // V2: Calculate lowest price from airport_prices if available
  const getDisplayPrice = () => {
    if (offer.airport_prices?.length > 0) {
      const lowestAirportPrice = Math.min(...offer.airport_prices.map(ap => ap.price));
      return lowestAirportPrice;
    }
    return offer.price_from;
  };

  // V2: Check if offer has accommodation
  const hasAccommodation = offer.pre_stay_hotel_name || offer.post_stay_hotel_name;

  // V2: Check if offer has onboard credit
  const hasOBC = offer.onboard_credit_amount && offer.onboard_credit_amount > 0;

  // V2: Format OBC currency
  const formatOBC = () => {
    if (!hasOBC) return null;
    const symbol = { USD: '$', GBP: '£', EUR: '€' }[offer.onboard_credit_currency || 'USD'] || '$';
    return `${symbol}${offer.onboard_credit_amount.toLocaleString()}`;
  };

  const displayPrice = getDisplayPrice();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDurationText = (nights) => {
    if (!nights) return '';
    if (nights === 1) return '1 night';
    return `${nights} nights`;
  };

  const getOfferTypeLabel = (type) => {
    if (!type) return '';
    switch(type) {
      case 'fly_cruise': return 'Fly-Cruise';
      case 'cruise_only': return 'Cruise Only';
      case 'bucket_list': return 'Bucket List';
      case 'special_offer': return 'Special Offer';
      default: return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const savingsDisplay = offer.savings_percentage
    ? `Save ${offer.savings_percentage}%`
    : offer.savings_amount
    ? `Save ${formatPrice(offer.savings_amount, offer.currency)}`
    : null;

  // Hero variant - Full-width horizontal layout for featured offer
  if (variant === 'hero') {
    return (
      <Link to={`/offers/${offer.slug}`} className="offer-card-hero">
        <div className="offer-card-hero__image">
          {(heroImageUrl || cardImageUrl) ? (
            <OptimizedImage
              src={heroImageUrl || cardImageUrl}
              alt={offer.title}
              width={1200}
              height={675}
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              srcsetWidths={[640, 1024, 1200]}
              quality={85}
              objectFit="cover"
            />
          ) : (
            <div className="offer-card-hero__placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
          )}
          {offer.featured && (
            <span className="offer-card-hero__badge">Featured</span>
          )}
          {savingsDisplay && (
            <span className="offer-card-hero__savings">{savingsDisplay}</span>
          )}
          {/* V2: Pre-stay badge */}
          {hasAccommodation && (
            <span className="offer-card-hero__hotel-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                <path d="M1 21h22"/>
              </svg>
              Hotel Stay Included
            </span>
          )}
        </div>
        <div className="offer-card-hero__content">
          <div className="offer-card-hero__meta-top">
            {offer.offer_type && (
              <span className="offer-card-hero__type">
                {getOfferTypeLabel(offer.offer_type)}
              </span>
            )}
            {offer.destination && (
              <span className="offer-card-hero__destination">
                {offer.destination}
              </span>
            )}
          </div>
          <h2 className="offer-card-hero__title">{offer.title}</h2>
          {offer.short_description && (
            <p className="offer-card-hero__excerpt">{offer.short_description}</p>
          )}
          <div className="offer-card-hero__details">
            {offer.cruise_line_name && (
              <span className="offer-card-hero__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18l18-6-18-6v12z"/>
                </svg>
                {offer.cruise_line_name}
              </span>
            )}
            {offer.duration_nights && (
              <span className="offer-card-hero__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {getDurationText(offer.duration_nights)}
              </span>
            )}
            {offer.departure_date && (
              <span className="offer-card-hero__detail">
                {formatDate(offer.departure_date)}
              </span>
            )}
          </div>
          {/* V2: OBC badge */}
          {hasOBC && (
            <div className="offer-card-hero__extras">
              <span className="offer-card-hero__obc">
                {formatOBC()} onboard credit
              </span>
            </div>
          )}
          <div className="offer-card-hero__footer">
            <div className="offer-card-hero__pricing">
              {offer.original_price && (
                <span className="offer-card-hero__original-price">
                  Was {formatPrice(offer.original_price, offer.currency)}
                </span>
              )}
              <span className="offer-card-hero__price">
                From {formatPrice(displayPrice, offer.currency)}
              </span>
              {offer.price_basis === 'per_person' && (
                <span className="offer-card-hero__basis">per person</span>
              )}
            </div>
            <div className="offer-card-hero__cta">
              <span>View Offer Details</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Horizontal variant - Image left, content right (for listing page)
  if (variant === 'horizontal') {
    return (
      <Link to={`/offers/${offer.slug}`} className="offer-card-horizontal">
        <div className="offer-card-horizontal__image">
          {(cardImageUrl || heroImageUrl) ? (
            <OptimizedImage
              src={cardImageUrl || heroImageUrl}
              alt={offer.title}
              width={600}
              height={400}
              priority={false}
              sizes="(max-width: 768px) 100vw, 400px"
              srcsetWidths={[400, 600, 800]}
              quality={85}
              objectFit="cover"
            />
          ) : (
            <div className="offer-card-horizontal__placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
          )}
          {savingsDisplay && (
            <span className="offer-card-horizontal__savings">{savingsDisplay}</span>
          )}
          {offer.featured && (
            <span className="offer-card-horizontal__featured-badge">Featured</span>
          )}
          {/* V2: Hotel stay badge */}
          {hasAccommodation && (
            <span className="offer-card-horizontal__hotel-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
              </svg>
              Hotel
            </span>
          )}
        </div>
        <div className="offer-card-horizontal__content">
          <div className="offer-card-horizontal__meta-top">
            {offer.offer_type && (
              <span className="offer-card-horizontal__type">
                {getOfferTypeLabel(offer.offer_type)}
              </span>
            )}
            {offer.destination && (
              <span className="offer-card-horizontal__destination">{offer.destination}</span>
            )}
          </div>
          <h3 className="offer-card-horizontal__title">{offer.title}</h3>
          {offer.short_description && (
            <p className="offer-card-horizontal__excerpt">{offer.short_description}</p>
          )}
          <div className="offer-card-horizontal__details">
            {offer.cruise_line_name && (
              <span className="offer-card-horizontal__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18l18-6-18-6v12z"/>
                </svg>
                {offer.cruise_line_name}
              </span>
            )}
            {offer.duration_nights && (
              <span className="offer-card-horizontal__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {getDurationText(offer.duration_nights)}
              </span>
            )}
            {offer.departure_port && (
              <span className="offer-card-horizontal__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {offer.departure_port}
              </span>
            )}
          </div>
          {/* V2: OBC badge */}
          {hasOBC && (
            <div className="offer-card-horizontal__extras">
              <span className="offer-card-horizontal__obc">{formatOBC()} OBC</span>
            </div>
          )}
          <div className="offer-card-horizontal__footer">
            <div className="offer-card-horizontal__pricing">
              {offer.original_price && (
                <span className="offer-card-horizontal__original-price">
                  {formatPrice(offer.original_price, offer.currency)}
                </span>
              )}
              <span className="offer-card-horizontal__price">
                From {formatPrice(displayPrice, offer.currency)}
              </span>
              {offer.price_basis === 'per_person' && (
                <span className="offer-card-horizontal__basis">pp</span>
              )}
            </div>
            <span className="offer-card-horizontal__cta">
              View Offer
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default Card variant (and compact, featured) - Used on homepage grid
  return (
    <Card
      to={`/offers/${offer.slug}`}
      variant="default"
      className={`offer-card offer-card--${variant}`}
    >
      {(cardImageUrl || heroImageUrl) && (
        <Card.Image
          src={cardImageUrl || heroImageUrl}
          alt={offer.title}
          aspectRatio="16/9"
          objectFit="cover"
        />
      )}
      
      <Card.Content>
        {/* Badges Row */}
        <div className="offer-card-badges">
          {/* Offer Type Badge */}
          {offer.offer_type && (
            <span className="offer-type-badge">
              {getOfferTypeLabel(offer.offer_type)}
            </span>
          )}

          {/* Savings Badge */}
          {savingsDisplay && (
            <span className="offer-savings-badge">
              {savingsDisplay}
            </span>
          )}
          
          {/* V2: OBC Badge */}
          {hasOBC && (
            <span className="offer-obc-badge">
              {formatOBC()} OBC
            </span>
          )}
        </div>

        <Card.Title as="h3">{offer.title}</Card.Title>
        
        {/* V2: Hotel stay indicator */}
        {hasAccommodation && variant !== 'compact' && (
          <div className="offer-hotel-indicator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
              <path d="M1 21h22"/>
            </svg>
            <span>
              {offer.pre_stay_nights && `${offer.pre_stay_nights}n pre-cruise`}
              {offer.pre_stay_nights && offer.post_stay_nights && ' + '}
              {offer.post_stay_nights && `${offer.post_stay_nights}n post-cruise`}
              {' '}hotel stay
            </span>
          </div>
        )}
        
        {offer.short_description && (
          <Card.Description>{offer.short_description}</Card.Description>
        )}

        {/* Meta Information */}
        <div className="offer-meta">
          {(offer.price_from || displayPrice) && (
            <div className="offer-price">
              <span className="offer-price-label">From</span>
              <span className="offer-price-value">
                {formatPrice(displayPrice, offer.currency)}
              </span>
              {offer.price_basis === 'per_person' && (
                <span className="offer-price-basis">per person</span>
              )}
            </div>
          )}

          <div className="offer-details">
            {offer.duration_nights && (
              <div className="offer-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{getDurationText(offer.duration_nights)}</span>
              </div>
            )}

            {offer.departure_date && (
              <div className="offer-detail-item">
                <span>{formatDate(offer.departure_date)}</span>
              </div>
            )}

            {offer.departure_port && (
              <div className="offer-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{offer.departure_port}</span>
              </div>
            )}
          </div>
        </div>

        {/* Highlights (if any) */}
        {offer.highlights && offer.highlights.length > 0 && variant !== 'compact' && (
          <ul className="offer-highlights">
            {offer.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="offer-card-cta">
          <span className="offer-card-cta-text">View Offer Details</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </Card.Content>
    </Card>
  );
}

export default OfferCard;
