/**
 * Holiday Summary Component
 * 
 * Displays a high-level overview of the complete journey as segment cards:
 * Flights > Hotels > Trains > Cruise > Return Flights
 * 
 * Derived from itinerary_detailed data, showing only key journey components
 * without day-by-day detail (that's in the map sidebar).
 */

import React, { useMemo } from 'react'
import './HolidaySummary.css'

/**
 * Extract journey segments from detailed itinerary
 * Groups consecutive items of same type into summary cards
 */
function extractJourneySegments(itinerary) {
  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return []
  }

  const segments = []
  let currentSegment = null

  itinerary.forEach((item) => {
    const type = item.type || 'port'
    
    // Map types to segment types for display
    // Use more specific types to avoid merging different journey stages
    const segmentTypes = {
      flight_out: 'flight_out',
      flight_return: 'flight_return',
      flight_internal: 'flight_internal',
      hotel: 'hotel',
      train: 'train',
      embark: 'cruise',
      disembark: 'cruise',
      port: 'cruise',
      sea: 'cruise',
      scenic: 'cruise',
      tender: 'cruise',
      private_island: 'cruise',
    }

    const segmentType = segmentTypes[type]
    
    if (!segmentType) return // Skip transfers, etc.

    // Get the city/location for hotels to detect multi-city
    const location = item.port || item.location || item.hotel_name || ''
    
    // Determine if we should start a new segment:
    // 1. No current segment
    // 2. Different segment type (flight vs hotel vs cruise)
    // 3. For flights: different flight type (out vs internal vs return)
    // 4. For hotels: different city (multi-city pattern)
    const baseType = segmentType.startsWith('flight') ? 'flight' : segmentType
    const currentBaseType = currentSegment?.type?.startsWith('flight') ? 'flight' : currentSegment?.type
    
    const isNewSegment = !currentSegment || 
      baseType !== currentBaseType ||
      // Different flight types should be separate
      (segmentType.startsWith('flight') && currentSegment?.subType !== segmentType) ||
      // Different cities for hotels should be separate (multi-city)
      (segmentType === 'hotel' && currentSegment?.city && currentSegment.city !== location)

    if (isNewSegment) {
      // Save previous segment
      if (currentSegment) {
        segments.push(currentSegment)
      }
      
      // Start new segment
      currentSegment = {
        type: baseType,
        subType: segmentType,
        items: [item],
        segment: item.segment || 'cruise',
        city: segmentType === 'hotel' ? location : null
      }
    } else {
      // Add to current segment
      currentSegment.items.push(item)
    }
  })

  // Push final segment
  if (currentSegment) {
    segments.push(currentSegment)
  }

  return segments
}

/**
 * Format segment data for display
 */
function formatSegmentData(segment) {
  const { type, subType, items, segment: phase } = segment
  
  switch (type) {
    case 'flight': {
      const first = items[0]
      const last = items[items.length - 1]
      
      // Determine flight type from subType or phase
      const isReturn = subType === 'flight_return' || phase === 'post_cruise'
      const isInternal = subType === 'flight_internal'
      
      // Extract from/to from port names
      const from = first.port || first.location || 'Departure'
      const to = last.port || last.location || 'Arrival'
      
      let title = 'Flight'
      if (isReturn) title = 'Return Flight'
      else if (isInternal) title = 'Connecting Flight'
      else title = 'Outbound Flight'
      
      return {
        icon: '✈️',
        title,
        subtitle: `${from} → ${to}`,
        details: items.length > 1 ? `${items.length} flights` : null,
        color: isInternal ? '#818cf8' : '#3b82f6'
      }
    }
    
    case 'hotel': {
      const nights = items.length
      const hotelName = items[0].hotel_name || null
      const city = items[0].port || items[0].location || 'City'
      
      return {
        icon: '🏨',
        title: `${city} Stay`,
        subtitle: hotelName || 'Hotel included',
        details: `${nights} night${nights > 1 ? 's' : ''}`,
        color: '#f59e0b'
      }
    }
    
    case 'train': {
      const trainName = items[0].train_name || 'Train Journey'
      const from = items[0].port || items[0].location || 'Start'
      const to = items[items.length - 1].port || items[items.length - 1].location || 'End'
      
      return {
        icon: '🚂',
        title: trainName,
        subtitle: `${from} → ${to}`,
        details: items.length > 1 ? `${items.length} days` : null,
        color: '#dc2626'
      }
    }
    
    case 'cruise': {
      // Count actual cruise nights (exclude embark/disembark days)
      const cruiseItems = items.filter(i => 
        i.type === 'port' || i.type === 'sea' || i.type === 'scenic' || 
        i.type === 'tender' || i.type === 'private_island'
      )
      const nights = cruiseItems.length
      
      // Get embark and disembark ports
      const embarkItem = items.find(i => i.type === 'embark' || i.type === 'embarkation')
      const disembarkItem = items.find(i => i.type === 'disembark' || i.type === 'disembarkation')
      
      const embarkPort = embarkItem?.port || items[0]?.port || 'Port'
      const disembarkPort = disembarkItem?.port || items[items.length - 1]?.port || embarkPort
      
      const isRoundTrip = embarkPort === disembarkPort
      
      return {
        icon: '🚢',
        title: 'Cruise',
        subtitle: isRoundTrip ? `Round-trip from ${embarkPort}` : `${embarkPort} → ${disembarkPort}`,
        details: `${nights} night${nights > 1 ? 's' : ''}`,
        color: '#10b981'
      }
    }
    
    default:
      return null
  }
}

function HolidaySummary({ itinerary }) {
  const segments = useMemo(() => {
    const extracted = extractJourneySegments(itinerary)
    return extracted.map(seg => formatSegmentData(seg)).filter(Boolean)
  }, [itinerary])

  if (segments.length === 0) {
    return null
  }

  return (
    <div className="holiday-summary">
      <h2 className="holiday-summary__title">Your Holiday at a Glance</h2>
      <div className="holiday-summary__cards">
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <div 
              className="holiday-summary__card"
              style={{ borderTopColor: segment.color }}
            >
              <div className="holiday-summary__card-icon" style={{ color: segment.color }}>
                {segment.icon}
              </div>
              <div className="holiday-summary__card-content">
                <h3 className="holiday-summary__card-title">{segment.title}</h3>
                <p className="holiday-summary__card-subtitle">{segment.subtitle}</p>
                {segment.details && (
                  <span className="holiday-summary__card-details">{segment.details}</span>
                )}
              </div>
            </div>
            
            {/* Arrow between segments */}
            {index < segments.length - 1 && (
              <div className="holiday-summary__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default HolidaySummary
