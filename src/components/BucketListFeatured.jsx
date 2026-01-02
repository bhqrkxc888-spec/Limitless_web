/**
 * BucketListFeatured Component
 * Dynamic rotating featured bucket list experiences for homepage
 * Carousel with 3 items visible on desktop, arrows to navigate
 * 
 * Performance: Data is lazy-loaded after LCP to reduce initial bundle size
 */

import { useState, useEffect } from 'react';
import { Card } from './ui';
import { Button } from './ui';
import { useBucketListImage } from '../hooks/useImageUrl';
import './BucketListFeatured.css';

function BucketListFeatured() {
  // Lazy load bucket list data after LCP to reduce initial bundle (~46KB savings)
  const [allFeatured, setAllFeatured] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Lazy load bucket list data after idle/LCP
  useEffect(() => {
    const loadData = () => {
      import('../data/bucketList').then(({ getAllBucketList }) => {
        setAllFeatured(getAllBucketList().filter(exp => exp.featured));
        setDataLoaded(true);
      });
    };

    // Defer data loading until after LCP/idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: 2000 });
    } else {
      setTimeout(loadData, 100);
    }
  }, []);

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

  // When loading or empty, render minimal container that collapses without CLS
  if (!dataLoaded || !allFeatured || allFeatured.length === 0) {
    return <section className="bucket-list-featured bucket-list-featured--empty" aria-hidden="true" />;
  }

  return (
    <section className="bucket-list-featured">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Extraordinary Experiences</p>
          <h2>Bucket List Destinations</h2>
          <p className="section-subtitle">
            Discover once-in-a-lifetime cruise experiences to the world's most remarkable destinations. 
            Let us help you plan your dream voyage with expert guidance and exclusive access.
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
            {visibleItems.map((experience) => {
              const ExperienceCard = () => {
                const { imageUrl } = useBucketListImage(experience.id, 'card', experience.title);
                return (
                  <Card 
                    to={`/bucket-list/${experience.slug}`} 
                    variant="default"
                    className="bucket-list-featured-card"
                  >
                    <Card.Image 
                      src={imageUrl} 
                      alt={experience.title}
                      aspectRatio="3/2"
                      loading="lazy"
                    />
                    <Card.Content>
                      <div className="bucket-list-badge">Bucket List</div>
                      <Card.Title as="h3">{experience.title}</Card.Title>
                      <Card.Description>{experience.tagline}</Card.Description>
                      <div className="bucket-list-featured-meta">
                        <span className="duration">{experience.duration}</span>
                      </div>
                      <div className="bucket-list-featured-cta-inline">
                        <span className="bucket-list-cta-text">Enquire Now</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </Card.Content>
                  </Card>
                );
              };
              return <ExperienceCard key={experience.id} />;
            })}
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
          <Button to="/contact" variant="primary" size="lg">
            Discuss Your Dream Cruise
          </Button>
          <Button to="/bucket-list" variant="outline" size="lg">
            View All Bucket List Experiences
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BucketListFeatured;

