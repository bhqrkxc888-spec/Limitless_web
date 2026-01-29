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

import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { apiConfig } from '../config/apiConfig';
import { ports as portGuides } from '../data/ports';
import { getPortGuideSlug, getPortGuideUrl } from '../utils/portNameMapping';
import { generateCruiseRoute } from '../utils/maritimeRouting';
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

// Transport type classifications
const TRANSPORT_TYPES = {
  cruise: ['port', 'embark', 'embarkation', 'disembark', 'disembarkation', 'sea', 'scenic', 'tender', 'private_island'],
  flight: ['flight', 'flight_out', 'flight_return', 'flight_connection', 'flight_internal', 'fly'],
  rail: ['train', 'rail', 'rocky_mountaineer'],
  hotel: ['hotel', 'stay', 'resort'],
  transfer: ['transfer', 'coach', 'bus'],
};

// Transport styling configuration
const TRANSPORT_STYLES = {
  cruise: { color: '#0ea5e9', icon: '🚢', lineStyle: 'dashed', lineWidth: 3 },
  flight: { color: '#8b5cf6', icon: '✈️', lineStyle: 'arc', lineWidth: 2 },
  rail: { color: '#10b981', icon: '🚂', lineStyle: 'solid', lineWidth: 3 },
  hotel: { color: '#f59e0b', icon: '🏨', lineStyle: null, lineWidth: 0 },
  transfer: { color: '#6b7280', icon: '🚐', lineStyle: 'dotted', lineWidth: 2 },
  default: { color: '#64748b', icon: '📍', lineStyle: 'solid', lineWidth: 2 },
};

// Classify a transport type
const classifyTransport = (type) => {
  if (!type) return 'cruise';
  const normalizedType = type.toLowerCase().replace(/_/g, '_');
  
  for (const [category, types] of Object.entries(TRANSPORT_TYPES)) {
    if (types.includes(normalizedType)) return category;
  }
  return 'cruise'; // Default to cruise for ports
};

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

// Check if an item type should appear on the cruise map (cruise ports only)
const isCruiseMapItem = (itemType) => {
  if (!itemType) return true;
  const category = classifyTransport(itemType);
  return category === 'cruise';
};

