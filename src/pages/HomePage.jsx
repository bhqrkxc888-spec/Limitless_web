import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { getFeaturedCruiseLines } from '../data/cruiseLines';
import { getFeaturedDestinations } from '../data/destinations';
import { categories } from '../data/categories';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader } from '../components/ui';
import './HomePage.css';

function HomePage() {
  const featuredCruiseLines = getFeaturedCruiseLines().slice(0, 6);
  const featuredDestinations = getFeaturedDestinations();

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
    }
  };

  return (
    <main className="home-page">
      {/* SEO */}
      <SEO
        title="Cruise Holidays with Preferential Rates & Exclusive Offers"
        description="Your personal cruise consultant. Book cruise holidays with preferential rates, exclusive offers and expert advice from leading cruise lines worldwide."
        canonical="https://new.limitlesscruises.com"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title="Cruise Holidays with Preferential Rates & Exclusive Offers"
        subtitle="Your personal cruise consultant, helping you find the perfect voyage with expert advice and the best deals from leading cruise lines worldwide."
        image="/images/hero/homepage-hero.jpg"
        imageAlt="Luxury cruise ship at sunset"
        size="lg"
        align="left"
        primaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
        secondaryCta={{ label: 'Find a Cruise', to: '/find-a-cruise' }}
      >
        <div className="hero-badges">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            <span>ABTA Protected</span>
          </div>
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
            <span>Personal Service</span>
          </div>
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Price Match</span>
          </div>
        </div>
      </HeroSection>

      {/* Featured Cruise Lines */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            eyebrow="Cruise Lines"
            title="Explore Top Cruise Lines"
            subtitle="We partner with the world's leading cruise lines to bring you exceptional value and unforgettable experiences."
            align="center"
          />

          <div className="grid grid-3">
            {featuredCruiseLines.map((cruiseLine) => (
              <Card key={cruiseLine.id} to={`/cruise-lines/${cruiseLine.slug}`} variant="default">
                <Card.Image 
                  src={cruiseLine.image} 
                  alt={cruiseLine.name}
                  aspectRatio="16/10"
                />
                <Card.Content>
                  <Card.Title as="h3">{cruiseLine.name}</Card.Title>
                  <Card.Description>{cruiseLine.tagline}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button to="/cruise-lines" variant="outline">
              View All Cruise Lines
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Why Limitless"
            title="Your Personal Cruise Consultant"
            subtitle="Experience the difference of working with a dedicated cruise specialist who puts your needs first."
            align="center"
          />

          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="feature-title">Personal Support</h3>
              <p className="feature-description">
                Work directly with your dedicated cruise consultant who learns your preferences and finds perfect matches.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              </div>
              <h3 className="feature-title">Best Price Guarantee</h3>
              <p className="feature-description">
                We search for the best deals and can price match or beat direct cruise line prices in most cases.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
              </div>
              <h3 className="feature-title">ABTA Protected</h3>
              <p className="feature-description">
                Book with confidence knowing your holiday is protected by ABTA with clear paperwork and full support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            eyebrow="Destinations"
            title="Where Will You Sail?"
            subtitle="From the sun-soaked Mediterranean to the dramatic Norwegian Fjords, discover your perfect cruise destination."
            align="center"
          />

          <div className="grid grid-2">
            {featuredDestinations.map((destination) => (
              <Card key={destination.id} to={`/destinations/${destination.slug}`} variant="default">
                <Card.Image 
                  src={destination.image} 
                  alt={destination.name}
                  aspectRatio="16/9"
                />
                <Card.Content>
                  <Card.Title as="h3">{destination.name}</Card.Title>
                  <Card.Description>{destination.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cruise Types */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Cruise Types"
            title="Find Your Perfect Cruise"
            align="center"
          />

          <div className="grid grid-3">
            {categories.map((category) => (
              <Card key={category.id} to={`/cruises/${category.slug}`} variant="outlined">
                <Card.Image 
                  src={category.image} 
                  alt={category.name}
                  aspectRatio="16/10"
                />
                <Card.Content>
                  <Card.Title as="h3">{category.name}</Card.Title>
                  <Card.Description>{category.tagline}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="cta-content">
            <SectionHeader
              title="Ready to Plan Your Cruise?"
              subtitle="Speak with your personal cruise consultant today. We'll help you find the perfect cruise at the best price."
              align="center"
              dark
            />
            <div className="cta-buttons">
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
              <Button to="/contact" variant="outline" size="lg" className="btn-outline-white">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
