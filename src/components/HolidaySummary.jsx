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
function formatSegmentData(segment, cruiseDurationNights = null) {
  const { type, subType, items, segment: phase } = segment
  
  switch (type) {
    case 'flight': {
      const first = items[0]
      
      // Determine flight type from subType or phase
      const isReturn = subType === 'flight_return' || phase === 'post_cruise'
      const isInternal = subType === 'flight_internal'
      
      // Extract departure airport only
      const departFrom = first.port || first.location || 'Airport'
      
      let title = 'Flight'
      if (isReturn) title = 'Return Flight'
      else if (isInternal) title = 'Connecting Flight'
      else title = 'Outbound Flight'
      
      return {
        iconType: 'flight',
        title,
        subtitle: `Depart: ${departFrom}`,
        details: null
      }
    }
    
    case 'hotel': {
      const nights = items.length
      const hotelName = items[0].hotel_name || null
      const city = items[0].port || items[0].location || 'City'
      
      return {
        iconType: 'hotel',
        title: `${city} Stay`,
        subtitle: hotelName || 'Hotel included',
        details: `${nights} night${nights > 1 ? 's' : ''}`
      }
    }
    
    case 'train': {
      const trainName = items[0].train_name || 'Train Journey'
      const from = items[0].port || items[0].location || 'Start'
      const to = items[items.length - 1].port || items[items.length - 1].location || 'End'
      
      return {
        iconType: 'train',
        title: trainName,
        subtitle: `${from} → ${to}`,
        details: items.length > 1 ? `${items.length} days` : null
      }
    }
    
    case 'cruise': {
      // Get embark and disembark ports
      const embarkItem = items.find(i => i.type === 'embark' || i.type === 'embarkation')
      const disembarkItem = items.find(i => i.type === 'disembark' || i.type === 'disembarkation')
      
      const embarkPort = embarkItem?.port || items[0]?.port || 'Port'
      const disembarkPort = disembarkItem?.port || items[items.length - 1]?.port || embarkPort
      
      const isRoundTrip = embarkPort === disembarkPort
      
      // Use the actual cruise duration from offer data if provided
      // Otherwise fall back to calculating from itinerary items (days - 1)
      const nights = cruiseDurationNights || Math.max(items.length - 1, 1)
      
      return {
        iconType: 'cruise',
        title: 'Cruise',
        subtitle: isRoundTrip ? `Round-trip from ${embarkPort}` : `${embarkPort} → ${disembarkPort}`,
        details: `${nights} night${nights > 1 ? 's' : ''}`
      }
    }
    
    default:
      return null
  }
}

// SVG icons for each segment type - monochrome/gold theme
const SegmentIcon = ({ type }) => {
  const icons = {
    flight: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    ),
    hotel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
        <path d="M1 21h22"/>
        <path d="M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1"/>
      </svg>
    ),
    train: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="3" width="16" height="16" rx="2"/>
        <path d="M4 11h16"/>
        <path d="M12 3v8"/>
        <circle cx="8" cy="15" r="1"/>
        <circle cx="16" cy="15" r="1"/>
        <path d="M8 19l-2 3M16 19l2 3"/>
      </svg>
    ),
    cruise: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/>
        <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/>
        <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
        <path d="M12 10V4.5a.5.5 0 0 1 .5-.5h.5a2 2 0 0 1 2 2v2"/>
      </svg>
    )
  }
  
  return icons[type] || icons.cruise
}

function HolidaySummary({ itinerary, cruiseDurationNights = null }) {
  const segments = useMemo(() => {
    const extracted = extractJourneySegments(itinerary)
    return extracted.map(seg => formatSegmentData(seg, cruiseDurationNights)).filter(Boolean)
  }, [itinerary, cruiseDurationNights])

  if (segments.length === 0) {
    return null
  }

  return (
    <div className="holiday-summary">
      <h2 className="holiday-summary__title">Your Holiday at a Glance</h2>
      <div className="holiday-summary__cards">
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <div className="holiday-summary__card">
              <div className="holiday-summary__card-icon">
                <SegmentIcon type={segment.iconType} />
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
