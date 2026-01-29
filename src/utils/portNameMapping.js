/**
 * Port Name Matching Utilities
 * 
 * Maps itinerary port names to port guide slugs for linking.
 * Supports fuzzy matching for variations in port names.
 */

// Comprehensive port name to slug mapping
const PORT_NAME_MAPPINGS = {
  // UK
  'southampton': 'southampton',
  'dover': 'dover',
  'liverpool': 'liverpool',
  'tilbury': 'tilbury',
  'greenock': 'greenock',
  'edinburgh': 'edinburgh',
  'invergordon': 'invergordon',
  'lerwick': 'lerwick',
  'kirkwall': 'kirkwall',
  'belfast': 'belfast',
  'rosyth': 'rosyth',
  
  // Mediterranean
  'barcelona': 'barcelona',
  'palma': 'palma-de-mallorca',
  'palma de mallorca': 'palma-de-mallorca',
  'mallorca': 'palma-de-mallorca',
  'valencia': 'valencia',
  'malaga': 'malaga',
  'cartagena': 'cartagena',
  'alicante': 'alicante',
  'civitavecchia': 'civitavecchia',
  'rome': 'civitavecchia',
  'naples': 'naples',
  'napoli': 'naples',
  'livorno': 'livorno',
  'florence': 'livorno',
  'genoa': 'genoa',
  'genova': 'genoa',
  'venice': 'venice',
  'marseille': 'marseille',
  'nice': 'nice',
  'villefranche': 'villefranche',
  'monte carlo': 'monte-carlo',
  'monaco': 'monte-carlo',
  'dubrovnik': 'dubrovnik',
  'split': 'split',
  'kotor': 'kotor',
  'santorini': 'santorini',
  'mykonos': 'mykonos',
  'piraeus': 'piraeus',
  'athens': 'piraeus',
  'corfu': 'corfu',
  'valletta': 'valletta',
  'malta': 'valletta',
  
  // Atlantic Coast
  'lisbon': 'lisbon',
  'lisboa': 'lisbon',
  'porto': 'porto',
  'oporto': 'porto',
  'leixoes': 'porto',
  'vigo': 'vigo',
  'cadiz': 'cadiz',
  'cádiz': 'cadiz',
  'seville': 'seville',
  'a coruna': 'a-coruna',
  'la coruña': 'a-coruna',
  'la coruna': 'a-coruna',
  'bilbao': 'bilbao',
  'santander': 'santander',
  'la rochelle': 'la-rochelle',
  'bordeaux': 'bordeaux',
  
  // Atlantic Islands
  'funchal': 'funchal-madeira',
  'madeira': 'funchal-madeira',
  'tenerife': 'santa-cruz-de-tenerife',
  'santa cruz de tenerife': 'santa-cruz-de-tenerife',
  'las palmas': 'las-palmas-gran-canaria',
  'gran canaria': 'las-palmas-gran-canaria',
  'lanzarote': 'lanzarote',
  'arrecife': 'lanzarote',
  'fuerteventura': 'fuerteventura',
  'la palma': 'la-palma',
  'la gomera': 'la-gomera',
  
  // Norwegian Fjords
  'bergen': 'bergen',
  'alesund': 'alesund',
  'ålesund': 'alesund',
  'geiranger': 'geiranger',
  'flam': 'flam',
  'stavanger': 'stavanger',
  'kristiansand': 'kristiansand',
  'oslo': 'oslo',
  'tromso': 'tromso',
  'tromsø': 'tromso',
  'hammerfest': 'hammerfest',
  'honningsvag': 'honningsvag',
  'north cape': 'honningsvag',
  'nordkapp': 'honningsvag',
  'lofoten': 'lofoten',
  'olden': 'olden',
  'hellesylt': 'hellesylt',
  'molde': 'molde',
  'trondheim': 'trondheim',
  'bodo': 'bodo',
  'bodø': 'bodo',
  
  // Caribbean (future)
  'nassau': 'nassau',
  'cozumel': 'cozumel',
  'grand cayman': 'grand-cayman',
  'st maarten': 'st-maarten',
  'st thomas': 'st-thomas',
  'san juan': 'san-juan',
  'barbados': 'barbados',
  'antigua': 'antigua',
  'st lucia': 'st-lucia',
  'aruba': 'aruba',
  'curacao': 'curacao',
  
  // Alaska (future)
  'juneau': 'juneau',
  'ketchikan': 'ketchikan',
  'skagway': 'skagway',
  'sitka': 'sitka',
  'glacier bay': 'glacier-bay',
  'victoria': 'victoria-bc',
  'vancouver': 'vancouver',
  'seattle': 'seattle',
};

/**
 * Normalize a port name for matching
 */
function normalizePortName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars
    .trim();
}

/**
 * Get port guide slug from any port name variation
 * Returns null if no matching port guide exists
 */
export function getPortGuideSlug(portName) {
  if (!portName) return null;
  
  const normalized = normalizePortName(portName);
  
  // Direct match
  if (PORT_NAME_MAPPINGS[normalized]) {
    return PORT_NAME_MAPPINGS[normalized];
  }
  
  // Try partial match (port name contains a known port)
  for (const [key, slug] of Object.entries(PORT_NAME_MAPPINGS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return slug;
    }
  }
  
  return null;
}

/**
 * Legacy function for G606 compatibility
 */
export function getPortGuideSlugFromG606PortName(portName) {
  return getPortGuideSlug(portName);
}

/**
 * Check if a port has a guide available
 */
export function hasPortGuide(portName) {
  return getPortGuideSlug(portName) !== null;
}

/**
 * Get the URL for a port guide page
 */
export function getPortGuideUrl(portName) {
  const slug = getPortGuideSlug(portName);
  if (!slug) return null;
  return `/ports/${slug}`;
}
