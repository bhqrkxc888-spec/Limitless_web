import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTravelNews } from '../hooks/useTravelNews';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import NewsCard from '../components/NewsCard';
import './TravelNewsCategoryPage.css';

const CATEGORY_LABELS = {
  destination: 'Destinations',
  cruise_line: 'Cruise Lines',
  travel_tips: 'Travel Tips',
  industry_news: 'Industry News',
  special_offers: 'Special Offers',
  events: 'Events',
  general: 'General'
};

function TravelNewsCategoryPage() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { news, total, loading, error } = useTravelNews({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    category: category || null
  });

  const totalPages = Math.ceil(total / itemsPerPage);
  const categoryLabel = CATEGORY_LABELS[category] || category;

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryLabel} Travel News`,
    description: `Latest ${categoryLabel.toLowerCase()} news and updates from Limitless Cruises.`,
    url: `https://limitlesscruises.com/travel-news/category/${category}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: news.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: article.title,
          url: `https://limitlesscruises.com/travel-news/${article.slug}`
        }
      }))
    }
  };

  return (
    <main className="travel-news-category-page">
      {/* SEO */}
      <SEO
        title={`${categoryLabel} News | Travel News`}
        description={`Stay informed with the latest ${categoryLabel.toLowerCase()} news, updates, and insights from Limitless Cruises.`}
        canonical={`https://limitlesscruises.com/travel-news/category/${category}`}
        keywords={`${categoryLabel.toLowerCase()}, travel news, cruise news, ${category}`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={`${categoryLabel} News`}
        subtitle={`Latest ${categoryLabel.toLowerCase()} news, updates, and insights. Stay informed with expert travel news from Limitless Cruises.`}
        size="lg"
        align="center"
        primaryCta={{ label: 'View All News', to: '/travel-news' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* News Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow={`${categoryLabel} Category`}
            title={`All ${categoryLabel} Articles`}
            subtitle={`${total} article${total !== 1 ? 's' : ''} in this category`}
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
              <p>No articles are currently available in this category. Check back soon for the latest {categoryLabel.toLowerCase()} news.</p>
              <div className="news-empty-actions">
                <Button to="/travel-news" variant="primary">
                  View All News
                </Button>
                <Button to="/contact" variant="outline">
                  Contact Us
                </Button>
              </div>
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
          <h2>Want More Travel News?</h2>
          <p>
            Explore all our travel news articles or get in touch with our experts for personalised advice.
          </p>
          <div className="cta-buttons">
            <Button to="/travel-news" variant="primary" size="lg">
              View All News
            </Button>
            <Button href={`tel:${siteConfig.phone}`} variant="outline" size="lg" className="btn-outline-white">
              Call {siteConfig.phone}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TravelNewsCategoryPage;

