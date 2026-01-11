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
import AboutIona from '../components/cruise/AboutIona';
import { g606Itinerary, getSectionsForDayType } from '../data/cruise/g606-itinerary';
import { SITE_ASSETS } from '../config/assetUrls';
import { Button } from '../components/ui';
import './CruiseCompanionPage.css';

// FB Group URL - placeholder
const FB_GROUP_URL = '#'; // Replace with actual URL

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
        title="Cruise Companion - P&O Iona G606"
        description="Your personal cruise companion for P&O Iona G606, Spain, Portugal & Canary Islands, March 2026"
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

      {/* Status Bar - Show for ALL Days */}
      <div className="status-bar-placeholder">
        <div className="container">
          <p>📍 Status: Day {dayData.dayNumber} | {dayData.portName} | Weather: [TBC]</p>
          {/* Map placeholder - static image or empty box for now */}
          <div className="map-placeholder">
            [Map Placeholder - static image or empty box for now]
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

      {/* About Iona */}
      <div className="companion-content">
        <div className="container">
          <AboutIona />
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
