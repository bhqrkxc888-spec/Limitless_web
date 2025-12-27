/**
 * Admin Ship Images Page
 * Manages ship hero, card, and gallery images (exterior, deck, suite, dining + optional)
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
import './AdminShipImages.css';

const REQUIRED_GALLERY = ['exterior', 'deck', 'suite', 'dining'];
const OPTIONAL_GALLERY = ['pool', 'entertainment', 'spa', 'theater'];

function AdminShipImages() {
  const [selectedCruiseLine, setSelectedCruiseLine] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);
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
        .eq('entity_type', 'ship');

      const imageMap = {};
      data?.forEach(img => {
        // entity_id format: "{cruise-line-slug}/ships/{ship-slug}"
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

  const getShipStatus = (cruiseLineSlug, ship) => {
    const shipKey = `${cruiseLineSlug}/ships/${ship.slug || ship.name.toLowerCase().replace(/\s+/g, '-')}`;
    const shipImages = images[shipKey] || {};
    
    const hasRequired = REQUIRED_GALLERY.every(type => shipImages[type]);
    if (!hasRequired) return 'error';
    
    const allCompliant = Object.values(shipImages).every(img => img.seo_compliant);
    return allCompliant ? 'pass' : 'warning';
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!selectedCruiseLine) {
    return (
      <div className="admin-ship-images admin-images-page">
        <div className="page-header-with-back">
          <Link to="/admin/images" className="back-button">
            <ArrowLeft size={20} />
            <span>Back to Image Management</span>
          </Link>
          <h1>Ship Images</h1>
          <p>Select a cruise line to manage ship images</p>
        </div>

        <div className="cruise-lines-list">
          {cruiseLines.filter(cl => cl.fleet && cl.fleet.length > 0).map(cl => (
            <button
              key={cl.slug}
              className="list-item"
              onClick={() => setSelectedCruiseLine(cl)}
            >
              <h3>{cl.name}</h3>
              <p>{cl.fleet.length} ships</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedShip) {
    return (
      <div className="admin-ship-images">
        <button className="back-btn" onClick={() => setSelectedCruiseLine(null)}>
          ← Back to Cruise Lines
        </button>

        <div className="page-header">
          <h1>{selectedCruiseLine.name} - Ships</h1>
          <p>Select a ship to manage images</p>
        </div>

        <div className="ships-list">
          {selectedCruiseLine.fleet.map(ship => {
            const shipSlug = ship.slug || ship.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <button
                key={shipSlug}
                className="list-item"
                onClick={() => setSelectedShip(ship)}
              >
                <div>
                  <h3>{ship.name}</h3>
                  <StatusIndicator status={getShipStatus(selectedCruiseLine.slug, ship)} size="small" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const shipSlug = selectedShip.slug || selectedShip.name.toLowerCase().replace(/\s+/g, '-');
  const shipEntityId = `${selectedCruiseLine.slug}/ships/${shipSlug}`;
  const shipImages = images[shipEntityId] || {};

  return (
    <div className="admin-ship-images">
      <button className="back-btn" onClick={() => setSelectedShip(null)}>
        ← Back to {selectedCruiseLine.name}
      </button>

      <div className="page-header">
        <h1>{selectedShip.name}</h1>
        <p>{selectedCruiseLine.name}</p>
      </div>

      <div className="upload-sections">
        <h2>Required Gallery Images</h2>
        {REQUIRED_GALLERY.map(type => (
          <div key={type} className="upload-section">
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <ImageUpload
              bucket={STORAGE_BUCKETS.CRUISE_LINES}
              entityType="ship"
              entityId={shipEntityId}
              imageType={type}
              suggestedAltText={`${selectedShip.name} ${type}`}
              existingImage={shipImages[type]?.url}
              onUploadComplete={loadImages}
            />
          </div>
        ))}

        <h2>Optional Gallery Images</h2>
        {OPTIONAL_GALLERY.map(type => (
          <div key={type} className="upload-section optional">
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)} (Optional)</h3>
            <ImageUpload
              bucket={STORAGE_BUCKETS.CRUISE_LINES}
              entityType="ship"
              entityId={shipEntityId}
              imageType={type}
              suggestedAltText={`${selectedShip.name} ${type}`}
              existingImage={shipImages[type]?.url}
              onUploadComplete={loadImages}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminShipImages;

