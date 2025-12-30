/**
 * Admin Bucket List Images Page
 * Manages bucket list experience images (hero, card, and gallery images)
 * Matches the destinations page layout exactly
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import { bucketListExperiences } from '../../data/bucketList';
import { getDestinationForBucketList } from '../../config/bucketListDestinationMapping';
import './AdminImagesShared.css';

function AdminBucketListImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [images, setImages] = useState({});
  const [destinationImages, setDestinationImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get bucket list experiences sorted A-Z
  const experiences = bucketListExperiences
    .sort((a, b) => a.title.localeCompare(b.title));

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadImages = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Load bucket list images
      const { data: bucketListData } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'bucket-list');

      const imagesByExperience = {};
      bucketListData?.forEach(img => {
        if (!imagesByExperience[img.entity_id]) {
          imagesByExperience[img.entity_id] = {};
        }
        imagesByExperience[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });

      setImages(imagesByExperience);

      // Load destination images for sharing
      const { data: destinationData } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'destination')
        .in('image_type', ['hero', 'card']);

      const destImagesBySlug = {};
      destinationData?.forEach(img => {
        if (!destImagesBySlug[img.entity_id]) {
          destImagesBySlug[img.entity_id] = {};
        }
        destImagesBySlug[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });

      setDestinationImages(destImagesBySlug);
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

  /**
   * Get image for bucket list experience, checking destination images if not found
   */
  const getImage = (experienceId, imageType) => {
    // First check bucket list images
    if (images[experienceId]?.[imageType]) {
      return images[experienceId][imageType];
    }
    
    // Check if we can use destination images
    const destinationSlug = getDestinationForBucketList(experienceId);
    if (destinationSlug && destinationImages[destinationSlug]?.[imageType]) {
      return {
        ...destinationImages[destinationSlug][imageType],
        sharedFrom: 'destination',
        sharedDestination: destinationSlug
      };
    }
    
    return null;
  };

  /**
   * Get status for bucket list experience
   * Checks both bucket list images and destination fallback images
   */
  const getExperienceStatus = (experienceId) => {
    const hero = getImage(experienceId, 'hero');
    const card = getImage(experienceId, 'card');
    
    // Check if using destination fallback
    const destinationSlug = getDestinationForBucketList(experienceId);
    let hasHero = !!hero;
    let hasCard = !!card;
    
    // If missing and has destination mapping, check destination images
    if (destinationSlug) {
      if (!hasHero) {
        const destHero = destinationImages[`${destinationSlug}-hero`];
        hasHero = !!destHero;
      }
      if (!hasCard) {
        const destCard = destinationImages[`${destinationSlug}-card`];
        hasCard = !!destCard;
      }
    }
    
    // If still missing both, return missing
    if (!hasHero || !hasCard) return 'missing';
    
    // Check SEO compliance (only for actual bucket list images, not fallbacks)
    const hasWarnings = (hero && !hero.seo_compliant) || (card && !card.seo_compliant);
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
          <h1 className="admin-page-title">Bucket List Experience Images</h1>
          <p className="admin-page-subtitle">Manage hero and card images for all {experiences.length} bucket list experiences</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading experiences...</p>
          </div>
        ) : !selectedExperience ? (
          <div className="entity-grid">
            {experiences.map(experience => {
              const hero = getImage(experience.id, 'hero');
              const card = getImage(experience.id, 'card');
              
              return (
                <button
                  key={experience.id}
                  className="entity-card"
                  onClick={() => setSelectedExperience(experience)}
                >
                  <div className="entity-card-header">
                    <h3>{experience.title}</h3>
                    <StatusIndicator status={getExperienceStatus(experience.id)} size="small" />
                  </div>
                  <p className="entity-card-stats">
                    {(() => {
                      const destinationSlug = getDestinationForBucketList(experience.id);
                      const hasHero = hero || (destinationSlug && destinationImages[destinationSlug]?.['hero']);
                      const hasCard = card || (destinationSlug && destinationImages[destinationSlug]?.['card']);
                      return (
                        <>
                          <span className={hasHero ? 'stat-ok' : 'stat-missing'}>
                            Hero {hero?.sharedFrom === 'destination' ? '(shared)' : ''}
                          </span>
                          <span className={hasCard ? 'stat-ok' : 'stat-missing'}>
                            Card {card?.sharedFrom === 'destination' ? '(shared)' : ''}
                          </span>
                        </>
                      );
                    })()}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedExperience(null)}>
              <ArrowLeft size={16} /> Back to Bucket List
            </button>
            
            <h2 className="entity-detail-title">{selectedExperience.title}</h2>
            <p style={{ 
              color: 'var(--admin-text-muted)', 
              marginBottom: '2rem',
              fontSize: '0.875rem'
            }}>
              {selectedExperience.duration} • {selectedExperience.tagline}
            </p>

            {/* Check if images are shared from destination */}
            {(() => {
              const destinationSlug = getDestinationForBucketList(selectedExperience.id);
              const hero = getImage(selectedExperience.id, 'hero');
              const card = getImage(selectedExperience.id, 'card');
              const isSharing = (hero?.sharedFrom === 'destination') || (card?.sharedFrom === 'destination');
              
              if (isSharing && destinationSlug) {
                return (
                  <div style={{
                    background: 'var(--admin-bg-secondary)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--admin-text-muted)'
                  }}>
                    <strong style={{ color: 'var(--admin-text)' }}>ℹ️ Image Sharing:</strong> This experience shares images with the <strong>{destinationSlug}</strong> destination. 
                    Upload bucket list-specific images below to override, or continue using destination images.
                  </div>
                );
              }
              return null;
            })()}

            <div className="images-list">
              {/* Hero Image */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Hero Image</h3>
                    <span className="badge badge-required">Required</span>
                  </div>
                  {(() => {
                    const hero = getImage(selectedExperience.id, 'hero');
                    return (
                      <StatusIndicator 
                        status={hero ? (hero.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                        size="small" 
                      />
                    );
                  })()}
                </div>
                <p className="image-card-specs">
                  Main banner for bucket list experience page
                  <br />Recommended: 1920×1080px, WebP format
                </p>
                {(() => {
                  const hero = getImage(selectedExperience.id, 'hero');
                  const isShared = hero?.sharedFrom === 'destination';
                  
                  return (
                    <>
                      {isShared && (
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '6px',
                          padding: '0.75rem',
                          marginBottom: '1rem',
                          fontSize: '0.8125rem',
                          color: 'var(--admin-text-muted)'
                        }}>
                          📎 Currently using shared image from destination. Upload below to use bucket list-specific image.
                        </div>
                      )}
                      <ImageUpload
                        bucket={STORAGE_BUCKETS.CATEGORIES}
                        entityType="bucket-list"
                        entityId={selectedExperience.id}
                        imageType="hero"
                        suggestedAltText={`${selectedExperience.title} - Hero image`}
                        existingImage={hero?.url}
                        existingData={hero}
                        onUploadComplete={handleUploadComplete}
                      />
                    </>
                  );
                })()}
              </div>
              
              {/* Card Image */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Card Image</h3>
                    <span className="badge badge-required">Required</span>
                  </div>
                  {(() => {
                    const card = getImage(selectedExperience.id, 'card');
                    return (
                      <StatusIndicator 
                        status={card ? (card.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                        size="small" 
                      />
                    );
                  })()}
                </div>
                <p className="image-card-specs">
                  Thumbnail for bucket list experience cards
                  <br />Recommended: 600×400px, WebP format
                </p>
                {(() => {
                  const card = getImage(selectedExperience.id, 'card');
                  const isShared = card?.sharedFrom === 'destination';
                  
                  return (
                    <>
                      {isShared && (
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '6px',
                          padding: '0.75rem',
                          marginBottom: '1rem',
                          fontSize: '0.8125rem',
                          color: 'var(--admin-text-muted)'
                        }}>
                          📎 Currently using shared image from destination. Upload below to use bucket list-specific image.
                        </div>
                      )}
                      <ImageUpload
                        bucket={STORAGE_BUCKETS.CATEGORIES}
                        entityType="bucket-list"
                        entityId={selectedExperience.id}
                        imageType="card"
                        suggestedAltText={`${selectedExperience.title} - Card image`}
                        existingImage={card?.url}
                        existingData={card}
                        onUploadComplete={handleUploadComplete}
                      />
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        <style>{`
          .entity-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
            display: block;
            width: 100%;
            color: inherit;
            text-decoration: none;
          }

          .entity-card:hover {
            border-color: var(--admin-primary);
            transform: translateY(-2px);
          }

          .entity-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .entity-card h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: var(--admin-text);
          }

          .entity-card-stats {
            margin: 0;
            display: flex;
            gap: 0.75rem;
            font-size: 0.8125rem;
          }

          .entity-card-stats span {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-weight: 500;
          }

          .stat-ok {
            background: rgba(16, 185, 129, 0.1);
            color: var(--admin-success);
          }

          .stat-missing {
            background: rgba(239, 68, 68, 0.1);
            color: var(--admin-error);
          }

          .entity-detail {
            margin-top: 1rem;
          }

          .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: transparent;
            border: 1px solid var(--admin-border);
            border-radius: 6px;
            padding: 0.5rem 1rem;
            color: var(--admin-text-muted);
            cursor: pointer;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
            transition: all 0.2s;
          }

          .back-btn:hover {
            border-color: var(--admin-primary);
            color: var(--admin-text);
          }

          .entity-detail-title {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--admin-text);
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminBucketListImages;
