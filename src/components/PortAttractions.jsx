/**
 * PortAttractions Component
 * Sophisticated display of port attractions and things to do
 */

import { useState, useEffect } from 'react';
import { usePlaces } from '../hooks/usePlaces';
import { getPlacePhotoUrl, formatDistance, getPlaceCategory } from '../services/placesAPI';
import { apiConfig, apiMessages } from '../config/apiConfig';
import { siteConfig } from '../config/siteConfig';
import { Card } from './ui';
import './PortAttractions.css';

function PortAttractions({ lat, lon, destinationName, portName, regions, fullWidth = false, availablePorts = [], selectedPortName = null, onPortChange = null }) {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4; // Show 4 cards at a time
  
  // Determine which port to use for search (selected port or default)
  const activePortName = selectedPortName || portName;
  const activePort = availablePorts.find(p => p.name === activePortName) || { name: activePortName, coordinates: { lat, lon } };
  
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
  
  // Reset to first page when port changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activePortName]);
  
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
          <div className="port-selection-label">Select Port:</div>
          <div className="port-buttons">
            {availablePorts.map(port => (
              <button
                key={port.name}
                className={`port-button ${activePortName === port.name ? 'is-active' : ''}`}
                onClick={() => handlePortClick(port)}
              >
                {port.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="port-attractions-content">
        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <div className="attractions-navigation">
            <button 
              className="attractions-nav-arrow attractions-nav-prev"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            
            <span className="attractions-page-indicator">
              {currentPage + 1} / {totalPages}
            </span>
            
            <button 
              className="attractions-nav-arrow attractions-nav-next"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        )}
        
        <div className={`attractions-grid ${fullWidth ? 'attractions-grid-fullwidth' : ''}`}>
          {currentPlaces.map((place) => {
            const photoUrl = place.photos && place.photos[0] 
              ? getPlacePhotoUrl(place.photos[0].photo_reference, 400)
              : null;

            return (
              <Card 
                key={place.place_id} 
                href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                className="attraction-card"
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

      </div>
    </div>
  );
}

export default PortAttractions;

