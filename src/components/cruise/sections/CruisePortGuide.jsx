/**
 * Cruise Port Guide Component
 * 
 * GENERIC component that works with ANY cruise itinerary.
 * Renders port content using the SAME data as standalone port guides.
 * 
 * Content is pulled AUTOMATICALLY from:
 * - ports.js (familyFriendly structured data)
 * - portContent.js (detailed narrative content)
 * 
 * The dayData.portSlug links to the port guide - no separate content files needed.
 */

import { Clock, Info, MapPin, Sun, Loader2 } from 'lucide-react';
import PortGuideFeedback from '../../port/PortGuideFeedback';
import PortWeather from '../PortWeather';
import { usePortData } from '../../../hooks/usePortData';
import { usePortGuideImage } from '../../../hooks/useImageUrl';
import OptimizedImage from '../../OptimizedImage';
import { formatBoldText, formatParagraphsWithBold } from '../../../utils/textFormatting.jsx';
import './SectionContent.css';

/**
 * Main CruisePortGuide component
 * Renders a specific section based on sectionKey prop
 */
function CruisePortGuide({ sectionKey, dayData }) {
  // Use portSlug directly from itinerary (set in cruise config)
  const slug = dayData.portSlug;
  
  // Get content from Supabase (with static fallback)
  const { port: portData, detailedContent: portContent, isLoading } = usePortData(slug);
  const familyFriendly = portData?.familyFriendly;
  
  // Load images
  const { imageUrl: heroImage, isPlaceholder: heroIsPlaceholder } = usePortGuideImage(slug, 'hero', dayData.portName, dayData.country || '');
  const { imageUrl: beachImage } = usePortGuideImage(slug, 'beach', dayData.portName, dayData.country || '');
  const { imageUrl: attraction1, isPlaceholder: attr1Placeholder } = usePortGuideImage(slug, 'attraction-1', dayData.portName, dayData.country || '');
  const { imageUrl: attraction2, isPlaceholder: attr2Placeholder } = usePortGuideImage(slug, 'attraction-2', dayData.portName, dayData.country || '');
  const { imageUrl: attraction3, isPlaceholder: attr3Placeholder } = usePortGuideImage(slug, 'attraction-3', dayData.portName, dayData.country || '');
  const { imageUrl: attraction4, isPlaceholder: attr4Placeholder } = usePortGuideImage(slug, 'attraction-4', dayData.portName, dayData.country || '');
  const { imageUrl: attraction5, isPlaceholder: attr5Placeholder } = usePortGuideImage(slug, 'attraction-5', dayData.portName, dayData.country || '');
  const { imageUrl: attraction6, isPlaceholder: attr6Placeholder } = usePortGuideImage(slug, 'attraction-6', dayData.portName, dayData.country || '');
  
  // Load family-friendly images (McDonald's, Ale Hop, Park)
  const { imageUrl: mcdonaldsImage } = usePortGuideImage(slug, 'mcdonalds', dayData.portName, dayData.country || '');
  const { imageUrl: aleHopImage } = usePortGuideImage(slug, 'ale-hop', dayData.portName, dayData.country || '');
  const { imageUrl: parkImage } = usePortGuideImage(slug, 'local-park', dayData.portName, dayData.country || '');
  
  const attractionImages = [
    { url: attraction1, isPlaceholder: attr1Placeholder },
    { url: attraction2, isPlaceholder: attr2Placeholder },
    { url: attraction3, isPlaceholder: attr3Placeholder },
    { url: attraction4, isPlaceholder: attr4Placeholder },
    { url: attraction5, isPlaceholder: attr5Placeholder },
    { url: attraction6, isPlaceholder: attr6Placeholder }
  ];
  
  const renderSection = () => {
    switch (sectionKey) {
      case 'overview':
        return <OverviewSection portName={dayData.portName} slug={slug} overview={portContent?.overview} heroImage={heroImage} heroIsPlaceholder={heroIsPlaceholder} />;
      case 'weather':
        return <WeatherSection dayData={dayData} />;
      case 'stayLocal':
        return <StayLocalSection stayLocal={portContent?.stayLocal} beachImage={beachImage} />;
      case 'goFurther':
        return <GoFurtherSection goFurther={portContent?.goFurther} attractionImages={attractionImages} portName={dayData.portName} />;
      case 'withKids':
        return <WithKidsSection withKids={portContent?.withKids} familyFriendly={familyFriendly} mcdonaldsImage={mcdonaldsImage} aleHopImage={aleHopImage} parkImage={parkImage} />;
      case 'send':
        return <SendSection send={portContent?.send} />;
      case 'medical':
        return <MedicalSection medical={portContent?.medical} />;
      case 'foodAndDrink':
        return <FoodDrinkSection foodAndDrink={portContent?.foodAndDrink} />;
      default:
        return null;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="section-content cruise-port-guide" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
      </div>
    );
  }

  return (
    <div className="section-content cruise-port-guide">
      {renderSection()}
      {/* Only show feedback on overview section to avoid duplicates */}
      {sectionKey === 'overview' && slug && (
        <PortGuideFeedback portSlug={slug} portName={dayData.portName} />
      )}
    </div>
  );
}

