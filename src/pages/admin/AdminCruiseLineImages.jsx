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

const REQUIRED_SHIP_GALLERY = ['exterior', 'deck', 'suite', 'dining'];
const OPTIONAL_SHIP_GALLERY = ['pool', 'entertainment', 'spa', 'theater'];

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
    const hasHero = !!clImages.hero;
    const hasCard = !!clImages.card;
    
    if (!hasLogo || !hasHero || !hasCard) return 'error';
    if (clImages.logo?.seo_compliant && clImages.hero?.seo_compliant && clImages.card?.seo_compliant) return 'pass';
    return 'warning';
  };

  const getShipStatus = (cruiseLineSlug, ship) => {
    const shipKey = `${cruiseLineSlug}/ships/${ship.slug || ship.name.toLowerCase().replace(/\s+/g, '-')}`;
    const shipImgs = shipImages[shipKey] || {};
    
    const hasRequired = REQUIRED_SHIP_GALLERY.every(type => shipImgs[type]);
    if (!hasRequired) return 'error';
    
    const allCompliant = Object.values(shipImgs).every(img => img.seo_compliant);
    return allCompliant ? 'pass' : 'warning';
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
                      <span className={images[cl.slug]?.hero ? 'stat-ok' : 'stat-missing'}>Hero</span>
                      <span className={images[cl.slug]?.card ? 'stat-ok' : 'stat-missing'}>Card</span>
                      {cl.fleet && cl.fleet.length > 0 && (
                        <span style={{ marginLeft: 'auto', color: 'var(--admin-text-muted)' }}>
                          <Ship size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                          {cl.fleet.length}
                        </span>
                      )}
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
                <p className="image-card-specs">Recommended: 400×120px, transparent PNG or WebP</p>
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
              
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Hero Image</h3>
                    <span className="badge badge-required">Required</span>
                  </div>
                  <StatusIndicator 
                    status={images[selectedCruiseLine.slug]?.hero ? 'pass' : 'missing'} 
                    size="small" 
                  />
                </div>
                <p className="image-card-specs">Recommended: 1920×1080px, WebP format</p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.CRUISE_LINES}
                  entityType="cruise-line"
                  entityId={selectedCruiseLine.slug}
                  imageType="hero"
                  suggestedAltText={`${selectedCruiseLine.name} cruise ship`}
                  existingImage={images[selectedCruiseLine.slug]?.hero?.url}
                  existingData={images[selectedCruiseLine.slug]?.hero}
                  onUploadComplete={loadImages}
                />
              </div>

              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Card Image</h3>
                    <span className="badge badge-required">Required</span>
                  </div>
                  <StatusIndicator 
                    status={images[selectedCruiseLine.slug]?.card ? 'pass' : 'missing'} 
                    size="small" 
                  />
                </div>
                <p className="image-card-specs">Recommended: 600×400px, WebP format</p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.CRUISE_LINES}
                  entityType="cruise-line"
                  entityId={selectedCruiseLine.slug}
                  imageType="card"
                  suggestedAltText={`${selectedCruiseLine.name} cruise card`}
                  existingImage={images[selectedCruiseLine.slug]?.card?.url}
                  existingData={images[selectedCruiseLine.slug]?.card}
                  onUploadComplete={loadImages}
                />
              </div>
            </div>

            {/* Ships Section */}
            {selectedCruiseLine.fleet && selectedCruiseLine.fleet.length > 0 && (
              <>
                <h3 style={{ color: 'var(--admin-text)', fontSize: '1.25rem', marginTop: '3rem', marginBottom: '1rem' }}>
                  <Ship size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                  Ships ({selectedCruiseLine.fleet.length})
                </h3>
                <div className="entity-grid">
                  {[...selectedCruiseLine.fleet]
                    .sort((a, b) => {
                      const nameA = (a.name || '').toLowerCase();
                      const nameB = (b.name || '').toLowerCase();
                      return nameA.localeCompare(nameB);
                    })
                    .map(ship => {
                      const shipSlug = ship.slug || ship.name.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <button
                          key={shipSlug}
                          className="entity-card"
                          onClick={() => setSelectedShip(ship)}
                        >
                          <div className="entity-card-header">
                            <h3>{ship.name}</h3>
                            <StatusIndicator status={getShipStatus(selectedCruiseLine.slug, ship)} size="small" />
                          </div>
                        </button>
                      );
                    })}
                </div>
              </>
            )}
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
                  <h3 style={{ color: 'var(--admin-text)', marginBottom: '1rem' }}>Required Gallery Images</h3>
                  {REQUIRED_SHIP_GALLERY.map(type => (
                    <div key={type} className="admin-card image-card">
                      <div className="image-card-header">
                        <div className="image-card-title">
                          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                          <span className="badge badge-required">Required</span>
                        </div>
                        <StatusIndicator 
                          status={shipImgs[type] ? 'pass' : 'missing'} 
                          size="small" 
                        />
                      </div>
                      <p className="image-card-specs">Recommended: 1200×800px, WebP format</p>
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

                  <h3 style={{ color: 'var(--admin-text)', margin: '2rem 0 1rem' }}>Optional Gallery Images</h3>
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
                      <p className="image-card-specs">Recommended: 1200×800px, WebP format</p>
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
