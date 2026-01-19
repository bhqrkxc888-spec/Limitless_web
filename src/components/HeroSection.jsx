import { useRef, useCallback } from 'react';
import { Button } from './ui';
import './HeroSection.css';

/**
 * HeroSection Component
 * Full-width hero with background image and overlay
 * Uses CSS-only fade-in to avoid React render cycle flash
 */
function HeroSection({
  title,
  subtitle,
  image,
  mobileImage,
  imageAlt = 'Hero background',
  primaryCta,
  secondaryCta,
  size = 'lg',
  align = 'left',
  children,
  className = ''
}) {
  const imgRef = useRef(null);

  // Callback ref - if image is cached, add 'loaded' class immediately
  const setImgRef = useCallback((node) => {
    if (node) {
      if (node.complete && node.naturalHeight !== 0) {
        // Cached - show instantly with no transition
        node.classList.add('loaded', 'no-transition');
      }
      imgRef.current = node;
    }
  }, []);

  // CSS-only load handler - directly add class to DOM
  const handleImageLoad = (e) => {
    e.target.classList.add('loaded');
  };

  const classes = [
    'hero',
    `hero-${size}`,
    `hero-${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {/* Background Image */}
      <div className="hero-background">
        {image ? (
          <picture>
            {mobileImage && (
              <source 
                media="(max-width: 768px)" 
                srcSet={mobileImage}
                type="image/webp"
              />
            )}
            <img
              ref={setImgRef}
              src={image}
              alt={imageAlt}
              className="hero-image"
              width={1920}
              height={1080}
              loading="eager"
              fetchpriority="high"
              decoding="sync"
              onLoad={handleImageLoad}
            />
          </picture>
        ) : (
          <div className="hero-placeholder" />
        )}
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          
          {(primaryCta || secondaryCta) && (
            <div className="hero-cta">
              {primaryCta && (
                <Button 
                  variant="primary"
                  size="lg"
                  href={primaryCta.href}
                  to={primaryCta.to}
                >
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button 
                  variant="outline"
                  size="lg"
                  href={secondaryCta.href}
                  to={secondaryCta.to}
                  className="btn-outline-white"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
