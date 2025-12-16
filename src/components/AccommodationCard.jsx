/**
 * AccommodationCard Component
 * Displays pre or post-cruise hotel stay information
 */
import './AccommodationCard.css';

function AccommodationCard({ 
  type, 
  hotelName, 
  stars, 
  nights, 
  location, 
  includes = [] 
}) {
  if (!hotelName) return null;

  const getIncludeLabel = (item) => {
    const labels = {
      breakfast: 'Breakfast included',
      transfers: 'Transfers included',
      wifi: 'Free WiFi',
      spa: 'Spa access',
      gym: 'Gym access',
      pool: 'Pool access',
      parking: 'Free parking'
    };
    return labels[item.toLowerCase()] || item;
  };

  return (
    <div className={`accommodation-card accommodation-card--${type}`}>
      <div className="accommodation-card__header">
        <div className="accommodation-card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
            <path d="M1 21h22"/>
            <path d="M9 7h1"/>
            <path d="M9 11h1"/>
            <path d="M9 15h1"/>
            <path d="M14 7h1"/>
            <path d="M14 11h1"/>
            <path d="M14 15h1"/>
          </svg>
        </div>
        <span className="accommodation-card__type">
          {type === 'pre' ? 'Pre-Cruise Stay' : 'Post-Cruise Stay'}
        </span>
      </div>

      <h4 className="accommodation-card__hotel-name">{hotelName}</h4>

      <div className="accommodation-card__details">
        {stars && (
          <span className="accommodation-card__stars" aria-label={`${stars} star hotel`}>
            {Array.from({ length: stars }, (_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
          </span>
        )}
        {nights && (
          <span className="accommodation-card__nights">
            {nights} night{nights !== 1 ? 's' : ''}
          </span>
        )}
        {location && (
          <span className="accommodation-card__location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {location}
          </span>
        )}
      </div>

      {includes?.length > 0 && (
        <ul className="accommodation-card__includes">
          {includes.map((item, idx) => (
            <li key={idx}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {getIncludeLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccommodationCard;

