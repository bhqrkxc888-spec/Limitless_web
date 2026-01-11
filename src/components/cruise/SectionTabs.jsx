import { getSectionsForDayType, getSectionLabel } from '../../data/cruise/g606-itinerary';
import './SectionTabs.css';

function SectionTabs({ dayType, selectedSection, onSectionSelect }) {
  const sections = getSectionsForDayType(dayType);
  
  if (!sections || sections.length === 0) {
    return null;
  }

  // Default to first section if none selected
  const currentSection = selectedSection || sections[0];

  const handleSectionClick = (sectionKey) => {
    if (onSectionSelect) {
      onSectionSelect(sectionKey);
    }
  };

  return (
    <nav className="section-tabs" aria-label="Section navigation">
      <div className="section-tabs-scroll">
        {sections.map((sectionKey) => {
          const isSelected = sectionKey === currentSection;
          const label = getSectionLabel(sectionKey);
          
          return (
            <button
              key={sectionKey}
              onClick={() => handleSectionClick(sectionKey)}
              className={`section-tab ${isSelected ? 'active' : ''}`}
              aria-pressed={isSelected}
              aria-label={`View ${label} section`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default SectionTabs;
