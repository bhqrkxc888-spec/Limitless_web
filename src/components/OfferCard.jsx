import { Link } from 'react-router-dom';
import { Card } from './ui';
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

  const formatPrice = (price, currency = 'GBP') => {
    const formattedPrice = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
    return formattedPrice;
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
          {(offer.hero_image_url || offer.card_image_url) ? (
            <img 
              src={offer.hero_image_url || offer.card_image_url}
              alt={offer.title}
              loading="lazy"
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {formatDate(offer.departure_date)}
              </span>
            )}
          </div>
          <div className="offer-card-hero__footer">
            <div className="offer-card-hero__pricing">
              {offer.original_price && (
                <span className="offer-card-hero__original-price">
                  Was {formatPrice(offer.original_price, offer.currency)}
                </span>
              )}
              <span className="offer-card-hero__price">
                From {formatPrice(offer.price_from, offer.currency)}
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
          {(offer.card_image_url || offer.hero_image_url) ? (
            <img 
              src={offer.card_image_url || offer.hero_image_url}
              alt={offer.title}
              loading="lazy"
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
          <div className="offer-card-horizontal__footer">
            <div className="offer-card-horizontal__pricing">
              {offer.original_price && (
                <span className="offer-card-horizontal__original-price">
                  {formatPrice(offer.original_price, offer.currency)}
                </span>
              )}
              <span className="offer-card-horizontal__price">
                From {formatPrice(offer.price_from, offer.currency)}
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
      {(offer.card_image_url || offer.hero_image_url) && (
        <Card.Image
          src={offer.card_image_url || offer.hero_image_url}
          alt={offer.title}
          aspectRatio="16/10"
        />
      )}
      
      <Card.Content>
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

        <Card.Title as="h3">{offer.title}</Card.Title>
        
        {offer.short_description && (
          <Card.Description>{offer.short_description}</Card.Description>
        )}

        {/* Meta Information */}
        <div className="offer-meta">
          {offer.price_from && (
            <div className="offer-price">
              <span className="offer-price-label">From</span>
              <span className="offer-price-value">
                {formatPrice(offer.price_from, offer.currency)}
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
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
