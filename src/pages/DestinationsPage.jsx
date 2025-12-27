import { destinations } from '../data/destinations';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader } from '../components/ui';
import { getDestinationCard } from '../utils/assetHelpers';
import './DestinationsPage.css';

function DestinationsPage() {
  // Group destinations by region (placeholder structure - can be enhanced)
  const featuredDestinations = destinations.filter(d => d.featured);
  const otherDestinations = destinations.filter(d => !d.featured);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cruise Destinations',
    description: 'Discover extraordinary cruise destinations around the world with Limitless Cruises',
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

  const renderDestinationCards = (dests) => (
    <div className="grid grid-2-md grid-3-lg">
      {dests.map((destination) => (
        <Card key={destination.id} to={`/destinations/${destination.slug}`} variant="default">
          <Card.Image 
            src={getDestinationCard(destination.slug)} 
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
        title="Discover Extraordinary Destinations"
        subtitle="From sun-soaked Mediterranean ports to dramatic Norwegian fjords, discover the world's most captivating cruise destinations with expert consultant guidance."
        size="md"
        align="center"
      />

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
              subtitle="Discover additional destinations for your perfect cruise holiday."
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

