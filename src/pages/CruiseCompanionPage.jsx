import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { hasConsent } from '../components/cruise/CruiseConsentGate';
import CruiseConsentGate from '../components/cruise/CruiseConsentGate';
import DayNavigation from '../components/cruise/DayNavigation';
import SectionTabs from '../components/cruise/SectionTabs';
import PortDayContent from '../components/cruise/sections/PortDayContent';
import SeaDayContent from '../components/cruise/sections/SeaDayContent';
import EmbarkationContent from '../components/cruise/sections/EmbarkationContent';
import DisembarkationContent from '../components/cruise/sections/DisembarkationContent';
import ShipContent from '../components/cruise/sections/ShipContent';
import CountdownTimer from '../components/cruise/CountdownTimer';
import ShipTracker from '../components/cruise/ShipTracker';
import PortWeather from '../components/cruise/PortWeather';
import { g606Itinerary, g606ShipInfo, g606Departure, getSectionsForDayType } from '../data/cruise/g606-itinerary';
import { SITE_ASSETS } from '../config/assetUrls';
import { Button } from '../components/ui';
import './CruiseCompanionPage.css';

// OG Image for social sharing - Canary Islands hero
const G606_OG_IMAGE = 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_destinations/canary-islands/hero.webp';

// Facebook group link
const FB_GROUP_URL = 'https://www.facebook.com/groups/1019149802999591/';

/**
 * Get current cruise day index
 */
function getCurrentCruiseDayIndex() {
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

/**
 * Main Cruise Companion Page
 */
function CruiseCompanionPage() {
  const [consentGiven, setConsentGiven] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    // Check for existing consent
    if (hasConsent()) {
      setConsentGiven(true);
      // Initialize day selection
      const currentDay = getCurrentCruiseDayIndex();
      setSelectedDayIndex(currentDay);
      const dayData = g606Itinerary[currentDay];
      const sections = getSectionsForDayType(dayData.dayType);
      setSelectedSection(sections[0]);
    }
    setIsChecking(false);
  }, []);

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
    const currentDay = getCurrentCruiseDayIndex();
    setSelectedDayIndex(currentDay);
    const dayData = g606Itinerary[currentDay];
    const sections = getSectionsForDayType(dayData.dayType);
    setSelectedSection(sections[0]);
  };

  const handleDaySelect = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
    const dayData = g606Itinerary[dayIndex];
    const sections = getSectionsForDayType(dayData.dayType);
    setSelectedSection(sections[0]); // Reset to first section when day changes
  };

  const handleSectionSelect = (sectionKey) => {
    setSelectedSection(sectionKey);
  };

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
          title="Cruise Companion - P&O Iona G606"
          description="Your personal cruise companion for P&O Iona G606, Spain, Portugal & Canary Islands, March 2026"
          image={G606_OG_IMAGE}
          robots="noindex, nofollow"
        />
        <CruiseConsentGate onConsent={handleConsent} />
      </div>
    );
  }

  // Get current day data
  const currentDayIndex = selectedDayIndex !== null ? selectedDayIndex : getCurrentCruiseDayIndex();
  const dayData = g606Itinerary[currentDayIndex];
  const currentSection = selectedSection || getSectionsForDayType(dayData.dayType)[0];

  // Get next port for sea days
  const getNextPort = () => {
    for (let i = currentDayIndex + 1; i < g606Itinerary.length; i++) {
      if (g606Itinerary[i].dayType === 'port') {
        return g606Itinerary[i].portName;
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
          <PortDayContent
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

  return (
    <main className="cruise-companion-page">
      <SEO
        title="G606 Cruise Guide | P&O Iona | Canary Islands March 2026"
        description="Your insider guide to P&O Iona G606 - Spain, Portugal & Canary Islands, 14-28 March 2026. Port tips, recommendations & more."
        image={G606_OG_IMAGE}
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
              <h1>P&O IONA | G606</h1>
              <p className="cruise-title">Spain, Portugal & Canary Islands</p>
              <p className="cruise-dates">14-28 March 2026 | 14 Nights | Southampton</p>
            </div>

            <div className="header-buttons">
              <Button
                href={FB_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white"
                size="sm"
              >
                Join the community
              </Button>
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

      {/* Countdown Timer Section */}
      <div className="cruise-countdown-section">
        <div className="container">
          <CountdownTimer 
            departureDate={`${g606Departure.date}T${g606Departure.time}:00`}
            cruiseName="G606"
            shipName={g606ShipInfo.name}
          />
        </div>
      </div>

      {/* Map and Weather Grid */}
      <div className="cruise-map-weather-section">
        <div className="container">
          <div className="map-weather-grid">
            {/* Live Ship Tracker */}
            <div className="map-weather-map">
              <ShipTracker 
                imo={g606ShipInfo.imo}
                height={350}
                showTrack={true}
                title="Where's Iona Right Now?"
              />
            </div>

            {/* Today's Weather */}
            <div className="map-weather-weather">
              <h3 className="weather-section-title">Today's Weather</h3>
              <div className="weather-location-label">
                {dayData.portName}
              </div>
              {dayData.coords ? (
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
        selectedDay={currentDayIndex}
        onDaySelect={handleDaySelect}
      />

      {/* Section Tabs */}
      <SectionTabs
        dayType={dayData.dayType}
        selectedSection={currentSection}
        onSectionSelect={handleSectionSelect}
      />

      {/* Main Content */}
      <div className="companion-content">
        <div className="container">
          <div className="day-content">
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
