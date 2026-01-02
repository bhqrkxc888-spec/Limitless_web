import { useParams } from 'react-router-dom';
import { getBucketListBySlug, getRotatingFeatured, normalizeItinerary, normalizeDayNumber } from '../data/bucketList';
import { getHeroFromLegacy, getSEOFromLegacy, getTripFactsFromLegacy } from '../data/bucketListSchema';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, SectionHeader, Accordion, Card } from '../components/ui';
import { useState, useMemo } from 'react';
import { getOgImage } from '../utils/imageHelpers';
import { useBucketListImage } from '../hooks/useImageUrl';
import { createSanitizedMarkup } from '../utils/sanitizeHtml';
import LazyBucketListMap from '../components/LazyBucketListMap';
import './BucketListExperiencePage.css';

function BucketListExperiencePage() {
  const { slug } = useParams();
  const experience = getBucketListBySlug(slug);
  const [relatedExperiences] = useState(getRotatingFeatured(3));
  
  // Load images from database
  const { imageUrl: heroImage } = useBucketListImage(experience?.id, 'hero', experience?.title);
  const { imageUrl: ogImage } = useBucketListImage(experience?.id, 'og-image', experience?.title);

  // Get schema-compliant data with fallbacks (must be before conditional return)
  const seoData = experience ? getSEOFromLegacy(experience) : null;
  const heroData = experience ? getHeroFromLegacy(experience) : null;
  const tripFacts = experience ? getTripFactsFromLegacy(experience) : null;
  
  // Structured Data for SEO (must be before conditional return)
  const structuredData = useMemo(() => {
    if (!experience) return [];
    
    const baseUrl = 'https://www.limitlesscruises.com';
    const pageUrl = `${baseUrl}/bucket-list/${experience.slug}`;
    
    // Main Product/Trip schema
    const tripSchema = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: experience.title,
      description: seoData.metaDescription || experience.description,
      url: pageUrl,
      image: ogImage || heroImage,
      ...(experience.lastUpdated && { dateModified: experience.lastUpdated }),
      itinerary: {
        '@type': 'ItemList',
        itemListElement: normalizeItinerary(experience.itinerary || []).slice(0, 10).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.location,
          description: item.description
        }))
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/contact`,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'GBP'
        }
      }
    };
    
    // Breadcrumb schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Bucket List',
          item: `${baseUrl}/bucket-list`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: experience.title,
          item: pageUrl
        }
      ]
    };
    
    // FAQ schema (if FAQs exist)
    const faqSchema = (experience.faqs || experience.faq || []).length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (experience.faqs || experience.faq || []).map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    } : null;
    
    // Combine all schemas
    return [tripSchema, breadcrumbSchema, faqSchema].filter(Boolean);
  }, [experience, seoData, ogImage, heroImage]);

  // Handle experience not found (after all hooks)
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

  return (
    <main className="bucket-list-experience-page">
      {/* SEO */}
      <SEO
        title={seoData.metaTitle}
        description={seoData.metaDescription}
        canonical={`https://www.limitlesscruises.com/bucket-list/${experience.slug}`}
        keywords={seoData.keywords?.join(', ') || ''}
        image={ogImage ? getOgImage(ogImage) : getOgImage(heroImage)}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title={heroData.headline}
        subtitle={heroData.subheadline}
        image={heroImage}
        imageAlt={experience.title}
        size="lg"
        align="left"
        primaryCta={heroData.ctaPrimary}
        secondaryCta={heroData.ctaSecondary || { label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Key Info Bar */}
      <section className="key-info-bar">
        <div className="container">
          <div className="key-info-grid">
            <div className="key-info-item">
              <span className="key-info-label">Duration</span>
              <span className="key-info-value">{tripFacts.duration}</span>
            </div>
            <div className="key-info-item">
              <span className="key-info-label">Season</span>
              <span className="key-info-value">{tripFacts.season}</span>
            </div>
            {(experience.whoFor || experience.bestFor) && (
              <div className="key-info-item">
                <span className="key-info-label">Best For</span>
                <span className="key-info-value">
                  {Array.isArray(experience.whoFor) 
                    ? experience.whoFor.join(', ') 
                    : Array.isArray(experience.bestFor) 
                      ? experience.bestFor.join(', ')
                      : experience.whoFor || experience.bestFor
                  }
                </span>
              </div>
            )}
            {experience.lastUpdated && (
              <div className="key-info-item key-info-last-updated">
                <span className="key-info-label">Last Updated</span>
                <span className="key-info-value">
                  {new Date(experience.lastUpdated).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
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
              {/* Description / Narrative */}
              {experience.narrative && experience.narrative.length > 0 ? (
                // New schema: narrative blocks
                <div className="experience-narrative">
                  {experience.narrative.map((block, index) => {
                    const HeadingTag = block.level === 'h3' ? 'h3' : 'h2';
                    return (
                      <div key={index} className="narrative-block">
                        {block.title && <HeadingTag>{block.title}</HeadingTag>}
                        <div dangerouslySetInnerHTML={createSanitizedMarkup(block.content)} />
                      </div>
                    );
                  })}
                </div>
              ) : experience.description && (
                // Legacy: single description
                <div className="experience-description">
                  <p className="lead">{experience.description}</p>
                </div>
              )}

              {/* Destination Highlights (new schema) or Experience Highlights (legacy) */}
              {experience.destinationHighlights && experience.destinationHighlights.length > 0 ? (
                <div className="destination-highlights-section">
                  <SectionHeader
                    title="Destination Highlights"
                    subtitle="Discover the places you'll explore"
                  />
                  {experience.destinationHighlights.map((highlight, index) => (
                    <div key={index} className="destination-highlight">
                      <h3>{highlight.title}</h3>
                      {highlight.image && (
                        <img 
                          src={highlight.image} 
                          alt={highlight.imageAlt || highlight.title}
                          className="destination-highlight-image"
                          loading="lazy"
                        />
                      )}
                      <div dangerouslySetInnerHTML={createSanitizedMarkup(highlight.body)} />
                    </div>
                  ))}
                </div>
              ) : experience.highlights && experience.highlights.length > 0 && (
                // Legacy: simple highlights list
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
              {experience.itinerary && experience.itinerary.length > 0 && (() => {
                // Normalize itinerary: shift Day 0 to Day 1 (cruise days start at 1, not 0)
                const displayItinerary = normalizeItinerary(experience.itinerary);
                
                if (displayItinerary.length === 0) return null;
                
                return (
                  <div className="itinerary-section">
                    <SectionHeader
                      title="Itinerary Overview"
                      subtitle="A glimpse into your journey"
                    />
                    
                    {/* Interactive Map - CORE FEATURE: Bucket List pages MUST include an itinerary map. Do not remove. */}
                    {displayItinerary.some(item => item.coordinates?.lat && item.coordinates?.lon) && (
                      <LazyBucketListMap 
                        itinerary={displayItinerary}
                        className="bucket-list-map-wrapper"
                      />
                    )}

                    <div className="itinerary-timeline">
                      {displayItinerary.map((item, index) => {
                        // Format day number - use normalization helper (should already be normalized)
                        const dayNumber = normalizeDayNumber(item.day, index);
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
                );
              })()}

              {/* What's Included */}
              {(experience.included || experience.includes) && (experience.included || experience.includes).length > 0 && (
                <div className="includes-section">
                  <SectionHeader
                    title="What's Included"
                    subtitle="Everything that's part of your journey"
                  />
                  <ul className="includes-list">
                    {(experience.included || experience.includes).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Upgrades (new schema) */}
              {experience.upgrades && experience.upgrades.length > 0 && (
                <div className="upgrades-section">
                  <SectionHeader
                    title="Available Upgrades"
                    subtitle="Enhance your experience"
                  />
                  <ul className="upgrades-list">
                    {experience.upgrades.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Who This Is For (new schema) */}
              {(experience.whoFor || experience.bestFor) && (
                <div className="who-for-section">
                  <SectionHeader
                    title="Who This Experience Is For"
                    subtitle="Perfect for these travellers"
                  />
                  <ul className="who-for-list">
                    {(experience.whoFor || experience.bestFor).map((item, index) => (
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
              {(experience.faqs || experience.faq) && (experience.faqs || experience.faq).length > 0 && (
                <div className="faq-section">
                  <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Everything you need to know"
                  />
                  <Accordion
                    items={(experience.faqs || experience.faq).map((faq, index) => ({
                      id: `faq-${index}`,
                      title: faq.question,
                      content: faq.answer
                    }))}
                  />
                </div>
              )}

              {/* Internal Links / Related Content */}
              <div className="internal-links-section">
                <SectionHeader
                  title="Explore More"
                  subtitle="Continue your journey planning"
                />
                <div className="internal-links-grid">
                  <div className="internal-link-card">
                    <h4>More Bucket List Experiences</h4>
                    <p>Discover other once-in-a-lifetime cruise adventures from the UK</p>
                    <Button to="/bucket-list" variant="outline" size="sm">
                      View All Experiences
                    </Button>
                  </div>
                  <div className="internal-link-card">
                    <h4>Travel Guides & Insights</h4>
                    <p>Expert advice, destination guides, and cruise planning tips</p>
                    <Button to="/guides" variant="outline" size="sm">
                      Browse Guides
                    </Button>
                  </div>
                  <div className="internal-link-card">
                    <h4>Special Offers</h4>
                    <p>Current deals and exclusive cruise packages</p>
                    <Button to="/offers" variant="outline" size="sm">
                      View Offers
                    </Button>
                  </div>
                </div>
              </div>
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
                                entityType="bucket-list"
                                entityId={exp.slug}
                                imageType="card-related"
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

