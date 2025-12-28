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
import './AdminImagesShared.css';

/**
 * Define required images per port
 * These are the images needed for each port guide
 */
const PORT_IMAGE_TYPES = [
  { id: 'hero', label: 'Hero Image', required: true, specs: 'Main banner for port guide page. Recommended: 1920×1080px, WebP format' },
  { id: 'port-terminal', label: 'Port Terminal', required: false, specs: 'Image of the cruise terminal. Recommended: 800×600px, WebP format' },
  { id: 'attraction-1', label: 'Attraction 1', required: false, specs: 'First must-see sight. Recommended: 800×600px, WebP format' },
  { id: 'attraction-2', label: 'Attraction 2', required: false, specs: 'Second must-see sight. Recommended: 800×600px, WebP format' },
  { id: 'attraction-3', label: 'Attraction 3', required: false, specs: 'Third must-see sight. Recommended: 800×600px, WebP format' },
  { id: 'attraction-4', label: 'Attraction 4', required: false, specs: 'Fourth must-see sight. Recommended: 800×600px, WebP format' },
  { id: 'beach', label: 'Beach', required: false, specs: 'Nearest beach image. Recommended: 800×600px, WebP format' },
  { id: 'food', label: 'Food & Dining', required: false, specs: 'Food or restaurant scene. Recommended: 800×600px, WebP format' },
];

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
    
    // Hero is required
    if (!hero) return 'missing';
    
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
                        {imageCount} / {PORT_IMAGE_TYPES.length} images
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
              {PORT_IMAGE_TYPES.map(imageType => {
                const img = images[selectedPort.id]?.[imageType.id];
                
                return (
                  <div key={imageType.id} className="admin-card image-card">
                    <div className="image-card-header">
                      <div className="image-card-title">
                        <h3>{imageType.label}</h3>
                        <span className={`badge ${imageType.required ? 'badge-required' : 'badge-optional'}`}>
                          {imageType.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                      <StatusIndicator 
                        status={img ? (img.seo_compliant ? 'pass' : 'warning') : (imageType.required ? 'missing' : 'info')} 
                        size="small" 
                      />
                    </div>
                    <p className="image-card-specs">{imageType.specs}</p>
                    <ImageUpload
                      bucket={STORAGE_BUCKETS.CATEGORIES}
                      entityType="port-guide"
                      entityId={selectedPort.id}
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
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--admin-text);
          }

          .badge-optional {
            background: rgba(100, 116, 139, 0.2);
            color: var(--admin-text-muted);
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminPortGuideImages;

