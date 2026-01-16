/**
 * Cruise Port Guide Component
 * 
 * Renders port content for the cruise companion (G606 etc)
 * Uses the same content structure as DetailedPortGuide from port guide pages
 * Adds cruise-specific features: Weather section, FeedbackSection
 * 
 * This is the SINGLE source of truth for port content in cruise companions.
 * Content comes from portContent.js via g606-port-content.js
 */

import { Clock, DollarSign, Info, MapPin, Sun } from 'lucide-react';
import FeedbackSection from '../FeedbackSection';
import PortWeather from '../PortWeather';
import { getG606PortContent } from '../../../data/cruise/g606-port-content';
import { usePortGuideImage } from '../../../hooks/useImageUrl';
import { getPortGuideSlugFromG606PortName } from '../../../utils/portNameMapping';
import OptimizedImage from '../../OptimizedImage';
import './SectionContent.css';

/**
 * Main CruisePortGuide component
 * Renders a specific section based on sectionKey prop
 */
function CruisePortGuide({ sectionKey, dayData }) {
  // Convert port name to slug for both content and image lookups
  const slug = getPortGuideSlugFromG606PortName(dayData.portName);
  const portContent = getG606PortContent(slug);
  
  // Load images
  const { imageUrl: heroImage, isPlaceholder: heroIsPlaceholder } = usePortGuideImage(slug, 'hero', dayData.portName, dayData.country || '');
  const { imageUrl: beachImage } = usePortGuideImage(slug, 'beach', dayData.portName, dayData.country || '');
  const { imageUrl: attraction1, isPlaceholder: attr1Placeholder } = usePortGuideImage(slug, 'attraction-1', dayData.portName, dayData.country || '');
  const { imageUrl: attraction2, isPlaceholder: attr2Placeholder } = usePortGuideImage(slug, 'attraction-2', dayData.portName, dayData.country || '');
  const { imageUrl: attraction3, isPlaceholder: attr3Placeholder } = usePortGuideImage(slug, 'attraction-3', dayData.portName, dayData.country || '');
  const { imageUrl: attraction4, isPlaceholder: attr4Placeholder } = usePortGuideImage(slug, 'attraction-4', dayData.portName, dayData.country || '');
  const { imageUrl: attraction5, isPlaceholder: attr5Placeholder } = usePortGuideImage(slug, 'attraction-5', dayData.portName, dayData.country || '');
  const { imageUrl: attraction6, isPlaceholder: attr6Placeholder } = usePortGuideImage(slug, 'attraction-6', dayData.portName, dayData.country || '');
  
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
        return <OverviewSection portName={dayData.portName} overview={portContent?.overview} heroImage={heroImage} heroIsPlaceholder={heroIsPlaceholder} />;
      case 'weather':
        return <WeatherSection dayData={dayData} />;
      case 'stayLocal':
        return <StayLocalSection stayLocal={portContent?.stayLocal} beachImage={beachImage} />;
      case 'goFurther':
        return <GoFurtherSection goFurther={portContent?.goFurther} attractionImages={attractionImages} portName={dayData.portName} />;
      case 'withKids':
        return <WithKidsSection withKids={portContent?.withKids} />;
      case 'send':
        return <SendSection send={portContent?.send} />;
      case 'foodAndDrink':
        return <FoodDrinkSection foodAndDrink={portContent?.foodAndDrink} />;
      default:
        return null;
    }
  };

  return (
    <div className="section-content cruise-port-guide">
      {renderSection()}
      <FeedbackSection sectionKey={sectionKey} dayNumber={dayData.dayNumber} portName={dayData.portName} />
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

function OverviewSection({ portName, overview, heroImage, heroIsPlaceholder }) {
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
      {/* Hero image */}
      {heroImage && !heroIsPlaceholder && (
        <div className="port-hero-image">
          <OptimizedImage
            src={heroImage}
            alt={`${portName} cruise port`}
            className="port-hero-img"
          />
        </div>
      )}

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
        <p>These need transport - tour, taxi, or public transport</p>
      </div>

      <hr className="section-divider" />

      {goFurther.attractions.map((attraction, idx) => {
        const imgData = attractionImages[idx];
        const showImage = imgData?.url && !imgData?.isPlaceholder;
        
        return (
        <div key={idx} className="attraction-block">
          <h3>{attraction.name}</h3>
          
          {showImage && (
            <div className="attraction-image">
              <OptimizedImage
                src={imgData.url}
                alt={`${attraction.name} - ${portName}`}
                className="attraction-img"
              />
            </div>
          )}
          
          <p className="attraction-description">{attraction.description}</p>
          
          <div className="attraction-details">
            {attraction.cruiseLineOption && (
              <div className="detail-item">
                <strong>Cruise Line Tours:</strong>
                <p>{attraction.cruiseLineOption}</p>
              </div>
            )}
            {attraction.independent && (
              <div className="detail-item">
                <strong>Going Independent:</strong>
                <p>{attraction.independent}</p>
              </div>
            )}
            {attraction.allow && (
              <div className="detail-item">
                <Clock size={16} />
                <strong>Allow:</strong>
                <p>{attraction.allow}</p>
              </div>
            )}
            {attraction.cost && (
              <div className="detail-item">
                <DollarSign size={16} />
                <strong>Cost:</strong>
                <p>{attraction.cost}</p>
              </div>
            )}
            {attraction.notes && (
              <div className="detail-item notes">
                <p><em>{attraction.notes}</em></p>
              </div>
            )}
          </div>
          
          {attraction.ourTake && (
            <div className="our-take">
              <strong>Our Take:</strong>
              <p>{attraction.ourTake}</p>
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
          <strong>💡 Overall Recommendation</strong>
          <p>{goFurther.ourTake}</p>
        </div>
      )}
    </div>
  );
}

/* ========================================
   WITH KIDS SECTION
   ======================================== */

function WithKidsSection({ withKids }) {
  if (!withKids) {
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

      {withKids.toddlers && withKids.toddlers.length > 0 && (
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

      {withKids.olderKids && withKids.olderKids.length > 0 && (
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

      {withKids.familyFood && withKids.familyFood.length > 0 && (
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

      {withKids.warnings && withKids.warnings.length > 0 && (
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

      {withKids.easyDay && (
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

      {foodAndDrink.localSpeciality && (
        <>
          <SubSection title="Local Speciality">
            <p>{foodAndDrink.localSpeciality}</p>
          </SubSection>
          <hr className="section-divider" />
        </>
      )}

      {foodAndDrink.localSpecialties && foodAndDrink.localSpecialties.length > 0 && (
        <>
          <SubSection title="Local Specialties">
            {foodAndDrink.localSpecialties.map((specialty, idx) => (
              <div key={idx} className="specialty-item">
                <strong>{specialty.name}</strong>
                <p>{specialty.description}</p>
                {specialty.where && <p className="where"><em>Where: {specialty.where}</em></p>}
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
              <div key={idx} className="specialty-item">
                <strong>{restaurant.name}</strong>
                {restaurant.location && <span style={{ fontWeight: 'normal', fontSize: '0.875rem', opacity: 0.8 }}>, {restaurant.location}</span>}
                <p>{restaurant.description}</p>
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
              <div key={idx} className="specialty-item">
                <strong>{cafe.name}</strong>
                {cafe.location && <span style={{ fontWeight: 'normal', fontSize: '0.875rem', opacity: 0.8 }}>, {cafe.location}</span>}
                {cafe.description && <p>{cafe.description}</p>}
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
              <div key={idx} className="specialty-item">
                <strong>{bar.name}</strong>
                {bar.location && <span style={{ fontWeight: 'normal', fontSize: '0.875rem', opacity: 0.8 }}>, {bar.location}</span>}
                {bar.description && <p>{bar.description}</p>}
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
