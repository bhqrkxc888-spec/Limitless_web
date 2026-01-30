/**
 * Detailed Port Guide Component
 * Renders G606-style comprehensive port content with tabbed navigation
 * Used by PortGuidePage when detailed content is available
 * 
 * Matches the same layout and style as G606 cruise companion port days
 */

import { useState, useRef, useEffect, Fragment } from 'react';
import { usePortGuideFolderImages } from '../hooks/usePortGuideFolderImages';
import ImageCarousel from '../components/port/ImageCarousel';
import DynamicSubsection from '../components/port/DynamicSubsection';
import { MapPin, Clock, Info, Users, Utensils, Accessibility, Map, Eye, Star, AlertCircle, Thermometer, Waves, ChefHat, Wind, Anchor, Cross, Moon, HelpCircle } from 'lucide-react';
import { formatBoldText, formatParagraphsWithBold } from '../utils/textFormatting.jsx';
import './DetailedPortGuide.css';

// NOTE: All inline images removed - now using folder-based carousel system only
// Images are loaded from WEB_port-guides bucket via usePortGuideFolderImages hook
// Old image hooks (usePortGuideImage) and components (ContentImage, OptimizedImage) removed

/**
 * Image Lightbox Modal
 * Shows full-size image with Limitless Cruises branding and close button
 */
function ImageLightbox({ src, alt, onClose }) {
  if (!src) return null;

  return (
    <div 
      className="image-lightbox-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          zIndex: 10001,
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
        aria-label="Close"
      >
        ×
      </button>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <img 
          src={src}
          alt={alt || 'Image'}
          style={{
            maxWidth: '100%',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: '4px'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/WEB_site/logo.webp';
            e.target.style.objectFit = 'contain';
            e.target.style.padding = '2rem';
            e.target.style.background = '#f8f5f0';
          }}
        />
        
        <div 
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.5px'
          }}
        >
          Limitless Cruises
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to fetch marine weather data from Stormglass API
 * Uses server-side caching (24h) to respect free tier limits
 */
