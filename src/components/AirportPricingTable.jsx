/**
 * AirportPricingList Component
 * Simple list of prices by departure airport (only shown when multiple airports)
 */
import './AirportPricingTable.css';

function AirportPricingList({ airportPrices, currency = 'GBP', priceBasis = 'per_person' }) {
  // Only show if we have multiple airports - single airport handled elsewhere
  if (!airportPrices || airportPrices.length <= 1) return null;

  const currencySymbols = { GBP: '£', USD: '$', EUR: '€' };
  const symbol = currencySymbols[currency] || '£';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB').format(price);
  };

  const basisLabel = priceBasis === 'per_person' ? 'pp' : '';

  // Sort by price (lowest first)
  const sortedPrices = [...airportPrices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0]?.price;

  return (
    <div className="airport-pricing-grid">
      <h4 className="airport-pricing-grid__title">Prices by Departure Airport</h4>
      <div className="airport-pricing-grid__cards">
        {sortedPrices.map((ap) => (
          <div 
            key={ap.code} 
            className={`airport-pricing-card ${ap.price === lowestPrice ? 'airport-pricing-card--best' : ''}`}
          >
            {ap.price === lowestPrice && (
              <div className="airport-pricing-card__badge">Best Price</div>
            )}
            <div className="airport-pricing-card__airport">
              {ap.name}
            </div>
            {ap.direct === true && (
              <div className="airport-pricing-card__flight-type">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '16px', height: '16px'}}>
                  <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
                Direct Flight
              </div>
            )}
            <div className="airport-pricing-card__price">
              {symbol}{formatPrice(ap.price)}
              {basisLabel && <span className="airport-pricing-card__basis">{basisLabel}</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="airport-pricing-grid__note">
        Prices may vary based on availability. Contact us for the latest offers.
      </p>
    </div>
  );
}

export default AirportPricingList;
