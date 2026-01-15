import FeedbackSection from '../FeedbackSection';
import PortWeather from '../PortWeather';
import { getPortContent } from '../../../data/cruise/g606-port-content';
import './SectionContent.css';

// FB Group URL - placeholder
const FB_GROUP_URL = '#'; // Replace with actual URL

function SubSection({ title, content, mapLink }) {
  return (
    <>
      <div className="sub-section">
        <h3>{title}</h3>
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          <div>{content}</div>
        )}
        {mapLink && (
          <p>
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
              📍 Open route in Google Maps →
            </a>
          </p>
        )}
      </div>
      <hr className="section-divider" />
    </>
  );
}

function PortDayContent({ sectionKey, dayData }) {
  const portContent = getPortContent(dayData.portName);
  const renderSection = () => {
    switch (sectionKey) {
      case 'overview':
        return <OverviewSection dayData={dayData} portContent={portContent} />;
      case 'weather':
        return <WeatherSection dayData={dayData} portContent={portContent} />;
      case 'stayLocal':
        return <StayLocalSection dayData={dayData} portContent={portContent} />;
      case 'goFurther':
        return <GoFurtherSection dayData={dayData} portContent={portContent} />;
      case 'withKids':
        return <WithKidsSection dayData={dayData} portContent={portContent} />;
      case 'send':
        return <SendSection dayData={dayData} portContent={portContent} />;
      case 'foodAndDrink':
        return <FoodDrinkSection dayData={dayData} portContent={portContent} />;
      default:
        return null;
    }
  };

  return (
    <div className="section-content">
      {renderSection()}
      <FeedbackSection sectionKey={sectionKey} dayNumber={dayData.dayNumber} />
    </div>
  );
}

