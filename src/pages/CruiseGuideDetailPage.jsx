import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { getCruiseGuideBySlug } from '../services/cruiseGuidesAPI';
import SEO, { getBreadcrumbSchema } from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader } from '../components/ui';
import SocialShare from '../components/SocialShare';
import { createSanitizedMarkup } from '../utils/sanitizeHtml';
import { siteConfig } from '../config/siteConfig';
import { ChevronRight, Loader2, BookOpen } from 'lucide-react';
import './CruiseGuideDetailPage.css';

function CruiseGuideDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isPreviewMode = searchParams.get('preview') === 'true';
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate slug format
    if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
      setError('Invalid guide URL');
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadGuide() {
      try {
        setLoading(true);
        setError(null);
        // Pass preview flag to fetch draft content if preview mode
        const data = await getCruiseGuideBySlug(slug, isPreviewMode);
        
        if (!cancelled) {
          if (data) {
            setGuide(data);
          } else {
            setError('Guide not found');
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load guide');
          console.error('Error loading guide:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGuide();

    return () => {
      cancelled = true;
    };
  }, [slug, isPreviewMode]);

  // Format guide type for display
  const formatGuideType = (type) => {
    if (!type) return 'Guide';
    return type
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Structured data for SEO
  const getStructuredData = () => {
    if (!guide) return null;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.meta_description || guide.excerpt,
      url: `https://www.limitlesscruises.com/cruise-guides/${guide.slug}`,
      image: guide.featured_image_url,
      datePublished: guide.published_at,
      dateModified: guide.updated_at,
      author: {
        '@type': 'Organization',
        name: 'Limitless Cruises'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Limitless Cruises',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.limitlesscruises.com/images/logo.png'
        }
      }
    };

    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.limitlesscruises.com/' },
      { name: 'Cruise Guides', url: 'https://www.limitlesscruises.com/cruise-guides' },
      { name: guide.title, url: `https://www.limitlesscruises.com/cruise-guides/${guide.slug}` }
    ]);

    return [articleSchema, breadcrumbSchema];
  };

  // Loading state
  if (loading) {
    return (
      <main className="guide-detail-page">
        <SEO title="Loading Guide..." />
        <div className="container section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Loader2 size={48} className="loading-spinner" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      </main>
    );
  }

  // Error state
  if (error || !guide) {
    return (
      <main className="guide-detail-page">
        <SEO title="Guide Not Found" noindex={true} />
        <div className="container section">
          <div className="guide-not-found">
            <BookOpen size={64} className="not-found-icon" />
            <h1>Guide Not Found</h1>
            <p>Sorry, we couldn't find the guide you're looking for.</p>
            <Button to="/cruise-guides" variant="primary">View All Guides</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="guide-detail-page">
      {/* Preview Mode Banner */}
      {(guide.isPreview || guide.status !== 'published') && (
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          padding: '12px 24px',
          textAlign: 'center',
          fontWeight: '500',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}>
          ⚠️ PREVIEW MODE - This guide is not yet published. Only you can see this preview.
        </div>
      )}

      {/* SEO - only for published guides */}
      <SEO
        title={guide.meta_title || `${guide.title} | Cruise Guide`}
        description={guide.meta_description || guide.excerpt}
        keywords={guide.meta_keywords?.join(', ')}
        canonical={`https://www.limitlesscruises.com/cruise-guides/${guide.slug}`}
        image={guide.featured_image_url}
        type="article"
        structuredData={getStructuredData()}
        noindex={guide.status !== 'published'}
      />

      {/* Hero Section */}
      <HeroSection
        title={guide.title}
        subtitle={guide.excerpt}
        image={guide.featured_image_url}
        imageAlt={guide.title}
        size="md"
        align="left"
      />

      {/* Main Content */}
      <article className="guide-content">
        <div className="container">
          
          {/* Share and Breadcrumb Row */}
          <div className="guide-header-actions">
            <Link to="/cruise-guides" className="guide-back-link">
              <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              Back to Cruise Guides
            </Link>
            <div className="guide-meta-row">
              {guide.guide_type && (
                <span className="guide-type-badge">
                  {formatGuideType(guide.guide_type)}
                </span>
              )}
              <SocialShare
                url={`https://www.limitlesscruises.com/cruise-guides/${guide.slug}`}
                title={guide.title}
                description={guide.excerpt}
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="guide-article-wrapper">
            <div className="guide-article-content" dangerouslySetInnerHTML={createSanitizedMarkup(guide.content)} />
          </div>

        </div>
      </article>

      {/* CTA Section */}
      <section className="guide-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Book Your Cruise?</h2>
            <p>
              Speak with our cruise consultants to find the perfect itinerary. 
              We'll help you plan an unforgettable holiday.
            </p>
            <div className="cta-buttons">
              <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
                Call {siteConfig.phone}
              </Button>
              <Button to="/find-a-cruise" variant="outline" size="lg">
                Find a Cruise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="guide-navigation-footer">
        <div className="container">
          <div className="guide-nav-links">
            <Link to="/cruise-guides" className="guide-nav-link">
              View All Cruise Guides
            </Link>
            <span className="nav-separator">•</span>
            <Link to="/cruise-lines" className="guide-nav-link">
              Browse Cruise Lines
            </Link>
            <span className="nav-separator">•</span>
            <Link to="/destinations" className="guide-nav-link">
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="guide-footer">
        <div className="container">
          <p className="disclaimer-text">
            <strong>Disclaimer:</strong> Information in this guide is compiled from publicly available sources and our experience. 
            Cruise line policies, pricing, and offerings may change. Always verify current details with the cruise line before booking.
          </p>
          {guide.updated_at && (
            <p className="update-date">
              Guide last updated: {new Date(guide.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
      </footer>
    </main>
  );
}

export default CruiseGuideDetailPage;

