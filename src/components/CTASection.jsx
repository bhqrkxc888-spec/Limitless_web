import { siteConfig } from '../config/siteConfig';
import './CTASection.css';

function CTASection() {
  return (
    <section className="cta-section" role="region" aria-label="Speak with your Personal Cruise Consultant">
      {/* Blue Header Bar */}
      <div className="cta-header">
        <div className="container">
          <h2 className="cta-title">Speak with your Personal Cruise Consultant</h2>
        </div>
      </div>

      <div className="container">
        <div className="cta-content">
          <p className="cta-lead">
            Enjoy expert, one-to-one advice from your own Personal Cruise Consultant. We'll match you to the right ship, itinerary and cabin,
            taking care of every detail from your first quote to your final booking.
          </p>

          {/* Contact Buttons */}
          <nav className="cta-contact-grid" aria-label="Contact options">
            <a className="cta-btn" href="/contact" title="Contact Limitless Cruises">
              Get in Touch
            </a>
            <a className="cta-btn" href={`tel:${siteConfig.phone}`} title={`Call Limitless Cruises on ${siteConfig.phone}`}>
              Call {siteConfig.phone}
            </a>
            <a className="cta-btn" href={`https://wa.me/${siteConfig.whatsapp.replace(/^0/, '44')}`} title={`WhatsApp Limitless Cruises on ${siteConfig.whatsapp}`}>
              WhatsApp {siteConfig.whatsapp}
            </a>
            <a className="cta-btn" href="https://www.facebook.com/profile.php?id=61570469572535" target="_blank" rel="nofollow noopener" title="Find us on Facebook">
              Find us on Facebook
            </a>
          </nav>

          {/* Logos Row */}
          <div className="cta-logos" aria-label="Memberships and credentials">
            <img 
              src="/images/placeholders/limitless-ship.png" 
              alt={`${siteConfig.siteName} ship logo`}
              width="150" 
              height="100" 
              loading="lazy" 
              decoding="async"
            />
            <img 
              src="/images/placeholders/clia-member.png" 
              alt="CLIA Cruise Lines International Association member"
              width="150" 
              height="100" 
              loading="lazy" 
              decoding="async"
            />
            <img 
              src="/images/placeholders/cruise-send.png" 
              alt="Cruising with SEND accessibility support"
              width="150" 
              height="100" 
              loading="lazy" 
              decoding="async"
            />
            <img 
              src="/images/placeholders/clia-cert.png" 
              alt="CLIA Master 2024 accreditation"
              width="150" 
              height="100" 
              loading="lazy" 
              decoding="async"
            />
            <img 
              src="/images/placeholders/abta.png" 
              alt="ABTA – Book with Confidence"
              width="150" 
              height="100" 
              loading="lazy" 
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;

