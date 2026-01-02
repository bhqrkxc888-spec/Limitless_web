import { useParams } from 'react-router-dom';
import { getBucketListBySlug, getRotatingFeatured } from '../data/bucketList';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader, Accordion, Card } from '../components/ui';
import { useState, Suspense, lazy } from 'react';
import { getOgImage } from '../utils/imageHelpers';
import { useBucketListImage } from '../hooks/useImageUrl';
import './BucketListExperiencePage.css';

const BucketListMap = lazy(() => import('../components/BucketListMap'));

function BucketListExperiencePage() {
  const { slug } = useParams();
  const experience = getBucketListBySlug(slug);
  const [relatedExperiences] = useState(getRotatingFeatured(3));
  
  // Load images from database
  const { imageUrl: heroImage } = useBucketListImage(experience?.id, 'hero', experience?.title);
  const { imageUrl: ogImage } = useBucketListImage(experience?.id, 'og-image', experience?.title);

  // Handle experience not found
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

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: experience.title,
    description: experience.description,
    url: `https://www.limitlesscruises.com/bucket-list/${experience.slug}`,
    category: 'Travel Package',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: experience.testimonials?.length || 0
    }
  };

  return (
    <main className="bucket-list-experience-page">
      {/* SEO */}
      <SEO
        title={experience.meta?.title || `${experience.title} | Bucket List Experience`}
        description={experience.meta?.description || experience.description}
        canonical={`https://www.limitlesscruises.com/bucket-list/${experience.slug}`}
        keywords={experience.meta?.keywords?.join(', ') || ''}
        image={ogImage ? getOgImage(ogImage) : getOgImage(heroImage)}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={experience.title}
        subtitle={experience.tagline}
        image={heroImage}
        imageAlt={experience.title}
        size="lg"
        align="left"
        primaryCta={{ label: 'Enquire Now', to: '/contact' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Key Info Bar */}
      <section className="key-info-bar">
        <div className="container">
          <div className="key-info-grid">
            <div className="key-info-item">
              <span className="key-info-label">Duration</span>
              <span className="key-info-value">{experience.duration}</span>
            </div>
            <div className="key-info-item">
              <span className="key-info-label">Season</span>
              <span className="key-info-value">{experience.season}</span>
            </div>
            {experience.bestFor && experience.bestFor.length > 0 && (
              <div className="key-info-item">
                <span className="key-info-label">Best For</span>
                <span className="key-info-value">{experience.bestFor.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="experience-grid">
            <div className="experience-main">
              {/* Description */}
              <div className="experience-description">
                <p className="lead">{experience.description}</p>
              </div>

              {/* Highlights */}
              {experience.highlights && experience.highlights.length > 0 && (
                <div className="highlights-section">
                  <SectionHeader
                    title="Experience Highlights"
                    subtitle="What makes this journey extraordinary"
                  />
                  <div className="highlights-grid">
                    {experience.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-card">
                        <div className="highlight-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {experience.itinerary && experience.itinerary.length > 0 && (
                <div className="itinerary-section">
                  <SectionHeader
                    title="Itinerary Overview"
                    subtitle="A glimpse into your journey"
                  />
                  
                  {/* Interactive Map */}
                  {experience.itinerary.some(item => item.coordinates?.lat && item.coordinates?.lon) && (
                    <div className="bucket-list-map-wrapper">
                      <Suspense fallback={
                        <div style={{ 
                          minHeight: '400px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: 'var(--clr-bg-alt)',
                          borderRadius: '12px',
                          marginBottom: '2rem'
                        }}>
                          <p>Loading interactive map...</p>
                        </div>
                      }>
                        <BucketListMap 
                          itinerary={experience.itinerary}
                        />
                      </Suspense>
                    </div>
                  )}

                  <div className="itinerary-timeline">
                    {experience.itinerary.map((item, index) => {
                      // Format day number - extract first number if range (e.g., "2-3" -> "D2")
                      const dayNumber = item.day.match(/^\d+/)?.[0] || (index + 1).toString();
                      return (
                        <div key={index} className="itinerary-item">
                          <div className="itinerary-day">D{dayNumber}</div>
                          <div className="itinerary-content">
                            <h4>{item.location}</h4>
                            {item.description && <p>{item.description}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* What's Included */}
              {experience.includes && experience.includes.length > 0 && (
                <div className="includes-section">
                  <SectionHeader
                    title="What's Included"
                    subtitle="Everything that's part of your journey"
                  />
                  <ul className="includes-list">
                    {experience.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testimonials */}
              {experience.testimonials && experience.testimonials.length > 0 && (
                <div className="testimonials-section">
                  <SectionHeader
                    title="Guest Experiences"
                    subtitle="What our guests say"
                  />
                  <div className="testimonials-grid">
                    {experience.testimonials.map((testimonial, index) => (
                      <div key={index} className="testimonial-card">
                        <div className="testimonial-quote">
                          <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                          </svg>
                        </div>
                        <p className="testimonial-text">"{testimonial.quote}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {experience.faq && experience.faq.length > 0 && (
                <div className="faq-section">
                  <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Everything you need to know"
                  />
                  <Accordion>
                    {experience.faq.map((faq, index) => (
                      <Accordion.Item key={index} title={faq.question}>
                        <p>{faq.answer}</p>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="experience-sidebar">
              <div className="sidebar-card booking-card">
                <h3>Book This Experience</h3>
                <p>
                  Ready to embark on this extraordinary journey? Your expert consultant is here to help.
                </p>
                <div className="sidebar-cta">
                  <Button href={`tel:${siteConfig.phone}`} variant="primary" fullWidth>
                    Call {siteConfig.phone}
                  </Button>
                  <Button to="/contact" variant="outline" fullWidth>
                    Enquire Online
                  </Button>
                </div>
              </div>

              {/* Cruise Lines */}
              {experience.cruiseLines && experience.cruiseLines.length > 0 && (
                <div className="sidebar-card">
                  <h3>Available Cruise Lines</h3>
                  <ul className="cruise-lines-list">
                    {experience.cruiseLines.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Experiences */}
              {relatedExperiences.length > 0 && (
                <div className="sidebar-card">
                  <h3>You May Also Like</h3>
                  <div className="related-experiences">
                    {relatedExperiences
                      .filter(exp => exp.id !== experience.id)
                      .slice(0, 3)
                      .map((exp) => {
                        const RelatedExperienceCard = () => {
                          const { imageUrl: cardImage } = useBucketListImage(exp.id, 'card', exp.title);
                          return (
                            <Card to={`/bucket-list/${exp.slug}`} variant="outlined" className="related-card">
                              <Card.Image 
                                src={cardImage} 
                                alt={exp.title}
                                aspectRatio="3/2"
                              />
                              <Card.Content>
                                <Card.Title as="h4" className="small-title">{exp.title}</Card.Title>
                                <Card.Description className="small-text">{exp.tagline}</Card.Description>
                              </Card.Content>
                            </Card>
                          );
                        };
                        return <RelatedExperienceCard key={exp.id} />;
                      })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="bucket-list-cta-content">
            <h2>Ready to Experience {experience.title}?</h2>
            <p>
              Get in touch today for a personalised quote and expert advice on this bucket list adventure. 
              I'll help you find the perfect itinerary, dates, and exclusive deals.
            </p>
            <div className="cta-options">
              <div className="cta-option">
                <h3>Get a Quote</h3>
                <p>Request a personalised quote tailored to your preferences and dates</p>
                <Button to="/contact" variant="primary" size="lg" fullWidth>
                  Request Quote
                </Button>
              </div>
              <div className="cta-divider"></div>
              <div className="cta-option">
                <h3>Speak with Your Consultant</h3>
                <p>Call or WhatsApp for immediate advice and booking assistance</p>
                <div className="cta-contact-buttons">
                  <Button href={`tel:${siteConfig.phone}`} variant="outline" size="lg" className="btn-outline-white">
                    Call {siteConfig.phone}
                  </Button>
                  <Button href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} variant="outline" size="lg" className="btn-outline-white" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BucketListExperiencePage;

