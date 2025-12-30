/**
 * Admin Site Images Page
 * Manages site-wide assets: hero, logo, OG image, favicon, Katherine photos
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
import './AdminImagesShared.css';

const SITE_IMAGES = [
  { id: 'hero', type: 'hero', label: 'Home Hero (Desktop)', required: true, dimensions: '1920×1080px' },
  { id: 'hero-mobile', type: 'hero-mobile', label: 'Home Hero (Mobile)', required: false, dimensions: '768×1024px' },
  { id: 'logo', type: 'logo', label: 'Site Logo (Square Icon)', required: true, dimensions: '512×512px square' },
  { id: 'og-image', type: 'og-image', label: 'OG Image (Social Sharing)', required: true, dimensions: '1200×630px' },
  { id: 'favicon', type: 'favicon', label: 'Favicon', required: true, dimensions: '512×512px' },
  { id: 'katherine1', type: 'katherine1', label: 'About Page - Katherine Photo 1 (Why Choose section)', required: true, dimensions: '800×1000px portrait' },
  { id: 'katherine2', type: 'katherine2', label: 'About Page - Katherine Photo 2 (Hero section)', required: true, dimensions: '800×1000px portrait' },
  { id: 'katherine3', type: 'katherine3', label: 'About Page - Katherine Photo 3 (Meet Consultant section)', required: true, dimensions: '800×1000px portrait' },
  { id: 'agency-logo', type: 'agency-logo', label: 'Agency Logo (Holiday Elite/Partner Agency)', required: false, dimensions: 'Any size, PNG preferred for transparency' },
  { id: 'trust-abta', type: 'trust-abta', label: 'Trust Badge - ABTA', required: false, dimensions: 'Any size, PNG preferred' },
  { id: 'trust-atol', type: 'trust-atol', label: 'Trust Badge - ATOL', required: false, dimensions: 'Any size, PNG preferred' },
  { id: 'trust-clia', type: 'trust-clia', label: 'Trust Badge - CLIA', required: false, dimensions: 'Any size, PNG preferred' },
];

function AdminSiteImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
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
        .eq('entity_type', 'site');

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
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadImages();
    }
  }, [isAuthenticated, loadImages]);

  const handleUploadComplete = () => {
    loadImages();
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
          <h1 className="admin-page-title">Site Assets</h1>
          <p className="admin-page-subtitle">Manage site-wide images and branding assets</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading images...</p>
          </div>
        ) : (
          <div className="images-list">
            {SITE_IMAGES.map(imageSpec => {
              const existing = images[imageSpec.type];
              // For optional images, don't show "missing" (red) - show neutral/info status
              let status = 'missing';
              if (existing) {
                status = existing.seo_compliant ? 'pass' : 'warning';
              } else if (!imageSpec.required) {
                status = 'optional'; // Show neutral status for optional images not uploaded
              }
              
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
                      status={status} 
                      size="small"
                    />
                  </div>
                  <p className="image-card-specs">
                    Recommended: {imageSpec.dimensions}, WebP format
                  </p>
                  
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.SITE}
                    entityType="site"
                    entityId="site"
                    imageType={imageSpec.type}
                    suggestedAltText={`${imageSpec.label} for Limitless Cruises`}
                    existingImage={existing?.url}
                    existingData={existing}
                    onUploadComplete={handleUploadComplete}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminSiteImages;
