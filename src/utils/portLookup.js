/**
 * Port Lookup Service - Single Source of Truth
 * 
 * This is the PERMANENT solution for port coordinate lookup.
 * It uses the database as the primary source and has smart matching.
 * 
 * Features:
 * - Smart name normalization (handles "Perfect Day at CocoCay", "Tenerife (overnight)", etc.)
 * - Database-first lookup with fuzzy matching
 * - Auto-alias generation when adding ports
 * - Region-aware coordinate validation
 * - Multiple geocoding strategies
 * - Self-learning: every manual addition improves future lookups
 */

import { createClient } from '@supabase/supabase-js'

// =============================================================================
// CONFIGURATION
// =============================================================================

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN

let supabase = null
function getSupabase() {
  if (!supabase && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    })
  }
  return supabase
}

// =============================================================================
// NAME NORMALIZATION
// =============================================================================

/**
 * Common prefixes used by cruise lines for private islands/experiences
 * These should be stripped to find the actual location
 */
const EXPERIENCE_PREFIXES = [
  'perfect day at',
  'a perfect day at',
  'day at',
  'a day at',
  'visit to',
  'arrival at',
  'departure from',
  'overnight in',
  'overnight at',
  'evening in',
  'morning in',
  'scenic cruising',
  'cruising by',
  'cruising past',
  'sailing by',
  'passing',
]

/**
 * Common suffixes/parenthetical notes to handle
 */
const SUFFIX_PATTERNS = [
  /\s*\(overnight\)\s*$/i,
  /\s*\(day\)\s*$/i,
  /\s*\(tender\)\s*$/i,
  /\s*\(anchor\)\s*$/i,
  /\s*\(docked\)\s*$/i,
  /\s*\(pier\)\s*$/i,
  /\s*\(embarkation\)\s*$/i,
  /\s*\(disembarkation\)\s*$/i,
  /\s*\(scenic cruising\)\s*$/i,
]

/**
 * Known cruise line private islands and their canonical names
 * This is the ONLY hardcoded list and it's just for common aliases
 */
const PRIVATE_ISLAND_ALIASES = {
  'cococay': ['perfect day at cococay', 'coco cay', 'coco beach club'],
  'castaway cay': ['disney castaway cay', 'castaway caye'],
  'half moon cay': ['half moon caye', 'little san salvador'],
  'ocean cay': ['ocean cay msc', 'ocean cay marine reserve', 'msc ocean cay'],
  'great stirrup cay': ['great stirrup caye', 'stirrup cay'],
  'labadee': ['labadie', 'labadi'],
  'harvest caye': ['harvest cay'],
  'princess cays': ['princess cay', 'eleuthera'],
}

/**
 * Normalize a port name to its canonical form
 * This handles all the variations cruise lines use
 * 
 * Examples:
 * - "Perfect Day at CocoCay, Bahamas" → { normalized: "cococay", country: "bahamas", original: "..." }
 * - "Tenerife (overnight)" → { normalized: "tenerife", country: null, original: "..." }
 * - "Civitavecchia (Rome)" → { normalized: "civitavecchia", alternates: ["rome"], original: "..." }
 */
export function normalizePortName(portName) {
  if (!portName || typeof portName !== 'string') {
    return { normalized: '', country: null, alternates: [], original: portName }
  }
  
  const original = portName.trim()
  let working = original.toLowerCase()
  
  // Step 1: Remove experience prefixes
  for (const prefix of EXPERIENCE_PREFIXES) {
    if (working.startsWith(prefix)) {
      working = working.substring(prefix.length).trim()
      break
    }
  }
  
  // Step 2: Handle suffixes and parentheticals
  for (const pattern of SUFFIX_PATTERNS) {
    working = working.replace(pattern, '').trim()
  }
  
  // Step 3: Extract parenthetical alternate names (e.g., "Civitavecchia (Rome)")
  const alternates = []
  const parenMatch = working.match(/^([^(]+)\s*\(([^)]+)\)\s*$/)
  if (parenMatch) {
    working = parenMatch[1].trim()
    const parenContent = parenMatch[2].trim().toLowerCase()
    // Only add as alternate if it's not a descriptor
    if (!['overnight', 'day', 'tender', 'anchor', 'docked', 'pier'].includes(parenContent)) {
      alternates.push(parenContent)
    }
  }
  
  // Step 4: Split by comma to extract country
  let country = null
  const commaParts = working.split(',').map(p => p.trim())
  if (commaParts.length >= 2) {
    working = commaParts[0]
    // Last part is usually the country
    country = commaParts[commaParts.length - 1]
  }
  
  // Step 5: Normalize accents and special characters
  const normalized = working
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/['']/g, "'") // Normalize apostrophes
    .trim()
  
  // Step 6: Check for private island aliases
  for (const [canonical, aliases] of Object.entries(PRIVATE_ISLAND_ALIASES)) {
    if (normalized === canonical || aliases.some(a => normalized.includes(a) || a.includes(normalized))) {
      return {
        normalized: canonical,
        country: country || 'bahamas', // Most private islands are in Bahamas
        alternates: [...alternates, ...aliases.filter(a => a !== normalized)],
        original,
        isPrivateIsland: true
      }
    }
  }
  
  return {
    normalized,
    country,
    alternates,
    original
  }
}

