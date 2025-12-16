import { Link } from 'react-router-dom';
import { useTravelNews } from '../hooks/useTravelNews';
import { Button } from './ui';
import './LatestNewsTile.css';

/**
 * LatestNewsTile Component
 * Displays a horizontal layout news section for the homepage
 * Featured article with image left (400px), content right
 */
function LatestNewsTile() {
  const { news, loading, error } = useTravelNews({
    limit: 4,
    featured: null // Get all recent news, not just featured
  });

  // Don't render if no news or error (API not set up yet)
  if (!loading && (news.length === 0 || error)) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
  };

  const formatCategory = (category) => {
    if (!category) return '';
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const featuredArticle = news[0];
  const otherArticles = news.slice(1, 4);

  return (
    <section className="latest-news-tile">
      <div className="container">
        {/* Section Header */}
        <div className="latest-news-tile__section-header">
          <div>
            <h2 className="latest-news-tile__section-title">Travel News</h2>
            <p className="latest-news-tile__section-subtitle">Latest updates from the cruise industry</p>
          </div>
          <Link to="/travel-news" className="latest-news-tile__view-all">
            View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="latest-news-tile__loading">
            <div className="latest-news-tile__loading-spinner"></div>
          </div>
        )}

        {/* Featured Article - Horizontal Layout */}
        {!loading && featuredArticle && (
          <Link to={`/travel-news/${featuredArticle.slug}`} className="latest-news-tile__featured">
            {/* Image Left */}
            <div className="latest-news-tile__featured-image">
              {(featuredArticle.featured_image_url || featuredArticle.thumbnail_image_url) && (
                <img 
                  src={featuredArticle.featured_image_url || featuredArticle.thumbnail_image_url}
                  alt={featuredArticle.title}
                  loading="lazy"
                />
              )}
            </div>
            
            {/* Content Right */}
            <div className="latest-news-tile__featured-content">
              <div className="latest-news-tile__featured-meta">
                {featuredArticle.category && (
                  <span className="latest-news-tile__category">
                    {formatCategory(featuredArticle.category)}
                  </span>
                )}
                <span className="latest-news-tile__date">
                  {formatDate(featuredArticle.published_at)}
                </span>
              </div>
              <h3 className="latest-news-tile__featured-title">{featuredArticle.title}</h3>
              {featuredArticle.excerpt && (
                <p className="latest-news-tile__featured-excerpt">{featuredArticle.excerpt}</p>
              )}
              {featuredArticle.tags && featuredArticle.tags.length > 0 && (
                <div className="latest-news-tile__tags">
                  {featuredArticle.tags.slice(0, 4).map((tag, index) => (
                    <span key={index} className="latest-news-tile__tag">{tag}</span>
                  ))}
                </div>
              )}
              <span className="latest-news-tile__read-more">
                Read Full Article
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>
        )}

        {/* Other Articles - Compact List */}
        {!loading && otherArticles.length > 0 && (
          <div className="latest-news-tile__list">
            {otherArticles.map((article) => (
              <Link 
                key={article.id} 
                to={`/travel-news/${article.slug}`}
                className="latest-news-tile__item"
              >
                <div className="latest-news-tile__item-content">
                  <div className="latest-news-tile__item-meta">
                    {article.category && (
                      <span className="latest-news-tile__item-category">
                        {formatCategory(article.category)}
                      </span>
                    )}
                    <span className="latest-news-tile__item-date">
                      {formatDate(article.published_at)}
                    </span>
                  </div>
                  <h4 className="latest-news-tile__item-title">{article.title}</h4>
                </div>
                <span className="latest-news-tile__item-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="latest-news-tile__cta">
          <Button to="/travel-news" variant="outline" size="sm">
            Browse All News
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LatestNewsTile;
