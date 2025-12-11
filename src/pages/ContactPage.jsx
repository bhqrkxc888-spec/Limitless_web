import { siteConfig } from '../config/siteConfig';
import './ContactPage.css';

function ContactPage() {
  return (
    <main className="contact-page" id="lc-contact" role="region" aria-label="Contact Limitless Cruises">
      {/* Header bar */}
      <div className="contact-header">
        <div className="container">
          <h1>Contact Limitless Cruises: Cruise Enquiries &amp; Booking Help</h1>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Intro */}
          <header className="contact-intro">
            <h2>Contact Limitless Cruises – get in touch for cruise enquiry &amp; booking help</h2>
            <p>
              Get cruise quotes, cabin advice and booking support from our friendly UK team. Call during opening hours or message us any
              time via WhatsApp, Facebook or email. We reply within 24 hours and can arrange a call back or short video call if you prefer.
            </p>
          </header>

          {/* Contact options (3 cells) */}
          <section aria-labelledby="contact-ways" className="contact-options">
            <h3 id="contact-ways">Call Limitless Cruises, WhatsApp Limitless Cruises or email Limitless Cruises</h3>

            <div className="contact-row-3">
              <a className="contact-card contact-card--action" href={`tel:${siteConfig.phone}`} title={`Call ${siteConfig.phone}`}>
                <span className="contact-card__title">Call Us</span>
                <span className="contact-card__meta">{siteConfig.phone}</span>
              </a>

              <a className="contact-card contact-card--action" href={`https://wa.me/${siteConfig.whatsapp.replace(/^0/, '44')}`} target="_blank" rel="noopener noreferrer" title={`WhatsApp ${siteConfig.whatsapp}`}>
                <span className="contact-card__title">WhatsApp</span>
                <span className="contact-card__meta">{siteConfig.whatsapp}</span>
              </a>

              <a className="contact-card contact-card--action" href={`mailto:${siteConfig.email}`} title="Email Limitless Cruises">
                <span className="contact-card__title">Email Us</span>
                <span className="contact-card__meta">{siteConfig.email}</span>
              </a>
            </div>
          </section>

          {/* Form */}
          <section aria-labelledby="contact-form" className="contact-form-section">
            <h3 id="contact-form">Cruise enquiry form and cruise consultant contact</h3>
            <div className="contact-card contact-card--panel">
              {/* TODO: Replace with actual contact form component */}
              <div className="contact-form-placeholder">
                <p>Contact form will be integrated here</p>
                <p className="contact-form-note">[Form placeholder - to be replaced with actual form component]</p>
              </div>
            </div>
          </section>

          {/* Hours */}
          <section aria-labelledby="contact-hours" className="contact-hours">
            <h3 id="contact-hours">Contact hours (UK time)</h3>
            <div className="contact-card contact-card--panel">
              <ul className="contact-hours__list" role="list">
                <li><strong>Monday &amp; Tuesday</strong> — by appointment or call back only</li>
                <li><strong>Wednesday to Friday</strong> — 10:00 AM to 8:00 PM</li>
                <li><strong>Saturday</strong> — 10:00 AM to 9:00 PM</li>
                <li><strong>Sunday</strong> — 10:00 AM to 6:00 PM</li>
              </ul>
              <p className="contact-note">Outside these hours, responses may be delayed. Call backs can be arranged if required.</p>
            </div>
          </section>

          {/* Social (one row, dark buttons with white text) */}
          <section aria-labelledby="contact-social" className="contact-social">
            <h2 id="contact-social">Follow Limitless Cruises on Facebook, LinkedIn and YouTube</h2>
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

          {/* Popular pages (existing pages only) */}
          <section aria-labelledby="contact-links" className="contact-links">
            <h2 id="contact-links">Popular pages and cruise links</h2>
            <nav aria-label="Popular internal links">
              <ul className="contact-list" role="list">
                <li><a href="/about">About Limitless Cruises</a></li>
                <li><a href="/find-a-cruise">Find a Cruise</a></li>
                <li><a href="/family-cruises">Family Cruises</a></li>
                <li><a href="/adults-only-cruises">Adults Only Cruises</a></li>
                <li><a href="/uk-sailings">UK Sailings</a></li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;