function useMarineWeather(coordinates, portId) {
  const [marineData, setMarineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract lat/lng to use as stable dependencies
  const lat = coordinates?.lat;
  const lng = coordinates?.lng;

  useEffect(() => {
    if (!lat || !lng) {
      return;
    }

    const fetchMarineWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/marine-weather?lat=${lat}&lng=${lng}&portId=${portId || ''}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch marine weather');
        }

        const data = await response.json();
        setMarineData(data);
      } catch (err) {
        console.error('Marine weather fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarineWeather();
  }, [lat, lng, portId]);

  return { marineData, loading, error };
}

// Port guide section definitions (similar to G606)
const PORT_SECTIONS = [
  { key: 'overview', label: 'Overview', icon: Eye },
  { key: 'stayLocal', label: 'Stay Local', icon: Map },
  { key: 'goFurther', label: 'Go Further', icon: MapPin },
  { key: 'withKids', label: 'With Kids', icon: Users },
  { key: 'send', label: 'Accessibility', icon: Accessibility },
  { key: 'medical', label: 'Medical', icon: Cross },
  { key: 'foodAndDrink', label: 'Food & Drink', icon: Utensils },
  { key: 'overnight', label: 'Overnight', icon: Moon },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
];

export function DetailedPortGuide({ slug, portName, detailedContent, port }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const scrollAnchorRef = useRef(null);
  
  // Tab click - update state and scroll to anchor
  // Only scroll to anchor if user has actually clicked a tab (not on initial load)
  const handleTabChange = (sectionKey) => {
    setActiveSection(sectionKey);
    setHasUserInteracted(true);
    // Scroll to anchor after React updates - only if user initiated
    requestAnimationFrame(() => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };
  
  // Load folder images for all sections (NEW carousel system)
  // Note: Old image hooks (beachImage, mcdonaldsImage, etc.) removed - now using folder-based carousels only
  const { images: overviewImages, hasImages: hasOverviewImages } = usePortGuideFolderImages(slug, 'overview');
  const { images: stayLocalImages, hasImages: hasStayLocalImages } = usePortGuideFolderImages(slug, 'stay-local');
  const { images: goFurtherImages, hasImages: hasGoFurtherImages } = usePortGuideFolderImages(slug, 'go-further');
  const { images: withKidsImages, hasImages: hasWithKidsImages } = usePortGuideFolderImages(slug, 'with-kids');

  // Extract data from detailedContent (may be null)
  const { overview, stayLocal, goFurther, withKids, send, medical, foodAndDrink, overnight } = detailedContent || {};
  
  // Get familyFriendly data from port (ports.js)
  const familyFriendly = port?.familyFriendly;
  
  // Fetch marine weather data if beach has coordinates
  // Hook must be called unconditionally (before any early returns)
  const beachCoordinates = stayLocal?.beach?.coordinates;
  const { marineData, loading: marineLoading } = useMarineWeather(beachCoordinates, slug);

  if (!detailedContent) return null;

  // Get FAQ data from port object (generated by AI finalize stage)
  const faq = port?.faq;
  
  // Check which sections have content - match field names from portContent.js
  const hasContent = {
    overview: !!overview,
    stayLocal: !!stayLocal && (stayLocal.quickWalk?.length > 0 || stayLocal.longerWalk?.length > 0 || stayLocal.beach || stayLocal.tip || stayLocal.sampleItinerary),
    goFurther: !!goFurther && (goFurther.attractions?.length > 0 || goFurther.halfDayItinerary || goFurther.fullDayItinerary),
    // withKids now checks BOTH portContent.withKids AND port.familyFriendly
    withKids: (!!withKids && (withKids.toddlers?.length > 0 || withKids.olderKids?.length > 0 || withKids.easyDay || withKids.familyItinerary)) || !!familyFriendly,
    // 'send' uses 'mobility', 'quietSpots', 'sensory' - match actual data structure
    send: !!send && (send.wheelchairAccess || send.mobility?.length > 0 || send.quietSpots?.length > 0 || send.mobilityConsiderations?.length > 0 || send.wheelchairItinerary),
    // 'medical' - only show if has actual content (not empty placeholders)
    medical: !!medical && (medical.pharmacy?.name || medical.hospital?.name || medical.tips?.length > 0),
    // 'foodAndDrink' uses 'restaurants', 'cafes', 'bars', 'localSpeciality' - match actual data structure
    foodAndDrink: !!foodAndDrink && (foodAndDrink.restaurants?.length > 0 || foodAndDrink.localSpeciality || foodAndDrink.localSpecialties?.length > 0 || foodAndDrink.drinkingWater || foodAndDrink.coffee?.length > 0),
    // 'overnight' - evening activities, don't-miss experiences
    overnight: !!overnight && (overnight.eveningActivities?.length > 0 || overnight.dontMiss?.length > 0 || overnight.summary),
    // 'faq' - frequently asked questions from AI finalize stage
    faq: !!faq && faq.length > 0,
  };

  // Filter to only show tabs with content
  const availableSections = PORT_SECTIONS.filter(section => hasContent[section.key]);

  // Handler to open image in lightbox
  const handleOpenLightbox = (src, alt) => {
    setLightboxImage({ src, alt });
  };

  // Render the active section content
  const renderSectionContent = () => {
    let content;
    switch (activeSection) {
      case 'overview':
        content = <OverviewSection overview={overview} portName={portName} slug={slug} overviewImages={overviewImages} hasOverviewImages={hasOverviewImages} />;
        break;
      case 'stayLocal':
        content = <StayLocalSection stayLocal={stayLocal} marineData={marineData} marineLoading={marineLoading} stayLocalImages={stayLocalImages} hasStayLocalImages={hasStayLocalImages} />;
        break;
      case 'goFurther':
        content = <GoFurtherSection goFurther={goFurther} slug={slug} goFurtherImages={goFurtherImages} hasGoFurtherImages={hasGoFurtherImages} />;
        break;
      case 'withKids':
        content = <WithKidsSection withKids={withKids} familyFriendly={familyFriendly} withKidsImages={withKidsImages} hasWithKidsImages={hasWithKidsImages} />;
        break;
      case 'send':
        content = <SendSection send={send} />;
        break;
      case 'medical':
        content = <MedicalSection medical={medical} onOpenLightbox={handleOpenLightbox} />;
        break;
      case 'foodAndDrink':
        content = <FoodDrinkSection foodAndDrink={foodAndDrink} onOpenLightbox={handleOpenLightbox} />;
        break;
      case 'overnight':
        content = <OvernightSection overnight={overnight} portName={portName} />;
        break;
      case 'faq':
        content = <FAQSection faq={faq} portName={portName} />;
        break;
      default:
        content = <OverviewSection overview={overview} portName={portName} />;
    }
    return content;
  };

  return (
    <div className="detailed-port-guide">
      {/* Section Tabs - Same style as G606 */}
      <nav className="port-section-tabs" aria-label="Port guide sections">
        <div className="port-tabs-scroll">
          {availableSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.key;
            
            return (
              <button
                key={section.key}
                onClick={() => handleTabChange(section.key)}
                className={`port-section-tab ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
                aria-label={`View ${section.label} section`}
              >
                <Icon size={16} className="tab-icon" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Scroll anchor - only add scroll-margin-top class after user clicks a tab
          This prevents browser from auto-scrolling to this element on initial page load */}
      <div 
        ref={scrollAnchorRef} 
        className={hasUserInteracted ? 'scroll-anchor' : 'scroll-anchor-inactive'} 
        aria-hidden="true" 
      />
      
      {/* Section Content */}
      <div className="port-section-content">
        {renderSectionContent()}
      </div>

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <ImageLightbox 
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}

/* ========================================
   SECTION COMPONENTS
   ======================================== */

function SubSection({ title, children }) {
  return (
    <div className="port-subsection">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/**
 * TerrainBadge - Traffic light badge for walking difficulty
 * @param {string} terrain - 'easy' | 'moderate' | 'challenging'
 */
function TerrainBadge({ terrain }) {
  const terrainConfig = {
    easy: { label: 'Flat & Easy', className: 'terrain-easy' },
    moderate: { label: 'Some Hills', className: 'terrain-moderate' },
    challenging: { label: 'Steep/Difficult', className: 'terrain-challenging' }
  };
  
  const config = terrainConfig[terrain] || terrainConfig.easy;
  
  return (
    <span className={`terrain-badge ${config.className}`}>
      {config.label}
    </span>
  );
}

/**
 * AccessibilityBadge - Traffic light badge for accessibility rating
 * @param {string} rating - 'full' | 'partial' | 'limited' | 'none'
 * @param {string} notes - Optional notes about accessibility
 */
function AccessibilityBadge({ rating, notes }) {
  const accessConfig = {
    full: { label: 'Fully Accessible', className: 'access-full', icon: '♿' },
    partial: { label: 'Partially Accessible', className: 'access-partial', icon: '⚠️' },
    limited: { label: 'Limited Access', className: 'access-limited', icon: '⚠️' },
    none: { label: 'Not Accessible', className: 'access-none', icon: '🚫' }
  };
  
  const config = accessConfig[rating] || accessConfig.partial;
  
  return (
    <span className={`accessibility-badge ${config.className}`} title={notes || ''}>
      {config.icon} {config.label}
    </span>
  );
}

/**
 * Marine Conditions Card - displays live sea conditions from Stormglass API
 * Shows wave height, water temperature, wind, and swimming safety
 */
function MarineConditionsCard({ marineData, loading }) {
  if (loading) {
    return (
      <div className="marine-conditions-card loading">
        <div className="marine-header">
          <Anchor size={18} />
          <h5>Live Sea Conditions</h5>
        </div>
        <p className="marine-loading">Loading marine data...</p>
      </div>
    );
  }
  
  if (!marineData || marineData.error) {
    return null; // Don't show anything if no data
  }

  // Format values for display (returns number only, unit added separately)
  const formatValue = (obj, decimals = 1) => {
    if (!obj || obj.value === null || obj.value === undefined) return 'N/A';
    return Number(obj.value).toFixed(decimals);
  };

  // Get swimming safety class
  const getSafetyClass = () => {
    if (marineData.swimmingSafe === null) return '';
    return marineData.swimmingSafe ? 'safe' : 'caution';
  };

  return (
    <div className="marine-conditions-card">
      <div className="marine-header">
        <Anchor size={18} />
        <h5>Live Sea Conditions</h5>
      </div>
      
      <div className="marine-grid">
        {marineData.waterTemperature?.value !== null && (
          <div className="marine-item">
            <Thermometer size={16} />
            <span className="marine-label">Water Temp</span>
            <span className="marine-value">{formatValue(marineData.waterTemperature)}°C</span>
          </div>
        )}
        
        {marineData.waveHeight?.value !== null && (
          <div className="marine-item">
            <Waves size={16} />
            <span className="marine-label">Wave Height</span>
            <span className="marine-value">{formatValue(marineData.waveHeight)}m</span>
          </div>
        )}
        
        {marineData.windSpeed?.value !== null && (
          <div className="marine-item">
            <Wind size={16} />
            <span className="marine-label">Wind</span>
            <span className="marine-value">{formatValue(marineData.windSpeed, 0)}m/s</span>
          </div>
        )}
      </div>
      
      {marineData.conditions && (
        <div className={`marine-conditions-summary ${getSafetyClass()}`}>
          <span>{marineData.conditions}</span>
        </div>
      )}
      
      <p className="marine-note">
        Stormglass
      </p>
    </div>
  );
}

function OverviewSection({ overview, portName, _slug, overviewImages, hasOverviewImages }) {
  if (!overview) return <p>No overview information available yet.</p>;

  return (
    <div className="section-overview">
      <div className="section-intro">
        <h2>Welcome to {portName}</h2>
      </div>

      {/* Show image carousel if images exist */}
      {hasOverviewImages && (
        <>
          <ImageCarousel 
            images={overviewImages}
            autoScroll={true}
            interval={5000}
          />
          <hr className="section-divider" />
        </>
      )}
      
      {/* Hook - Why this port is special */}
      {overview.hook && (
        <div className="port-hook">
          <Star size={20} className="hook-icon" />
          <p>{overview.hook}</p>
        </div>
      )}
      
      {overview.description && (
        <div className="port-description">
          {overview.description.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      )}
      
      <hr className="section-divider" />
      
      {overview.portInfo && (
        <SubSection title="Port Information">
          <div className="port-info-grid">
            {overview.portInfo.dockLocation && (
              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <strong>Dock Location</strong>
                  <p>{overview.portInfo.dockLocation}</p>
                </div>
              </div>
            )}
            {overview.portInfo.distanceToTown && (
              <div className="info-item">
                <Clock size={20} />
                <div>
                  <strong>Distance to Town</strong>
                  <p>{overview.portInfo.distanceToTown}</p>
                </div>
              </div>
            )}
            {overview.portInfo.shuttleInfo && (
              <div className="info-item">
                <Info size={20} />
                <div>
                  <strong>Shuttle Info</strong>
                  <p>{overview.portInfo.shuttleInfo}</p>
                </div>
              </div>
            )}
          </div>
        </SubSection>
      )}

      {overview.weatherSeasonal && (
        <>
          <hr className="section-divider" />
          <SubSection title="Typical Weather">
            <p>{overview.weatherSeasonal}</p>
          </SubSection>
        </>
      )}

      {/* Important Notes - Cultural tips, siesta, closures */}
      {overview.importantNotes && overview.importantNotes.length > 0 && (
        <>
          <hr className="section-divider" />
          <div className="important-notes-box">
            <h4>⚠️ Good to Know</h4>
            <ul className="important-notes-list">
              {overview.importantNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function StayLocalSection({ stayLocal, marineData, marineLoading, stayLocalImages, hasStayLocalImages }) {
  if (!stayLocal) return <p>No local information available yet.</p>;

  // Check if using NEW flexible structure
  const hasSubsections = stayLocal.subsections && Array.isArray(stayLocal.subsections) && stayLocal.subsections.length > 0;

  return (
    <div className="section-stay-local">
      <div className="section-intro">
        <h2>Stay Local</h2>
        <p>{stayLocal.overview || 'Everything within walking distance from the ship'}</p>
      </div>

      <hr className="section-divider" />

      {/* Show image carousel if images exist */}
      {hasStayLocalImages && (
        <>
          <ImageCarousel 
            images={stayLocalImages}
            autoScroll={true}
            interval={5000}
          />
          <hr className="section-divider" />
        </>
      )}

      {/* NEW: Dynamic subsections rendering */}
      {hasSubsections ? (
        <>
          {stayLocal.subsections.map((subsection, idx) => (
            <DynamicSubsection
              key={subsection.id || idx}
              subsection={subsection}
              index={idx}
              totalCount={stayLocal.subsections.length}
              showDivider={true}
            />
          ))}
        </>
      ) : (
        /* OLD: Legacy hardcoded structure (backward compatible) */
        <>

      {/* Convenience Stores & Essentials - APPEARS FIRST */}
      {stayLocal.convenienceStores && stayLocal.convenienceStores.length > 0 && (
        <>
          <SubSection title="🛒 Near Port: Essentials">
            <div className="tip-box" style={{ marginBottom: '1rem' }}>
              <p><strong>Quick supplies right off the ship:</strong> Water, snacks, sunscreen, and basic necessities before you start exploring.</p>
            </div>
            {stayLocal.convenienceStores.map((store, idx) => (
              <div key={idx} className="convenience-store-item">
                <h4>{store.name}</h4>
                <div className="store-details">
                  <p className="store-location"><MapPin size={16} /> <strong>Location:</strong> {store.location}</p>
                  {store.type && <p className="store-type"><strong>Type:</strong> {store.type}</p>}
                  <p className="store-what"><strong>What they sell:</strong> {store.what}</p>
                  {store.notes && <p className="store-notes"><Info size={16} /> {store.notes}</p>}
                </div>
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.quickWalk && stayLocal.quickWalk.length > 0 && (
        <>
          <SubSection title="Quick Walk (Under 10 mins)">
            {stayLocal.quickWalk.map((item, idx) => (
              <div key={idx} className="walk-item">
                <div className="walk-item-header">
                  <h4>{item.title}</h4>
                  {item.terrain && <TerrainBadge terrain={item.terrain} />}
                </div>
                <p>{item.content}</p>
                {item.mapLink && (
                  <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                    View walking route →
                  </a>
                )}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.longerWalk && stayLocal.longerWalk.length > 0 && (
        <>
          <SubSection title="Longer Walk (10-30 mins)">
            {stayLocal.longerWalk.map((item, idx) => (
              <div key={idx} className="walk-item">
                <div className="walk-item-header">
                  <h4>{item.title}</h4>
                  {item.terrain && <TerrainBadge terrain={item.terrain} />}
                </div>
                <p>{item.content}</p>
                {item.mapLink && (
                  <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                    View walking route →
                  </a>
                )}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.parks && stayLocal.parks.length > 0 && (
        <>
          <SubSection title="Parks & Green Spaces">
            {stayLocal.parks.map((park, idx) => (
              <div key={idx} className="walk-item">
                <div className="walk-item-header">
                  <h4>{park.title}</h4>
                  {park.terrain && <TerrainBadge terrain={park.terrain} />}
                </div>
                <p>{park.content}</p>
                {park.mapLink && (
                  <a href={park.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                    View walking route →
                  </a>
                )}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.beach && (
        <>
          <SubSection title="Beach">
            <div className="content-block">
              {/* Beach info - text only (images via carousel system) */}
              <div className="content-block__top">
                <div className="content-block__header">
                  <h4>{stayLocal.beach.title}</h4>
                  <p>{stayLocal.beach.content}</p>
                </div>
              </div>
              
              {/* Row 2: Additional details */}
              <div className="content-block__details">
                {/* Beach info badges */}
                {(stayLocal.beach.waterTemperature || stayLocal.beach.facilities) && (
                  <div className="beach-info-grid">
                    {stayLocal.beach.waterTemperature && (
                      <div className="beach-info-item">
                        <Thermometer size={16} />
                        <span><strong>Water:</strong> {stayLocal.beach.waterTemperature}</span>
                      </div>
                    )}
                    {stayLocal.beach.facilities && (
                      <div className="beach-info-item">
                        <Waves size={16} />
                        <span><strong>Facilities:</strong> {stayLocal.beach.facilities}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Live Marine Conditions from Stormglass API */}
                {stayLocal.beach.coordinates && (
                  <MarineConditionsCard marineData={marineData} loading={marineLoading} />
                )}
                
                {/* Accessibility notes for beach */}
                {stayLocal.beach.accessNotes && (
                  <p className="beach-access-notes">
                    <Accessibility size={14} /> {stayLocal.beach.accessNotes}
                  </p>
                )}
                
                {stayLocal.beach.additional && stayLocal.beach.additional.length > 0 && (
                  <ul className="simple-list">
                    {stayLocal.beach.additional.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                
                {stayLocal.beach.mapLink && (
                  <a href={stayLocal.beach.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                    View beach location →
                  </a>
                )}
              </div>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.scenic && stayLocal.scenic.length > 0 && (
        <>
          <SubSection title="Photo Spots">
            <ul className="simple-list">
              {stayLocal.scenic.map((spot, idx) => (
                <li key={idx}>{spot}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.shopping && stayLocal.shopping.length > 0 && (
        <>
          <SubSection title="Shopping">
            <ul className="simple-list">
              {stayLocal.shopping.map((shop, idx) => (
                <li key={idx}>{shop}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.coffee && stayLocal.coffee.length > 0 && (
        <>
          <SubSection title="Coffee Spots">
            <ul className="simple-list">
              {stayLocal.coffee.map((cafe, idx) => (
                <li key={idx}>{cafe}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.bars && stayLocal.bars.length > 0 && (
        <>
          <SubSection title="Bars & Drinks">
            <ul className="simple-list">
              {stayLocal.bars.map((bar, idx) => (
                <li key={idx}>{bar}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.rainyDay && stayLocal.rainyDay.length > 0 && (
        <>
          <SubSection title="Rainy Day Options">
            <ul className="simple-list">
              {stayLocal.rainyDay.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Legacy tip (show for both new and old structure) */}
      {stayLocal.tip && (
        <div className="tip-box">
          <strong>💡 Our Tip</strong>
          <p>{stayLocal.tip}</p>
        </div>
      )}
        </>
      )}
    </div>
  );
}

function GoFurtherSection({ goFurther, _slug, goFurtherImages, hasGoFurtherImages }) {
  // Check if using NEW flexible structure
  const hasSubsections = goFurther?.subsections && Array.isArray(goFurther.subsections) && goFurther.subsections.length > 0;
  const hasLegacyAttractions = goFurther?.attractions && goFurther.attractions.length > 0;
  
  if (!goFurther || (!hasSubsections && !hasLegacyAttractions)) {
    return <p>No day trip information available yet.</p>;
  }

  return (
    <div className="section-go-further">
      <div className="section-intro">
        <h2>Go Further</h2>
        <p>{goFurther.overview || 'Longer walks - may require transport or organised tour'}</p>
      </div>

      <hr className="section-divider" />

      {/* Show image carousel if images exist */}
      {hasGoFurtherImages && (
        <>
          <ImageCarousel 
            images={goFurtherImages}
            autoScroll={true}
            interval={5000}
          />
          <hr className="section-divider" />
        </>
      )}

      {/* NEW: Dynamic subsections rendering */}
      {hasSubsections ? (
        <>
          {goFurther.subsections.map((subsection, idx) => (
            <DynamicSubsection
              key={subsection.id || idx}
              subsection={subsection}
              index={idx}
              totalCount={goFurther.subsections.length}
              showDivider={true}
            />
          ))}
        </>
      ) : (
        /* OLD: Legacy attractions structure (backward compatible) */
        <>
          {goFurther.attractions.map((attraction, idx) => {
        return (
        <Fragment key={idx}>
          <div className="attraction-block">
            {/* Main content - text only */}
            <div className="attraction-top">
              <div className="attraction-header">
                <h3>{attraction.name}</h3>
                <div className="attraction-tags">
                  {attraction.terrain && <TerrainBadge terrain={attraction.terrain} />}
                  {attraction.accessibility && (
                    <AccessibilityBadge
                      rating={attraction.accessibility.rating}
                      notes={attraction.accessibility.notes}
                    />
                  )}
                </div>
                <p className="attraction-description">{attraction.description}</p>
              </div>
            </div>

            {/* Row 2: Full width - info boxes, notes, Our Take, maps link */}
            <div className="attraction-details">
              <div className="attraction-info-grid">
                {attraction.cruiseLineOption && (
                  <div className="info-box">
                    <strong>Cruise Line Tours</strong>
                    <p>{attraction.cruiseLineOption}</p>
                  </div>
                )}
                {attraction.independent && (
                  <div className="info-box">
                    <strong>Going Independent</strong>
                    <p>{attraction.independent}</p>
                  </div>
                )}
                {attraction.allow && (
                  <div className="info-box">
                    <strong>Allow Time</strong>
                    <p>{attraction.allow}</p>
                  </div>
                )}
              </div>
              {attraction.notes && (
                <div className="attraction-notes-box">
                  <Info size={16} className="info-icon" />
                  <p>{formatBoldText(attraction.notes)}</p>
                </div>
              )}
              {attraction.ourTake && (
                <div className="attraction-tips">
                  <strong>Our Take</strong>
                  {formatParagraphsWithBold(attraction.ourTake)}
                </div>
              )}
              {attraction.mapLink && (
                <a href={attraction.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                  View on Google Maps →
                </a>
              )}
            </div>
          </div>
          <hr className="section-divider" />
        </Fragment>
        );
      })}

      {goFurther.ourTake && (
        <div className="tip-box">
          <strong>Overall Recommendation</strong>
          {formatParagraphsWithBold(goFurther.ourTake)}
        </div>
      )}
          </>
        )}
      {/* Close legacy structure block */}
    </div>
  );
}

function WithKidsSection({ withKids, familyFriendly, withKidsImages, hasWithKidsImages }) {
  // Check if using NEW flexible structure
  const hasSubsections = withKids?.subsections && Array.isArray(withKids.subsections) && withKids.subsections.length > 0;
  const hasLegacyContent = withKids && (withKids.toddlers?.length > 0 || withKids.olderKids?.length > 0 || withKids.easyDay);
  
  if (!withKids && !familyFriendly) return <p>No family information available yet.</p>;
  if (!hasSubsections && !hasLegacyContent && !familyFriendly) return <p>No family information available yet.</p>;
  // Show section if either withKids (portContent) or familyFriendly (ports.js) has content
  if (!withKids && !familyFriendly) return <p>No family information available yet.</p>;

  return (
    <div className="section-with-kids">
      <div className="section-intro">
        <h2>With Kids</h2>
        <p>Family-friendly options and advice</p>
      </div>

      <hr className="section-divider" />

      {/* Show image carousel if images exist */}
      {hasWithKidsImages && (
        <>
          <ImageCarousel 
            images={withKidsImages}
            autoScroll={true}
            interval={5000}
          />
          <hr className="section-divider" />
        </>
      )}

      {/* NEW: Dynamic subsections rendering */}
      {hasSubsections && (
        <>
          {withKids.subsections.map((subsection, idx) => (
            <DynamicSubsection
              key={subsection.id || idx}
              subsection={subsection}
              index={idx}
              totalCount={withKids.subsections.length}
              showDivider={true}
            />
          ))}
        </>
      )}

      {/* Familiar Brands - McDonald's and Ale Hop */}
      {familyFriendly && (familyFriendly.mcdonalds || familyFriendly.aleHop) && (
        <>
          <SubSection title="🍔 Familiar Brands">
            <div className="tip-highlight">
              <p><strong>Easy wins:</strong> Familiar brands close to port for snacks, toilets, and quick stops.</p>
            </div>
            <div className="family-cards-grid">
              {familyFriendly.mcdonalds && (
                <div className="family-card">
                  <div className="family-card-content">
                    <h4>{familyFriendly.mcdonalds.name}</h4>
                    <p><strong>Location:</strong> {familyFriendly.mcdonalds.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{familyFriendly.mcdonalds.walkingTime}</span>
                    </p>
                    {familyFriendly.mcdonalds.notes && <p className="family-card-notes">{familyFriendly.mcdonalds.notes}</p>}
                    {familyFriendly.mcdonalds.mapsLink && (
                      <a href={familyFriendly.mcdonalds.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        Walking directions →
                      </a>
                    )}
                  </div>
                </div>
              )}
              {familyFriendly.aleHop && (
                <div className="family-card">
                  <div className="family-card-content">
                    <h4>{familyFriendly.aleHop.name}</h4>
                    <p><strong>Location:</strong> {familyFriendly.aleHop.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{familyFriendly.aleHop.walkingTime}</span>
                    </p>
                    {familyFriendly.aleHop.notes && <p className="family-card-notes">{familyFriendly.aleHop.notes}</p>}
                    {familyFriendly.aleHop.mapsLink && (
                      <a href={familyFriendly.aleHop.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        Walking directions →
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Parks from database (withKids.parks array) */}
      {withKids?.parks && withKids.parks.length > 0 && (
        <>
          <SubSection title="🌳 Local Park">
            {withKids.parks.map((park, idx) => (
              <div key={idx} className="park-info">
                <h4>{park.name}</h4>
                <p><strong>Location:</strong> {park.location}</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <strong>Distance:</strong> 
                  <span className="distance-badge">{park.distance}</span>
                </p>
                {park.facilities && <p><strong>Facilities:</strong> {park.facilities}</p>}
                {park.description && <p>{park.description}</p>}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Local Park from familyFriendly (legacy) */}
      {familyFriendly?.localPark && (
        <>
          <SubSection title="🌳 Local Park">
            <div className="park-info">
              <div className="info-content">
                <h4>{familyFriendly.localPark.name}</h4>
                <p><strong>Location:</strong> {familyFriendly.localPark.location}</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <strong>Distance:</strong> 
                  <span className="distance-badge">{familyFriendly.localPark.walkingTime}</span>
                </p>
                {familyFriendly.localPark.facilities && <p><strong>Facilities:</strong> {familyFriendly.localPark.facilities}</p>}
                {familyFriendly.localPark.notes && <p>{familyFriendly.localPark.notes}</p>}
                {familyFriendly.localPark.mapsLink && (
                  <a href={familyFriendly.localPark.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                    Walking directions →
                  </a>
                )}
              </div>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Theme Park */}
      {familyFriendly?.themePark && (
        <>
          <SubSection title="🎢 Theme Park / Attraction">
            <div className="attraction-info">
              <h4>{familyFriendly.themePark.name}</h4>
              <p><strong>Location:</strong> {familyFriendly.themePark.location}</p>
              {familyFriendly.themePark.type && <p>{familyFriendly.themePark.type}</p>}
              {familyFriendly.themePark.highlights && <p><strong>Highlights:</strong> {familyFriendly.themePark.highlights}</p>}
              {familyFriendly.themePark.cost && <p><strong>Cost:</strong> {familyFriendly.themePark.cost}</p>}
              {familyFriendly.themePark.hours && <p><strong>Hours:</strong> {familyFriendly.themePark.hours}</p>}
              {familyFriendly.themePark.notes && <p className="tip-text">{familyFriendly.themePark.notes}</p>}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Water Park */}
      {familyFriendly?.waterPark && (
        <>
          <SubSection title="🌊 Water Park">
            <div className="attraction-info">
              <h4>{familyFriendly.waterPark.name}</h4>
              <p><strong>Location:</strong> {familyFriendly.waterPark.location}</p>
              {familyFriendly.waterPark.highlights && <p><strong>Highlights:</strong> {familyFriendly.waterPark.highlights}</p>}
              {familyFriendly.waterPark.cost && <p><strong>Cost:</strong> {familyFriendly.waterPark.cost}</p>}
              {familyFriendly.waterPark.hours && <p><strong>Hours:</strong> {familyFriendly.waterPark.hours}</p>}
              {familyFriendly.waterPark.notes && <p className="tip-text">{familyFriendly.waterPark.notes}</p>}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Parks with Playgrounds (array) */}
      {familyFriendly?.parks && familyFriendly.parks.length > 0 && (
        <>
          <SubSection title="🛝 Parks & Playgrounds">
            <div className="family-cards-grid">
              {familyFriendly.parks.map((park, idx) => (
                <div key={idx} className="family-card">
                  <div className="family-card-content">
                    <h4>{park.name}</h4>
                    <p><strong>Location:</strong> {park.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{park.walkingTime}</span>
                    </p>
                    {park.facilities && <p><strong>Facilities:</strong> {park.facilities}</p>}
                    {park.ageRange && <p><strong>Ages:</strong> {park.ageRange}</p>}
                    {park.notes && <p className="family-card-notes">{park.notes}</p>}
                    {park.mapsLink && (
                      <a href={park.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        Walking directions →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Aquarium / Sea Life */}
      {familyFriendly?.aquariumSeaLife && (
        <>
          <SubSection title="🐠 Aquarium / Sea Life">
            <div className="attraction-info">
              <h4>{familyFriendly.aquariumSeaLife.name}</h4>
              <p><strong>Location:</strong> {familyFriendly.aquariumSeaLife.location}</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <strong>Distance:</strong> 
                <span className="distance-badge">{familyFriendly.aquariumSeaLife.walkingTime}</span>
              </p>
              {familyFriendly.aquariumSeaLife.highlights && <p><strong>Highlights:</strong> {familyFriendly.aquariumSeaLife.highlights}</p>}
              {familyFriendly.aquariumSeaLife.duration && <p><strong>Duration:</strong> {familyFriendly.aquariumSeaLife.duration}</p>}
              {familyFriendly.aquariumSeaLife.hours && <p><strong>Hours:</strong> {familyFriendly.aquariumSeaLife.hours}</p>}
              {familyFriendly.aquariumSeaLife.cost && <p><strong>Cost:</strong> {familyFriendly.aquariumSeaLife.cost}</p>}
              {familyFriendly.aquariumSeaLife.notes && <p className="tip-text">{familyFriendly.aquariumSeaLife.notes}</p>}
              {familyFriendly.aquariumSeaLife.mapsLink && (
                <a href={familyFriendly.aquariumSeaLife.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                  View on map →
                </a>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Swimming Pools */}
      {familyFriendly?.swimmingPools && familyFriendly.swimmingPools.length > 0 && (
        <>
          <SubSection title="🏊 Swimming Pools">
            <div className="family-cards-grid">
              {familyFriendly.swimmingPools.map((pool, idx) => (
                <div key={idx} className="family-card">
                  <div className="family-card-content">
                    <h4>{pool.name}</h4>
                    {pool.type && <p><em>{pool.type}</em></p>}
                    <p><strong>Location:</strong> {pool.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{pool.walkingTime}</span>
                    </p>
                    {pool.facilities && <p><strong>Facilities:</strong> {pool.facilities}</p>}
                    {pool.cost && <p><strong>Cost:</strong> {pool.cost}</p>}
                    {pool.notes && <p className="family-card-notes">{pool.notes}</p>}
                    {pool.mapsLink && (
                      <a href={pool.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        View on map →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Family Beaches */}
      {familyFriendly?.beaches && familyFriendly.beaches.length > 0 && (
        <>
          <SubSection title="🏖️ Family Beaches">
            <div className="family-cards-grid">
              {familyFriendly.beaches.map((beach, idx) => (
                <div key={idx} className="family-card">
                  <div className="family-card-content">
                    <h4>{beach.name}</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{beach.walkingTime}</span>
                    </p>
                    {beach.sandType && <p><strong>Sand:</strong> {beach.sandType}</p>}
                    {beach.facilities && <p><strong>Facilities:</strong> {beach.facilities}</p>}
                    {beach.shallowWater && <p><strong>For toddlers:</strong> {beach.shallowWater}</p>}
                    {beach.notes && <p className="family-card-notes">{beach.notes}</p>}
                    {beach.mapsLink && (
                      <a href={beach.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        View on map →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Zoo / Wildlife */}
      {familyFriendly?.zooWildlife && (
        <>
          <SubSection title="🦁 Zoo / Wildlife">
            <div className="attraction-info">
              <h4>{familyFriendly.zooWildlife.name}</h4>
              <p><strong>Location:</strong> {familyFriendly.zooWildlife.location}</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <strong>Distance:</strong> 
                <span className="distance-badge">{familyFriendly.zooWildlife.walkingTime}</span>
              </p>
              {familyFriendly.zooWildlife.highlights && <p><strong>Highlights:</strong> {familyFriendly.zooWildlife.highlights}</p>}
              {familyFriendly.zooWildlife.duration && <p><strong>Duration:</strong> {familyFriendly.zooWildlife.duration}</p>}
              {familyFriendly.zooWildlife.hours && <p><strong>Hours:</strong> {familyFriendly.zooWildlife.hours}</p>}
              {familyFriendly.zooWildlife.notes && <p className="tip-text">{familyFriendly.zooWildlife.notes}</p>}
              {familyFriendly.zooWildlife.mapsLink && (
                <a href={familyFriendly.zooWildlife.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                  View on map →
                </a>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Sports Stadium / Football Museum */}
      {familyFriendly?.sportsStadiums && (
        <>
          <SubSection title="⚽ Sports Stadium / Museum">
            <div className="attraction-info">
              <h4>{familyFriendly.sportsStadiums.name}</h4>
              {familyFriendly.sportsStadiums.team && <p><strong>Team:</strong> {familyFriendly.sportsStadiums.team}</p>}
              <p><strong>Location:</strong> {familyFriendly.sportsStadiums.location}</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <strong>Distance:</strong> 
                <span className="distance-badge">{familyFriendly.sportsStadiums.walkingTime}</span>
              </p>
              {familyFriendly.sportsStadiums.tours && <p><strong>Tours:</strong> {familyFriendly.sportsStadiums.tours}</p>}
              {familyFriendly.sportsStadiums.museum && <p><strong>Museum:</strong> {familyFriendly.sportsStadiums.museum}</p>}
              {familyFriendly.sportsStadiums.notes && <p className="tip-text">{familyFriendly.sportsStadiums.notes}</p>}
              {familyFriendly.sportsStadiums.mapsLink && (
                <a href={familyFriendly.sportsStadiums.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                  View on map →
                </a>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Nature Walks */}
      {familyFriendly?.natureWalks && familyFriendly.natureWalks.length > 0 && (
        <>
          <SubSection title="🌿 Nature Walks & Gardens">
            <div className="family-cards-grid">
              {familyFriendly.natureWalks.map((walk, idx) => (
                <div key={idx} className="family-card">
                  <div className="family-card-content">
                    <h4>{walk.name}</h4>
                    {walk.type && <p><em>{walk.type}</em></p>}
                    <p><strong>Start:</strong> {walk.location}</p>
                    {walk.distance && <p><strong>Distance:</strong> {walk.distance}</p>}
                    {walk.terrain && <p><strong>Terrain:</strong> {walk.terrain}</p>}
                    {walk.highlights && <p><strong>Highlights:</strong> {walk.highlights}</p>}
                    {walk.notes && <p className="family-card-notes">{walk.notes}</p>}
                    {walk.mapsLink && (
                      <a href={walk.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        View on map →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Adventure Activities */}
      {familyFriendly?.adventure && familyFriendly.adventure.length > 0 && (
        <>
          <SubSection title="🚴 Adventure Activities">
            <div className="family-cards-grid">
              {familyFriendly.adventure.map((activity, idx) => (
                <div key={idx} className="family-card">
                  <div className="family-card-content">
                    <h4>{activity.name}</h4>
                    {activity.type && <p><em>{activity.type}</em></p>}
                    <p><strong>Location:</strong> {activity.location}</p>
                    {activity.ageRange && <p><strong>Ages:</strong> {activity.ageRange}</p>}
                    {activity.duration && <p><strong>Duration:</strong> {activity.duration}</p>}
                    {activity.cost && <p><strong>Cost:</strong> {activity.cost}</p>}
                    {activity.notes && <p className="family-card-notes">{activity.notes}</p>}
                    {activity.mapsLink && (
                      <a href={activity.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        View on map →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Kid-Friendly Attractions */}
      {familyFriendly?.attractions && familyFriendly.attractions.length > 0 && (
        <>
          <SubSection title="🎡 Kid-Friendly Attractions">
            <div className="family-cards-grid">
              {familyFriendly.attractions.map((attraction, idx) => (
                <div key={idx} className="family-card">
                  <div className="family-card-content">
                    <h4>{attraction.name}</h4>
                    {attraction.type && <p><em>{attraction.type}</em></p>}
                    <p><strong>Location:</strong> {attraction.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{attraction.walkingTime}</span>
                    </p>
                    {attraction.highlights && <p><strong>Highlights:</strong> {attraction.highlights}</p>}
                    {attraction.duration && <p><strong>Duration:</strong> {attraction.duration}</p>}
                    {attraction.notes && <p className="family-card-notes">{attraction.notes}</p>}
                    {attraction.mapsLink && (
                      <a href={attraction.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                        View on map →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Beach Option Summary */}
      {familyFriendly?.beachOption && (
        <>
          <SubSection title="🏖️ Best Family Beach">
            <div className="tip-box">
              <p>{familyFriendly.beachOption}</p>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Easy Day Suggestion - moved to top */}
      {withKids?.easyDay && (
        <>
          <div className="tip-box">
            <strong>💡 Easy Day Suggestion</strong>
            <p>{withKids.easyDay}</p>
          </div>
          <hr className="section-divider" />
        </>
      )}

      {/* Original withKids content from portContent.js - now in boxes */}
      {withKids?.toddlers && withKids.toddlers.length > 0 && (
        <>
          <SubSection title="Toddlers & Young Children">
            <div className="info-list-box">
              <ul className="simple-list">
                {withKids.toddlers.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.olderKids && withKids.olderKids.length > 0 && (
        <>
          <SubSection title="Older Kids (6-12)">
            <div className="info-list-box">
              <ul className="simple-list">
                {withKids.olderKids.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.teens && withKids.teens.length > 0 && (
        <>
          <SubSection title="Teens (13+)">
            <div className="info-list-box">
              <ul className="simple-list">
                {withKids.teens.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.familyFood && withKids.familyFood.length > 0 && (
        <>
          <SubSection title="Family-Friendly Food">
            <div className="info-list-box">
              <ul className="simple-list">
                {withKids.familyFood.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.warnings && withKids.warnings.length > 0 && (
        <>
          <SubSection title="⚠️ Things to Note">
            <div className="info-list-box warning-box">
              <ul className="simple-list warning-list">
                {withKids.warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}
    </div>
  );
}

function SendSection({ send }) {
  if (!send) return <p>No accessibility information available yet.</p>;

  return (
    <div className="section-send">
      <div className="section-intro">
        <h2>Accessibility (SEND)</h2>
        <p>Information for guests with accessibility needs</p>
      </div>

      <hr className="section-divider" />

      {send.wheelchairAccess && (
        <>
          <SubSection title="Wheelchair Access">
            {typeof send.wheelchairAccess === 'object' ? (
              <div className="access-grid">
                {send.wheelchairAccess.portArea && (
                  <div className="access-item">
                    <strong>Port Area:</strong>
                    <p>{send.wheelchairAccess.portArea}</p>
                  </div>
                )}
                {send.wheelchairAccess.cityCenter && (
                  <div className="access-item">
                    <strong>City Center:</strong>
                    <p>{send.wheelchairAccess.cityCenter}</p>
                  </div>
                )}
                {send.wheelchairAccess.attractions && (
                  <div className="access-item">
                    <strong>Attractions:</strong>
                    <p>{send.wheelchairAccess.attractions}</p>
                  </div>
                )}
              </div>
            ) : (
              <p>{send.wheelchairAccess}</p>
            )}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Support both 'mobility' (G606 style) and 'mobilityConsiderations' (old style) */}
      {((send.mobility && send.mobility.length > 0) || (send.mobilityConsiderations && send.mobilityConsiderations.length > 0)) && (
        <>
          <SubSection title="Mobility Considerations">
            <ul className="simple-list">
              {(send.mobility || send.mobilityConsiderations).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {send.accessibleAttractions && send.accessibleAttractions.length > 0 && (
        <>
          <SubSection title="Accessible Attractions">
            {send.accessibleAttractions.map((attraction, idx) => (
              <div key={idx} className="access-item">
                <strong>{attraction.name}:</strong>
                <p>{attraction.accessibility}</p>
                {attraction.notes && <p><em>{attraction.notes}</em></p>}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Support 'quietSpots' from G606 style data */}
      {send.quietSpots && send.quietSpots.length > 0 && (
        <>
          <SubSection title="Quiet Spots">
            <ul className="simple-list">
              {send.quietSpots.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Quieter Alternatives - suggestions for avoiding crowds */}
      {send.quieterAlternatives && send.quieterAlternatives.length > 0 && (
        <>
          <SubSection title="Quieter Alternatives">
            <div className="tip-box">
              <p><strong>Looking for a calmer experience?</strong> Try these alternatives to the busiest spots.</p>
            </div>
            <ul className="simple-list">
              {send.quieterAlternatives.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Support both 'sensory' (G606) and 'sensoryConsiderations' (old style) */}
      {((send.sensory && send.sensory.length > 0) || (send.sensoryConsiderations && send.sensoryConsiderations.length > 0)) && (
        <>
          <SubSection title="Sensory Considerations">
            <ul className="simple-list">
              {(send.sensory || send.sensoryConsiderations).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {send.supportServices && send.supportServices.length > 0 && (
        <>
          <SubSection title="Quiet Spots & Support">
            <ul className="simple-list">
              {send.supportServices.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
        </>
      )}
    </div>
  );
}

function MedicalSection({ medical, _onOpenLightbox }) {
  if (!medical) return <p>No medical information available yet.</p>;

  // Check if there's any actual content
  const hasPharmacy = medical.pharmacy?.name;
  const hasHospital = medical.hospital?.name;
  const hasTips = medical.tips?.length > 0;
  
  if (!hasPharmacy && !hasHospital && !hasTips) {
    return <p>Medical information coming soon.</p>;
  }

  return (
    <div className="section-medical">
      <div className="section-intro">
        <h2>Medical & Pharmacy</h2>
        <p>Healthcare information for your visit</p>
      </div>

      <hr className="section-divider" />

      {hasPharmacy && (
        <>
          <SubSection title="Nearest Pharmacy">
            <div className="medical-item">
              <h4>{medical.pharmacy.name}</h4>
              {medical.pharmacy.location && (
                <p><strong>Location:</strong> {medical.pharmacy.location}</p>
              )}
              {medical.pharmacy.notes && (
                <p className="medical-notes">{medical.pharmacy.notes}</p>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {hasHospital && (
        <>
          <SubSection title="Hospital / Medical Centre">
            <div className="medical-item">
              <h4>{medical.hospital.name}</h4>
              {medical.hospital.location && (
                <p><strong>Location:</strong> {medical.hospital.location}</p>
              )}
              {medical.hospital.hasEmergency && (
                <p className="emergency-badge">✓ Has Emergency Department (A&E)</p>
              )}
              {medical.hospital.notes && (
                <p className="medical-notes">{medical.hospital.notes}</p>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {hasTips && (
        <SubSection title="Medical Tips">
          <ul className="simple-list">
            {medical.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </SubSection>
      )}
    </div>
  );
}

function FoodDrinkSection({ foodAndDrink, _onOpenLightbox }) {
  if (!foodAndDrink) return <p>No food & drink information available yet.</p>;

  return (
    <div className="section-food-drink">
      <div className="section-intro">
        <h2>Food & Drink</h2>
        <p>Local cuisine, restaurants, and dietary information</p>
      </div>

      <hr className="section-divider" />

      {/* Local Dish to Try - Featured recommendation
          Supports both 'localDishToTry' (portContent.js) and 'localDish' (regional files) */}
      {(foodAndDrink.localDishToTry || foodAndDrink.localDish) && (() => {
        const dish = foodAndDrink.localDishToTry || foodAndDrink.localDish;
        const lookForText = dish.lookFor || dish.whatToLookFor;
        return (
          <>
            <div className="local-dish-card">
              <div className="local-dish-header">
                <ChefHat size={24} className="dish-icon" />
                <h3>Worth a Try</h3>
              </div>
              <div className="local-dish-content">
                <h4>{dish.name}</h4>
                <p>{dish.description}</p>
                {lookForText && (
                  <p className="look-for"><strong>Look for:</strong> {lookForText}</p>
                )}
              </div>
            </div>
            <hr className="section-divider" />
          </>
        );
      })()}

      {/* Support 'localSpeciality' (string, G606 style) */}
      {foodAndDrink.localSpeciality && (
        <>
          <SubSection title="Local Specialities">
            {formatParagraphsWithBold(foodAndDrink.localSpeciality)}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Support 'localSpecialties' (array of objects, old style) */}
      {foodAndDrink.localSpecialties && foodAndDrink.localSpecialties.length > 0 && (
        <>
          <SubSection title="Local Specialties">
            {foodAndDrink.localSpecialties.map((specialty, idx) => (
              <div key={idx} className="food-item">
                <h4>{specialty.name}</h4>
                <p>{formatBoldText(specialty.description)}</p>
                {specialty.where && <p className="food-location">{specialty.where}</p>}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Support 'restaurants' (G606 style) */}
      {foodAndDrink.restaurants && foodAndDrink.restaurants.length > 0 && (
        <>
          <SubSection title="Restaurants">
            {foodAndDrink.restaurants.map((restaurant, idx) => (
              <div key={idx} className="food-item">
                <h4>{restaurant.name}</h4>
                {restaurant.location && <p className="food-location">{restaurant.location}</p>}
                <p>{formatBoldText(restaurant.description)}</p>
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Support 'cafes' (G606 style) */}
      {foodAndDrink.cafes && foodAndDrink.cafes.length > 0 && (
        <>
          <SubSection title="Cafés">
            {foodAndDrink.cafes.map((cafe, idx) => (
              <div key={idx} className="food-item">
                <h4>{cafe.name}</h4>
                {cafe.location && <p className="food-location">{cafe.location}</p>}
                {cafe.description && <p>{formatBoldText(cafe.description)}</p>}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Support 'bars' (G606 style) */}
      {foodAndDrink.bars && foodAndDrink.bars.length > 0 && (
        <>
          <SubSection title="Bars">
            {foodAndDrink.bars.map((bar, idx) => (
              <div key={idx} className="food-item">
                <h4>{bar.name}</h4>
                {bar.location && <p className="food-location">{bar.location}</p>}
                {bar.description && <p>{formatBoldText(bar.description)}</p>}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.budgetEats && foodAndDrink.budgetEats.length > 0 && (
        <>
          <SubSection title="Budget Eats">
            <ul className="simple-list">
              {foodAndDrink.budgetEats.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.midRange && foodAndDrink.midRange.length > 0 && (
        <>
          <SubSection title="Mid-Range Dining">
            <ul className="simple-list">
              {foodAndDrink.midRange.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.vegetarianVegan && foodAndDrink.vegetarianVegan.length > 0 && (
        <>
          <SubSection title="Vegetarian & Vegan Options">
            <ul className="simple-list">
              {foodAndDrink.vegetarianVegan.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.dietaryNotes && (
        <>
          <div className="tip-box">
            <strong>💡 Dietary Notes</strong>
            <p>{foodAndDrink.dietaryNotes}</p>
          </div>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.drinkingWater && (
        <div className="info-box">
          <strong>💧 Drinking Water</strong>
          <p>{foodAndDrink.drinkingWater}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Overnight Section - Evening activities, don't-miss experiences, extended stays
 */
function OvernightSection({ overnight, portName }) {
  if (!overnight) return <p>No overnight information available yet.</p>;

  return (
    <div className="section-overnight">
      <div className="section-intro">
        <h2>Overnight in {portName}</h2>
        <p className="section-subtitle">When your ship stays in port - evening activities and extended experiences</p>
      </div>

      {overnight.summary && (
        <>
          <div className="overnight-summary">
            {overnight.summary.split('\n\n').map((para, idx) => (
              <p key={idx}>{formatBoldText(para)}</p>
            ))}
          </div>
          <hr className="section-divider" />
        </>
      )}

      {overnight.dontMiss && overnight.dontMiss.length > 0 && (
        <>
          <SubSection title="Don't Miss">
            <div className="dont-miss-grid">
              {overnight.dontMiss.map((item, idx) => (
                <div key={idx} className="dont-miss-card">
                  <div className="dont-miss-header">
                    <Star size={18} className="dont-miss-icon" />
                    <h4>{item.title}</h4>
                  </div>
                  {item.type && <span className="activity-type">{item.type}</span>}
                  <p>{formatBoldText(item.description)}</p>
                  {item.timing && <p className="timing"><Clock size={14} /> {item.timing}</p>}
                  {item.bookingAdvice && <p className="booking-advice"><strong>Booking:</strong> {item.bookingAdvice}</p>}
                  {item.practicalInfo && <p className="practical-info">{item.practicalInfo}</p>}
                </div>
              ))}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {overnight.eveningActivities && overnight.eveningActivities.length > 0 && (
        <>
          <SubSection title="Evening Activities">
            {overnight.eveningActivities.map((activity, idx) => (
              <div key={idx} className="evening-activity">
                <h4>{activity.title}</h4>
                {activity.type && <span className="activity-type">{activity.type}</span>}
                <p>{formatBoldText(activity.description)}</p>
                {activity.timing && <p className="timing"><Clock size={14} /> {activity.timing}</p>}
                {activity.location && <p className="location"><MapPin size={14} /> {activity.location}</p>}
                {activity.tips && <p className="tips"><strong>Tip:</strong> {activity.tips}</p>}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {overnight.sunriseSunset && (
        <>
          <SubSection title="Sunrise & Sunset">
            <div className="sunrise-sunset-grid">
              {overnight.sunriseSunset.bestSunrise && (
                <div className="sunrise-card">
                  <h4>🌅 Best Sunrise</h4>
                  <p><strong>Location:</strong> {overnight.sunriseSunset.bestSunrise.location}</p>
                  {overnight.sunriseSunset.bestSunrise.timing && <p><strong>When:</strong> {overnight.sunriseSunset.bestSunrise.timing}</p>}
                  {overnight.sunriseSunset.bestSunrise.notes && <p>{overnight.sunriseSunset.bestSunrise.notes}</p>}
                </div>
              )}
              {overnight.sunriseSunset.bestSunset && (
                <div className="sunset-card">
                  <h4>🌇 Best Sunset</h4>
                  <p><strong>Location:</strong> {overnight.sunriseSunset.bestSunset.location}</p>
                  {overnight.sunriseSunset.bestSunset.timing && <p><strong>When:</strong> {overnight.sunriseSunset.bestSunset.timing}</p>}
                  {overnight.sunriseSunset.bestSunset.notes && <p>{overnight.sunriseSunset.bestSunset.notes}</p>}
                </div>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {overnight.extendedDay && (
        <>
          <SubSection title={overnight.extendedDay.title || "Extended Day Itinerary"}>
            {overnight.extendedDay.description && <p className="itinerary-intro">{overnight.extendedDay.description}</p>}
            {overnight.extendedDay.day1 && overnight.extendedDay.day1.length > 0 && (
              <div className="itinerary-timeline">
                {overnight.extendedDay.day1.map((stop, idx) => (
                  <div key={idx} className="timeline-stop">
                    <span className="timeline-time">{stop.time}</span>
                    <div className="timeline-content">
                      <strong>{stop.activity}</strong>
                      {stop.notes && <p>{stop.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {overnight.extendedDay.day2Alternative && (
              <div className="day2-note">
                <strong>Day 2:</strong> {overnight.extendedDay.day2Alternative}
              </div>
            )}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {overnight.lateNightFood && overnight.lateNightFood.length > 0 && (
        <>
          <SubSection title="Late Night Food">
            {overnight.lateNightFood.map((place, idx) => (
              <div key={idx} className="food-item">
                <h4>{place.name}</h4>
                {place.type && <span className="food-type">{place.type}</span>}
                {place.openUntil && <p className="open-until"><Clock size={14} /> Open until {place.openUntil}</p>}
                {place.location && <p className="food-location"><MapPin size={14} /> {place.location}</p>}
                {place.notes && <p>{place.notes}</p>}
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {overnight.safeAreas && (
        <div className="safety-info">
          <SubSection title="Safety Information">
            {overnight.safeAreas.evening && (
              <p><strong>Evening:</strong> {overnight.safeAreas.evening}</p>
            )}
            {overnight.safeAreas.lateNight && (
              <p><strong>Late Night:</strong> {overnight.safeAreas.lateNight}</p>
            )}
            {overnight.safeAreas.tips && (
              <p><strong>Tips:</strong> {overnight.safeAreas.tips}</p>
            )}
          </SubSection>
        </div>
      )}
    </div>
  );
}

/**
 * FAQ Section - Frequently Asked Questions for this port
 * Good for SEO - answers common cruise passenger queries
 */
function FAQSection({ faq, portName }) {
  if (!faq || faq.length === 0) {
    return <p>No frequently asked questions available yet.</p>;
  }

  return (
    <div className="faq-section">
      <div className="section-intro">
        <h2>Frequently Asked Questions</h2>
        <p>Common questions cruise passengers ask about {portName}.</p>
      </div>

      <div className="faq-list">
        {faq.map((item, index) => (
          <div key={index} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
