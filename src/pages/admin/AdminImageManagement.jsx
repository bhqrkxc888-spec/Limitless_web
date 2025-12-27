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
import './AdminImageManagement.css';

function AdminImageManagement() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  
  const [stats, setStats] = useState({
    site: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    destinations: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    cruiseLines: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    ships: { total: 0, compliant: 0, warnings: 0, missing: 0 },
    categories: { total: 0, compliant: 0, warnings: 0, missing: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      newStats.site.missing = Math.max(0, 4 - newStats.site.total);
      newStats.destinations.missing = Math.max(0, 60 - newStats.destinations.total);
      newStats.cruiseLines.missing = Math.max(0, 171 - newStats.cruiseLines.total);
      newStats.categories.missing = Math.max(0, 6 - newStats.categories.total);

      setStats(newStats);
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
    if (categoryStats.missing > 0 || categoryStats.total === 0) return 'error';
    if (categoryStats.warnings > 0) return 'warning';
    if (categoryStats.compliant === categoryStats.total) return 'pass';
    return 'warning';
  };

  const categories = [
    {
      id: 'site',
      title: 'Site Assets',
      description: 'Hero, logo, OG image, favicon, Katherine photos',
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

  const totalImages = Object.values(stats).reduce((sum, s) => sum + s.total, 0);
  const totalCompliant = Object.values(stats).reduce((sum, s) => sum + s.compliant, 0);
  const totalWarnings = Object.values(stats).reduce((sum, s) => sum + s.warnings, 0);
  const totalMissing = Object.values(stats).reduce((sum, s) => sum + s.missing, 0);
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
              <div className="admin-stat-card">
                <div className="admin-stat-label">With Warnings</div>
                <div className="admin-stat-value warning">{totalWarnings}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Missing</div>
                <div className="admin-stat-value error">{totalMissing}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-label">Compliance</div>
                <div className="admin-stat-value">{compliancePercentage}%</div>
              </div>
            </div>

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
