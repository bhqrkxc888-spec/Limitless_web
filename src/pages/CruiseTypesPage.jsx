import { cruiseTypes, getFeaturedCruiseTypes } from '../data/cruiseTypes';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import OptimizedImage from '../components/OptimizedImage';
import { getCruiseTypeCard } from '../utils/assetHelpers';
import './CruiseTypesPage.css';

// Icon components for each cruise type
const CruiseTypeIcon = ({ type }) => {
  const icons = {
    family: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    adults: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22v-2a4 4 0 0 0-8 0v2"/>
        <circle cx="12" cy="10" r="4"/>
        <path d="M4 22v-2a4 4 0 0 1 4-4h.5"/>
        <path d="M20 22v-2a4 4 0 0 0-4-4h-.5"/>
      </svg>
    ),
    uk: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/>
        <path d="M19 21V7l-7-4L5 7v14"/>
        <path d="M9 21v-6h6v6"/>
        <path d="M9 9h.01"/>
        <path d="M15 9h.01"/>
      </svg>
    ),
    luxury: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    river: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      </svg>
    ),
    expedition: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>
        <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17"/>
        <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    solo: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 0 0-16 0"/>
      </svg>
    )
  };

  return icons[type] || icons.luxury;
};

function CruiseTypesPage() {
  const featuredTypes = getFeaturedCruiseTypes();
  const otherTypes = cruiseTypes.filter(t => !t.featured);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Types of Cruise Holidays',
    description: 'Explore different types of cruise experiences from Limitless Cruises',
    itemListElement: cruiseTypes.map((type, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: type.name,
        description: type.shortDescription,
        url: `https://www.limitlesscruises.com/cruise-types/${type.slug}`
      }
    }))
  };

  const renderTypeCard = (cruiseType) => (
    <div key={cruiseType.id} className="cruise-type-card">
      <div className="cruise-type-image">
        <OptimizedImage
          src={cruiseType.image || getCruiseTypeCard(cruiseType.slug)}
          alt={`${cruiseType.name} cruise holidays`}
          width={600}
          height={400}
          loading="lazy"
        />
      </div>
      <div className="cruise-type-content">
        <h3>{cruiseType.name}</h3>
        <p className="cruise-type-tagline">{cruiseType.tagline}</p>
        <p className="cruise-type-description">{cruiseType.shortDescription}</p>
        <div className="cruise-type-highlights">
          <ul>
            {cruiseType.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="cruise-type-lines">
          <span className="lines-label">Recommended:</span>
          <span className="lines-list">{cruiseType.recommendedLines.slice(0, 3).join(', ')}</span>
        </div>
        <Button to="/contact" variant="secondary" size="sm">
          Enquire About {cruiseType.name}
        </Button>
      </div>
    </div>
  );

  return (
    <main className="cruise-types-page">
      {/* SEO */}
      <SEO
        title="Cruise Types | Family, Luxury, River, Expedition & More | Expert Guidance"
        description="Find your perfect cruise style with expert guidance. Family adventures, luxury escapes, river voyages, expedition cruises. Bespoke service from your UK consultant."
        canonical="https://www.limitlesscruises.com/cruise-types"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title="Find Your Perfect Cruise Style"
        subtitle="Whether you're seeking family fun, adults-only tranquility, luxury indulgence, or expedition adventure - there's a cruise type tailored just for you."
        size="md"
        align="center"
      />

      {/* Quick Navigation */}
      <section className="cruise-types-nav">
        <div className="container">
          <div className="types-quick-nav">
            {cruiseTypes.map(type => (
              <a key={type.id} href={`#${type.id}`} className="quick-nav-item">
                <CruiseTypeIcon type={type.icon} />
                <span>{type.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cruise Types */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Most Popular"
            title="Popular Cruise Types"
            subtitle="These cruise styles are the most sought-after by our customers."
          />
          <div className="cruise-types-grid">
            {featuredTypes.map(type => (
              <div key={type.id} id={type.id} className="cruise-type-anchor">
                {renderTypeCard(type)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Cruise Types */}
      {otherTypes.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Explore More"
              title="More Cruise Styles"
              subtitle="Additional cruise types that might be perfect for your needs."
            />
            <div className="cruise-types-grid">
              {otherTypes.map(type => (
                <div key={type.id} id={type.id} className="cruise-type-anchor">
                  {renderTypeCard(type)}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Section */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="At a Glance"
            title="Cruise Type Comparison"
            subtitle="Not sure which type is right for you? This quick comparison might help."
          />
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Cruise Type</th>
                  <th>Best For</th>
                  <th>Ship Size</th>
                  <th>Atmosphere</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Family</strong></td>
                  <td>Families with children</td>
                  <td>Large (2,000-6,000+)</td>
                  <td>Lively, Activity-packed</td>
                </tr>
                <tr>
                  <td><strong>Adults Only</strong></td>
                  <td>Couples, Friends</td>
                  <td>Small-Mid (500-2,500)</td>
                  <td>Relaxed, Sophisticated</td>
                </tr>
                <tr>
                  <td><strong>UK No-Fly</strong></td>
                  <td>Those avoiding flights</td>
                  <td>All sizes</td>
                  <td>Convenient, Familiar</td>
                </tr>
                <tr>
                  <td><strong>Luxury</strong></td>
                  <td>Discerning travellers</td>
                  <td>Small (200-700)</td>
                  <td>Elegant, Intimate</td>
                </tr>
                <tr>
                  <td><strong>River</strong></td>
                  <td>Culture enthusiasts</td>
                  <td>Very Small (100-200)</td>
                  <td>Calm, Enriching</td>
                </tr>
                <tr>
                  <td><strong>Expedition</strong></td>
                  <td>Adventure seekers</td>
                  <td>Small (100-500)</td>
                  <td>Adventurous, Educational</td>
                </tr>
                <tr>
                  <td><strong>Solo</strong></td>
                  <td>Independent travellers</td>
                  <td>All sizes</td>
                  <td>Social, Welcoming</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="not-sure-cta">
            <h2>Not Sure Which Cruise Type Is Right For You?</h2>
            <p>
              Every traveller is unique, and sometimes the perfect cruise doesn't fit neatly into one category. 
              That's where personal advice makes all the difference. Tell us about your travel dreams, 
              and we'll match you with the perfect cruise experience.
            </p>
            <div className="cta-buttons">
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Get Personal Advice
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Find Your Perfect Cruise?</h2>
          <p>
            Speak with your dedicated cruise consultant to find which cruise type will give you the holiday of your dreams.
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

export default CruiseTypesPage;