// =============================================================================
// REGION-AWARE COORDINATE VALIDATION
// =============================================================================

/**
 * Geographic regions with expected coordinate ranges
 * Used to catch common errors like wrong longitude sign
 */
const REGIONS = {
  caribbean: {
    latRange: [10, 28],
    lonRange: [-90, -60],
    keywords: ['bahamas', 'caribbean', 'jamaica', 'cayman', 'haiti', 'cuba', 'puerto rico', 
               'virgin islands', 'barbados', 'st lucia', 'grenada', 'antigua', 'aruba', 
               'curacao', 'bonaire', 'dominican', 'turks', 'cozumel', 'costa maya',
               'cococay', 'labadee', 'nassau', 'roatan', 'belize']
  },
  mediterranean: {
    latRange: [30, 46],
    lonRange: [-10, 40],
    keywords: ['italy', 'greece', 'spain', 'france', 'croatia', 'malta', 'cyprus', 
               'turkey', 'morocco', 'tunisia', 'egypt', 'israel', 'montenegro', 
               'barcelona', 'rome', 'venice', 'athens', 'dubrovnik', 'santorini']
  },
  northernEurope: {
    latRange: [50, 72],
    lonRange: [-15, 35],
    keywords: ['norway', 'sweden', 'denmark', 'finland', 'iceland', 'uk', 'ireland',
               'scotland', 'england', 'germany', 'netherlands', 'belgium', 'fjord',
               'bergen', 'oslo', 'copenhagen', 'stockholm', 'reykjavik', 'amsterdam']
  },
  alaska: {
    latRange: [55, 72],
    lonRange: [-180, -130],
    keywords: ['alaska', 'juneau', 'ketchikan', 'skagway', 'sitka', 'glacier bay',
               'hubbard', 'anchorage', 'seward', 'whittier']
  },
  pacificIslands: {
    latRange: [-25, 25],
    lonRange: [100, 180],
    keywords: ['fiji', 'tahiti', 'samoa', 'tonga', 'new caledonia', 'vanuatu',
               'bora bora', 'moorea', 'papeete']
  },
  australia: {
    latRange: [-45, -10],
    lonRange: [110, 180],
    keywords: ['australia', 'new zealand', 'sydney', 'melbourne', 'brisbane',
               'auckland', 'queenstown', 'cairns', 'great barrier']
  },
  asia: {
    latRange: [0, 45],
    lonRange: [95, 145],
    keywords: ['japan', 'china', 'hong kong', 'singapore', 'vietnam', 'thailand',
               'malaysia', 'indonesia', 'philippines', 'taiwan', 'korea',
               'tokyo', 'shanghai', 'bangkok', 'ho chi minh']
  },
  middleEast: {
    latRange: [12, 32],
    lonRange: [30, 60],
    keywords: ['dubai', 'abu dhabi', 'oman', 'qatar', 'bahrain', 'muscat',
               'doha', 'arabian', 'persian gulf', 'red sea']
  }
}

/**
 * Detect the likely region for a port based on name/country
 */
export function detectRegion(portName, country = null) {
  const searchText = `${portName} ${country || ''}`.toLowerCase()
  
  for (const [region, config] of Object.entries(REGIONS)) {
    if (config.keywords.some(kw => searchText.includes(kw))) {
      return { region, ...config }
    }
  }
  
  return null
}

/**
 * Validate and potentially correct coordinates based on region
 * Returns corrected coordinates and any warnings
 */
