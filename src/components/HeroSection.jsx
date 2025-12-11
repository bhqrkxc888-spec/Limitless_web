import { Button } from './ui';
import './HeroSection.css';

/**
 * HeroSection Component
 * Full-width hero with background image and overlay
 * 
 * @param {Object} props
 * @param {string} props.title - Main heading
 * @param {string} props.subtitle - Subtitle text
 * @param {string} props.image - Background image URL
 * @param {string} props.imageAlt - Alt text for background image
 * @param {Object} props.primaryCta - Primary CTA { label, href, to }
 * @param {Object} props.secondaryCta - Secondary CTA { label, href, to }
 * @param {string} props.size - 'sm' | 'md' | 'lg' | 'full'
 * @param {string} props.align - 'left' | 'center'
 */
function HeroSection({
  title,
  subtitle,
  image,
  imageAlt = 'Hero background',
  primaryCta,
  secondaryCta,
  size = 'lg',
  align = 'left',
  children,
  className = ''
}) {
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
          <img src={image} alt={imageAlt} className="hero-image" loading="eager" />
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

