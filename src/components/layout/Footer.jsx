import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { navigation } from '../../data/navigation';
import { isSiteLaunched } from '../../config/launchConfig';
import { hasConsentDecision } from '../../utils/consentManager';
import { supabase } from '../../lib/supabase';
import { logger } from '../../utils/logger';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [authStatus, setAuthStatus] = useState(isSiteLaunched());
  const [siteSettings, setSiteSettings] = useState(null);

  // Fetch site settings from Supabase
  useEffect(() => {
    const fetchSettings = async () => {
      if (!supabase) {
        logger.info('Supabase not configured, using fallback siteConfig');
        return;
      }

      try {
        const { data, error } = await supabase
          .schema('web')
          .from('site_settings')
          .select('*')
          .eq('site_key', 'main')
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // Not a "no rows" error
            throw error;
          }
          logger.info('No site settings found, using fallback');
        } else {
          setSiteSettings(data);
        }
      } catch (err) {
        logger.error('Error fetching site settings:', err);
      }
    };

    fetchSettings();
  }, []);

  // Listen for authentication changes (e.g., after preview login)
  useEffect(() => {
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

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('preview-auth-change', handleAuthChange);
    };
  }, []);

  // Filter footer navigation based on launch status (reactive to authStatus)
  const footerNav = useMemo(() => {
    if (authStatus || isSiteLaunched()) {
      return navigation.footer; // Show all links when launched or authenticated
    }

    // Hide protected routes when not launched/authenticated
    return {
      ...navigation.footer,
      cruiseLines: [],
      destinations: [],
      cruiseTypes: [],
      company: navigation.footer.company.filter(
        link => !['/bucket-list', '/offers', '/cruise-types'].includes(link.path)
      )
    };
  }, [authStatus]);

  // Get contact info - use Supabase data if available, otherwise fallback to siteConfig
  const contact = siteSettings?.contact_json || {
    phone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address
  };

  // Get social links - use Supabase data if available
  const socials = siteSettings?.socials_json || {};

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="logo-container">
                  <img 
                    src="https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/categories/home/favicon.png" 
                    alt="Limitless Cruises logo - gold cruise ship icon" 
                    className="logo-icon"
                  />
                  <div className="logo-text">
                    <span className="logo-name">Limitless Cruises</span>
                    <span className="logo-tagline">Personal Cruise Consultant</span>
                  </div>
                </div>
              </Link>
              <p className="footer-tagline">{siteConfig.tagline}</p>
              
              {/* Contact Info - from Supabase or fallback */}
              <div className="footer-contact">
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="footer-contact-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>{contact.phone}</span>
                  </a>
                )}
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="footer-contact-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>{contact.email}</span>
                  </a>
                )}
              </div>

              {/* Social Links - from Supabase or fallback */}
              <div className="footer-social">
                <a 
                  href={socials.facebook || 'https://www.facebook.com/profile.php?id=61570469572535'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>
                <a 
                  href={socials.linkedin || 'https://www.linkedin.com/company/limitless-cruises/'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@LimitlessCruises" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                  </svg>
                </a>
                {socials.instagram && (
                  <a 
                    href={socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                  </a>
                )}
                {socials.twitter && (
                  <a 
                    href={socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Twitter/X"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Cruise Lines */}
            {footerNav.cruiseLines.length > 0 && (
              <div className="footer-column">
                <h3 className="footer-column-title">Cruise Lines</h3>
                <ul className="footer-links">
                  {footerNav.cruiseLines.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Destinations */}
            {footerNav.destinations.length > 0 && (
              <div className="footer-column">
                <h3 className="footer-column-title">Destinations</h3>
                <ul className="footer-links">
                  {footerNav.destinations.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
                
                {footerNav.cruiseTypes && footerNav.cruiseTypes.length > 0 && (
                  <>
                    <h3 className="footer-column-title mt-6">Cruise Types</h3>
                    <ul className="footer-links">
                      {footerNav.cruiseTypes.map((link, index) => (
                        <li key={index}>
                          <Link to={link.path}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {/* Company */}
            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <ul className="footer-links">
                {footerNav.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>

              <h3 className="footer-column-title mt-6">Legal</h3>
              <ul className="footer-links">
                {footerNav.legal.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
                {hasConsentDecision() && (
                  <li>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('cookie-consent');
                        localStorage.removeItem('cookie-consent-date');
                        window.location.reload();
                      }}
                      className="footer-link-button"
                    >
                      Cookie Settings
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="footer-legal">
        <div className="container">
          <div className="footer-legal-content">
            {siteConfig.footerLegalText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Price Match Asterisk Note */}
          <div className="footer-price-match-note">
            <p>
              * <strong>Price Match Guarantee:</strong> Subject to <Link to="/price-match-guarantee">terms and conditions</Link>. 
              We'll match any genuine like-for-like quote from an ABTA member.
            </p>
          </div>
          
          <div className="footer-copyright">
            <p>© {currentYear} {siteConfig.siteName}. All rights reserved.</p>
          </div>
          
          {/* Floating Staff Login Button - Bottom Left */}
          <Link to="/admin/login" className="floating-staff-login" aria-label="Staff Login">
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
