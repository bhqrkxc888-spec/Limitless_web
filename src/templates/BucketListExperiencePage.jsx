import { useParams, Link } from 'react-router-dom';
import { getBucketListBySlug, getRotatingFeatured, normalizeItinerary, normalizeDayNumber } from '../data/bucketList';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import { Button } from '../components/ui';
import { useState, useMemo } from 'react';
import { getOgImage } from '../utils/imageHelpers';
import { useBucketListImage } from '../hooks/useImageUrl';
import './BucketListExperiencePage.css';

/**
 * Bucket List Experience Page - "Destination Authority" Design
 * 
 * Single-column, magazine-style layout with:
 * - Elevated cards and layered sections
 * - Visual depth through shadows and backgrounds
 * - Image placeholders from database
 * - No emoji icons
 */

function BucketListExperiencePage() {
  const { slug } = useParams();
  const experience = getBucketListBySlug(slug);
  const [expandedItinerary, setExpandedItinerary] = useState(false);
  const relatedExperiences = getRotatingFeatured(4).filter(exp => exp.id !== experience?.id).slice(0, 3);
  
  // Load images from database
  const { imageUrl: heroImage } = useBucketListImage(experience?.id, 'hero', experience?.title);
  const { imageUrl: cardImage } = useBucketListImage(experience?.id, 'card', experience?.title);
  const { imageUrl: galleryImage1 } = useBucketListImage(experience?.id, 'gallery-1', experience?.title);
  const { imageUrl: galleryImage2 } = useBucketListImage(experience?.id, 'gallery-2', experience?.title);
  const { imageUrl: galleryImage3 } = useBucketListImage(experience?.id, 'gallery-3', experience?.title);
  const { imageUrl: ogImage } = useBucketListImage(experience?.id, 'og-image', experience?.title);

  // Structured Data for SEO
  const structuredData = useMemo(() => {
    if (!experience) return [];
    
    const baseUrl = 'https://www.limitlesscruises.com';
    const pageUrl = `${baseUrl}/bucket-list/${experience.slug}`;
    const seo = experience.seo || {};
    
    const tripSchema = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: experience.title,
      description: seo.metaDescription || experience.tagline,
      url: pageUrl,
      image: ogImage || heroImage || cardImage,
      ...(experience.lastUpdated && { dateModified: experience.lastUpdated }),
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/contact`
      }
    };
    
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Bucket List', item: `${baseUrl}/bucket-list` },
        { '@type': 'ListItem', position: 3, name: experience.title, item: pageUrl }
      ]
    };
    
    const faqs = experience.faqs || experience.faq || [];
    const faqSchema = faqs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    } : null;
    
    return [tripSchema, breadcrumbSchema, faqSchema].filter(Boolean);
  }, [experience, ogImage, heroImage, cardImage]);

  // Handle not found
  if (!experience) {
    return (
      <main className="bucket-list-experience-page">
        <SEO title="Experience Not Found" />
        <div className="container section">
          <h1>Experience Not Found</h1>
          <p>Sorry, we couldn't find the bucket list experience you're looking for.</p>
          <Button to="/bucket-list">View All Experiences</Button>
        </div>
      </main>
    );
  }

  // Get data with fallbacks
  const seo = experience.seo || {};
  const hero = experience.hero || {};
  const faqs = experience.faqs || experience.faq || [];
  const itinerary = normalizeItinerary(experience.itinerary || []);
  const hasGalleryImages = galleryImage1 || galleryImage2 || galleryImage3;

  return (
    <main className="bucket-list-experience-page authority-layout">
      {/* SEO */}
      <SEO
        title={seo.metaTitle || `${experience.title} | Bucket List Cruises | Limitless`}
        description={seo.metaDescription || experience.tagline}
        canonical={`https://www.limitlesscruises.com/bucket-list/${experience.slug}`}
        keywords={seo.keywords?.join(', ') || ''}
        image={ogImage ? getOgImage(ogImage) : getOgImage(heroImage)}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="authority-hero">
        <div 
          className="authority-hero-image"
          style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
        >
          <div className="authority-hero-overlay">
            <div className="container">
              <nav className="authority-breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/bucket-list">Bucket List</Link>
                <span>/</span>
                <span>{experience.title}</span>
              </nav>
              <h1>{hero.headline || experience.title}</h1>
              <p className="authority-hero-tagline">
                {hero.subheadline || experience.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Bar - Removed, info moved to When to Go section */}

      {/* Main Content */}
      <article className="authority-content">
        <div className="container authority-container">
          
          {/* Why This Destination? */}
          <section className="authority-section">
            <h2>Why {experience.title}?</h2>
            {experience.whyBucketListWorthy?.narrative ? (
              <div 
                className="authority-prose"
                dangerouslySetInnerHTML={{ __html: experience.whyBucketListWorthy.narrative }}
              />
            ) : experience.description ? (
              <p className="authority-prose">{experience.description}</p>
            ) : null}
          </section>

          {/* Image Gallery (if available) */}
          {hasGalleryImages && (
            <section className="image-gallery">
              <div className="image-gallery-grid">
                {galleryImage1 && (
                  <div className="gallery-image">
                    <img src={galleryImage1} alt={`${experience.title} scenery`} loading="lazy" />
                  </div>
                )}
                {galleryImage2 && (
                  <div className="gallery-image">
                    <img src={galleryImage2} alt={`${experience.title} wildlife`} loading="lazy" />
                  </div>
                )}
                {galleryImage3 && (
                  <div className="gallery-image">
                    <img src={galleryImage3} alt={`${experience.title} experience`} loading="lazy" />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Fallback: Single image if no gallery */}
          {!hasGalleryImages && cardImage && (
            <figure className="authority-image">
              <img 
                src={cardImage} 
                alt={`${experience.title} landscape`}
                loading="lazy"
              />
            </figure>
          )}

        </div>

        {/* When to Go - Layered Section */}
        {experience.optimalTiming && (
          <section className="timing-section">
            <div className="authority-container">
              <h2>When to Go</h2>
              {experience.duration && (
                <p className="timing-duration"><strong>Typical Duration:</strong> {experience.duration}</p>
              )}
              {experience.optimalTiming.summary && (
                <p className="authority-intro">{experience.optimalTiming.summary}</p>
              )}
              {experience.optimalTiming.seasons && (
                <div className="timing-cards">
                  {experience.optimalTiming.seasons.map((season, idx) => (
                    <div key={idx} className="timing-card">
                      <h4>{season.name}</h4>
                      <span className="timing-months">{season.months}</span>
                      {season.highlights && (
                        <ul>
                          {season.highlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <div className="container authority-container">
          {/* What You'll Experience */}
          {(experience.signatureSights || experience.signatureEncounters || experience.highlights) && (
            <section className="authority-section">
              <h2>What You'll Experience</h2>
              <div className="experience-cards">
                {(experience.signatureSights || experience.signatureEncounters || []).map((item, idx) => (
                  <div key={idx} className="experience-card">
                    <h3>{item.theme || item.title}</h3>
                    {item.highlights ? (
                      <ul>
                        {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    ) : item.description ? (
                      <p>{item.description}</p>
                    ) : null}
                  </div>
                ))}
                {/* Fallback to highlights if no signature content */}
                {!experience.signatureSights && !experience.signatureEncounters && experience.highlights && (
                  experience.highlights.map((highlight, idx) => (
                    <div key={idx} className="experience-card">
                      <p>{highlight}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* Sample Itinerary */}
          {itinerary.length > 0 && (
            <section className="itinerary-section">
              <h2>Sample Journey</h2>
              <p className="authority-intro">
                Every voyage is tailored to you. This example shows how a typical itinerary might unfold.
              </p>
              
              <div className={`itinerary-preview ${expandedItinerary ? 'expanded' : ''}`}>
                <div className="itinerary-list">
                  {itinerary.slice(0, expandedItinerary ? itinerary.length : 5).map((item, idx) => {
                    const dayNum = normalizeDayNumber(item.day, idx);
                    return (
                      <div key={idx} className="itinerary-row">
                        <span className="itinerary-day">Day {dayNum}</span>
                        <div className="itinerary-detail">
                          <strong>{item.location}</strong>
                          {item.description && <p>{item.description}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {itinerary.length > 5 && (
                  <button 
                    className="itinerary-toggle"
                    onClick={() => setExpandedItinerary(!expandedItinerary)}
                  >
                    {expandedItinerary ? 'Show less' : `Show all ${itinerary.length} days`}
                  </button>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Is This Right for You? - Layered Section */}
        {experience.idealVoyagerProfile && (
          <section className="suitability-section">
            <div className="authority-container">
              <h2>Is This Right for You?</h2>
              {experience.idealVoyagerProfile.intro && (
                <p className="authority-intro">{experience.idealVoyagerProfile.intro}</p>
              )}
              <div className="suitability-grid">
                {experience.idealVoyagerProfile.profiles?.map((profile, idx) => (
                  <div 
                    key={idx} 
                    className={`suitability-item ${profile.type.toLowerCase().includes('good') ? 'positive' : profile.type.toLowerCase().includes('consider') ? 'consideration' : ''}`}
                  >
                    <h4>{profile.type}</h4>
                    <p>{profile.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Common Questions - Layered Section */}
        {faqs.length > 0 && (
          <section className="authority-faq">
            <div className="authority-container">
              <h2>Common Questions</h2>
              <div className="faq-prose">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="authority-cta">
          <div className="authority-container">
            <h2>Ready to Start Planning?</h2>
            <p>
              Tell us what matters to you and we'll help find the right voyage. 
              Every journey is tailored to your preferences.
            </p>
            <div className="cta-buttons">
              <Button to="/contact" variant="primary" size="lg">
                Enquire About {experience.title}
              </Button>
              <Button href={`tel:${siteConfig.phone}`} variant="outline" size="lg">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </section>

        {/* Related Destinations */}
        {relatedExperiences.length > 0 && (
          <section className="authority-related">
            <div className="container authority-container">
              <h2>Explore More Destinations</h2>
              <div className="related-grid">
                {relatedExperiences.map((exp) => {
                  const RelatedCard = () => {
                    const { imageUrl } = useBucketListImage(exp.id, 'card', exp.title);
                    return (
                      <Link to={`/bucket-list/${exp.slug}`} className="related-card">
                        <div 
                          className="related-card-image"
                          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
                        />
                        <div className="related-card-content">
                          <h3>{exp.title}</h3>
                          <span className="related-card-duration">{exp.duration}</span>
                        </div>
                      </Link>
                    );
                  };
                  return <RelatedCard key={exp.id} />;
                })}
              </div>
            </div>
          </section>
        )}

      </article>
    </main>
  );
}

export default BucketListExperiencePage;
