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
import { getPortAttractions } from '../services/googlePlacesAPI';
import 'mapbox-gl/dist/mapbox-gl.css';
import './InteractiveItineraryMap.css';

// Silent logger - no console output in production
const logger = {
  debug: () => {},
  warn: () => {},
  error: () => {},
};

// Known airport indicators for smart type inference
const AIRPORT_INDICATORS = [
  'airport', 'heathrow', 'gatwick', 'stansted', 'luton', 'manchester airport',
  'birmingham airport', 'edinburgh airport', 'glasgow airport', 'dublin airport',
  'belfast', 'bristol airport', 'newcastle airport', 'leeds bradford',
  'o\'hare', 'jfk', 'lax', 'sfo', 'mia', 'fll', 'ord', 'atl', 'dfw', 'den', 'las', 'sea-tac',
  'cdg', 'orly', 'schiphol', 'frankfurt', 'munich airport', 'copenhagen airport', 'bergen airport'
];

// Types that should be EXCLUDED from the cruise map (part of journey but not sailing)
const NON_CRUISE_TYPES = [
  'flight', 'flight_out', 'flight_return', 'flight_connection', 'flight_internal',
  'hotel', 'transfer', 'train'
];

// Types that ARE part of the cruise/sailing route
const CRUISE_TYPES = [
  'port', 'embark', 'embarkation', 'disembark', 'disembarkation',
  'sea', 'scenic', 'tender', 'private_island'
];

// Infer item type if not set (for legacy data)
const inferItemType = (item) => {
  // If type is already specific (not just 'port'), use it
  if (item.type && item.type !== 'port' && item.type !== undefined) return item.type;
  
  const locationName = (item.port || item.location || '').toLowerCase();
  const segment = (item.segment || '').toLowerCase();
  
  // Check if it's an airport
  if (AIRPORT_INDICATORS.some(ind => locationName.includes(ind))) {
    return segment === 'post_cruise' ? 'flight_return' : 'flight_out';
  }
  
  // Check for hotel keywords
  if (locationName.includes('hotel') || locationName.includes('resort')) return 'hotel';
  
  // Pre-cruise segment items (except embark) are likely hotels
  if (segment === 'pre_cruise' && item.type !== 'embark') {
    const ukCities = ['london', 'manchester', 'birmingham', 'edinburgh', 'glasgow', 'dublin'];
    if (ukCities.some(city => locationName.includes(city))) return 'flight_out';
    return 'hotel';
  }
  
  // Post-cruise segment items (except disembark) are likely hotels or return flights
  if (segment === 'post_cruise' && item.type !== 'disembark') {
    const ukCities = ['london', 'manchester', 'birmingham', 'edinburgh', 'glasgow', 'dublin'];
    if (ukCities.some(city => locationName.includes(city))) return 'flight_return';
    return 'hotel';
  }
  
  // UK cities on Day 1 are likely departure flights
  if (item.day === 1) {
    const ukCities = ['london', 'manchester', 'birmingham', 'edinburgh', 'glasgow', 'dublin'];
    if (ukCities.some(city => locationName.includes(city))) return 'flight_out';
  }
  
  return item.type || 'port';
};

// Check if an item type should appear on the cruise map
const isCruiseMapItem = (itemType) => {
  if (!itemType) return true;
  
  // Normalize to lowercase and handle underscores
  const normalizedType = itemType.toLowerCase().replace(/_/g, '_');
  
  if (NON_CRUISE_TYPES.includes(normalizedType)) return false;
  if (CRUISE_TYPES.includes(normalizedType)) return true;
  return normalizedType === 'port';
};

