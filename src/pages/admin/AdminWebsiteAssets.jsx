/**
 * Admin Website Assets Page
 * 
 * Full asset manager with upload, validation, and persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, MapPin, Ship, Globe, RefreshCw, Upload, AlertCircle, Check, X, Plus } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { logger } from '../../utils/logger';
import { cruiseLines } from '../../data/cruiseLines';

// Validation rules
const VALIDATION_RULES = {
  // Site-wide assets
  home_hero: { ratio: '16:9', maxSize: 4 * 1024 * 1024, formats: ['image/jpeg', 'image/png', 'image/webp'] },
  og_image: { ratio: null, maxSize: 2 * 1024 * 1024, formats: ['image/jpeg', 'image/png'], recommendedSize: '1200x630' },
  site_logo: { ratio: null, maxSize: 1 * 1024 * 1024, formats: ['image/svg+xml', 'image/png'], requireAlpha: false },
  favicon: { ratio: '1:1', maxSize: 1 * 1024 * 1024, formats: ['image/png', 'image/x-icon'] },
  // Destination assets
  destination_hero: { ratio: '16:9', maxSize: 4 * 1024 * 1024, formats: ['image/jpeg', 'image/png', 'image/webp'] },
  // Cruise line assets
  cruise_line_hero: { ratio: '16:9', maxSize: 4 * 1024 * 1024, formats: ['image/jpeg', 'image/png', 'image/webp'] },
  cruise_line_card: { ratio: '16:9', maxSize: 4 * 1024 * 1024, formats: ['image/jpeg', 'image/png', 'image/webp'] },
  cruise_line_logo: { ratio: null, maxSize: 1 * 1024 * 1024, formats: ['image/svg+xml', 'image/png'], requireAlpha: true },
  // Ship assets
  ship_hero: { ratio: '16:9', maxSize: 4 * 1024 * 1024, formats: ['image/jpeg', 'image/png', 'image/webp'] },
  ship_card: { ratio: '16:9', maxSize: 4 * 1024 * 1024, formats: ['image/jpeg', 'image/png', 'image/webp'] }
};

// Helper to check aspect ratio
const checkAspectRatio = (width, height, expectedRatio) => {
  if (!expectedRatio) return { valid: true };
  
  const [w, h] = expectedRatio.split(':').map(Number);
  const expected = w / h;
  const actual = width / height;
  const tolerance = 0.02; // 2% tolerance
  
  const valid = Math.abs(actual - expected) < tolerance;
  return {
    valid,
    expected: expectedRatio,
    actual: `${width}:${height}`,
    message: valid ? null : `Image must be ${expectedRatio} aspect ratio`
  };
};

// Helper to check if image has alpha channel
const checkHasAlpha = (imageData) => {
  const data = imageData.data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
};

// Helper to get image metadata
const getImageMetadata = (file) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.onload = () => {
        // Create canvas to check alpha
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        let hasAlpha = false;
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          hasAlpha = checkHasAlpha(imageData);
        } catch {
          // CORS or other error - assume no alpha
          hasAlpha = false;
        }
        
        resolve({
          width: img.width,
          height: img.height,
          hasAlpha,
          mime: file.type,
          bytes: file.size
        });
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

function AdminWebsiteAssets() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [activeTab, setActiveTab] = useState('destinations');
  const [assets, setAssets] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [newDestination, setNewDestination] = useState({ slug: '', name: '', region: '' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch destinations from catalog
  const fetchDestinations = useCallback(async () => {
    if (!supabase) return;
    
    try {
      const { data, error: fetchError } = await supabase
        .schema('web')
        .from('destination_catalog')
        .select('*')
        .eq('enabled', true)
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;
      setDestinations(data || []);
    } catch (error) {
      logger.error('Error fetching destinations:', error);
    }
  }, []);

  // Fetch assets from Supabase
  const fetchAssets = useCallback(async () => {
    if (!supabase) return;
    
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .schema('web')
        .from('site_assets')
        .select('asset_type, entity_key, url, updated_at');

      if (fetchError) {
        logger.error('Error fetching assets:', fetchError);
        // Don't throw - just log and continue
        setAssets([]);
      } else {
        setAssets(data || []);
      }
    } catch (error) {
      logger.error('Error in fetchAssets:', error);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && supabase) {
      fetchDestinations();
      fetchAssets();
    }
  }, [isAuthenticated, fetchDestinations, fetchAssets]);

  // Get asset for a specific entity
  const getAsset = (assetType, entityKey) => {
    return assets.find(a => a.asset_type === assetType && a.entity_key === entityKey);
  };

  // Validate file
  const validateFile = async (file, assetType) => {
    const rules = VALIDATION_RULES[assetType];
    if (!rules) return { valid: true };

    const errors = [];
    const warnings = [];

    // Check file size
    if (file.size > rules.maxSize) {
      const maxSizeMB = (rules.maxSize / 1024 / 1024).toFixed(1);
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(1);
      errors.push(`File size (${fileSizeMB}MB) exceeds maximum of ${maxSizeMB}MB. Please compress or resize the image.`);
    }

    // Check format
    if (!rules.formats.includes(file.type)) {
      const allowedFormats = rules.formats.map(f => f.split('/')[1].toUpperCase()).join(', ');
      errors.push(`Invalid file format. Only ${allowedFormats} files are allowed for ${assetType.replace(/_/g, ' ')}.`);
    }

    // For SVG, we can't get dimensions easily
    if (file.type === 'image/svg+xml') {
      return { valid: errors.length === 0, errors, warnings };
    }

    // Get image metadata
    try {
      const metadata = await getImageMetadata(file);

      // Check aspect ratio
      if (rules.ratio) {
        const ratioCheck = checkAspectRatio(metadata.width, metadata.height, rules.ratio);
        if (!ratioCheck.valid) {
          errors.push(`❌ ${ratioCheck.message}. Current: ${metadata.width}x${metadata.height} (${(metadata.width / metadata.height).toFixed(2)}:1). Please crop or resize to ${rules.ratio}.`);
        }
      }

      // Check alpha channel for logos
      if (rules.requireAlpha && file.type === 'image/png' && !metadata.hasAlpha) {
        errors.push(`❌ PNG logos must have a transparent background (alpha channel). Current file has no transparency. Please use a PNG with transparency or upload an SVG instead.`);
      }

      // Check dimensions
      if (metadata.width < 800 || metadata.height < 450) {
        warnings.push(`⚠️ Low resolution: ${metadata.width}x${metadata.height}. Recommended minimum: 1920x1080 for best quality. Upload will proceed but image may appear blurry on high-resolution displays.`);
      }

      return { valid: errors.length === 0, errors, warnings, metadata };
    } catch {
      errors.push('Failed to read image metadata');
      return { valid: false, errors, warnings };
    }
  };

  // Upload file to Vercel Blob
  const uploadToBlob = async (file, path, assetType) => {
    try {
      // Use Vercel Blob client-side upload with Sharp processing
      const response = await fetch(`/api/blob?filename=${encodeURIComponent(path)}`, {
        method: 'POST',
        headers: {
          'x-asset-type': assetType, // Pass asset type for server-side sizing
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await response.json();
      return { url, error: null };
    } catch (err) {
      logger.error('Error uploading to blob:', err);
      return { url: null, error: err };
    }
  };

  // Handle file upload
  const handleUpload = async (file, assetType, entityKey) => {
    const uploadKey = `${assetType}-${entityKey || 'site'}`;
    setUploading(prev => ({ ...prev, [uploadKey]: true }));
    setError(null);
    setSuccessMessage(null);

    try {
      // Validate file
      const validation = await validateFile(file, assetType);
      
      if (!validation.valid) {
        setError(validation.errors.join('. '));
        return;
      }

      if (validation.warnings && validation.warnings.length > 0) {
        logger.warn('Upload warnings:', validation.warnings);
      }

      // Build blob path
      const ext = file.name.split('.').pop();
      let blobPath = '';
      
      if (assetType === 'home_hero') {
        blobPath = `site/home-hero.${ext}`;
      } else if (assetType === 'og_image') {
        blobPath = `site/og-image.${ext}`;
      } else if (assetType.startsWith('site_') || assetType === 'favicon') {
        blobPath = `site/${assetType.replace('site_', '')}.${ext}`;
      } else if (assetType === 'destination_hero') {
        blobPath = `destinations/${entityKey}-HERO.${ext}`;
      } else if (assetType.startsWith('cruise_line_')) {
        const suffix = assetType.replace('cruise_line_', '').toUpperCase();
        blobPath = `cruise-lines/${entityKey}-${suffix}.${ext}`;
      } else if (assetType.startsWith('ship_')) {
        const suffix = assetType.replace('ship_', '').toUpperCase();
        blobPath = `ships/${entityKey}-${suffix}.${ext}`;
      }

      // Upload to Vercel Blob (with Sharp processing)
      const { url, error: uploadError } = await uploadToBlob(file, blobPath, assetType);
      
      if (uploadError) {
        throw new Error('Failed to upload to storage');
      }

      // Store minimal metadata in Supabase
      if (supabase) {
        try {
          const assetData = {
            asset_type: assetType,
            entity_key: entityKey || null,
            url,
            updated_at: new Date().toISOString()
          };

          const { error: upsertError } = await supabase
            .schema('web')
            .from('site_assets')
            .upsert(assetData, {
              onConflict: 'asset_type,entity_key'
            });

          if (upsertError) {
            logger.error('Error storing asset metadata:', upsertError);
            // Don't fail the upload - Blob succeeded
            setError(`Upload succeeded but failed to track: ${upsertError.message}`);
          }
        } catch (metaError) {
          logger.error('Error saving metadata:', metaError);
        }
      }

      // Refresh assets
      await fetchAssets();
      setSuccessMessage(`Successfully uploaded ${assetType}`);
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      logger.error('Error uploading asset:', err);
      setError(err.message || 'Failed to upload asset');
    } finally {
      setUploading(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  // Handle remove asset
  const handleRemove = async (assetType, entityKey) => {
    if (!confirm('Are you sure you want to remove this asset? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (supabase) {
        const { error: deleteError } = await supabase
          .schema('web')
          .from('site_assets')
          .delete()
          .eq('asset_type', assetType)
          .eq('entity_key', entityKey || null);

        if (deleteError) {
          logger.error('Error removing asset:', deleteError);
          throw new Error(`Failed to remove asset: ${deleteError.message}`);
        }
      }

      // Refresh assets
      await fetchAssets();
      setSuccessMessage('Asset removed successfully (Blob URL still accessible)');
    } catch (err) {
      logger.error('Error removing asset:', err);
      setError(err.message || 'Failed to remove asset');
    } finally {
      setLoading(false);
    }
  };

  // Add new destination
  const handleAddDestination = async () => {
    if (!newDestination.slug || !newDestination.name) {
      setError('Slug and name are required');
      return;
    }

    try {
      const { error: insertError } = await supabase
        .schema('web')
        .from('destination_catalog')
        .insert({
          slug: newDestination.slug,
          name: newDestination.name,
          region: newDestination.region || null,
          enabled: true,
          sort_order: destinations.length * 10 + 10
        });

      if (insertError) throw insertError;

      await fetchDestinations();
      setShowAddDestination(false);
      setNewDestination({ slug: '', name: '', region: '' });
      setSuccessMessage('Destination added successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      logger.error('Error adding destination:', err);
      setError('Failed to add destination');
    }
  };

  // Get rows for current tab
  const getRowsForTab = () => {
    switch (activeTab) {
      case 'site':
        return [
          { id: 'home-hero', label: 'Home Page Hero', assetType: 'home_hero', entityKey: null, description: 'Main hero image on the homepage (16:9, 1920x1080+)' },
          { id: 'og-image', label: 'Social Share Image (OG)', assetType: 'og_image', entityKey: null, description: 'Image shown when sharing on social media (1200x630px)' },
          { id: 'site-logo', label: 'Site Logo', assetType: 'site_logo', entityKey: null, description: 'Header/footer logo (transparent PNG or SVG)' },
          { id: 'favicon', label: 'Favicon', assetType: 'favicon', entityKey: null, description: 'Browser tab icon (square, 512x512px)' }
        ];
      
      case 'destinations':
        return destinations.map(dest => ({
          id: `dest-${dest.slug}`,
          label: dest.name,
          assetType: 'destination_hero',
          entityKey: dest.slug
        }));
      
      case 'cruise-lines': {
        const rows = [];
        cruiseLines.forEach(cl => {
          rows.push(
            { id: `cl-${cl.id}-logo`, label: `${cl.name} - Logo`, assetType: 'cruise_line_logo', entityKey: cl.id },
            { id: `cl-${cl.id}-card`, label: `${cl.name} - Card`, assetType: 'cruise_line_card', entityKey: cl.id },
            { id: `cl-${cl.id}-hero`, label: `${cl.name} - Hero`, assetType: 'cruise_line_hero', entityKey: cl.id }
          );
        });
        return rows;
      }
      
      case 'ships': {
        const rows = [];
        cruiseLines.forEach(cl => {
          if (cl.ships && Array.isArray(cl.ships)) {
            cl.ships.forEach(shipName => {
              const shipKey = `${cl.id}-${shipName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              rows.push(
                { id: `ship-${shipKey}-card`, label: `${shipName} (${cl.shortName}) - Card`, assetType: 'ship_card', entityKey: shipKey },
                { id: `ship-${shipKey}-hero`, label: `${shipName} (${cl.shortName}) - Hero`, assetType: 'ship_hero', entityKey: shipKey }
              );
            });
          }
        });
        return rows;
      }
      
      default:
        return [];
    }
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="admin-layout" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f1117'
      }}>
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const rows = getRowsForTab();
  const tabs = [
    { id: 'site', label: 'Site', icon: Globe },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'cruise-lines', label: 'Cruise Lines', icon: Ship },
    { id: 'ships', label: 'Ships', icon: Ship }
  ];

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={null}
      onRefresh={fetchAssets}
      isRefreshing={loading}
    >
      <div className="admin-website-assets">
        <header className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Website Assets</h1>
            <p className="admin-page-subtitle">
              Upload and manage website images
            </p>
          </div>
          {activeTab === 'destinations' && (
            <button
              className="admin-btn admin-btn-primary"
              onClick={() => setShowAddDestination(true)}
            >
              <Plus size={16} />
              Add Destination
            </button>
          )}
        </header>

        {error && (
          <div className="admin-alert admin-alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="admin-alert-close">
              <X size={16} />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="admin-alert admin-alert-success" style={{ marginBottom: '1.5rem' }}>
            <Check size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <TabIcon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Instructions */}
        <div className="admin-info-box" style={{ marginBottom: '1.5rem' }}>
          {activeTab === 'site' && (
            <>
              <h3>🌐 Site-Wide Assets</h3>
              <p>These images appear across the entire website. Upload these first for a complete launch.</p>
              <ul>
                <li><strong>Home Page Hero:</strong> Large banner on the homepage. Must be <strong>16:9 ratio</strong>, 1920x1080px recommended. JPG or WebP for best compression.</li>
                <li><strong>Social Share Image (OG):</strong> Shown when someone shares your site on Facebook, LinkedIn, Twitter etc. <strong>1200×630px</strong> is the standard size. Include your logo and tagline.</li>
                <li><strong>Site Logo:</strong> Main logo in header/footer. Use transparent PNG or SVG. Recommended: 200x60px minimum.</li>
                <li><strong>Favicon:</strong> Small icon shown in browser tabs. Must be square (1:1). Recommended: 512x512px PNG.</li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
                ⭐ <strong>Priority:</strong> Home Hero and Social Share Image are critical for launch. They are the first things visitors see.
              </p>
            </>
          )}
          {activeTab === 'destinations' && (
            <>
              <h3>🗺️ Destination Images</h3>
              <p>Hero images for each cruise destination. These appear at the top of destination pages.</p>
              <ul>
                <li><strong>Hero Image:</strong> Large banner image showing the destination. Must be <strong>16:9 aspect ratio</strong>.</li>
                <li><strong>Recommended size:</strong> 1920x1080px or larger for best quality on all screens.</li>
                <li><strong>Max file size:</strong> 4MB (JPG, PNG, or WebP)</li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
                💡 Tip: Use high-quality landscape photos that capture the essence of each destination.
              </p>
            </>
          )}
          {activeTab === 'cruise-lines' && (
            <>
              <h3>🚢 Cruise Line Assets</h3>
              <p>Images and logos for each cruise line brand. These appear on cruise line pages and cards.</p>
              <ul>
                <li><strong>Logo:</strong> Official cruise line logo. Use transparent PNG or SVG. Max 1MB.</li>
                <li><strong>Card Image:</strong> Thumbnail image for cards/listings. <strong>16:9 ratio</strong>, 800x450px recommended.</li>
                <li><strong>Hero Image:</strong> Large banner for cruise line page header. <strong>16:9 ratio</strong>, 1920x1080px recommended.</li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
                ⚠️ Logos: PNG files MUST have a transparent background. SVG is preferred.
              </p>
            </>
          )}
          {activeTab === 'ships' && (
            <>
              <h3>⚓ Ship Images</h3>
              <p>Images for individual ships. These appear on ship detail pages and in ship listings.</p>
              <ul>
                <li><strong>Card Image:</strong> Ship thumbnail for cards/listings. <strong>16:9 ratio</strong>, 800x450px recommended.</li>
                <li><strong>Hero Image:</strong> Large banner for ship page header. <strong>16:9 ratio</strong>, 1920x1080px recommended.</li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
                💡 Tip: Use exterior shots showing the full ship, or dramatic sailing images.
              </p>
            </>
          )}
        </div>

        {/* Assets Table */}
        <div className="admin-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Preview</th>
                  <th>Name</th>
                  <th style={{ width: '120px' }}>Status</th>
                  <th style={{ width: '180px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const asset = getAsset(row.assetType, row.entityKey);
                  const uploadKey = `${row.assetType}-${row.entityKey || 'site'}`;
                  const isUploading = uploading[uploadKey];
                  
                  return (
                    <tr key={row.id}>
                      <td>
                        {asset?.url ? (
                          <div className="admin-asset-thumbnail">
                            <img
                              src={asset.url}
                              alt={row.label}
                              className="admin-thumbnail-img"
                            />
                          </div>
                        ) : (
                          <div className="admin-asset-placeholder">
                            <Image size={24} />
                          </div>
                        )}
                      </td>
                      <td>
                        <div>
                          <strong>{row.label}</strong>
                          {row.description && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '0.25rem' }}>
                              {row.description}
                            </div>
                          )}
                          {asset && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-success)', marginTop: '0.25rem' }}>
                              ✓ {asset.width && asset.height && `${asset.width}×${asset.height}`}
                              {asset.bytes && ` • ${(asset.bytes / 1024).toFixed(0)}KB`}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        {asset ? (
                          <span className="admin-badge admin-badge-success">
                            <Check size={14} />
                            Uploaded
                          </span>
                        ) : (
                          <span className="admin-badge admin-badge-warning">
                            Missing
                          </span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <label className="admin-btn admin-btn-sm admin-btn-primary" style={{ cursor: 'pointer' }}>
                            <input
                              type="file"
                              accept={VALIDATION_RULES[row.assetType]?.formats.join(',') || 'image/*'}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleUpload(file, row.assetType, row.entityKey);
                                }
                                e.target.value = ''; // Reset
                              }}
                              style={{ display: 'none' }}
                              disabled={isUploading}
                            />
                            <Upload size={14} />
                            {isUploading ? 'Uploading...' : (asset ? 'Replace' : 'Upload')}
                          </label>
                          {asset && (
                            <>
                              <a
                                href={asset.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-btn admin-btn-sm admin-btn-secondary"
                              >
                                Preview
                              </a>
                              <button
                                onClick={() => handleRemove(row.assetType, row.entityKey)}
                                className="admin-btn admin-btn-sm admin-btn-danger"
                                disabled={loading}
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Destination Modal */}
        {showAddDestination && (
          <div className="admin-modal-overlay" onClick={() => setShowAddDestination(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>Add New Destination</h2>
                <button onClick={() => setShowAddDestination(false)} className="admin-modal-close">
                  <X size={20} />
                </button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label htmlFor="dest-slug">Slug (URL-friendly)</label>
                  <input
                    id="dest-slug"
                    type="text"
                    value={newDestination.slug}
                    onChange={(e) => setNewDestination(prev => ({ ...prev, slug: e.target.value }))}
                    className="admin-input"
                    placeholder="mediterranean-cruises"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="dest-name">Name</label>
                  <input
                    id="dest-name"
                    type="text"
                    value={newDestination.name}
                    onChange={(e) => setNewDestination(prev => ({ ...prev, name: e.target.value }))}
                    className="admin-input"
                    placeholder="Mediterranean"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="dest-region">Region (optional)</label>
                  <input
                    id="dest-region"
                    type="text"
                    value={newDestination.region}
                    onChange={(e) => setNewDestination(prev => ({ ...prev, region: e.target.value }))}
                    className="admin-input"
                    placeholder="Europe"
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button onClick={() => setShowAddDestination(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAddDestination} className="admin-btn admin-btn-primary">
                  Add Destination
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-website-assets {
          max-width: 1400px;
        }

        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--admin-text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-tab:hover {
          color: var(--admin-text);
          background: var(--admin-bg-tertiary);
        }

        .admin-tab.active {
          color: var(--admin-primary);
          border-bottom-color: var(--admin-primary);
        }

        .admin-asset-thumbnail {
          width: 80px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
          background: var(--admin-bg-tertiary);
        }

        .admin-thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .admin-asset-placeholder {
          width: 80px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--admin-bg-tertiary);
          border-radius: 4px;
          color: var(--admin-text-dim);
        }

        .admin-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          position: relative;
        }

        .admin-alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }

        .admin-alert-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
        }

        .admin-alert-close {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: currentColor;
          cursor: pointer;
          padding: 0.25rem;
          opacity: 0.7;
        }

        .admin-alert-close:hover {
          opacity: 1;
        }

        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .admin-modal {
          background: var(--admin-bg-secondary);
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .admin-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--admin-text-primary);
        }

        .admin-modal-close {
          background: none;
          border: none;
          color: var(--admin-text-muted);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .admin-modal-close:hover {
          background: var(--admin-bg-tertiary);
          color: var(--admin-text-primary);
        }

        .admin-modal-body {
          padding: 1.5rem;
        }

        .admin-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1.5rem;
          border-top: 1px solid var(--admin-border);
        }

        .admin-form-group {
          margin-bottom: 1.5rem;
        }

        .admin-form-group:last-child {
          margin-bottom: 0;
        }

        .admin-form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--admin-text-primary);
          margin-bottom: 0.5rem;
        }

        .admin-input {
          width: 100%;
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 6px;
          padding: 0.75rem;
          color: var(--admin-text-primary);
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .admin-input:focus {
          outline: none;
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .admin-btn-danger {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .admin-btn-danger:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .admin-btn-danger:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .admin-info-box {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
        }

        .admin-info-box h3 {
          margin: 0 0 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--admin-text-primary);
        }

        .admin-info-box p {
          margin: 0 0 0.75rem 0;
          font-size: 0.875rem;
          color: var(--admin-text-secondary);
          line-height: 1.5;
        }

        .admin-info-box ul {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.8125rem;
          color: var(--admin-text-secondary);
          line-height: 1.7;
        }

        .admin-info-box li {
          margin-bottom: 0.375rem;
        }

        .admin-info-box li:last-child {
          margin-bottom: 0;
        }

        .admin-info-box strong {
          color: var(--admin-text-primary);
          font-weight: 600;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminWebsiteAssets;
