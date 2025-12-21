/**
 * Admin Layout Component
 * 
 * Provides the admin dashboard layout with sidebar navigation
 */

import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Activity, 
  Search, 
  LogOut,
  RefreshCw,
  Menu,
  X,
  FileText,
  ExternalLink,
  ClipboardList,
  Image,
  MapPin,
  Gauge
} from 'lucide-react';
import { useState, useEffect } from 'react';
import './AdminLayout.css';

// Add noindex meta tag for all admin pages
const AdminSEO = () => {
  useEffect(() => {
    // Set noindex, nofollow for admin pages
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');
    
    // Update title
    document.title = 'Admin | Limitless Cruises';
    
    return () => {
      // Reset when leaving admin area
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    };
  }, []);
  
  return null;
};

function AdminLayout({ children, onLogout, lastUpdated, onRefresh, isRefreshing }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await onLogout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Overview', exact: true },
    { path: '/admin/errors', icon: AlertTriangle, label: 'Errors' },
    { path: '/admin/lighthouse', icon: Gauge, label: 'Lighthouse' },
    { path: '/admin/seo', icon: Search, label: 'SEO' },
    { type: 'divider' },
    { type: 'section', label: 'Website' },
    { path: '/admin/website/assets', icon: Image, label: 'Assets' },
    { path: '/admin/website/destinations', icon: MapPin, label: 'Destinations' }
  ];

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    const seconds = Math.floor((Date.now() - lastUpdated) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return new Date(lastUpdated).toLocaleTimeString();
  };

  return (
    <div className="admin-layout">
      <AdminSEO />
      {/* Mobile Header */}
      <header className="admin-mobile-header">
        <button 
          className="admin-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="admin-mobile-title">Monitoring</h1>
        <button 
          className="admin-refresh-btn-mobile"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh data"
        >
          <RefreshCw size={20} className={isRefreshing ? 'spinning' : ''} />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h1 className="admin-logo">Monitoring</h1>
          <span className="admin-subtitle">Limitless Cruises</span>
        </div>

        <nav className="admin-nav">
          {navItems.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={`divider-${index}`} className="admin-nav-divider" />;
            }
            if (item.type === 'section') {
              return (
                <div key={`section-${index}`} className="admin-nav-section">
                  {item.label}
                </div>
              );
            }
            const { path, icon: Icon, label, exact } = item;
            const IconComponent = Icon;
            return (
              <NavLink
                key={path}
                to={path}
                end={exact}
                className={({ isActive }) => 
                  `admin-nav-item ${isActive ? 'active' : ''}`
                }
              >
                <IconComponent size={20} />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-last-updated">
            <span className="label">Last updated:</span>
            <span className="value">{formatLastUpdated()}</span>
          </div>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="admin-site-link"
          >
            <ExternalLink size={16} />
            <span>Back to Site</span>
          </a>
          <a 
            href="/preview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="admin-preview-link"
          >
            <FileText size={16} />
            <span>Hidden Pages</span>
          </a>
          <button 
            className="admin-refresh-btn"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? 'spinning' : ''} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;

