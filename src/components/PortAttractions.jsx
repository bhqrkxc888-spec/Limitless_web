/**
 * PortAttractions Component
 * Sophisticated display of port attractions and things to do
 */

import { useState, useEffect, useRef } from 'react';
import { usePlaces } from '../hooks/usePlaces';
import { getPlacePhotoUrl, formatDistance, getPlaceCategory } from '../services/placesAPI';
import { apiConfig, apiMessages } from '../config/apiConfig';
import { siteConfig } from '../config/siteConfig';
import { Card } from './ui';
import './PortAttractions.css';

function PortAttractions({ lat, lon, destinationName, portName, fullWidth = false, availablePorts = [], selectedPortName = null, onPortChange = null }) {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4; // Show 4 cards at a time
  const prevActivePortRef = useRef(null);
  
  // Determine which port to use for search (selected port or default)
  const activePortName = selectedPortName || portName;
  const activePort = availablePorts.find(p => p.name === activePortName) || { name: activePortName, coordinates: { lat, lon } };
  
  // Reset to first page when port changes
  useEffect(() => {
    if (prevActivePortRef.current !== null && prevActivePortRef.current !== activePortName) {
      setCurrentPage(0);
    }
    prevActivePortRef.current = activePortName;
  }, [activePortName]);
  
  // Build search query - port-specific search for attractions
  const isSmallPort = activePortName && ['Gibraltar', 'Ibiza'].includes(activePortName);
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const isSummer = currentMonth >= 6 && currentMonth <= 9; // June-September
  const seasonQuery = isSummer ? 'summer' : '';
  
  const searchQuery = activePortName 
    ? `${activePortName} attractions ${seasonQuery}`.trim()
    : `${destinationName} attractions ${seasonQuery}`.trim();
  
  const placeType = 'tourist_attraction';
  const searchLat = activePort.coordinates?.lat || lat;
  const searchLon = activePort.coordinates?.lon || lon;
  // Use larger radius for smaller ports (Gibraltar, etc.)
  const searchRadius = isSmallPort ? 10000 : 5000; // 10km for small ports, 5km for larger
  const { places, loading, error } = usePlaces(searchLat, searchLon, searchQuery, placeType, 20, searchRadius); // Fetch more to allow pagination
  
  // Pagination
  const totalPages = Math.ceil(places.length / cardsPerPage);
  const currentPlaces = places.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);
  
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };
  
  const handlePortClick = (port) => {
    if (onPortChange) {
      onPortChange(port);
    }
  };

  // Not configured
  if (!apiConfig.places.enabled) {
    return (
      <div className="port-attractions-widget">
        <div className="port-attractions-header">
          <h3>Things to Do</h3>
        </div>
        <div className="port-attractions-content">
          <p className="attractions-message">{apiMessages.placesNotConfigured}</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="port-attractions-widget">
        <div className="port-attractions-header">
          <h3>Things to Do</h3>
        </div>
        <div className="port-attractions-content">
          <div className="attractions-loading">Loading attractions...</div>
        </div>
      </div>
    );
  }

  // Error state or no places
  if (error || !places || places.length === 0) {
    // Only show error if we're not loading and have tried to fetch
    if (loading) {
      return (
        <div className="port-attractions-widget">
          <div className="port-attractions-header">
            <h3>Things to Do</h3>
          </div>
          <div className="port-attractions-content">
            <div className="attractions-loading">Loading attractions...</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="port-attractions-widget">
        <div className="port-attractions-header">
          <div className="attractions-header-content">
            <svg className="attractions-icon-header" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div>
              <h3>Things to Do</h3>
            </div>
          </div>
        </div>
        <div className="port-attractions-content">
          <div className="attractions-unavailable">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <p className="attractions-message-title">No Attractions Found</p>
            <p className="attractions-message-text">
              We couldn't find attractions for {activePortName || portName || destinationName}. 
              Contact us for recommendations on things to do in this area.
            </p>
            <a href={`tel:${siteConfig?.phone || '0114 321 3208'}`} className="attractions-cta-link">
              Call for Recommendations
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`port-attractions-widget ${fullWidth ? 'attractions-fullwidth' : ''}`}>
      <div className="port-attractions-header">
        <div className="attractions-header-content">
          <svg className="attractions-icon-header" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <div>
            <h3>Things to Do</h3>
          </div>
        </div>
      </div>

      {/* Port Selection Buttons */}
      {availablePorts.length > 1 && (
        <div className="port-selection">
          <label className="port-selection-label" id="port-selection-label">Select Port:</label>
          <div className="port-buttons" role="group" aria-labelledby="port-selection-label">
            {availablePorts.map(port => (
              <button
                key={port.name}
                className={`port-button ${activePortName === port.name ? 'is-active' : ''}`}
                onClick={() => handlePortClick(port)}
                aria-pressed={activePortName === port.name}
                aria-label={`Select ${port.name} port`}
              >
                {port.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="port-attractions-content">
        {/* Loading State */}
        {loading && (
          <div className="attractions-loading" role="status" aria-live="polite">
            <span className="sr-only">Loading attractions</span>
            <p>Loading attractions for {activePortName || destinationName}...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="attractions-error" role="alert" aria-live="assertive">
            {error === 'Cookie consent required to load attractions' ? (
              <div className="attractions-consent-prompt">
                <h3>Cookie Consent Required</h3>
                <p>
                  To view local attractions, please accept cookies in the banner below. 
                  This allows us to use Google Maps to show you nearby points of interest.
                </p>
                <p className="attractions-consent-note">
                  <small>Google Maps may set cookies on their domain.</small>
                </p>
              </div>
            ) : (
              <p>Unable to load attractions. Please try again later.</p>
            )}
          </div>
        )}

        {/* Navigation Arrows */}
        {!loading && !error && totalPages > 1 && (
          <nav className="attractions-navigation" aria-label="Attractions pagination">
            <button
              className="attractions-nav-arrow attractions-nav-prev"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              aria-label={`Previous page, currently page ${currentPage + 1} of ${totalPages}`}
              aria-disabled={currentPage === 0}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              <span className="sr-only">Previous</span>
            </button>

            <span className="attractions-page-indicator" aria-live="polite" aria-atomic="true">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              className="attractions-nav-arrow attractions-nav-next"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              aria-label={`Next page, currently page ${currentPage + 1} of ${totalPages}`}
              aria-disabled={currentPage >= totalPages - 1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span className="sr-only">Next</span>
            </button>
          </nav>
        )}
        
        {!loading && !error && (
          <div className={`attractions-grid ${fullWidth ? 'attractions-grid-fullwidth' : ''}`} role="list">
          {currentPlaces.map((place) => {
            const photoUrl = place.photos && place.photos[0] 
              ? getPlacePhotoUrl(place.photos[0].photo_reference, 400)
              : null;

              return (
                <Card 
                  key={place.place_id}
                  role="listitem"
                  href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  className="attraction-card"
                  aria-label={`${place.name}, ${getPlaceCategory(place.types)}${place.rating ? `, rated ${place.rating} out of 5` : ''}`}
                >
                {photoUrl && (
                  <Card.Image 
                    src={photoUrl} 
                    alt={place.name}
                    aspectRatio="16/9"
                  />
                )}
                <Card.Content>
                  <div className="attraction-category">
                    {getPlaceCategory(place.types)}
                  </div>
                  <Card.Title as="h4" className="attraction-title">{place.name}</Card.Title>
                  {place.rating && (
                    <div className="attraction-rating">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{place.rating.toFixed(1)}</span>
                      {place.user_ratings_total && (
                        <span className="rating-count">({place.user_ratings_total})</span>
                      )}
                    </div>
                  )}
                  {place.distance && (
                    <div className="attraction-distance">
                      {formatDistance(place.distance)}
                    </div>
                  )}
                </Card.Content>
              </Card>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}

export default PortAttractions;