export function validateCoordinates(lat, lon, portName, country = null) {
  const result = {
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    valid: true,
    corrected: false,
    warnings: []
  }
  
  // Basic range validation
  if (result.lat < -90 || result.lat > 90) {
    result.valid = false
    result.warnings.push(`Latitude ${result.lat} is out of valid range (-90 to 90)`)
  }
  
  if (result.lon < -180 || result.lon > 180) {
    result.valid = false
    result.warnings.push(`Longitude ${result.lon} is out of valid range (-180 to 180)`)
  }
  
  if (!result.valid) return result
  
  // Region-based validation
  const region = detectRegion(portName, country)
  if (region) {
    const [minLat, maxLat] = region.latRange
    const [minLon, maxLon] = region.lonRange
    
    // Check if latitude is in expected range
    if (result.lat < minLat || result.lat > maxLat) {
      result.warnings.push(`Latitude ${result.lat} seems wrong for ${region.region} region (expected ${minLat}-${maxLat})`)
    }
    
    // Check if longitude is in expected range
    if (result.lon < minLon || result.lon > maxLon) {
      // Common error: wrong sign for Western Hemisphere
      if (region.lonRange[1] < 0 && result.lon > 0 && result.lon < 100) {
        // User likely entered positive when it should be negative
        result.lon = -result.lon
        result.corrected = true
        result.warnings.push(`Auto-corrected longitude sign for ${region.region} region: ${-result.lon} → ${result.lon}`)
      } else if (region.lonRange[0] > 0 && result.lon < 0) {
        // User likely entered negative when it should be positive
        result.lon = -result.lon
        result.corrected = true
        result.warnings.push(`Auto-corrected longitude sign for ${region.region} region: ${-result.lon} → ${result.lon}`)
      } else {
        result.warnings.push(`Longitude ${result.lon} seems wrong for ${region.region} region (expected ${minLon}-${maxLon})`)
      }
    }
  }
  
  return result
}

// =============================================================================
// AUTO-ALIAS GENERATION
// =============================================================================

/**
 * Generate common aliases for a port name
 * This helps with future lookups without needing exact matches
 */
export function generateAliases(portName, country = null) {
  const aliases = new Set()
  const normalized = normalizePortName(portName)
  
  // Add the original and normalized
  aliases.add(portName.toLowerCase().trim())
  aliases.add(normalized.normalized)
  
  // Add alternates from normalization
  normalized.alternates.forEach(alt => aliases.add(alt))
  
  // Add with/without country
  if (country) {
    aliases.add(`${normalized.normalized}, ${country.toLowerCase()}`)
    aliases.add(`${portName.toLowerCase()}, ${country.toLowerCase()}`)
  }
  if (normalized.country) {
    aliases.add(`${normalized.normalized}, ${normalized.country}`)
  }
  
  // For private islands, add cruise line variations
  if (normalized.isPrivateIsland) {
    const canonical = normalized.normalized
    if (PRIVATE_ISLAND_ALIASES[canonical]) {
      PRIVATE_ISLAND_ALIASES[canonical].forEach(a => aliases.add(a))
    }
    // Add common experience prefixes
    aliases.add(`perfect day at ${canonical}`)
    aliases.add(`day at ${canonical}`)
  }
  
  // Add without accents
  const noAccents = portName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
  if (noAccents !== portName.toLowerCase().trim()) {
    aliases.add(noAccents)
  }
  
  // Remove the normalized name itself and return array
  aliases.delete('')
  return Array.from(aliases)
}

// =============================================================================
// DATABASE LOOKUP
// =============================================================================

/**
 * Look up port coordinates from database with smart matching
 * This is the primary lookup method
 */
