/**
 * PortsWeatherCarousel Component
 * Rotating carousel showing weather and sea conditions for major Mediterranean ports
 * Auto-scrolls through ports with aggressive caching to minimize API calls
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { useWeather } from '../hooks/useWeather';
import { getWeatherIconUrl, formatTemperature } from '../services/weatherAPI';
import { majorPorts } from '../data/majorPorts';
import { getTimeRotatedContent } from '../utils/dynamicContent';
import './PortsWeatherCarousel.css';

/**
 * PortsWeatherCarousel Component
 * @param {Object} props
 * @param {Array} props.ports - Optional custom ports array. If not provided, uses majorPorts
 * @param {string} props.title - Optional custom title
 * @param {Function} props.onPortChange - Callback when port changes (receives current port object)
 * @param {Object} props.selectedPort - Externally selected port (stops auto-rotation)
 */
function PortsWeatherCarousel({ ports, title, onPortChange, selectedPort = null }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const userInteractionRef = useRef(false); // Track if user has manually interacted
  const prevPortsRef = useRef(ports);
  const internalChangeRef = useRef(false); // Track if WE initiated the change (prevents loop)

  // Compute visible ports using useMemo (derived state)
  const visiblePorts = useMemo(() => {
    // Always default to majorPorts (Mediterranean) if no ports provided
    const portsToUse = ports || majorPorts;
    
    // Convert destination ports format to carousel format if needed
    const formattedPorts = portsToUse.map(port => {
      // If it's already in the correct format (has id, name, country, coordinates)
      if (port.id && port.country) {
        return port;
      }
      // If it's in destination format (has name, lat, lon)
      return {
        id: port.name.toLowerCase().replace(/\s+/g, '-'),
        name: port.name,
        country: port.country || 'Unknown',
        coordinates: { lat: port.lat, lon: port.lon }
      };
    });

    // Show 4 ports at a time, rotated every 2 hours
    const rotated = getTimeRotatedContent(formattedPorts, 2); // 2 hour rotation
    return rotated.slice(0, Math.min(4, rotated.length));
  }, [ports]);

  // Reset currentIndex when ports change
  useEffect(() => {
    if (prevPortsRef.current !== ports) {
      prevPortsRef.current = ports;
      setCurrentIndex(0);
    }
  }, [ports]);

  // Sync with externally selected port (from attractions filter)
  // Skip if WE just made the change (prevents infinite loop)
  useEffect(() => {
    // Skip if we initiated this change ourselves
    if (internalChangeRef.current) {
      internalChangeRef.current = false;
      return;
    }
    
    if (selectedPort && visiblePorts.length > 0) {
      const portIndex = visiblePorts.findIndex(p => p.name === selectedPort.name || p.id === selectedPort.id);
      if (portIndex !== -1) {
        // Use functional update to avoid needing currentIndex in deps
        setCurrentIndex(prev => {
          if (prev !== portIndex) {
            userInteractionRef.current = true; // Stop auto-rotation
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return portIndex;
          }
          return prev;
        });
      }
    }
  }, [selectedPort, visiblePorts]);

  // Auto-scroll through visible ports (only if user hasn't interacted and no external selection)
  useEffect(() => {
    if (visiblePorts.length === 0 || userInteractionRef.current || selectedPort) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visiblePorts.length);
    }, 8000); // Change port every 8 seconds (slower refresh)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [visiblePorts.length, selectedPort]);

  // Manual navigation - stop auto-rotation when user interacts
  const goToNext = () => {
    userInteractionRef.current = true;
    internalChangeRef.current = true; // Mark that we're making an internal change
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentIndex((prev) => (prev + 1) % visiblePorts.length);
  };

  const goToPrev = () => {
    userInteractionRef.current = true;
    internalChangeRef.current = true; // Mark that we're making an internal change
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentIndex((prev) => (prev - 1 + visiblePorts.length) % visiblePorts.length);
  };

  const goToPort = (index) => {
    userInteractionRef.current = true;
    internalChangeRef.current = true; // Mark that we're making an internal change
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentIndex(index);
  };

  // Notify parent when port changes
  useEffect(() => {
    if (visiblePorts.length > 0 && onPortChange) {
      onPortChange(visiblePorts[currentIndex]);
    }
  }, [currentIndex, visiblePorts, onPortChange]);

  if (visiblePorts.length === 0) {
    return null;
  }

  const currentPort = visiblePorts[currentIndex];

  return (
    <div className="ports-weather-carousel">
      <div className="carousel-header">
        <div className="carousel-header-content">
          <svg className="carousel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <div>
            <h3>{title || 'Mediterranean Port Conditions'}</h3>
          </div>
        </div>
      </div>

      <div className="carousel-container">
        <button 
          className="carousel-nav carousel-nav-prev"
          onClick={goToPrev}
          aria-label={`Previous port, currently viewing ${currentPort.name}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span className="sr-only">Previous port</span>
        </button>

        <div className="carousel-content" role="tabpanel" id={`port-weather-${currentPort.id}`} aria-live="polite">
          <PortWeatherCard port={currentPort} />
        </div>

        <button 
          className="carousel-nav carousel-nav-next"
          onClick={goToNext}
          aria-label={`Next port, currently viewing ${currentPort.name}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 18l6-6-6-6"/>
          </svg>
          <span className="sr-only">Next port</span>
        </button>
      </div>

      {/* Port Indicators */}
      <div className="carousel-indicators" role="tablist" aria-label="Port selection">
        {visiblePorts.map((port, index) => (
          <button
            key={port.id}
            className={`carousel-indicator ${index === currentIndex ? 'is-active' : ''}`}
            onClick={() => goToPort(index)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-controls={`port-weather-${port.id}`}
            aria-label={`View weather for ${port.name}, ${port.country}`}
          >
            <span className="indicator-dot" aria-hidden="true"></span>
            <span className="indicator-label">{port.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Individual Port Weather Card Component  
function PortWeatherCard({ port }) {
  const { current, forecast, loading: weatherLoading, error } = useWeather(port.coordinates?.lat, port.coordinates?.lon);

  // Defensive check for port data
  if (!port || !port.coordinates || !port.name) {
    return (
      <div className="port-weather-card">
        <div className="port-weather-error" role="alert">
          <p>Port data unavailable</p>
        </div>
      </div>
    );
  }

  // Check if current weather data is valid
  const hasValidWeather = current && 
    current.weather && 
    Array.isArray(current.weather) && 
    current.weather.length > 0 && 
    current.main && 
    current.wind;

  return (
    <div className="port-weather-card">
      {/* Port Header */}
      <div className="port-card-header">
        <div>
          <h4 className="port-name">{port.name}</h4>
          <p className="port-country">{port.country || 'Unknown'}</p>
        </div>
      </div>

      {weatherLoading ? (
        <div className="port-loading" role="status" aria-live="polite">
          <span className="sr-only">Loading weather data for {port.name}</span>
          Loading weather...
        </div>
      ) : error || !hasValidWeather ? (
        <div className="port-weather-error" role="alert" aria-live="assertive">
          <p>Weather data temporarily unavailable for {port.name}</p>
        </div>
      ) : (
        <>
          {/* Current Weather - Matching WeatherWidget Layout */}
          {(() => {
            try {
              const weather = current?.weather?.[0];
              const main = current?.main;
              const wind = current?.wind;
              
              if (!weather || !main) {
                return (
                  <div className="port-weather-error">
                    <p>Weather data temporarily unavailable</p>
                  </div>
                );
              }

              return (
                <>
                  <div className="port-weather-current">
                    <div className="port-weather-main">
                      <div className="port-weather-icon-temp">
                        <img 
                          src={getWeatherIconUrl(weather.icon || '01d')} 
                          alt={weather.description || 'Weather icon'}
                          className="port-weather-icon-large"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="port-weather-temp-group">
                          <span className="port-weather-temp">{formatTemperature(main.temp || 0)}</span>
                          <span className="port-weather-feels-like">Feels like {formatTemperature(main.feels_like || 0)}</span>
                        </div>
                      </div>
                      <div className="port-weather-condition">
                        <p className="port-weather-description">{weather.description || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="port-weather-details">
                      <div className="port-weather-detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                          <path d="M12 3v6m0 6v6"/>
                        </svg>
                        <div>
                          <span className="port-weather-detail-label">Humidity</span>
                          <span className="port-weather-detail-value">{main.humidity || 0}%</span>
                        </div>
                      </div>
                      <div className="port-weather-detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        <div>
                          <span className="port-weather-detail-label">Wind</span>
                          <span className="port-weather-detail-value">{Math.round((wind?.speed || 0) * 3.6)} km/h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5-Day Forecast - Matching WeatherWidget Layout */}
                  {forecast && Array.isArray(forecast) && forecast.length > 0 && (
                    <div className="port-weather-forecast">
                      <h4 className="port-weather-forecast-title">5-Day Forecast</h4>
                      <div className="port-weather-forecast-grid">
                        {forecast.filter(day => day && day.icon).map((day, index) => {
                          try {
                            return (
                              <div key={index} className="port-weather-forecast-day">
                                <div className="port-forecast-date">
                                  {index === 0 ? 'Today' : (day.date ? new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short' }) : 'N/A')}
                                </div>
                                <img 
                                  src={getWeatherIconUrl(day.icon)} 
                                  alt={day.condition || 'Forecast'}
                                  className="port-forecast-icon"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <div className="port-forecast-temps">
                                  <span className="port-forecast-high">{formatTemperature(day.high || 0)}</span>
                                  <span className="port-forecast-low">{formatTemperature(day.low || 0)}</span>
                                </div>
                                <div className="port-forecast-condition">{day.condition || 'N/A'}</div>
                              </div>
                            );
                          } catch {
                            return null;
                          }
                        })}
                      </div>
                    </div>
                  )}
                </>
              );
            } catch {
              return (
                <div className="port-weather-error">
                  <p>Weather data temporarily unavailable</p>
                </div>
              );
            }
          })()}
        </>
      )}
    </div>
  );
}

export default PortsWeatherCarousel;

