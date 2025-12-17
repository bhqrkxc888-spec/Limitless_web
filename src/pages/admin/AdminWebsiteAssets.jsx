/**
 * Admin Website Assets Page
 * 
 * Read-only asset status dashboard showing which assets exist
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, MapPin, Ship, Globe, RefreshCw } from 'lucide-react';
import { destinations } from '../../config/destinations';
import { cruiseLines } from '../../data/cruiseLines';
import OptimizedImage from '../../components/OptimizedImage';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

const VERCEL_BLOB_BASE = 'https://public.blob.vercel-storage.com';

// Helper functions to build expected Blob paths
const getDestinationHeroPath = (slug) => `destinations/${slug}-HERO.jpg`;
const getCruiseLineLogoPath = (id) => `cruise-lines/${id}-LOGO.png`;
const getCruiseLineCardPath = (id) => `cruise-lines/${id}-CARD.jpg`;
const getCruiseLineHeroPath = (id) => `cruise-lines/${id}-HERO.jpg`;
const getShipCardPath = (shipName, cruiseLineId) => {
  const shipKey = shipName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `ships/${cruiseLineId}-${shipKey}-CARD.jpg`;
};
const getShipHeroPath = (shipName, cruiseLineId) => {
  const shipKey = shipName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `ships/${cruiseLineId}-${shipKey}-HERO.jpg`;
};

// Helper to get full Blob URL
const getBlobUrlFromPath = (path) => `${VERCEL_BLOB_BASE}/${path}`;

// Check if asset exists via image load (works for all asset types)
const checkAssetExists = async (url) => {
  return new Promise((resolve) => {
    const img = new window.Image();
    let resolved = false;
    
    const cleanup = () => {
      if (!resolved) {
        resolved = true;
        img.onload = null;
        img.onerror = null;
      }
    };
    
    img.onload = () => {
      cleanup();
      resolve(true);
    };
    
    img.onerror = () => {
      cleanup();
      resolve(false);
    };
    
    img.src = url;
    
    // Timeout after 5 seconds
    setTimeout(() => {
      if (!resolved) {
        cleanup();
        resolve(false);
      }
    }, 5000);
  });
};

// Batch check assets with throttling
const checkAssetsBatch = async (assets, batchSize = 5, delay = 200) => {
  const results = {};
  
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    const batchPromises = batch.map(async (asset) => {
      const exists = await checkAssetExists(asset.url);
      return { key: asset.key, exists };
    });
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(({ key, exists }) => {
      results[key] = exists;
    });
    
    // Delay between batches
    if (i + batchSize < assets.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
};

function AdminWebsiteAssets() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [activeTab, setActiveTab] = useState('destinations');
  const [assetStatus, setAssetStatus] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Generate assets list based on active tab
  const getAssetsForTab = useCallback(() => {
    switch (activeTab) {
      case 'site':
        return [
          { key: 'site-logo', entityName: 'Site Logo', assetType: 'Logo', path: 'site/site-logo.svg', url: getBlobUrlFromPath('site/site-logo.svg') },
          { key: 'site-logo-png', entityName: 'Site Logo', assetType: 'Logo', path: 'site/site-logo.png', url: getBlobUrlFromPath('site/site-logo.png') },
          { key: 'site-favicon', entityName: 'Favicon', assetType: 'Favicon', path: 'site/favicon.png', url: getBlobUrlFromPath('site/favicon.png') }
        ];
      
      case 'destinations':
        return destinations.map(dest => ({
          key: `dest-${dest.slug}-hero`,
          entityName: dest.name,
          entityKey: dest.slug,
          assetType: 'Hero',
          path: getDestinationHeroPath(dest.slug),
          url: getBlobUrlFromPath(getDestinationHeroPath(dest.slug))
        }));
      
      case 'cruise-lines': {
        const cruiseLineAssets = [];
        cruiseLines.forEach(cl => {
          cruiseLineAssets.push(
            { key: `cl-${cl.id}-logo`, entityName: cl.name, entityKey: cl.id, assetType: 'Logo', path: getCruiseLineLogoPath(cl.id), url: getBlobUrlFromPath(getCruiseLineLogoPath(cl.id)) },
            { key: `cl-${cl.id}-card`, entityName: cl.name, entityKey: cl.id, assetType: 'Card', path: getCruiseLineCardPath(cl.id), url: getBlobUrlFromPath(getCruiseLineCardPath(cl.id)) },
            { key: `cl-${cl.id}-hero`, entityName: cl.name, entityKey: cl.id, assetType: 'Hero', path: getCruiseLineHeroPath(cl.id), url: getBlobUrlFromPath(getCruiseLineHeroPath(cl.id)) }
          );
        });
        return cruiseLineAssets;
      }
      
      case 'ships': {
        const shipAssets = [];
        cruiseLines.forEach(cl => {
          if (cl.ships && Array.isArray(cl.ships)) {
            cl.ships.forEach(shipName => {
              shipAssets.push(
                { key: `ship-${cl.id}-${shipName}-card`, entityName: shipName, entityKey: `${cl.id}-${shipName}`, assetType: 'Card', path: getShipCardPath(shipName, cl.id), url: getBlobUrlFromPath(getShipCardPath(shipName, cl.id)), cruiseLine: cl.name },
                { key: `ship-${cl.id}-${shipName}-hero`, entityName: shipName, entityKey: `${cl.id}-${shipName}`, assetType: 'Hero', path: getShipHeroPath(shipName, cl.id), url: getBlobUrlFromPath(getShipHeroPath(shipName, cl.id)), cruiseLine: cl.name }
              );
            });
          }
        });
        return shipAssets;
      }
      
      default:
        return [];
    }
  }, [activeTab]);

  // Check assets when tab changes or on manual refresh
  const checkAssets = useCallback(async () => {
    const assets = getAssetsForTab();
    if (assets.length === 0) return;
    
    setIsChecking(true);
    try {
      const results = await checkAssetsBatch(assets);
      setAssetStatus(prev => ({ ...prev, ...results }));
      setLastChecked(Date.now());
    } catch (error) {
      console.error('Error checking assets:', error);
    } finally {
      setIsChecking(false);
    }
  }, [getAssetsForTab]);

  // Check assets when tab changes (only if not already checked)
  useEffect(() => {
    const assets = getAssetsForTab();
    const needsCheck = assets.some(asset => assetStatus[asset.key] === undefined);
    if (needsCheck && !isChecking) {
      checkAssets();
    }
  }, [activeTab, getAssetsForTab, assetStatus, isChecking, checkAssets]);

  // Calculate stats
  const getStats = () => {
    const assets = getAssetsForTab();
    const found = assets.filter(asset => assetStatus[asset.key] === true).length;
    const total = assets.length;
    return { found, total };
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

  const assets = getAssetsForTab();
  const stats = getStats();
  const tabs = [
    { id: 'site', label: 'Site', icon: Globe },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'cruise-lines', label: 'Cruise Lines', icon: Ship },
    { id: 'ships', label: 'Ships', icon: Ship }
  ];

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastChecked}
      onRefresh={checkAssets}
      isRefreshing={isChecking}
    >
      <div className="admin-website-assets">
        <header className="admin-page-header">
          <div className="admin-page-header-row">
            <div>
              <h1 className="admin-page-title">Website Assets</h1>
              <p className="admin-page-subtitle">
                Monitor asset status across the website
              </p>
            </div>
            <button
              className="admin-btn admin-btn-primary"
              onClick={checkAssets}
              disabled={isChecking}
            >
              <RefreshCw size={16} className={isChecking ? 'spinning' : ''} />
              {isChecking ? 'Checking...' : 'Refresh Status'}
            </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="admin-stats-grid" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Found</div>
            <div className={`admin-stat-value ${stats.found === stats.total ? 'success' : stats.found > 0 ? 'warning' : 'error'}`}>
              {stats.found}
            </div>
            <div className="admin-stat-subtitle">of {stats.total} assets</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Missing</div>
            <div className={`admin-stat-value ${stats.found === stats.total ? 'success' : 'error'}`}>
              {stats.total - stats.found}
            </div>
            <div className="admin-stat-subtitle">assets</div>
          </div>
        </div>

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

        {/* Assets Table */}
        <div className="admin-card">
          {assets.length === 0 ? (
            <div className="admin-empty">
              <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)', margin: 0 }}>
                No assets found for this section
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Preview</th>
                    <th>Entity Name</th>
                    <th>Asset Type</th>
                    <th>Expected Path</th>
                    <th style={{ width: '100px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => {
                    const exists = assetStatus[asset.key] === true;
                    const checking = assetStatus[asset.key] === undefined && isChecking;
                    
                    return (
                      <tr key={asset.key}>
                        <td>
                          {exists ? (
                            <div className="admin-asset-thumbnail">
                              <OptimizedImage
                                src={asset.url}
                                alt={asset.entityName}
                                width={60}
                                height={40}
                                className="admin-thumbnail-img"
                                style={{ objectFit: 'cover', borderRadius: '4px' }}
                              />
                            </div>
                          ) : (
                            <div className="admin-asset-placeholder">
                              <Image size={24} style={{ opacity: 0.3 }} />
                            </div>
                          )}
                        </td>
                        <td>
                          <div>
                            <strong>{asset.entityName}</strong>
                            {asset.cruiseLine && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '0.25rem' }}>
                                {asset.cruiseLine}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="admin-badge admin-badge-info">
                            {asset.assetType}
                          </span>
                        </td>
                        <td>
                          <code style={{ 
                            fontSize: '0.75rem', 
                            color: 'var(--admin-text-dim)',
                            background: 'var(--admin-bg-tertiary)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            wordBreak: 'break-all'
                          }}>
                            {asset.path}
                          </code>
                        </td>
                        <td>
                          {checking ? (
                            <span className="admin-badge admin-badge-info">
                              Checking...
                            </span>
                          ) : exists ? (
                            <span className="admin-badge admin-badge-success">
                              Found
                            </span>
                          ) : (
                            <span className="admin-badge admin-badge-error">
                              Missing
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-website-assets {
          max-width: 1400px;
        }

        .admin-page-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
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
          transition: all var(--admin-transition);
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
          width: 60px;
          height: 40px;
          border-radius: 4px;
          overflow: hidden;
          background: var(--admin-bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-thumbnail-img {
          width: 100%;
          height: 100%;
        }

        .admin-asset-placeholder {
          width: 60px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--admin-bg-tertiary);
          border-radius: 4px;
          color: var(--admin-text-dim);
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        code {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminWebsiteAssets;
