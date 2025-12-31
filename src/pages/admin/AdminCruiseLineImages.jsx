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
  const [selectedShip, setSelectedShip] = useState(null);
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
    
    // Required: logo + gallery images (exterior, interior, entertainment, food, cabin)
    const requiredGalleryTypes = ['exterior', 'interior', 'entertainment', 'food', 'cabin'];
    const hasAllGallery = requiredGalleryTypes.every(type => !!clImages[type]);
    
    if (!hasLogo || !hasAllGallery) return 'error';
    if (clImages.logo?.seo_compliant && requiredGalleryTypes.every(type => clImages[type]?.seo_compliant)) return 'pass';
    return 'warning';
  };

  const getShipStatus = (cruiseLineSlug, ship) => {
    const shipSlug = ship.slug || ship.name.toLowerCase().replace(/\s+/g, '-');
    const shipEntityId = `${cruiseLineSlug}/ships/${shipSlug}`;
    const shipImgs = shipImages[shipEntityId] || {};
    
    // Ship card image is required for ship cards on cruise line pages
    const hasCard = !!shipImgs.card;
    if (!hasCard) return 'error';
    
    // Check SEO compliance
    if (shipImgs.card?.seo_compliant) return 'pass';
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
                        const requiredGalleryTypes = ['exterior', 'interior', 'entertainment', 'food', 'cabin'];
                        const galleryCount = requiredGalleryTypes.filter(type => images[cl.slug]?.[type]).length;
                        return (
                          <span className={galleryCount === 5 ? 'stat-ok' : galleryCount > 0 ? 'stat-warning' : 'stat-missing'}>
                            Gallery: {galleryCount}/5
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
        ) : !selectedShip ? (
          // Cruise Line Detail (General Images + Ships List)
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedCruiseLine(null)}>
              <ArrowLeft size={16} /> Back to Cruise Lines
            </button>
            
            <h2 className="entity-detail-title">{selectedCruiseLine.name}</h2>
            
            {/* General Images */}
            <h3 style={{ color: 'var(--admin-text)', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '1.5rem' }}>
              General Images
            </h3>
            <div className="images-list">
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
                  Format: Transparent PNG or WebP preferred<br />
                  <strong>Note:</strong> Logos can have different aspect ratios - width must be 400px, height can vary
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

            {/* Gallery Images (Required for Why Choose & Families & Kids sections) */}
            <h3 style={{ color: 'var(--admin-text)', fontSize: '1.25rem', marginTop: '3rem', marginBottom: '1rem' }}>
              Gallery Images (Required)
            </h3>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <strong>These images are required</strong> for the "Why Choose" section (6 benefit cards) and "Families & Kids" section. They display at 400×300px on the page. Upload at 600×400px (2x for retina displays) for optimal quality and smaller file sizes. The system will intelligently match images to benefit cards based on content (e.g., dining images for food-related cards, ship exterior for fleet-related cards).
            </p>
            <div className="images-list">
              {['exterior', 'interior', 'entertainment', 'food', 'cabin'].map(type => {
                const labels = {
                  exterior: 'Ship Exterior',
                  interior: 'Interior Spaces',
                  entertainment: 'Entertainment / Kids Club',
                  food: 'Dining',
                  cabin: 'Staterooms'
                };
                const usage = {
                  exterior: '"Why Choose" cards (fleet/ship related), "Families & Kids" section',
                  interior: '"Why Choose" cards (general), "Families & Kids" section',
                  entertainment: '"Why Choose" cards (entertainment/kids), "Families & Kids" section',
                  food: '"Why Choose" cards (dining related)',
                  cabin: '"Why Choose" cards (cabin/suite related)'
                };
                return (
                  <div key={type} className="admin-card image-card">
                    <div className="image-card-header">
                      <div className="image-card-title">
                        <h3>{labels[type] || type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                        <span className="badge badge-required">Required</span>
                      </div>
                      <StatusIndicator 
                        status={images[selectedCruiseLine.slug]?.[type] ? 'pass' : 'missing'} 
                        size="small" 
                      />
                    </div>
                    <p className="image-card-specs">
                      Required: 600×400px (displays at 400×300px, 2x for retina), WebP format<br />
                      <strong>Used in:</strong> {usage[type]}
                    </p>
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CRUISE_LINES}
                      entityType="cruise-line"
                      entityId={selectedCruiseLine.slug}
                      imageType={type}
                      suggestedAltText={`${selectedCruiseLine.name} ${labels[type] || type}`}
                      existingImage={images[selectedCruiseLine.slug]?.[type]?.url}
                      existingData={images[selectedCruiseLine.slug]?.[type]}
                      onUploadComplete={loadImages}
                    />
                  </div>
                );
              })}
            </div>

            {/* Ships Section */}
            {(() => {
              // Handle both 'fleet' (array of objects) and 'ships' (array of strings)
              const shipList = selectedCruiseLine.fleet || 
                (selectedCruiseLine.ships ? selectedCruiseLine.ships.map(name => ({ name })) : []);
              
              if (shipList.length === 0) return null;
              
              return (
                <>
            <h3 style={{ color: 'var(--admin-text)', fontSize: '1.25rem', marginTop: '3rem', marginBottom: '1rem' }}>
              <Ship size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              Ships ({shipList.length}) - Card Images Required
            </h3>
            <p style={{
              color: 'var(--admin-text-muted)',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              background: 'var(--admin-bg-secondary)',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              borderLeft: '3px solid var(--admin-primary)'
            }}>
              ℹ️ <strong>Ship card images are required</strong> for the fleet carousel on the cruise line page. 
              Each ship needs a card image (600×400px recommended, displays at 400×300px). 
              Ships without card images will show "Image Coming Soon" placeholder.
            </p>
                  <div className="entity-grid">
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
                        return (
                          <button
                            key={shipSlug}
                            className="entity-card"
                            onClick={() => setSelectedShip(shipObj)}
                          >
                            <div className="entity-card-header">
                              <h3>{shipObj.name}</h3>
                              <StatusIndicator status={getShipStatus(selectedCruiseLine.slug, shipObj)} size="small" />
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          // Ship Detail (Gallery Images)
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedShip(null)}>
              <ArrowLeft size={16} /> Back to {selectedCruiseLine.name}
            </button>

            <h2 className="entity-detail-title">{selectedShip.name}</h2>
            <p style={{ color: 'var(--admin-text-muted)', marginBottom: '1.5rem' }}>{selectedCruiseLine.name}</p>

            {(() => {
              const shipSlug = selectedShip.slug || selectedShip.name.toLowerCase().replace(/\s+/g, '-');
              const shipEntityId = `${selectedCruiseLine.slug}/ships/${shipSlug}`;
              const shipImgs = shipImages[shipEntityId] || {};

              return (
                <div className="images-list">
                  {/* Ship Card Image - Required for ship cards on cruise line pages */}
                  <div className="admin-card image-card" style={{ 
                    border: '2px solid var(--admin-primary)', 
                    background: 'var(--admin-bg-secondary)',
                    marginBottom: '2rem'
                  }}>
                    <div className="image-card-header">
                      <div className="image-card-title">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Ship Card Image</h3>
                        <span className="badge badge-required">Required</span>
                      </div>
                      <StatusIndicator 
                        status={shipImgs.card ? 'pass' : 'missing'} 
                        size="small" 
                      />
                    </div>
                    <p className="image-card-specs" style={{ 
                      fontSize: '0.9375rem',
                      lineHeight: '1.6',
                      marginBottom: '0.5rem'
                    }}>
                      <strong>Required for fleet carousel display</strong><br />
                      Recommended: 600×400px (displays at 400×300px on page), WebP format<br />
                      <strong>Used in:</strong> "Our Fleet" carousel section on the cruise line page<br />
                      <strong>Note:</strong> Ships without card images will show "Image Coming Soon" placeholder
                    </p>
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CRUISE_LINES}
                      entityType="ship"
                      entityId={shipEntityId}
                      imageType="card"
                      suggestedAltText={`${selectedShip.name} ship card`}
                      existingImage={shipImgs.card?.url}
                      existingData={shipImgs.card}
                      onUploadComplete={loadImages}
                    />
                  </div>

                  {/* Ship Gallery Images (All Optional) */}
                  <h3 style={{ color: 'var(--admin-text)', marginTop: '2rem', marginBottom: '1rem' }}>
                    Ship Gallery Images (All Optional)
                  </h3>
                  {OPTIONAL_SHIP_GALLERY.map(type => (
                    <div key={type} className="admin-card image-card">
                      <div className="image-card-header">
                        <div className="image-card-title">
                          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                          <span className="badge badge-optional">Optional</span>
                        </div>
                        <StatusIndicator 
                          status={shipImgs[type] ? 'pass' : 'missing'} 
                          size="small" 
                        />
                      </div>
                      <p className="image-card-specs">Recommended: 600×400px, WebP format (optional - for future ship profile pages)</p>
                      <ImageUpload
                        bucket={STORAGE_BUCKETS.CRUISE_LINES}
                        entityType="ship"
                        entityId={shipEntityId}
                        imageType={type}
                        suggestedAltText={`${selectedShip.name} ${type}`}
                        existingImage={shipImgs[type]?.url}
                        existingData={shipImgs[type]}
                        onUploadComplete={loadImages}
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      <style>{`
        .entity-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
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
