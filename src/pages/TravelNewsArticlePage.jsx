import { useParams, Link } from 'react-router-dom';
import { useTravelNewsArticle } from '../hooks/useTravelNews';
import { incrementTravelNewsView } from '../services/travelNewsAPI';
import { SITE_ASSETS } from '../config/assetUrls';
import SEO from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import OptimizedImage from '../components/OptimizedImage';
import { useEffect } from 'react';
import { createSanitizedMarkup } from '../utils/sanitizeHtml';
import './TravelNewsArticlePage.css';

function TravelNewsArticlePage() {
  const { slug } = useParams();
  
  // Validate slug format
  const isValidSlug = slug && /^[a-z0-9-]+$/i.test(slug);
  
  const { article, loading, error } = useTravelNewsArticle(isValidSlug ? slug : null);

  // Track view when article is loaded
  useEffect(() => {
    if (article?.id) {
      incrementTravelNewsView(article.id);
    }
  }, [article?.id]);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCategory = (category) => {
    if (!category) return '';
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Loading state
  if (loading) {
    return (
      <main className="travel-news-article-page">
        <SEO title="Loading Article..." />
        <div className="container section">
          <div className="article-loading">
            <div className="article-loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (!isValidSlug || error || !article) {
    return (
      <main className="travel-news-article-page">
        <SEO title="Article Not Found" />
        <div className="container section">
          <div className="article-not-found">
            <h1>Article Not Found</h1>
            <p>{!isValidSlug ? 'Invalid article URL.' : 'Sorry, we couldn\'t find the article you\'re looking for. It may have expired or been removed.'}</p>
            <div className="article-actions">
              <Button to="/travel-news">View All Articles</Button>
              <Button to="/contact" variant="outline">Contact Us</Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || article.meta_description,
    url: `https://www.limitlesscruises.com/travel-news/${article.slug}`,
    datePublished: article.published_at,
    image: article.featured_image_url || article.thumbnail_image_url,
    author: {
      '@type': 'Organization',
      name: 'Limitless Cruises'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Limitless Cruises',
      logo: {
        '@type': 'ImageObject',
        url: SITE_ASSETS.logo,
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.limitlesscruises.com/travel-news/${article.slug}`
    }
  };

  return (
    <main className="travel-news-article-page">
      {/* SEO */}
      <SEO
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt}
        canonical={`https://www.limitlesscruises.com/travel-news/${article.slug}`}
        keywords={article.meta_keywords?.join(', ') || ''}
        image={article.featured_image_url || article.thumbnail_image_url}
        structuredData={structuredData}
      />

      {/* Clean Article Header */}
      <section className="article-header">
        <div className="container">

          {/* Article Meta */}
          <div className="article-header-meta">
            {article.category && (
              <Link 
                to={`/travel-news/category/${article.category}`} 
                className="article-header-category"
              >
                {formatCategory(article.category)}
              </Link>
            )}
            {article.published_at && (
              <time className="article-header-date">
                {formatDate(article.published_at)}
              </time>
            )}
            {article.view_count !== undefined && (
              <span className="article-header-views">
                {article.view_count} views
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="article-header-title">{article.title}</h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="article-header-excerpt">{article.excerpt}</p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-header-tags">
              {article.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/travel-news/tag/${encodeURIComponent(tag)}`} 
                  className="article-header-tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="article-grid">
            <div className="article-main">
              {/* Featured Image */}
              {article.featured_image_url && (
                <div className="article-featured-image" style={{ marginBottom: '32px' }}>
                  <OptimizedImage 
                    src={article.featured_image_url}
                    alt={article.title}
                    width={article.featured_image_width || 1200}
                    height={article.featured_image_height || 675}
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 800px"
                    srcsetWidths={[640, 800, 1200]}
                    quality={85}
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
              )}

              {/* Article Content */}
              {article.content && (
                <div className="article-content">
                  <div 
                    className="article-content-body"
                    dangerouslySetInnerHTML={createSanitizedMarkup(article.content)}
                  />
                </div>
              )}

              {/* Gallery Images */}
              {article.gallery_images && article.gallery_images.length > 0 && (
                <div className="article-gallery">
                  <h3>Gallery</h3>
                  <div className="gallery-grid">
                    {article.gallery_images.map((imageUrl, index) => (
                      <div key={index} className="gallery-item">
                        <OptimizedImage 
                          src={imageUrl} 
                          alt={`${article.title} - Image ${index + 1}`}
                          width={600}
                          height={400}
                          priority={false}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          srcsetWidths={[400, 600, 800]}
                          quality={85}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share / Back Actions */}
              <div className="article-footer-actions">
                <Button to="/travel-news" variant="outline">
                  Back to News
                </Button>
                <Button to="/contact" variant="primary">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="section section-light">
        <div className="container">
          <SectionHeader
            title="More Travel News"
            subtitle="Explore more articles"
          />
          <div className="related-articles-cta">
            <Button to="/travel-news" variant="primary" size="lg">
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TravelNewsArticlePage;
