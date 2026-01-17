import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { hasConsent } from '../components/cruise/CruiseConsentGate';
import CruiseConsentGate from '../components/cruise/CruiseConsentGate';
import DayNavigation from '../components/cruise/DayNavigation';
import SectionTabs from '../components/cruise/SectionTabs';
import CruisePortGuide from '../components/cruise/sections/CruisePortGuide';
import SeaDayContent from '../components/cruise/sections/SeaDayContent';
import EmbarkationContent from '../components/cruise/sections/EmbarkationContent';
import DisembarkationContent from '../components/cruise/sections/DisembarkationContent';
import ShipContent from '../components/cruise/sections/ShipContent';
// CountdownTimer removed - not needed
import ShipTracker from '../components/cruise/ShipTracker';
import PortWeather from '../components/cruise/PortWeather';
import { getCruiseById, getSectionsForDayType } from '../data/cruises';
import { SITE_ASSETS } from '../config/assetUrls';
import { Button } from '../components/ui';
import './CruiseCompanionPage.css';

/**
 * Get current cruise day index based on itinerary
 */
function getCurrentCruiseDayIndex(itinerary) {
  if (!itinerary || itinerary.length === 0) return 0;
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < itinerary.length; i++) {
    const day = itinerary[i];
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
  const firstDay = new Date(itinerary[0].date);
  firstDay.setHours(0, 0, 0, 0);
  if (now < firstDay) {
    return 0;
  }
  
  // If after cruise, return last day
  return itinerary.length - 1;
}

/**
 * Main Cruise Companion Page
 * 
 * GENERIC: Works with ANY cruise from the registry.
 * Route: /cruise/:cruiseId (e.g., /cruise/g606)
 * Falls back to g606 for legacy /cruise/g606 route
 */
