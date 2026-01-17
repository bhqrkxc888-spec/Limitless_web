/**
 * Admin Port Guide Images Page
 * Manages port guide images (hero and attraction images)
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
import { ports, portRegions } from '../../data/ports';
import { getPortPlaceholderImage } from '../../utils/placeholderImages';
import './AdminImagesShared.css';

/**
 * Get dynamic image types for a specific port
 * This generates labels based on actual attraction names from the port data
 */
const getPortImageTypes = (port) => {
  if (!port) {
    return [
      { id: 'hero', label: 'Hero Image', required: true, specs: 'Main banner for port guide page. Required: 1920×1080px, WebP format preferred' },
      { id: 'card', label: 'Card Image', required: true, specs: 'Thumbnail for listing pages. Required: 600×400px, WebP format preferred, 3:2 ratio' },
    ];
  }

  const imageTypes = [
    { id: 'hero', label: 'Hero Image', required: true, specs: 'Main banner for port guide page. Required: 1920×1080px, WebP format preferred' },
    { id: 'card', label: 'Card Image', required: true, specs: 'Thumbnail for listing pages. Required: 600×400px, WebP format preferred, 3:2 ratio' },
  ];

  // Add attractions with real names
  if (port.mustSeeSights && Array.isArray(port.mustSeeSights)) {
    port.mustSeeSights.forEach((sight, index) => {
      imageTypes.push({
        id: `attraction-${index + 1}`,
        label: sight.title || `Attraction ${index + 1}`,
        required: false,
        specs: `${sight.title || 'Attraction image'}. Required: 1200×800px, WebP format preferred`
      });
    });
  }

  // Add beach if port has one
  if (port.nearestBeach) {
    imageTypes.push({
      id: 'beach',
      label: port.nearestBeach.name || 'Beach',
      required: false,
      specs: `${port.nearestBeach.name || 'Beach'} image. Required: 1200×800px, WebP format preferred`
    });
  }

  // Add McDonald's if port has family-friendly section
  if (port.familyFriendly?.mcdonalds) {
    imageTypes.push({
      id: 'mcdonalds',
      label: 'McDonald\'s',
      required: false,
      specs: 'McDonald\'s logo or storefront. Card image: 600×600px square, WebP format preferred'
    });
  }

  // Add Ale Hop if port has family-friendly section
  if (port.familyFriendly?.aleHop) {
    imageTypes.push({
      id: 'ale-hop',
      label: 'Ale Hop',
      required: false,
      specs: 'Ale Hop logo or storefront. Card image: 600×600px square, WebP format preferred'
    });
  }

  // Add Local Park if port has family-friendly section
  if (port.familyFriendly?.localPark) {
    imageTypes.push({
      id: 'local-park',
      label: port.familyFriendly.localPark.name || 'Local Park',
      required: false,
      specs: `${port.familyFriendly.localPark.name || 'Local Park'} image. Card image: 400×400px square, WebP format preferred`
    });
  }

  // Note: Food images removed - food cards are now text-only with Google Maps links

  return imageTypes;
};

