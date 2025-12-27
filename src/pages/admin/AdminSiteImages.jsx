/**
 * Admin Site Images Page
 * Manages site-wide assets: hero, logo, OG image, favicon, team photos
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';
import './AdminSiteImages.css';

const SITE_IMAGES = [
  { id: 'hero', type: 'hero', label: 'Home Hero (Desktop)', required: true },
  { id: 'hero-mobile', type: 'hero-mobile', label: 'Home Hero (Mobile)', required: false },
  { id: 'logo', type: 'logo', label: 'Site Logo', required: true },
  { id: 'og-image', type: 'og-image', label: 'OG Image (Social Sharing)', required: true },
  { id: 'favicon', type: 'favicon', label: 'Favicon', required: true },
  { id: 'about-hero', type: 'about-hero', label: 'About Page - Katherine Photo', required: true },
  { id: 'about-katherine2', type: 'about-katherine2', label: 'About Page - Katherine Photo 2', required: false },
  { id: 'contact-hero', type: 'contact-hero', label: 'Contact Page Hero', required: false },
];

function AdminSiteImages() {
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
        .eq('entity_type', 'site');

      const imageMap = {};
      data?.forEach(img => {
        imageMap[img.image_type] = {
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

  const handleUploadComplete = () => {
    loadImages();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-site-images admin-images-page">
      <div className="page-header-with-back">
        <Link to="/admin/images" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Image Management</span>
        </Link>
        <h1>Site Assets</h1>
        <p>Manage site-wide images and branding assets</p>
      </div>

      <div className="images-grid">
        {SITE_IMAGES.map(imageSpec => {
          const existing = images[imageSpec.type];
          return (
            <div key={imageSpec.id} className="image-section">
              <div className="section-header">
                <h3>{imageSpec.label}</h3>
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
                bucket={STORAGE_BUCKETS.SITE}
                entityType="site"
                entityId="site"
                imageType={imageSpec.type}
                suggestedAltText={`${imageSpec.label} for Limitless Cruises`}
                existingImage={existing?.url}
                onUploadComplete={handleUploadComplete}
              />
            </div>
          );
        })}
      </div>

      <div className="team-section">
        <h2>Team Photos</h2>
        <p>Upload numbered team gallery images (001.webp, 002.webp, etc.)</p>
        <ImageUpload
          bucket={STORAGE_BUCKETS.SITE}
          entityType="team"
          entityId="001"
          imageType="gallery"
          suggestedAltText="Limitless Cruises team member"
          onUploadComplete={handleUploadComplete}
        />
      </div>
    </div>
  );
}

export default AdminSiteImages;

