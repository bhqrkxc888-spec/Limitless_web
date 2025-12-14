/**
 * BucketListFeatured Component
 * Dynamic rotating featured bucket list experiences for homepage
 * Carousel with 3 items visible on desktop, arrows to navigate
 */

import { useState, useEffect } from 'react';
import { getAllBucketList } from '../data/bucketList';
import { Card } from './ui';
import { Button } from './ui';
import './BucketListFeatured.css';

function BucketListFeatured() {
  // Get all featured experiences (filtered by featured: true)
  const allFeatured = getAllBucketList().filter(exp => exp.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Determine items to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max index based on items to show
  const maxIndex = Math.max(0, allFeatured.length - itemsToShow);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Get visible items
  const visibleItems = allFeatured.slice(currentIndex, currentIndex + itemsToShow);

  if (!allFeatured || allFeatured.length === 0) {
    return null;
  }

  return (
    <section className="bucket-list-featured">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Extraordinary Experiences</p>
          <h2>Dream Experiences</h2>
          <p className="section-subtitle">
            These bucket list cruises represent the pinnacle of travel. 
            From world cruises to polar expeditions, each journey creates memories that last forever.
          </p>
        </div>

        <div className="bucket-list-carousel-wrapper">
          {allFeatured.length > itemsToShow && (
            <button
              className="bucket-list-carousel-nav bucket-list-carousel-prev"
              onClick={goToPrev}
              aria-label="Previous experiences"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}

          <div className="bucket-list-featured-grid">
            {visibleItems.map((experience) => (
              <Card 
                key={experience.id} 
                to={`/bucket-list/${experience.slug}`} 
                variant="default"
                className="bucket-list-featured-card"
              >
                <Card.Image 
                  src={experience.cardImage || experience.heroImage} 
                  alt={experience.title}
                  aspectRatio="16/10"
                />
                <Card.Content>
                  <div className="bucket-list-badge">Bucket List</div>
                  <Card.Title as="h3">{experience.title}</Card.Title>
                  <Card.Description>{experience.tagline}</Card.Description>
                  <div className="bucket-list-featured-meta">
                    <span className="duration">{experience.duration}</span>
                    {experience.startingFrom && (
                      <span className="price">{experience.startingFrom}</span>
                    )}
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>

          {allFeatured.length > itemsToShow && (
            <button
              className="bucket-list-carousel-nav bucket-list-carousel-next"
              onClick={goToNext}
              aria-label="Next experiences"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}
        </div>

        <div className="bucket-list-featured-cta">
          <Button to="/bucket-list" variant="outline" size="lg">
            View All Bucket List Experiences
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BucketListFeatured;

