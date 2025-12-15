import { useParams, Link } from 'react-router-dom';
import { useTravelNewsArticle } from '../hooks/useTravelNews';
import { incrementTravelNewsView } from '../services/travelNewsAPI';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
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
          <p>Loading article...</p>
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
          <h1>Article Not Found</h1>
          <p>Sorry, we couldn't find the article you're looking for. It may have expired or been removed.</p>
          <div className="article-actions">
            <Button to="/travel-news">View All Articles</Button>
            <Button to="/contact" variant="outline">Contact Us</Button>
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

      {/* Hero Section */}
      <HeroSection
        title={article.title}
        subtitle={article.excerpt}
        image={article.featured_image_url}
        imageAlt={article.title}
        size="lg"
        align="left"
        primaryCta={{ label: 'Contact Us', to: '/contact' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Article Meta Bar */}
      <section className="article-meta-bar">
        <div className="container">
          <div className="article-meta-grid">
            {article.category && (
              <Link to={`/travel-news/category/${article.category}`} className="article-meta-item article-meta-item--category">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>{formatCategory(article.category)}</span>
              </Link>
            )}
            {article.published_at && (
              <div className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{formatDate(article.published_at)}</span>
              </div>
            )}
            {article.view_count !== undefined && (
              <div className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>{article.view_count} views</span>
              </div>
            )}
            {article.share_count !== undefined && article.share_count > 0 && (
              <div className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                <span>{article.share_count} shares</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="article-grid">
            <div className="article-main">
              {/* Article Content */}
              {article.content && (
                <div className="article-content">
                  <div 
                    className="article-content-body"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="article-tags-section">
                  <h3>Tags</h3>
                  <div className="article-tags">
                    {article.tags.map((tag, index) => (
                      <Link key={index} to={`/travel-news/tag/${encodeURIComponent(tag)}`} className="article-tag">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Images */}
              {article.gallery_images && article.gallery_images.length > 0 && (
                <div className="article-gallery">
                  <SectionHeader
                    title="Gallery"
                    subtitle="More images from this article"
                  />
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
            </div>

            {/* Sidebar */}
            <aside className="article-sidebar">
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

