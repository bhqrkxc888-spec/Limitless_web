/**
 * Admin Cruise Line Images Page
 * Manages images for all 57 cruise lines (logos, heroes, cards)
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

function AdminCruiseLineImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [images, setImages] = useState({});
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
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'cruise-line');

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

  const getCruiseLineStatus = (slug) => {
    const clImages = images[slug] || {};
    const hasLogo = !!clImages.logo;
    const hasHero = !!clImages.hero;
    const hasCard = !!clImages.card;
    
    if (!hasLogo || !hasHero || !hasCard) return 'error';
    if (clImages.logo?.seo_compliant && clImages.hero?.seo_compliant && clImages.card?.seo_compliant) return 'pass';
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
          <h1 className="admin-page-title">Cruise Line Images</h1>
          <p className="admin-page-subtitle">Manage logos, heroes, and cards for all {cruiseLines.length} cruise lines</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading cruise lines...</p>
          </div>
        ) : !selectedCruiseLine ? (
          <div className="entity-grid">
            {cruiseLines.map(cl => (
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
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedCruiseLine(null)}>
              <ArrowLeft size={16} /> Back to Cruise Lines
            </button>
            
            <h2 className="entity-detail-title">{selectedCruiseLine.name}</h2>
            
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
