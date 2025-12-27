/**
 * Admin Category Images Page
 * Manages 6 category card images (luxury, family, river, expedition, adults-only, budget)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';
import './AdminCategoryImages.css';

const CATEGORIES = [
  { id: 'luxury', label: 'Luxury Cruises' },
  { id: 'family', label: 'Family Cruises' },
  { id: 'river', label: 'River Cruises' },
  { id: 'expedition', label: 'Expedition Cruises' },
  { id: 'adults-only', label: 'Adults-Only Cruises' },
  { id: 'budget', label: 'Budget Cruises' }
];

function AdminCategoryImages() {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
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
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-category-images admin-images-page">
      <div className="page-header-with-back">
        <Link to="/admin/images" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Image Management</span>
        </Link>
        <h1>Category Images</h1>
        <p>Manage card images for all 6 cruise categories</p>
      </div>

      <div className="categories-grid">
        {CATEGORIES.map(category => {
          const existing = images[category.id];
          return (
            <div key={category.id} className="category-section">
              <div className="section-header">
                <h3>{category.label}</h3>
                {existing ? (
                  <StatusIndicator 
                    status={existing.seo_compliant ? 'pass' : 'warning'} 
                    size="small"
                  />
                ) : (
                  <StatusIndicator status="missing" size="small" />
                )}
              </div>
              
              <ImageUpload
                bucket={STORAGE_BUCKETS.CATEGORIES}
                entityType="category"
                entityId={category.id}
                imageType="card"
                suggestedAltText={`${category.label} cruise category`}
                existingImage={existing?.url}
                onUploadComplete={loadImages}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminCategoryImages;

