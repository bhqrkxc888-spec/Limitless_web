import { g606Itinerary } from '../../data/cruise/g606-itinerary';
import './DayNavigation.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'short' });
  return `${day} ${month}`;
}

function getCurrentCruiseDay() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < g606Itinerary.length; i++) {
    const day = g606Itinerary[i];
    const dayStart = new Date(day.date);
    dayStart.setHours(0, 0, 0, 0);
    
    let dayEnd;
    if (day.dateEnd) {
      dayEnd = new Date(day.dateEnd);
      dayEnd.setHours(23, 59, 59, 999);
    } else {
      dayEnd = new Date(day.date);
      dayEnd.setHours(23, 59, 59, 999);
    }
    
    if (now >= dayStart && now <= dayEnd) {
      return i;
    }
  }
  
  // If before cruise, return first day (index 0)
  const firstDay = new Date(g606Itinerary[0].date);
  firstDay.setHours(0, 0, 0, 0);
  if (now < firstDay) {
    return 0;
  }
  
  // If after cruise, return last day
  return g606Itinerary.length - 1;
}

function DayNavigation({ selectedDay, onDaySelect }) {
  // Initialize with current day if not set
  const currentDayIndex = selectedDay !== null ? selectedDay : getCurrentCruiseDay();

  return (
    <nav className="day-navigation" aria-label="Day navigation">
      <div className="container">
        <div className="day-nav-scroll">
          {g606Itinerary.map((day, index) => {
            const isSelected = index === currentDayIndex;
            const dateLabel = day.dateEnd 
              ? `${formatDate(day.date)} - ${formatDate(day.dateEnd)}`
              : formatDate(day.date);
            
            return (
              <button
                key={index}
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