function CruiseCompanionPage() {
  // Get cruise ID from URL params (e.g., /cruise/g606)
  const { cruiseId } = useParams();
  const activeCruiseId = cruiseId || 'g606'; // Default to g606 for backwards compatibility
  
  // Load cruise data from registry
  const cruise = getCruiseById(activeCruiseId);
  
  const [consentGiven, setConsentGiven] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const contentRef = useRef(null);
  const isInitialMount = useRef(true);

  // Extract data from cruise (with fallbacks)
  const itinerary = cruise?.itinerary || [];
  const ship = cruise?.ship || {};
  const departure = cruise?.departure || {};
  const facebookGroup = cruise?.facebookGroup;
  const ogImage = cruise?.ogImage;

  // Get section from URL hash
  const getSectionFromHash = useCallback((dayType) => {
    const hash = window.location.hash.slice(1); // Remove the #
    if (!hash) return null;
    const validSections = getSectionsForDayType(dayType);
    return validSections.includes(hash) ? hash : null;
  }, []);

  useEffect(() => {
    // Check for existing consent
    if (hasConsent()) {
      setConsentGiven(true);
      // Initialize day selection
      const currentDay = getCurrentCruiseDayIndex(itinerary);
      setSelectedDayIndex(currentDay);
      if (itinerary[currentDay]) {
        const sections = getSectionsForDayType(itinerary[currentDay].dayType);
        // Check if URL has a valid section hash
        const hashSection = getSectionFromHash(itinerary[currentDay].dayType);
        setSelectedSection(hashSection || sections[0]);
      }
    }
    setIsChecking(false);
  }, [itinerary, getSectionFromHash]);
  
  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      if (selectedDayIndex !== null && itinerary[selectedDayIndex]) {
        const hashSection = getSectionFromHash(itinerary[selectedDayIndex].dayType);
        if (hashSection) {
          setSelectedSection(hashSection);
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [selectedDayIndex, itinerary, getSectionFromHash]);
  
  // Scroll to content after section/day changes (not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Small delay for React to finish rendering
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [selectedDayIndex, selectedSection]);

  // Set page to noindex (hidden page)
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, nofollow';
  }, []);

  const handleConsent = () => {
    setConsentGiven(true);
    // Initialize day selection after consent
    const currentDay = getCurrentCruiseDayIndex(itinerary);
    setSelectedDayIndex(currentDay);
    if (itinerary[currentDay]) {
      const sections = getSectionsForDayType(itinerary[currentDay].dayType);
      setSelectedSection(sections[0]);
    }
  };

  // Handle day selection - update state and reset section hash
  const handleDaySelect = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
    const dayData = itinerary[dayIndex];
    if (dayData) {
      const sections = getSectionsForDayType(dayData.dayType);
      const firstSection = sections[0];
      setSelectedSection(firstSection);
      // Update URL hash using pushState (doesn't trigger native scroll)
      history.pushState(null, '', `#${firstSection}`);
    }
  };

  // Handle section selection - update URL hash using pushState, scroll handled by useEffect
  const handleSectionSelect = (sectionKey) => {
    history.pushState(null, '', `#${sectionKey}`);
    setSelectedSection(sectionKey);
  };

  // Cruise not found
  if (!cruise) {
    return (
      <div className="cruise-companion-page">
        <div className="error-state">
          <h1>Cruise Not Found</h1>
          <p>The cruise "{activeCruiseId}" could not be found.</p>
          <Link to="/">Return to homepage</Link>
        </div>
      </div>
    );
  }

  if (isChecking) {
    return (
      <div className="cruise-companion-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!consentGiven) {
    return (
      <div className="cruise-companion-page">
        <SEO
          title={`Cruise Companion - ${ship.operator} ${ship.name} ${cruise.id.toUpperCase()}`}
          description={`Your personal cruise companion for ${ship.operator} ${ship.name} ${cruise.id.toUpperCase()}, ${cruise.name}`}
          image={ogImage}
          robots="noindex, nofollow"
        />
        <CruiseConsentGate onConsent={handleConsent} />
      </div>
    );
  }

  // Get current day data
  const currentDayIndex = selectedDayIndex !== null ? selectedDayIndex : getCurrentCruiseDayIndex(itinerary);
  const dayData = itinerary[currentDayIndex];
  const currentSection = selectedSection || (dayData ? getSectionsForDayType(dayData.dayType)[0] : 'overview');

  // Get next port for sea days
  const getNextPort = () => {
    for (let i = currentDayIndex + 1; i < itinerary.length; i++) {
      if (itinerary[i].dayType === 'port') {
        return itinerary[i].portName;
      }
    }
    return null;
  };

  const renderSectionContent = () => {
    // Ship section is available on all day types
    if (currentSection === 'ship') {
      return (
        <ShipContent
          sectionKey={currentSection}
          dayData={dayData}
        />
      );
    }

    // Day-type specific content
    switch (dayData.dayType) {
      case 'port':
        return (
          <CruisePortGuide
            sectionKey={currentSection}
            dayData={dayData}
          />
        );
      case 'sea':
        return (
          <SeaDayContent
            sectionKey={currentSection}
            dayData={dayData}
            nextPort={getNextPort()}
          />
        );
      case 'embarkation':
        return (
          <EmbarkationContent
            sectionKey={currentSection}
            dayData={dayData}
          />
        );
      case 'disembarkation':
        return (
          <DisembarkationContent
            sectionKey={currentSection}
            dayData={dayData}
          />
        );
      default:
        return null;
    }
  };

  // Calculate cruise duration
  const firstDate = itinerary[0]?.date;
  const lastDate = itinerary[itinerary.length - 1]?.date || itinerary[itinerary.length - 1]?.dateEnd;
  const formatCruiseDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  const nights = itinerary.length > 0 ? itinerary[itinerary.length - 1].dayNumber - 1 : 0;

  return (
    <main className="cruise-companion-page">
      <SEO
        title={`${cruise.id.toUpperCase()} Cruise Guide | ${ship.operator} ${ship.name} | ${cruise.shortName}`}
        description={`Your insider guide to ${ship.operator} ${ship.name} ${cruise.id.toUpperCase()} - ${cruise.name}. Port tips, recommendations & more.`}
        image={ogImage}
        robots="noindex, nofollow"
      />

      {/* Simple Header - No Navigation */}
      <header className="companion-header">
        <div className="container">
          <div className="header-content">
            {/* Logo - Same as main site */}
            <Link to="/" className="companion-logo">
              <div className="logo-container">
                <img 
                  src={SITE_ASSETS.logo} 
                  alt="Limitless Cruises logo - gold cruise ship icon" 
                  className="logo-icon"
                  width="56"
                  height="56"
                  fetchPriority="high"
                />
                <div className="logo-text">
                  <span className="logo-name">Limitless Cruises</span>
                  <span className="logo-tagline">Personal Cruise Consultant</span>
                </div>
              </div>
            </Link>

            <div className="header-text">
              <h1>{ship.operator?.toUpperCase()} {ship.name?.toUpperCase()} | {cruise.id.toUpperCase()}</h1>
              <p className="cruise-title">{cruise.name}</p>
              <p className="cruise-dates">{formatCruiseDate(firstDate)} - {formatCruiseDate(lastDate)} | {nights} Nights | {departure.port}</p>
            </div>

            <div className="header-buttons">
              {facebookGroup && (
                <Button
                  href={facebookGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white"
                  size="sm"
                >
                  Join the community
                </Button>
              )}
              <Button
                href="https://www.limitlesscruises.com"
                className="btn-outline-white"
                size="sm"
              >
                Visit Limitless Cruises
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Map and Weather Grid */}
      <div className="cruise-map-weather-section">
        <div className="container">
          <div className="map-weather-grid">
            {/* Live Ship Tracker */}
            <div className="map-weather-map">
              <ShipTracker 
                imo={ship.imo}
                height={350}
                showTrack={true}
                title={`Where's ${ship.name} Right Now?`}
              />
            </div>

            {/* Today's Weather */}
            <div className="map-weather-weather">
              <h3 className="weather-section-title">Today's Weather</h3>
              <div className="weather-location-label">
                {dayData?.portName}
              </div>
              {dayData?.coords ? (
                <PortWeather 
                  portName={null}
                  lat={dayData.coords.lat}
                  lon={dayData.coords.lon}
                  compact={false}
                  showHourly={false}
                  showDaily={false}
                />
              ) : (
                <div className="weather-at-sea-card">
                  <p className="at-sea-label">At Sea</p>
                  <p className="at-sea-note">Weather updates available when approaching port</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Day Navigation */}
      <DayNavigation
        itinerary={itinerary}
        selectedDay={currentDayIndex}
        onDaySelect={handleDaySelect}
      />

      {/* Section Tabs */}
      <SectionTabs
        dayType={dayData.dayType}
        selectedSection={currentSection}
        onSectionSelect={handleSectionSelect}
      />

      {/* Main Content - ref for scroll targeting */}
      <div className="companion-content">
        <div className="container">
          <div ref={contentRef} id="section-content" className="day-content">
            <h2 className="day-title">{dayData.dayLabel} - {dayData.portName}</h2>
            
            {/* Section Content */}
            {renderSectionContent()}
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="companion-footer-simple">
        <div className="container">
          <p>© 2026 Limitless Cruises. Not affiliated with P&O Cruises.</p>
          <p className="footer-disclaimer-link">
            <Link to="/website-terms">Full disclaimer</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}

export default CruiseCompanionPage;
