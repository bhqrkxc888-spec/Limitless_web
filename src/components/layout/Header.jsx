import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <Link to="/" className="brand-link" aria-label="Limitless Cruises Home">
              <img 
                src="/images/site-general/header.jpg" 
                alt="Limitless Cruises - Independent Cruise Specialist" 
                className="brand-logo"
              />
            </Link>
          </div>
          <nav className="header-nav" aria-label="Main navigation">
            <ul className="nav-list">
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/find-a-cruise" className="nav-link">Find a Cruise</Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

