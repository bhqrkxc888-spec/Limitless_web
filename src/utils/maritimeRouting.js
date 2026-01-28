/**
 * Maritime Routing Utilities
 * 
 * Provides waypoints for cruise routes to avoid crossing land.
 * Uses pre-defined waypoints for common maritime passages.
 */

// Maritime waypoints for common passages and chokepoints
// These help cruise routes navigate around peninsulas and through straits
const MARITIME_WAYPOINTS = {
  // Gibraltar Strait - essential for Atlantic/Mediterranean crossings
  gibraltar: { lat: 35.9, lon: -5.5 },
  
  // English Channel waypoints
  channelWest: { lat: 49.5, lon: -5.0 },
  channelEast: { lat: 51.0, lon: 1.5 },
  
  // Bay of Biscay waypoints (avoiding Brittany peninsula)
  biscayNorth: { lat: 47.5, lon: -5.5 },
  biscaySouth: { lat: 43.5, lon: -3.5 },
  
  // Iberian Peninsula waypoints
  capeFinisterre: { lat: 42.9, lon: -9.3 },
  capeSaoVicente: { lat: 37.0, lon: -9.0 },
  
  // Norwegian coast waypoints
  norwegianSouth: { lat: 58.0, lon: 6.0 },
  norwegianMid: { lat: 62.0, lon: 5.0 },
  norwegianNorth: { lat: 69.5, lon: 18.0 },
  
  // North Sea waypoints
  northSeaSouth: { lat: 52.5, lon: 3.5 },
  northSeaNorth: { lat: 58.5, lon: 2.0 },
  
  // Baltic entrance
  skagerrak: { lat: 57.8, lon: 10.0 },
  
  // Mediterranean waypoints
  balearicNorth: { lat: 40.0, lon: 3.0 },
  corsicaWest: { lat: 42.0, lon: 8.5 },
  sardiniaSouth: { lat: 39.0, lon: 9.0 },
  sicilySouth: { lat: 36.5, lon: 14.5 },
  maltaChannel: { lat: 35.5, lon: 14.5 },
  
  // Adriatic entrance
  adriaticSouth: { lat: 40.0, lon: 19.0 },
  
  // Greek waters
  capeMatapan: { lat: 36.4, lon: 22.5 },
  aegeanSouth: { lat: 36.5, lon: 25.5 },
  
  // Suez approach
  suezNorth: { lat: 31.5, lon: 32.3 },
  
  // Caribbean waypoints
  floridaStrait: { lat: 24.5, lon: -81.5 },
  windwardPassage: { lat: 19.8, lon: -73.5 },
  
  // Alaska Inside Passage
  insidePassageSouth: { lat: 54.5, lon: -130.5 },
  insidePassageNorth: { lat: 58.5, lon: -134.5 },
  
  // Panama approach
  panamaCaribbean: { lat: 9.5, lon: -79.5 },
  panamaPacific: { lat: 8.5, lon: -79.5 },
};

// Define regions for smart waypoint selection
const REGIONS = {
  uk: { minLat: 49, maxLat: 61, minLon: -11, maxLon: 2 },
  atlantic: { minLat: 35, maxLat: 50, minLon: -15, maxLon: -1 },
  mediterranean: { minLat: 30, maxLat: 46, minLon: -6, maxLon: 36 },
  norwegian: { minLat: 57, maxLat: 72, minLon: 4, maxLon: 32 },
  canaryMadeira: { minLat: 27, maxLat: 34, minLon: -18, maxLon: -13 },
  caribbean: { minLat: 10, maxLat: 27, minLon: -90, maxLon: -59 },
  alaska: { minLat: 50, maxLat: 65, minLon: -150, maxLon: -120 },
};

/**
 * Determine the region of a coordinate
 */
function getRegion(lat, lon) {
  for (const [name, bounds] of Object.entries(REGIONS)) {
    if (lat >= bounds.minLat && lat <= bounds.maxLat && 
        lon >= bounds.minLon && lon <= bounds.maxLon) {
      return name;
    }
  }
  return 'other';
}

/**
 * Calculate distance between two points (Haversine formula)
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Check if a line segment likely crosses land (simplified check)
 * Uses a heuristic based on known land masses
 */
function likelyCrossesLand(startLat, startLon, endLat, endLon) {
  // Iberian Peninsula check
  if ((startLon < -5 && endLon > 0) || (startLon > 0 && endLon < -5)) {
    const midLat = (startLat + endLat) / 2;
    if (midLat > 36 && midLat < 44) {
      return 'iberian';
    }
  }
  
  // Brittany/France peninsula check  
  if ((startLon < -5 && endLon > -2) || (startLon > -2 && endLon < -5)) {
    const midLat = (startLat + endLat) / 2;
    if (midLat > 46 && midLat < 50) {
      return 'brittany';
    }
  }
  
  // Italy boot check
  if ((startLon < 12 && endLon > 15) || (startLon > 15 && endLon < 12)) {
    const midLat = (startLat + endLat) / 2;
    if (midLat > 38 && midLat < 42) {
      return 'italy';
    }
  }
  
  // Scandinavia check
  if ((startLon < 8 && endLon > 12) || (startLon > 12 && endLon < 8)) {
    const midLat = (startLat + endLat) / 2;
    if (midLat > 55 && midLat < 65) {
      return 'scandinavia';
    }
  }
  
  return null;
}

/**
 * Get waypoints to add between two ports to avoid land crossings
 * Returns an array of waypoint coordinates to insert between the ports
 */
