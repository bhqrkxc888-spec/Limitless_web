import { getAllBucketList, getFeaturedBucketList, getRotatingFeatured } from '../data/bucketList';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import { Button, Card, SectionHeader } from '../components/ui';
import { useState, useEffect } from 'react';
import './BucketListPage.css';

function BucketListPage() {
  // Get dynamic rotating featured experiences (changes on each visit/refresh)
  const [featured, setFeatured] = useState(getRotatingFeatured(4));
  const allExperiences = getAllBucketList();
  const featuredStatic = getFeaturedBucketList();
  
  // Rotate featured on component mount (creates dynamic feel)
  useEffect(() => {
    // Small delay to ensure different rotation
    const timer = setTimeout(() => {
      setFeatured(getRotatingFeatured(4));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Bucket List Cruise Experiences',
    description: 'Once-in-a-lifetime cruise experiences and extraordinary voyages',
    itemListElement: allExperiences.map((exp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: exp.title,
        description: exp.description,
        url: `https://limitlesscruises.com/bucket-list/${exp.slug}`
      }
    }))
  };

  const renderExperienceCards = (experiences) => (
    <div className="grid grid-2-md grid-3-lg">
      {experiences.map((experience) => (
        <Card key={experience.id} to={`/bucket-list/${experience.slug}`} variant="default" className="bucket-list-card">
          <Card.Image 
            src={experience.cardImage || experience.heroImage} 
            alt={experience.title}
            aspectRatio="16/10"
          />
          <Card.Content>
            <div className="bucket-list-badge">Bucket List</div>
            <Card.Title as="h3">{experience.title}</Card.Title>
            <Card.Description>{experience.tagline}</Card.Description>
            <div className="bucket-list-meta">
              <span className="bucket-list-duration">{experience.duration}</span>
              {experience.startingFrom && (
                <span className="bucket-list-price">{experience.startingFrom}</span>
              )}
            </div>
            {experience.highlights && experience.highlights.length > 0 && (
              <ul className="bucket-list-highlights">
                {experience.highlights.slice(0, 3).map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            )}
          </Card.Content>
        </Card>
      ))}
    </div>
  );

  return (
    <main className="bucket-list-page">
      {/* SEO */}
      <SEO
        title="Bucket List Cruise Experiences | Once in a Lifetime Voyages"
        description="Discover extraordinary bucket list cruise experiences. World cruises, Antarctica expeditions, Japan & Asia, Rocky Mountaineer & Alaska, and more. Expert booking from Limitless Cruises."
        canonical="https://limitlesscruises.com/bucket-list"
        keywords="bucket list cruises, world cruise, antarctica cruise, once in a lifetime cruises, extraordinary cruise holidays"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <HeroSection
        title="Once in a Lifetime Experiences"
        subtitle="Extraordinary voyages that make a major impact. From world cruises to polar expeditions, these bucket list journeys create memories that last forever."
        size="lg"
        align="center"
        primaryCta={{ label: 'Enquire Now', to: '/contact' }}
        secondaryCta={{ label: `Call ${siteConfig.phone}`, href: `tel:${siteConfig.phone}` }}
      />

      {/* Featured Experiences - Dynamic */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Featured"
              title="Dream Experiences"
              subtitle="These extraordinary voyages represent the pinnacle of cruise travel. Each journey is carefully curated to deliver unforgettable moments."
            />
            {renderExperienceCards(featured)}
          </div>
        </section>
      )}

      {/* All Experiences */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            eyebrow="Explore All"
            title="All Bucket List Experiences"
            subtitle="Discover every extraordinary journey we offer. Each experience is designed to create lasting memories."
          />
          {renderExperienceCards(allExperiences)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Our expert cruise consultants are here to help you plan your bucket list adventure. 
            Get personalised advice and exclusive deals on these extraordinary voyages.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="btn-outline-white">
              Enquire Online
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BucketListPage;

