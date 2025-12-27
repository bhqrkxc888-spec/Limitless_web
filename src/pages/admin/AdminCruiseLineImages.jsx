/**
 * Admin Cruise Line Images Page
 * Manages images for all 57 cruise lines (logos, heroes, cards)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cruiseLines } from '../../data/cruiseLines';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';
import './AdminCruiseLineImages.css';

function AdminCruiseLineImages() {
  const [images, setImages] = useState({});
  const [selectedCruiseLine, setSelectedCruiseLine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
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
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCruiseLineStatus = (slug) => {
    const clImages = images[slug] || {};
    const hasLogo = !!clImages.logo;
    const hasHero = !!clImages.hero;
    const hasCard = !!clImages.card;
    
    if (!hasLogo || !hasHero || !hasCard) return 'error';
    if (clImages.logo?.seo_compliant && clImages.hero?.seo_compliant && clImages.card?.seo_compliant) return 'pass';
    return 'warning';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-cruise-line-images admin-images-page">
      <div className="page-header-with-back">
        <Link to="/admin/images" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Image Management</span>
        </Link>
        <h1>Cruise Line Images</h1>
        <p>Manage logos, heroes, and cards for all {cruiseLines.length} cruise lines</p>
      </div>

      {!selectedCruiseLine ? (
        <div className="cruise-lines-grid">
          {cruiseLines.map(cl => (
            <button
              key={cl.slug}
              className="cruise-line-card"
              onClick={() => setSelectedCruiseLine(cl)}
            >
              <div className="card-header">
                <h3>{cl.name}</h3>
                <StatusIndicator status={getCruiseLineStatus(cl.slug)} size="small" />
              </div>
              <p className="card-stats">
                {images[cl.slug]?.logo ? '✓' : '×'} Logo · 
                {images[cl.slug]?.hero ? '✓' : '×'} Hero · 
                {images[cl.slug]?.card ? '✓' : '×'} Card
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="cruise-line-detail">
          <button className="back-btn" onClick={() => setSelectedCruiseLine(null)}>
            ← Back to Cruise Lines
          </button>
          
          <h2>{selectedCruiseLine.name}</h2>
          
          <div className="upload-sections">
            <div className="upload-section">
              <h3>Logo</h3>
              <ImageUpload
                bucket={STORAGE_BUCKETS.CRUISE_LINES}
                entityType="cruise-line"
                entityId={selectedCruiseLine.slug}
                imageType="logo"
                suggestedAltText={`${selectedCruiseLine.name} logo`}
                existingImage={images[selectedCruiseLine.slug]?.logo?.url}
                onUploadComplete={loadImages}
              />
            </div>
            
            <div className="upload-section">
              <h3>Hero Image</h3>
              <ImageUpload
                bucket={STORAGE_BUCKETS.CRUISE_LINES}
                entityType="cruise-line"
                entityId={selectedCruiseLine.slug}
                imageType="hero"
                suggestedAltText={`${selectedCruiseLine.name} cruise ship`}
                existingImage={images[selectedCruiseLine.slug]?.hero?.url}
                onUploadComplete={loadImages}
              />
            </div>

            <div className="upload-section">
              <h3>Card Image</h3>
              <ImageUpload
                bucket={STORAGE_BUCKETS.CRUISE_LINES}
                entityType="cruise-line"
                entityId={selectedCruiseLine.slug}
                imageType="card"
                suggestedAltText={`${selectedCruiseLine.name} cruise card`}
                existingImage={images[selectedCruiseLine.slug]?.card?.url}
                onUploadComplete={loadImages}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCruiseLineImages;

