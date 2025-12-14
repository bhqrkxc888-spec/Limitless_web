import { useState, useMemo, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navigation } from '../../data/navigation';
import { siteConfig } from '../../config/siteConfig';
import { isSiteLaunched } from '../../config/launchConfig';
import './Header.css';

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(isSiteLaunched());

  // Listen for authentication changes (e.g., after admin login)
  useEffect(() => {
    // Check auth status on mount and when storage changes
    const checkAuth = () => {
      setAuthStatus(isSiteLaunched());
    };

    // Initial check
    checkAuth();

    // Listen for storage events (when sessionStorage changes in another tab/window)
    const handleStorageChange = (e) => {
      if (e.key === 'limitless_preview_authenticated') {
        checkAuth();
      }
    };

    // Listen for custom event (when auth changes in same window)
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('preview-auth-change', handleAuthChange);

    // Also check periodically (for same-window changes since storage event doesn't fire in same window)
    const interval = setInterval(checkAuth, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('preview-auth-change', handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  // Filter navigation based on launch status (reactive to authStatus)
  const visibleNavItems = useMemo(() => {
    if (authStatus || isSiteLaunched()) {
      return navigation.main; // Show all items when launched or authenticated
    }
    
    // Hide protected routes when not launched/authenticated
    // Note: Dropdown items are handled separately - they're hidden if their parent dropdown is hidden
    const protectedPaths = ['/cruise-lines', '/destinations', '/bucket-list'];
    return navigation.main.filter(item => {
      // Hide items with protected paths
      if (protectedPaths.includes(item.path)) {
        return false;
      }
      // For dropdown menus, check if they contain protected links
      if (item.megaMenu && item.columns) {
        const hasProtectedLinks = item.columns.some(column =>
          column.links.some(link => protectedPaths.includes(link.path))
        );
        // Hide dropdown if all its links are protected (or if it's the explore dropdown)
        if (item.id === 'explore' && hasProtectedLinks) {
          return false;
        }
      }
      return true;
    });
  }, [authStatus]);

  const handleMouseEnter = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <span className="header-top-text">
              ABTA Protected | Personal Cruise Consultant
            </span>
            <div className="header-phone-group">
              <a href={`tel:${siteConfig.phone}`} className="header-phone">
                {siteConfig.phone}
              </a>
              <span className="header-phone-separator">|</span>
              <a href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} target="_blank" rel="noopener noreferrer" className="header-phone header-phone--whatsapp">
                {siteConfig.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="header-logo" onClick={closeMobileMenu}>
              <div className="logo-container">
                <img 
                  src="https://xrbusklskmeaamwynfmm.supabase.co/storage/v1/object/public/categories/Home/Hero-logo.png" 
                  alt="Limitless Cruises logo - gold cruise ship icon" 
                  className="logo-icon"
                />
                <div className="logo-text">
                  <span className="logo-name">Limitless Cruises</span>
                  <span className="logo-tagline">Personal Cruise Consultant</span>
                </div>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="main-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Navigation */}
            <nav 
              id="main-navigation"
              className={`header-nav ${mobileMenuOpen ? 'is-open' : ''}`}
              aria-label="Main navigation"
            >
              <ul className="nav-list">
                {visibleNavItems.map((item) => (
                  <li 
                    key={item.id}
                    className={`nav-item ${item.megaMenu ? 'has-mega-menu' : ''}`}
                    onMouseEnter={() => item.megaMenu && handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                      {item.megaMenu && (
                        <svg className="nav-chevron" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                      )}
                    </NavLink>

                    {/* Mega Menu */}
                    {item.megaMenu && item.columns && (
                      <div className={`mega-menu ${activeMenu === item.id ? 'is-visible' : ''}`}>
                        <div className="mega-menu-content">
                          {item.columns.map((column, colIndex) => (
                            <div key={colIndex} className="mega-menu-column">
                              <h3 className="mega-menu-title">{column.title}</h3>
                              <ul className="mega-menu-list">
                                {column.links.map((link, linkIndex) => (
                                  <li key={linkIndex}>
                                    {link.external ? (
                                      <a 
                                        href={link.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`mega-menu-link ${link.highlight ? 'is-highlight' : ''}`}
                                      >
                                        <span className="mega-menu-link-label">{link.label}</span>
                                        {link.description && (
                                          <span className="mega-menu-link-desc">{link.description}</span>
                                        )}
                                      </a>
                                    ) : (
                                      <Link 
                                        to={link.path}
                                        className={`mega-menu-link ${link.highlight ? 'is-highlight' : ''}`}
                                        onClick={closeMobileMenu}
                                      >
                                        <span className="mega-menu-link-label">{link.label}</span>
                                        {link.description && (
                                          <span className="mega-menu-link-desc">{link.description}</span>
                                        )}
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <div className="nav-cta-mobile">
                <a href={`tel:${siteConfig.phone}`} className="btn btn-primary btn-full">
                  {siteConfig.phone}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
