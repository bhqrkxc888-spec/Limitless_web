import { useState, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navigation } from '../../data/navigation';
import { siteConfig } from '../../config/siteConfig';
import { isSiteLaunched } from '../../config/launchConfig';
import './Header.css';

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter navigation based on launch status
  const visibleNavItems = useMemo(() => {
    if (isSiteLaunched()) {
      return navigation.main; // Show all items when launched
    }
    
    // Hide protected routes when not launched
    const protectedPaths = ['/cruise-lines', '/destinations', '/bucket-list'];
    return navigation.main.filter(item => !protectedPaths.includes(item.path));
  }, []);

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
            <a href={`tel:${siteConfig.phone}`} className="header-phone">
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="header-logo" onClick={closeMobileMenu}>
              <img 
                src="/images/site-general/header.jpg" 
                alt={siteConfig.siteName}
                className="header-logo-img"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Navigation */}
            <nav 
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
                  Call {siteConfig.phone}
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
