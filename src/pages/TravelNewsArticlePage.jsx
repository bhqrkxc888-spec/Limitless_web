import { useParams, Link } from 'react-router-dom';
import { useTravelNewsArticle } from '../hooks/useTravelNews';
import { incrementTravelNewsView } from '../services/travelNewsAPI';
import { supabase } from '../lib/supabase';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button, SectionHeader } from '../components/ui';
import { useEffect, useState, useRef } from 'react';
import './TravelNewsArticlePage.css';

function TravelNewsArticlePage() {
  const { slug } = useParams();
  
  // Validate slug format
  const isValidSlug = slug && /^[a-z0-9-]+$/i.test(slug);
  
  const { article, loading, error } = useTravelNewsArticle(isValidSlug ? slug : null);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: null });
  const lastSubmitTime = useRef(0);
  const isSubmitting = useRef(false);

  // Track view when article is loaded
  useEffect(() => {
    if (article?.id) {
      incrementTravelNewsView(article.id);
    }
  }, [article?.id]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Immediate double-submit protection
    if (isSubmitting.current) {
      return;
    }
    
    // Rate limiting: prevent submissions within 3 seconds
    const now = Date.now();
    if (now - lastSubmitTime.current < 3000) {
      setFormStatus({ submitting: false, submitted: false, error: 'Please wait a moment before submitting again.' });
      return;
    }
    
    isSubmitting.current = true;
    lastSubmitTime.current = now;
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // Prepare enquiry data
      const enquiryData = {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: contactForm.message,
        source: `News Article: ${article?.title || slug}`,
        context: {
          articleUrl: window.location.href,
          articleSlug: slug,
          articleTitle: article?.title
        }
      };

      // Submit to Supabase with 10s timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const { error } = await Promise.race([
        supabase.from('website_enquiries').insert([enquiryData]),
        timeoutPromise
      ]);
      
      if (error) throw error;
      
      setFormStatus({ submitting: false, submitted: true, error: null });
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setFormStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Failed to send. Please try again or contact us directly.' 
      });
    } finally {
      isSubmitting.current = false;
    }
  };

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCategory = (category) => {
    if (!category) return '';
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Loading state
  if (loading) {
    return (
      <main className="travel-news-article-page">
        <SEO title="Loading Article..." />
        <div className="container section">
          <div className="article-loading">
            <div className="article-loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (!isValidSlug || error || !article) {
    return (
      <main className="travel-news-article-page">
        <SEO title="Article Not Found" />
        <div className="container section">
          <div className="article-not-found">
            <h1>Article Not Found</h1>
            <p>{!isValidSlug ? 'Invalid article URL.' : 'Sorry, we couldn\'t find the article you\'re looking for. It may have expired or been removed.'}</p>
            <div className="article-actions">
              <Button to="/travel-news">View All Articles</Button>
              <Button to="/contact" variant="outline">Contact Us</Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || article.meta_description,
    url: `https://www.limitlesscruises.com/travel-news/${article.slug}`,
    datePublished: article.published_at,
    image: article.featured_image_url || article.thumbnail_image_url,
    author: {
      '@type': 'Organization',
      name: 'Limitless Cruises'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Limitless Cruises',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jl2lrfef2mjsop6t.public.blob.vercel-storage.com/site/favicon.webp',
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.limitlesscruises.com/travel-news/${article.slug}`
    }
  };

  return (
    <main className="travel-news-article-page">
      {/* SEO */}
      <SEO
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt}
        canonical={`https://www.limitlesscruises.com/travel-news/${article.slug}`}
        keywords={article.meta_keywords?.join(', ') || ''}
        image={article.featured_image_url || article.thumbnail_image_url}
        structuredData={structuredData}
      />

      {/* Clean Article Header */}
      <section className="article-header">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="article-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/travel-news">Travel News</Link>
            {article.category && (
              <>
                <span className="breadcrumb-separator">/</span>
                <Link to={`/travel-news/category/${article.category}`}>
                  {formatCategory(article.category)}
                </Link>
              </>
            )}
          </nav>

          {/* Article Meta */}
          <div className="article-header-meta">
            {article.category && (
              <Link 
                to={`/travel-news/category/${article.category}`} 
                className="article-header-category"
              >
                {formatCategory(article.category)}
              </Link>
            )}
            {article.published_at && (
              <time className="article-header-date">
                {formatDate(article.published_at)}
              </time>
            )}
            {article.view_count !== undefined && (
              <span className="article-header-views">
                {article.view_count} views
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="article-header-title">{article.title}</h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="article-header-excerpt">{article.excerpt}</p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-header-tags">
              {article.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/travel-news/tag/${encodeURIComponent(tag)}`} 
                  className="article-header-tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="article-grid">
            <div className="article-main">
              {/* Featured Image */}
              {article.featured_image_url && (
                <div className="article-featured-image" style={{ marginBottom: '32px' }}>
                  <img 
                    src={article.featured_image_url}
                    alt={article.title}
                    width={article.featured_image_width}
                    height={article.featured_image_height}
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
              )}

              {/* Article Content */}
              {article.content && (
                <div className="article-content">
                  <div 
                    className="article-content-body"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              )}

              {/* Gallery Images */}
              {article.gallery_images && article.gallery_images.length > 0 && (
                <div className="article-gallery">
                  <h3>Gallery</h3>
                  <div className="gallery-grid">
                    {article.gallery_images.map((imageUrl, index) => (
                      <div key={index} className="gallery-item">
                        <img 
                          src={imageUrl} 
                          alt={`${article.title} - Image ${index + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share / Back Actions */}
              <div className="article-footer-actions">
                <Button to="/travel-news" variant="outline">
                  Back to News
                </Button>
                <Button to="/contact" variant="primary">
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="article-sidebar">
              {/* Mini Contact Form */}
              <div className="sidebar-card sidebar-card--contact">
                <h3>Get in Touch</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-secondary)', marginBottom: '16px' }}>
                  Interested in this? Let us help plan your cruise.
                </p>
                
                {formStatus.submitted ? (
                  <div style={{ padding: '24px', textAlign: 'center', background: 'var(--clr-success-bg)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✓</div>
                    <p style={{ margin: 0, fontWeight: '500', color: 'var(--clr-success)' }}>Thanks! We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))}
                      required
                      style={{
                        padding: '10px 12px',
                        border: '1px solid var(--clr-border)',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        width: '100%'
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                      required
                      style={{
                        padding: '10px 12px',
                        border: '1px solid var(--clr-border)',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        width: '100%'
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))}
                      style={{
                        padding: '10px 12px',
                        border: '1px solid var(--clr-border)',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        width: '100%'
                      }}
                    />
                    <textarea
                      placeholder="Your Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                      rows={3}
                      style={{
                        padding: '10px 12px',
                        border: '1px solid var(--clr-border)',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        width: '100%',
                        resize: 'vertical'
                      }}
                    />
                    
                    {formStatus.error && (
                      <p style={{ margin: 0, color: 'var(--clr-error)', fontSize: '0.75rem' }}>{formStatus.error}</p>
                    )}
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      fullWidth
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting ? 'Sending...' : 'Send Enquiry'}
                    </Button>
                  </form>
                )}
                
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--clr-border)', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: 'var(--clr-text-secondary)' }}>Or call us directly:</p>
                  <a 
                    href={`tel:${siteConfig.phone}`} 
                    style={{ fontWeight: '600', color: 'var(--clr-primary)', textDecoration: 'none' }}
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Category Navigation */}
              {article.category && (
                <div className="sidebar-card">
                  <h3>Category</h3>
                  <Link to={`/travel-news/category/${article.category}`} className="category-link">
                    {formatCategory(article.category)}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              )}

              {/* Related Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="sidebar-card">
                  <h3>Related Topics</h3>
                  <div className="sidebar-tags">
                    {article.tags.map((tag, index) => (
                      <Link 
                        key={index} 
                        to={`/travel-news/tag/${encodeURIComponent(tag)}`} 
                        className="sidebar-tag"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="section section-light">
        <div className="container">
          <SectionHeader
            title="More Travel News"
            subtitle="Explore more articles"
          />
          <div className="related-articles-cta">
            <Button to="/travel-news" variant="primary" size="lg">
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TravelNewsArticlePage;
