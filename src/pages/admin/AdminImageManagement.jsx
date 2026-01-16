/**
 * Admin Image Management Dashboard
 * 
 * Main overview page showing status of all image categories
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image, MapPin, Ship, Anchor, Grid, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { logger } from '../../utils/logger';
import { cruiseLines } from '../../data/cruiseLines';
import { destinations } from '../../config/destinations';
import { bucketListExperiences } from '../../data/bucketList';
import { ports } from '../../data/ports';
import { getDestinationForBucketList } from '../../config/bucketListDestinationMapping';
import './AdminImageManagement.css';

function AdminImageManagement() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [stats, setStats] = useState({
    site: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
    destinations: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
    cruiseLines: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
    ships: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
    categories: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
    bucketList: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
    portGuides: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showWarningsOnly, setShowWarningsOnly] = useState(false);
  const [warningImages, setWarningImages] = useState([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadStats = async () => {
    setIsRefreshing(true);
    try {
      // Query site_images table for stats
      const { data, error } = await supabase
        .from('site_images')
        .select('entity_type, seo_compliant, validation_warnings, entity_id, image_type, path');

      if (error) throw error;

      // Define required vs optional image types
      const REQUIRED_IMAGE_TYPES = {
        site: ['hero', 'logo', 'og-image', 'favicon', 'katherine1', 'katherine2', 'katherine3'],
        destination: ['hero', 'card'],
        'cruise-line': ['logo', 'why-choose-1', 'why-choose-2', 'why-choose-3', 'why-choose-4', 'why-choose-5', 'why-choose-6', 'families-kids-1', 'families-kids-2'], // Logo + 6 "Why Choose" images + 2 "Families & Kids" images
        ship: ['card'], // Ship card image required for ship cards on cruise line pages
        category: ['card'],
        'bucket-list': ['hero', 'card'],
        'port-guide': ['hero', 'card'] // Port guides require hero and card images
      };

      const OPTIONAL_IMAGE_TYPES = {
        site: ['hero-mobile', 'agency-logo', 'trust-abta', 'trust-atol', 'trust-clia'],
        destination: ['mobile', 'gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'], // gallery and cruise-line-specific cards are optional
        'cruise-line': [], // All gallery images are now required
        ship: ['exterior', 'deck', 'suite', 'dining', 'pool', 'entertainment', 'spa', 'theater'], // Ship gallery images are optional (card is required)
        category: [],
        'bucket-list': ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'og-image'],
        'port-guide': ['attraction-1', 'attraction-2', 'attraction-3', 'attraction-4', 'attraction-5', 'attraction-6', 'beach', 'food'] // Optional port images (attractions vary by port)
      };

      // Calculate stats per entity type
      const newStats = {
        site: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
        pageHeroes: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
        destinations: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
        cruiseLines: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
        ships: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
        categories: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
        bucketList: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
        portGuides: { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0, requiredUploaded: 0, optionalUploaded: 0, requiredCompliant: 0 },
      };

      const imagesWithWarnings = [];

      // Count uploaded images by type
      data?.forEach(img => {
        // Check if this is a page hero (stored as site entity with page-hero-* image type)
        const isPageHero = img.entity_type === 'site' && img.image_type?.startsWith('page-hero-');
        
        const type = isPageHero ? 'pageHeroes' :
                     img.entity_type === 'cruise-line' ? 'cruiseLines' :
                     img.entity_type === 'destination' ? 'destinations' :
                     img.entity_type === 'ship' ? 'ships' :
                     img.entity_type === 'category' ? 'categories' :
                     img.entity_type === 'bucket-list' ? 'bucketList' :
                     img.entity_type === 'port-guide' ? 'portGuides' :
                     img.entity_type === 'site' ? 'site' : null;

        if (type) {
          newStats[type].total++;
          
          const warnings = img.validation_warnings ? JSON.parse(img.validation_warnings) : [];
          if (warnings.length > 0) {
            newStats[type].warnings++;
            imagesWithWarnings.push({
              entityType: img.entity_type,
              entityId: img.entity_id,
              imageType: img.image_type,
              path: img.path,
              warnings
            });
          }

          // Check if image is required or optional
          const requiredTypes = REQUIRED_IMAGE_TYPES[img.entity_type] || [];
          const optionalTypes = OPTIONAL_IMAGE_TYPES[img.entity_type] || [];
          
          // Check if it's a required type
          // For destinations: 'hero' and 'card' are required, 'card-{cruise-line}' are optional
          // For ships: 'exterior', 'deck', 'suite', 'dining' are required
          // For bucket-list: 'hero' and 'card' are required, 'gallery-*' are optional
          let isRequired = false;
          let isOptional = false;
          
          if (img.entity_type === 'destination') {
            isRequired = img.image_type === 'hero' || img.image_type === 'card';
            isOptional = img.image_type === 'mobile' || 
                       img.image_type.startsWith('gallery-') || 
                       (img.image_type.startsWith('card-') && img.image_type !== 'card');
          } else if (img.entity_type === 'ship') {
            // Ship card images are REQUIRED for fleet carousel
            // Ship gallery images (exterior, deck, etc.) are optional
            isRequired = img.image_type === 'card';
            isOptional = ['exterior', 'deck', 'suite', 'dining', 'pool', 'entertainment', 'spa', 'theater'].includes(img.image_type);
          } else if (img.entity_type === 'bucket-list') {
            isRequired = img.image_type === 'hero' || img.image_type === 'card';
            isOptional = img.image_type.startsWith('gallery-') || img.image_type === 'og-image';
          } else if (isPageHero) {
            // Page heroes are all optional
            isRequired = false;
            isOptional = true;
          } else {
            // For other types, check against defined lists
            isRequired = requiredTypes.includes(img.image_type);
            isOptional = optionalTypes.includes(img.image_type);
          }

          if (isRequired) {
            newStats[type].requiredUploaded++;
            // Track compliant REQUIRED images separately
            if (img.seo_compliant) {
              newStats[type].requiredCompliant++;
            }
          } else if (isOptional) {
            newStats[type].optionalUploaded++;
          }
          
          // Track total compliant images (both required and optional) for overall compliance percentage
          if (img.seo_compliant) {
            newStats[type].compliant++;
          }
        }
      });

      // Calculate missing REQUIRED images only (not counting optional)
      // Site: 7 required (hero, logo, og-image, favicon, katherine1-3) - EXCLUDING page heroes
      const requiredSite = 7;
      newStats.site.missing = Math.max(0, requiredSite - newStats.site.requiredUploaded);
      newStats.site.optional = newStats.site.optionalUploaded; // Count of uploaded optional images
      
      // Page Heroes: All optional, just count what's uploaded
      newStats.pageHeroes.optional = newStats.pageHeroes.optionalUploaded;
      newStats.pageHeroes.missing = 0; // All optional, so no missing count
      
      // Destinations: count actual destinations × 2 required (hero, card)
      const requiredDestinations = destinations.length * 2; // hero + card per destination
      newStats.destinations.missing = Math.max(0, requiredDestinations - newStats.destinations.requiredUploaded);
      newStats.destinations.optional = newStats.destinations.optionalUploaded; // Count of uploaded optional images
      
      // Cruise Lines: count actual cruise lines × 9 required (logo + 6 "Why Choose" images + 2 "Families & Kids" images)
      const requiredCruiseLines = cruiseLines.length * 9;
      newStats.cruiseLines.missing = Math.max(0, requiredCruiseLines - newStats.cruiseLines.requiredUploaded);
      newStats.cruiseLines.optional = newStats.cruiseLines.optionalUploaded;
      
      // Ships: Count all ships and check for required card images
      // Ship card images are required for fleet carousel on cruise line pages
      const allShips = [];
      cruiseLines.forEach(cl => {
        const shipList = cl.fleet || (cl.ships ? cl.ships.map(name => ({ name })) : []);
        shipList.forEach(ship => {
          const shipObj = typeof ship === 'string' ? { name: ship } : ship;
          allShips.push({ cruiseLine: cl.slug, ship: shipObj });
        });
      });
      const requiredShipCards = allShips.length * 1; // 1 card per ship
      newStats.ships.missing = Math.max(0, requiredShipCards - newStats.ships.requiredUploaded);
      newStats.ships.optional = newStats.ships.optionalUploaded; // Gallery images are optional
      
      // Categories: 6 categories × 1 required (card) = 6 required
      const requiredCategories = 6;
      newStats.categories.missing = Math.max(0, requiredCategories - newStats.categories.requiredUploaded);
      newStats.categories.optional = newStats.categories.optionalUploaded;
      
      // Bucket List: count actual experiences × 2 required (hero, card)
      // BUT: Account for shared destination images
      // For each experience, check if it has bucket-list images OR can use destination images
      const bucketListImagesByExperience = {};
      data?.filter(img => img.entity_type === 'bucket-list').forEach(img => {
        if (!bucketListImagesByExperience[img.entity_id]) {
          bucketListImagesByExperience[img.entity_id] = {};
        }
        bucketListImagesByExperience[img.entity_id][img.image_type] = true;
      });

      const destinationImagesBySlug = {};
      data?.filter(img => img.entity_type === 'destination').forEach(img => {
        if (!destinationImagesBySlug[img.entity_id]) {
          destinationImagesBySlug[img.entity_id] = {};
        }
        destinationImagesBySlug[img.entity_id][img.image_type] = true;
      });

      // Count how many experiences have BOTH hero and card (either bucket-list or shared destination)
      // Also track which ones are using shared images (for warning count)
      let experiencesWithBothImages = 0;
      let experiencesUsingShared = 0;
      
      bucketListExperiences.forEach(exp => {
        const bucketHero = bucketListImagesByExperience[exp.id]?.hero;
        const bucketCard = bucketListImagesByExperience[exp.id]?.card;
        
        let hasHero = !!bucketHero;
        let hasCard = !!bucketCard;
        let usingShared = false;
        
        // If missing, check destination fallback
        if (!hasHero || !hasCard) {
          const destinationSlug = getDestinationForBucketList(exp.id);
          if (destinationSlug) {
            if (!hasHero && destinationImagesBySlug[destinationSlug]?.hero) {
              hasHero = true;
              usingShared = true;
            }
            if (!hasCard && destinationImagesBySlug[destinationSlug]?.card) {
              hasCard = true;
              usingShared = true;
            }
          }
        }
        
        if (hasHero && hasCard) {
          experiencesWithBothImages++;
          if (usingShared) {
            experiencesUsingShared++;
          }
        }
      });
      
      // Add warnings for experiences using shared images
      newStats.bucketList.warnings += experiencesUsingShared;

      const requiredBucketList = bucketListExperiences.length * 2; // Total required images
      const availableImages = experiencesWithBothImages * 2; // Images that are available (either bucket-list or shared)
      newStats.bucketList.missing = Math.max(0, requiredBucketList - availableImages);
      newStats.bucketList.optional = newStats.bucketList.optionalUploaded;

      // Port Guides: count published ports × 2 required (hero, card)
      const publishedPorts = ports.filter(p => p.status === 'published');
      const requiredPortGuides = publishedPorts.length * 2; // hero + card per port
      newStats.portGuides.missing = Math.max(0, requiredPortGuides - newStats.portGuides.requiredUploaded);
      newStats.portGuides.optional = newStats.portGuides.optionalUploaded;

      setStats(newStats);
      setWarningImages(imagesWithWarnings);
      setLastUpdated(Date.now());
    } catch (error) {
      logger.error('Error loading stats:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

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

  const getStatusForCategory = (categoryStats) => {
    // Status based on REQUIRED images only
    if (categoryStats.missing > 0) return 'error'; // Missing required images
    if (categoryStats.warnings > 0) return 'warning'; // Has validation warnings
    if (categoryStats.requiredUploaded > 0 && categoryStats.requiredCompliant === categoryStats.requiredUploaded) return 'pass';
    return 'warning';
  };

  const categories = [
    {
      id: 'site',
      title: 'Site Assets',
      description: 'Hero, logo, OG image, favicon, Katherine photos, trust badges',
      icon: Image,
      path: '/admin/images/site',
      stats: stats.site,
      color: '#3b82f6'
    },
    {
      id: 'pageHeroes',
      title: 'Page Heroes',
      description: 'Hero images for main listing pages (Destinations, Bucket List, Cruise Lines, etc.)',
      icon: Image,
      path: '/admin/images/page-heroes',
      stats: stats.pageHeroes || { total: 0, compliant: 0, warnings: 0, missing: 0, optional: 0 },
      color: '#6366f1'
    },
    {
      id: 'destinations',
      title: 'Destinations',
      description: `${destinations.length} destinations: hero, card, cruise-line-specific cards (optional), gallery images (optional), mobile hero (optional)`,
      icon: MapPin,
      path: '/admin/images/destinations',
      stats: stats.destinations,
      color: '#10b981'
    },
    {
      id: 'cruiseLines',
      title: 'Cruise Lines & Ships',
      description: `${cruiseLines.length} cruise lines: logo + 6 "Why Choose" images (one per card) + 2 "Families & Kids" images. Ship card images (required for fleet carousel)`,
      icon: Anchor,
      path: '/admin/images/cruise-lines',
      stats: { 
        total: stats.cruiseLines.total + stats.ships.total,
        compliant: stats.cruiseLines.compliant + stats.ships.compliant,
        warnings: stats.cruiseLines.warnings + stats.ships.warnings,
        missing: stats.cruiseLines.missing + stats.ships.missing
      },
      color: '#8b5cf6'
    },
    {
      id: 'categories',
      title: 'Categories',
      description: '6 category cards (luxury, family, river, etc.)',
      icon: Grid,
      path: '/admin/images/categories',
      stats: stats.categories,
      color: '#ec4899'
    },
    {
      id: 'bucketList',
      title: 'Bucket List Experiences',
      description: `${bucketListExperiences.length} experiences: hero, card (can share with destinations)`,
      icon: Ship,
      path: '/admin/images/bucket-list',
      stats: stats.bucketList || { total: 0, compliant: 0, warnings: 0, missing: 0 },
      color: '#f59e0b'
    },
    {
      id: 'portGuides',
      title: 'Port Guides',
      description: `${ports.filter(p => p.status === 'published').length} published ports: hero, card (required), attractions & beach (optional)`,
      icon: MapPin,
      path: '/admin/images/port-guides',
      stats: stats.portGuides || { total: 0, compliant: 0, warnings: 0, missing: 0 },
      color: '#06b6d4'
    }
    // Note: Ship venue images (P&O Iona, etc.) are managed via Cruise Lines & Ships → select cruise line → select ship
  ];

  const totalImages = Object.values(stats).reduce((sum, s) => sum + s.total, 0);
  const totalCompliant = Object.values(stats).reduce((sum, s) => sum + s.compliant, 0);
  const totalWarnings = Object.values(stats).reduce((sum, s) => sum + s.warnings, 0);
  const totalMissing = Object.values(stats).reduce((sum, s) => sum + s.missing, 0);
  const totalOptional = Object.values(stats).reduce((sum, s) => sum + s.optional, 0);
  const compliancePercentage = totalImages > 0 ? Math.round((totalCompliant / totalImages) * 100) : 0;

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={lastUpdated}
      onRefresh={loadStats}
      isRefreshing={isRefreshing}
    >
      <div className="admin-image-management">
        <header className="admin-page-header">
          <Link to="/admin" className="back-link">
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 className="admin-page-title">Image Management</h1>
          <p className="admin-page-subtitle">Manage all static website images with SEO validation</p>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading image stats...</p>
          </div>
        ) : (
          <>
            {/* Overall stats */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-label">Total Images</div>
                <div className="admin-stat-value">{totalImages}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Compliant</div>
                <div className="admin-stat-value success">{totalCompliant}</div>
              </div>
              <div 
                className="admin-stat-card admin-stat-card-clickable" 
                onClick={() => setShowWarningsOnly(!showWarningsOnly)}
                style={{ cursor: 'pointer' }}
              >
                <div className="admin-stat-label">With Warnings</div>
                <div className="admin-stat-value warning">{totalWarnings}</div>
                {totalWarnings > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '0.25rem' }}>
                    Click to {showWarningsOnly ? 'hide' : 'view'}
                  </div>
                )}
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Missing (Required)</div>
                <div className="admin-stat-value error">{totalMissing}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Optional</div>
                <div className="admin-stat-value" style={{ color: 'var(--admin-text-muted)' }}>{totalOptional}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Compliance</div>
                <div className="admin-stat-value">{compliancePercentage}%</div>
              </div>
            </div>

            {/* Warnings Detail View */}
            {showWarningsOnly && warningImages.length > 0 && (
              <div className="admin-card" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: 'var(--admin-text)' }}>Images with Warnings ({warningImages.length})</h3>
                  <button 
                    onClick={() => setShowWarningsOnly(false)}
                    style={{
                      background: 'var(--admin-bg-tertiary)',
                      border: '1px solid var(--admin-border)',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      color: 'var(--admin-text)',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Close
                  </button>
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Entity</th>
                        <th>Image</th>
                        <th>Warnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warningImages.map((img, idx) => (
                        <tr key={idx}>
                          <td style={{ textTransform: 'capitalize' }}>{img.entityType}</td>
                          <td><code style={{ fontSize: '0.8rem' }}>{img.entityId || 'site'}</code></td>
                          <td style={{ textTransform: 'capitalize' }}>{img.imageType}</td>
                          <td>
                            {img.warnings.map((warning, wIdx) => (
                              <div key={wIdx} style={{ 
                                fontSize: '0.875rem', 
                                color: warning.severity === 'error' ? 'var(--admin-error)' : 'var(--admin-warning)',
                                marginBottom: '0.25rem'
                              }}>
                                <strong>{warning.type.replace(/_/g, ' ')}:</strong> {warning.message}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Category cards */}
            <div className="image-categories-grid">
              {categories.map(category => {
                const CategoryIcon = category.icon;
                const status = getStatusForCategory(category.stats);
                
                return (
                  <Link 
                    key={category.id} 
                    to={category.path} 
                    className="image-category-card"
                  >
                    <div className="category-header">
                      <div className="category-icon" style={{ background: `${category.color}20`, color: category.color }}>
                        <CategoryIcon size={24} />
                      </div>
                      <StatusIndicator status={status} size="small" />
                    </div>
                    
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    
                    <div className="category-stats">
                      <div className="category-stat">
                        <span className="label">Uploaded:</span>
                        <span className="value">{category.stats.requiredUploaded || 0}</span>
                      </div>
                      <div className="category-stat">
                        <span className="label">Compliant:</span>
                        <span className="value">{category.stats.requiredCompliant || 0}</span>
                      </div>
                      {category.stats.missing > 0 && (
                        <div className="category-stat stat-missing">
                          <span className="label">Missing (Required):</span>
                          <span className="value">{category.stats.missing}</span>
                        </div>
                      )}
                      {category.stats.optional > 0 && (
                        <div className="category-stat" style={{ color: 'var(--admin-text-muted)' }}>
                          <span className="label">Optional:</span>
                          <span className="value">{category.stats.optional}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Help section */}
            <div className="admin-card" style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Getting Started</h3>
              <ol style={{ paddingLeft: '1.5rem', color: 'var(--admin-text-muted)', lineHeight: '1.8' }}>
                <li>Review each category to see what images are required</li>
                <li>Upload images with correct dimensions (specs shown on each page)</li>
                <li>Provide descriptive ALT text for accessibility and SEO</li>
                <li>Address any validation warnings (amber) or errors (red)</li>
                <li>Aim for 100% compliance before launch</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminImageManagement;
