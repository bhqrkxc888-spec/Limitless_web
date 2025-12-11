import { siteConfig } from '../../config/siteConfig';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* TODO: Add more footer sections (contact info, social links, etc.) */}
        <div className="footer-links">
          <a href="/booking-terms" className="footer-link">Booking Terms & Conditions</a>
          <a href="/website-terms" className="footer-link">Website Terms</a>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/cookie-policy" className="footer-link">Cookie Policy (UK)</a>
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

