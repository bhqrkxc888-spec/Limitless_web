import { siteConfig } from '../config/siteConfig';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { aboutImages } from '../utils/imageHelpers';
import './ContactPage.css';

function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <main className="contact-elegant">
      <SEO
        title="Contact Your Personal Cruise Consultant | UK Based | Limitless Cruises"
        description="Speak with your personal cruise consultant. Call, WhatsApp, email or enquire online. ABTA protected, UK based, expert guidance for your perfect cruise."
        canonical="https://www.limitlesscruises.com/contact"
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <div className="contact-hero-text">
              <h1>Let's Plan Your Perfect Cruise</h1>
              <p>
                Whether you have a question, need advice, or are ready to book, 
                I'm here to help. Reach out through any of the channels below.
              </p>
            </div>
            <div className="contact-hero-image">
              <img 
                src={aboutImages.katherine1} 
                alt="Your cruise consultant" 
                width="1920"
                height="1080"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="contact-methods">
        <div className="container">
          <div className="contact-cards-grid">
            <a href={`tel:${siteConfig.phone}`} className="contact-method-card">
              <div className="contact-method-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <h3>Phone</h3>
              <p className="contact-method-value">{siteConfig.phone}</p>
              <span className="contact-method-action">Click to call</span>
            </a>

            <a href={siteConfig.whatsappUrl || 'https://wa.me/447359796108'} target="_blank" rel="noopener noreferrer" className="contact-method-card">
              <div className="contact-method-icon contact-method-icon--whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3>Mobile / WhatsApp</h3>
              <p className="contact-method-value">{siteConfig.whatsapp}</p>
              <span className="contact-method-action">Message now</span>
            </a>

            <a href={`mailto:${siteConfig.email}`} className="contact-method-card">
              <div className="contact-method-icon contact-method-icon--email">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3>Email</h3>
              <p className="contact-method-value">{siteConfig.email}</p>
              <span className="contact-method-action">Send email</span>
            </a>

            <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="contact-method-card">
              <div className="contact-method-icon contact-method-icon--facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3>Facebook</h3>
              <p className="contact-method-value">Limitless Cruises</p>
              <span className="contact-method-action">Visit page</span>
            </a>

            <a href={siteConfig.personalFacebook} target="_blank" rel="noopener noreferrer" className="contact-method-card">
              <div className="contact-method-icon contact-method-icon--facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3>Message Katherine</h3>
              <p className="contact-method-value">Direct Message</p>
              <span className="contact-method-action">Message now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="contact-hours-section">
        <div className="container">
          <div className="contact-hours-card">
            <h2>Contact Hours</h2>
            <p className="hours-subtitle">UK Time</p>
            <div className="hours-grid">
              <div className="hours-item">
                <span className="hours-day">Monday & Tuesday</span>
                <span className="hours-time">By appointment</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Wednesday to Friday</span>
                <span className="hours-time">10:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Saturday</span>
                <span className="hours-time">10:00 AM - 9:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Sunday</span>
                <span className="hours-time">10:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-layout">
            <div className="contact-form-info">
              <h2>Send Your Enquiry</h2>
              <p>
                Tell me about your dream cruise and I'll respond within 24 hours 
                with personalised recommendations and competitive pricing.
              </p>
              <ul className="contact-promises">
                <li>No obligation quote</li>
                <li>Expert, personal advice</li>
                <li>Response within 24 hours</li>
                <li>Price match guarantee</li>
              </ul>
            </div>
            <div className="contact-form-wrapper">
              <ContactForm context="contact-page-elegant" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="contact-social-section">
        <div className="container">
          <h2>Follow Limitless Cruises</h2>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61570469572535" target="_blank" rel="noopener noreferrer" className="social-link">
              Facebook
            </a>
            <a href="https://www.linkedin.com/company/limitless-cruises/" target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
            <a href="https://www.youtube.com/@LimitlessCruises" target="_blank" rel="noopener noreferrer" className="social-link">
              YouTube
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
