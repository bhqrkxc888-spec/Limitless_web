/**
 * JourneyTimeline Component (Website Version)
 * 
 * Customer-facing timeline showing the complete fly-cruise journey
 * with beautiful visual design for pre-cruise, cruise, and post-cruise segments
 */

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Type configurations with icons and colors
const TYPE_CONFIG = {
  // Flights
  flight_out: { icon: '✈️', label: 'Outbound Flight', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
  flight_return: { icon: '✈️', label: 'Return Flight', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
  flight_connection: { icon: '🔄', label: 'Connection', color: '#60a5fa', bgColor: 'rgba(96, 165, 250, 0.1)' },
  flight: { icon: '✈️', label: 'Flight', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
  
  // Ground
  transfer: { icon: '🚐', label: 'Transfer', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' },
  hotel: { icon: '🏨', label: 'Hotel', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
  
  // Cruise - Embark/Disembark
  embark: { icon: '🚢', label: 'Embarkation', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
  embarkation: { icon: '🚢', label: 'Embarkation', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
  disembark: { icon: '🚢', label: 'Disembarkation', color: '#f43f5e', bgColor: 'rgba(244, 63, 94, 0.1)' },
  disembarkation: { icon: '🚢', label: 'Disembarkation', color: '#f43f5e', bgColor: 'rgba(244, 63, 94, 0.1)' },
  
  // Cruise - At Sea
  sea: { icon: '🌊', label: 'At Sea', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
  scenic: { icon: '🏔️', label: 'Scenic Cruising', color: '#14b8a6', bgColor: 'rgba(20, 184, 166, 0.1)' },
  
  // Cruise - Port Calls
  port: { icon: '⚓', label: 'Port Call', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)' },
  tender: { icon: '🚤', label: 'Tender Port', color: '#84cc16', bgColor: 'rgba(132, 204, 22, 0.1)' },
  private_island: { icon: '🏝️', label: 'Private Island', color: '#eab308', bgColor: 'rgba(234, 179, 8, 0.1)' },
}

const DEFAULT_CONFIG = { icon: '📍', label: 'Stop', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' }

function getTypeConfig(type) {
  return TYPE_CONFIG[type] || DEFAULT_CONFIG
}

/**
 * Infer type from item if not set
 */
function inferType(item, index, totalItems) {
  if (item.type) return item.type
  
  const location = (item.port || item.location || '').toLowerCase()
  
  const airportIndicators = ['heathrow', 'gatwick', 'airport', 'international']
  if (airportIndicators.some(ind => location.includes(ind))) {
    return index < totalItems / 2 ? 'flight_out' : 'flight_return'
  }
  
  if (location.includes('hotel') || location.includes('resort')) return 'hotel'
  if (location.includes('at sea') || location.includes('sea day')) return 'sea'
  
  return 'port'
}

/**
 * Group items by segment
 */
function groupBySegment(items) {
  const segments = { pre_cruise: [], cruise: [], post_cruise: [] }
  let foundEmbark = false, foundDisembark = false
  
  items.forEach((item, index) => {
    const type = inferType(item, index, items.length)
    const itemWithType = { ...item, type, _index: index }
    
    if (item.segment) {
      segments[item.segment]?.push(itemWithType)
      return
    }
    
    if (type === 'embark' || type === 'embarkation') {
      foundEmbark = true
      segments.cruise.push(itemWithType)
    } else if (type === 'disembark' || type === 'disembarkation') {
      foundDisembark = true
      segments.cruise.push(itemWithType)
    } else if (!foundEmbark) {
      segments.pre_cruise.push(itemWithType)
    } else if (foundDisembark) {
      segments.post_cruise.push(itemWithType)
    } else {
      segments.cruise.push(itemWithType)
    }
  })
  
  return segments
}

/**
 * Timeline item component
 */
function TimelineItem({ item, isLast, delay }) {
  const config = getTypeConfig(item.type)
  
  return (
    <motion.div 
      className="jt-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      <div className="jt-item__connector">
        <div className="jt-item__dot" style={{ backgroundColor: config.color }}>
          <span>{config.icon}</span>
        </div>
        {!isLast && <div className="jt-item__line" style={{ borderColor: config.color }} />}
      </div>
      
      <div className="jt-item__content" style={{ backgroundColor: config.bgColor }}>
        <div className="jt-item__header">
          <span className="jt-item__day">Day {item.day || '?'}</span>
          <span className="jt-item__badge" style={{ backgroundColor: config.color }}>
            {config.label}
          </span>
        </div>
        <h4 className="jt-item__location">
          {item.port || item.location}
          {item.hotel_name && <span className="jt-item__hotel"> - {item.hotel_name}</span>}
        </h4>
        {item.description && (
          <p className="jt-item__desc">{item.description}</p>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Segment component
 */
function Segment({ title, icon, items, color, isOpen, onToggle, startIndex }) {
  if (items.length === 0) return null
  
  return (
    <div className="jt-segment">
      <button 
        className="jt-segment__header" 
        onClick={onToggle}
        style={{ borderLeftColor: color }}
      >
        <span className="jt-segment__icon">{icon}</span>
        <span className="jt-segment__title">{title}</span>
        <span className="jt-segment__count">{items.length} {items.length === 1 ? 'day' : 'days'}</span>
        <span className={`jt-segment__chevron ${isOpen ? 'jt-segment__chevron--open' : ''}`}>
          ▼
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="jt-segment__items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, idx) => (
              <TimelineItem 
                key={`${item._index}-${idx}`}
                item={item}
                isLast={idx === items.length - 1}
                delay={startIndex + idx}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Main JourneyTimeline component
 */
export default function JourneyTimeline({ itinerary, defaultExpanded = true }) {
  const [openSegments, setOpenSegments] = useState({
    pre_cruise: defaultExpanded,
    cruise: true, // Always start with cruise open
    post_cruise: defaultExpanded
  })
  
  const segments = useMemo(() => {
    if (!Array.isArray(itinerary) || itinerary.length === 0) return null
    return groupBySegment(itinerary)
  }, [itinerary])
  
  if (!segments) return null
  
  const toggleSegment = (key) => {
    setOpenSegments(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const hasPre = segments.pre_cruise.length > 0
  const hasPost = segments.post_cruise.length > 0
  
  // If no pre/post cruise, don't show the timeline (just use the map)
  if (!hasPre && !hasPost) return null
  
  return (
    <div className="journey-timeline">
      <style>{`
        .journey-timeline {
          font-family: inherit;
          margin: 2rem 0;
        }
        
        .jt-segment {
          margin-bottom: 1rem;
        }
        
        .jt-segment__header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 4px solid;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        
        .jt-segment__header:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        
        .jt-segment__icon {
          font-size: 1.25rem;
        }
        
        .jt-segment__title {
          flex: 1;
          font-weight: 600;
          color: #fff;
          font-size: 1rem;
        }
        
        .jt-segment__count {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .jt-segment__chevron {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          transition: transform 0.2s;
        }
        
        .jt-segment__chevron--open {
          transform: rotate(180deg);
        }
        
        .jt-segment__items {
          padding: 1rem 0 0 1rem;
          overflow: hidden;
        }
        
        .jt-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .jt-item__connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 40px;
        }
        
        .jt-item__dot {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        
        .jt-item__line {
          width: 0;
          flex: 1;
          min-height: 16px;
          border-left: 2px dashed;
          opacity: 0.3;
        }
        
        .jt-item__content {
          flex: 1;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }
        
        .jt-item__header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .jt-item__day {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .jt-item__badge {
          font-size: 0.65rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          color: #fff;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .jt-item__location {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.25rem 0;
        }
        
        .jt-item__hotel {
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }
        
        .jt-item__desc {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.5;
        }
        
        @media (max-width: 640px) {
          .jt-item {
            gap: 0.75rem;
          }
          
          .jt-item__dot {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }
          
          .jt-item__content {
            padding: 0.875rem 1rem;
          }
          
          .jt-item__location {
            font-size: 1rem;
          }
        }
      `}</style>
      
      {hasPre && (
        <Segment
          title="Pre-Cruise Journey"
          icon="✈️"
          items={segments.pre_cruise}
          color="#3b82f6"
          isOpen={openSegments.pre_cruise}
          onToggle={() => toggleSegment('pre_cruise')}
          startIndex={0}
        />
      )}
      
      <Segment
        title="Cruise Itinerary"
        icon="🚢"
        items={segments.cruise}
        color="#10b981"
        isOpen={openSegments.cruise}
        onToggle={() => toggleSegment('cruise')}
        startIndex={segments.pre_cruise.length}
      />
      
      {hasPost && (
        <Segment
          title="Post-Cruise Journey"
          icon="🏠"
          items={segments.post_cruise}
          color="#f43f5e"
          isOpen={openSegments.post_cruise}
          onToggle={() => toggleSegment('post_cruise')}
          startIndex={segments.pre_cruise.length + segments.cruise.length}
        />
      )}
    </div>
  )
}
