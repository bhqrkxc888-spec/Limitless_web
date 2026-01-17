/**
 * Detailed Port Guide Component
 * Renders G606-style comprehensive port content with tabbed navigation
 * Used by PortGuidePage when detailed content is available
 * 
 * Matches the same layout and style as G606 cruise companion port days
 */

import { useState } from 'react';
import OptimizedImage from '../components/OptimizedImage';
import { usePortGuideImage } from '../hooks/useImageUrl';
import { MapPin, Clock, Info, Users, Utensils, Accessibility, Map, Eye } from 'lucide-react';
import { formatBoldText, formatParagraphsWithBold } from '../utils/textFormatting.jsx';
import './DetailedPortGuide.css';

// Port guide section definitions (similar to G606)
const PORT_SECTIONS = [
  { key: 'overview', label: 'Overview', icon: Eye },
  { key: 'stayLocal', label: 'Stay Local', icon: Map },
  { key: 'goFurther', label: 'Go Further', icon: MapPin },
  { key: 'withKids', label: 'With Kids', icon: Users },
  { key: 'send', label: 'Accessibility', icon: Accessibility },
  { key: 'foodAndDrink', label: 'Food & Drink', icon: Utensils },
];

export function DetailedPortGuide({ slug, portName, portCountry, detailedContent, port }) {
  const [activeSection, setActiveSection] = useState('overview');
  
  // Load attraction images
  const { imageUrl: attraction1 } = usePortGuideImage(slug, 'attraction-1', portName, portCountry);
  const { imageUrl: attraction2 } = usePortGuideImage(slug, 'attraction-2', portName, portCountry);
  const { imageUrl: attraction3 } = usePortGuideImage(slug, 'attraction-3', portName, portCountry);
  const { imageUrl: attraction4 } = usePortGuideImage(slug, 'attraction-4', portName, portCountry);
  const { imageUrl: attraction5 } = usePortGuideImage(slug, 'attraction-5', portName, portCountry);
  const { imageUrl: attraction6 } = usePortGuideImage(slug, 'attraction-6', portName, portCountry);
  const { imageUrl: beachImage } = usePortGuideImage(slug, 'beach', portName, portCountry);
  
  // Load family-friendly images
  const { imageUrl: mcdonaldsImage } = usePortGuideImage(slug, 'mcdonalds', portName, portCountry);
  const { imageUrl: aleHopImage } = usePortGuideImage(slug, 'ale-hop', portName, portCountry);
  const { imageUrl: parkImage } = usePortGuideImage(slug, 'local-park', portName, portCountry);
  
  const attractionImages = [attraction1, attraction2, attraction3, attraction4, attraction5, attraction6];

  if (!detailedContent) return null;

  const { overview, stayLocal, goFurther, withKids, send, foodAndDrink } = detailedContent;
  
  // Get familyFriendly data from port (ports.js)
  const familyFriendly = port?.familyFriendly;

  // Check which sections have content - match field names from portContent.js
  const hasContent = {
    overview: !!overview,
    stayLocal: !!stayLocal && (stayLocal.quickWalk?.length > 0 || stayLocal.longerWalk?.length > 0 || stayLocal.beach || stayLocal.tip),
    goFurther: !!goFurther && goFurther.attractions?.length > 0,
    // withKids now checks BOTH portContent.withKids AND port.familyFriendly
    withKids: (!!withKids && (withKids.toddlers?.length > 0 || withKids.olderKids?.length > 0 || withKids.easyDay)) || !!familyFriendly,
    // 'send' uses 'mobility', 'quietSpots', 'sensory' - match actual data structure
    send: !!send && (send.wheelchairAccess || send.mobility?.length > 0 || send.quietSpots?.length > 0 || send.mobilityConsiderations?.length > 0),
    // 'foodAndDrink' uses 'restaurants', 'cafes', 'bars', 'localSpeciality' - match actual data structure
    foodAndDrink: !!foodAndDrink && (foodAndDrink.restaurants?.length > 0 || foodAndDrink.localSpeciality || foodAndDrink.localSpecialties?.length > 0 || foodAndDrink.drinkingWater),
  };

  // Filter to only show tabs with content
  const availableSections = PORT_SECTIONS.filter(section => hasContent[section.key]);

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection overview={overview} portName={portName} />;
      case 'stayLocal':
        return <StayLocalSection stayLocal={stayLocal} beachImage={beachImage} />;
      case 'goFurther':
        return <GoFurtherSection goFurther={goFurther} attractionImages={attractionImages} />;
      case 'withKids':
        return <WithKidsSection withKids={withKids} familyFriendly={familyFriendly} mcdonaldsImage={mcdonaldsImage} aleHopImage={aleHopImage} parkImage={parkImage} />;
      case 'send':
        return <SendSection send={send} />;
      case 'foodAndDrink':
        return <FoodDrinkSection foodAndDrink={foodAndDrink} />;
      default:
        return <OverviewSection overview={overview} portName={portName} />;
    }
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
                onClick={() => setActiveSection(section.key)}
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

      {/* Section Content */}
      <div className="port-section-content">
        {renderSectionContent()}
      </div>
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

