/**
 * Admin Category Images Page
 * Manages cruise category card images matching cruiseTypes.js data
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
import { getAllCruiseTypes } from '../../data/cruiseTypes';
import './AdminImagesShared.css';

// Get categories from cruiseTypes data (only featured ones for admin management)
const CATEGORIES = getAllCruiseTypes()
  .filter(cat => cat.featured) // Only show featured categories in admin
  .map(cat => ({
    id: cat.id,
    label: cat.name
  }));

function AdminCategoryImages() {
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
        .eq('entity_type', 'category');

      const imageMap = {};
      data?.forEach(img => {
        imageMap[img.entity_id] = {
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
          <h1 className="admin-page-title">Category Images</h1>
          <p className="admin-page-subtitle">Manage card images for all cruise categories</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading categories...</p>
          </div>
        ) : (
          <div className="images-list">
            {CATEGORIES.map(category => {
              const existing = images[category.id];
              return (
                <div key={category.id} className="admin-card image-card">
                  <div className="image-card-header">
                    <div className="image-card-title">
                      <h3>{category.label}</h3>
                      <span className="badge badge-required">Required</span>
                    </div>
                    <StatusIndicator 
                      status={existing ? (existing.seo_compliant ? 'pass' : 'warning') : 'missing'} 
                      size="small"
                    />
                  </div>
                  <p className="image-card-specs">Recommended: 600×400px, WebP format</p>
                  
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.CATEGORIES}
                    entityType="category"
                    entityId={category.id}
                    imageType="card"
                    suggestedAltText={`${category.label} cruise category`}
                    existingImage={existing?.url}
                    existingData={existing}
                    onUploadComplete={loadImages}
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

export default AdminCategoryImages;
