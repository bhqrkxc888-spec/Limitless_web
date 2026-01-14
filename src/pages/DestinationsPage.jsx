import { destinations as destinationsData } from '../data/destinations';
import { destinations as destinationsConfig } from '../config/destinations';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader } from '../components/ui';
import { useDestinationImage, usePageHeroImage } from '../hooks/useImageUrl';
import './DestinationsPage.css';

function DestinationsPage() {
  // Get page hero image
  const { imageUrl: heroImage } = usePageHeroImage('destinations');
  // Use data/destinations for full details, but map slugs from config/destinations for images
  // Create a mapping of full data with correct image slugs
  const destinations = destinationsData.map(dest => {
    // Find matching config destination by name or similar logic
    const configDest = destinationsConfig.find(c => {
      // Match by removing "-cruises" from data slug or matching names
      const dataSlugShort = dest.slug.replace('-cruises', '');
      return c.slug === dataSlugShort || c.name.toLowerCase() === dest.name.toLowerCase();
    });
    
    return {
      ...dest,
      imageSlug: configDest?.slug || dest.slug // Use config slug for images, fallback to data slug
    };
  });
  // Group destinations by region (placeholder structure - can be enhanced)
  const featuredDestinations = destinations.filter(d => d.featured);
  const otherDestinations = destinations.filter(d => !d.featured);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Destinations',
    description: 'Explore remarkable cruise destinations around the world with Limitless Cruises',
    itemListElement: destinations.map((dest, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristDestination',
        name: dest.name,
        url: `https://www.limitlesscruises.com/destinations/${dest.slug}`
      }
    }))
  };

  // Component for destination card with image hook
  const DestinationCard = ({ destination }) => {
    const { imageUrl } = useDestinationImage(destination.imageSlug || destination.slug, 'card', destination.name);
    
    return (
      <Card to={`/destinations/${destination.slug}`} variant="default">
        <Card.Image 
          src={imageUrl} 
          alt={`${destination.name} cruise destination`}
          aspectRatio="3/2"
        />
        <Card.Content>
          <Card.Title as="h3">{destination.name}</Card.Title>
          <Card.Description>{destination.tagline}</Card.Description>
          {destination.bestTime && (
            <div className="destination-meta">
              <span className="best-time">Best time: {destination.bestTime}</span>
            </div>
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderDestinationCards = (dests) => (
    <div className="grid grid-2-md grid-3-lg">
      {dests.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );

  return (
    <main className="destinations-page">
      {/* SEO */}
      <SEO
        title="Cruise Destinations | Mediterranean, Caribbean, Fjords & More | Expert UK Guidance"
        description="Expertly curated cruise destinations with personal UK consultant service. From Mediterranean elegance to Caribbean warmth, Norwegian fjords to exotic Asia."
        canonical="https://www.limitlesscruises.com/destinations"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title="Explore Remarkable Destinations"
        subtitle="From sun-soaked Mediterranean ports to dramatic Norwegian fjords, explore the world's most captivating cruise destinations with expert consultant guidance."
        image={heroImage}
        imageAlt="Cruise destinations around the world"
        size="md"
        align="center"
      />

      {/* Content Update Notice */}
      <section className="section-notice">
        <div className="container">
          <div className="notice notice-info">
            <span className="notice-icon">📍</span>
            <p>
              <strong>Destination guides are being expanded!</strong> We're adding detailed port information, local tips, and insider recommendations to each destination. Check back regularly for updates.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      {featuredDestinations.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Featured"
              title="Popular Cruise Destinations"
              subtitle="These iconic destinations are perennially popular choices for cruise holidays."
            />
            {renderDestinationCards(featuredDestinations)}
          </div>
        </section>
      )}

      {/* Other Destinations */}
      {otherDestinations.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Explore More"
              title="More Destinations"
              subtitle="Browse additional destinations for your perfect cruise holiday."
            />
            {renderDestinationCards(otherDestinations)}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Explore These Destinations?</h2>
          <p>
            Speak with your dedicated cruise consultant to plan your perfect destination-focused cruise holiday.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button to="/find-a-cruise" variant="outline" size="lg" className="btn-outline-white">
              Find a Cruise
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DestinationsPage;