export async function lookupPortFromDatabase(portName, organisationId) {
  const db = getSupabase()
  if (!db) {
    console.warn('[PortLookup] Database not configured')
    return null
  }
  
  const normalized = normalizePortName(portName)
  
  // Strategy 1: Exact match on port_name or city
  let { data: port } = await db
    .schema('crm')
    .from('cruise_ports')
    .select('*')
    .eq('organisation_id', organisationId)
    .is('archived_at', null)
    .or(`port_name.ilike.${normalized.normalized},city.ilike.${normalized.normalized}`)
    .limit(1)
    .maybeSingle()
  
  if (port) {
    console.log(`[PortLookup] Exact match: "${portName}" → ${port.port_name}`)
    return port
  }
  
  // Strategy 2: Check aliases
  const { data: aliasMatch } = await db
    .schema('crm')
    .from('cruise_ports')
    .select('*')
    .eq('organisation_id', organisationId)
    .is('archived_at', null)
    .contains('alias_names', [normalized.normalized])
    .limit(1)
    .maybeSingle()
  
  if (aliasMatch) {
    console.log(`[PortLookup] Alias match: "${portName}" → ${aliasMatch.port_name}`)
    return aliasMatch
  }
  
  // Strategy 3: Fuzzy match - port contains search OR search contains port
  const { data: fuzzyMatches } = await db
    .schema('crm')
    .from('cruise_ports')
    .select('*')
    .eq('organisation_id', organisationId)
    .is('archived_at', null)
    .or(`port_name.ilike.%${normalized.normalized}%,city.ilike.%${normalized.normalized}%`)
    .order('port_name', { ascending: true })
    .limit(5)
  
  if (fuzzyMatches && fuzzyMatches.length > 0) {
    // Pick the best match (shortest name = most specific)
    const best = fuzzyMatches.sort((a, b) => a.port_name.length - b.port_name.length)[0]
    console.log(`[PortLookup] Fuzzy match: "${portName}" → ${best.port_name}`)
    return best
  }
  
  // Strategy 4: Check if any port name is contained IN the search term
  // This catches "Perfect Day at CocoCay" when we have "CocoCay" in DB
  const { data: reverseMatches } = await db
    .schema('crm')
    .from('cruise_ports')
    .select('*')
    .eq('organisation_id', organisationId)
    .is('archived_at', null)
  
  if (reverseMatches) {
    for (const p of reverseMatches) {
      const pName = p.port_name.toLowerCase()
      if (normalized.normalized.includes(pName) || normalized.original.toLowerCase().includes(pName)) {
        console.log(`[PortLookup] Reverse match: "${portName}" contains "${p.port_name}"`)
        return p
      }
    }
  }
  
  console.log(`[PortLookup] No match found for "${portName}"`)
  return null
}

// =============================================================================
// GEOCODING
// =============================================================================

/**
 * Geocode a location using Mapbox with enhanced search strategies
 */
