/**
 * BucketListFeatured Component
 * Dynamic rotating featured bucket list experiences for homepage
 * Content rotates on each page load/visit for freshness
 */

import { useState, useEffect } from 'react';
import { getRotatingFeatured, getRandomBucketList } from '../data/bucketList';
import { Card } from './ui';
import { Button } from './ui';
import './BucketListFeatured.css';

function BucketListFeatured() {
  // Rotate featured experiences on mount (dynamic content)
  const [featured, setFeatured] = useState(() => getRotatingFeatured(3));

  // Refresh rotation on component mount
  useEffect(() => {
    // Small random delay ensures different rotation each time
    const refreshTimer = setTimeout(() => {
      setFeatured(getRotatingFeatured(3));
    }, 50);
    return () => clearTimeout(refreshTimer);
  }, []);

  if (!featured || featured.length === 0) {
    return null;
  }

  return (
    <section className="bucket-list-featured">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Extraordinary Experiences</p>
          <h2>Once in a Lifetime Journeys</h2>
          <p className="section-subtitle">
            These bucket list cruises represent the pinnacle of travel. 
            From world cruises to polar expeditions, each journey creates memories that last forever.
          </p>
        </div>

        <div className="bucket-list-featured-grid">
          {featured.map((experience) => (
            <Card 
              key={experience.id} 
              to={`/bucket-list/${experience.slug}`} 
              variant="default"
              className="bucket-list-featured-card"
            >
              <Card.Image 
                src={experience.cardImage || experience.heroImage} 
                alt={experience.title}
                aspectRatio="16/10"
              />
              <Card.Content>
                <div className="bucket-list-badge">Bucket List</div>
                <Card.Title as="h3">{experience.title}</Card.Title>
                <Card.Description>{experience.tagline}</Card.Description>
                <div className="bucket-list-featured-meta">
                  <span className="duration">{experience.duration}</span>
                  {experience.startingFrom && (
                    <span className="price">{experience.startingFrom}</span>
                  )}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>

        <div className="bucket-list-featured-cta">
          <Button to="/bucket-list" variant="outline" size="lg">
            View All Bucket List Experiences
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BucketListFeatured;

