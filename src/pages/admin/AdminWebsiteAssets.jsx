/**
 * Admin Website Assets Page
 * 
 * Reference page showing all website assets and their URLs.
 * Images are uploaded manually to Vercel Blob and URLs are hardcoded in config.
 * 
 * To update images:
 * 1. Upload to Vercel Blob: https://vercel.com/[team]/[project]/stores
 * 2. Update URL in: src/config/assetUrls.js
 * 3. Deploy
 */

import { useState } from 'react';
import { Image, MapPin, Ship, Globe, ExternalLink, Check, X, Copy } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  SITE_ASSETS, 
  DESTINATION_HEROES, 
  CRUISE_LINE_LOGOS,
  CRUISE_LINE_HEROES,
  CRUISE_LINE_CARDS,
  BLOB_BASE,
  PLACEHOLDER_IMAGE 
} from '../../config/assetUrls';
import { cruiseLines } from '../../data/cruiseLines';

// Destination list
const DESTINATIONS = [
  { slug: 'caribbean', name: 'Caribbean' },
  { slug: 'mediterranean', name: 'Mediterranean' },
  { slug: 'northern-europe', name: 'Northern Europe' },
  { slug: 'alaska', name: 'Alaska' },
  { slug: 'asia', name: 'Asia' },
  { slug: 'australia-new-zealand', name: 'Australia & New Zealand' },
  { slug: 'south-america', name: 'South America' },
  { slug: 'africa', name: 'Africa' },
  { slug: 'middle-east', name: 'Middle East' },
  { slug: 'hawaii', name: 'Hawaii' },
  { slug: 'transatlantic', name: 'Transatlantic' },
  { slug: 'world-cruises', name: 'World Cruises' },
];

