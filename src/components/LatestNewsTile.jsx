import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTravelNews } from '../hooks/useTravelNews';
import { Button } from './ui';
import './LatestNewsTile.css';

/**
 * LatestNewsTile Component
 * Displays a horizontal layout news section for the homepage
 * Featured article with image left (400px), content right
 * Now includes carousel functionality with navigation arrows
 */
function LatestNewsTile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { news, loading, error } = useTravelNews({
    limit: 6, // Increased to show more articles in carousel
    featured: null // Get all recent news, not just featured
  });

  const handleNext = () => {
    if (isTransitioning || news.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    if (news.length <= 1) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, news.length]);

  // Don't render if no news or error (API not set up yet)
  if (!loading && (news.length === 0 || error)) {
    return null;
  }

  const handlePrevious = () => {
    if (isTransitioning || news.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

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

  const currentArticle = news[currentIndex] || news[0];
  const hasMultipleArticles = news.length > 1;

  return (
    <section className="latest-news-tile">
      <div className="container">
        {/* Section Header */}
        <div className="latest-news-tile__section-header">
          <div>
            <h2 className="latest-news-tile__section-title">Latest News & Exclusive Offers</h2>
            <p className="latest-news-tile__section-subtitle">Stay updated with the latest cruise news and special offers tailored just for you</p>
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

        {/* Featured Article Carousel - Horizontal Layout */}
        {!loading && currentArticle && (
          <div className="latest-news-tile__carousel-wrapper">
            {/* Navigation Arrows */}
            {hasMultipleArticles && (
              <>
                <button 
                  className="latest-news-tile__nav-arrow latest-news-tile__nav-arrow--prev"
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  aria-label="Previous article"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  className="latest-news-tile__nav-arrow latest-news-tile__nav-arrow--next"
                  onClick={handleNext}
                  disabled={isTransitioning}
                  aria-label="Next article"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </>
            )}

            <Link 
              to={`/travel-news/${currentArticle.slug}`} 
              className={`latest-news-tile__featured ${isTransitioning ? 'latest-news-tile__featured--transitioning' : ''}`}
            >
              {/* Image Left */}
              <div className="latest-news-tile__featured-image">
                {(currentArticle.featured_image_url || currentArticle.thumbnail_image_url) && (
                  <img 
                    src={currentArticle.featured_image_url || currentArticle.thumbnail_image_url}
                    alt={currentArticle.title}
                    loading="lazy"
                  />
                )}
              </div>
              
              {/* Content Right */}
              <div className="latest-news-tile__featured-content">
                <div className="latest-news-tile__featured-meta">
                  {currentArticle.category && (
                    <span className="latest-news-tile__category">
                      {formatCategory(currentArticle.category)}
                    </span>
                  )}
                  <span className="latest-news-tile__date">
                    {formatDate(currentArticle.published_at)}
                  </span>
                </div>
                <h3 className="latest-news-tile__featured-title">{currentArticle.title}</h3>
                {currentArticle.excerpt && (
                  <p className="latest-news-tile__featured-excerpt">{currentArticle.excerpt}</p>
                )}
                {currentArticle.tags && currentArticle.tags.length > 0 && (
                  <div className="latest-news-tile__tags">
                    {currentArticle.tags.slice(0, 4).map((tag, index) => (
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

            {/* Carousel Indicators */}
            {hasMultipleArticles && (
              <div className="latest-news-tile__indicators">
                {news.map((_, index) => (
                  <button
                    key={index}
                    className={`latest-news-tile__indicator ${index === currentIndex ? 'latest-news-tile__indicator--active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to article ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}


        {/* CTA */}
        <div className="latest-news-tile__cta">
          <Button to="/contact" variant="primary" size="md">
            Speak to a Cruise Specialist
          </Button>
          <Button to="/travel-news" variant="outline" size="md">
            Browse All News & Offers
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LatestNewsTile;
