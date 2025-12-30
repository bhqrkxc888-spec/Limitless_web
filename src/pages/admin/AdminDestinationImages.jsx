import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { destinations } from '../../config/destinations';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import { getCruiseLinesForDestination } from '../../config/destinationCruiseLines';
import './AdminImagesShared.css';

function AdminDestinationImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [selectedDestination, setSelectedDestination] = useState(null);
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
        .eq('entity_type', 'destination');

      const imagesByDestination = {};
      data?.forEach(img => {
        if (!imagesByDestination[img.entity_id]) {
          imagesByDestination[img.entity_id] = {};
        }
        imagesByDestination[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });

      setImages(imagesByDestination);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error loading destination images:', error);
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

  const getDestinationStatus = (slug) => {
    const destImages = images[slug];
    if (!destImages) return 'missing';
    
    const hasRequired = destImages.hero && destImages.card;
    if (!hasRequired) return 'missing';
    
    const hasWarnings = Object.values(destImages).some(img => !img.seo_compliant);
    return hasWarnings ? 'warning' : 'pass';
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
          <h1 className="admin-page-title">Destination Images</h1>
          <p className="admin-page-subtitle">Manage hero, card, and cruise-line-specific images for all destinations</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading destinations...</p>
          </div>
        ) : !selectedDestination ? (
          <div className="entity-grid">
            {[...destinations]
              .sort((a, b) => {
                const nameA = (a.name || '').toLowerCase();
                const nameB = (b.name || '').toLowerCase();
                return nameA.localeCompare(nameB);
              })
              .map(dest => (
              <button
                key={dest.slug}
                className="entity-card"
                onClick={() => setSelectedDestination(dest)}
              >
                <div className="entity-card-header">
                  <h3>{dest.name}</h3>
                  <StatusIndicator status={getDestinationStatus(dest.slug)} size="small" />
                </div>
                <p className="entity-card-stats">
                  <span className={images[dest.slug]?.hero ? 'stat-ok' : 'stat-missing'}>Hero</span>
                  <span className={images[dest.slug]?.card ? 'stat-ok' : 'stat-missing'}>Card</span>
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedDestination(null)}>
              <ArrowLeft size={16} /> Back to Destinations
            </button>
            
            <h2 className="entity-detail-title">{selectedDestination.name}</h2>
            <p style={{ 
              marginBottom: '2rem', 
              color: 'var(--admin-text-muted)',
              fontSize: '0.9375rem',
              lineHeight: '1.5'
            }}>
              Upload a <strong>hero</strong> and <strong>card</strong> image for the main destination page, 
              then add <strong>cruise-line-specific cards</strong> to show different images on each cruise line's destination grid.
              Plus <strong>4 gallery slots</strong> for general site use.
            </p>
            
            <div className="images-list">
              {/* Hero Image */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Hero Image</h3>
                    <span className="badge badge-required">Required</span>
                  </div>
                  <StatusIndicator 
                    status={images[selectedDestination.slug]?.hero ? 'pass' : 'missing'} 
                    size="small" 
                  />
                </div>
                <p className="image-card-specs">
                  Main banner for destination page
                  <br />Recommended: 1920×1080px, WebP format
                </p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.DESTINATIONS}
                  entityType="destination"
                  entityId={selectedDestination.slug}
                  imageType="hero"
                  suggestedAltText={`${selectedDestination.name} cruise destination`}
                  existingImage={images[selectedDestination.slug]?.hero?.url}
                  existingData={images[selectedDestination.slug]?.hero}
                  onUploadComplete={handleUploadComplete}
                />
              </div>
              
              {/* Card Image */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Card Image (Default)</h3>
                    <span className="badge badge-required">Required</span>
                  </div>
                  <StatusIndicator 
                    status={images[selectedDestination.slug]?.card ? 'pass' : 'missing'} 
                    size="small" 
                  />
                </div>
                <p className="image-card-specs">
                  Default thumbnail for destination listings (used if no cruise-line-specific card exists)
                  <br />Recommended: 600×400px, WebP format
                </p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.DESTINATIONS}
                  entityType="destination"
                  entityId={selectedDestination.slug}
                  imageType="card"
                  suggestedAltText={`${selectedDestination.name} cruise card`}
                  existingImage={images[selectedDestination.slug]?.card?.url}
                  existingData={images[selectedDestination.slug]?.card}
                  onUploadComplete={handleUploadComplete}
                />
              </div>

              {/* Cruise Line Specific Cards - Only show lines that actually go to this destination */}
              {(() => {
                const cruiseLinesForDest = getCruiseLinesForDestination(selectedDestination.slug);
                
                if (cruiseLinesForDest.length === 0) {
                  return null; // No cruise-line-specific cards for this destination
                }
                
                return (
                  <div style={{
                    background: 'var(--admin-bg-secondary)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginTop: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--admin-text)',
                      marginBottom: '0.5rem'
                    }}>
                      Cruise Line Specific Cards
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--admin-text-muted)',
                      marginBottom: '1.5rem',
                      lineHeight: '1.5'
                    }}>
                      Only showing cruise lines that actually sail to {selectedDestination.name}. 
                      Upload different images for each line to show variety on their destination grids.
                    </p>

                    {cruiseLinesForDest.map((cruiseLine) => (
                      <div key={cruiseLine.slug} className="admin-card image-card" style={{ marginBottom: '1rem' }}>
                        <div className="image-card-header">
                          <div className="image-card-title">
                            <h3>{cruiseLine.shortName} Card</h3>
                            <span 
                              className={`badge ${cruiseLine.priority >= 9 ? 'badge-required' : cruiseLine.priority >= 7 ? 'badge-warning' : 'badge-optional'}`}
                              title={`Priority ${cruiseLine.priority}/10`}
                            >
                              P{cruiseLine.priority}
                            </span>
                            {cruiseLine.type !== 'mainstream' && (
                              <span className="badge badge-info" style={{ marginLeft: '0.25rem', fontSize: '0.65rem' }}>
                                {cruiseLine.type === 'luxury' ? '⭐ Luxury' : 
                                 cruiseLine.type === 'expedition' ? '🧭 Expedition' : 
                                 '⭐🧭 Lux/Exp'}
                              </span>
                            )}
                          </div>
                          <StatusIndicator 
                            status={images[selectedDestination.slug]?.[`card-${cruiseLine.slug}`] ? 'pass' : 'missing'} 
                            size="small" 
                          />
                        </div>
                        <p className="image-card-specs">
                          Shown on {cruiseLine.name} destination grid • 600×400px, WebP
                        </p>
                        <ImageUpload
                          bucket={STORAGE_BUCKETS.DESTINATIONS}
                          entityType="destination"
                          entityId={selectedDestination.slug}
                          imageType={`card-${cruiseLine.slug}`}
                          suggestedAltText={`${selectedDestination.name} cruise for ${cruiseLine.name}`}
                          existingImage={images[selectedDestination.slug]?.[`card-${cruiseLine.slug}`]?.url}
                          existingData={images[selectedDestination.slug]?.[`card-${cruiseLine.slug}`]}
                          onUploadComplete={handleUploadComplete}
                        />
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* General Gallery Images */}
              <div style={{
                background: 'var(--admin-bg-secondary)',
                border: '1px solid var(--admin-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginTop: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--admin-text)',
                  marginBottom: '0.5rem'
                }}>
                  General Gallery Images
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--admin-text-muted)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Additional images for general site use (blog posts, promotional materials, etc.)
                </p>

                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="admin-card image-card" style={{ marginBottom: '1rem' }}>
                    <div className="image-card-header">
                      <div className="image-card-title">
                        <h3>Gallery Image {num}</h3>
                        <span className="badge badge-optional">Optional</span>
                      </div>
                      <StatusIndicator 
                        status={images[selectedDestination.slug]?.[`gallery-${num}`] ? 'pass' : 'missing'} 
                        size="small" 
                      />
                    </div>
                    <p className="image-card-specs">600×400px, WebP format</p>
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.DESTINATIONS}
                      entityType="destination"
                      entityId={selectedDestination.slug}
                      imageType={`gallery-${num}`}
                      suggestedAltText={`${selectedDestination.name} destination gallery image ${num}`}
                      existingImage={images[selectedDestination.slug]?.[`gallery-${num}`]?.url}
                      existingData={images[selectedDestination.slug]?.[`gallery-${num}`]}
                      onUploadComplete={handleUploadComplete}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Hero */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Mobile Hero</h3>
                    <span className="badge badge-optional">Optional</span>
                  </div>
                  <StatusIndicator 
                    status={images[selectedDestination.slug]?.mobile ? 'pass' : 'missing'} 
                    size="small" 
                  />
                </div>
                <p className="image-card-specs">Vertical format for mobile devices • 768×1024px, WebP format</p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.DESTINATIONS}
                  entityType="destination"
                  entityId={selectedDestination.slug}
                  imageType="mobile"
                  suggestedAltText={`${selectedDestination.name} mobile hero`}
                  existingImage={images[selectedDestination.slug]?.mobile?.url}
                  existingData={images[selectedDestination.slug]?.mobile}
                  onUploadComplete={handleUploadComplete}
                />
              </div>
            </div>
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
          gap: 1rem;
          margin: 0;
          font-size: 0.8125rem;
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
          margin: 0 0 0.5rem 0;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminDestinationImages;
