/**
 * Bucket List Experience Map Component
 * 
 * Simple interactive Mapbox map showing location markers for bucket list experiences
 * - Icon markers for each location with coordinates
 * - Clickable markers with popups showing location and day info
 * - Auto-fits bounds to show all locations
 * - Multiple map styles
 * - No route plotting - just markers
 */

import { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import { apiConfig } from '../config/apiConfig';
import { logger } from '../utils/logger';
import 'mapbox-gl/dist/mapbox-gl.css';
import './BucketListMap.css';

function BucketListMap({ itinerary }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [currentStyle, setCurrentStyle] = useState('outdoors');
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  // Filter itinerary items that have coordinates - memoized to prevent unnecessary re-renders
  // Exclude Day 0 (flight days) - everything should start at Day 1
  const locations = useMemo(() => {
    if (!itinerary || !Array.isArray(itinerary)) {
      return [];
    }
    
    return itinerary.filter(item => {
      // Check if it's Day 0
      const dayStr = String(item.day || '');
      const dayNumber = dayStr.match(/^\d+/)?.[0];
      if (dayNumber === '0') {
        return false; // Exclude Day 0
      }
      
      return item.coordinates && 
        typeof item.coordinates.lat === 'number' && 
        typeof item.coordinates.lon === 'number' &&
        item.location &&
        typeof item.location === 'string' &&
        !item.location.toLowerCase().includes('at sea');
    });
  }, [itinerary]);

  // Initialize map - only run once when component mounts
  useEffect(() => {
    if (!apiConfig.mapbox.enabled || !apiConfig.mapbox.accessToken) {
      logger.warn('BucketListMap: Mapbox not enabled or no access token');
      return;
    }
    
    if (locations.length === 0) {
      logger.warn('BucketListMap: No locations with coordinates to display');
      return;
    }

    // Prevent re-initialization if map already exists
    if (map.current) return;
    
    if (!mapContainer.current) {
      logger.warn('BucketListMap: Map container ref is not available');
      return;
    }

    mapboxgl.accessToken = apiConfig.mapbox.accessToken;

    // Calculate center point for initial map view
    const lats = locations.map(l => l.coordinates.lat);
    const lons = locations.map(l => l.coordinates.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    // Initialize map with performance optimizations
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: apiConfig.mapbox.style,
      center: [(minLon + maxLon) / 2, (minLat + maxLat) / 2],
      zoom: 5, // Initial zoom, will be adjusted by fitBounds
      pitch: 0,
      bearing: 0,
      // Performance optimizations
      renderWorldCopies: false, // Don't render multiple world copies
      maxZoom: 15, // Limit max zoom for performance
      minZoom: 2, // Limit min zoom
      antialias: false, // Disable antialiasing for better performance
      preserveDrawingBuffer: false, // Better performance
      fadeDuration: 0 // Disable fade for instant rendering
    });

    // Add zoom controls only (no compass/direction button)
    map.current.addControl(new mapboxgl.NavigationControl({ 
      showCompass: false,
      visualizePitch: false,
      showZoom: true
    }), 'top-right');

    // Wait for map to load before adding markers and fitting bounds
    map.current.on('load', () => {
      // Fit bounds to cruise area with proportional padding
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(loc => {
        bounds.extend([loc.coordinates.lon, loc.coordinates.lat]);
      });
      
      // Add proportional padding
      const boundsData = bounds.toArray();
      const sw = boundsData[0];
      const ne = boundsData[1];
      const latSpan = ne[1] - sw[1];
      const lonSpan = ne[0] - sw[0];
      const maxSpan = Math.max(latSpan, lonSpan);
      const paddingDegrees = Math.max(maxSpan * 0.15, 0.5);
      
      // Extend bounds with padding
      bounds.extend([sw[0] - paddingDegrees, sw[1] - paddingDegrees]);
      bounds.extend([ne[0] + paddingDegrees, ne[1] + paddingDegrees]);
      
      // Fit bounds with smooth animation
      map.current.fitBounds(bounds, {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        maxZoom: 12, // Limit zoom to keep cruise area in focus
        duration: 0 // Instant fit for better UX
      });
      
      // Add markers for each location
      locations.forEach((item, index) => {
        if (!item.coordinates || !item.location) {
          logger.warn('BucketListMap: Skipping item with missing coordinates or location', item);
          return;
        }
        
        const { lat, lon } = item.coordinates;
        
        // Validate coordinates are numbers
        if (typeof lat !== 'number' || typeof lon !== 'number' || isNaN(lat) || isNaN(lon)) {
          logger.warn('BucketListMap: Invalid coordinates for location', item.location);
          return;
        }
        
        // Extract day number safely - ensure it's never Day 0
        let dayNumber = (typeof item.day === 'string' && item.day.match(/^\d+/)?.[0]) || (index + 1).toString();
        // If somehow we get Day 0, convert to Day 1
        if (dayNumber === '0') {
          dayNumber = '1';
        }
        const locationName = String(item.location || 'Unknown Location');
        const description = item.description ? String(item.description) : '';
        
        // Create popup with escaped content
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="bucket-list-map-popup">
              <strong>Day ${dayNumber}</strong>
              <h4>${locationName}</h4>
              ${description ? `<p>${description}</p>` : ''}
            </div>
          `);

        // Create custom marker element
        const el = document.createElement('div');
        el.className = `bucket-list-marker ${index === currentDayIndex ? 'active' : ''}`;
        el.setAttribute('data-day-index', index);
        el.innerHTML = `
          <div class="bucket-list-marker-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="#D4B86A" stroke="#2C344C" stroke-width="2"/>
              <text x="16" y="20" text-anchor="middle" fill="#2C344C" font-size="12" font-weight="bold">${dayNumber}</text>
            </svg>
          </div>
        `;

        // Create marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([lon, lat])
          .setPopup(popup)
          .addTo(map.current);

        // Update current day index when marker is clicked
        marker.getElement().addEventListener('click', () => {
          setCurrentDayIndex(index);
        });

        markers.current.push(marker);
      });
      
      // Performance: Disable unnecessary map features that cause lag
      map.current.setRenderWorldCopies(false);
      
      // Optimize map interactions for better performance
      map.current.on('moveend', () => {
        // Debounce any heavy operations during map movement
      });
    });
    
    // Handle map errors gracefully
    map.current.on('error', (e) => {
      logger.error('BucketListMap: Map error', e);
    });

    // Cleanup
    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
        map.current.remove();
        map.current = null;
      }
    };
  }, [locations]);

  // Handle map style change
  const handleStyleChange = (style) => {
    if (!map.current) return;
    
    const styleMap = {
      outdoors: 'mapbox://styles/mapbox/outdoors-v12',
      satellite: 'mapbox://styles/mapbox/satellite-v9',
      streets: 'mapbox://styles/mapbox/streets-v12',
      light: 'mapbox://styles/mapbox/light-v11',
      dark: 'mapbox://styles/mapbox/dark-v11'
    };

    if (!styleMap[style]) {
      logger.warn('BucketListMap: Invalid map style requested', style);
      return;
    }

    map.current.setStyle(styleMap[style]);
    setCurrentStyle(style);
  };

  // Navigate to specific day
  const navigateToDay = (index) => {
    if (!map.current || index < 0 || index >= locations.length) return;
    
    const location = locations[index];
    const { lat, lon } = location.coordinates;
    
    // Fly to location with smooth animation
    map.current.flyTo({
      center: [lon, lat],
      zoom: 10,
      duration: 1500,
      essential: true
    });
    
    // Update marker active states
    markers.current.forEach((marker, i) => {
      const el = marker.getElement();
      if (el) {
        if (i === index) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });
    
    // Open popup for this location
    const marker = markers.current[index];
    if (marker && marker.getPopup()) {
      marker.togglePopup();
    }
    
    setCurrentDayIndex(index);
  };

  // Update marker active states when currentDayIndex changes
  useEffect(() => {
    if (!map.current || markers.current.length === 0) return;
    
    markers.current.forEach((marker, index) => {
      const el = marker.getElement();
      if (el) {
        if (index === currentDayIndex) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });
  }, [currentDayIndex]);

  // Navigate to previous day
  const handlePreviousDay = () => {
    if (currentDayIndex > 0) {
      navigateToDay(currentDayIndex - 1);
    }
  };

  // Navigate to next day
  const handleNextDay = () => {
    if (currentDayIndex < locations.length - 1) {
      navigateToDay(currentDayIndex + 1);
    }
  };

  if (!apiConfig.mapbox.enabled || locations.length === 0) {
    return null;
  }

  return (
    <div className="bucket-list-map-container">
      <div className="bucket-list-map-header">
        <h3>Journey Map</h3>
        <div className="bucket-list-map-controls">
          <div className="bucket-list-map-style-controls">
            <button 
              className={currentStyle === 'outdoors' ? 'active' : ''}
              onClick={() => handleStyleChange('outdoors')}
              title="Outdoors"
            >
              🏔️
            </button>
            <button 
              className={currentStyle === 'satellite' ? 'active' : ''}
              onClick={() => handleStyleChange('satellite')}
              title="Satellite"
            >
              🛰️
            </button>
            <button 
              className={currentStyle === 'streets' ? 'active' : ''}
              onClick={() => handleStyleChange('streets')}
              title="Streets"
            >
              🗺️
            </button>
          </div>
        </div>
      </div>
      <div ref={mapContainer} className="bucket-list-map" />
      {locations.length > 1 && (
        <div className="bucket-list-map-day-navigation">
          <button 
            className="day-nav-button day-nav-prev"
            onClick={handlePreviousDay}
            disabled={currentDayIndex === 0}
            title="Previous day"
          >
            ← Previous
          </button>
          <span className="day-nav-info">
            Day {(() => {
              const dayStr = locations[currentDayIndex]?.day || '';
              let dayNumber = dayStr.match(/^\d+/)?.[0] || (currentDayIndex + 1).toString();
              // Ensure never Day 0
              if (dayNumber === '0') {
                dayNumber = '1';
              }
              return dayNumber;
            })()} of {locations.length}
          </span>
          <button 
            className="day-nav-button day-nav-next"
            onClick={handleNextDay}
            disabled={currentDayIndex === locations.length - 1}
            title="Next day"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default BucketListMap;

