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

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { apiConfig } from '../config/apiConfig';
import 'mapbox-gl/dist/mapbox-gl.css';
import './BucketListMap.css';

function BucketListMap({ itinerary, title }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [currentStyle, setCurrentStyle] = useState('outdoors');

  // Filter itinerary items that have coordinates
  const locations = itinerary?.filter(item => 
    item.coordinates && 
    item.coordinates.lat && 
    item.coordinates.lon &&
    item.location &&
    !item.location.toLowerCase().includes('at sea')
  ) || [];

  // Initialize map
  useEffect(() => {
    if (!apiConfig.mapbox.enabled || !apiConfig.mapbox.accessToken) {
      console.warn('Mapbox not enabled or no access token');
      return;
    }
    
    if (locations.length === 0) {
      console.warn('No locations with coordinates to display');
      return;
    }

    if (map.current) return; // Initialize map only once

    mapboxgl.accessToken = apiConfig.mapbox.accessToken;

    // Calculate bounds from all locations
    const lats = locations.map(l => l.coordinates.lat);
    const lons = locations.map(l => l.coordinates.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    const bounds = [
      [minLon, minLat], // Southwest
      [maxLon, maxLat]  // Northeast
    ];

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: apiConfig.mapbox.style,
      bounds: bounds,
      fitBoundsOptions: {
        padding: { top: 80, bottom: 80, left: 80, right: 80 }
      },
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl({ 
      showCompass: true,
      visualizePitch: true 
    }), 'top-right');

    // Wait for map to load before adding markers
    map.current.on('load', () => {
      // Add markers for each location
      locations.forEach((item, index) => {
        const { lat, lon } = item.coordinates;
        const dayNumber = item.day?.match(/^\d+/)?.[0] || (index + 1).toString();
        
        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="bucket-list-map-popup">
              <strong>Day ${dayNumber}</strong>
              <h4>${item.location}</h4>
              ${item.description ? `<p>${item.description}</p>` : ''}
            </div>
          `);

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'bucket-list-marker';
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

        markers.current.push(marker);
      });
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

    map.current.setStyle(styleMap[style]);
    setCurrentStyle(style);
  };

  if (!apiConfig.mapbox.enabled || locations.length === 0) {
    return null;
  }

  return (
    <div className="bucket-list-map-container">
      <div className="bucket-list-map-header">
        <h3>Journey Map</h3>
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
      <div ref={mapContainer} className="bucket-list-map" />
    </div>
  );
}

export default BucketListMap;

