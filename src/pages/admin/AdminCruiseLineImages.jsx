/**
 * Admin Cruise Line Images Page
 * Unified management for cruise lines and ships
 * - Select cruise line → General images (logo/hero/card) + Ships section
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ship } from 'lucide-react';
import { cruiseLines } from '../../data/cruiseLines';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';

const REQUIRED_SHIP_GALLERY = []; // Ships are OPTIONAL - future enhancement
const OPTIONAL_SHIP_GALLERY = ['exterior', 'deck', 'suite', 'dining', 'pool', 'entertainment', 'spa', 'theater']; // All ship images are optional

function AdminCruiseLineImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [images, setImages] = useState({});
  const [shipImages, setShipImages] = useState({});
  const [selectedCruiseLine, setSelectedCruiseLine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadImages = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Load cruise line images
      const { data: clData } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'cruise-line');

      const clImageMap = {};
      clData?.forEach(img => {
        if (!clImageMap[img.entity_id]) clImageMap[img.entity_id] = {};
        clImageMap[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });
      setImages(clImageMap);

      // Load ship images
      const { data: shipData } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'ship');

      const shipImageMap = {};
      shipData?.forEach(img => {
        if (!shipImageMap[img.entity_id]) shipImageMap[img.entity_id] = {};
        shipImageMap[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });
      setShipImages(shipImageMap);

      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadImages();
    }
  }, [isAuthenticated, loadImages]);

  const getCruiseLineStatus = (slug) => {
    const clImages = images[slug] || {};
    const hasLogo = !!clImages.logo;
    
    // Required: logo + 6 "Why Choose" images + 2 "Families & Kids" images
    const requiredWhyChoose = ['why-choose-1', 'why-choose-2', 'why-choose-3', 'why-choose-4', 'why-choose-5', 'why-choose-6'];
    const requiredFamiliesKids = ['families-kids-1', 'families-kids-2'];
    const hasAllWhyChoose = requiredWhyChoose.every(type => !!clImages[type]);
    const hasAllFamiliesKids = requiredFamiliesKids.every(type => !!clImages[type]);
    
    if (!hasLogo || !hasAllWhyChoose || !hasAllFamiliesKids) return 'error';
    const allCompliant = clImages.logo?.seo_compliant && 
                         requiredWhyChoose.every(type => clImages[type]?.seo_compliant) &&
                         requiredFamiliesKids.every(type => clImages[type]?.seo_compliant);
    if (allCompliant) return 'pass';
    return 'warning';
  };


  // Show loading while checking auth
  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f1117',
        color: '#e8eaed'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={loadImages}
      isRefreshing={isRefreshing}
    >
      <div className="admin-images-page">
        {!selectedCruiseLine ? (
          // Cruise Line Selection
          <>
            <header className="admin-page-header">
              <Link to="/admin/images" className="back-link">
                <ArrowLeft size={18} />
                Back to Image Management
              </Link>
              <h1 className="admin-page-title">Cruise Lines & Ships</h1>
              <p className="admin-page-subtitle">Manage logos, heroes, cards, and ship images for all {cruiseLines.length} cruise lines</p>
            </header>

            {loading ? (
              <div className="admin-loading">
                <div className="admin-loading-spinner" />
                <p>Loading cruise lines...</p>
              </div>
            ) : (
              <div className="entity-grid">
                {[...cruiseLines]
                  .sort((a, b) => {
                    const nameA = (a.name || '').toLowerCase();
                    const nameB = (b.name || '').toLowerCase();
                    return nameA.localeCompare(nameB);
                  })
                  .map(cl => (
                  <button
                    key={cl.slug}
                    className="entity-card"
                    onClick={() => setSelectedCruiseLine(cl)}
                  >
                    <div className="entity-card-header">
                      <h3>{cl.name}</h3>
                      <StatusIndicator status={getCruiseLineStatus(cl.slug)} size="small" />
                    </div>
                    <p className="entity-card-stats">
                      <span className={images[cl.slug]?.logo ? 'stat-ok' : 'stat-missing'}>Logo</span>
                      {(() => {
                        const requiredWhyChoose = ['why-choose-1', 'why-choose-2', 'why-choose-3', 'why-choose-4', 'why-choose-5', 'why-choose-6'];
                        const requiredFamiliesKids = ['families-kids-1', 'families-kids-2'];
                        const whyChooseCount = requiredWhyChoose.filter(type => images[cl.slug]?.[type]).length;
                        const familiesKidsCount = requiredFamiliesKids.filter(type => images[cl.slug]?.[type]).length;
                        const totalRequired = 6 + 2; // 6 Why Choose + 2 Families & Kids
                        const totalUploaded = whyChooseCount + familiesKidsCount;
                        return (
                          <span className={totalUploaded === totalRequired ? 'stat-ok' : totalUploaded > 0 ? 'stat-warning' : 'stat-missing'}>
                            Images: {totalUploaded}/{totalRequired}
                          </span>
                        );
                      })()}
                      {(() => {
                        const shipList = cl.fleet || (cl.ships ? cl.ships.map(name => ({ name })) : []);
                        const shipCount = shipList.length;
                        const shipSlugs = shipList.map(ship => {
                          const shipObj = typeof ship === 'string' ? { name: ship } : ship;
                          return shipObj.slug || shipObj.name.toLowerCase().replace(/\s+/g, '-');
                        });
                        const shipEntityIds = shipSlugs.map(shipSlug => `${cl.slug}/ships/${shipSlug}`);
                        const shipsWithCards = shipEntityIds.filter(entityId => shipImages[entityId]?.card).length;
                        return (
                          <>
                            {shipCount > 0 && (
                              <span className={shipsWithCards === shipCount ? 'stat-ok' : shipsWithCards > 0 ? 'stat-warning' : 'stat-missing'}>
                                Ships: {shipsWithCards}/{shipCount}
                              </span>
                            )}
                            <span style={{ marginLeft: 'auto', color: 'var(--admin-text-muted)' }}>
                              <Ship size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                              {shipCount}
                            </span>
                          </>
                        );
                      })()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          // Cruise Line Detail (All Required Images)
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedCruiseLine(null)}>
              <ArrowLeft size={16} /> Back to Cruise Lines
            </button>
            
            <h2 className="entity-detail-title">{selectedCruiseLine.name}</h2>
            
            {/* Required Images Section */}
            <div className="required-images-section">
              <h2 style={{ color: 'var(--admin-text)', fontSize: '1.5rem', marginBottom: '0.5rem', marginTop: '1.5rem' }}>
                Required Images
              </h2>
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                All images below are required for the cruise line page to display correctly. Upload at 600×400px (displays at 400×300px, 2x for retina), WebP format.
              </p>
              <div style={{
                background: 'var(--admin-bg-tertiary)',
                border: '1px solid var(--admin-border)',
                borderLeft: '3px solid var(--admin-primary)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '2rem'
              }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--admin-text)', lineHeight: '1.5' }}>
                  <strong>📸 Image Note:</strong> These images are general representations of {selectedCruiseLine.name}'s offerings and facilities. Individual ships may vary in specific features, layouts, and amenities. Use representative images that best showcase the cruise line's overall experience.
                </p>
              </div>

              {/* Logo */}
              <div className="images-grid" style={{ marginBottom: '2rem' }}>
                <div className="admin-card image-card">
                  <div className="image-card-header">
                    <div className="image-card-title">
                      <h3>Logo</h3>
                      <span className="badge badge-required">Required</span>
                    </div>
                    <StatusIndicator 
                      status={images[selectedCruiseLine.slug]?.logo ? 'pass' : 'missing'} 
                      size="small" 
                    />
                  </div>
                  <p className="image-card-specs">
                    Recommended: 400px width (height flexible: 100-250px based on logo design)<br />
                    Format: Transparent PNG or WebP preferred
                  </p>
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.CRUISE_LINES}
                    entityType="cruise-line"
                    entityId={selectedCruiseLine.slug}
                    imageType="logo"
                    suggestedAltText={`${selectedCruiseLine.name} logo`}
                    existingImage={images[selectedCruiseLine.slug]?.logo?.url}
                    existingData={images[selectedCruiseLine.slug]?.logo}
                    onUploadComplete={loadImages}
                  />
                </div>
              </div>

              {/* Why Choose Images - Grid Layout */}
              <h3 style={{ color: 'var(--admin-text)', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>
                "Why Choose" Benefit Card Images (6 Required)
              </h3>
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                One image per benefit card. Each card needs its own specific image that matches the card content.
              </p>
              <div className="images-grid why-choose-grid">
                {selectedCruiseLine.whyChoose && selectedCruiseLine.whyChoose.length > 0 ? (
                  selectedCruiseLine.whyChoose.map((card, index) => {
                    const imageType = `why-choose-${index + 1}`;
                    return (
                      <div key={imageType} className="admin-card image-card">
                        <div className="image-card-header">
                          <div className="image-card-title">
                            <h3>Card {index + 1}: {card.title}</h3>
                            <span className="badge badge-required">Required</span>
                          </div>
                          <StatusIndicator 
                            status={images[selectedCruiseLine.slug]?.[imageType] ? 'pass' : 'missing'} 
                            size="small" 
                          />
                        </div>
                        <p className="image-card-specs">
                          600×400px (displays at 400×300px, 2x for retina), WebP format
                        </p>
                        <ImageUpload
                          bucket={STORAGE_BUCKETS.CRUISE_LINES}
                          entityType="cruise-line"
                          entityId={selectedCruiseLine.slug}
                          imageType={imageType}
                          suggestedAltText={`${selectedCruiseLine.name} - ${card.title}`}
                          existingImage={images[selectedCruiseLine.slug]?.[imageType]?.url}
                          existingData={images[selectedCruiseLine.slug]?.[imageType]}
                          onUploadComplete={loadImages}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: 'var(--admin-text-muted)', fontStyle: 'italic' }}>
                    No "Why Choose" cards defined for this cruise line.
                  </p>
                )}
              </div>

              {/* Families & Kids Images - Grid Layout */}
              <h3 style={{ color: 'var(--admin-text)', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>
                "Families & Kids" Section Images (2 Required)
              </h3>
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Two specific images displayed in the "Families & Kids" section (stacked vertically).
              </p>
              <div className="images-grid">
                <div className="admin-card image-card">
                  <div className="image-card-header">
                    <div className="image-card-title">
                      <h3>Pool / Family Entertainment</h3>
                      <span className="badge badge-required">Required</span>
                    </div>
                    <StatusIndicator 
                      status={images[selectedCruiseLine.slug]?.['families-kids-1'] ? 'pass' : 'missing'} 
                      size="small" 
                    />
                  </div>
                  <div className="image-card-description">
                    <p>First image in "Families & Kids" section - pool/family entertainment area</p>
                  </div>
                  <p className="image-card-specs">
                    600×400px (displays at 400×300px, 2x for retina), WebP format
                  </p>
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.CRUISE_LINES}
                    entityType="cruise-line"
                    entityId={selectedCruiseLine.slug}
                    imageType="families-kids-1"
                    suggestedAltText={`${selectedCruiseLine.name} pool / family entertainment`}
                    existingImage={images[selectedCruiseLine.slug]?.['families-kids-1']?.url}
                    existingData={images[selectedCruiseLine.slug]?.['families-kids-1']}
                    onUploadComplete={loadImages}
                  />
                </div>
                <div className="admin-card image-card">
                  <div className="image-card-header">
                    <div className="image-card-title">
                      <h3>Kids Entertainment / Kids Club</h3>
                      <span className="badge badge-required">Required</span>
                    </div>
                    <StatusIndicator 
                      status={images[selectedCruiseLine.slug]?.['families-kids-2'] ? 'pass' : 'missing'} 
                      size="small" 
                    />
                  </div>
                  <div className="image-card-description">
                    <p>Second image in "Families & Kids" section - kids club/kids entertainment</p>
                  </div>
                  <p className="image-card-specs">
                    600×400px (displays at 400×300px, 2x for retina), WebP format
                  </p>
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.CRUISE_LINES}
                    entityType="cruise-line"
                    entityId={selectedCruiseLine.slug}
                    imageType="families-kids-2"
                    suggestedAltText={`${selectedCruiseLine.name} kids entertainment / kids club`}
                    existingImage={images[selectedCruiseLine.slug]?.['families-kids-2']?.url}
                    existingData={images[selectedCruiseLine.slug]?.['families-kids-2']}
                    onUploadComplete={loadImages}
                  />
                </div>
              </div>

              {/* Ship Card Images - Required for Fleet Carousel - Grid Layout */}
              {(() => {
                // Handle both 'fleet' (array of objects) and 'ships' (array of strings)
                const shipList = selectedCruiseLine.fleet || 
                  (selectedCruiseLine.ships ? selectedCruiseLine.ships.map(name => ({ name })) : []);
                
                if (shipList.length === 0) return null;
                
                return (
                  <>
                    <h3 style={{ color: 'var(--admin-text)', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>
                      <Ship size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                      Ship Card Images (Required) - {shipList.length} Ships
                    </h3>
                    <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      Ship card images are required for the fleet carousel on the cruise line page. Each ship needs a card image (600×400px, displays at 400×300px). Ships without card images will show "Image Coming Soon" placeholder.
                    </p>
                    <div style={{
                      background: 'var(--admin-bg-tertiary)',
                      border: '1px solid var(--admin-border)',
                      borderLeft: '3px solid var(--admin-primary)',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--admin-text)', lineHeight: '1.5' }}>
                        <strong>🚢 Ship Images:</strong> Upload images of the actual ship when available. If a specific ship image is not available, use a representative image from the same class or similar ship, and note that features may vary by ship.
                      </p>
                    </div>
                    <div className="images-grid ship-cards-grid">
                      {[...shipList]
                        .sort((a, b) => {
                          const nameA = (typeof a === 'string' ? a : a.name || '').toLowerCase();
                          const nameB = (typeof b === 'string' ? b : b.name || '').toLowerCase();
                          return nameA.localeCompare(nameB);
                        })
                        .map(ship => {
                          // Normalize: handle both string and object formats
                          const shipObj = typeof ship === 'string' ? { name: ship } : ship;
                          const shipSlug = shipObj.slug || shipObj.name.toLowerCase().replace(/\s+/g, '-');
                          const shipEntityId = `${selectedCruiseLine.slug}/ships/${shipSlug}`;
                          const shipImgs = shipImages[shipEntityId] || {};
                          
                          return (
                            <div key={shipSlug} className="admin-card image-card">
                              <div className="image-card-header">
                                <div className="image-card-title">
                                  <h3>{shipObj.name}</h3>
                                  <span className="badge badge-required">Required</span>
                                </div>
                                <StatusIndicator 
                                  status={shipImgs.card ? (shipImgs.card.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                                  size="small" 
                                />
                              </div>
                              <div className="image-card-description">
                                <p>Ship card image for "Our Fleet" carousel</p>
                              </div>
                              <p className="image-card-specs">
                                600×400px (displays at 400×300px), WebP format
                              </p>
                              <ImageUpload
                                bucket={STORAGE_BUCKETS.CRUISE_LINES}
                                entityType="ship"
                                entityId={shipEntityId}
                                imageType="card"
                                suggestedAltText={`${shipObj.name} ship card`}
                                existingImage={shipImgs.card?.url}
                                existingData={shipImgs.card}
                                onUploadComplete={loadImages}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Optional Ship Gallery Images */}
            {(() => {
              const shipList = selectedCruiseLine.fleet || 
                (selectedCruiseLine.ships ? selectedCruiseLine.ships.map(name => ({ name })) : []);
              
              if (shipList.length === 0) return null;
              
              return (
                <div className="optional-images-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--admin-border)' }}>
                  <h2 style={{ color: 'var(--admin-text)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Optional Ship Gallery Images
                  </h2>
                  <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                    Additional ship images are optional. These can be used for future ship detail pages or galleries. Upload at 600×400px (displays at 400×300px, 2x for retina), WebP format.
                  </p>
                  
                  {shipList.map(ship => {
                    const shipObj = typeof ship === 'string' ? { name: ship } : ship;
                    const shipSlug = shipObj.slug || shipObj.name.toLowerCase().replace(/\s+/g, '-');
                    const shipEntityId = `${selectedCruiseLine.slug}/ships/${shipSlug}`;
                    const shipImgs = shipImages[shipEntityId] || {};
                    
                    return (
                      <div key={shipSlug} style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--admin-text)', fontSize: '1.125rem', marginBottom: '1rem' }}>
                          {shipObj.name} - Optional Gallery Images
                        </h3>
                        <div className="images-grid">
                          {OPTIONAL_SHIP_GALLERY.map(type => {
                            const labels = {
                              exterior: 'Exterior',
                              deck: 'Deck',
                              suite: 'Suite',
                              dining: 'Dining',
                              pool: 'Pool',
                              entertainment: 'Entertainment',
                              spa: 'Spa',
                              theater: 'Theater'
                            };
                            
                            return (
                              <div key={type} className="admin-card image-card">
                                <div className="image-card-header">
                                  <div className="image-card-title">
                                    <h3>{labels[type]}</h3>
                                    <span className="badge badge-optional">Optional</span>
                                  </div>
                                  <StatusIndicator 
                                    status={shipImgs[type] ? (shipImgs[type].seo_compliant ? 'pass' : 'warning') : 'missing'} 
                                    size="small" 
                                  />
                                </div>
                                <p className="image-card-specs">
                                  600×400px (displays at 400×300px), WebP format
                                </p>
                                <ImageUpload
                                  bucket={STORAGE_BUCKETS.CRUISE_LINES}
                                  entityType="ship"
                                  entityId={shipEntityId}
                                  imageType={type}
                                  suggestedAltText={`${shipObj.name} ${labels[type].toLowerCase()}`}
                                  existingImage={shipImgs[type]?.url}
                                  existingData={shipImgs[type]}
                                  onUploadComplete={loadImages}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      <style>{`
        .entity-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1400px) {
          .entity-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .entity-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 767px) {
          .entity-grid {
            grid-template-columns: 1fr;
          }
        }

        .entity-card {
          background: var(--admin-bg-secondary);
          border: 1px solid var(--admin-border);
          border-radius: 12px;
          padding: 1.25rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .entity-card:hover {
          border-color: var(--admin-primary);
          transform: translateY(-2px);
        }

        .entity-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .entity-card h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--admin-text);
        }

        .entity-card-stats {
          display: flex;
          gap: 0.5rem;
          margin: 0;
          font-size: 0.75rem;
          align-items: center;
        }

        .entity-card-stats span {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .stat-ok {
          background: rgba(52, 211, 153, 0.15);
          color: var(--admin-success);
        }

        .stat-missing {
          background: rgba(248, 113, 113, 0.15);
          color: var(--admin-error);
        }

        .entity-detail {
          max-width: 900px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: var(--admin-text-muted);
          font-size: 0.875rem;
          cursor: pointer;
          margin-bottom: 1.5rem;
          transition: all 0.2s;
        }

        .back-btn:hover {
          color: var(--admin-text);
          border-color: var(--admin-primary);
        }

        .entity-detail-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--admin-text);
          margin: 0 0 1.5rem 0;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminCruiseLineImages;
