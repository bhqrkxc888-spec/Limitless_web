/**
 * Dynamic Subsection Component
 * Renders flexible port guide subsections with any title/content
 * Supports unlimited subsections per area (not fixed structure)
 */

import { MapPin, Clock, Info, Compass, ChevronRight } from 'lucide-react';
import { formatBoldText, formatParagraphsWithBold } from '../../utils/textFormatting';
import './DynamicSubsection.css';

// Terrain badge component
function TerrainBadge({ terrain }) {
  if (!terrain) return null;
  
  const terrainConfig = {
    flat: { icon: '⚡', label: 'Flat', color: '#10b981' },
    'some-hills': { icon: '🏔️', label: 'Some hills', color: '#f59e0b' },
    steep: { icon: '⛰️', label: 'Steep', color: '#ef4444' },
    mixed: { icon: '〰️', label: 'Mixed', color: '#6366f1' }
  };
  
  const config = terrainConfig[terrain] || terrainConfig.flat;
  
  return (
    <span 
      className="terrain-badge"
      style={{ 
        background: `${config.color}15`,
        color: config.color,
        border: `1px solid ${config.color}40`
      }}
    >
      {config.icon} {config.label}
    </span>
  );
}

// Type icon mapper
function getTypeIcon(type) {
  const icons = {
    attraction: '🏛️',
    food: '🍽️',
    shopping: '🛍️',
    beach: '🏖️',
    park: '🌳',
    transport: '🚂',
    town: '🏘️',
    nature: '🌲',
    historic: '🏰',
    indoor: '🏠',
    outdoor: '☀️',
    restaurant: '🍴',
    cafe: '☕',
    bar: '🍺',
    market: '🏪',
    specialty: '⭐',
    other: '📍'
  };
  
  return icons[type] || icons.other;
}

export default function DynamicSubsection({ 
  subsection, 
  index, 
  totalCount,
  showDivider = true 
}) {
  if (!subsection) return null;
  
  const {
    title,
    type,
    distance,
    terrain,
    content,
    highlights,
    mapLink,
    hours,
    accessibility,
    transport,
    allowTime,
    facilities,
    duration,
    cuisine,
    priceIndicator,
    location,
    specialty,
    ageGroups
  } = subsection;
  
  return (
    <div className="dynamic-subsection">
      {/* Header */}
      <div className="subsection-header">
        <h3 className="subsection-title">
          {type && <span className="subsection-type-icon">{getTypeIcon(type)}</span>}
          {title}
        </h3>
        
        <div className="subsection-meta">
          {distance && (
            <span className="meta-item meta-distance">
              <MapPin size={14} />
              {distance}
            </span>
          )}
          
          {terrain && <TerrainBadge terrain={terrain} />}
          
          {duration && (
            <span className="meta-item meta-duration">
              <Clock size={14} />
              {duration}
            </span>
          )}
          
          {allowTime && (
            <span className="meta-item meta-allow-time">
              <Clock size={14} />
              {allowTime}
            </span>
          )}
        </div>
      </div>
      
      {/* Additional metadata row */}
      {(cuisine || priceIndicator || location || ageGroups) && (
        <div className="subsection-secondary-meta">
          {cuisine && (
            <span className="secondary-meta-item">
              🍴 {cuisine}
            </span>
          )}
          
          {priceIndicator && (
            <span className={`secondary-meta-item price-${priceIndicator}`}>
              {priceIndicator === 'budget' && '💰 Budget-friendly'}
              {priceIndicator === 'mid-range' && '💰💰 Mid-range'}
              {priceIndicator === 'upscale' && '💰💰💰 Upscale'}
            </span>
          )}
          
          {location && (
            <span className="secondary-meta-item">
              📍 {location}
            </span>
          )}
          
          {ageGroups && ageGroups.length > 0 && (
            <span className="secondary-meta-item">
              👨‍👩‍👧‍👦 {ageGroups.map(age => {
                if (age === 'toddlers') return 'Toddlers';
                if (age === 'older-kids') return 'Older kids';
                if (age === 'teens') return 'Teens';
                return age;
              }).join(', ')}
            </span>
          )}
        </div>
      )}
      
      {/* Main content */}
      <div className="subsection-content">
        {formatParagraphsWithBold(content)}
      </div>
      
      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div className="subsection-highlights">
          <strong>Highlights:</strong>
          <ul>
            {highlights.map((highlight, idx) => (
              <li key={idx}>{formatBoldText(highlight)}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Additional info boxes */}
      <div className="subsection-info-boxes">
        {transport && (
          <div className="info-box info-transport">
            <Compass size={16} />
            <strong>Getting there:</strong> {transport}
          </div>
        )}
        
        {facilities && (
          <div className="info-box info-facilities">
            <Info size={16} />
            <strong>Facilities:</strong> {facilities}
          </div>
        )}
        
        {hours && (
          <div className="info-box info-hours">
            <Clock size={16} />
            <strong>Hours:</strong> {hours}
          </div>
        )}
        
        {accessibility && (
          <div className="info-box info-accessibility">
            <Info size={16} />
            <strong>Accessibility:</strong> {accessibility}
          </div>
        )}
        
        {specialty && (
          <div className="info-box info-specialty">
            ⭐ <strong>Specialty:</strong> {specialty}
          </div>
        )}
      </div>
      
      {/* Map link */}
      {mapLink && (
        <a 
          href={mapLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="subsection-map-link"
        >
          <MapPin size={16} />
          View on Google Maps
          <ChevronRight size={16} />
        </a>
      )}
      
      {/* Divider (except for last item) */}
      {showDivider && index < totalCount - 1 && (
        <hr className="subsection-divider" />
      )}
    </div>
  );
}