function InteractiveItineraryMap({ itinerary }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentPortIndex, setCurrentPortIndex] = useState(null); // Track current port for navigation
  const [currentStyle, setCurrentStyle] = useState('outdoors');
  const popup = useRef(null);
  
  // Sidebar state - now permanent with two views
  const [sidebarView, setSidebarView] = useState('itinerary'); // 'itinerary' or 'port-details'
  const [selectedPort, setSelectedPort] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [showAllAttractions, setShowAllAttractions] = useState(false);
  const [viewTransition, setViewTransition] = useState(false);
  
  // New: Map/List view toggle
  const [itineraryViewMode, setItineraryViewMode] = useState('map'); // 'map' or 'list'

  // Filter and enrich itinerary data - handle round-trips properly
  const ports = useMemo(() => {
    if (!Array.isArray(itinerary)) {
      logger.warn('InteractiveItineraryMap: itinerary is not an array', itinerary);
      return [];
    }
    
    // Filter to CRUISE ROUTE ITEMS ONLY
    // Exclude: sea days, flights, hotels, transfers (these are journey context, not sailing route)
    // Include: ports, embark, disembark, scenic cruising, tender ports, private islands
    const filtered = itinerary.filter(item => {
      const hasCoords = item.lat && item.lon;
      const portName = (item.port || item.location || '').toLowerCase();
      
      // Exclude sea days (shown in timeline, not on map)
      const isSeaDay = item.is_sea_day || 
                       item.type === 'sea' || 
                       item.type === 'scenic' ||
                       portName.includes('at sea') ||
                       portName.includes('cruising') ||
                       portName === '';
      
      if (isSeaDay) return false;
      
      // Infer type for legacy data
      const inferredType = inferItemType(item);
      
      // Use the type checker to determine if this belongs on the cruise map
      return hasCoords && isCruiseMapItem(inferredType);
    });
    
    logger.debug(`InteractiveItineraryMap: Found ${filtered.length} ports with coordinates out of ${itinerary.length} total items`);
    
    if (filtered.length === 0 && itinerary.length > 0) {
      logger.error('InteractiveItineraryMap: No ports have coordinates!', itinerary);
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
        
        // Return new array without the last port (immutable operation)
        logger.debug(`Round-trip detected: ${first.name} (Days ${first.days.join(' & ')})`);
        return enrichedPorts.slice(0, -1);
      }
    }
    
    return enrichedPorts;
  }, [itinerary]);

  // Get marker color - ALL SAME COLOR for simplicity
  const getMarkerColor = () => {
    return '#0ea5e9'; // Sky blue - consistent for all ports
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Returns distance in km
  };

  // Format distance for display
  const formatDistance = (km) => {
    if (km < 1) {
      return `${Math.round(km * 1000)}m`;
    } else if (km < 10) {
      return `${km.toFixed(1)}km`;
    } else {
      return `${Math.round(km)}km`;
    }
  };

  // Navigate to a specific port and fetch Google Places data
  const navigateToPort = async (index) => {
    if (!map.current || index < 0 || index >= ports.length) return;
    
    // Store scroll position to prevent page jump
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    const port = ports[index];
    setCurrentPortIndex(index);
    setSelectedPort(port);
    
    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY);
    });
    
    // Fly to the port - slower, smoother animation with less zoom
    map.current.flyTo({
      center: [port.lon, port.lat],
      zoom: 7, // Reduced from 10 to 7 for less aggressive zoom
      duration: 2500, // Increased from 1500ms to 2500ms for smoother transition
      essential: true
    });
    
    // Show popup for this port
    if (popup.current) {
      const days = port.days || [port.day];
      const visits = port.visits || null;
      
      let popupHTML = `<div class="port-popup-content">`;
      
      if (days.length > 1) {
        popupHTML += `<div class="port-popup-day">Days ${days.join(', ')}</div>`;
      } else {
        popupHTML += `<div class="port-popup-day">Day ${days[0]}</div>`;
      }
      
      popupHTML += `<div class="port-popup-name">${port.name}</div>`;
      
      if (port.type === 'round-trip' && visits) {
        popupHTML += '<div class="port-popup-badge round-trip">Round-Trip Port</div>';
        popupHTML += '<div class="port-popup-description">';
        visits.forEach(visit => {
          const typeLabel = visit.type === 'embark' ? 'Embarkation' : 
                           visit.type === 'disembark' ? 'Disembarkation' : 'Port of call';
          popupHTML += `<div>• Day ${visit.day}: ${typeLabel}</div>`;
        });
        popupHTML += '</div>';
      } else if (port.description) {
        popupHTML += `<div class="port-popup-description">${port.description}</div>`;
      }
      
      popupHTML += `</div>`;
      
      popup.current
        .setLngLat([port.lon, port.lat])
        .setHTML(popupHTML)
        .addTo(map.current);
    }
    
    // Switch to port details view with fade transition
    setViewTransition(true);
    setTimeout(() => {
      setSidebarView('port-details');
      setViewTransition(false);
    }, 200);
    
    // Fetch Google Places data via serverless proxy
    setShowAllAttractions(false);
    setLoadingAttractions(true);
    
    try {
      const portAttractions = await getPortAttractions(port.lat, port.lon);
      
      // Add distance to each attraction
      const attractionsWithDistance = portAttractions.map(attraction => ({
        ...attraction,
        distance: calculateDistance(port.lat, port.lon, attraction.lat, attraction.lng)
      }));
      
      setAttractions(attractionsWithDistance);
      
      // Add markers for attractions on the map
      if (map.current) {
        // Remove any existing attraction markers
        if (map.current.getLayer('attraction-markers')) {
          map.current.removeLayer('attraction-markers');
        }
        if (map.current.getSource('attractions')) {
          map.current.removeSource('attractions');
        }
        
        // Create GeoJSON for attractions
        const attractionsGeoJSON = {
          type: 'FeatureCollection',
          features: attractionsWithDistance.slice(0, 8).map(attraction => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [attraction.lng, attraction.lat]
            },
            properties: {
              name: attraction.name,
              rating: attraction.rating
            }
          }))
        };
        
        // Add source and layer
        map.current.addSource('attractions', {
          type: 'geojson',
          data: attractionsGeoJSON
        });
        
        map.current.addLayer({
          id: 'attraction-markers',
          type: 'circle',
          source: 'attractions',
          paint: {
            'circle-radius': 6,
            'circle-color': '#c9a961',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.8
          }
        });
      }
    } catch (error) {
      logger.error('Error fetching port attractions:', error);
      setAttractions([]);
    } finally {
      setLoadingAttractions(false);
    }
  };
  
  // Return to itinerary view and reset map
  const returnToItinerary = () => {
    // Store scroll position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    setViewTransition(true);
    
    // Reset map to show all ports and remove attraction markers
    if (map.current && ports.length > 0) {
      setCurrentPortIndex(null);
      if (popup.current) popup.current.remove();
      
      // Remove attraction markers
      if (map.current.getLayer('attraction-markers')) {
        map.current.removeLayer('attraction-markers');
      }
      if (map.current.getSource('attractions')) {
        map.current.removeSource('attractions');
      }
      
      const lats = ports.map(p => p.lat);
      const lons = ports.map(p => p.lon);
      const bounds = [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)]
      ];
      
      map.current.fitBounds(bounds, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        duration: 1500
      });
    }
    
    setTimeout(() => {
      setSidebarView('itinerary');
      setSelectedPort(null);
      setAttractions([]);
      setViewTransition(false);
    }, 200);
    
    // Restore scroll position
    window.scrollTo(scrollX, scrollY);
  };

  // Navigation handlers - Circular navigation
  const goToPrevPort = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevent page scroll by storing and restoring scroll position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    if (currentPortIndex === null) {
      navigateToPort(ports.length - 1); // Start from end
    } else if (currentPortIndex > 0) {
      navigateToPort(currentPortIndex - 1);
    } else {
      // Loop back to the end when at the beginning
      navigateToPort(ports.length - 1);
    }
    
    // Restore scroll position immediately
    window.scrollTo(scrollX, scrollY);
    return false;
  };

  const goToNextPort = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevent page scroll by storing and restoring scroll position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    if (currentPortIndex === null) {
      navigateToPort(0); // Start from beginning
    } else if (currentPortIndex < ports.length - 1) {
      navigateToPort(currentPortIndex + 1);
    } else {
      // Loop back to the beginning when at the end
      navigateToPort(0);
    }
    
    // Restore scroll position immediately
    window.scrollTo(scrollX, scrollY);
    return false;
  };

  // Reset view to show all ports and return sidebar to itinerary
  const resetView = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevent page scroll by storing and restoring scroll position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    if (!map.current || ports.length === 0) return false;
    
    setCurrentPortIndex(null);
    if (popup.current) popup.current.remove();
    
    // Remove attraction markers
    if (map.current.getLayer('attraction-markers')) {
      map.current.removeLayer('attraction-markers');
    }
    if (map.current.getSource('attractions')) {
      map.current.removeSource('attractions');
    }
    
    // Return sidebar to itinerary view
    setViewTransition(true);
    setTimeout(() => {
      setSidebarView('itinerary');
      setSelectedPort(null);
      setAttractions([]);
      setViewTransition(false);
    }, 150);
    
    const lats = ports.map(p => p.lat);
    const lons = ports.map(p => p.lon);
    const bounds = [
      [Math.min(...lons), Math.min(...lats)],
      [Math.max(...lons), Math.max(...lats)]
    ];
    
    map.current.fitBounds(bounds, {
      padding: { top: 80, bottom: 80, left: 80, right: 80 },
      duration: 1500
    });
    
    // Restore scroll position immediately
    window.scrollTo(scrollX, scrollY);
    return false;
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
      logger.warn('Mapbox not enabled or no access token');
      return;
    }
    
    if (ports.length === 0) {
      logger.warn('No ports to display on map');
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

    // Add navigation controls (zoom only, no compass)
    map.current.addControl(new mapboxgl.NavigationControl({ 
      showCompass: false,
      visualizePitch: false 
    }), 'top-right');

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
        const portIndex = props.index;
        
        // Use navigateToPort to handle the click (keeps state in sync)
        navigateToPort(portIndex);
      });
    });

    // Cleanup - defensive checks to avoid errors on unmounted instances
    return () => {
      try {
        if (popup.current) {
          popup.current.remove();
          popup.current = null;
        }
      } catch {
        // Ignore popup removal errors
      }
      
      try {
        if (map.current) {
          // Remove all event listeners first
          map.current.off();
          map.current.remove();
          map.current = null;
        }
      } catch {
        // Ignore map removal errors on unmount
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ports, portsGeoJSON, apiConfig.mapbox.enabled, apiConfig.mapbox.accessToken, apiConfig.mapbox.style]);

  // Handle map resize when switching between map and list view
  useEffect(() => {
    // When switching back to map view, resize the map to match the container
    // Since container is now always in DOM (just hidden), we need to resize when it becomes visible
    if (itineraryViewMode === 'map' && map.current) {
      // Wait for CSS transition to complete, then resize the map
      const timeoutId = setTimeout(() => {
        try {
          if (map.current && map.current.loaded()) {
            // Resize the map to recalculate dimensions after container becomes visible
            map.current.resize();
          }
        } catch (error) {
          logger.error('Error resizing map:', error);
        }
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [itineraryViewMode]);

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
        <p><strong>Map coordinates not yet generated</strong></p>
        <p className="error-hint">
          This offer has an itinerary, but port coordinates haven't been generated yet.
          <br />
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
            (The map will appear once coordinates are generated in the CRM)
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="interactive-itinerary-map-container">
      {/* View Mode Toggle */}
      <div className="itinerary-view-toggle">
        <button 
          type="button"
          className={`view-toggle-btn ${itineraryViewMode === 'map' ? 'active' : ''}`}
          onClick={() => setItineraryViewMode('map')}
          title="Map View"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Map view
        </button>
        <button 
          type="button"
          className={`view-toggle-btn ${itineraryViewMode === 'list' ? 'active' : ''}`}
          onClick={() => setItineraryViewMode('list')}
          title="List View"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          List view
        </button>
      </div>
      
      {/* Map View - Original layout with map and sidebar */}
      <div className={`interactive-itinerary-map-layout ${itineraryViewMode === 'map' ? '' : 'hidden'}`}>
          {/* Map Section - 2/3 width */}
          <div className="interactive-itinerary-map-wrapper">
            <div ref={mapContainer} className="interactive-itinerary-map">
            {/* Style Switcher - Inside map container for fullscreen access */}
            <div className="map-style-switcher">
              <button 
                type="button"
                className={`map-style-btn ${currentStyle === 'outdoors' ? 'active' : ''}`}
                onClick={() => handleStyleChange('outdoors')}
                title="Outdoors (Terrain)"
              >
                🗺️
              </button>
              <button 
                type="button"
                className={`map-style-btn ${currentStyle === 'satellite' ? 'active' : ''}`}
                onClick={() => handleStyleChange('satellite')}
                title="Satellite View"
              >
                🛰️
              </button>
              <button 
                type="button"
                className={`map-style-btn ${currentStyle === 'streets' ? 'active' : ''}`}
                onClick={() => handleStyleChange('streets')}
                title="Street Map"
              >
                📍
              </button>
              <button 
                type="button"
                className="map-style-btn map-centre-btn"
                onClick={resetView}
                title="Show Full Itinerary"
              >
                ⟲
              </button>
            </div>

            {/* Port Navigation - Bottom of map */}
            <div className="map-port-navigation">
              <button 
                type="button"
                className="map-nav-btn"
                onClick={goToPrevPort}
                title="Previous Port (loops to end)"
              >
                ← Prev
              </button>
              
              <div className="map-nav-info">
                {currentPortIndex !== null ? (
                  <>
                    <span className="map-nav-current">
                      {ports[currentPortIndex]?.name}
                    </span>
                    <span className="map-nav-counter">
                      {currentPortIndex + 1} of {ports.length}
                    </span>
                  </>
                ) : (
                  <span className="map-nav-hint">Click a port or use arrows</span>
                )}
              </div>
              
              <button 
                type="button"
                className="map-nav-btn"
                onClick={goToNextPort}
                title="Next Port (loops to start)"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
        
        {/* Permanent Sidebar - 1/3 width */}
        <aside className={`itinerary-sidebar ${viewTransition ? 'transitioning' : ''}`}>
          {sidebarView === 'itinerary' ? (
            /* Day-by-Day Itinerary View */
            <div className="sidebar-itinerary-view">
              <div className="sidebar-header">
                <h3 className="sidebar-title">Day-by-Day Itinerary</h3>
                <p className="sidebar-subtitle">Click any day to explore what to do in port</p>
              </div>
              
              <div className="sidebar-content">
                <div className="itinerary-day-list">
                  {itinerary.map((day, index) => {
                    const isSeaDay = day.is_sea_day || 
                                   day.type === 'sea' || 
                                   day.type === 'SEA' ||
                                   (day.port || '').toLowerCase().includes('at sea') ||
                                   (day.port || '').toLowerCase().includes('cruising');
                    
                    const portIndex = ports.findIndex(p => p.day === day.day);
                    const isClickable = !isSeaDay && portIndex !== -1;
                    
                    // Determine day type for icon - normalize to lowercase for comparison
                    const rawType = day.type || (isSeaDay ? 'sea' : 'port');
                    const dayType = rawType.toLowerCase().replace(/_/g, '_');
                    
                    const handleDayClick = (e) => {
                      if (!isClickable) return;
                      e.preventDefault();
                      e.stopPropagation();
                      // Preserve scroll position
                      const scrollY = window.scrollY;
                      const scrollX = window.scrollX;
                      navigateToPort(portIndex);
                      // Restore scroll position after a tick
                      requestAnimationFrame(() => {
                        window.scrollTo(scrollX, scrollY);
                      });
                    };
                    
                    return (
                      <div
                        key={index}
                        className={`itinerary-day-item ${isSeaDay ? 'sea-day' : 'port-day'} ${isClickable ? 'clickable' : ''}`}
                        onClick={handleDayClick}
                        role={isClickable ? 'button' : undefined}
                        tabIndex={isClickable ? 0 : undefined}
                      >
                        <div className="day-icon">
                          {(dayType === 'flight' || dayType === 'flight_out' || dayType === 'flight_return' || dayType === 'fly') && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          )}
                          {(dayType === 'hotel' || dayType === 'stay') && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                              <path d="M1 21h22"/>
                              <path d="M9 7h1"/>
                              <path d="M9 11h1"/>
                              <path d="M14 7h1"/>
                              <path d="M14 11h1"/>
                            </svg>
                          )}
                          {dayType === 'train' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="4" y="3" width="16" height="16" rx="2"/>
                              <path d="M4 11h16"/>
                              <path d="M12 3v8"/>
                              <path d="M8 19l-2 3"/>
                              <path d="M16 19l2 3"/>
                              <circle cx="8" cy="15" r="1"/>
                              <circle cx="16" cy="15" r="1"/>
                            </svg>
                          )}
                          {(dayType === 'port' || dayType === 'embark' || dayType === 'embarkation' || dayType === 'disembark' || dayType === 'disembarkation' || dayType === 'private_island') && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 6.5v7.5M19 13.5c0-4-7-7-7-7s-7 3-7 7c0 1.66 7 4 7 4s7-2.34 7-4z"/>
                              <path d="M1 20h22"/>
                            </svg>
                          )}
                          {dayType === 'sea' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 20h.01M7 20h.01M12 20h.01M17 20h.01M22 20h.01"/>
                              <path d="M12 4v12"/>
                            </svg>
                          )}
                        </div>
                        <div className="day-number">Day {day.day}</div>
                        <div className="day-details">
                          <div className="day-port">{day.port || day.location || 'At Sea'}</div>
                          {day.description && (
                            <div className="day-description">{day.description}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Port Details View */
            <div className="sidebar-port-view">
              <div className="sidebar-header">
                <button 
                  type="button" 
                  className="sidebar-back-btn"
                  onClick={returnToItinerary}
                  title="Back to itinerary"
                >
                  ← Back to Itinerary
                </button>
                <div className="sidebar-port-day">
                  {selectedPort?.days?.length > 1 
                    ? `Days ${selectedPort.days.join(' & ')}` 
                    : `Day ${selectedPort?.day}`}
                </div>
                <h3 className="sidebar-port-name">{selectedPort?.name}</h3>
              </div>
              
              <div className="sidebar-content">
                {loadingAttractions ? (
                  <div className="sidebar-loading">
                    <div className="loading-spinner"></div>
                    <p>Discovering local attractions...</p>
                  </div>
                ) : attractions.length > 0 ? (
                  <>
                    <h4 className="sidebar-section-title">
                      🏛️ Things To Do
                    </h4>
                    <p className="sidebar-section-subtitle">
                      Top-rated attractions and experiences near the port
                    </p>
                    <div className="attractions-list">
                      {(showAllAttractions ? attractions : attractions.slice(0, 4)).map(place => (
                        <a 
                          key={place.id} 
                          className="attraction-card"
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="attraction-name">{place.name}</div>
                          <div className="attraction-meta">
                            {place.rating > 0 && (
                              <div className="attraction-rating">
                                ⭐ {place.rating.toFixed(1)}
                                {place.ratingCount > 0 && (
                                  <span className="rating-count">({place.ratingCount.toLocaleString()})</span>
                                )}
                              </div>
                            )}
                            {place.distance !== undefined && (
                              <div className="attraction-distance">
                                📍 {formatDistance(place.distance)} from port
                              </div>
                            )}
                          </div>
                          {place.types && place.types.length > 0 && (
                            <div className="attraction-types">
                              {place.types.slice(0, 3).map((type, idx) => (
                                <span key={idx} className="attraction-type-tag">
                                  {type.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                    
                    {attractions.length > 4 && !showAllAttractions && (
                      <button 
                        type="button"
                        className="view-more-btn"
                        onClick={() => setShowAllAttractions(true)}
                      >
                        View {attractions.length - 4} more attractions →
                      </button>
                    )}
                    
                    {showAllAttractions && attractions.length > 4 && (
                      <button 
                        type="button"
                        className="view-more-btn"
                        onClick={() => setShowAllAttractions(false)}
                      >
                        Show less
                      </button>
                    )}
                  </>
                ) : (
                  <div className="sidebar-empty">
                    <p>No attractions data available for this port yet.</p>
                    <p style={{ marginTop: '12px', fontSize: '13px' }}>
                      Try searching on Google Maps for local recommendations.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Footer with Google Maps link */}
              <div className="sidebar-footer">
                <a 
                  href={`https://www.google.com/maps/search/things+to+do+near+${encodeURIComponent(selectedPort?.name || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-maps-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Explore more on Google Maps
                </a>
              </div>
            </div>
          )}
        </aside>
      </div>
      
      {/* List View - Tabular format like Bolsover */}
      <div className={`itinerary-list-view ${itineraryViewMode === 'list' ? '' : 'hidden'}`}>
          <table className="itinerary-table">
            <thead>
              <tr>
                <th>Stop</th>
                <th>Date</th>
                <th>Port / Location</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {itinerary.map((day, index) => {
                const isSeaDay = day.is_sea_day || 
                               day.type === 'sea' || 
                               day.type === 'SEA' ||
                               (day.port || '').toLowerCase().includes('at sea') ||
                               (day.port || '').toLowerCase().includes('cruising');
                
                const rawType = day.type || (isSeaDay ? 'sea' : 'port');
                const dayType = rawType.toLowerCase().replace(/_/g, '_');
                
                return (
                  <tr key={index} className={isSeaDay ? 'sea-day-row' : 'port-day-row'}>
                    <td className="stop-cell">
                      <div className="stop-icon">
                        {(dayType === 'flight' || dayType === 'flight_out' || dayType === 'flight_return' || dayType === 'fly') && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                          </svg>
                        )}
                        {(dayType === 'hotel' || dayType === 'stay') && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                            <path d="M1 21h22"/>
                            <path d="M9 7h1"/>
                            <path d="M9 11h1"/>
                            <path d="M14 7h1"/>
                            <path d="M14 11h1"/>
                          </svg>
                        )}
                        {dayType === 'train' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="3" width="16" height="16" rx="2"/>
                            <path d="M4 11h16"/>
                            <path d="M12 3v8"/>
                            <path d="M8 19l-2 3"/>
                            <path d="M16 19l2 3"/>
                            <circle cx="8" cy="15" r="1"/>
                            <circle cx="16" cy="15" r="1"/>
                          </svg>
                        )}
                        {(dayType === 'port' || dayType === 'embark' || dayType === 'embarkation' || dayType === 'disembark' || dayType === 'disembarkation' || dayType === 'private_island') && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 6.5v7.5M19 13.5c0-4-7-7-7-7s-7 3-7 7c0 1.66 7 4 7 4s7-2.34 7-4z"/>
                            <path d="M1 20h22"/>
                          </svg>
                        )}
                        {dayType === 'sea' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 20h.01M7 20h.01M12 20h.01M17 20h.01M22 20h.01"/>
                            <path d="M12 4v12"/>
                          </svg>
                        )}
                      </div>
                      <span className="stop-number">{index + 1}</span>
                    </td>
                    <td className="date-cell">
                      <div className="day-label">Day {day.day}</div>
                      {day.date && <div className="day-date">{day.date}</div>}
                    </td>
                    <td className="port-cell">
                      <strong>{day.port || day.location || 'At Sea'}</strong>
                    </td>
                    <td className="activity-cell">
                      {day.description || (isSeaDay ? 'Relaxing at sea' : 'Port visit')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      
      {/* Disclaimer - small text below map */}
      <div className="itinerary-map-disclaimer">
        <p>This map displays cruise ports only. Flights and hotels are not included in the route visualisation.</p>
        <p>Attraction and destination information is provided by Google Places and is for guidance purposes only. Limitless Cruises is not affiliated with, endorsed by, or responsible for the accuracy of third-party data. We recommend verifying details independently before making plans.</p>
      </div>
    </div>
  );
}

export default InteractiveItineraryMap;
