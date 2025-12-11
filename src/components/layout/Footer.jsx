import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* TODO: Add more footer sections (contact info, social links, etc.) */}
        <div className="footer-links">
          <Link to="/booking-terms" className="footer-link">Booking Terms & Conditions</Link>
          <Link to="/website-terms" className="footer-link">Website Terms</Link>
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <Link to="/cookie-policy" className="footer-link">Cookie Policy (UK)</Link>
        </div>
        
        <div className="footer-legal">
          {siteConfig.footerLegalText.map((paragraph, index) => (
            <p key={index} className="legal-text">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