export function getMaritimeWaypoints(startLat, startLon, endLat, endLon) {
  const waypoints = [];
  const startRegion = getRegion(startLat, startLon);
  const endRegion = getRegion(endLat, endLon);
  
  // Check for common route patterns that need waypoints
  
  // UK to Mediterranean (via Gibraltar)
  if (startRegion === 'uk' && endRegion === 'mediterranean') {
    waypoints.push(MARITIME_WAYPOINTS.channelWest);
    waypoints.push(MARITIME_WAYPOINTS.biscayNorth);
    waypoints.push(MARITIME_WAYPOINTS.capeFinisterre);
    waypoints.push(MARITIME_WAYPOINTS.capeSaoVicente);
    waypoints.push(MARITIME_WAYPOINTS.gibraltar);
    return waypoints;
  }
  
  // UK to Canary Islands / Madeira
  if (startRegion === 'uk' && endRegion === 'canaryMadeira') {
    waypoints.push(MARITIME_WAYPOINTS.channelWest);
    waypoints.push(MARITIME_WAYPOINTS.biscayNorth);
    waypoints.push(MARITIME_WAYPOINTS.capeFinisterre);
    waypoints.push(MARITIME_WAYPOINTS.capeSaoVicente);
    return waypoints;
  }
  
  // UK to Atlantic (Portugal, Spain)
  if (startRegion === 'uk' && startRegion === 'atlantic') {
    waypoints.push(MARITIME_WAYPOINTS.channelWest);
    waypoints.push(MARITIME_WAYPOINTS.biscayNorth);
    return waypoints;
  }
  
  // UK to Norwegian Fjords
  if (startRegion === 'uk' && endRegion === 'norwegian') {
    if (startLon < -2) {
      // From western UK ports
      waypoints.push(MARITIME_WAYPOINTS.northSeaNorth);
    }
    return waypoints;
  }
  
  // Atlantic to Mediterranean
  if (startRegion === 'atlantic' && endRegion === 'mediterranean') {
    waypoints.push(MARITIME_WAYPOINTS.gibraltar);
    return waypoints;
  }
  
  // Canary Islands to Mediterranean
  if (startRegion === 'canaryMadeira' && endRegion === 'mediterranean') {
    waypoints.push(MARITIME_WAYPOINTS.gibraltar);
    return waypoints;
  }
  
  // Check for likely land crossings and add intermediate waypoints
  const landCrossing = likelyCrossesLand(startLat, startLon, endLat, endLon);
  
  if (landCrossing === 'iberian') {
    waypoints.push(MARITIME_WAYPOINTS.capeFinisterre);
  } else if (landCrossing === 'brittany') {
    waypoints.push(MARITIME_WAYPOINTS.biscayNorth);
  } else if (landCrossing === 'italy') {
    // Route around Sicily
    if (startLat > endLat) {
      waypoints.push(MARITIME_WAYPOINTS.sicilySouth);
    }
  } else if (landCrossing === 'scandinavia') {
    waypoints.push(MARITIME_WAYPOINTS.norwegianSouth);
  }
  
  return waypoints;
}

/**
 * Generate a smooth curved route between two points
 * Uses great circle interpolation with optional waypoints
 */
export function generateCruiseRoute(ports) {
  if (!ports || ports.length < 2) return [];
  
  const routeSegments = [];
  
  for (let i = 0; i < ports.length - 1; i++) {
    const start = ports[i];
    const end = ports[i + 1];
    
    // Get any needed waypoints
    const waypoints = getMaritimeWaypoints(start.lat, start.lon, end.lat, end.lon);
    
    // Build the segment with all points
    const segmentPoints = [
      { lat: start.lat, lon: start.lon },
      ...waypoints,
      { lat: end.lat, lon: end.lon }
    ];
    
    // Interpolate between each pair of points for smooth curve
    for (let j = 0; j < segmentPoints.length - 1; j++) {
      const p1 = segmentPoints[j];
      const p2 = segmentPoints[j + 1];
      
      // Add interpolated points for smooth curve
      const distance = haversineDistance(p1.lat, p1.lon, p2.lat, p2.lon);
      const numPoints = Math.max(2, Math.floor(distance / 100)); // Point every ~100km
      
      for (let k = 0; k <= numPoints; k++) {
        const t = k / numPoints;
        routeSegments.push([
          p1.lon + t * (p2.lon - p1.lon),
          p1.lat + t * (p2.lat - p1.lat)
        ]);
      }
    }
  }
  
  return routeSegments;
}

/**
 * Generate a flight arc between two airports
 * Creates a curved great circle path
 */
export function generateFlightArc(startLat, startLon, endLat, endLon) {
  const points = [];
  const numPoints = 50;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    
    // Great circle interpolation
    const lat = startLat + t * (endLat - startLat);
    const lon = startLon + t * (endLon - startLon);
    
    // Add arc height (parabolic curve)
    const distance = haversineDistance(startLat, startLon, endLat, endLon);
    const maxAltitude = Math.min(distance / 50, 5); // Degrees of latitude
    const altitude = maxAltitude * 4 * t * (1 - t);
    
    points.push([lon, lat + altitude]);
  }
  
  return points;
}

/**
 * Generate a rail route between two stations
 * Uses straight line (rail follows land)
 */
export function generateRailRoute(startLat, startLon, endLat, endLon) {
  const points = [];
  const numPoints = 20;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = startLat + t * (endLat - startLat);
    const lon = startLon + t * (endLon - startLon);
    points.push([lon, lat]);
  }
  
  return points;
}

export default {
  getMaritimeWaypoints,
  generateCruiseRoute,
  generateFlightArc,
  generateRailRoute,
};
