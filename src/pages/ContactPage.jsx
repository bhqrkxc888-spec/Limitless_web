import { siteConfig } from '../config/siteConfig';
import ContactForm from '../components/ContactForm';
import { SectionHeader } from '../components/ui';
import './ContactPage.css';

function ContactPage() {
  return (
    <main className="contact-page" id="lc-contact" role="region" aria-label="Contact Limitless Cruises">
      {/* Header bar */}
      <div className="contact-header">
        <div className="container">
          <h1>Get in Touch with Limitless Cruises</h1>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Intro */}
          <header className="contact-intro">
            <p>
              Get cruise quotes, cabin advice and booking support from our friendly UK team. Call during opening hours or message us any
              time via WhatsApp, email, or the form below. We reply within 24 hours and can arrange a call back or short video call if you prefer.
            </p>
          </header>

          {/* Contact options (3 cards) */}
          <section className="contact-options">
            <div className="contact-row-3">
              <a className="contact-card contact-card--action" href={`tel:${siteConfig.phone}`} title={`Call ${siteConfig.phone}`}>
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <span className="contact-card__title">Call Us</span>
                <span className="contact-card__meta">{siteConfig.phone}</span>
              </a>

              <a className="contact-card contact-card--action" href={`https://wa.me/${siteConfig.whatsapp.replace(/\s/g, '').replace(/^0/, '44')}`} target="_blank" rel="noopener noreferrer" title={`WhatsApp ${siteConfig.whatsapp}`}>
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="contact-card__title">WhatsApp</span>
                <span className="contact-card__meta">{siteConfig.whatsapp}</span>
              </a>

              <a className="contact-card contact-card--action" href={`mailto:${siteConfig.email}`} title="Email Limitless Cruises">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span className="contact-card__title">Email Us</span>
                <span className="contact-card__meta">{siteConfig.email}</span>
              </a>
            </div>
          </section>

          {/* Form */}
          <section className="contact-form-section">
            <SectionHeader
              title="Send Us Your Enquiry"
              subtitle="We'll respond within 24 hours with personalised recommendations and pricing."
              align="center"
            />
            
            <ContactForm context="contact-page" />
          </section>

          {/* Hours */}
          <section className="contact-hours">
            <h2>Contact Hours (UK Time)</h2>
            <div className="contact-card contact-card--panel">
              <ul className="contact-hours__list" role="list">
                <li><strong>Monday & Tuesday</strong> — by appointment or call back only</li>
                <li><strong>Wednesday to Friday</strong> — 10:00 AM to 8:00 PM</li>
                <li><strong>Saturday</strong> — 10:00 AM to 9:00 PM</li>
                <li><strong>Sunday</strong> — 10:00 AM to 6:00 PM</li>
              </ul>
              <p className="contact-note">Outside these hours, responses may be delayed. Call backs can be arranged if required.</p>
            </div>
          </section>

          {/* Social (one row, dark buttons with white text) */}
          <section className="contact-social">
            <h2>Follow Limitless Cruises</h2>
            <div className="contact-social-row">
              <a className="contact-card contact-card--social" href="https://www.facebook.com/profile.php?id=61570469572535" target="_blank" rel="me noopener noreferrer">
                Facebook
              </a>
              <a className="contact-card contact-card--social" href="https://www.linkedin.com/company/limitless-cruises/" target="_blank" rel="me noopener noreferrer">
                LinkedIn
              </a>
              <a className="contact-card contact-card--social" href="https://www.youtube.com/@LimitlessCruises" target="_blank" rel="me noopener noreferrer">
                YouTube
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
