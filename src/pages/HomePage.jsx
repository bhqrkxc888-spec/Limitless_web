import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import { Button } from '../components/ui';
import { aboutImages } from '../utils/imageHelpers';
import './HomePage.css';

function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.siteName,
    description: siteConfig.tagline,
    url: 'https://limitlesscruises.com',
    telephone: siteConfig.phone,
    email: siteConfig.email
  };

  return (
    <main className="home-elegant">
      <SEO
        title="Your Personal Cruise Consultant | Limitless Cruises"
        description="A refined new experience is coming. Limitless Cruises - your personal cruise consultant for expert advice, exclusive deals, and seamless holiday planning."
        canonical="https://limitlesscruises.com"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="hero-elegant">
        <div className="container">
          <div className="hero-content">
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
            <div className="hero-image">
              <img 
                src={aboutImages.katherine2}
                alt="Katherine, your personal cruise consultant" 
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div>
                <strong>ABTA Protected</strong>
                <span>P7541</span>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🎓</span>
              <div>
                <strong>CLIA Cruise Master</strong>
                <span>Expert Certified</span>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🇬🇧</span>
              <div>
                <strong>UK Based</strong>
                <span>Personal Service</span>
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
                <span className="contact-icon">📞</span>
                <h3>Call Us</h3>
                <p>{siteConfig.phone}</p>
              </a>
              
              <a 
                href="https://wa.me/447359796108" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card-elegant"
              >
                <span className="contact-icon">💬</span>
                <h3>WhatsApp</h3>
                <p>{siteConfig.whatsapp}</p>
              </a>
              
              <a 
                href={siteConfig.facebook}
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card-elegant"
              >
                <span className="contact-icon">👍</span>
                <h3>Facebook</h3>
                <p>Message Us</p>
              </a>
              
              <a href="#contact-form" className="contact-card-elegant">
                <span className="contact-icon">✉️</span>
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
              <div className="offer-icon">🎯</div>
              <h3>Personal Service</h3>
              <p>One-to-one advice from Katherine, your dedicated cruise consultant who takes time to understand your preferences.</p>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">💎</div>
              <h3>Best Value</h3>
              <p>Price match guarantee, exclusive deals, and insider knowledge to get you the most from your cruise budget.</p>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">✨</div>
              <h3>Stress-Free Planning</h3>
              <p>From first enquiry to safe return - flights, hotels, transfers and every detail handled for you.</p>
            </div>
          </div>
        </div>
      </section>

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
              <div className="contact-promise">
                <p>✓ No obligation quote</p>
                <p>✓ Expert advice</p>
                <p>✓ Response within 24 hours</p>
              </div>
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
