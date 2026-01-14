/**
 * Admin Page Heroes
 * Manages hero images for main pages (Destinations, Bucket List, etc.)
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

const PAGE_HEROES = [
  { 
    id: 'destinations', 
    type: 'page-hero-destinations', 
    label: 'Destinations Page Hero', 
    required: false, 
    dimensions: '1920×400px (narrower hero)',
    description: 'Hero image for the main Destinations listing page',
    pageUrl: '/destinations'
  },
  { 
    id: 'bucket-list', 
    type: 'page-hero-bucket-list', 
    label: 'Bucket List Page Hero', 
    required: false, 
    dimensions: '1920×400px (narrower hero)',
    description: 'Hero image for the main Bucket List experiences page',
    pageUrl: '/bucket-list'
  },
  { 
    id: 'cruise-lines', 
    type: 'page-hero-cruise-lines', 
    label: 'Cruise Lines Page Hero', 
    required: false, 
    dimensions: '1920×400px (narrower hero)',
    description: 'Hero image for the main Cruise Lines listing page',
    pageUrl: '/cruise-lines'
  },
  { 
    id: 'cruise-types', 
    type: 'page-hero-cruise-types', 
    label: 'Cruise Types Page Hero', 
    required: false, 
    dimensions: '1920×400px (narrower hero)',
    description: 'Hero image for the main Cruise Types page',
    pageUrl: '/cruise-types'
  },
  { 
    id: 'ports', 
    type: 'page-hero-ports', 
    label: 'Port Guides Page Hero', 
    required: false, 
    dimensions: '1920×400px (narrower hero)',
    description: 'Hero image for the main Port Guides listing page',
    pageUrl: '/ports'
  },
  { 
    id: 'cruise-guides', 
    type: 'page-hero-cruise-guides', 
    label: 'Cruise Guides Page Hero', 
    required: false, 
    dimensions: '1920×400px (narrower hero)',
    description: 'Hero image for the main Cruise Guides listing page',
    pageUrl: '/cruise-guides'
  },
];

function AdminPageHeroes() {
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
        .eq('entity_type', 'site')
        .in('image_type', PAGE_HEROES.map(p => p.type));

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
      console.error('Error loading page hero images:', error);
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
          <h1 className="admin-page-title">Page Heroes</h1>
          <p className="admin-page-subtitle">Manage hero images for main listing pages</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading page heroes...</p>
          </div>
        ) : (
          <div className="images-list">
            {PAGE_HEROES.map(pageHero => {
              const existing = images[pageHero.type];
              // For optional images, don't show "missing" (red) - show neutral/info status
              let status = 'missing';
              if (existing) {
                status = existing.seo_compliant ? 'pass' : 'warning';
              } else if (!pageHero.required) {
                status = 'optional'; // Show neutral status for optional images not uploaded
              }
              
              return (
                <div key={pageHero.id} className="admin-card image-card">
                  <div className="image-card-header">
                    <div className="image-card-title">
                      <h3>{pageHero.label}</h3>
                      <span className={`badge ${pageHero.required ? 'badge-required' : 'badge-optional'}`}>
                        {pageHero.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <StatusIndicator 
                      status={status} 
                      size="small"
                    />
                  </div>
                  <p className="image-card-description">{pageHero.description}</p>
                  <p className="image-card-specs">
                    <strong>Recommended:</strong> {pageHero.dimensions}, WebP format preferred
                    <br />
                    <strong>Page:</strong> <a href={pageHero.pageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>{pageHero.pageUrl}</a>
                  </p>
                  
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.SITE}
                    entityType="site"
                    entityId="site"
                    imageType={pageHero.type}
                    suggestedAltText={`${pageHero.label} for Limitless Cruises`}
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

export default AdminPageHeroes;

