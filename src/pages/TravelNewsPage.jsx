import { useState } from 'react';
import { useTravelNews } from '../hooks/useTravelNews';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import NewsCard from '../components/NewsCard';
import './TravelNewsPage.css';

const CATEGORIES = [
  { value: null, label: 'All Categories' },
  { value: 'destination', label: 'Destinations' },
  { value: 'cruise_line', label: 'Cruise Lines' },
  { value: 'travel_tips', label: 'Travel Tips' },
  { value: 'industry_news', label: 'Industry News' },
  { value: 'special_offers', label: 'Special Offers' },
  { value: 'events', label: 'Events' },
  { value: 'general', label: 'General' }
];

function TravelNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { news, total, loading, error } = useTravelNews({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    category: selectedCategory
  });

  const totalPages = Math.ceil(total / itemsPerPage);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Travel News',
    description: 'Latest travel news, cruise updates, destination guides, and travel tips from Limitless Cruises.',
    url: 'https://limitlesscruises.com/travel-news',
    blogPost: news.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      url: `https://limitlesscruises.com/travel-news/${article.slug}`,
      datePublished: article.published_at,
      image: article.featured_image_url || article.thumbnail_image_url,
      author: {
        '@type': 'Organization',
        name: 'Limitless Cruises'
      }
    }))
  };

  return (
    <main className="travel-news-page">
      {/* SEO */}
      <SEO
        title="Travel News | Latest Cruise & Travel Updates"
        description="Stay up to date with the latest travel news, cruise line updates, destination guides, and travel tips from Limitless Cruises. Expert insights and industry news."
        canonical="https://limitlesscruises.com/travel-news"
        keywords="travel news, cruise news, destination news, travel tips, cruise updates, travel industry news"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title="Travel News"
        subtitle="Stay informed with the latest travel news, cruise updates, destination guides, and expert travel tips. Your source for everything cruise and travel related."
        size="lg"
        align="center"
        primaryCta={{ label: 'Contact Us', to: '/contact' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Category Filter */}
      <section className="section section-light">
        <div className="container">
          <div className="category-filter">
            <label htmlFor="category-filter" className="category-filter-label">
              Filter by Category:
            </label>
            <select
              id="category-filter"
              className="category-filter-select"
              value={selectedCategory || ''}
              onChange={(e) => {
                setSelectedCategory(e.target.value || null);
                setCurrentPage(1);
              }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value || 'all'} value={cat.value || ''}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Latest Articles"
            title={selectedCategory ? `${CATEGORIES.find(c => c.value === selectedCategory)?.label} News` : "All Travel News"}
            subtitle={`${total} article${total !== 1 ? 's' : ''} available`}
          />

          {loading && (
            <div className="news-loading">
              <p>Loading articles...</p>
            </div>
          )}

          {error && (
            <div className="news-error">
              <p>Sorry, we couldn't load the articles at this time. Please try again later or contact us directly.</p>
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="news-empty">
              <p>No articles are currently available. Check back soon for the latest travel news.</p>
              <Button to="/contact" variant="primary">
                Get in Touch
              </Button>
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <>
              <div className="news-grid">
                {news.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Have Questions About Travel News?</h2>
          <p>
            Our expert travel consultants can help you understand how the latest news affects your travel plans.
            Get personalised advice and stay informed.
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

export default TravelNewsPage;

