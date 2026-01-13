/**
 * SoloTravellerInfo Component
 * Display solo traveller supplement information
 */
import './SoloTravellerInfo.css';

function SoloTravellerInfo({ 
  soloSupplement, 
  variant = 'default' 
}) {
  if (!soloSupplement || soloSupplement <= 0) return null;

  // Always use GBP for UK market
  const symbol = '£';

  const formatAmount = (value) => {
    return new Intl.NumberFormat('en-GB').format(value);
  };

  if (variant === 'compact') {
    return (
      <span className="solo-info solo-info--compact">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        Solo supplement: {symbol}{formatAmount(soloSupplement)}
      </span>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="solo-info solo-info--inline">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>
          Solo travellers welcome 
          <span className="solo-info__supplement">
            (supplement from {symbol}{formatAmount(soloSupplement)}pp)
          </span>
        </span>
      </div>
    );
  }

  // Default variant (card-style)
  return (
    <div className="solo-info solo-info--default">
      <div className="solo-info__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div className="solo-info__content">
        <span className="solo-info__label">Solo Travellers Welcome</span>
        <span className="solo-info__value">
          Supplement from {symbol}{formatAmount(soloSupplement)}pp
        </span>
      </div>
    </div>
  );
}

export default SoloTravellerInfo;

