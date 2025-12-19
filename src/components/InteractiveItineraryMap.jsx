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
          index
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
        
        // Build popup content
        let popupHTML = `
          <div class="port-popup-content">
            <div class="port-popup-header">
              <div class="port-popup-day">Day ${props.day}</div>
              ${props.type === 'embark' || props.type === 'embarkation' ? '<div class="port-popup-badge embark">Embarkation</div>' : ''}
              ${props.type === 'disembark' || props.type === 'disembarkation' ? '<div class="port-popup-badge disembark">Disembarkation</div>' : ''}
            </div>
            <div class="port-popup-name">${props.name}</div>
        `;
        
        if (props.description) {
          popupHTML += `<div class="port-popup-description">${props.description}</div>`;
        }
        
        if (props.country) {
          popupHTML += `<div class="port-popup-location">📍 ${props.country}</div>`;
        }
        
        popupHTML += `<div class="port-popup-coords">${coords[1].toFixed(4)}°, ${coords[0].toFixed(4)}°</div>`;
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
