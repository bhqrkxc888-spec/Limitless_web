import { useState, useEffect } from 'react';
import { cruiseLines } from '../data/cruiseLines';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader } from '../components/ui';
import { getCruiseLineImageUrl } from '../config/assetUrls';
import { getImageUrlFromDb } from '../utils/imageLoader';
import './CruiseLinesPage.css';

/**
 * Cruise Line Card Component with Database-Backed Image
 * Fetches image from database, falls back to constructed URL
 * All images are managed via Admin → Images → Cruise Lines & Ships
 */
function CruiseLineCard({ cruiseLine }) {
  const [imageUrl, setImageUrl] = useState(getCruiseLineImageUrl(cruiseLine.slug, 'card'));

  useEffect(() => {
    if (!cruiseLine.slug) return;
    
    const fallback = getCruiseLineImageUrl(cruiseLine.slug, 'card');
    setImageUrl(fallback); // Show fallback immediately
    
    getImageUrlFromDb('cruise-line', cruiseLine.slug, 'card', fallback)
      .then(url => setImageUrl(url))
      .catch(() => setImageUrl(fallback));
  }, [cruiseLine.slug]);

  return (
    <Card key={cruiseLine.id} to={`/cruise-lines/${cruiseLine.slug}`} variant="default">
      <Card.Image 
        src={imageUrl}
        alt={cruiseLine.name}
        aspectRatio="3/2"
      />
      <Card.Content>
        <Card.Title as="h3">{cruiseLine.name}</Card.Title>
        <Card.Description>{cruiseLine.tagline}</Card.Description>
      </Card.Content>
    </Card>
  );
}

function CruiseLinesPage() {
  // Group cruise lines by category
  const mainstream = cruiseLines.filter(cl => cl.category === 'mainstream');
  const premium = cruiseLines.filter(cl => ['premium', 'contemporary'].includes(cl.category));
  const luxury = cruiseLines.filter(cl => ['luxury', 'ultra-luxury', 'expedition'].includes(cl.category));
  const traditional = cruiseLines.filter(cl => cl.category === 'traditional');

  // Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Lines',
    description: 'Browse all cruise lines available through Limitless Cruises',
    itemListElement: cruiseLines.map((cl, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: cl.name,
        url: `https://www.limitlesscruises.com/cruise-lines/${cl.slug}`
      }
    }))
  };

  const renderCruiseLineCards = (lines) => (
    <div className="grid grid-3">
      {lines.map((cruiseLine) => (
        <CruiseLineCard key={cruiseLine.id} cruiseLine={cruiseLine} />
      ))}
    </div>
  );

  return (
    <main className="cruise-lines-page">
      {/* SEO */}
      <SEO
        title="Cruise Lines | P&O, MSC, Royal Caribbean & More | UK Expert Bookings"
        description="Book with confidence through your personal UK cruise consultant. Expert knowledge of all major cruise lines. ABTA protected, exclusive deals."
        canonical="https://www.limitlesscruises.com/cruise-lines"
        structuredData={structuredData}
      />

      {/* Under Development Notice */}
      <div className="under-development-banner">
        <div className="container">
          <div className="under-development-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="under-development-icon">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div className="under-development-text">
              <h3>Content Under Development</h3>
              <p>We're working hard to bring you detailed information about all our cruise line partners. In the meantime, please <a href="/contact">contact us</a> for personalised cruise recommendations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection
        title="Cruise Lines"
        subtitle="We partner with the world's leading cruise lines to bring you exceptional value and memorable experiences."
        size="sm"
        align="center"
      />

      {/* Mainstream Lines */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Popular"
            title="Mainstream Cruise Lines"
            subtitle="Perfect for first-time cruisers and those seeking great value with excellent amenities."
          />
          {renderCruiseLineCards(mainstream)}
        </div>
      </section>

      {/* Premium Lines */}
      {premium.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Premium Experience"
              title="Premium & Contemporary Lines"
              subtitle="Modern luxury and innovative experiences for discerning travellers."
            />
            {renderCruiseLineCards(premium)}
          </div>
        </section>
      )}

      {/* Luxury Lines */}
      {luxury.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Ultra Luxury"
              title="Luxury & Expedition Lines"
              subtitle="The finest cruising experiences with exceptional service and unique destinations."
            />
            {renderCruiseLineCards(luxury)}
          </div>
        </section>
      )}

      {/* Traditional Lines */}
      {traditional.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="British Favourites"
              title="Traditional Cruise Lines"
              subtitle="Smaller ships with friendly British service and access to unique ports."
            />
            {renderCruiseLineCards(traditional)}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Not Sure Which Cruise Line?</h2>
          <p>
            Speak with your dedicated cruise consultant. We'll help you find the perfect cruise line for your style and budget.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="btn-outline-white">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CruiseLinesPage;
