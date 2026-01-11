import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import './CruiseFooter.css';

// FB Group URL - placeholder
const FB_GROUP_URL = '#'; // Replace with actual URL

function CruiseFooter() {
  return (
    <footer className="cruise-footer">
      <div className="container">
        <hr className="footer-divider" />

        <div className="footer-content">
          <div className="footer-notice">
            <p>ℹ️ Remember: This guide is for reference only. Always verify details with P&O and venues directly.</p>
          </div>

          <hr className="footer-divider" />

          <div className="footer-brand">
            <p>Made with ♥ by Limitless Cruises</p>
            <p>Personal Cruise Consultants</p>
          </div>

          <div className="footer-links">
            <a href={siteConfig.siteUrl || 'https://www.limitlesscruises.com'} target="_blank" rel="noopener noreferrer">
              Website
            </a>
            <span className="link-separator">|</span>
            <Link to="/contact">Contact</Link>
            <span className="link-separator">|</span>
            <a href={FB_GROUP_URL} target="_blank" rel="noopener noreferrer">
              FB Group
            </a>
          </div>

          <hr className="footer-divider" />

          <div className="footer-cta">
            <p>Planning your next cruise? We'd love to help.</p>
            <Link to="/contact" className="footer-cta-link">
              Get in touch
            </Link>
          </div>

          <hr className="footer-divider" />

          <div className="footer-legal">
            <p>© 2026 Limitless Cruises. Not affiliated with P&O Cruises.</p>
            <Link to="/website-terms" className="footer-legal-link">
              Full disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CruiseFooter;
