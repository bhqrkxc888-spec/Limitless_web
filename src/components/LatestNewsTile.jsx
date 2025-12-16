import { Link } from 'react-router-dom';
import { useTravelNews } from '../hooks/useTravelNews';
import { Button } from './ui';
import './LatestNewsTile.css';

/**
 * LatestNewsTile Component
 * Displays a compact tile of latest news articles for the homepage
 * Shows 3-4 latest articles in a sidebar-style layout
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

  return (
    <section className="latest-news-tile">
      <div className="container">
        <div className="latest-news-tile__wrapper">
          {/* Header */}
          <div className="latest-news-tile__header">
            <div className="latest-news-tile__header-left">
              <span className="latest-news-tile__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <div>
                <h2 className="latest-news-tile__title">Travel News</h2>
                <p className="latest-news-tile__subtitle">Latest updates & insights</p>
              </div>
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

          {/* News List */}
          {!loading && news.length > 0 && (
            <div className="latest-news-tile__list">
              {news.map((article, index) => (
                <Link 
                  key={article.id} 
                  to={`/travel-news/${article.slug}`}
                  className={`latest-news-tile__item ${index === 0 ? 'latest-news-tile__item--featured' : ''}`}
                >
                  {/* Featured item has image */}
                  {index === 0 && (article.featured_image_url || article.thumbnail_image_url) && (
                    <div className="latest-news-tile__item-image">
                      <img 
                        src={article.featured_image_url || article.thumbnail_image_url}
                        alt={article.title}
                        loading="lazy"
                      />
                      {article.featured && (
                        <span className="latest-news-tile__badge">Featured</span>
                      )}
                    </div>
                  )}
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
                    <h3 className="latest-news-tile__item-title">{article.title}</h3>
                    {index === 0 && article.excerpt && (
                      <p className="latest-news-tile__item-excerpt">{article.excerpt}</p>
                    )}
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
            <Button to="/travel-news" variant="outline" size="sm" fullWidth>
              Read All News
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestNewsTile;

