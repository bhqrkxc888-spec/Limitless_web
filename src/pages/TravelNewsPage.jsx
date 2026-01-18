import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTravelNews } from '../hooks/useTravelNews';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import NewsCard from '../components/NewsCard';
import '../styles/page-header.css';
import './TravelNewsPage.css';

const CATEGORIES = [
  { value: null, label: 'All' },
  { value: 'events', label: 'Events' },
  { value: 'cruise_line', label: 'Cruise Lines' },
  { value: 'destination', label: 'Destinations' },
  { value: 'special_offers', label: 'Offers' },
  { value: 'industry_news', label: 'Industry' },
  { value: 'travel_tips', label: 'Tips' },
  { value: 'general', label: 'General' }
];

function TravelNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 1 hero + 9 grid items

  // Fetch main news list (sorted by published_at DESC from API)
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
    url: 'https://www.limitlesscruises.com/travel-news',
    blogPost: news.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      url: `https://www.limitlesscruises.com/travel-news/${article.slug}`,
      datePublished: article.published_at,
      image: article.featured_image_url || article.thumbnail_image_url,
      author: {
        '@type': 'Organization',
        name: 'Limitless Cruises'
      }
    }))
  };

  const isLoading = loading;

  return (
    <main className="travel-news-page">
      {/* SEO */}
      <SEO
        title="Travel News | Latest Cruise Updates | UK Consultant Insights"
        description="Stay up to date with the latest travel news, cruise line updates, destination guides. Expert insights from your personal UK cruise consultant."
        canonical="https://www.limitlesscruises.com/travel-news"
        keywords="travel news, cruise news, destination guides, travel tips, UK cruise consultant, cruise industry updates"
        structuredData={structuredData}
      />

      {/* Page Header */}
      <section className="standard-page-header">
        <div className="container">
          <span className="page-header-eyebrow">Stay Informed</span>
          <h1>Travel News</h1>
          <p>
            The latest cruise updates, destination guides, and expert travel tips.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="news-filter-section">
        <div className="container">
          <div className="news-filter-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value || 'all'}
                className={`news-filter-pill ${selectedCategory === cat.value ? 'news-filter-pill--active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setCurrentPage(1);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="section">
          <div className="container">
            <div className="news-loading">
              <div className="news-loading__spinner"></div>
              <p>Loading the latest news...</p>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <section className="section">
          <div className="container">
            <div className="news-error">
              <div className="news-error__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3>Unable to Load News</h3>
              <p>Sorry, we couldn't load the articles at this time. Please try again later or contact us directly.</p>
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!isLoading && !error && news.length === 0 && (
        <section className="section">
          <div className="container">
            <div className="news-empty">
              <div className="news-empty__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3>No Articles Available</h3>
              <p>
                {selectedCategory 
                  ? `No articles found in this category. Try selecting a different category or check back soon.`
                  : `No articles are currently available. Check back soon for the latest travel news.`
                }
              </p>
              <div className="news-empty__actions">
                {selectedCategory && (
                  <Button onClick={() => setSelectedCategory(null)} variant="outline">
                    View All News
                  </Button>
                )}
                <Button to="/contact" variant="primary">
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      {!isLoading && !error && news.length > 0 && (
        <section className="section news-grid-section">
          <div className="container">
            <SectionHeader
              eyebrow={selectedCategory ? CATEGORIES.find(c => c.value === selectedCategory)?.label : "Latest Articles"}
              title={selectedCategory ? `${CATEGORIES.find(c => c.value === selectedCategory)?.label} News` : "All Travel News"}
              subtitle={`${total} article${total !== 1 ? 's' : ''} available`}
            />

            <div className="news-articles-list">
              {news.map((article) => (
                <NewsCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="news-pagination">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="news-pagination__btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                  Previous
                </Button>
                
                <div className="news-pagination__pages">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        className={`news-pagination__page ${currentPage === pageNum ? 'news-pagination__page--active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="news-pagination__btn"
                >
                  Next
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Category Links Section */}
      <section className="news-categories-section">
        <div className="container">
          <h2 className="news-categories__title">Browse by Category</h2>
          <div className="news-categories-grid">
            {CATEGORIES.filter(c => c.value !== null).map((cat) => (
              <Link 
                key={cat.value} 
                to={`/travel-news/category/${cat.value}`}
                className="news-category-card"
              >
                <span className="news-category-card__label">{cat.label}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="news-category-card__arrow">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark news-cta-section">
        <div className="container text-center">
          <h2>Have Questions About Travel News?</h2>
          <p>
            Your expert travel consultant can help you understand how the latest news affects your travel plans.
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

