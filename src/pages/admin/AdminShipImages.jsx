/**
 * Admin Ship Images Page
 * Manages ship hero, card, and gallery images (exterior, deck, suite, dining + optional)
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cruiseLines } from '../../data/cruiseLines';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';

const REQUIRED_GALLERY = ['exterior', 'deck', 'suite', 'dining'];
const OPTIONAL_GALLERY = ['pool', 'entertainment', 'spa', 'theater'];

function AdminShipImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [selectedCruiseLine, setSelectedCruiseLine] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);
  const [images, setImages] = useState({});
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
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'ship');

      const imageMap = {};
      data?.forEach(img => {
        if (!imageMap[img.entity_id]) imageMap[img.entity_id] = {};
        imageMap[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });
      setImages(imageMap);
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

  const getShipStatus = (cruiseLineSlug, ship) => {
    const shipKey = `${cruiseLineSlug}/ships/${ship.slug || ship.name.toLowerCase().replace(/\s+/g, '-')}`;
    const shipImages = images[shipKey] || {};
    
    const hasRequired = REQUIRED_GALLERY.every(type => shipImages[type]);
    if (!hasRequired) return 'error';
    
    const allCompliant = Object.values(shipImages).every(img => img.seo_compliant);
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

  // Cruise lines that have ships
  const cruiseLinesWithShips = cruiseLines.filter(cl => cl.fleet && cl.fleet.length > 0);

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={loadImages}
      isRefreshing={isRefreshing}
    >
      <div className="admin-images-page">
        {!selectedCruiseLine ? (
          <>
            <header className="admin-page-header">
              <Link to="/admin/images" className="back-link">
                <ArrowLeft size={18} />
                Back to Image Management
              </Link>
              <h1 className="admin-page-title">Ship Images</h1>
              <p className="admin-page-subtitle">Select a cruise line to manage ship images</p>
            </header>

            {loading ? (
              <div className="admin-loading">
                <div className="admin-loading-spinner" />
                <p>Loading...</p>
              </div>
            ) : (
              <div className="entity-grid">
                {cruiseLinesWithShips.map(cl => (
                  <button
                    key={cl.slug}
                    className="entity-card"
                    onClick={() => setSelectedCruiseLine(cl)}
                  >
                    <h3>{cl.name}</h3>
                    <p className="entity-card-subtitle">{cl.fleet.length} ships</p>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : !selectedShip ? (
          <>
            <header className="admin-page-header">
              <button className="back-btn" onClick={() => setSelectedCruiseLine(null)}>
                <ArrowLeft size={16} /> Back to Cruise Lines
              </button>
              <h1 className="admin-page-title">{selectedCruiseLine.name} - Ships</h1>
              <p className="admin-page-subtitle">Select a ship to manage images</p>
            </header>

            <div className="entity-grid">
              {selectedCruiseLine.fleet.map(ship => {
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
        ) : (
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedShip(null)}>
              <ArrowLeft size={16} /> Back to {selectedCruiseLine.name}
            </button>

            <h2 className="entity-detail-title">{selectedShip.name}</h2>
            <p style={{ color: 'var(--admin-text-muted)', marginBottom: '1.5rem' }}>{selectedCruiseLine.name}</p>

            {(() => {
              const shipSlug = selectedShip.slug || selectedShip.name.toLowerCase().replace(/\s+/g, '-');
              const shipEntityId = `${selectedCruiseLine.slug}/ships/${shipSlug}`;
              const shipImages = images[shipEntityId] || {};

              return (
                <div className="images-list">
                  <h3 style={{ color: 'var(--admin-text)', marginBottom: '1rem' }}>Required Gallery Images</h3>
                  {REQUIRED_GALLERY.map(type => (
                    <div key={type} className="admin-card image-card">
                      <div className="image-card-header">
                        <div className="image-card-title">
                          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                          <span className="badge badge-required">Required</span>
                        </div>
                        <StatusIndicator 
                          status={shipImages[type] ? 'pass' : 'missing'} 
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
                        existingImage={shipImages[type]?.url}
                        existingData={shipImages[type]}
                        onUploadComplete={loadImages}
                      />
                    </div>
                  ))}

                  <h3 style={{ color: 'var(--admin-text)', margin: '2rem 0 1rem' }}>Optional Gallery Images</h3>
                  {OPTIONAL_GALLERY.map(type => (
                    <div key={type} className="admin-card image-card">
                      <div className="image-card-header">
                        <div className="image-card-title">
                          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                          <span className="badge badge-optional">Optional</span>
                        </div>
                        <StatusIndicator 
                          status={shipImages[type] ? 'pass' : 'missing'} 
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
                        existingImage={shipImages[type]?.url}
                        existingData={shipImages[type]}
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
        }

        .entity-card h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--admin-text);
        }

        .entity-card-subtitle {
          margin: 0.5rem 0 0;
          font-size: 0.875rem;
          color: var(--admin-text-muted);
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
          margin: 0 0 0.5rem 0;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminShipImages;
