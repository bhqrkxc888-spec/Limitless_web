/**
 * OnboardCreditBadge Component
 * Highlights onboard credit as a selling point
 */
import './OnboardCreditBadge.css';

function OnboardCreditBadge({ 
  amount, 
  currency = 'USD', 
  variant = 'default' 
}) {
  if (!amount || amount <= 0) return null;

  const currencySymbols = { USD: '$', GBP: '£', EUR: '€' };
  const symbol = currencySymbols[currency] || '$';

  const formatAmount = (value) => {
    return new Intl.NumberFormat('en-GB').format(value);
  };

  if (variant === 'compact') {
    return (
      <span className="obc-badge obc-badge--compact">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/>
          <path d="M12 12V3"/>
          <path d="m8 7 4-4 4 4"/>
          <line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        {symbol}{formatAmount(amount)} OBC
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div className="obc-badge obc-badge--card">
        <div className="obc-badge__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="8" width="18" height="4" rx="1" ry="1"/>
            <path d="M12 8v13"/>
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
          </svg>
        </div>
        <div className="obc-badge__content">
          <span className="obc-badge__label">Onboard Credit Included</span>
          <span className="obc-badge__amount">
            Up to {symbol}{formatAmount(amount)}
          </span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="obc-badge obc-badge--default">
      <div className="obc-badge__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="8" width="18" height="4" rx="1" ry="1"/>
          <path d="M12 8v13"/>
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
        </svg>
      </div>
      <span className="obc-badge__text">
        Up to <strong>{symbol}{formatAmount(amount)}</strong> onboard credit
      </span>
    </div>
  );
}

export default OnboardCreditBadge;

