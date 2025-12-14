import { Link } from 'react-router-dom';
import { Card } from './ui';
import './OfferCard.css';

/**
 * OfferCard Component
 * Displays a single offer in card format
 * @param {Object} props
 * @param {Object} props.offer - Offer object
 * @param {string} props.variant - 'default' | 'featured' | 'compact'
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

  const savingsDisplay = offer.savings_percentage
    ? `Save ${offer.savings_percentage}%`
    : offer.savings_amount
    ? `Save ${formatPrice(offer.savings_amount, offer.currency)}`
    : null;

  return (
    <Card
      to={`/offers/${offer.slug}`}
      variant="default"
      className={`offer-card offer-card--${variant}`}
    >
      {offer.card_image_url && (
        <Card.Image
          src={offer.card_image_url}
          alt={offer.title}
          aspectRatio="16/10"
        />
      )}
      
      <Card.Content>
        {/* Offer Type Badge */}
        {offer.offer_type && (
          <span className="offer-type-badge">
            {offer.offer_type === 'fly_cruise' ? 'Fly-Cruise' : 
             offer.offer_type === 'cruise_only' ? 'Cruise Only' :
             offer.offer_type === 'bucket_list' ? 'Bucket List' :
             offer.offer_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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

