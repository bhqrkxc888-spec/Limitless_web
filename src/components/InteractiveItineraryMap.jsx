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

import { useEffect, useRef, useMemo, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { apiConfig } from '../config/apiConfig';
import 'mapbox-gl/dist/mapbox-gl.css';
import './InteractiveItineraryMap.css';

function InteractiveItineraryMap({ itinerary, title }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const popup = useRef(null);

  // Filter and enrich itinerary data - handle duplicate ports
  const ports = useMemo(() => {
    if (!Array.isArray(itinerary)) {
      console.warn('InteractiveItineraryMap: itinerary is not an array', itinerary);
      return [];
    }
    
    const filtered = itinerary.filter(item => {
      // Include ports with coordinates, exclude sea days
      const hasCoords = item.lat && item.lon;
      const notSeaDay = !item.is_sea_day && item.type !== 'sea';
      return hasCoords && notSeaDay;
    });
    
    console.log(`InteractiveItineraryMap: Found ${filtered.length} ports with coordinates out of ${itinerary.length} total items`);
    
    if (filtered.length === 0 && itinerary.length > 0) {
      console.error('InteractiveItineraryMap: No ports have coordinates!', itinerary);
    }
    
    // Group ports by coordinates to handle duplicates (e.g., embark & disembark at same port)
    const portMap = new Map();
    
    filtered.forEach((item, index) => {
      const key = `${parseFloat(item.lat).toFixed(4)},${parseFloat(item.lon).toFixed(4)}`;
      const enriched = {
        ...item,
        index,
        day: item.day || index + 1,
        name: item.port || item.location || `Port ${index + 1}`,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        type: item.type || 'port'
      };
      
      if (portMap.has(key)) {
        // Duplicate location - combine days
        const existing = portMap.get(key);
        portMap.set(key, {
          ...existing,
          days: [...(existing.days || [existing.day]), enriched.day],
          types: [...(existing.types || [existing.type]), enriched.type],
          isDuplicate: true
        });
      } else {
        portMap.set(key, enriched);
      }
    });
    
    return Array.from(portMap.values());
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

  // Create GeoJSON for ports
  const portsGeoJSON = useMemo(() => {
    if (ports.length === 0) return null;

    return {
      type: 'FeatureCollection',
      features: ports.map((port, index) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [port.lon, port.lat]
        },
        properties: {
          id: `port-${port.day}`,
          day: port.day,
          name: port.name,
          type: port.type,
          color: getMarkerColor(port, index),
          description: port.description || '',
          country: port.country || '',
          index,
          // Include days and types arrays for duplicate ports (stringify for Mapbox)
          days: port.days ? JSON.stringify(port.days) : null,
          types: port.types ? JSON.stringify(port.types) : null
        }
      }))
    };
  }, [ports]);

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

    // Wait for map to load before adding layers
    map.current.on('load', () => {
      // Add ports data source
      map.current.addSource('ports', {
        type: 'geojson',
        data: portsGeoJSON
      });

      // Add circles for port markers
      map.current.addLayer({
        id: 'port-circles',
        type: 'circle',
        source: 'ports',
        paint: {
          'circle-radius': 20,
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 1
        }
      });

      // Add text labels for day numbers
      map.current.addLayer({
        id: 'port-labels',
        type: 'symbol',
        source: 'ports',
        layout: {
          'text-field': ['get', 'day'],
          'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': 14,
          'text-allow-overlap': true,
          'text-ignore-placement': true
        },
        paint: {
          'text-color': '#ffffff'
        }
      });

      // Create popup instance
      popup.current = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        className: 'port-popup',
        maxWidth: '280px'
      });

      // Add hover cursor
      map.current.on('mouseenter', 'port-circles', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'port-circles', () => {
        map.current.getCanvas().style.cursor = '';
      });

      // Click handler for ports
      map.current.on('click', 'port-circles', (e) => {
        const feature = e.features[0];
        const props = feature.properties;
        const coords = feature.geometry.coordinates.slice();
        
        // Parse days and types if this is a duplicate port
        const days = props.days ? JSON.parse(props.days) : [props.day];
        const types = props.types ? JSON.parse(props.types) : [props.type];
        
        // Build clean popup content
        let popupHTML = `<div class="port-popup-content">`;
        
        // Day badge
        if (days.length > 1) {
          popupHTML += `<div class="port-popup-day">Days ${days.join(' & ')}</div>`;
        } else {
          popupHTML += `<div class="port-popup-day">Day ${days[0]}</div>`;
        }
        
        // Port name
        popupHTML += `<div class="port-popup-name">${props.name}</div>`;
        
        // Type badges (after name, so they don't overlap)
        if (types.includes('embark') || types.includes('embarkation')) {
          popupHTML += '<div class="port-popup-badge embark">Embarkation Port</div>';
        }
        if (types.includes('disembark') || types.includes('disembarkation')) {
          popupHTML += '<div class="port-popup-badge disembark">Disembarkation Port</div>';
        }
        
        if (props.description) {
          popupHTML += `<div class="port-popup-description">${props.description}</div>`;
        }
        
        popupHTML += `</div>`;
        
        popup.current
          .setLngLat(coords)
          .setHTML(popupHTML)
          .addTo(map.current);
      });
    });

    // Cleanup
    return () => {
      if (popup.current) {
        popup.current.remove();
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [ports, portsGeoJSON, apiConfig.mapbox.enabled, apiConfig.mapbox.accessToken, apiConfig.mapbox.style]);

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
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <p><strong>Map coordinates not available</strong></p>
        <p className="error-hint">The interactive map will appear once coordinates are generated in the CRM.</p>
      </div>
    );
  }

  return (
    <div className="interactive-itinerary-map-container">
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
      
      {/* Disclaimer - small text below map */}
      <p className="itinerary-map-disclaimer">
        This map shows cruise ports only. Flights and hotels are not included in the route visualization.
      </p>
    </div>
  );
}

export default InteractiveItineraryMap;
