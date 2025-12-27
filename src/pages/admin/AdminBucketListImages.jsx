/**
 * Admin Bucket List Images Page
 * Manages bucket list experience images (hero, card, and gallery images)
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  const { slug } = useParams();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get bucket list experiences sorted A-Z
  const experiences = bucketListExperiences
    .sort((a, b) => a.title.localeCompare(b.title));

  const selectedExperience = slug ? experiences.find(exp => exp.slug === slug) : null;

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadImages = useCallback(async () => {
    if (!selectedExperience) return;
    
    setIsRefreshing(true);
    try {
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'bucket-list')
        .eq('entity_id', selectedExperience.id);

      const imageMap = {};
      data?.forEach(img => {
        imageMap[img.image_type] = {
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
  }, [selectedExperience]);

  useEffect(() => {
    if (isAuthenticated) {
      loadImages();
    }
  }, [isAuthenticated, loadImages]);

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

  // If no experience selected, show list
  if (!selectedExperience) {
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
            <p className="admin-page-subtitle">Select an experience to manage its images (hero, card, gallery)</p>
          </header>

          <div className="entity-grid">
            {experiences.map(experience => {
              // Check if images exist for this experience
              const hasImages = false; // TODO: Load actual stats
              
              return (
                <button
                  key={experience.id}
                  onClick={() => navigate(`/admin/images/bucket-list/${experience.slug}`)}
                  className="entity-card"
                >
                  <div className="entity-card-header">
                    <h3>{experience.title}</h3>
                    <StatusIndicator status={hasImages ? 'pass' : 'missing'} size="small" />
                  </div>
                  <p className="entity-card-meta">
                    {experience.duration} • {experience.category}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

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

          .entity-card-meta {
            margin: 0;
            font-size: 0.8125rem;
            color: var(--admin-text-muted);
          }
        `}</style>
      </AdminLayout>
    );
  }

  // Show experience images
  const IMAGE_TYPES = [
    { id: 'hero', type: 'hero', label: 'Hero Image', required: true, dimensions: '1920×1080px' },
    { id: 'card', type: 'card', label: 'Card Image', required: true, dimensions: '600×400px' },
    { id: 'gallery-1', type: 'gallery-1', label: 'Gallery Image 1', required: false, dimensions: '1200×800px' },
    { id: 'gallery-2', type: 'gallery-2', label: 'Gallery Image 2', required: false, dimensions: '1200×800px' },
    { id: 'gallery-3', type: 'gallery-3', label: 'Gallery Image 3', required: false, dimensions: '1200×800px' },
    { id: 'gallery-4', type: 'gallery-4', label: 'Gallery Image 4', required: false, dimensions: '1200×800px' },
  ];

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={loadImages}
      isRefreshing={isRefreshing}
    >
      <div className="admin-images-page">
        <header className="admin-page-header">
          <Link to="/admin/images/bucket-list" className="back-link">
            <ArrowLeft size={18} />
            Back to Bucket List
          </Link>
          <h1 className="admin-page-title">{selectedExperience.title}</h1>
          <p className="admin-page-subtitle">
            {selectedExperience.duration} • {selectedExperience.category}
          </p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading images...</p>
          </div>
        ) : (
          <div className="images-list">
            {IMAGE_TYPES.map(imageSpec => {
              const existing = images[imageSpec.type];
              return (
                <div key={imageSpec.id} className="admin-card image-card">
                  <div className="image-card-header">
                    <div className="image-card-title">
                      <h3>{imageSpec.label}</h3>
                      <span className={`badge ${imageSpec.required ? 'badge-required' : 'badge-optional'}`}>
                        {imageSpec.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <StatusIndicator 
                      status={existing ? (existing.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                      size="small"
                    />
                  </div>
                  <p className="image-card-specs">
                    Recommended: {imageSpec.dimensions}, WebP format
                  </p>
                  
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.CATEGORIES}
                    entityType="bucket-list"
                    entityId={selectedExperience.id}
                    imageType={imageSpec.type}
                    suggestedAltText={`${selectedExperience.title} - ${imageSpec.label}`}
                    existingImage={existing?.url}
                    existingData={existing}
                    onUploadComplete={loadImages}
                  />
                </div>
              );
            })}
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

          .entity-card-meta {
            margin: 0;
            font-size: 0.8125rem;
            color: var(--admin-text-muted);
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminBucketListImages;

