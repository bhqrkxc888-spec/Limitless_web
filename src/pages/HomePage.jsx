import { siteConfig } from '../config/siteConfig';
import './HomePage.css';

function HomePage() {
  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.siteName,
    description: siteConfig.tagline,
    url: 'https://new.limitlesscruises.com',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    knowsAbout: ['Cruise Holidays', 'UK Sailings', 'Worldwide Voyages', 'Travel Planning'],
    memberOf: {
      '@type': 'Organization',
      name: 'ABTA',
      identifier: 'P7541'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '50'
    }
  };

  return (
    <main className="home-page">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {/* Hero Section */}
      <section className="hero-section" aria-label="Hero section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Cruise Holidays with Preferential Rates and Exclusive Offers</h1>
              <p className="hero-description">
                {siteConfig.tagline}. We specialise in finding you the perfect cruise at the best prices, 
                with exclusive deals and personalised service to make your voyage unforgettable.
              </p>
              <div className="hero-cta">
                <a href={`tel:${siteConfig.phone}`} className="btn btn-primary" aria-label={`Call ${siteConfig.phone}`}>
                  Call {siteConfig.phone}
                </a>
                <a href="/contact" className="btn btn-secondary">
                  Get in touch
                </a>
              </div>
            </div>
            {/* TODO: Consider adding a different hero image or visual element here, 
                since the header image is now used as the logo in the header */}
            <div className="hero-visual">
              <div className="hero-accent">
                {/* Decorative element or placeholder for future hero image */}
              </div>
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

