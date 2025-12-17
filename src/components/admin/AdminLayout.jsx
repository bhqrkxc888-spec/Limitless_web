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
  MapPin
} from 'lucide-react';
import { useState, useEffect } from 'react';
import './AdminLayout.css';

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
    { path: '/admin/project-status', icon: ClipboardList, label: 'Project Status' },
    { path: '/admin/errors', icon: AlertTriangle, label: 'Errors' },
    { path: '/admin/performance', icon: Activity, label: 'Performance' },
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
            href="/preview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="admin-preview-link"
          >
            <FileText size={16} />
            <span>Access Hidden Pages</span>
            <ExternalLink size={12} />
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

