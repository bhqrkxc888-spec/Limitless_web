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
  const [currentStyle, setCurrentStyle] = useState('outdoors');
  const popup = useRef(null);

  // Filter and enrich itinerary data - combine round-trip ports
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
    
    // Group by coordinates to detect round-trip ports
    const portGroups = new Map();
    
    filtered.forEach((item, index) => {
      const lat = parseFloat(item.lat);
      const lon = parseFloat(item.lon);
      const coordKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
      
      const enriched = {
        ...item,
        index,
        day: item.day || index + 1,
        name: item.port || item.location || `Port ${index + 1}`,
        lat,
        lon,
        type: item.type || 'port'
      };
      
      if (portGroups.has(coordKey)) {
        // Same location - combine into array
        portGroups.get(coordKey).push(enriched);
      } else {
        portGroups.set(coordKey, [enriched]);
      }
    });
    
    // Convert groups to display ports
    const result = [];
    portGroups.forEach(group => {
      if (group.length === 1) {
        // Single visit - show as normal
        result.push(group[0]);
      } else {
        // Multiple visits (round-trip) - combine into one marker
        const types = group.map(p => p.type);
        const days = group.map(p => p.day);
        const isRoundTrip = types.includes('embark') && types.includes('disembark');
        
        result.push({
          ...group[0], // Use first instance as base
          type: isRoundTrip ? 'round-trip' : group[0].type,
          days: days.sort((a, b) => a - b), // All days sorted
          visits: group, // All visit details
          isRoundTrip
        });
      }
    });
    
    return result;
  }, [itinerary]);

  // Get marker color based on type
  const getMarkerColor = (port, index) => {
    if (port.type === 'round-trip') {
      return '#9333ea'; // Purple - Round-trip (start & finish)
    }
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
          id: `port-${port.days ? port.days[0] : port.day}`,
          day: port.days ? port.days[0] : port.day, // Use first day for display
          name: port.name,
          type: port.type,
          color: getMarkerColor(port, index),
          description: port.description || '',
          country: port.country || '',
          index,
          // For round-trip ports, include all days and visits
          days: port.days ? JSON.stringify(port.days) : null,
          visits: port.visits ? JSON.stringify(port.visits) : null
        }
      }))
    };
  }, [ports]);

  // Initialize map
  useEffect(() => {
    if (!apiConfig.mapbox.enabled || !apiConfig.mapbox.accessToken) {
      console.warn('Mapbox not enabled or no access token');
      return;
    }
    
    if (ports.length === 0) {
      console.warn('No ports to display on map');
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

    // Initialize map with 3D terrain support
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: apiConfig.mapbox.style,
      bounds: bounds,
      fitBoundsOptions: {
        padding: { top: 80, bottom: 80, left: 80, right: 80 }
      },
      pitch: 0, // Start flat, user can tilt
      bearing: 0
    });

    // Add navigation controls (with compass for pitch/tilt)
    map.current.addControl(new mapboxgl.NavigationControl({ 
      showCompass: true,
      visualizePitch: true 
    }), 'top-right');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Wait for map to load before adding layers
    map.current.on('load', () => {
      // Enable 3D terrain
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add ports data source
      map.current.addSource('ports', {
        type: 'geojson',
        data: portsGeoJSON
      });

      // Add circles for port markers (smaller size)
      map.current.addLayer({
        id: 'port-circles',
        type: 'circle',
        source: 'ports',
        paint: {
          'circle-radius': 16,
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 1
        }
      });

      // Add text labels for day numbers (smaller text)
      map.current.addLayer({
        id: 'port-labels',
        type: 'symbol',
        source: 'ports',
        layout: {
          'text-field': ['get', 'day'],
          'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': 12,
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
        
        // Smooth fly to port with zoom
        map.current.flyTo({
          center: coords,
          zoom: 10,
          duration: 1500,
          essential: true
        });
        
        // Parse days and visits if this is a round-trip port
        const days = props.days ? JSON.parse(props.days) : [props.day];
        const visits = props.visits ? JSON.parse(props.visits) : null;
        
        // Build popup content
        let popupHTML = `<div class="port-popup-content">`;
        
        // Day badge
        if (days.length > 1) {
          popupHTML += `<div class="port-popup-day">Days ${days.join(', ')}</div>`;
        } else {
          popupHTML += `<div class="port-popup-day">Day ${days[0]}</div>`;
        }
        
        // Port name
        popupHTML += `<div class="port-popup-name">${props.name}</div>`;
        
        // Round-trip details
        if (props.type === 'round-trip' && visits) {
          popupHTML += '<div class="port-popup-badge round-trip">Round-Trip Port</div>';
          popupHTML += '<div class="port-popup-description">';
          visits.forEach(visit => {
            const typeLabel = visit.type === 'embark' ? 'Embarkation' : 
                             visit.type === 'disembark' ? 'Disembarkation' : 
                             visit.port?.includes('overnight') ? 'Overnight stay' : 'Port of call';
            popupHTML += `<div>• Day ${visit.day}: ${typeLabel}</div>`;
          });
          popupHTML += '</div>';
        } else {
          // Single visit - show type badge
          if (props.type === 'embark' || props.type === 'embarkation') {
            popupHTML += '<div class="port-popup-badge embark">Embarkation Port</div>';
          } else if (props.type === 'disembark' || props.type === 'disembarkation') {
            popupHTML += '<div class="port-popup-badge disembark">Disembarkation Port</div>';
          }
          
          if (props.description) {
            popupHTML += `<div class="port-popup-description">${props.description}</div>`;
          }
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

  // Handle style changes
  const handleStyleChange = (newStyle) => {
    if (!map.current) return;
    
    const styleUrls = {
      outdoors: 'mapbox://styles/mapbox/outdoors-v12',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
      streets: 'mapbox://styles/mapbox/streets-v12',
      light: 'mapbox://styles/mapbox/light-v11',
      dark: 'mapbox://styles/mapbox/dark-v11'
    };
    
    setCurrentStyle(newStyle);
    
    // Save current state
    const currentCenter = map.current.getCenter();
    const currentZoom = map.current.getZoom();
    const currentPitch = map.current.getPitch();
    const currentBearing = map.current.getBearing();
    
    // Change style
    map.current.setStyle(styleUrls[newStyle]);
    
    // Wait for style to load, then restore terrain and layers
    map.current.once('style.load', () => {
      // Re-enable 3D terrain
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      
      // Re-add ports data source
      map.current.addSource('ports', {
        type: 'geojson',
        data: portsGeoJSON
      });
      
      // Re-add port layers
      map.current.addLayer({
        id: 'port-circles',
        type: 'circle',
        source: 'ports',
        paint: {
          'circle-radius': 16,
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 1
        }
      });
      
      map.current.addLayer({
        id: 'port-labels',
        type: 'symbol',
        source: 'ports',
        layout: {
          'text-field': ['get', 'day'],
          'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-allow-overlap': true,
          'text-ignore-placement': true
        },
        paint: {
          'text-color': '#ffffff'
        }
      });
      
      // Restore view
      map.current.flyTo({
        center: currentCenter,
        zoom: currentZoom,
        pitch: currentPitch,
        bearing: currentBearing,
        duration: 0
      });
    });
  };

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
        
        {/* Style Switcher */}
        <div className="map-style-switcher">
          <button 
            className={`map-style-btn ${currentStyle === 'outdoors' ? 'active' : ''}`}
            onClick={() => handleStyleChange('outdoors')}
            title="Outdoors (Terrain)"
          >
            🗺️
          </button>
          <button 
            className={`map-style-btn ${currentStyle === 'satellite' ? 'active' : ''}`}
            onClick={() => handleStyleChange('satellite')}
            title="Satellite View"
          >
            🛰️
          </button>
          <button 
            className={`map-style-btn ${currentStyle === 'streets' ? 'active' : ''}`}
            onClick={() => handleStyleChange('streets')}
            title="Street Map"
          >
            📍
          </button>
          <button 
            className={`map-style-btn ${currentStyle === 'light' ? 'active' : ''}`}
            onClick={() => handleStyleChange('light')}
            title="Light Mode"
          >
            ☀️
          </button>
          <button 
            className={`map-style-btn ${currentStyle === 'dark' ? 'active' : ''}`}
            onClick={() => handleStyleChange('dark')}
            title="Dark Mode"
          >
            🌙
          </button>
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
