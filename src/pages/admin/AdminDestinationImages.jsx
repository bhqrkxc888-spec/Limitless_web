/**
 * Admin Destination Images Page
 * Manages images for all 30 destinations
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { destinations } from '../../config/destinations';
import ImageUpload from '../../components/admin/ImageUpload';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { supabase, getPublicUrl } from '../../lib/supabase';
import { STORAGE_BUCKETS } from '../../config/supabaseConfig';
import './AdminImagesShared.css';
import './AdminDestinationImages.css';

function AdminDestinationImages() {
  const [images, setImages] = useState({});
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'destination');

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

  const getDestinationStatus = (slug) => {
    const destImages = images[slug] || {};
    const hasHero = !!destImages.hero;
    const hasCard = !!destImages.card;
    
    if (!hasHero || !hasCard) return 'error';
    if (destImages.hero?.seo_compliant && destImages.card?.seo_compliant) return 'pass';
    return 'warning';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-destination-images admin-images-page">
      <div className="page-header-with-back">
        <Link to="/admin/images" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Image Management</span>
        </Link>
        <h1>Destination Images</h1>
        <p>Manage hero and card images for all 30 destinations</p>
      </div>

      {!selectedDestination ? (
        <div className="destinations-grid">
          {destinations.map(dest => (
            <button
              key={dest.slug}
              className="destination-card"
              onClick={() => setSelectedDestination(dest)}
            >
              <div className="card-header">
                <h3>{dest.name}</h3>
                <StatusIndicator status={getDestinationStatus(dest.slug)} size="small" />
              </div>
              <p className="card-stats">
                {images[dest.slug]?.hero ? '✓' : '×'} Hero · 
                {images[dest.slug]?.card ? '✓' : '×'} Card
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="destination-detail">
          <button className="back-btn" onClick={() => setSelectedDestination(null)}>
            ← Back to Destinations
          </button>
          
          <h2>{selectedDestination.name}</h2>
          
          <div className="upload-sections">
            <div className="upload-section">
              <h3>Hero Image</h3>
              <ImageUpload
                bucket={STORAGE_BUCKETS.DESTINATIONS}
                entityType="destination"
                entityId={selectedDestination.slug}
                imageType="hero"
                suggestedAltText={`${selectedDestination.name} cruise destination`}
                existingImage={images[selectedDestination.slug]?.hero?.url}
                onUploadComplete={loadImages}
              />
            </div>
            
            <div className="upload-section">
              <h3>Card Image</h3>
              <ImageUpload
                bucket={STORAGE_BUCKETS.DESTINATIONS}
                entityType="destination"
                entityId={selectedDestination.slug}
                imageType="card"
                suggestedAltText={`${selectedDestination.name} cruise card`}
                existingImage={images[selectedDestination.slug]?.card?.url}
                onUploadComplete={loadImages}
              />
            </div>

            <div className="upload-section optional">
              <h3>Mobile Hero (Optional)</h3>
              <ImageUpload
                bucket={STORAGE_BUCKETS.DESTINATIONS}
                entityType="destination"
                entityId={selectedDestination.slug}
                imageType="mobile"
                suggestedAltText={`${selectedDestination.name} mobile hero`}
                existingImage={images[selectedDestination.slug]?.mobile?.url}
                onUploadComplete={loadImages}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDestinationImages;

