import { siteConfig } from '../config/siteConfig';
import './HomePage.css';

function HomePage() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Cruise Holidays with Preferential Rates and Exclusive Offers</h1>
              <p className="hero-description">
                {siteConfig.tagline}. We specialise in finding you the perfect cruise at the best prices, 
                with exclusive deals and personalised service to make your voyage unforgettable.
              </p>
              <div className="hero-cta">
                <a href={`tel:${siteConfig.phone}`} className="btn btn-primary">
                  Call {siteConfig.phone}
                </a>
                <a href="/contact" className="btn btn-secondary">
                  Get in touch
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="/images/site-general/header.jpg" 
                alt="Cruise ship on the ocean" 
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder Section */}
      <section className="explore-section">
        <div className="container">
          <div className="explore-card">
            <h2>Explore Cruise Types</h2>
            <p>
              {/* TODO: Add actual cruise type content and links */}
              Discover our wide range of cruise holidays tailored to your preferences. 
              From luxury ocean liners to intimate river cruises, we have something for every traveller.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

