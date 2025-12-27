/**
 * Admin Image Management Dashboard
 * 
 * Main overview page showing status of all image categories
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, MapPin, Ship, Anchor, Grid, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import StatusIndicator from '../../components/admin/StatusIndicator';
import { logger } from '../../utils/logger';
import './AdminImageManagement.css';

function AdminImageManagement() {
  const [stats, setStats] = useState({
    site: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    destinations: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    cruiseLines: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    ships: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    categories: { total: 0, compliant: 0, warnings: 0, missing: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Query site_images table for stats
      const { data, error } = await supabase
        .from('site_images')
        .select('entity_type, seo_compliant, validation_warnings');

      if (error) throw error;

      // Calculate stats per entity type
      const newStats = {
        site: { total: 0, compliant: 0, warnings: 0, missing: 0 },
        destinations: { total: 0, compliant: 0, warnings: 0, missing: 0 },
        cruiseLines: { total: 0, compliant: 0, warnings: 0, missing: 0 },
        ships: { total: 0, compliant: 0, warnings: 0, missing: 0 },
        categories: { total: 0, compliant: 0, warnings: 0, missing: 0 },
      };

      data?.forEach(img => {
        const type = img.entity_type === 'cruise-line' ? 'cruiseLines' :
                     img.entity_type === 'destination' ? 'destinations' :
                     img.entity_type === 'ship' ? 'ships' :
                     img.entity_type === 'category' ? 'categories' :
                     img.entity_type === 'site' ? 'site' : null;

        if (type) {
          newStats[type].total++;
          if (img.seo_compliant) {
            newStats[type].compliant++;
          }
          if (img.validation_warnings && JSON.parse(img.validation_warnings).length > 0) {
            newStats[type].warnings++;
          }
        }
      });

      // Calculate missing (expected - uploaded)
      // Site: 4 required (hero, logo, og, favicon)
      newStats.site.missing = Math.max(0, 4 - newStats.site.total);
      
      // Destinations: 30 destinations × 2 required (hero, card) = 60
      newStats.destinations.missing = Math.max(0, 60 - newStats.destinations.total);
      
      // Cruise lines: 57 lines × 3 (logo, hero, card) = 171
      newStats.cruiseLines.missing = Math.max(0, 171 - newStats.cruiseLines.total);
      
      // Categories: 6 categories × 1 (card) = 6
      newStats.categories.missing = Math.max(0, 6 - newStats.categories.total);

      setStats(newStats);
    } catch (error) {
      logger.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusForCategory = (categoryStats) => {
    if (categoryStats.missing > 0 || categoryStats.total === 0) return 'error';
    if (categoryStats.warnings > 0) return 'warning';
    if (categoryStats.compliant === categoryStats.total) return 'pass';
    return 'warning';
  };

  const categories = [
    {
      id: 'site',
      title: 'Site Assets',
      description: 'Hero, logo, OG image, favicon, team photos',
      icon: Image,
      path: '/admin/images/site',
      stats: stats.site,
      color: '#3b82f6'
    },
    {
      id: 'destinations',
      title: 'Destinations',
      description: '30 destinations with hero and card images',
      icon: MapPin,
      path: '/admin/images/destinations',
      stats: stats.destinations,
      color: '#10b981'
    },
    {
      id: 'cruiseLines',
      title: 'Cruise Lines',
      description: '57 cruise lines with logos, heroes, and cards',
      icon: Anchor,
      path: '/admin/images/cruise-lines',
      stats: stats.cruiseLines,
      color: '#8b5cf6'
    },
    {
      id: 'ships',
      title: 'Ships',
      description: 'Ship images and gallery photos',
      icon: Ship,
      path: '/admin/images/ships',
      stats: stats.ships,
      color: '#f59e0b'
    },
    {
      id: 'categories',
      title: 'Categories',
      description: '6 category cards (luxury, family, river, etc.)',
      icon: Grid,
      path: '/admin/images/categories',
      stats: stats.categories,
      color: '#ec4899'
    }
  ];

  if (loading) {
    return (
      <div className="admin-image-management loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  const totalImages = Object.values(stats).reduce((sum, s) => sum + s.total, 0);
  const totalCompliant = Object.values(stats).reduce((sum, s) => sum + s.compliant, 0);
  const totalWarnings = Object.values(stats).reduce((sum, s) => sum + s.warnings, 0);
  const totalMissing = Object.values(stats).reduce((sum, s) => sum + s.missing, 0);
  const compliancePercentage = totalImages > 0 ? Math.round((totalCompliant / totalImages) * 100) : 0;

  return (
    <div className="admin-image-management">
      <div className="page-header">
        <h1>Image Management</h1>
        <p>Manage all static website images with SEO validation</p>
      </div>

      {/* Overall stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Images</div>
          <div className="stat-value">{totalImages}</div>
        </div>
        <div className="stat-card stat-success">
          <div className="stat-label">Compliant</div>
          <div className="stat-value">{totalCompliant}</div>
        </div>
        <div className="stat-card stat-warning">
          <div className="stat-label">With Warnings</div>
          <div className="stat-value">{totalWarnings}</div>
        </div>
        <div className="stat-card stat-error">
          <div className="stat-label">Missing</div>
          <div className="stat-value">{totalMissing}</div>
        </div>
        <div className="stat-card stat-primary">
          <div className="stat-label">Compliance</div>
          <div className="stat-value">{compliancePercentage}%</div>
        </div>
      </div>

      {/* Category cards */}
      <div className="categories-grid">
        {categories.map(category => {
          const CategoryIcon = category.icon;
          const status = getStatusForCategory(category.stats);
          
          return (
            <Link 
              key={category.id} 
              to={category.path} 
              className="category-card"
              style={{ '--category-color': category.color }}
            >
              <div className="category-header">
                <div className="category-icon" style={{ background: `${category.color}15` }}>
                  <CategoryIcon size={24} style={{ color: category.color }} />
                </div>
                <StatusIndicator status={status} size="small" />
              </div>
              
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              
              <div className="category-stats">
                <div className="category-stat">
                  <span className="label">Uploaded:</span>
                  <span className="value">{category.stats.total}</span>
                </div>
                <div className="category-stat">
                  <span className="label">Compliant:</span>
                  <span className="value">{category.stats.compliant}</span>
                </div>
                {category.stats.missing > 0 && (
                  <div className="category-stat stat-missing">
                    <span className="label">Missing:</span>
                    <span className="value">{category.stats.missing}</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Help section */}
      <div className="help-section">
        <h3>Getting Started</h3>
        <ol>
          <li>Review each category to see what images are required</li>
          <li>Upload images with correct dimensions (specs shown on each page)</li>
          <li>Provide descriptive ALT text for accessibility and SEO</li>
          <li>Address any validation warnings (amber) or errors (red)</li>
          <li>Aim for 100% compliance before launch</li>
        </ol>
        <p>
          <strong>Note:</strong> All images are stored in Supabase Storage. Make sure bucket policies are set correctly.
        </p>
      </div>
    </div>
  );
}

export default AdminImageManagement;

