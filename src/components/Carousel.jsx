/**
 * Carousel Component
 * Reusable horizontal scrolling carousel with navigation arrows
 * Supports touch/swipe on mobile
 */

import { useState, useEffect, useRef } from 'react';
import './Carousel.css';

function Carousel({ children, itemsToShow = 3, className = '', layout = 'grid' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(itemsToShow);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsVisible(1);
      } else if (window.innerWidth < 1024) {
        setItemsVisible(2);
      } else {
        setItemsVisible(itemsToShow);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsToShow]);

  const items = Array.isArray(children) ? children : [children];
  const maxIndex = Math.max(0, items.length - itemsVisible);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!items || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(currentIndex, currentIndex + itemsVisible);
  const showNavigation = items.length > itemsVisible;

  return (
    <div 
      className={`carousel-wrapper ${className}`}
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {showNavigation && (
        <button
          className="carousel-nav carousel-prev"
          onClick={goToPrev}
          aria-label="Previous items"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}

      <div className={`carousel-items carousel-items-${layout}`}>
        {visibleItems}
      </div>

      {showNavigation && (
        <button
          className="carousel-nav carousel-next"
          onClick={goToNext}
          aria-label="Next items"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default Carousel;

