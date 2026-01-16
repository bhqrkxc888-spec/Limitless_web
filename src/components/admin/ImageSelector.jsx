/**
 * Image Selector Component
 * Allows selecting existing images from other entities (shared images)
 * or uploading new ones
 */

import { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, X } from 'lucide-react';
import { supabase, getPublicUrl } from '../../lib/supabase';
import './ImageSelector.css';

function ImageSelector({
  entityType,
  imageType,
  onSelect,
  onCancel,
  currentEntityId
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableImages, setAvailableImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadAvailableImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, imageType]);

  const loadAvailableImages = async () => {
    setLoading(true);
    try {
      // Load images of the same type from other entities
      // For ships, we can share images across different ship instances
      // For ports, we can share port images with cruise guide ports
      let query = supabase
        .from('site_images')
        .select('*')
        .eq('image_type', imageType);

      // Filter based on entity type
      if (entityType === 'ship') {
        // Show all ship images
        query = query.eq('entity_type', 'ship');
      } else if (entityType === 'cruise-guide-port') {
        // Show both port-guide and cruise-guide-port images
        query = query.in('entity_type', ['port-guide', 'cruise-guide-port']);
      } else if (entityType === 'port-guide') {
        // Show both port-guide and cruise-guide-port images
        query = query.in('entity_type', ['port-guide', 'cruise-guide-port']);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Filter out current entity's images
      const filtered = data?.filter(img => img.entity_id !== currentEntityId) || [];

      setAvailableImages(filtered);
    } catch (error) {
      console.error('Error loading available images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = availableImages.filter(img => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      img.entity_id?.toLowerCase().includes(searchLower) ||
      img.alt_text?.toLowerCase().includes(searchLower) ||
      img.path?.toLowerCase().includes(searchLower)
    );
  });

  const handleSelect = () => {
    if (selectedImage) {
      onSelect(selectedImage);
    }
  };

  return (
    <div className="image-selector-overlay">
      <div className="image-selector-modal">
        <div className="image-selector-header">
          <h3>Select Existing Image</h3>
          <button 
            className="close-btn"
            onClick={onCancel}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="image-selector-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by entity name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="image-selector-content">
          {loading ? (
            <div className="loading-state">Loading available images...</div>
          ) : filteredImages.length === 0 ? (
            <div className="empty-state">
              <ImageIcon size={48} />
              <p>No existing images found</p>
              <p className="empty-state-hint">Upload a new image instead</p>
            </div>
          ) : (
            <div className="image-grid">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  className={`image-card ${selectedImage?.id === img.id ? 'selected' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="image-card-preview">
                    <img
                      src={getPublicUrl(img.bucket, img.path)}
                      alt={img.alt_text || 'Preview'}
                    />
                  </div>
                  <div className="image-card-info">
                    <div className="image-card-title">{img.entity_id}</div>
                    <div className="image-card-meta">
                      {img.width && img.height && (
                        <span>{img.width}×{img.height}px</span>
                      )}
                    </div>
                    {img.alt_text && (
                      <div className="image-card-alt">{img.alt_text}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="image-selector-footer">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleSelect}
            disabled={!selectedImage}
          >
            Use Selected Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageSelector;