/* ========================================
   SHARED SUBSECTION COMPONENT
   ======================================== */

function SubSection({ title, children }) {
  return (
    <div className="sub-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/* ========================================
   WEATHER SECTION (Cruise-specific)
   ======================================== */

function WeatherSection({ dayData }) {
  if (!dayData.coords) {
    return (
      <div className="section-weather">
        <div className="section-intro">
          <h2><Sun size={24} /> Weather</h2>
          <p>Weather information is not available for this location.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="section-weather">
      <div className="section-intro">
        <h2><Sun size={24} /> Weather Forecast</h2>
        <p>Weather forecast for {dayData.portName} on your port day. Live forecasts become available about 8 days before arrival.</p>
      </div>

      <hr className="section-divider" />

      <div className="weather-live-section">
        <PortWeather 
          portName={dayData.portName}
          lat={dayData.coords.lat}
          lon={dayData.coords.lon}
          portDate={dayData.date}
          compact={false}
          showHourly={true}
          showDaily={true}
          hourlyCount={12}
        />
      </div>

      <hr className="section-divider" />

      <div className="info-note">
        <p>Weather forecasts are available up to 8 days in advance and update hourly. Check back closer to your cruise.</p>
      </div>
    </div>
  );
}

/* ========================================
   OVERVIEW SECTION
   ======================================== */

function OverviewSection({ portName, _slug, overview, _heroImage, _heroIsPlaceholder }) {
  if (!overview) {
    return (
      <div className="section-overview">
        <div className="section-intro">
          <h2>Welcome to {portName}</h2>
          <p>Port guide content coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-overview">
      <div className="section-intro">
        <h2>Welcome to {portName}</h2>
      </div>
      
      {/* Hook - Why this port is special */}
      {overview.hook && (
        <div className="port-hook">
          <span className="hook-icon">⭐</span>
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
      
      {/* Important Notes */}
      {overview.importantNotes && overview.importantNotes.length > 0 && (
        <div className="important-notes-box">
          <h4>⚠️ Good to Know</h4>
          <ul>
            {overview.importantNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      
      <hr className="section-divider" />
      
      {overview.portInfo && (
        <>
          <SubSection title="Port Information">
            <div className="port-info-tiles">
              {overview.portInfo.dockLocation && (
                <div className="info-tile">
                  <div className="info-tile-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="info-tile-content">
                    <strong>Dock Location</strong>
                    <p>{overview.portInfo.dockLocation}</p>
                  </div>
                </div>
              )}
              {overview.portInfo.distanceToTown && (
                <div className="info-tile">
                  <div className="info-tile-icon">
                    <Clock size={24} />
                  </div>
                  <div className="info-tile-content">
                    <strong>Distance to Town</strong>
                    <p>{overview.portInfo.distanceToTown}</p>
                  </div>
                </div>
              )}
              {overview.portInfo.shuttleInfo && (
                <div className="info-tile">
                  <div className="info-tile-icon">
                    <Info size={24} />
                  </div>
                  <div className="info-tile-content">
                    <strong>Shuttle Info</strong>
                    <p>{overview.portInfo.shuttleInfo}</p>
                  </div>
                </div>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {overview.weatherSeasonal && (
        <SubSection title="Typical Weather">
          <p>{overview.weatherSeasonal}</p>
        </SubSection>
      )}
    </div>
  );
}

/* ========================================
   STAY LOCAL SECTION
   ======================================== */

function StayLocalSection({ stayLocal, beachImage }) {
  if (!stayLocal) {
    return (
      <div className="section-stay-local">
        <div className="section-intro">
          <h2>Stay Local</h2>
          <p>Local area information coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-stay-local">
      <div className="section-intro">
        <h2>Stay Local</h2>
        <p>Everything within walking distance from the ship</p>
      </div>

      <hr className="section-divider" />

      {/* Convenience Stores & Essentials - APPEARS FIRST */}
      {stayLocal.convenienceStores && stayLocal.convenienceStores.length > 0 && (
        <>
          <SubSection title="🛒 Near Port: Essentials">
            <div className="tip-highlight" style={{ marginBottom: '1rem' }}>
              <p><strong>Quick supplies right off the ship:</strong> Water, snacks, sunscreen, and basic necessities before you start exploring.</p>
            </div>
            {stayLocal.convenienceStores.map((store, idx) => (
              <div key={idx} className="convenience-store-item">
                <h4>{store.name}</h4>
                <div className="store-details">
                  <p className="store-location"><MapPin size={16} /> <strong>Location:</strong> {store.location}</p>
                  <p className="store-type"><strong>Type:</strong> {store.type}</p>
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
                  {item.terrain && (
                    <span className={`terrain-badge terrain-${item.terrain}`}>
                      {item.terrain === 'easy' ? '🟢 Flat & Easy' : 
                       item.terrain === 'moderate' ? '🟡 Some Hills' : 
                       '🔴 Challenging'}
                    </span>
                  )}
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
                  {item.terrain && (
                    <span className={`terrain-badge terrain-${item.terrain}`}>
                      {item.terrain === 'easy' ? '🟢 Flat & Easy' : 
                       item.terrain === 'moderate' ? '🟡 Some Hills' : 
                       '🔴 Challenging'}
                    </span>
                  )}
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
                  {park.terrain && (
                    <span className={`terrain-badge terrain-${park.terrain}`}>
                      {park.terrain === 'easy' ? '🟢 Flat & Easy' : 
                       park.terrain === 'moderate' ? '🟡 Some Hills' : 
                       '🔴 Challenging'}
                    </span>
                  )}
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
        <div className="tip-block">
          <strong>💡 Our Tip</strong>
          <p>{stayLocal.tip}</p>
        </div>
      )}
    </div>
  );
}

/* ========================================
   GO FURTHER SECTION
   ======================================== */

function GoFurtherSection({ goFurther, attractionImages, portName }) {
  if (!goFurther || !goFurther.attractions || goFurther.attractions.length === 0) {
    return (
      <div className="section-go-further">
        <div className="section-intro">
          <h2>Go Further</h2>
          <p>Day trip information coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-go-further">
      <div className="section-intro">
        <h2>Go Further</h2>
        <p>Longer walks - may require transport or organised tour</p>
      </div>

      <hr className="section-divider" />

      {goFurther.attractions.map((attraction, idx) => {
        const imgData = attractionImages[idx];
        const showImage = imgData?.url && !imgData?.isPlaceholder;
        
        return (
        <div key={idx} className="attraction-block">
          <div className="attraction-header">
            <h3>{attraction.name}</h3>
            {/* Terrain and Accessibility Badges */}
            <div className="attraction-badges">
              {attraction.terrain && (
                <span className={`terrain-badge terrain-${attraction.terrain}`}>
                  {attraction.terrain === 'easy' ? '🟢 Easy' : 
                   attraction.terrain === 'moderate' ? '🟡 Some Hills' : 
                   '🔴 Challenging'}
                </span>
              )}
              {attraction.accessibility && (
                <span className={`accessibility-badge access-${attraction.accessibility.rating}`} title={attraction.accessibility.notes || ''}>
                  {attraction.accessibility.rating === 'full' ? '♿ Fully Accessible' :
                   attraction.accessibility.rating === 'partial' ? '⚠️ Partially Accessible' :
                   attraction.accessibility.rating === 'limited' ? '⚠️ Limited Access' :
                   '🚫 Not Accessible'}
                </span>
              )}
            </div>
          </div>
          
          {showImage && (
            <div className="attraction-image">
              <OptimizedImage
                src={imgData.url}
                alt={`${attraction.name} - ${portName}`}
                className="attraction-img"
                srcsetWidths={[640, 1024, 1200]}
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
        );
      })}

      {goFurther.ourTake && (
        <div className="tip-block">
          <strong>Overall Recommendation</strong>
          {formatParagraphsWithBold(goFurther.ourTake)}
        </div>
      )}
    </div>
  );
}

/* ========================================
   WITH KIDS SECTION
   Now includes familyFriendly data from ports.js (same as port guides)
   ======================================== */

function WithKidsSection({ withKids, familyFriendly, mcdonaldsImage, aleHopImage, parkImage }) {
  // Show section if either withKids OR familyFriendly has content
  if (!withKids && !familyFriendly) {
    return (
      <div className="section-with-kids">
        <div className="section-intro">
          <h2>With Kids</h2>
          <p>Family information coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-with-kids">
      <div className="section-intro">
        <h2>With Kids</h2>
        <p>Family-friendly options and advice</p>
      </div>

      <hr className="section-divider" />

      {/* Familiar Brands - McDonald's and Ale Hop from familyFriendly (ports.js) */}
      {familyFriendly && (familyFriendly.mcdonalds || familyFriendly.aleHop) && (
        <>
          <SubSection title="🍔 Familiar Brands">
            <div className="tip-highlight">
              <p><strong>Easy wins:</strong> Familiar brands close to port for snacks, toilets, and quick stops.</p>
            </div>
            <div className="family-cards-grid">
              {familyFriendly.mcdonalds && (
                <div className="family-card">
                  {mcdonaldsImage && (
                    <div className="family-card-image">
                      <OptimizedImage src={mcdonaldsImage} alt="McDonald's location" />
                    </div>
                  )}
                  <div className="family-card-content">
                    <h4>{familyFriendly.mcdonalds.name}</h4>
                    <p><strong>Location:</strong> {familyFriendly.mcdonalds.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{familyFriendly.mcdonalds.walkingTime}</span>
                    </p>
                    {familyFriendly.mcdonalds.notes && <p className="family-notes">{familyFriendly.mcdonalds.notes}</p>}
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
                  {aleHopImage && (
                    <div className="family-card-image">
                      <OptimizedImage src={aleHopImage} alt="ALE-HOP store" />
                    </div>
                  )}
                  <div className="family-card-content">
                    <h4>{familyFriendly.aleHop.name}</h4>
                    <p><strong>Location:</strong> {familyFriendly.aleHop.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>Distance:</strong> 
                      <span className="distance-badge">{familyFriendly.aleHop.walkingTime}</span>
                    </p>
                    {familyFriendly.aleHop.notes && <p className="family-notes">{familyFriendly.aleHop.notes}</p>}
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

      {/* Local Park from familyFriendly */}
      {familyFriendly?.localPark && (
        <>
          <SubSection title="🌳 Local Park">
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

      {/* Theme Park / Attraction from familyFriendly */}
      {familyFriendly?.themePark && (
        <>
          <SubSection title="🎢 Theme Park / Attraction">
            <div className="attraction-info">
              <h4>{familyFriendly.themePark.name}</h4>
              <p><strong>Location:</strong> {familyFriendly.themePark.location}</p>
              <p><strong>Distance:</strong> {familyFriendly.themePark.distance}</p>
              {familyFriendly.themePark.highlights && <p><strong>Highlights:</strong> {familyFriendly.themePark.highlights}</p>}
              {familyFriendly.themePark.suitableFor && <p><strong>Suitable for:</strong> {familyFriendly.themePark.suitableFor}</p>}
              {familyFriendly.themePark.hours && <p><strong>Hours:</strong> {familyFriendly.themePark.hours}</p>}
              {familyFriendly.themePark.notes && <p>{familyFriendly.themePark.notes}</p>}
              {familyFriendly.themePark.mapsLink && (
                <a href={familyFriendly.themePark.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                  Open in Maps →
                </a>
              )}
            </div>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {/* Water Park from familyFriendly */}
      {familyFriendly?.waterPark && (
        <>
          <SubSection title="💦 Water Park">
            <div className="attraction-info">
              <h4>{familyFriendly.waterPark.name}</h4>
              <p><strong>Location:</strong> {familyFriendly.waterPark.location}</p>
              {familyFriendly.waterPark.highlights && <p><strong>Highlights:</strong> {familyFriendly.waterPark.highlights}</p>}
              {familyFriendly.waterPark.notes && <p>{familyFriendly.waterPark.notes}</p>}
              {familyFriendly.waterPark.mapsLink && (
                <a href={familyFriendly.waterPark.mapsLink} target="_blank" rel="noopener noreferrer" className="map-link-subtle">
                  Open in Maps →
                </a>
              )}
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
          <SubSection title="Older Kids (6-12)">
            <ul className="simple-list">
              {withKids.olderKids.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {withKids?.teens && withKids.teens.length > 0 && (
        <>
          <SubSection title="Teens (13+)">
            <ul className="simple-list">
              {withKids.teens.map((item, idx) => (
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
        <div className="tip-block">
          <strong>💡 Easy Day Suggestion</strong>
          <p>{withKids.easyDay}</p>
        </div>
      )}
    </div>
  );
}

/* ========================================
   SEND (ACCESSIBILITY) SECTION
   ======================================== */

function SendSection({ send }) {
  if (!send) {
    return (
      <div className="section-send">
        <div className="section-intro">
          <h2>Accessibility (SEND)</h2>
          <p>Accessibility information coming soon.</p>
        </div>
      </div>
    );
  }

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
        <SubSection title="Quiet Spots & Support">
          <ul className="simple-list">
            {send.supportServices.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </SubSection>
      )}
    </div>
  );
}

/* ========================================
   MEDICAL & PHARMACY SECTION
   ======================================== */

function MedicalSection({ medical }) {
  // Check if there's any actual content
  const hasPharmacy = medical?.pharmacy?.name;
  const hasHospital = medical?.hospital?.name;
  const hasTips = medical?.tips?.length > 0;
  
  if (!medical || (!hasPharmacy && !hasHospital && !hasTips)) {
    return (
      <div className="section-medical">
        <div className="section-intro">
          <h2>Medical & Pharmacy</h2>
          <p>Medical information coming soon.</p>
        </div>
      </div>
    );
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

/* ========================================
   FOOD & DRINK SECTION
   ======================================== */

function FoodDrinkSection({ foodAndDrink }) {
  if (!foodAndDrink) {
    return (
      <div className="section-food-drink">
        <div className="section-intro">
          <h2>Food & Drink</h2>
          <p>Food and drink information coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-food-drink">
      <div className="section-intro">
        <h2>Food & Drink</h2>
        <p>Local cuisine, restaurants, and dietary information</p>
      </div>

      <hr className="section-divider" />

      {/* Featured Local Dish */}
      {foodAndDrink.localDishToTry && (
        <>
          <div className="local-dish-card">
            <div className="local-dish-header">
              <span className="dish-icon">🍽️</span>
              <h4>Must Try: {foodAndDrink.localDishToTry.name}</h4>
            </div>
            <div className="local-dish-content">
              <p>{foodAndDrink.localDishToTry.description}</p>
              {foodAndDrink.localDishToTry.lookFor && (
                <p className="look-for"><em>Where to find it: {foodAndDrink.localDishToTry.lookFor}</em></p>
              )}
            </div>
          </div>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.localSpeciality && (
        <>
          <SubSection title="Local Speciality">
            {formatParagraphsWithBold(foodAndDrink.localSpeciality)}
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

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
          <div className="tip-block">
            <strong>💡 Dietary Notes</strong>
            <p>{foodAndDrink.dietaryNotes}</p>
          </div>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.drinkingWater && (
        <div className="info-block">
          <h3>💧 Drinking Water</h3>
          <p>{foodAndDrink.drinkingWater}</p>
        </div>
      )}
    </div>
  );
}

export default CruisePortGuide;