// Get port guide data for a port name
const getPortGuideData = (portName) => {
  const slug = getPortGuideSlug(portName);
  if (!slug) return null;
  return portGuides.find(p => p.slug === slug) || null;
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
  const [loadingAttractions, setLoadingAttractions] = useState(false);
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


  // Navigate to a specific port and load port guide data
  const navigateToPort = useCallback((index) => {
    if (!map.current || index < 0 || index >= ports.length) return;
    
    const port = ports[index];
    
    // CRITICAL: Lock scroll IMMEDIATELY before any state changes or map operations
    const scrollY = window.scrollY;
    const lockScroll = () => window.scrollTo(0, scrollY);
    window.addEventListener('scroll', lockScroll);
    
    // Remove any existing popup FIRST to prevent scroll-to-popup behavior
    if (popup.current) {
      popup.current.remove();
    }
    
    // Update state
    setCurrentPortIndex(index);
    setSelectedPort(port);
    
    // Fly to the port - the map will center on this location
    map.current.flyTo({
      center: [port.lon, port.lat],
      zoom: 7,
      duration: 2500,
      essential: false
    });
    
    // Show popup ONLY AFTER map has finished moving (prevents scroll-to-popup)
    map.current.once('moveend', () => {
      if (popup.current && map.current) {
        const days = port.days || [port.day];
        const visits = port.visits || null;
        const portGuide = getPortGuideData(port.name);
        
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
        } else if (portGuide?.tagline) {
          popupHTML += `<div class="port-popup-description">${portGuide.tagline}</div>`;
        } else if (port.description) {
          popupHTML += `<div class="port-popup-description">${port.description}</div>`;
        }
        
        // Add port guide link if available
        const portGuideUrl = getPortGuideUrl(port.name);
        if (portGuideUrl) {
          popupHTML += `<a href="${portGuideUrl}" class="port-popup-link" target="_blank">View Port Guide →</a>`;
        }
        
        popupHTML += `</div>`;
        
        popup.current
          .setLngLat([port.lon, port.lat])
          .setHTML(popupHTML)
          .addTo(map.current);
      }
      
      // Release scroll lock after popup is shown
      setTimeout(() => window.removeEventListener('scroll', lockScroll), 100);
    });
    
    // Switch to port details view with fade transition
    setViewTransition(true);
    setTimeout(() => {
      setSidebarView('port-details');
      setViewTransition(false);
    }, 200);
    
    // Load port guide data (no external API call needed)
    setLoadingAttractions(true);
    
    // Brief delay for transition effect
    setTimeout(() => {
      setLoadingAttractions(false);
    }, 300);
  }, [ports]);
  
  // Return to itinerary view and reset map
  const returnToItinerary = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
      
      // Lock scroll during animation to prevent page jumping
      const scrollY = window.scrollY;
      const lockScroll = () => window.scrollTo(0, scrollY);
      window.addEventListener('scroll', lockScroll);
      
      map.current.fitBounds(bounds, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        duration: 1500
      });
      
      setTimeout(() => window.removeEventListener('scroll', lockScroll), 1600);
    }
    
    setTimeout(() => {
      setSidebarView('itinerary');
      setSelectedPort(null);
      setViewTransition(false);
    }, 200);
  };

  // Navigation handlers - Circular navigation through PORTS ONLY (skips sea days)
  // The ports array already excludes sea days, so navigation naturally skips them
  // Added scroll lock to prevent page jumping during navigation
  const goToPrevPort = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Lock scroll position before any state changes
    const scrollY = window.scrollY;
    const lockScroll = () => window.scrollTo(0, scrollY);
    window.addEventListener('scroll', lockScroll);
    
    if (currentPortIndex === null) {
      navigateToPort(ports.length - 1);
    } else if (currentPortIndex > 0) {
      navigateToPort(currentPortIndex - 1);
    } else {
      navigateToPort(ports.length - 1);
    }
    
    // Remove scroll lock after navigation completes
    setTimeout(() => window.removeEventListener('scroll', lockScroll), 3000);
    
    return false;
  };

  const goToNextPort = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Lock scroll position before any state changes
    const scrollY = window.scrollY;
    const lockScroll = () => window.scrollTo(0, scrollY);
    window.addEventListener('scroll', lockScroll);
    
    if (currentPortIndex === null) {
      navigateToPort(0);
    } else if (currentPortIndex < ports.length - 1) {
      navigateToPort(currentPortIndex + 1);
    } else {
      navigateToPort(0);
    }
    
    // Remove scroll lock after navigation completes
    setTimeout(() => window.removeEventListener('scroll', lockScroll), 3000);
    
    return false;
  };

  // Reset view to show all ports and return sidebar to itinerary
  const resetView = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
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
      setViewTransition(false);
    }, 150);
    
    const lats = ports.map(p => p.lat);
    const lons = ports.map(p => p.lon);
    const bounds = [
      [Math.min(...lons), Math.min(...lats)],
      [Math.max(...lons), Math.max(...lats)]
    ];
    
    // Lock scroll during animation to prevent page jumping
    const scrollY = window.scrollY;
    const lockScroll = () => window.scrollTo(0, scrollY);
    window.addEventListener('scroll', lockScroll);
    
    map.current.fitBounds(bounds, {
      padding: { top: 80, bottom: 80, left: 80, right: 80 },
      duration: 1500
    });
    
    setTimeout(() => window.removeEventListener('scroll', lockScroll), 1600);
    
    return false;
  };

  // Keyboard navigation for map
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if map container is in viewport and user isn't typing
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (!mapContainer.current) return;
      
      const rect = mapContainer.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInViewport) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPort();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPort();
          break;
        case 'Escape':
          e.preventDefault();
          if (sidebarView === 'port-details') {
            returnToItinerary();
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPortIndex, sidebarView]);

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

  // Create GeoJSON for route line connecting ports using maritime waypoints
  const routeGeoJSON = useMemo(() => {
    if (ports.length < 2) return null;

    // Check if first port is a round-trip (meaning we need to close the circuit)
    const isRoundTrip = ports[0]?.isRoundTrip === true;
    
    // Create a copy of ports for route generation
    let portsForRoute = [...ports];
    
    // If it's a round-trip, add the first port at the end to close the circuit
    if (isRoundTrip && ports.length >= 2) {
      portsForRoute.push({ ...ports[0] });
    }

    // Use maritime routing to generate sea-aware route (avoids land crossings)
    const coordinates = generateCruiseRoute(portsForRoute);

    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates
      },
      properties: {}
    };
  }, [ports])

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
    // Use mercator projection for flat map (not globe-like at low zoom)
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: apiConfig.mapbox.style,
      bounds: bounds,
      fitBoundsOptions: {
        padding: { top: 80, bottom: 80, left: 80, right: 80 }
      },
      pitch: 0, // Start flat, user can tilt
      bearing: 0,
      projection: 'mercator' // Flat map projection, not globe
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

      // Add route line source (before ports so it renders underneath)
      if (routeGeoJSON) {
        map.current.addSource('route', {
          type: 'geojson',
          data: routeGeoJSON
        });

        // Add route line layer - dashed line for cruise route
        map.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#0ea5e9',
            'line-width': 3,
            'line-opacity': 0.7,
            'line-dasharray': [2, 1]
          }
        });
      }

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

      // Click handler for ports - use scroll lock for map clicks too
      map.current.on('click', 'port-circles', (e) => {
        const feature = e.features[0];
        const props = feature.properties;
        const portIndex = props.index;
        navigateToPort(portIndex);
      });
      
      // Global scroll lock during ANY map movement to prevent page jumping
      let scrollLockY = null;
      let scrollLockHandler = null;
      
      map.current.on('movestart', () => {
        scrollLockY = window.scrollY;
        scrollLockHandler = () => window.scrollTo(0, scrollLockY);
        window.addEventListener('scroll', scrollLockHandler);
      });
      
      map.current.on('moveend', () => {
        // Remove scroll lock after animation completes
        setTimeout(() => {
          if (scrollLockHandler) {
            window.removeEventListener('scroll', scrollLockHandler);
            scrollLockHandler = null;
          }
        }, 100);
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

      // Re-add route line source
      if (routeGeoJSON) {
        map.current.addSource('route', {
          type: 'geojson',
          data: routeGeoJSON
        });
        map.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#0ea5e9',
            'line-width': 3,
            'line-opacity': 0.7,
            'line-dasharray': [2, 1]
          }
        });
      }
      
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
      {/* VIEW MODE TOGGLE - At top */}
      <div className="itinerary-view-toggle">
        <button 
          type="button"
          className={`view-toggle-btn ${itineraryViewMode === 'map' ? 'active' : ''}`}
          onClick={() => setItineraryViewMode('map')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Map
        </button>
        <button 
          type="button"
          className={`view-toggle-btn ${itineraryViewMode === 'list' ? 'active' : ''}`}
          onClick={() => setItineraryViewMode('list')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          List
        </button>
      </div>

      {/* ===== MAP VIEW MODE ===== */}
      {itineraryViewMode === 'map' && (
        <>
          {/* BOX 1: THE ACTUAL MAP - Full width at top */}
          <div className="map-box">
            <div ref={mapContainer} className="interactive-itinerary-map">
              {/* Map controls overlay */}
              <div className="map-style-switcher">
                <button type="button" className={`map-style-btn ${currentStyle === 'outdoors' ? 'active' : ''}`} onClick={() => handleStyleChange('outdoors')} title="Terrain">🗺️</button>
                <button type="button" className={`map-style-btn ${currentStyle === 'satellite' ? 'active' : ''}`} onClick={() => handleStyleChange('satellite')} title="Satellite">🛰️</button>
                <button type="button" className={`map-style-btn ${currentStyle === 'streets' ? 'active' : ''}`} onClick={() => handleStyleChange('streets')} title="Streets">📍</button>
                <button type="button" className="map-style-btn" onClick={resetView} title="Reset View">⟲</button>
              </div>
              <div className="map-port-navigation">
                <button type="button" className="map-nav-btn" onClick={goToPrevPort}>← Prev</button>
                <div className="map-nav-info">
                  {currentPortIndex !== null ? (
                    <><span className="map-nav-current">{ports[currentPortIndex]?.name}</span><span className="map-nav-counter">{currentPortIndex + 1} of {ports.length}</span></>
                  ) : (
                    <span className="map-nav-hint">Click a port to explore</span>
                  )}
                </div>
                <button type="button" className="map-nav-btn" onClick={goToNextPort}>Next →</button>
              </div>
            </div>
          </div>

          {/* BOX 2: ITINERARY LIST + PORT DETAILS - Below map */}
          <div className={`itinerary-box ${selectedPort ? 'has-selection' : ''}`}>
            {/* Left side: Day List (always visible) */}
            <div className="itinerary-list-side">
              <div className="list-header">
                <h4>Your Itinerary</h4>
                <span className="port-count">{ports.length} ports</span>
              </div>
              <div className="list-content">
                {itinerary.map((day, index) => {
                  const isSeaDay = day.is_sea_day || day.type === 'sea' || day.type === 'SEA' ||
                    (day.port || '').toLowerCase().includes('at sea') || (day.port || '').toLowerCase().includes('cruising');
                  const portIndex = ports.findIndex(p => p.day === day.day);
                  const isClickable = !isSeaDay && portIndex !== -1;
                  const isSelected = currentPortIndex === portIndex && portIndex !== -1;
                  const rawType = day.type || (isSeaDay ? 'sea' : 'port');
                  const dayType = rawType.toLowerCase();

                  return (
                    <div
                      key={index}
                      className={`list-day-item ${isSeaDay ? 'sea-day' : 'port-day'} ${isClickable ? 'clickable' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Lock scroll position when clicking ANY item
                        const scrollY = window.scrollY;
                        requestAnimationFrame(() => window.scrollTo(0, scrollY));
                        if (isClickable) {
                          navigateToPort(portIndex);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        // Blur any focused element to prevent scroll
                        if (document.activeElement) {
                          document.activeElement.blur();
                        }
                      }}
                      onFocus={(e) => {
                        // Prevent focus-induced scroll by immediately restoring scroll position
                        if (!isClickable) {
                          e.target.blur();
                        }
                      }}
                      role={isClickable ? 'button' : undefined}
                      tabIndex={isClickable ? 0 : undefined}
                    >
                      <div className="day-label">
                        <span className="day-num">Day {day.day}</span>
                        {dayType === 'sea' && <span className="type-badge sea">At Sea</span>}
                        {(dayType === 'embark' || dayType === 'embarkation') && <span className="type-badge embark">Embark</span>}
                        {(dayType === 'disembark' || dayType === 'disembarkation') && <span className="type-badge disembark">Disembark</span>}
                      </div>
                      <div className="port-name">{day.port || day.location || 'At Sea'}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Port Details (only when port selected) */}
            {selectedPort && (
              <div className={`port-details-side ${viewTransition ? 'transitioning' : ''}`}>
                <div className="details-header">
                  <button type="button" className="back-btn" onClick={returnToItinerary}>← Back</button>
                  <span className="day-badge">
                    {selectedPort?.days?.length > 1 ? `Days ${selectedPort.days.join(' & ')}` : `Day ${selectedPort?.day}`}
                  </span>
                </div>
                <h3 className="details-port-name">{selectedPort?.name}</h3>
                
                {loadingAttractions ? (
                  <div className="loading-spinner-wrap"><div className="loading-spinner"></div></div>
                ) : (() => {
                  const portGuide = getPortGuideData(selectedPort.name);
                  const portGuideUrl = getPortGuideUrl(selectedPort.name);
                  
                  if (portGuide) {
                    return (
                      <div className="port-details-content">
                        {portGuide.tagline && <p className="tagline">{portGuide.tagline}</p>}
                        {portGuide.description && <p className="description">{portGuide.description}</p>}
                        {portGuide.quickFacts && (
                          <div className="quick-facts">
                            {portGuide.quickFacts.currency && <div className="fact">💷 {portGuide.quickFacts.currency}</div>}
                            {portGuide.quickFacts.language && <div className="fact">🗣️ {portGuide.quickFacts.language}</div>}
                            {portGuide.quickFacts.timezone && <div className="fact">🕐 {portGuide.quickFacts.timezone}</div>}
                          </div>
                        )}
                        {portGuideUrl && (
                          <a href={portGuideUrl} className="port-guide-cta" target="_blank" rel="noopener noreferrer">
                            View Complete Port Guide →
                          </a>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div className="port-details-content">
                      <p className="placeholder">{selectedPort?.description || `Port guide coming soon for ${selectedPort?.name}.`}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </>
      )}

      {/* ===== LIST VIEW MODE ===== */}
      {itineraryViewMode === 'list' && (
        <div className="table-view-box">
          <table className="itinerary-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Port / Location</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {itinerary.map((day, index) => {
                const isSeaDay = day.is_sea_day || day.type === 'sea' || day.type === 'SEA' ||
                  (day.port || '').toLowerCase().includes('at sea') || (day.port || '').toLowerCase().includes('cruising');
                return (
                  <tr key={index} className={isSeaDay ? 'sea-day-row' : 'port-day-row'}>
                    <td>Day {day.day}</td>
                    <td><strong>{day.port || day.location || 'At Sea'}</strong></td>
                    <td>{day.description || (isSeaDay ? 'Relaxing at sea' : 'Port visit')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Disclaimer */}
      <div className="itinerary-map-disclaimer">
        <p>Map shown for visual purposes only and may not be 100% accurate.</p>
      </div>
    </div>
  );
}

export default InteractiveItineraryMap;
