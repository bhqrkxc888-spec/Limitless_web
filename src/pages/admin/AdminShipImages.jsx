/**
 * Admin Ship Images Page
 * Manages ship images for cruise guides (P&O Iona, future ships)
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ship, CheckCircle, AlertTriangle, XCircle, Link as LinkIcon } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import ImageSelector from '../../components/admin/ImageSelector';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';

/**
 * Ships data - expandable for future ships
 */
const SHIPS = [
  {
    id: 'iona',
    name: 'P&O Iona',
    operator: 'P&O Cruises',
    description: 'P&O Cruises flagship ship, 5,200 guests, 184,700 tonnes'
  }
  // Future ships can be added here
];

/**
 * Image types for ship pages
 */
const SHIP_IMAGE_TYPES = [
  { id: 'hero', label: 'Ship Exterior', required: true, specs: 'Main ship exterior shot. Required: 1920×1080px, WebP format' },
  { id: 'atrium', label: 'Grand Atrium', required: false, specs: 'Main atrium interior. 1200×800px, WebP format' },
  { id: 'pool-skydome', label: 'SkyDome Pool', required: false, specs: 'Main pool area. 1200×800px, WebP format' },
  { id: 'pool-infinity', label: 'Infinity Pool', required: false, specs: 'Infinity pool. 1200×800px, WebP format' },
  { id: 'pool-retreat', label: 'The Retreat', required: false, specs: 'Adults-only area. 1200×800px, WebP format' },
  { id: 'restaurant-quays', label: 'The Quays', required: false, specs: 'Food market area. 1200×800px, WebP format' },
  { id: 'restaurant-horizon', label: 'Horizon Buffet', required: false, specs: 'Main buffet. 1200×800px, WebP format' },
  { id: 'restaurant-epicurean', label: 'The Epicurean', required: false, specs: 'Fine dining venue. 1200×800px, WebP format' },
  { id: 'restaurant-sindhu', label: 'Sindhu', required: false, specs: 'Indian restaurant. 1200×800px, WebP format' },
  { id: 'bar-710', label: '710 Club', required: false, specs: 'Live music venue. 1200×800px, WebP format' },
  { id: 'bar-andersons', label: "Anderson's Bar", required: false, specs: 'Library bar. 1200×800px, WebP format' },
  { id: 'bar-sunset', label: 'Sunset Bar', required: false, specs: 'Aft bar. 1200×800px, WebP format' },
  { id: 'bar-crows-nest', label: "Crow's Nest", required: false, specs: 'Observation bar. 1200×800px, WebP format' },
  { id: 'theatre', label: 'Headliners Theatre', required: false, specs: 'Main theatre. 1200×800px, WebP format' },
  { id: 'cinema', label: 'Ocean Studios', required: false, specs: 'Cinema. 1200×800px, WebP format' },
  { id: 'spa', label: 'Oasis Spa', required: false, specs: 'Spa area. 1200×800px, WebP format' },
  { id: 'gym', label: 'Oasis Gym', required: false, specs: 'Fitness centre. 1200×800px, WebP format' },
  { id: 'kids-reef', label: 'The Reef Kids Club', required: false, specs: 'Kids club area. 1200×800px, WebP format' },
  { id: 'cabin-balcony', label: 'Balcony Cabin', required: false, specs: 'Example cabin. 1200×800px, WebP format' },
  { id: 'cabin-suite', label: 'Suite', required: false, specs: 'Suite example. 1200×800px, WebP format' },
  { id: 'promenade', label: 'Promenade Deck', required: false, specs: 'Deck 8 promenade. 1200×800px, WebP format' },
  { id: 'deck-plan', label: 'Deck Overview', required: false, specs: 'Deck plan or overview image. 1200×800px' }
];

function AdminShipImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [selectedShip, setSelectedShip] = useState(null);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(null); // { shipId, imageType }

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

      const imagesByShip = {};
      data?.forEach(img => {
        if (!imagesByShip[img.entity_id]) {
          imagesByShip[img.entity_id] = {};
        }
        imagesByShip[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });

      setImages(imagesByShip);
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

  const handleUploadComplete = () => {
    loadImages();
  };

  const handleSelectExisting = async (selectedImage) => {
    if (!showImageSelector) return;

    try {
      // Create a reference to the existing image for this ship
      const { error } = await supabase
        .from('site_images')
        .insert({
          entity_type: 'ship',
          entity_id: showImageSelector.shipId,
          image_type: showImageSelector.imageType,
          bucket: selectedImage.bucket,
          path: selectedImage.path,
          alt_text: selectedImage.alt_text,
          width: selectedImage.width,
          height: selectedImage.height,
          seo_compliant: selectedImage.seo_compliant,
          validation_warnings: selectedImage.validation_warnings
        });

      if (error) throw error;

      setShowImageSelector(null);
      loadImages();
    } catch (error) {
      console.error('Error linking image:', error);
      alert('Failed to link image. Please try again.');
    }
  };

  /**
   * Get status for a ship
   */
  const getShipStatus = (shipId) => {
    const shipImages = images[shipId] || {};
    const hero = shipImages['hero'];
    
    if (!hero) return 'missing';
    
    const hasWarnings = Object.values(shipImages).some(img => !img.seo_compliant);
    return hasWarnings ? 'warning' : 'pass';
  };

  /**
   * Get image count for a ship
   */
  const getImageCount = (shipId) => {
    return Object.keys(images[shipId] || {}).length;
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
        <header className="admin-page-header">
          <Link to="/admin/images" className="back-link">
            <ArrowLeft size={18} />
            Back to Image Management
          </Link>
          <h1 className="admin-page-title">Ship Images</h1>
          <p className="admin-page-subtitle">Manage images for cruise ships - used in cruise guides and ship pages</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading ships...</p>
          </div>
        ) : !selectedShip ? (
          <>
            {/* Ship List */}
            <div className="entity-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {SHIPS.map(ship => {
                const status = getShipStatus(ship.id);
                const count = getImageCount(ship.id);
                
                return (
                  <button
                    key={ship.id}
                    className="entity-card"
                    onClick={() => setSelectedShip(ship)}
                  >
                    <div className="entity-card-icon">
                      <Ship size={32} />
                    </div>
                    <div className="entity-card-info">
                      <h3 className="entity-card-name">{ship.name}</h3>
                      <p className="entity-card-meta">{ship.operator}</p>
                      <p className="entity-card-count">{count} / {SHIP_IMAGE_TYPES.length} images</p>
                    </div>
                    <div className="entity-card-status">
                      {status === 'pass' && <CheckCircle size={20} className="status-pass" />}
                      {status === 'warning' && <AlertTriangle size={20} className="status-warning" />}
                      {status === 'missing' && <XCircle size={20} className="status-missing" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="admin-help-text" style={{ marginTop: '2rem' }}>
              <h3>About Ship Images</h3>
              <p>These images are used across the website:</p>
              <ul>
                <li><strong>Cruise Guides</strong> - Ship tab content and venue illustrations</li>
                <li><strong>Ship Pages</strong> - Detailed ship information pages</li>
                <li><strong>Marketing</strong> - Promotional content featuring ships</li>
              </ul>
              <p>Images uploaded here can be shared across multiple cruise guides featuring the same ship.</p>
            </div>
          </>
        ) : (
          <>
            {/* Ship Detail View */}
            <div className="entity-detail-header">
              <button 
                className="back-to-list" 
                onClick={() => setSelectedShip(null)}
              >
                <ArrowLeft size={18} />
                Back to Ships
              </button>
              <div className="entity-detail-title">
                <Ship size={28} />
                <div>
                  <h2>{selectedShip.name}</h2>
                  <p>{selectedShip.description}</p>
                </div>
              </div>
              <StatusIndicator status={getShipStatus(selectedShip.id)} />
            </div>

            <div className="images-grid">
              {SHIP_IMAGE_TYPES.map(imageType => {
                const shipImages = images[selectedShip.id] || {};
                const currentImage = shipImages[imageType.id];

                return (
                  <div key={imageType.id} className="image-slot">
                    <div className="image-slot-header">
                      <h4 className="image-slot-title">
                        {imageType.label}
                        {imageType.required && <span className="required-badge">Required</span>}
                      </h4>
                      <p className="image-slot-specs">{imageType.specs}</p>
                    </div>

                    <div className="image-slot-content">
                      {currentImage ? (
                        <div className="image-preview">
                          <img 
                            src={currentImage.url} 
                            alt={`${selectedShip.name} - ${imageType.label}`}
                          />
                          <div className="image-info">
                            <span className="image-dimensions">
                              {currentImage.width && currentImage.height 
                                ? `${currentImage.width}×${currentImage.height}px` 
                                : 'Dimensions unknown'}
                            </span>
                            {currentImage.alt_text && (
                              <span className="image-alt" title={currentImage.alt_text}>
                                Alt: {currentImage.alt_text.substring(0, 30)}...
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="image-placeholder">
                          <Ship size={32} />
                          <span>No image uploaded</span>
                        </div>
                      )}

                      <div className="image-actions">
                        <button
                          className="btn-use-existing"
                          onClick={() => setShowImageSelector({ shipId: selectedShip.id, imageType: imageType.id })}
                          title="Use existing image from another entity"
                        >
                          <LinkIcon size={16} />
                          Use Existing Image
                        </button>
                      </div>

                      <ImageUpload
                        entityType="ship"
                        entityId={selectedShip.id}
                        imageType={imageType.id}
                        bucket={STORAGE_BUCKETS.SHIPS || STORAGE_BUCKETS.SITE_IMAGES}
                        currentImage={currentImage}
                        onUploadComplete={handleUploadComplete}
                        specs={{
                          maxWidth: imageType.id === 'hero' ? 1920 : 1200,
                          maxHeight: imageType.id === 'hero' ? 1080 : 800,
                          format: 'webp'
                        }}
                        suggestedAltText={`${selectedShip.name} - ${imageType.label}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Image Selector Modal */}
        {showImageSelector && (
          <ImageSelector
            entityType="ship"
            imageType={showImageSelector.imageType}
            currentEntityId={showImageSelector.shipId}
            onSelect={handleSelectExisting}
            onCancel={() => setShowImageSelector(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminShipImages;
