/**
 * Interactive Itinerary Map Component
 * 
 * Displays cruise itinerary on an interactive Mapbox GL map with:
 * - Color-coded numbered markers (purple=start/finish, blue=ports)
 * - Clickable port markers with detailed popups
 * - Multiple map styles (Outdoors, Satellite, Streets, Light, Dark)
 * - 3D terrain visualization
 * - Smooth animations and zoom controls
 * - Fullscreen mode
 * - Automatic round-trip detection (removes duplicate last day)
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

  // Filter and enrich itinerary data - handle round-trips properly
  const ports = useMemo(() => {
    if (!Array.isArray(itinerary)) {
      console.warn('InteractiveItineraryMap: itinerary is not an array', itinerary);
      return [];
    }
    
    // Filter out sea days and items without coordinates
    const filtered = itinerary.filter(item => {
      const hasCoords = item.lat && item.lon;
      const portName = (item.port || item.location || '').toLowerCase();
      
      // Exclude sea days by checking multiple indicators
      const isSeaDay = item.is_sea_day || 
                       item.type === 'sea' || 
                       portName.includes('at sea') ||
                       portName.includes('cruising') ||
                       portName === '';
      
      return hasCoords && !isSeaDay;
    });
    
    console.log(`InteractiveItineraryMap: Found ${filtered.length} ports with coordinates out of ${itinerary.length} total items`);
    
    if (filtered.length === 0 && itinerary.length > 0) {
      console.error('InteractiveItineraryMap: No ports have coordinates!', itinerary);
    }
    
    // Enrich port data
    const enrichedPorts = filtered.map((item, index) => ({
      ...item,
      index,
      day: item.day || index + 1,
      name: item.port || item.location || `Port ${index + 1}`,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type || 'port'
    }));
    
    // Check for round-trip: first and last port at same location
    if (enrichedPorts.length >= 2) {
      const first = enrichedPorts[0];
      const last = enrichedPorts[enrichedPorts.length - 1];
      
      // If first and last are at same location (within 0.01 degrees ~1km), it's a round trip
      const latDiff = Math.abs(first.lat - last.lat);
      const lonDiff = Math.abs(first.lon - last.lon);
      
      if (latDiff < 0.01 && lonDiff < 0.01) {
        // Round trip detected - combine first and last into one marker
        // IMPORTANT: Don't create circular references by storing full objects
        first.type = 'round-trip';
        first.days = [first.day, last.day];
        // Only store the essential visit info, not full objects (avoids circular ref)
        first.visits = [
          { day: first.day, type: first.type === 'round-trip' ? 'embark' : (first.type || 'embark'), port: first.name },
          { day: last.day, type: last.type || 'disembark', port: last.name }
        ];
        first.isRoundTrip = true;
        
        // Remove the last port (duplicate)
        enrichedPorts.pop();
        
        console.log(`Round-trip detected: ${first.name} (Days ${first.days.join(' & ')})`);
      }
    }
    
    return enrichedPorts;
  }, [itinerary]);

  // Get marker color - SIMPLIFIED: Purple for start/finish, Blue for everything else
  const getMarkerColor = (port, index, totalPorts) => {
    // Purple for round-trip ports (combined embark/disembark)
    if (port.type === 'round-trip' || port.isRoundTrip) {
      return '#9333ea'; // Purple
    }
    
    // Purple for first or last port
    if (index === 0 || index === totalPorts - 1) {
      return '#9333ea'; // Purple - Start or Finish
    }
    
    // Purple for explicit embark/disembark types
    if (port.type === 'embark' || port.type === 'embarkation' || 
        port.type === 'disembark' || port.type === 'disembarkation') {
      return '#9333ea'; // Purple
    }
    
    // Blue for all other ports
    return '#3b82f6'; // Blue
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
          color: getMarkerColor(port, index, ports.length), // Pass total count
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
        <div ref={mapContainer} className="interactive-itinerary-map">
          {/* Style Switcher - Inside map container for fullscreen access */}
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
