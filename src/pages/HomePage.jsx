import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import BucketListFeatured from '../components/BucketListFeatured'
import FeaturedOffers from '../components/FeaturedOffers';
import { Button } from '../components/ui';
import { homeHeroImages } from '../utils/imageHelpers';
import './HomePage.css';

// SVG Icons as components for clean, professional look
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M20 21a8 8 0 0 0-16 0"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

// Additional trust bar icons
const PriceTagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.siteName,
    description: siteConfig.tagline,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email
  };

  // Single hero image (first image from array, with fallback)
  const heroImage = homeHeroImages[0] || 'https://via.placeholder.com/800x1000/2C344C/C9A962?text=LIMITLESS+CRUISES';

  return (
    <main className="home-elegant">
      <SEO
        title="Your Personal Cruise Consultant | Limitless Cruises"
        description="A refined new experience is coming. Limitless Cruises - your personal cruise consultant for expert advice, exclusive deals, and seamless holiday planning."
        canonical={siteConfig.siteUrl}
        structuredData={structuredData}
      />

      {/* Hero Section - Image Background with Overlay Text */}
      <section className="hero-elegant">
        <div className="hero-background-image">
          <img 
            src={heroImage}
            alt="Beautiful Caribbean beach with turquoise waters and a cruise ship on the horizon - Limitless Cruises destination"
            loading="eager"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x1000/2C344C/C9A962?text=LIMITLESS+CRUISES';
            }}
          />
          <div className="hero-image-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content-overlay">
            {/* Text Box - Overlays the image */}
            <div className="hero-text-box">
              <div className="hero-text">
                <p className="hero-eyebrow">A refined new experience is on the way</p>
                <h1>Your Personal Cruise Consultant</h1>
                <p className="hero-lead">
                  We're crafting something special. While our new website takes shape, 
                  we're still here to help you discover your perfect cruise holiday.
                </p>
                <div className="hero-cta-group">
                  <Button to="/find-a-cruise" variant="primary" size="lg">
                    Find a Cruise
                  </Button>
                  <Button to="/contact" variant="secondary" size="lg">
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <span className="trust-icon">
                <ShieldIcon />
              </span>
              <div className="trust-text">
                <strong>ABTA Protected</strong>
                <span>P7541</span>
              </div>
            </div>
            <span className="trust-divider" />
            <div className="trust-item">
              <span className="trust-icon">
                <AwardIcon />
              </span>
              <div className="trust-text">
                <strong>CLIA Cruise Master</strong>
                <span>Expert Certified</span>
              </div>
            </div>
            <span className="trust-divider" />
            <div className="trust-item">
              <span className="trust-icon">
                <MapPinIcon />
              </span>
              <div className="trust-text">
                <strong>UK Based</strong>
                <span>Personal Service</span>
              </div>
            </div>
            <span className="trust-divider" />
            <div className="trust-item">
              <span className="trust-icon">
                <PriceTagIcon />
              </span>
              <div className="trust-text">
                <strong>Price Match</strong>
                <span>Guaranteed</span>
              </div>
            </div>
            <span className="trust-divider" />
            <div className="trust-item">
              <span className="trust-icon">
                <HeartIcon />
              </span>
              <div className="trust-text">
                <strong>Family Friendly</strong>
                <span>SEND Aware</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* We're Still Here */}
      <section className="still-here">
        <div className="container">
          <div className="still-here-content">
            <h2>We're Still Here for You</h2>
            <p className="section-lead">
              While we work on our new website, Katherine is ready to help with your cruise enquiries. 
              Reach out through any of these channels.
            </p>
            
            <div className="contact-grid">
              <a href={`tel:${siteConfig.phone}`} className="contact-card-elegant">
                <span className="contact-icon contact-icon--phone">
                  <PhoneIcon />
                </span>
                <h3>Call Us</h3>
                <p>{siteConfig.phone}</p>
              </a>
              
                    <a 
                      href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-card-elegant"
                    >
                      <span className="contact-icon contact-icon--whatsapp">
                        <WhatsAppIcon />
                      </span>
                      <h3>Mobile / WhatsApp</h3>
                      <p>{siteConfig.whatsapp}</p>
                    </a>
              
              <a 
                href={siteConfig.facebook}
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card-elegant"
              >
                <span className="contact-icon contact-icon--facebook">
                  <FacebookIcon />
                </span>
                <h3>Facebook</h3>
                <p>Message Us</p>
              </a>
              
              <a href="#contact-form" className="contact-card-elegant">
                <span className="contact-icon contact-icon--email">
                  <MailIcon />
                </span>
                <h3>Email</h3>
                <p>Send Enquiry</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-offer">
        <div className="container">
          <h2>What We Offer</h2>
          <p className="section-lead">
            Expert cruise planning tailored to you
          </p>
          
          <div className="offer-cards">
            <div className="offer-card">
              <div className="offer-icon">
                <UserIcon />
              </div>
              <h3>Personal Service</h3>
              <p>One-to-one advice from Katherine, your dedicated cruise consultant who takes time to understand your preferences.</p>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">
                <StarIcon />
              </div>
              <h3>Best Value</h3>
              <p>Price match guarantee, exclusive deals, and insider knowledge to get you the most from your cruise budget.</p>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">
                <CheckCircleIcon />
              </div>
              <h3>Stress-Free Planning</h3>
              <p>From first enquiry to safe return - flights, hotels, transfers and every detail handled for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Offers - Latest Deals */}
      <FeaturedOffers />

      {/* Bucket List Featured - Dynamic Rotating Content */}
      <BucketListFeatured />

      {/* Contact Form Section */}
      <section className="contact-section" id="contact-form">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-text">
              <h2>Send Us Your Enquiry</h2>
              <p>
                Tell us about your dream cruise and we'll respond within 24 hours 
                with personalised recommendations and pricing.
              </p>
              <ul className="contact-promise">
                <li>No obligation quote</li>
                <li>Expert advice</li>
                <li>Response within 24 hours</li>
              </ul>
            </div>
            <div className="contact-form-container">
              <ContactForm context="homepage-elegant" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
