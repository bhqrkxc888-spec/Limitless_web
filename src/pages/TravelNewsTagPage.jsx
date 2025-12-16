import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTravelNews } from '../hooks/useTravelNews';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import NewsCard from '../components/NewsCard';
import './TravelNewsTagPage.css';

function TravelNewsTagPage() {
  const { tag } = useParams();
  const decodedTag = decodeURIComponent(tag);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { news, total, loading, error } = useTravelNews({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    tag: decodedTag
  });

  const totalPages = Math.ceil(total / itemsPerPage);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${decodedTag} Travel News`,
    description: `Travel news articles tagged with "${decodedTag}" from Limitless Cruises.`,
    url: `https://limitlesscruises.com/travel-news/tag/${tag}`,
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
    <main className="travel-news-tag-page">
      {/* SEO */}
      <SEO
        title={`${decodedTag} | Travel News`}
        description={`Travel news articles tagged with "${decodedTag}". Browse related articles and stay informed with the latest travel updates.`}
        canonical={`https://limitlesscruises.com/travel-news/tag/${tag}`}
        keywords={`${decodedTag}, travel news, cruise news, tagged articles`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={`Articles Tagged: ${decodedTag}`}
        subtitle={`Browse all travel news articles tagged with "${decodedTag}". Discover related content and stay informed.`}
        size="lg"
        align="center"
        primaryCta={{ label: 'View All News', to: '/travel-news' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* News Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow={`Tag: ${decodedTag}`}
            title={`All Articles with Tag "${decodedTag}"`}
            subtitle={`${total} article${total !== 1 ? 's' : ''} found`}
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
              <p>No articles are currently available with this tag. Check back soon or explore other tags.</p>
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
          <h2>Explore More Travel News</h2>
          <p>
            Discover more articles or get in touch for personalised travel advice.
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

export default TravelNewsTagPage;

