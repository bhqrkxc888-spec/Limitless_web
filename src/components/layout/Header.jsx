import { siteConfig } from '../../config/siteConfig';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <a href="/" className="brand-link" aria-label="Limitless Cruises Home">
              <img 
                src="/images/site-general/header.jpg" 
                alt="Limitless Cruises - Independent Cruise Specialist" 
                className="brand-logo"
              />
            </a>
          </div>
          <nav className="header-nav" aria-label="Main navigation">
            <ul className="nav-list">
              <li>
                <a href="/" className="nav-link">Home</a>
              </li>
              <li>
                <a href="/find-a-cruise" className="nav-link">Find a Cruise</a>
              </li>
              <li>
                <a href="/about" className="nav-link">About</a>
              </li>
              <li>
                <a href="/contact" className="nav-link">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

