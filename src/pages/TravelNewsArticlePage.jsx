import { useParams, Link } from 'react-router-dom';
import { useTravelNewsArticle } from '../hooks/useTravelNews';
import { incrementTravelNewsView } from '../services/travelNewsAPI';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import { useEffect } from 'react';
import './TravelNewsArticlePage.css';

function TravelNewsArticlePage() {
  const { slug } = useParams();
  const { article, loading, error } = useTravelNewsArticle(slug);

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
  if (error || !article) {
    return (
      <main className="travel-news-article-page">
        <SEO title="Article Not Found" />
        <div className="container section">
          <div className="article-not-found">
            <h1>Article Not Found</h1>
            <p>Sorry, we couldn't find the article you're looking for. It may have expired or been removed.</p>
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
    url: `https://limitlesscruises.com/travel-news/${article.slug}`,
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
        url: 'https://limitlesscruises.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://limitlesscruises.com/travel-news/${article.slug}`
    }
  };

  return (
    <main className="travel-news-article-page">
      {/* SEO */}
      <SEO
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt}
        canonical={`https://limitlesscruises.com/travel-news/${article.slug}`}
        keywords={article.meta_keywords?.join(', ') || ''}
        image={article.featured_image_url || article.thumbnail_image_url}
        structuredData={structuredData}
      />

      {/* Clean Article Header */}
      <section className="article-header">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="article-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/travel-news">Travel News</Link>
            {article.category && (
              <>
                <span className="breadcrumb-separator">/</span>
                <Link to={`/travel-news/category/${article.category}`}>
                  {formatCategory(article.category)}
                </Link>
              </>
            )}
          </nav>

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
                  <img 
                    src={article.featured_image_url}
                    alt={article.title}
                    width={article.featured_image_width}
                    height={article.featured_image_height}
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
                    dangerouslySetInnerHTML={{ __html: article.content }}
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
                        <img 
                          src={imageUrl} 
                          alt={`${article.title} - Image ${index + 1}`}
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

            {/* Sidebar */}
            <aside className="article-sidebar">
              {/* Contact CTA */}
              <div className="sidebar-card sidebar-card--cta">
                <h3>Have Questions?</h3>
                <p>Get in touch with our travel experts for personalised advice.</p>
                <div className="sidebar-cta-buttons">
                  <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
                    Call {siteConfig.phone}
                  </Button>
                  <Button 
                    to="/contact" 
                    variant="outline" 
                    fullWidth
                  >
                    Contact Us
                  </Button>
                </div>
              </div>

              {/* Category Navigation */}
              {article.category && (
                <div className="sidebar-card">
                  <h3>Category</h3>
                  <Link to={`/travel-news/category/${article.category}`} className="category-link">
                    {formatCategory(article.category)}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              )}

              {/* Related Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="sidebar-card">
                  <h3>Related Topics</h3>
                  <div className="sidebar-tags">
                    {article.tags.map((tag, index) => (
                      <Link 
                        key={index} 
                        to={`/travel-news/tag/${encodeURIComponent(tag)}`} 
                        className="sidebar-tag"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
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
