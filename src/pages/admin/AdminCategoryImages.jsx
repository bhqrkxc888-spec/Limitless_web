/**
 * Admin Category Images Page
 * Manages cruise category card images matching cruiseTypes.js data
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';

// Hard-coded categories to eliminate any data loading issues
const CATEGORIES = [
  { id: 'family', label: 'Family Cruises' },
  { id: 'adults-only', label: 'Adults Only' },
  { id: 'premium', label: 'Premium Cruises' },
  { id: 'uk-sailings', label: 'UK No-Fly Cruises' },
  { id: 'luxury', label: 'Luxury Cruises' },
  { id: 'river', label: 'River Cruises' },
  { id: 'expedition', label: 'Expedition Cruises' }
];

function AdminCategoryImages() {
  const { logout } = useAdminAuth();
  
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadImages = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'category');

      if (error) {
        console.error('Error loading category images:', error);
        setLoading(false);
        setIsRefreshing(false);
        return;
      }

      const imageMap = {};
      if (data && Array.isArray(data)) {
        data.forEach(img => {
          if (img && img.entity_id && img.bucket && img.path) {
            imageMap[img.entity_id] = {
              url: getPublicUrl(img.bucket, img.path),
              alt_text: img.alt_text || '',
              width: img.width || 0,
              height: img.height || 0,
              file_size: img.file_size || 0,
              format: img.format || '',
              seo_compliant: img.seo_compliant || false
            };
          }
        });
      }
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
    loadImages();
  }, [loadImages]);

  const getStatus = (categoryId) => {
    const img = images[categoryId];
    if (!img) return 'missing';
    if (!img.seo_compliant) return 'warning';
    return 'pass';
  };

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
              const status = getStatus(category.id);
              
              return (
                <div key={category.id} className="admin-card image-card">
                  <div className="image-card-header">
                    <div className="image-card-title">
                      <h3>{category.label}</h3>
                      <span className="badge badge-required">Required</span>
                    </div>
                    <StatusIndicator status={status} size="small" />
                  </div>
                  <p className="image-card-specs">Required: 600×400px, WebP format preferred</p>
                  
                  <ImageUpload
                    bucket={STORAGE_BUCKETS.CATEGORIES}
                    entityType="category"
                    entityId={category.id}
                    imageType="card"
                    suggestedAltText={`${category.label} cruise category`}
                    existingImage={existing ? existing.url : null}
                    existingData={existing || null}
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
