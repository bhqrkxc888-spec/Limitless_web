/**
 * Detailed Port Guide Component
 * Renders G606-style comprehensive port content
 * Used by PortGuidePage when detailed content is available
 */

import OptimizedImage from '../components/OptimizedImage';
import { usePortGuideImage } from '../hooks/useImageUrl';
import { MapPin, Clock, DollarSign, Info } from 'lucide-react';

export function DetailedPortGuide({ slug, portName, portCountry, detailedContent }) {
  // Load attraction images
  const { imageUrl: attraction1 } = usePortGuideImage(slug, 'attraction-1', portName, portCountry);
  const { imageUrl: attraction2 } = usePortGuideImage(slug, 'attraction-2', portName, portCountry);
  const { imageUrl: attraction3 } = usePortGuideImage(slug, 'attraction-3', portName, portCountry);
  const { imageUrl: attraction4 } = usePortGuideImage(slug, 'attraction-4', portName, portCountry);
  const { imageUrl: attraction5 } = usePortGuideImage(slug, 'attraction-5', portName, portCountry);
  const { imageUrl: attraction6 } = usePortGuideImage(slug, 'attraction-6', portName, portCountry);
  
  const attractionImages = [attraction1, attraction2, attraction3, attraction4, attraction5, attraction6];

  if (!detailedContent) return null;

  const { overview, stayLocal, goFurther, withKids, send, foodAndDrink } = detailedContent;

  return (
    <div className="detailed-port-guide">
      {/* Overview Section */}
      {overview && (
        <section className="port-section port-overview">
          <h2>Overview</h2>
          {overview.description && (
            <div className="port-description">
              {overview.description.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}
          
          {overview.portInfo && (
            <div className="port-info-grid">
              {overview.portInfo.dockLocation && (
                <div className="info-item">
                  <MapPin size={20} />
                  <div>
                    <strong>Dock Location:</strong>
                    <p>{overview.portInfo.dockLocation}</p>
                  </div>
                </div>
              )}
              {overview.portInfo.distanceToTown && (
                <div className="info-item">
                  <Clock size={20} />
                  <div>
                    <strong>Distance to Town:</strong>
                    <p>{overview.portInfo.distanceToTown}</p>
                  </div>
                </div>
              )}
              {overview.portInfo.shuttleInfo && (
                <div className="info-item">
                  <Info size={20} />
                  <div>
                    <strong>Shuttle Info:</strong>
                    <p>{overview.portInfo.shuttleInfo}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Stay Local Section */}
      {stayLocal && (
        <section className="port-section port-stay-local">
          <h2>Stay Local</h2>
          <p className="section-intro">Everything within walking distance from the ship</p>

          {stayLocal.quickWalk && stayLocal.quickWalk.length > 0 && (
            <div className="subsection">
              <h3>Quick Walk</h3>
              {stayLocal.quickWalk.map((item, idx) => (
                <div key={idx} className="walk-item">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                  {item.mapLink && (
                    <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                      View on Google Maps →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {stayLocal.longerWalk && stayLocal.longerWalk.length > 0 && (
            <div className="subsection">
              <h3>Longer Walks</h3>
              {stayLocal.longerWalk.map((item, idx) => (
                <div key={idx} className="walk-item">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                  {item.mapLink && (
                    <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                      View on Google Maps →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {stayLocal.parks && stayLocal.parks.length > 0 && (
            <div className="subsection">
              <h3>Parks & Green Spaces</h3>
              {stayLocal.parks.map((park, idx) => (
                <div key={idx} className="park-item">
                  <h4>{park.title}</h4>
                  <p>{park.content}</p>
                </div>
              ))}
            </div>
          )}

          {stayLocal.beach && (
            <div className="subsection">
              <h3>Beach</h3>
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
            </div>
          )}

          {stayLocal.scenic && stayLocal.scenic.length > 0 && (
            <div className="subsection">
              <h3>Photo Spots</h3>
              <ul className="simple-list">
                {stayLocal.scenic.map((spot, idx) => (
                  <li key={idx}>{spot}</li>
                ))}
              </ul>
            </div>
          )}

          {stayLocal.shopping && stayLocal.shopping.length > 0 && (
            <div className="subsection">
              <h3>Shopping</h3>
              <ul className="simple-list">
                {stayLocal.shopping.map((shop, idx) => (
                  <li key={idx}>{shop}</li>
                ))}
              </ul>
            </div>
          )}

          {stayLocal.coffee && stayLocal.coffee.length > 0 && (
            <div className="subsection">
              <h3>Coffee Spots</h3>
              <ul className="simple-list">
                {stayLocal.coffee.map((cafe, idx) => (
                  <li key={idx}>{cafe}</li>
                ))}
              </ul>
            </div>
          )}

          {stayLocal.bars && stayLocal.bars.length > 0 && (
            <div className="subsection">
              <h3>Bars & Drinks</h3>
              <ul className="simple-list">
                {stayLocal.bars.map((bar, idx) => (
                  <li key={idx}>{bar}</li>
                ))}
              </ul>
            </div>
          )}

          {stayLocal.rainyDay && stayLocal.rainyDay.length > 0 && (
            <div className="subsection">
              <h3>Rainy Day Options</h3>
              <ul className="simple-list">
                {stayLocal.rainyDay.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            </div>
          )}

          {stayLocal.tip && (
            <div className="tip-box">
              <strong>💡 Our Tip:</strong>
              <p>{stayLocal.tip}</p>
            </div>
          )}
        </section>
      )}

      {/* Go Further Section */}
      {goFurther && goFurther.attractions && goFurther.attractions.length > 0 && (
        <section className="port-section port-go-further">
          <h2>Go Further</h2>
          <p className="section-intro">These need transport - tour, taxi, or public transport</p>

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
              
              <div className="attraction-details">
                {attraction.cruiseLineOption && (
                  <div className="detail-item">
                    <strong>Cruise Line Option:</strong>
                    <p>{attraction.cruiseLineOption}</p>
                  </div>
                )}
                {attraction.independent && (
                  <div className="detail-item">
                    <strong>Independent:</strong>
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
                  <div className="detail-item">
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
            </div>
          ))}

          {goFurther.ourTake && (
            <div className="tip-box">
              <strong>💡 Overall Recommendation:</strong>
              <p>{goFurther.ourTake}</p>
            </div>
          )}
        </section>
      )}

      {/* With Kids Section */}
      {withKids && (
        <section className="port-section port-with-kids">
          <h2>With Kids</h2>

          {withKids.toddlers && withKids.toddlers.length > 0 && (
            <div className="subsection">
              <h3>Toddlers</h3>
              <ul className="simple-list">
                {withKids.toddlers.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {withKids.olderKids && withKids.olderKids.length > 0 && (
            <div className="subsection">
              <h3>Older Kids</h3>
              <ul className="simple-list">
                {withKids.olderKids.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {withKids.familyFood && withKids.familyFood.length > 0 && (
            <div className="subsection">
              <h3>Family Food</h3>
              <ul className="simple-list">
                {withKids.familyFood.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {withKids.warnings && withKids.warnings.length > 0 && (
            <div className="subsection warnings">
              <h3>⚠️ Things to Note</h3>
              <ul className="simple-list">
                {withKids.warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {withKids.easyDay && (
            <div className="tip-box">
              <strong>💡 Easy Day Suggestion:</strong>
              <p>{withKids.easyDay}</p>
            </div>
          )}
        </section>
      )}

      {/* SEND Section (Accessibility) */}
      {send && (
        <section className="port-section port-send">
          <h2>Accessibility (SEND)</h2>

          {send.wheelchairAccess && (
            <div className="subsection">
              <h3>Wheelchair Access</h3>
              {typeof send.wheelchairAccess === 'object' ? (
                <>
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
                </>
              ) : (
                <p>{send.wheelchairAccess}</p>
              )}
            </div>
          )}

          {send.mobilityConsiderations && send.mobilityConsiderations.length > 0 && (
            <div className="subsection">
              <h3>Mobility Considerations</h3>
              <ul className="simple-list">
                {send.mobilityConsiderations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {send.accessibleAttractions && send.accessibleAttractions.length > 0 && (
            <div className="subsection">
              <h3>Accessible Attractions</h3>
              {send.accessibleAttractions.map((attraction, idx) => (
                <div key={idx} className="access-item">
                  <strong>{attraction.name}:</strong>
                  <p>{attraction.accessibility}</p>
                  {attraction.notes && <p><em>{attraction.notes}</em></p>}
                </div>
              ))}
            </div>
          )}

          {send.sensoryConsiderations && send.sensoryConsiderations.length > 0 && (
            <div className="subsection">
              <h3>Sensory Considerations</h3>
              <ul className="simple-list">
                {send.sensoryConsiderations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {send.supportServices && send.supportServices.length > 0 && (
            <div className="subsection">
              <h3>Quiet Spots & Support</h3>
              <ul className="simple-list">
                {send.supportServices.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Food & Drink Section */}
      {foodAndDrink && (
        <section className="port-section port-food-drink">
          <h2>Food & Drink</h2>

          {foodAndDrink.localSpecialties && foodAndDrink.localSpecialties.length > 0 && (
            <div className="subsection">
              <h3>Local Specialties</h3>
              {foodAndDrink.localSpecialties.map((specialty, idx) => (
                <div key={idx} className="specialty-item">
                  <strong>{specialty.name}:</strong>
                  <p>{specialty.description}</p>
                  {specialty.where && <p><em>Where: {specialty.where}</em></p>}
                </div>
              ))}
            </div>
          )}

          {foodAndDrink.budgetEats && foodAndDrink.budgetEats.length > 0 && (
            <div className="subsection">
              <h3>Budget Eats</h3>
              <ul className="simple-list">
                {foodAndDrink.budgetEats.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {foodAndDrink.midRange && foodAndDrink.midRange.length > 0 && (
            <div className="subsection">
              <h3>Mid-Range</h3>
              <ul className="simple-list">
                {foodAndDrink.midRange.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {foodAndDrink.vegetarianVegan && foodAndDrink.vegetarianVegan.length > 0 && (
            <div className="subsection">
              <h3>Vegetarian & Vegan</h3>
              <ul className="simple-list">
                {foodAndDrink.vegetarianVegan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {foodAndDrink.dietaryNotes && (
            <div className="tip-box">
              <strong>💡 Dietary Notes:</strong>
              <p>{foodAndDrink.dietaryNotes}</p>
            </div>
          )}

          {foodAndDrink.drinkingWater && (
            <div className="info-box">
              <strong>💧 Drinking Water:</strong>
              <p>{foodAndDrink.drinkingWater}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