function WeatherSection({ dayData, portContent }) {
  const overview = portContent?.overview;
  
  // If no coordinates, show placeholder
  if (!dayData.coords) {
    return (
      <div className="section-weather">
        <div className="section-intro">
          <p>Weather information is not available for this location.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="section-weather">
      <div className="section-intro">
        <p>Weather forecast for {dayData.portName} on your port day. Live forecasts become available about 8 days before arrival.</p>
      </div>

      <hr className="section-divider" />

      {/* Enhanced Weather Display with Hourly & Daily Forecasts */}
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

      {/* Seasonal Info */}
      <div className="sub-section">
        <h3>📅 March Weather (Typical)</h3>
        <p>
          {overview?.weatherSeasonal 
            ? overview.weatherSeasonal 
            : `Weather information for ${dayData.portName} in March will be available closer to the cruise date.`
          }
        </p>
      </div>

      <hr className="section-divider" />

      {/* What to Pack */}
      <div className="sub-section">
        <h3>🎒 What to Pack</h3>
        <ul className="info-list">
          <li>Layers - mornings and evenings can be cooler</li>
          <li>Comfortable walking shoes</li>
          <li>Sunscreen and sunglasses (UV can be strong even in March)</li>
          <li>Light waterproof jacket (just in case)</li>
          <li>Hat for sun protection</li>
        </ul>
      </div>

      <div className="info-note">
        <p>ℹ️ Weather forecasts are available up to 8 days in advance and update hourly. Check back closer to your cruise!</p>
      </div>
    </div>
  );
}

function OverviewSection({ dayData, portContent }) {
  const overview = portContent?.overview;
  
  return (
    <div className="section-overview">
      {/* Hero image placeholder */}
      <div className="image-placeholder">
        <span className="image-placeholder-icon">📸</span>
        <span className="image-placeholder-text">Port hero image coming soon</span>
      </div>

      <div className="section-intro">
        {overview?.description ? (
          overview.description.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))
        ) : (
          <>
            <p><strong>[TBC]</strong> Port description - 2-3 paragraphs about the place will appear here.</p>
            <p>[Placeholder content for port overview]</p>
          </>
        )}
      </div>

      <hr className="section-divider" />

      {/* Quick Info Grid */}
      <div className="quick-info-grid">
        <div className="quick-info-item">
          <span className="quick-info-icon">🌡️</span>
          <div className="quick-info-content">
            <div className="quick-info-label">Weather (March)</div>
            <div className="quick-info-value">
              {overview?.weatherSeasonal ? overview.weatherSeasonal : '[TBC]'}
            </div>
          </div>
        </div>

        <div className="quick-info-item">
          <span className="quick-info-icon">🚢</span>
          <div className="quick-info-content">
            <div className="quick-info-label">Dock Location</div>
            <div className="quick-info-value">
              {overview?.portInfo?.dockLocation || '[TBC]'}
            </div>
          </div>
        </div>

        <div className="quick-info-item">
          <span className="quick-info-icon">🚶</span>
          <div className="quick-info-content">
            <div className="quick-info-label">Distance to Town</div>
            <div className="quick-info-value">
              {overview?.portInfo?.distanceToTown || '[TBC]'}
            </div>
          </div>
        </div>

        <div className="quick-info-item">
          <span className="quick-info-icon">🚌</span>
          <div className="quick-info-content">
            <div className="quick-info-label">Shuttle</div>
            <div className="quick-info-value">
              {overview?.portInfo?.shuttleInfo || 'Check onboard'}
            </div>
          </div>
        </div>

        <div className="quick-info-item">
          <span className="quick-info-icon">⏰</span>
          <div className="quick-info-content">
            <div className="quick-info-label">Arrive / Depart</div>
            <div className="quick-info-value">
              {overview?.arriveTime || dayData?.arriveTime || '[TBC]'} → {overview?.departTime || dayData?.departTime || '[TBC]'}
            </div>
          </div>
        </div>

        <div className="quick-info-item">
          <span className="quick-info-icon">⚓</span>
          <div className="quick-info-content">
            <div className="quick-info-label">All Aboard</div>
            <div className="quick-info-value">30 mins before departure</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StayLocalSection({ dayData: _dayData, portContent }) {
  const stayLocal = portContent?.stayLocal;
  
  return (
    <div className="section-stay-local">
      <div className="section-intro">
        <p>Everything here is walking distance from the ship.</p>
      </div>

      <div className="fb-group-link">
        <p>
          <a href={FB_GROUP_URL} target="_blank" rel="noopener noreferrer">
            Join our G606 Facebook group
          </a>{' '}
          to share tips with fellow cruisers!
        </p>
      </div>

      <hr className="section-divider" />

      {/* Quick Walk */}
      {stayLocal?.quickWalk ? (
        <>
          <div className="sub-section">
            <h3>🚶 QUICK WALK (15 mins or less)</h3>
            {stayLocal.quickWalk.map((item, idx) => (
              <div key={idx} className="content-card">
                <div className="content-card-title">{item.title}</div>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🚶 QUICK WALK (15 mins or less)" content="[TBC] Quick walk content" />
      )}

      {/* Longer Walk */}
      {stayLocal?.longerWalk ? (
        <>
          <div className="sub-section">
            <h3>🚶‍♂️ LONGER WALK (30-45 mins)</h3>
            {stayLocal.longerWalk.map((item, idx) => (
              <div key={idx} className="content-card">
                <div className="content-card-title">{item.title}</div>
                <p>{item.content}</p>
                {item.mapLink && (
                  <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                    📍 Open in Google Maps
                  </a>
                )}
              </div>
            ))}
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🚶‍♂️ LONGER WALK (30-45 mins)" content="[TBC] Longer walk content with suggested route" />
      )}

      {/* Parks */}
      {stayLocal?.parks ? (
        <>
          <div className="sub-section">
            <h3>🌳 PARKS & GARDENS</h3>
            {stayLocal.parks.map((item, idx) => (
              <div key={idx} className="content-card">
                <div className="content-card-title">{item.title}</div>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🌳 PARKS & GARDENS" content="[TBC] Parks and gardens content" />
      )}

      {/* Beach */}
      {stayLocal?.beach ? (
        <>
          <div className="sub-section">
            <h3>🏖️ BEACH</h3>
            <div className="content-card">
              <div className="content-card-title">{stayLocal.beach.title}</div>
              <p>{stayLocal.beach.content}</p>
              {stayLocal.beach.additional && stayLocal.beach.additional.map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
              {stayLocal.beach.mapLink && (
                <a href={stayLocal.beach.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                  📍 Open beach route in Google Maps
                </a>
              )}
            </div>
            <div className="image-placeholder">
              <span className="image-placeholder-icon">🏖️</span>
              <span className="image-placeholder-text">Beach image coming soon</span>
            </div>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🏖️ BEACH" content="[TBC] Beach content or 'No beach within walking distance'" />
      )}

      {/* Scenic */}
      {stayLocal?.scenic ? (
        <>
          <div className="sub-section">
            <h3>📸 SCENIC / PHOTO SPOTS</h3>
            <ul className="info-list">
              {stayLocal.scenic.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="📸 SCENIC / PHOTO SPOTS" content="[TBC] Scenic and photo spots content" />
      )}

      {/* Shopping */}
      {stayLocal?.shopping ? (
        <>
          <div className="sub-section">
            <h3>🛍️ SHOPPING</h3>
            <ul className="info-list">
              {stayLocal.shopping.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🛍️ SHOPPING" content="[TBC] Shopping content" />
      )}

      {/* Coffee */}
      {stayLocal?.coffee ? (
        <>
          <div className="sub-section">
            <h3>☕ QUICK COFFEE</h3>
            <ul className="info-list">
              {stayLocal.coffee.map((item, idx) => (
                <li key={idx}>{typeof item === 'string' ? item : `${item.name || ''}${item.location ? ` (${item.location})` : ''}${item.description ? ` – ${item.description}` : ''}`}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="☕ QUICK COFFEE" content="[TBC] Quick coffee content" />
      )}

      {/* Bars */}
      {stayLocal?.bars ? (
        <>
          <div className="sub-section">
            <h3>🍺 BAR / PUB</h3>
            <ul className="info-list">
              {stayLocal.bars.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🍺 BAR / PUB" content="[TBC] Bar/pub content" />
      )}

      {/* Rainy Day */}
      {stayLocal?.rainyDay ? (
        <>
          <div className="sub-section">
            <h3>🌧️ IF IT RAINS</h3>
            <ul className="info-list">
              {stayLocal.rainyDay.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🌧️ IF IT RAINS" content="[TBC] Rainy day alternatives" />
      )}

      {/* Tip */}
      <div className="tip-block">
        <h3>💡 OUR TIP</h3>
        <p>{stayLocal?.tip ? (
          stayLocal.tip.split('\n\n').map((para, idx) => (
            <span key={idx}>
              {para}
              {idx < stayLocal.tip.split('\n\n').length - 1 && <><br /><br /></>}
            </span>
          ))
        ) : (
          <><strong>[TBC]</strong> Personal recommendation will appear here.</>
        )}</p>
      </div>
    </div>
  );
}

function GoFurtherSection({ dayData: _dayData, portContent }) {
  const goFurther = portContent?.goFurther;
  
  return (
    <div className="section-go-further">
      <div className="section-intro">
        <p>These need transport - tour, taxi, or public transport.</p>
      </div>

      <hr className="section-divider" />

      {goFurther?.attractions && goFurther.attractions.length > 0 ? (
        goFurther.attractions.map((attraction, idx) => (
          <div key={idx} className="attraction-block">
            <h3>⭐ {attraction.name}</h3>
            
            {/* Image placeholder for attraction */}
            <div className="image-placeholder">
              <span className="image-placeholder-icon">🏞️</span>
              <span className="image-placeholder-text">{attraction.name} image coming soon</span>
            </div>
            
            <p>{attraction.description}</p>
            
            <ul className="info-list">
              {attraction.poOption && <li><strong>P&O option:</strong> {attraction.poOption}</li>}
              {attraction.independent && <li><strong>Independent:</strong> {attraction.independent}</li>}
              {attraction.allow && <li><strong>Allow:</strong> {attraction.allow}</li>}
              {attraction.cost && <li><strong>Cost:</strong> {attraction.cost}</li>}
              {attraction.notes && <li>{attraction.notes}</li>}
            </ul>
            
            {attraction.ourTake && (
              <div className="attraction-take">
                <p><strong>Our take:</strong> {attraction.ourTake}</p>
              </div>
            )}
            
            {attraction.mapLink && (
              <a href={attraction.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                📍 Open in Google Maps
              </a>
            )}
          </div>
        ))
      ) : (
        <div className="attraction-block">
          <h3>⭐ [ATTRACTION NAME]</h3>
          <div className="image-placeholder">
            <span className="image-placeholder-icon">🏞️</span>
            <span className="image-placeholder-text">Attraction image coming soon</span>
          </div>
          <p><strong>[TBC]</strong> Description will appear here.</p>
          <ul className="info-list">
            <li><strong>P&O option:</strong> [TBC] Info about typical P&O excursion</li>
            <li><strong>Independent:</strong> [TBC] How to do it yourself</li>
            <li><strong>Allow:</strong> [TBC] Time needed</li>
            <li><strong>Cost:</strong> [TBC] Approximate or "Check current prices"</li>
          </ul>
        </div>
      )}

      {goFurther?.ourTake && (
        <div className="tip-block">
          <h3>💡 OUR TAKE</h3>
          {goFurther.ourTake.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      )}

      <div className="info-note">
        <p>ℹ️ For P&O excursions: Check the P&O app or Reception onboard for current options, prices, and availability.</p>
      </div>
    </div>
  );
}

function WithKidsSection({ dayData: _dayData, portContent }) {
  const withKids = portContent?.withKids;
  
  return (
    <div className="section-with-kids">
      {/* Toddlers */}
      {withKids?.toddlers ? (
        <>
          <div className="sub-section">
            <h3>👶 TODDLERS / YOUNG KIDS</h3>
            <ul className="info-list">
              {withKids.toddlers.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="👶 TODDLERS / YOUNG KIDS" content="[TBC] Content - playgrounds, easy activities" />
      )}

      {/* Older Kids */}
      {withKids?.olderKids ? (
        <>
          <div className="sub-section">
            <h3>🧒 OLDER KIDS / TEENS</h3>
            <ul className="info-list">
              {withKids.olderKids.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🧒 OLDER KIDS / TEENS" content="[TBC] Content - activities for older children" />
      )}

      {/* Family Food */}
      {withKids?.familyFood ? (
        <>
          <div className="sub-section">
            <h3>🍕 KID-FRIENDLY FOOD</h3>
            <ul className="info-list">
              {withKids.familyFood.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🍕 KID-FRIENDLY FOOD" content="[TBC] Kid-friendly food recommendations" />
      )}

      {/* Warnings */}
      {withKids?.warnings ? (
        <>
          <div className="sub-section">
            <h3>⚠️ WATCH OUT FOR</h3>
            <ul className="info-list">
              {withKids.warnings.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="⚠️ WATCH OUT FOR" content="[TBC] Warnings - cobblestones, hills, timing issues" />
      )}

      {/* Easy Day */}
      <div className="tip-block">
        <h3>💡 EASY FAMILY DAY</h3>
        <p>{withKids?.easyDay ? withKids.easyDay : <><strong>[TBC]</strong> Simple itinerary suggestion will appear here.</>}</p>
      </div>
    </div>
  );
}

function SendSection({ dayData: _dayData, portContent }) {
  const send = portContent?.send;
  
  return (
    <div className="section-send">
      {/* Mobility */}
      {send?.mobility ? (
        <>
          <div className="sub-section">
            <h3>♿ MOBILITY</h3>
            <ul className="info-list">
              {send.mobility.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="♿ MOBILITY" content="[TBC] Content - terrain, wheelchair access, distances" />
      )}

      {/* Quiet Spots */}
      {send?.quietSpots ? (
        <>
          <div className="sub-section">
            <h3>🔇 QUIET SPOTS</h3>
            <ul className="info-list">
              {send.quietSpots.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🔇 QUIET SPOTS" content="[TBC] Content - peaceful areas, escape from crowds" />
      )}

      {/* Sensory */}
      {send?.sensory ? (
        <>
          <div className="sub-section">
            <h3>🎧 SENSORY CONSIDERATIONS</h3>
            <ul className="info-list">
              {send.sensory.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🎧 SENSORY CONSIDERATIONS" content="[TBC] Content - busy times, overwhelming areas, alternatives" />
      )}

      <div className="info-note">
        <p>ℹ️ Accessibility information is based on research. Please contact venues directly to confirm current provisions for your specific needs.</p>
      </div>
    </div>
  );
}

function FoodDrinkSection({ dayData: _dayData, portContent }) {
  const foodDrink = portContent?.foodAndDrink;
  
  return (
    <div className="section-food-drink">
      {/* Food image placeholder */}
      <div className="image-placeholder">
        <span className="image-placeholder-icon">🍽️</span>
        <span className="image-placeholder-text">Local food image coming soon</span>
      </div>

      {/* Restaurants */}
      {foodDrink?.restaurants ? (
        <>
          <div className="sub-section">
            <h3>🍽️ RESTAURANTS</h3>
            {foodDrink.restaurants.map((restaurant, idx) => (
              <div key={idx} className="content-card">
                <div className="content-card-title">
                  {restaurant.name}
                  {restaurant.location && <span style={{ fontWeight: 'normal', fontSize: '0.875rem', opacity: 0.8 }}> — {restaurant.location}</span>}
                </div>
                <p>{restaurant.description}</p>
              </div>
            ))}
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🍽️ RESTAURANTS" content="[TBC] List with brief descriptions" />
      )}

      {/* Cafes */}
      {foodDrink?.cafes ? (
        <>
          <div className="sub-section">
            <h3>☕ CAFÉS</h3>
            {foodDrink.cafes.map((cafe, idx) => (
              <div key={idx} className="content-card">
                <div className="content-card-title">
                  {cafe.name}
                  {cafe.location && <span style={{ fontWeight: 'normal', fontSize: '0.875rem', opacity: 0.8 }}> — {cafe.location}</span>}
                </div>
                {cafe.description && <p>{cafe.description}</p>}
              </div>
            ))}
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="☕ CAFÉS" content="[TBC] List with brief descriptions" />
      )}

      {/* Bars */}
      {foodDrink?.bars ? (
        <>
          <div className="sub-section">
            <h3>🍺 BARS</h3>
            {foodDrink.bars.map((bar, idx) => (
              <div key={idx} className="content-card">
                <div className="content-card-title">
                  {bar.name}
                  {bar.location && <span style={{ fontWeight: 'normal', fontSize: '0.875rem', opacity: 0.8 }}> — {bar.location}</span>}
                </div>
                {bar.description && <p>{bar.description}</p>}
              </div>
            ))}
          </div>
          <hr className="section-divider" />
        </>
      ) : (
        <SubSection title="🍺 BARS" content="[TBC] List with brief descriptions" />
      )}

      {/* Local Speciality */}
      <div className="tip-block">
        <h3>🍴 LOCAL SPECIALITY — Don't miss these!</h3>
        {foodDrink?.localSpeciality ? (
          foodDrink.localSpeciality.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))
        ) : (
          <p><strong>[TBC]</strong> What to try - local dish/drink will appear here.</p>
        )}
      </div>

      {/* Tips */}
      {foodDrink?.tips ? (
        <div className="info-block">
          <h3>💡 TIPS</h3>
          <ul className="info-list">
            {foodDrink.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="info-block">
          <h3>💡 TIPS</h3>
          <p><strong>[TBC]</strong> Lunch hours, tipping, etc. will appear here.</p>
        </div>
      )}

      <div className="info-note">
        <p>ℹ️ Always check current opening times before visiting.</p>
      </div>
    </div>
  );
}

export default PortDayContent;
