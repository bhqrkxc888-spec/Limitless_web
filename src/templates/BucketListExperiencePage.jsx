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
import './BucketListExperiencePage.css';

// Icon mapping for Who For section
const whoForIcons = {
  wildlife: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3c-1.5 0-2.5 1-3 2-1 0-2 1-2 2 0 .5.2 1 .5 1.5C6.5 9 6 10 6 11c0 2 1.5 3 3 3h6c1.5 0 3-1 3-3 0-1-.5-2-1.5-2.5.3-.5.5-1 .5-1.5 0-1-1-2-2-2-.5-1-1.5-2-3-2z"/>
      <path d="M8 14v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4"/>
    </svg>
  ),
  adventure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="m2 17 10 5 10-5"/>
      <path d="m2 12 10 5 10-5"/>
    </svg>
  ),
  culture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18"/>
      <path d="M5 21V7l8-4v18"/>
      <path d="M19 21V11l-6-4"/>
      <path d="M9 9v.01"/>
      <path d="M9 12v.01"/>
      <path d="M9 15v.01"/>
    </svg>
  ),
  photography: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  couples: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  families: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="4"/>
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
      <circle cx="17" cy="11" r="2"/>
      <path d="M17 21v-1a2 2 0 0 1 2-2h.5"/>
    </svg>
  ),
  solo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="5"/>
      <path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  ),
  nature: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22v-7"/>
      <path d="M12 15c-4.5 0-7-2.5-7-7 0-3 2-5.5 5-6 .5 2.5 2 4 4 4s3.5-1.5 4-4c3 .5 5 3 5 6 0 4.5-2.5 7-7 7"/>
    </svg>
  ),
  relaxation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12h6"/>
      <path d="M22 12h-6"/>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4"/>
      <path d="M12 18v4"/>
    </svg>
  ),
  luxury: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
};

// Category icons for Signature Encounters
const categoryIcons = {
  wildlife: '🦋',
  culture: '🏛️',
  landscape: '🏔️',
  adventure: '🚀',
  culinary: '🍷',
  history: '📜',
  nature: '🌿',
  default: '✨'
};

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

  // Helper to get whoFor items with backwards compatibility
  const getWhoForItems = () => {
    const items = experience.whoFor || experience.bestFor || [];
    return items.map(item => {
      if (typeof item === 'string') {
        // Legacy format: simple string, guess icon from content
        const lower = item.toLowerCase();
        let type = 'default';
        if (lower.includes('wildlife') || lower.includes('animal')) type = 'wildlife';
        else if (lower.includes('adventure') || lower.includes('explorer')) type = 'adventure';
        else if (lower.includes('culture') || lower.includes('heritage')) type = 'culture';
        else if (lower.includes('photo')) type = 'photography';
        else if (lower.includes('couple') || lower.includes('romantic')) type = 'couples';
        else if (lower.includes('famil')) type = 'families';
        else if (lower.includes('solo')) type = 'solo';
        else if (lower.includes('nature') || lower.includes('enthusiast')) type = 'nature';
        else if (lower.includes('relax')) type = 'relaxation';
        else if (lower.includes('luxury')) type = 'luxury';
        return { type, label: item };
      }
      return item;
    });
  };

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
                  {getWhoForItems().slice(0, 3).map(item => item.label).join(', ')}
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
                <div className="experience-description">
                  <p className="lead">{experience.description}</p>
                </div>
              )}

              {/* Optimal Timing Section */}
              {experience.optimalTiming && (
                <div className="optimal-timing-section">
                  <SectionHeader
                    title="When to Visit"
                    subtitle="The best times to experience this destination"
                  />
                  {experience.optimalTiming.summary && (
                    <p className="timing-summary">{experience.optimalTiming.summary}</p>
                  )}
                  {experience.optimalTiming.seasons && experience.optimalTiming.seasons.length > 0 && (
                    <div className="seasons-grid">
                      {experience.optimalTiming.seasons.map((season, index) => (
                        <div key={index} className="season-card">
                          <h4>{season.name}</h4>
                          <span className="season-months">{season.months}</span>
                          {season.highlights && season.highlights.length > 0 && (
                            <ul className="season-highlights">
                              {season.highlights.map((highlight, idx) => (
                                <li key={idx}>{highlight}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Signature Encounters (new) or Experience Highlights (legacy) */}
              {experience.signatureEncounters && experience.signatureEncounters.length > 0 ? (
                <div className="signature-encounters-section">
                  <SectionHeader
                    title="What Awaits You"
                    subtitle="The experiences that make this journey unforgettable"
                  />
                  <div className="encounters-grid">
                    {experience.signatureEncounters.map((encounter, index) => (
                      <div key={index} className="encounter-card">
                        <span className="encounter-category">
                          {categoryIcons[encounter.category] || categoryIcons.default}
                          {encounter.category}
                        </span>
                        <h4>{encounter.title}</h4>
                        <p>{encounter.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : experience.highlights && experience.highlights.length > 0 && (
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

              {/* Example Journey (restyled itinerary) */}
              {experience.itinerary && experience.itinerary.length > 0 && (() => {
                const displayItinerary = normalizeItinerary(experience.itinerary);
                
                if (displayItinerary.length === 0) return null;
                
                return (
                  <div className="itinerary-section">
                    <SectionHeader
                      title="Example Journey"
                      subtitle="One way your adventure could unfold"
                    />
                    <p className="itinerary-intro">
                      Every voyage is tailored to your preferences. This sample itinerary shows the kind of experience we can create for you.
                    </p>

                    <div className="itinerary-timeline">
                      {displayItinerary.map((item, index) => {
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

              {/* Bespoke Tailoring (restyled What's Included) */}
              {(experience.bespokeTailoring || experience.included || experience.includes) && (
                <div className="bespoke-section">
                  <SectionHeader
                    title="Tailored to You"
                    subtitle="Every journey is crafted around your preferences"
                  />
                  <p className="bespoke-intro">
                    We work with you to design the perfect trip. Here is what we typically arrange:
                  </p>
                  <ul className="bespoke-list">
                    {(experience.bespokeTailoring || experience.included || experience.includes).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Who This Is For (styled with icons) */}
              {(experience.whoFor || experience.bestFor) && (
                <div className="who-for-section">
                  <SectionHeader
                    title="Perfect For"
                    subtitle="This experience suits travellers who seek"
                  />
                  <div className="who-for-grid">
                    {getWhoForItems().map((item, index) => (
                      <div key={index} className="who-for-item">
                        <span className="who-for-icon">
                          {whoForIcons[item.type] || whoForIcons.default}
                        </span>
                        <span className="who-for-label">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ (destination-focused) */}
              {(experience.faqs || experience.faq) && (experience.faqs || experience.faq).length > 0 && (
                <div className="faq-section">
                  <SectionHeader
                    title="Common Questions"
                    subtitle="What travellers want to know about this destination"
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
                    <p>Discover other extraordinary cruise adventures from the UK</p>
                    <Button to="/bucket-list" variant="outline" size="sm">
                      View All Experiences
                    </Button>
                  </div>
                  <div className="internal-link-card">
                    <h4>Travel Guides</h4>
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
                <h3>Start Planning</h3>
                <p>
                  Ready to explore this destination? Your expert consultant will help design your perfect journey.
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
              We will help you find the perfect itinerary, dates, and exclusive deals.
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
