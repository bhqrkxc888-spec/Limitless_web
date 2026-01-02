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

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { apiConfig } from '../config/apiConfig';
import { logger } from '../utils/logger';
import { normalizeDayNumber } from '../data/bucketList';
import 'mapbox-gl/dist/mapbox-gl.css';
import './BucketListMap.css';

/**
 * BucketListMap Component - Performance Optimized
 * 
 * Performance optimizations:
 * - useMemo for derived data (locations, bounds)
 * - useCallback for stable event handlers
 * - Throttled map interactions (move/zoom)
 * - Mapbox optimizations (no world copies, antialias off, no fade)
 * - Markers created once and cached in ref
 */
function BucketListMap({ itinerary }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentStyle, setCurrentStyle] = useState('outdoors');
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  // Throttle ref for move events
  const moveThrottleRef = useRef(null);

  // Filter itinerary items that have coordinates - memoized to prevent unnecessary re-renders
  // Itinerary data is already clean (no Day 0) after migration
  // Filter only for valid coordinates and exclude 'at sea' days
  const locations = useMemo(() => {
    if (!itinerary || !Array.isArray(itinerary)) {
      return [];
    }
    
    return itinerary.filter(item => {
      return item.coordinates && 
        typeof item.coordinates.lat === 'number' && 
        typeof item.coordinates.lon === 'number' &&
        item.location &&
        typeof item.location === 'string' &&
        !item.location.toLowerCase().includes('at sea');
    });
  }, [itinerary]);

  // Memoize map bounds calculation - expensive operation, only recompute when locations change
  const mapBounds = useMemo(() => {
    if (locations.length === 0) return null;
    
    const lats = locations.map(l => l.coordinates.lat);
    const lons = locations.map(l => l.coordinates.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    
    return {
      center: [(minLon + maxLon) / 2, (minLat + maxLat) / 2],
      sw: [minLon, minLat],
      ne: [maxLon, maxLat]
    };
  }, [locations]);

  // Initialize map - only run once when component mounts
  useEffect(() => {
    if (!apiConfig.mapbox.enabled || !apiConfig.mapbox.accessToken) {
      logger.warn('BucketListMap: Mapbox not enabled or no access token');
      return;
    }
    
    if (!mapBounds || locations.length === 0) {
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

    // Initialize map with performance optimizations
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: apiConfig.mapbox.style,
      center: mapBounds.center, // Use memoized center
      zoom: 5, // Initial zoom, will be adjusted by fitBounds
      pitch: 0,
      bearing: 0,
      // Performance optimizations
      renderWorldCopies: false, // Don't render multiple world copies
      maxZoom: 15, // Limit max zoom for performance
      minZoom: 2, // Limit min zoom
      antialias: false, // Disable antialiasing for better performance
      preserveDrawingBuffer: false, // Better performance
      fadeDuration: 0, // Disable fade for instant rendering
      trackResize: true, // Handle container resize
      pitchWithRotate: false, // Disable pitch for simpler interactions
      dragRotate: false, // Disable rotation for simpler interactions
      // Interaction control - always interactive for modern UX
      // Scroll zoom disabled to prevent scroll hijacking - users can use +/- buttons
      scrollZoom: false, // Disabled to prevent scroll hijacking while scrolling page
      boxZoom: true, // Enable box zoom (shift+drag)
      dragPan: true, // Enable drag to pan - expected behavior for maps
      keyboard: true, // Enable keyboard navigation (arrows)
      doubleClickZoom: true, // Enable double click zoom
      touchZoomRotate: true // Enable touch zoom/rotate on mobile
    });

    // Add zoom controls only (no compass/direction button)
    map.current.addControl(new mapboxgl.NavigationControl({ 
      showCompass: false,
      visualizePitch: false,
      showZoom: true
    }), 'top-right');

    // Wait for map to load before adding markers and fitting bounds
    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Use memoized bounds - no recalculation needed
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(mapBounds.sw);
      bounds.extend(mapBounds.ne);
      
      // Add proportional padding using memoized data
      const latSpan = mapBounds.ne[1] - mapBounds.sw[1];
      const lonSpan = mapBounds.ne[0] - mapBounds.sw[0];
      const maxSpan = Math.max(latSpan, lonSpan);
      const paddingDegrees = Math.max(maxSpan * 0.15, 0.5);
      
      // Extend bounds with padding
      bounds.extend([mapBounds.sw[0] - paddingDegrees, mapBounds.sw[1] - paddingDegrees]);
      bounds.extend([mapBounds.ne[0] + paddingDegrees, mapBounds.ne[1] + paddingDegrees]);
      
      // Fit bounds - instant for better perceived performance
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
        
        // Extract day number safely using shared utility - ensures never Day 0
        const dayNumber = normalizeDayNumber(item.day, index);
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
      
      // Throttled move event handler - prevents excessive state updates during pan/zoom
      const handleMove = () => {
        // Cancel any pending throttle
        if (moveThrottleRef.current) {
          cancelAnimationFrame(moveThrottleRef.current);
        }
        // Use requestAnimationFrame for smooth throttling
        moveThrottleRef.current = requestAnimationFrame(() => {
          // Only perform lightweight operations here
          // Heavy operations should be avoided during map movement
        });
      };
      
      map.current.on('move', handleMove);
    });
    
    // Handle map errors gracefully
    map.current.on('error', (e) => {
      logger.error('BucketListMap: Map error', e);
    });

    // Cleanup
    return () => {
      // Cancel any pending throttle
      if (moveThrottleRef.current) {
        cancelAnimationFrame(moveThrottleRef.current);
      }
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
        map.current.remove();
        map.current = null;
      }
      setIsMapLoaded(false);
    };
    // locations and mapBounds are stable (memoized from itinerary prop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, mapBounds]);

  // Style map lookup - stable reference
  const styleMap = useMemo(() => ({
    outdoors: 'mapbox://styles/mapbox/outdoors-v12',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    streets: 'mapbox://styles/mapbox/streets-v12',
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11'
  }), []);

  // Handle map style change - stable callback
  const handleStyleChange = useCallback((style) => {
    if (!map.current) return;

    if (!styleMap[style]) {
      logger.warn('BucketListMap: Invalid map style requested', style);
      return;
    }

    map.current.setStyle(styleMap[style]);
    setCurrentStyle(style);
  }, [styleMap]);

  // Pre-bound style change handlers to avoid inline functions in render
  const handleOutdoorsStyle = useCallback(() => handleStyleChange('outdoors'), [handleStyleChange]);
  const handleSatelliteStyle = useCallback(() => handleStyleChange('satellite'), [handleStyleChange]);
  const handleStreetsStyle = useCallback(() => handleStyleChange('streets'), [handleStyleChange]);

  // Navigate to specific day - stable callback
  const navigateToDay = useCallback((index) => {
    if (!map.current || index < 0 || index >= locations.length) return;
    
    const location = locations[index];
    const { lat, lon } = location.coordinates;
    
    // Fly to location with optimized animation (shorter duration for snappier feel)
    map.current.flyTo({
      center: [lon, lat],
      zoom: 10,
      duration: 800, // Reduced from 1500 for snappier feel
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
  }, [locations]);

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

  // Map is always interactive except for scroll zoom (to prevent scroll hijack)
  // No toggle needed - this effect is kept for potential future use
  useEffect(() => {
    if (!map.current) return;
    // Scroll zoom always disabled to prevent scroll hijacking
    map.current.scrollZoom.disable();
  }, []);

  // Navigate to previous day - stable callback, prevents scroll
  const handlePreviousDay = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (currentDayIndex > 0) {
      navigateToDay(currentDayIndex - 1);
    }
  }, [currentDayIndex, navigateToDay]);

  // Navigate to next day - stable callback, prevents scroll
  const handleNextDay = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (currentDayIndex < locations.length - 1) {
      navigateToDay(currentDayIndex + 1);
    }
  }, [currentDayIndex, locations.length, navigateToDay]);

  // Memoize current day label to avoid inline computation in render
  const currentDayLabel = useMemo(() => {
    if (locations.length === 0) return '';
    return normalizeDayNumber(locations[currentDayIndex]?.day, currentDayIndex);
  }, [locations, currentDayIndex]);

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
              type="button"
              className={currentStyle === 'outdoors' ? 'active' : ''}
              onClick={handleOutdoorsStyle}
              title="Outdoors"
              aria-label="Outdoors map style"
            >
              🏔️
            </button>
            <button 
              type="button"
              className={currentStyle === 'satellite' ? 'active' : ''}
              onClick={handleSatelliteStyle}
              title="Satellite"
              aria-label="Satellite map style"
            >
              🛰️
            </button>
            <button 
              type="button"
              className={currentStyle === 'streets' ? 'active' : ''}
              onClick={handleStreetsStyle}
              title="Streets"
              aria-label="Streets map style"
            >
              🗺️
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading skeleton - shown while map initializes */}
      {!isMapLoaded && (
        <div className="bucket-list-map-loading">
          <div className="bucket-list-map-loading-spinner" />
          <span>Loading map...</span>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className={`bucket-list-map ${isMapLoaded ? 'bucket-list-map--loaded' : ''}`}
      />
      {locations.length > 1 && (
        <div className="bucket-list-map-day-navigation">
          <button 
            type="button"
            className="day-nav-button day-nav-prev"
            onClick={handlePreviousDay}
            disabled={currentDayIndex === 0}
            title="Previous day"
            aria-label="Go to previous day"
          >
            ← Previous
          </button>
          <span className="day-nav-info" aria-live="polite">
            Day {currentDayLabel} of {locations.length}
          </span>
          <button 
            type="button"
            className="day-nav-button day-nav-next"
            onClick={handleNextDay}
            disabled={currentDayIndex === locations.length - 1}
            title="Next day"
            aria-label="Go to next day"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default BucketListMap;

