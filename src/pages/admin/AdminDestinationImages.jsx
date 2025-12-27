/**
 * Admin Destination Images Page
 * Manages images for all 30 destinations
 */

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
import './AdminImagesShared.css';

function AdminDestinationImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [images, setImages] = useState({});
  const [selectedDestination, setSelectedDestination] = useState(null);
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

  const getDestinationStatus = (slug) => {
    const destImages = images[slug] || {};
    const hasHero = !!destImages.hero;
    const hasCard = !!destImages.card;
    
    if (!hasHero || !hasCard) return 'error';
    if (destImages.hero?.seo_compliant && destImages.card?.seo_compliant) return 'pass';
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
        <header className="admin-page-header">
          <Link to="/admin/images" className="back-link">
            <ArrowLeft size={18} />
            Back to Image Management
          </Link>
          <h1 className="admin-page-title">Destination Images</h1>
          <p className="admin-page-subtitle">Manage hero and card images for all 30 destinations</p>
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
            
            <div className="images-list">
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
                <p className="image-card-specs">Recommended: 1920×1080px, WebP format</p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.DESTINATIONS}
                  entityType="destination"
                  entityId={selectedDestination.slug}
                  imageType="hero"
                  suggestedAltText={`${selectedDestination.name} cruise destination`}
                  existingImage={images[selectedDestination.slug]?.hero?.url}
                  existingData={images[selectedDestination.slug]?.hero}
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
                    status={images[selectedDestination.slug]?.card ? 'pass' : 'missing'} 
                    size="small" 
                  />
                </div>
                <p className="image-card-specs">Recommended: 600×400px, WebP format</p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.DESTINATIONS}
                  entityType="destination"
                  entityId={selectedDestination.slug}
                  imageType="card"
                  suggestedAltText={`${selectedDestination.name} cruise card`}
                  existingImage={images[selectedDestination.slug]?.card?.url}
                  existingData={images[selectedDestination.slug]?.card}
                  onUploadComplete={loadImages}
                />
              </div>

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
                <p className="image-card-specs">Recommended: 768×1024px, WebP format</p>
                <ImageUpload
                  bucket={STORAGE_BUCKETS.DESTINATIONS}
                  entityType="destination"
                  entityId={selectedDestination.slug}
                  imageType="mobile"
                  suggestedAltText={`${selectedDestination.name} mobile hero`}
                  existingImage={images[selectedDestination.slug]?.mobile?.url}
                  existingData={images[selectedDestination.slug]?.mobile}
                  onUploadComplete={loadImages}
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
          margin: 0 0 1.5rem 0;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminDestinationImages;
