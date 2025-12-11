import { useParams } from 'react-router-dom';
import { getCategoryBySlug } from '../data/categories';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import './CategoryPage.css';

function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);

  // Handle category not found
  if (!category) {
    return (
      <main className="category-page">
        <SEO title="Category Not Found" />
        <div className="container section">
          <h1>Category Not Found</h1>
          <p>Sorry, we couldn't find the cruise type you're looking for.</p>
          <Button to="/">Return Home</Button>
        </div>
      </main>
    );
  }

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: category.name,
    description: category.description,
    url: `https://new.limitlesscruises.com/cruises/${category.slug}`,
    category: 'Cruise Holidays'
  };

  return (
    <main className="category-page">
      {/* SEO */}
      <SEO
        title={category.meta?.title || category.name}
        description={category.meta?.description || category.description}
        canonical={`https://new.limitlesscruises.com/cruises/${category.slug}`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={category.name}
        subtitle={category.description}
        image={category.image}
        imageAlt={category.name}
        size="md"
        align="left"
        primaryCta={{ label: 'Search Cruises', to: '/find-a-cruise' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Content Section */}
      <section className="section">
        <div className="container">
          <div className="category-grid">
            {/* Main Content */}
            <div className="category-main">
              <SectionHeader
                title={`What Makes ${category.name} Special?`}
              />

              <div className="highlights-list">
                {category.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <div className="highlight-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>

              {/* Recommended Lines */}
              {category.recommendedLines && category.recommendedLines.length > 0 && (
                <div className="recommended-section mt-12">
                  <h3>Recommended Cruise Lines</h3>
                  <div className="recommended-list">
                    {category.recommendedLines.map((line, index) => (
                      <span key={index} className="recommended-tag">{line}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="category-sidebar">
              <div className="sidebar-card">
                <h3>Find Your Perfect {category.name.replace(' Cruises', '')} Cruise</h3>
                <p>
                  Get expert advice on {category.name.toLowerCase()} from your personal cruise consultant.
                </p>
                <div className="sidebar-cta">
                  <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
                    Call {siteConfig.phone}
                  </Button>
                  <Button to="/find-a-cruise" variant="outline" fullWidth>
                    Search Cruises
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="sidebar-card sidebar-trust">
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  <span>ABTA Protected</span>
                </div>
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span>Personal Service</span>
                </div>
                <div className="trust-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  <span>Price Match</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Book Your {category.name.replace(' Cruises', '')} Cruise?</h2>
          <p>
            Speak with your personal cruise consultant today for expert advice and the best prices.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button to="/find-a-cruise" variant="outline" size="lg" className="btn-outline-white">
              Search Cruises
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;
