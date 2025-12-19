/**
 * Interactive Itinerary Map Component
 * 
 * Displays cruise itinerary on an interactive Mapbox GL map with:
 * - Color-coded numbered markers (green=start, blue=ports, red=end)
 * - Clickable port markers with popups
 * - Route line between ports
 * - Zoom/pan controls
 * - Mobile-friendly
 */

import { useEffect, useRef, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import { apiConfig } from '../config/apiConfig';
import 'mapbox-gl/dist/mapbox-gl.css';
import './InteractiveItineraryMap.css';

function InteractiveItineraryMap({ itinerary, title }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  // Filter and enrich itinerary data
  const ports = useMemo(() => {
    if (!Array.isArray(itinerary)) return [];
    
    return itinerary
      .filter(item => {
        // Include ports with coordinates, exclude sea days
        return item.lat && 
               item.lon && 
               !item.is_sea_day && 
               item.type !== 'sea';
      })
      .map((item, index) => ({
        ...item,
        index,
        day: item.day || index + 1,
        name: item.port || item.location || `Port ${index + 1}`,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        type: item.type || 'port'
      }));
  }, [itinerary]);

  // Get marker color based on position
  const getMarkerColor = (port, index) => {
    if (index === 0 || port.type === 'embark' || port.type === 'embarkation') {
      return '#22c55e'; // Green - Start
    }
    if (index === ports.length - 1 || port.type === 'disembark' || port.type === 'disembarkation') {
      return '#ef4444'; // Red - End
    }
    return '#3b82f6'; // Blue - Middle ports
  };

  // Create custom marker element
  const createMarkerElement = (port, index) => {
    const el = document.createElement('div');
    el.className = 'port-marker';
    el.style.backgroundColor = getMarkerColor(port, index);
    
    const number = document.createElement('span');
    number.className = 'port-marker-number';
    number.textContent = port.day;
    el.appendChild(number);
    
    return el;
  };

  // Initialize map
  useEffect(() => {
    if (!apiConfig.mapbox.enabled || !apiConfig.mapbox.accessToken || ports.length === 0) {
      return;
    }

    if (map.current) return; // Initialize map only once

    mapboxgl.accessToken = apiConfig.mapbox.accessToken;

    // Calculate bounds
    const lats = ports.map(p => p.lat);
    const lons = ports.map(p => p.lon);
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
      }
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    // Wait for map to load before adding markers and route
    map.current.on('load', () => {
      // Add route line
      if (ports.length >= 2) {
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: ports.map(p => [p.lon, p.lat])
            }
          }
        });

        map.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          paint: {
            'line-color': '#3b82f6',
            'line-width': 3,
            'line-opacity': 0.6,
            'line-dasharray': [2, 2]
          }
        });
      }

      // Add markers
      ports.forEach((port, index) => {
        const el = createMarkerElement(port, index);
        
        // Create popup
        const popup = new mapboxgl.Popup({ 
          offset: 35,
          closeButton: true,
          closeOnClick: false,
          className: 'port-popup'
        }).setHTML(`
          <div class="port-popup-content">
            <div class="port-popup-day">Day ${port.day}</div>
            <div class="port-popup-name">${port.name}</div>
            ${port.description ? `<div class="port-popup-description">${port.description}</div>` : ''}
          </div>
        `);

        // Create marker
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([port.lon, port.lat])
          .setPopup(popup)
          .addTo(map.current);

        markers.current.push(marker);
      });
    });

    // Cleanup
    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [ports, apiConfig.mapbox.enabled, apiConfig.mapbox.accessToken, apiConfig.mapbox.style]);

  if (!apiConfig.mapbox.enabled || !apiConfig.mapbox.accessToken) {
    return (
      <div className="interactive-map-error">
        <p>Interactive map not available</p>
      </div>
    );
  }

  if (ports.length === 0) {
    return (
      <div className="interactive-map-error">
        <p>No port coordinates available for this itinerary</p>
      </div>
    );
  }

  return (
    <div className="interactive-itinerary-map-wrapper">
      <div ref={mapContainer} className="interactive-itinerary-map" />
      
      {/* Legend */}
      <div className="map-legend">
        <div className="map-legend-item">
          <div className="map-legend-marker" style={{ backgroundColor: '#22c55e' }}>
            <span>1</span>
          </div>
          <span>Embarkation</span>
        </div>
        <div className="map-legend-item">
          <div className="map-legend-marker" style={{ backgroundColor: '#3b82f6' }}>
            <span>2</span>
          </div>
          <span>Ports of Call</span>
        </div>
        <div className="map-legend-item">
          <div className="map-legend-marker" style={{ backgroundColor: '#ef4444' }}>
            <span>{ports.length}</span>
          </div>
          <span>Disembarkation</span>
        </div>
      </div>
    </div>
  );
}

export default InteractiveItineraryMap;