export async function geocodeLocation(portName, country = null) {
  if (!MAPBOX_TOKEN) {
    console.warn('[PortLookup] MAPBOX_TOKEN not configured')
    return null
  }
  
  const normalized = normalizePortName(portName)
  
  // Build search queries to try (in order of specificity)
  const searchQueries = [
    // Try normalized name with country
    country ? `${normalized.normalized}, ${country}` : null,
    normalized.country ? `${normalized.normalized}, ${normalized.country}` : null,
    // Try normalized name alone
    normalized.normalized,
    // Try original name (might have useful context)
    normalized.original,
    // For private islands, try with "Bahamas" appended
    normalized.isPrivateIsland ? `${normalized.normalized}, Bahamas` : null,
  ].filter(Boolean)
  
  for (const query of searchQueries) {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${MAPBOX_TOKEN}&` +
        `types=place,locality,neighborhood,poi&` +
        `limit=1`
      )
      
      if (!response.ok) continue
      
      const data = await response.json()
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0]
        const [lon, lat] = feature.center
        
        // Extract city and country from context
        let city = ''
        let resultCountry = ''
        
        if (feature.context) {
          for (const ctx of feature.context) {
            if (ctx.id.startsWith('place.')) city = ctx.text
            if (ctx.id.startsWith('country.')) resultCountry = ctx.text
          }
        }
        
        // Validate coordinates against expected region
        const validation = validateCoordinates(lat, lon, portName, country || resultCountry)
        
        if (validation.warnings.length > 0) {
          console.warn(`[PortLookup] Geocoding warnings for "${query}":`, validation.warnings)
        }
        
        console.log(`[PortLookup] Geocoded "${query}" → ${validation.lat}, ${validation.lon}`)
        
        return {
          lat: validation.lat,
          lon: validation.lon,
          city: city || normalized.normalized,
          country: resultCountry || country || 'Unknown',
          source: 'mapbox',
          query
        }
      }
    } catch (error) {
      console.warn(`[PortLookup] Geocoding failed for "${query}":`, error.message)
    }
  }
  
  return null
}

// =============================================================================
// MAIN LOOKUP FUNCTION
// =============================================================================

/**
 * Main port lookup function - THE SINGLE ENTRY POINT
 * 
 * This tries multiple strategies in order:
 * 1. Database lookup (with smart matching)
 * 2. Geocoding (with multiple search strategies)
 * 3. Returns null if nothing found
 * 
 * @param {string} portName - The port name to look up
 * @param {string} organisationId - The organisation UUID
 * @param {object} options - Optional settings
 * @returns {Promise<{lat: number, lon: number, source: string, ...} | null>}
 */
export async function lookupPort(portName, organisationId, options = {}) {
  if (!portName || typeof portName !== 'string') {
    return null
  }
  
  const normalized = normalizePortName(portName)
  
  // Skip sea days
  const lowerName = normalized.normalized
  if (lowerName === 'at sea' || lowerName.includes('sea day') || lowerName === '') {
    return { isSeaDay: true, source: 'skip' }
  }
  
  // Strategy 1: Database lookup
  const dbResult = await lookupPortFromDatabase(portName, organisationId)
  if (dbResult && dbResult.latitude && dbResult.longitude) {
    return {
      lat: parseFloat(dbResult.latitude),
      lon: parseFloat(dbResult.longitude),
      city: dbResult.city,
      country: dbResult.country,
      portName: dbResult.port_name,
      source: 'database',
      portId: dbResult.id
    }
  }
  
  // Strategy 2: Geocoding
  if (!options.skipGeocoding) {
    const geoResult = await geocodeLocation(portName, options.country)
    if (geoResult) {
      return {
        ...geoResult,
        portName: normalized.normalized,
        source: 'geocoding'
      }
    }
  }
  
  // No result found
  return null
}

// =============================================================================
// ADD PORT FUNCTION
// =============================================================================

/**
 * Add a new port to the database with auto-generated aliases
 * 
 * @param {object} portData - Port data
 * @param {string} portData.portName - The port name
 * @param {number} portData.lat - Latitude
 * @param {number} portData.lon - Longitude
 * @param {string} portData.organisationId - Organisation UUID
 * @param {string} [portData.city] - City name
 * @param {string} [portData.country] - Country name
 */
export async function addPort(portData) {
  const db = getSupabase()
  if (!db) {
    throw new Error('Database not configured')
  }
  
  const { portName, lat, lon, organisationId, city, country } = portData
  
  // Validate coordinates
  const validation = validateCoordinates(lat, lon, portName, country)
  if (!validation.valid) {
    throw new Error(`Invalid coordinates: ${validation.warnings.join(', ')}`)
  }
  
  // Normalize and generate aliases
  const normalized = normalizePortName(portName)
  const aliases = generateAliases(portName, country)
  
  // Generate unique port code
  const baseCode = normalized.normalized
    .replace(/[^a-zA-Z]/g, '')
    .substring(0, 4)
    .toUpperCase()
    .padEnd(3, 'X')
  const randomSuffix = Math.random().toString(36).substring(2, 4).toUpperCase()
  const portCode = (baseCode + randomSuffix).substring(0, 6)
  
  // Check if port already exists
  const existing = await lookupPortFromDatabase(portName, organisationId)
  if (existing) {
    // Update aliases if we have new ones
    const existingAliases = existing.alias_names || []
    const newAliases = aliases.filter(a => !existingAliases.includes(a))
    
    if (newAliases.length > 0) {
      await db
        .schema('crm')
        .from('cruise_ports')
        .update({ 
          alias_names: [...existingAliases, ...newAliases],
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
      
      console.log(`[PortLookup] Updated aliases for "${existing.port_name}": +${newAliases.length} aliases`)
    }
    
    return {
      success: true,
      port: existing,
      wasExisting: true,
      aliasesAdded: newAliases.length
    }
  }
  
  // Insert new port
  const { data, error } = await db
    .schema('crm')
    .from('cruise_ports')
    .insert({
      organisation_id: organisationId,
      port_code: portCode,
      port_name: normalized.isPrivateIsland ? 
        normalized.normalized.charAt(0).toUpperCase() + normalized.normalized.slice(1) : 
        portName,
      city: city || normalized.normalized,
      country: country || normalized.country || 'Unknown',
      latitude: validation.lat,
      longitude: validation.lon,
      alias_names: aliases,
      is_active: true
    })
    .select()
    .single()
  
  if (error) {
    console.error('[PortLookup] Failed to add port:', error)
    throw new Error(`Database error: ${error.message}`)
  }
  
  console.log(`[PortLookup] Added new port "${data.port_name}" with ${aliases.length} aliases`)
  
  return {
    success: true,
    port: data,
    wasExisting: false,
    aliasesGenerated: aliases.length
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  normalizePortName,
  validateCoordinates,
  detectRegion,
  generateAliases,
  lookupPort,
  addPort,
  lookupPortFromDatabase,
  geocodeLocation
}
