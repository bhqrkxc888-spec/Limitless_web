import { useEffect } from 'react';
import './DayNavigation.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'short' });
  return `${day} ${month}`;
}

/**
 * Generic DayNavigation component
 * Works with ANY cruise itinerary passed as prop
 */
function DayNavigation({ itinerary, selectedDay, onDaySelect }) {
  // Use selectedDay if set, otherwise default to 0
  const currentDayIndex = selectedDay !== null ? selectedDay : 0;
  
  // Scroll to selected day on mount or when selectedDay changes
  useEffect(() => {
    if (currentDayIndex !== null) {
      const button = document.querySelector(`[data-day-index="${currentDayIndex}"]`);
      if (button) {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentDayIndex]);

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <nav className="day-navigation" aria-label="Day navigation">
      <div className="container">
        <div className="day-nav-scroll">
          {itinerary.map((day, index) => {
            const isSelected = index === currentDayIndex;
            const dateLabel = day.dateEnd 
              ? `${formatDate(day.date)} - ${formatDate(day.dateEnd)}`
              : formatDate(day.date);
            
            return (
              <button
                key={index}
                data-day-index={index}
                onClick={() => onDaySelect(index)}
                className={`day-nav-button ${isSelected ? 'active' : ''}`}
                aria-pressed={isSelected}
                aria-label={`View ${day.dayLabel} - ${day.portName}`}
              >
                <div className="day-nav-date">{dateLabel}</div>
                <div className="day-nav-day">{day.dayLabel}</div>
                <div className="day-nav-location">
                  {day.portName}
                  {day.isOvernight && <span className="overnight-indicator" aria-label="Overnight stay">⭐</span>}
                  {day.dayType === 'embarkation' && (
                    <span className="day-type-badge embarkation">Embarkation</span>
                  )}
                  {day.dayType === 'disembarkation' && (
                    <span className="day-type-badge disembarkation">Disembarkation</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default DayNavigation;
