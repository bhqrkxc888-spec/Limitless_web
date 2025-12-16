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
    <div className="airport-pricing-list">
      <h4 className="airport-pricing-list__title">Prices by Departure Airport</h4>
      <ul className="airport-pricing-list__items">
        {sortedPrices.map((ap) => (
          <li 
            key={ap.code} 
            className={`airport-pricing-list__item ${ap.price === lowestPrice ? 'airport-pricing-list__item--lowest' : ''}`}
          >
            <span className="airport-pricing-list__airport">
              {ap.name}
              {ap.direct !== undefined && (
                <span className={`airport-pricing-list__flight-type ${ap.direct ? 'airport-pricing-list__flight-type--direct' : ''}`}>
                  {ap.direct ? 'Direct' : 'Connecting'}
                </span>
              )}
            </span>
            <span className="airport-pricing-list__price">
              {symbol}{formatPrice(ap.price)}{basisLabel}
              {ap.price === lowestPrice && (
                <span className="airport-pricing-list__badge">Best Price</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="airport-pricing-list__note">
        Prices may vary based on availability.
      </p>
    </div>
  );
}

export default AirportPricingList;
