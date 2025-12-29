import { cruiseLines } from '../data/cruiseLines';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader } from '../components/ui';
import { getCruiseLineCard } from '../utils/assetHelpers';
import './CruiseLinesPage.css';

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
        <Card key={cruiseLine.id} to={`/cruise-lines/${cruiseLine.slug}`} variant="default">
          <Card.Image 
            src={getCruiseLineCard(cruiseLine.slug)} 
            alt={cruiseLine.name}
            aspectRatio="3/2"
          />
          <Card.Content>
            <Card.Title as="h3">{cruiseLine.name}</Card.Title>
            <Card.Description>{cruiseLine.tagline}</Card.Description>
          </Card.Content>
        </Card>
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