function AdminWebsiteAssets() {
  const { isAuthenticated, authLoading, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('site');
  const [copiedUrl, setCopiedUrl] = useState(null);

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Check if URL exists (not placeholder)
  const hasImage = (url) => {
    return url && url !== PLACEHOLDER_IMAGE && !url.includes('Coming Soon');
  };

  // Render asset row
  const renderAssetRow = (name, url, uploadPath) => {
    const exists = hasImage(url);
    return (
      <tr key={name}>
        <td className="asset-preview">
          {exists ? (
            <img src={url} alt={name} className="asset-thumbnail" />
          ) : (
            <div className="asset-placeholder">
              <Image size={24} />
            </div>
          )}
        </td>
        <td className="asset-name">
          <strong>{name}</strong>
          <span className="asset-path">{uploadPath}</span>
        </td>
        <td className="asset-status">
          {exists ? (
            <span className="status-badge status-uploaded">
              <Check size={14} /> Uploaded
            </span>
          ) : (
            <span className="status-badge status-missing">
              <X size={14} /> Missing
            </span>
          )}
        </td>
        <td className="asset-actions">
          {exists && (
            <>
              <button
                className="admin-btn admin-btn-sm"
                onClick={() => copyToClipboard(url)}
                title="Copy URL"
              >
                <Copy size={14} />
                {copiedUrl === url ? 'Copied!' : 'Copy URL'}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn-sm"
                title="View Image"
              >
                <ExternalLink size={14} />
                View
              </a>
            </>
          )}
        </td>
      </tr>
    );
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

  const tabs = [
    { id: 'site', label: 'Site', icon: Globe },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'cruise-lines', label: 'Cruise Lines', icon: Ship },
  ];

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={null}
    >
      <div className="admin-website-assets">
        <header className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Website Assets</h1>
            <p className="admin-page-subtitle">
              Reference for all website images
            </p>
          </div>
        </header>

        {/* Instructions */}
        <div className="admin-info-box" style={{ marginBottom: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#60a5fa' }}>📋 How to Update Images</h3>
          <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#94a3b8' }}>
            <li>Upload image to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>Vercel Blob Storage</a></li>
            <li>Copy the URL</li>
            <li>Update <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>src/config/assetUrls.js</code></li>
            <li>Deploy to see changes</li>
          </ol>
          <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
            <strong>Blob Base URL:</strong> <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>{BLOB_BASE}</code>
          </p>
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

        {/* Content */}
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Preview</th>
                <th>Asset</th>
                <th style={{ width: '120px' }}>Status</th>
                <th style={{ width: '180px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'site' && (
                <>
                  {renderAssetRow('Home Page Hero', SITE_ASSETS.homeHero, 'site/home-hero.webp')}
                  {renderAssetRow('Social Share (OG)', SITE_ASSETS.ogImage, 'site/og-image.webp')}
                  {renderAssetRow('Site Logo', SITE_ASSETS.logo, 'site/logo.webp')}
                  {renderAssetRow('Favicon', SITE_ASSETS.favicon, 'site/favicon.png')}
                </>
              )}

              {activeTab === 'destinations' && (
                <>
                  {DESTINATIONS.map(dest => (
                    renderAssetRow(
                      dest.name,
                      DESTINATION_HEROES[dest.slug],
                      `destinations/${dest.slug}-HERO.webp`
                    )
                  ))}
                </>
              )}

              {activeTab === 'cruise-lines' && (
                <>
                  {cruiseLines.flatMap(line => [
                    <tr key={`${line.id}-header`} className="cruise-line-group">
                      <td colSpan="4">
                        <strong>{line.name}</strong>
                      </td>
                    </tr>,
                    renderAssetRow(
                      `${line.name} - Logo`,
                      CRUISE_LINE_LOGOS[line.id],
                      `cruise-lines/${line.id}-LOGO.webp`
                    ),
                    renderAssetRow(
                      `${line.name} - Hero`,
                      CRUISE_LINE_HEROES[line.id],
                      `cruise-lines/${line.id}-HERO.webp`
                    ),
                    renderAssetRow(
                      `${line.name} - Card`,
                      CRUISE_LINE_CARDS[line.id],
                      `cruise-lines/${line.id}-CARD.webp`
                    ),
                  ])}
                </>
              )}
            </tbody>
          </table>
        </div>

        <style>{`
          .admin-website-assets .admin-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            overflow: hidden;
          }
          .admin-website-assets .admin-table {
            width: 100%;
            border-collapse: collapse;
          }
          .admin-website-assets .admin-table th {
            background: rgba(0, 0, 0, 0.3);
            padding: 1rem;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .admin-website-assets .admin-table td {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            vertical-align: middle;
          }
          .admin-website-assets .admin-table tr:hover td {
            background: rgba(255, 255, 255, 0.02);
          }
          .asset-thumbnail {
            width: 80px;
            height: 48px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          }
          .asset-placeholder {
            width: 80px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.8) 100%);
            border-radius: 6px;
            border: 1px dashed rgba(255,255,255,0.15);
            color: #475569;
          }
          .asset-name {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }
          .asset-name strong {
            color: #e2e8f0;
            font-weight: 500;
          }
          .asset-path {
            font-size: 0.7rem;
            color: #64748b;
            font-family: 'SF Mono', Monaco, monospace;
            background: rgba(0,0,0,0.2);
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            display: inline-block;
          }
          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.35rem 0.75rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }
          .status-uploaded {
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.3);
          }
          .status-missing {
            background: rgba(239, 68, 68, 0.15);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.3);
          }
          .asset-actions {
            display: flex;
            gap: 0.5rem;
          }
          .admin-btn-sm {
            padding: 0.4rem 0.75rem;
            font-size: 0.7rem;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 6px;
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
          }
          .admin-btn-sm:hover {
            background: rgba(255,255,255,0.1);
            color: #e2e8f0;
            border-color: rgba(255,255,255,0.2);
          }
          .cruise-line-group td {
            background: rgba(30, 41, 59, 0.5) !important;
            border-top: 2px solid rgba(99, 102, 241, 0.3) !important;
            padding: 0.75rem 1rem !important;
          }
          .cruise-line-group td strong {
            color: #a5b4fc;
            font-size: 0.85rem;
          }
          .admin-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            background: rgba(0, 0, 0, 0.2);
            padding: 0.5rem;
            border-radius: 10px;
            width: fit-content;
          }
          .admin-tab {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1rem;
            border-radius: 6px;
            border: none;
            background: transparent;
            color: #94a3b8;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .admin-tab:hover {
            background: rgba(255,255,255,0.05);
            color: #e2e8f0;
          }
          .admin-tab.active {
            background: rgba(99, 102, 241, 0.2);
            color: #a5b4fc;
          }
          .admin-info-box {
            border-radius: 10px;
            padding: 1.25rem;
          }
          .admin-info-box h3 {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }
          .admin-info-box ol {
            line-height: 1.8;
          }
          .admin-info-box code {
            font-size: 0.75rem;
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}

export default AdminWebsiteAssets;
