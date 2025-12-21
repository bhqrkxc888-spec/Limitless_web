import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCruiseGuideBySlug } from '../services/cruiseGuidesAPI';
import SEO from '../components/SEO';
import { Button } from '../components/ui';
import { createSanitizedMarkup } from '../utils/sanitizeHtml';
import './CruiseGuideDetailPage.css';

function CruiseGuideDetailPage() {
  const { slug } = useParams();
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
        const data = await getCruiseGuideBySlug(slug);
        
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
  }, [slug]);

  if (loading) {
    return (
      <main className="guide-detail-page">
        <div className="container">
          <div className="guide-loading">Loading...</div>
        </div>
      </main>
    );
  }

  if (error || !guide) {
    return (
      <main className="guide-detail-page">
        <SEO title="Guide Not Found" noindex={true} />
        <div className="container">
          <div className="guide-error">
            <h1>Guide Not Found</h1>
            <p>Sorry, we couldn't find the guide you're looking for.</p>
            <Button to="/cruise-guides" variant="primary">
              ← Back to Guides
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="guide-detail-page">
      <SEO
        title={guide.meta_title || guide.title}
        description={guide.meta_description || guide.excerpt}
        keywords={guide.meta_keywords?.join(', ')}
        canonical={`https://www.limitlesscruises.com/cruise-guides/${guide.slug}`}
        image={guide.featured_image_url}
        type="article"
      />

      <div className="guide-detail-header">
        <div className="container">
          <div className="guide-detail-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/cruise-guides">Cruise Guides</Link>
            <span className="breadcrumb-separator">›</span>
            <span>{guide.title}</span>
          </div>
          {guide.guide_type && (
            <span className="guide-detail-type">
              {guide.guide_type.replace('_', ' ')}
            </span>
          )}
          <h1 className="guide-detail-title">{guide.title}</h1>
          {guide.excerpt && (
            <p className="guide-detail-excerpt">{guide.excerpt}</p>
          )}
        </div>
      </div>

      <div className="guide-detail-content-section">
        <div className="container">
          <article className="guide-detail-article">
            <div className="guide-detail-content" dangerouslySetInnerHTML={createSanitizedMarkup(guide.content)} />
            
            <div className="guide-detail-footer">
              <div className="guide-detail-cta">
                <h3>Ready to Plan Your Perfect Cruise?</h3>
                <p>Get in touch with your personal UK cruise consultant for expert guidance and exclusive deals.</p>
                <div className="guide-detail-cta-actions">
                  <Button to="/contact" variant="primary">Get in Touch</Button>
                  <Button to="/cruise-guides" variant="secondary">View More Guides</Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

export default CruiseGuideDetailPage;

