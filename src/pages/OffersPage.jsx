import { useOffers } from '../hooks/useOffers';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import OfferCard from '../components/OfferCard';
import './OffersPage.css';

function OffersPage() {
  const { offers, loading, error } = useOffers({ limit: 50 });

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest Cruise Offers',
    description: 'Browse our latest cruise offers and special deals. Find your perfect cruise holiday with exclusive pricing and expert booking advice.',
    itemListElement: offers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: offer.title,
        description: offer.short_description || offer.full_description,
        url: `https://limitlesscruises.com/offers/${offer.slug}`,
        offers: {
          '@type': 'Offer',
          price: offer.price_from,
          priceCurrency: offer.currency || 'GBP',
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <main className="offers-page">
      {/* SEO */}
      <SEO
        title="Latest Cruise Offers | Special Deals & Exclusive Pricing"
        description="Browse our latest cruise offers and special deals. Find your perfect cruise holiday with exclusive pricing, fly-cruise packages, and expert booking advice from Limitless Cruises."
        canonical="https://limitlesscruises.com/offers"
        keywords="cruise offers, cruise deals, cheap cruises, cruise specials, cruise discounts, fly cruise deals"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title="Latest Cruise Offers"
        subtitle="Discover exclusive cruise deals and special offers. From Mediterranean escapes to Caribbean adventures, find your perfect cruise at unbeatable prices."
        size="lg"
        align="center"
        primaryCta={{ label: 'Enquire Now', to: '/contact' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Offers Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Special Offers"
            title="All Available Offers"
            subtitle="Browse our hand-picked selection of cruise offers. Prices are subject to availability and may change."
          />

          {loading && (
            <div className="offers-loading">
              <p>Loading offers...</p>
            </div>
          )}

          {error && (
            <div className="offers-error">
              <p>Sorry, we couldn't load the offers at this time. Please try again later or contact us directly.</p>
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
            </div>
          )}

          {!loading && !error && offers.length === 0 && (
            <div className="offers-empty">
              <p>No offers are currently available. Check back soon or contact us for the latest deals.</p>
              <Button to="/contact" variant="primary">
                Get in Touch
              </Button>
            </div>
          )}

          {!loading && !error && offers.length > 0 && (
            <>
              {/* Show notice if displaying demo offers */}
              {offers[0]?.is_demo && (
                <div className="offers-demo-notice">
                  <p>
                    <strong>Sample offers shown.</strong> These are example offers to demonstrate our service. 
                    Contact us for current availability and pricing.
                  </p>
                </div>
              )}
              <div className="offers-grid">
                {offers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Can't Find What You're Looking For?</h2>
          <p>
            Our expert cruise consultants can help you find the perfect cruise, even if it's not listed here.
            Get personalised recommendations and exclusive deals.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="btn-outline-white">
              Enquire Online
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OffersPage;