function AdminPortGuideImages() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get ports sorted by region then name
  const sortedPorts = [...ports].sort((a, b) => {
    if (a.region !== b.region) return a.region.localeCompare(b.region);
    return a.name.localeCompare(b.name);
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadImages = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Load port guide images
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('entity_type', 'port-guide');

      const imagesByPort = {};
      data?.forEach(img => {
        if (!imagesByPort[img.entity_id]) {
          imagesByPort[img.entity_id] = {};
        }
        imagesByPort[img.entity_id][img.image_type] = {
          url: getPublicUrl(img.bucket, img.path),
          ...img
        };
      });
      
      console.log('[DEBUG] Loaded images by port:', Object.keys(imagesByPort));

      setImages(imagesByPort);
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

  /**
   * Get status for a port
   */
  const getPortStatus = (portId) => {
    const portImages = images[portId] || {};
    const hero = portImages['hero'];
    const card = portImages['card'];
    
    // Both hero and card are required
    if (!hero || !card) return 'missing';
    
    // Check for any warnings
    const hasWarnings = Object.values(portImages).some(img => !img.seo_compliant);
    return hasWarnings ? 'warning' : 'pass';
  };

  /**
   * Get image count for a port
   */
  const getImageCount = (portId) => {
    return Object.keys(images[portId] || {}).length;
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
          <h1 className="admin-page-title">Port Guide Images</h1>
          <p className="admin-page-subtitle">Manage images for all {ports.length} cruise port guides</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading ports...</p>
          </div>
        ) : !selectedPort ? (
          <>
            {/* Region filter */}
            <div className="region-filter" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                className={`region-btn ${!selectedRegion ? 'active' : ''}`}
                onClick={() => setSelectedRegion(null)}
              >
                All Regions
              </button>
              {portRegions.map(region => (
                <button 
                  key={region.id}
                  className={`region-btn ${selectedRegion === region.id ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* Port grid */}
            <div className="entity-grid">
              {(selectedRegion 
                ? sortedPorts.filter(p => p.region === selectedRegion)
                : sortedPorts
              ).map(port => {
                const imageCount = getImageCount(port.id);
                const region = portRegions.find(r => r.id === port.region);
                const portImageTypes = getPortImageTypes(port);
                
                return (
                  <button
                    key={port.id}
                    className="entity-card"
                    onClick={() => setSelectedPort(port)}
                  >
                    <div className="entity-card-header">
                      <h3>{port.name}</h3>
                      <StatusIndicator status={getPortStatus(port.id)} size="small" />
                    </div>
                    <p className="entity-card-region">{region?.name || port.country}</p>
                    <p className="entity-card-stats">
                      <span className={imageCount > 0 ? 'stat-ok' : 'stat-missing'}>
                        {imageCount} / {portImageTypes.length} images
                      </span>
                    </p>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="entity-detail">
            <button className="back-btn" onClick={() => setSelectedPort(null)}>
              <ArrowLeft size={16} /> Back to Ports
            </button>
            
            <h2 className="entity-detail-title">{selectedPort.name}</h2>
            <p style={{ 
              color: 'var(--admin-text-muted)', 
              marginBottom: '2rem',
              fontSize: '0.875rem'
            }}>
              {selectedPort.country} • {selectedPort.tagline}
            </p>

            <div className="images-list">
              {getPortImageTypes(selectedPort).map(imageType => {
                const img = images[selectedPort.slug]?.[imageType.id];
                const placeholderUrl = getPortPlaceholderImage(
                  selectedPort.slug, 
                  imageType.id, 
                  selectedPort.name, 
                  selectedPort.country
                );
                const hasRealImage = !!img;
                
                return (
                  <div key={imageType.id} className="admin-card image-card">
                    <div className="image-card-header">
                      <div className="image-card-title">
                        <h3>{imageType.label}</h3>
                        <span className={`badge ${hasRealImage ? 'badge-uploaded' : 'badge-placeholder'}`}>
                          {hasRealImage ? '✓ Uploaded' : '⏳ Placeholder'}
                        </span>
                      </div>
                      <StatusIndicator 
                        status={img ? (img.seo_compliant ? 'pass' : 'warning') : (imageType.required ? 'missing' : 'info')} 
                        size="small" 
                      />
                    </div>
                    <p className="image-card-specs">{imageType.specs}</p>
                    
                    {/* Show simple "Image Coming Soon" when no real image */}
                    {!hasRealImage && (
                      <div className="placeholder-info">
                        <div className="placeholder-preview">
                          <img 
                            src={placeholderUrl} 
                            alt={`Placeholder for ${imageType.label}`}
                            loading="lazy"
                          />
                        </div>
                        <p className="placeholder-status">
                          📷 Image Coming Soon - Upload using form below
                        </p>
                      </div>
                    )}
                    
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CATEGORIES}
                      entityType="port-guide"
                      entityId={selectedPort.slug}
                      imageType={imageType.id}
                      suggestedAltText={`${selectedPort.name} - ${imageType.label}`}
                      existingImage={img?.url}
                      existingData={img}
                      onUploadComplete={handleUploadComplete}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <style>{`
          .entity-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
          }

          .entity-card {
            background: var(--admin-bg-secondary);
            border: 1px solid var(--admin-border);
            border-radius: 12px;
            padding: 1.25rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s;
            display: block;
            width: 100%;
            color: inherit;
            text-decoration: none;
          }

          .entity-card:hover {
            border-color: var(--admin-primary);
            transform: translateY(-2px);
          }

          .entity-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.25rem;
          }

          .entity-card h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: var(--admin-text);
          }

          .entity-card-region {
            margin: 0 0 0.5rem 0;
            font-size: 0.8125rem;
            color: var(--admin-text-muted);
          }

          .entity-card-stats {
            margin: 0;
            display: flex;
            gap: 0.75rem;
            font-size: 0.8125rem;
          }

          .entity-card-stats span {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-weight: 500;
          }

          .stat-ok {
            background: rgba(16, 185, 129, 0.1);
            color: var(--admin-success);
          }

          .stat-missing {
            background: rgba(239, 68, 68, 0.1);
            color: var(--admin-error);
          }

          .region-filter {
            margin-bottom: 1.5rem;
          }

          .region-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--admin-border);
            border-radius: 6px;
            background: var(--admin-bg-secondary);
            color: var(--admin-text-muted);
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
          }

          .region-btn:hover {
            border-color: var(--admin-primary);
            color: var(--admin-text);
          }

          .region-btn.active {
            background: var(--admin-primary);
            border-color: var(--admin-primary);
            color: white;
          }

          .entity-detail {
            margin-top: 1rem;
          }

          .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: transparent;
            border: 1px solid var(--admin-border);
            border-radius: 6px;
            padding: 0.5rem 1rem;
            color: var(--admin-text-muted);
            cursor: pointer;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
            transition: all 0.2s;
          }

          .back-btn:hover {
            border-color: var(--admin-primary);
            color: var(--admin-text);
          }

          .entity-detail-title {
            margin: 0 0 0.5rem 0;
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--admin-text);
          }

          .badge-optional {
            background: rgba(100, 116, 139, 0.2);
            color: var(--admin-text-muted);
          }

          .badge-uploaded {
            background: rgba(16, 185, 129, 0.2);
            color: var(--admin-success);
          }

          .badge-placeholder {
            background: rgba(251, 191, 36, 0.2);
            color: #f59e0b;
          }

          .placeholder-info {
            background: rgba(251, 191, 36, 0.05);
            border: 1px dashed rgba(251, 191, 36, 0.3);
            border-radius: 6px;
            padding: 0.625rem;
            margin-bottom: 0.75rem;
          }

          .placeholder-preview {
            position: relative;
            margin-bottom: 0.5rem;
            border-radius: 4px;
            overflow: hidden;
            max-width: 200px;
          }

          .placeholder-preview img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            display: block;
          }

          .placeholder-badge {
            position: absolute;
            bottom: 6px;
            right: 6px;
            background: rgba(0, 0, 0, 0.75);
            color: white;
            font-size: 0.625rem;
            padding: 0.1875rem 0.375rem;
            border-radius: 3px;
            display: flex;
            align-items: center;
            gap: 3px;
          }

          .placeholder-status {
            font-size: 0.75rem;
            color: var(--admin-text-muted);
            text-align: left;
            margin: 0;
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminPortGuideImages;

