/**
 * Admin Bucket List Images Page
 * Manages bucket list experience images (hero, card, OG images, and gallery images)
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
import './AdminImagesShared.css';

function AdminBucketListImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [images, setImages] = useState({});
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
   * Get image for bucket list experience (bucket list images only - no sharing)
   */
  const getImage = (experienceId, imageType) => {
    // Only return bucket list-specific images
    return images[experienceId]?.[imageType] || null;
  };

  /**
   * Get status for bucket list experience
   * Checks only bucket list-specific images (no sharing)
   */
  const getExperienceStatus = (experienceId) => {
    const hero = getImage(experienceId, 'hero');
    const card = getImage(experienceId, 'card');
    
    // If missing both required images, return missing
    if (!hero || !card) return 'missing';
    
    // Check SEO compliance for required images
    const hasWarnings = (hero && !hero.seo_compliant) || (card && !card.seo_compliant);
    return hasWarnings ? 'warning' : 'pass';
  };

  /**
   * Count gallery images for an experience
   */
  const getGalleryCount = (experienceId) => {
    let count = 0;
    if (getImage(experienceId, 'gallery-1')) count++;
    if (getImage(experienceId, 'gallery-2')) count++;
    if (getImage(experienceId, 'gallery-3')) count++;
    return count;
  };

  /**
   * Get OG image for bucket list experience
   */
  const getOgImage = (experienceId) => {
    return getImage(experienceId, 'og-image');
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
          <p className="admin-page-subtitle">Manage hero, card, OG, and gallery images for all {experiences.length} bucket list experiences</p>
          <div style={{ 
            background: 'var(--admin-card-bg)', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginTop: '1rem',
            border: '1px solid var(--admin-border)'
          }}>
            <strong style={{ color: 'var(--admin-accent)' }}>Image Requirements:</strong>
            <ul style={{ margin: '0.5rem 0 0 1.5rem', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
              <li><strong>Hero</strong> (Required): Large banner image for experience page header - dramatic, wide landscape</li>
              <li><strong>Card</strong> (Required): Thumbnail for bucket list overview cards - iconic, recognizable scene</li>
              <li><strong>Gallery 1</strong> (Recommended): Scenery/landscape image showcasing the destination</li>
              <li><strong>Gallery 2</strong> (Recommended): Wildlife/nature image or cultural experience</li>
              <li><strong>Gallery 3</strong> (Recommended): Activity/experience image showing what travellers will do</li>
              <li><strong>OG Image</strong> (Optional): Social media sharing image (defaults to hero if not set)</li>
            </ul>
          </div>
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
                      const ogImage = getOgImage(experience.id);
                      const galleryCount = getGalleryCount(experience.id);
                      return (
                        <>
                          <span className={hero ? 'stat-ok' : 'stat-missing'}>
                            Hero
                          </span>
                          <span className={card ? 'stat-ok' : 'stat-missing'}>
                            Card
                          </span>
                          {ogImage && (
                            <span className="stat-ok">OG</span>
                          )}
                          <span className={galleryCount === 3 ? 'stat-ok' : galleryCount > 0 ? 'stat-warning' : 'stat-missing'}>
                            Gallery {galleryCount}/3
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
                  Main banner for bucket list experience page - should be dramatic, wide landscape
                  <br />Required: 1920×1080px, WebP format preferred
                  <br /><strong>Examples:</strong> Dramatic iceberg (Antarctica), cherry blossoms with temple (Japan), northern lights over fjord (Arctic)
                </p>
                {(() => {
                  const hero = getImage(selectedExperience.id, 'hero');
                  
                  return (
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
                  Thumbnail for bucket list experience cards - should be iconic and instantly recognizable
                  <br />Required: 600×400px, WebP format preferred
                  <br /><strong>Examples:</strong> Penguin colony (Antarctica), Opera House (Australia), Queen Mary 2 (Transatlantic)
                </p>
                {(() => {
                  const card = getImage(selectedExperience.id, 'card');
                  
                  return (
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
                  );
                })()}
              </div>

              {/* OG Image */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>OG Image (Social Sharing)</h3>
                    <span className="badge badge-optional">Optional</span>
                  </div>
                  {(() => {
                    const ogImage = getOgImage(selectedExperience.id);
                    return (
                      <StatusIndicator 
                        status={ogImage ? (ogImage.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                        size="small" 
                      />
                    );
                  })()}
                </div>
                <p className="image-card-specs">
                  Optimized image for social media sharing (Facebook, Twitter, LinkedIn)
                  <br />Required: 1200×630px, WebP format preferred
                  <br />If not provided, hero image will be used for social sharing
                </p>
                {(() => {
                  const ogImage = getOgImage(selectedExperience.id);
                  
                  return (
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CATEGORIES}
                      entityType="bucket-list"
                      entityId={selectedExperience.id}
                      imageType="og-image"
                      suggestedAltText={`${selectedExperience.title} - Social sharing image`}
                      existingImage={ogImage?.url}
                      existingData={ogImage}
                      onUploadComplete={handleUploadComplete}
                    />
                  );
                })()}
              </div>

              {/* Gallery Section Header */}
              <div className="gallery-section-header">
                <h3>Gallery Images</h3>
                <p>These images appear on the experience page to showcase the destination. All three are recommended for best presentation.</p>
              </div>

              {/* Gallery Image 1 */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Gallery Image 1</h3>
                    <span className="badge badge-recommended">Recommended</span>
                  </div>
                  {(() => {
                    const gallery1 = getImage(selectedExperience.id, 'gallery-1');
                    return (
                      <StatusIndicator 
                        status={gallery1 ? (gallery1.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                        size="small" 
                      />
                    );
                  })()}
                </div>
                <p className="image-card-specs">
                  Primary gallery image - featured prominently
                  <br />Required: 1200×800px, WebP format preferred
                  <br />Suggested: Landscape/scenery shot
                </p>
                {(() => {
                  const gallery1 = getImage(selectedExperience.id, 'gallery-1');
                  
                  return (
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CATEGORIES}
                      entityType="bucket-list"
                      entityId={selectedExperience.id}
                      imageType="gallery-1"
                      suggestedAltText={`${selectedExperience.title} - Scenery`}
                      existingImage={gallery1?.url}
                      existingData={gallery1}
                      onUploadComplete={handleUploadComplete}
                    />
                  );
                })()}
              </div>

              {/* Gallery Image 2 */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Gallery Image 2</h3>
                    <span className="badge badge-recommended">Recommended</span>
                  </div>
                  {(() => {
                    const gallery2 = getImage(selectedExperience.id, 'gallery-2');
                    return (
                      <StatusIndicator 
                        status={gallery2 ? (gallery2.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                        size="small" 
                      />
                    );
                  })()}
                </div>
                <p className="image-card-specs">
                  Secondary gallery image
                  <br />Required: 1200×800px, WebP format preferred
                  <br />Suggested: Wildlife or activity shot
                </p>
                {(() => {
                  const gallery2 = getImage(selectedExperience.id, 'gallery-2');
                  
                  return (
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CATEGORIES}
                      entityType="bucket-list"
                      entityId={selectedExperience.id}
                      imageType="gallery-2"
                      suggestedAltText={`${selectedExperience.title} - Wildlife`}
                      existingImage={gallery2?.url}
                      existingData={gallery2}
                      onUploadComplete={handleUploadComplete}
                    />
                  );
                })()}
              </div>

              {/* Gallery Image 3 */}
              <div className="admin-card image-card">
                <div className="image-card-header">
                  <div className="image-card-title">
                    <h3>Gallery Image 3</h3>
                    <span className="badge badge-recommended">Recommended</span>
                  </div>
                  {(() => {
                    const gallery3 = getImage(selectedExperience.id, 'gallery-3');
                    return (
                      <StatusIndicator 
                        status={gallery3 ? (gallery3.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                        size="small" 
                      />
                    );
                  })()}
                </div>
                <p className="image-card-specs">
                  Third gallery image
                  <br />Required: 1200×800px, WebP format preferred
                  <br />Suggested: Experience/atmosphere shot
                </p>
                {(() => {
                  const gallery3 = getImage(selectedExperience.id, 'gallery-3');
                  
                  return (
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CATEGORIES}
                      entityType="bucket-list"
                      entityId={selectedExperience.id}
                      imageType="gallery-3"
                      suggestedAltText={`${selectedExperience.title} - Experience`}
                      existingImage={gallery3?.url}
                      existingData={gallery3}
                      onUploadComplete={handleUploadComplete}
                    />
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

          .stat-warning {
            background: rgba(251, 191, 36, 0.1);
            color: var(--admin-warning);
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

          .gallery-section-header {
            margin: 2rem 0 1rem 0;
            padding: 1rem 0;
            border-top: 1px solid var(--admin-border);
          }

          .gallery-section-header h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--admin-text);
          }

          .gallery-section-header p {
            margin: 0;
            font-size: 0.875rem;
            color: var(--admin-text-muted);
          }

          .badge-recommended {
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminBucketListImages;
