/**
 * AirportPricingList Component
 * Simple list of prices by departure airport (only shown when multiple airports)
 */
import './AirportPricingTable.css';

function AirportPricingList({ airportPrices, priceBasis = 'per_person' }) {
  // Only show if we have multiple airports - single airport handled elsewhere
  if (!airportPrices || airportPrices.length <= 1) return null;

  // Always use GBP for UK market
  const symbol = '£';

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