function OverviewSection({ overview, portName }) {
  if (!overview) return <p>No overview information available yet.</p>;

  return (
    <div className="section-overview">
      <div className="section-intro">
        <h2>Welcome to {portName}</h2>
      </div>
      
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
    </div>
  );
}

function StayLocalSection({ stayLocal, beachImage }) {
  if (!stayLocal) return <p>No local information available yet.</p>;

  return (
    <div className="section-stay-local">
      <div className="section-intro">
        <h2>Stay Local</h2>
        <p>Everything within walking distance from the ship</p>
      </div>

      <hr className="section-divider" />

      {stayLocal.quickWalk && stayLocal.quickWalk.length > 0 && (
        <>
          <SubSection title="Quick Walk (Under 10 mins)">
            {stayLocal.quickWalk.map((item, idx) => (
              <div key={idx} className="walk-item">
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                {item.mapLink && (
                  <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                    Open in Google Maps →
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
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                {item.mapLink && (
                  <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                    Open in Google Maps →
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
                <h4>{park.title}</h4>
                <p>{park.content}</p>
              </div>
            ))}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {stayLocal.beach && (
        <>
          <SubSection title="Beach">
            {beachImage && (
              <div className="beach-image">
                <OptimizedImage src={beachImage} alt={stayLocal.beach.title} className="beach-img" />
              </div>
            )}
            <div className="beach-item">
              <h4>{stayLocal.beach.title}</h4>
              <p>{stayLocal.beach.content}</p>
              {stayLocal.beach.additional && stayLocal.beach.additional.length > 0 && (
                <ul>
                  {stayLocal.beach.additional.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
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

      {stayLocal.tip && (
        <div className="tip-box">
          <strong>💡 Our Tip</strong>
          <p>{stayLocal.tip}</p>
        </div>
      )}
    </div>
  );
}

function GoFurtherSection({ goFurther, attractionImages }) {
  if (!goFurther || !goFurther.attractions || goFurther.attractions.length === 0) {
    return <p>No day trip information available yet.</p>;
  }

  return (
    <div className="section-go-further">
      <div className="section-intro">
        <h2>Go Further</h2>
        <p>These need transport - tour, taxi, or public transport</p>
      </div>

      <hr className="section-divider" />

      {goFurther.attractions.map((attraction, idx) => (
        <div key={idx} className="attraction-card">
          <h3>{attraction.name}</h3>
          
          {attractionImages[idx] && (
            <div className="attraction-image">
              <OptimizedImage
                src={attractionImages[idx]}
                alt={attraction.name}
                className="attraction-img"
              />
            </div>
          )}
          
          <p className="attraction-description">{attraction.description}</p>
          
          <div className="detail-grid">
            {attraction.cruiseLineOption && (
              <div className="detail-item">
                <strong>Cruise Line Tours</strong>
                <p>{attraction.cruiseLineOption}</p>
              </div>
            )}
            {attraction.independent && (
              <div className="detail-item">
                <strong>Going Independent</strong>
                <p>{attraction.independent}</p>
              </div>
            )}
            {attraction.allow && (
              <div className="detail-item">
                <strong>Allow</strong>
                <p>{attraction.allow}</p>
              </div>
            )}
            {/* Cost/pricing removed - contact for pricing */}
          </div>
          {attraction.notes && (
            <p className="attraction-notes"><em>{formatBoldText(attraction.notes)}</em></p>
          )}
          
          {attraction.ourTake && (
            <div className="our-take">
              <strong>Our Take</strong>
              {formatParagraphsWithBold(attraction.ourTake)}
            </div>
          )}
          
          {attraction.mapLink && (
            <a href={attraction.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
              View on Google Maps →
            </a>
          )}
          
          <hr className="section-divider" />
        </div>
      ))}

      {goFurther.ourTake && (
        <div className="tip-box">
          <strong>Overall Recommendation</strong>
          {formatParagraphsWithBold(goFurther.ourTake)}
        </div>
      )}
    </div>
  );
}

function WithKidsSection({ withKids, familyFriendly, mcdonaldsImage, aleHopImage, parkImage }) {
  // Show section if either withKids (portContent) or familyFriendly (ports.js) has content
  if (!withKids && !familyFriendly) return <p>No family information available yet.</p>;

  return (
    <div className="section-with-kids">
      <div className="section-intro">
        <h2>With Kids</h2>
        <p>Family-friendly options and advice</p>
      </div>

      <hr className="section-divider" />

      {/* Quick Wins Section - McDonald's and Ale Hop */}
      {familyFriendly && (familyFriendly.mcdonalds || familyFriendly.aleHop) && (
        <>
          <SubSection title="Quick Wins for Families">
            <div className="tip-highlight">
              <p><strong>💡 Easy wins:</strong> Familiar brands close to port for snacks, toilets, and quick stops.</p>
            </div>
            <div className="family-cards-grid">
              {familyFriendly.mcdonalds && (
                <div className="family-card">
                  {mcdonaldsImage && (
                    <div className="family-card-image">
                      <OptimizedImage src={mcdonaldsImage} alt="McDonald's" />
                    </div>
                  )}
                  <div className="family-card-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: 0 }}>🍔 {familyFriendly.mcdonalds.name}</h4>
                      <span className="quick-win-tag">🎯 Quick Win</span>
                    </div>
                    <p><strong>Location:</strong> {familyFriendly.mcdonalds.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">📍 {familyFriendly.mcdonalds.walkingTime}</span>
                    </p>
                    {familyFriendly.mcdonalds.notes && <p className="family-card-notes">{familyFriendly.mcdonalds.notes}</p>}
                  </div>
                </div>
              )}
              {familyFriendly.aleHop && (
                <div className="family-card">
                  {aleHopImage && (
                    <div className="family-card-image">
                      <OptimizedImage src={aleHopImage} alt="Ale Hop" />
                    </div>
                  )}
                  <div className="family-card-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: 0 }}>🎁 {familyFriendly.aleHop.name}</h4>
                      <span className="quick-win-tag">🎯 Quick Win</span>
                    </div>
                    <p><strong>Location:</strong> {familyFriendly.aleHop.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">📍 {familyFriendly.aleHop.walkingTime}</span>
                    </p>
                    {familyFriendly.aleHop.notes && <p className="family-card-notes">{familyFriendly.aleHop.notes}</p>}
                  </div>
                </div>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Local Park */}
      {familyFriendly?.localPark && (
        <>
          <SubSection title="🏞️ Local Park">
            <div className={`park-info ${parkImage ? 'with-image' : ''}`}>
              {parkImage && (
                <div className="info-image">
                  <OptimizedImage src={parkImage} alt={familyFriendly.localPark.name} />
                </div>
              )}
              <div className="info-content">
                <h4>{familyFriendly.localPark.name}</h4>
                <p><strong>Location:</strong> {familyFriendly.localPark.location}</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <strong>Distance:</strong> 
                  <span className="distance-badge">📍 {familyFriendly.localPark.walkingTime}</span>
                </p>
                {familyFriendly.localPark.facilities && <p><strong>Facilities:</strong> {familyFriendly.localPark.facilities}</p>}
                {familyFriendly.localPark.notes && <p>{familyFriendly.localPark.notes}</p>}
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
              {familyFriendly.themePark.type && <p><strong>Type:</strong> {familyFriendly.themePark.type}</p>}
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

      {/* Beach section removed - already covered in Stay Local with full details */}

      {/* Original withKids content from portContent.js */}
      {withKids?.toddlers && withKids.toddlers.length > 0 && (
        <>
          <SubSection title="Toddlers & Young Children">
            <ul className="simple-list">
              {withKids.toddlers.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.olderKids && withKids.olderKids.length > 0 && (
        <>
          <SubSection title="Older Kids & Teens">
            <ul className="simple-list">
              {withKids.olderKids.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.familyFood && withKids.familyFood.length > 0 && (
        <>
          <SubSection title="Family-Friendly Food">
            <ul className="simple-list">
              {withKids.familyFood.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.warnings && withKids.warnings.length > 0 && (
        <>
          <SubSection title="⚠️ Things to Note">
            <ul className="simple-list warning-list">
              {withKids.warnings.map((warning, idx) => (
                <li key={idx}>{warning}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.easyDay && (
        <div className="tip-box">
          <strong>💡 Easy Day Suggestion</strong>
          <p>{withKids.easyDay}</p>
        </div>
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

function FoodDrinkSection({ foodAndDrink }) {
  if (!foodAndDrink) return <p>No food & drink information available yet.</p>;

  return (
    <div className="section-food-drink">
      <div className="section-intro">
        <h2>Food & Drink</h2>
        <p>Local cuisine, restaurants, and dietary information</p>
      </div>

      <hr className="section-divider" />

      {/* Support 'localSpeciality' (string, G606 style) */}
      {foodAndDrink.localSpeciality && (
        <>
          <SubSection title="Local Speciality">
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
