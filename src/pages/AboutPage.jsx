import { aboutImages } from '../utils/imageHelpers';
import { Button } from '../components/ui';
import SEO from '../components/SEO';
import './AboutPage.css';

function AboutPage() {
  return (
    <main className="about-page-modern">
      <SEO
        title="About Us"
        description="Meet Katherine, your personal cruise consultant at Limitless Cruises. CLIA Cruise Master, ABTA protected, UK-based personal service for your perfect cruise holiday."
        canonical="https://limitlesscruises.com/about"
      />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <h1>Your Personal Cruise Consultant</h1>
              <p className="about-hero-lead">
                Making your cruise holiday simple, personal and perfectly tailored to you.
            </p>
              <div className="about-credentials-inline">
                <span className="credential-badge">CLIA Cruise Master</span>
                <span className="credential-badge">ABTA P7541</span>
                <span className="credential-badge">UK Based</span>
              </div>
            </div>
            <div className="about-hero-image">
              <img 
                src={aboutImages.katherine2}
                alt="Katherine, your personal cruise consultant" 
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What I Offer - Modern Grid */}
      <section className="about-services">
          <div className="container">
          <h2 className="section-title">What I Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Personal Support</h3>
              <p>I learn what you love so I can shortlist the right ships, cabins and itineraries that truly fit your travel style.</p>
            </div>
            <div className="service-card">
              <h3>No Fly & Fly Options</h3>
              <p>Prefer sailing from the UK or want worldwide destinations. I match flights to cruise dates for seamless travel.</p>
            </div>
            <div className="service-card">
              <h3>Multi Cruise & Stay</h3>
              <p>Back to back sailings or land and sea combinations. I coordinate everything so it feels easy.</p>
            </div>
            <div className="service-card">
              <h3>Complete Planning</h3>
              <p>Hotels, flights, transfers and timing - I handle every detail for a smooth, stress-free trip.</p>
            </div>
            <div className="service-card">
              <h3>Best Value</h3>
              <p>Drink packages, Wi-Fi, onboard credit. I find promotions and deals so you always get great value.</p>
            </div>
            <div className="service-card">
              <h3>ABTA Protected</h3>
              <p>Every booking is ABTA bonded with friendly help before, during and after your cruise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose - Side by Side */}
      <section className="about-why">
        <div className="container">
          <div className="why-layout">
            <div className="why-image">
              <img 
                src={aboutImages.katherine1}
                alt="Katherine on cruise deck" 
                loading="lazy"
              />
            </div>
            <div className="why-content">
              <h2>Why Choose Limitless Cruises</h2>
              <div className="why-list">
                <div className="why-item">
                  <div className="why-number">1</div>
                  <div>
                <h3>Tailored Advice</h3>
                    <p>Every itinerary is designed around you. Your cruise feels completely personal.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-number">2</div>
                  <div>
                <h3>Stress Free Planning</h3>
                    <p>I handle each detail so planning feels simple while you enjoy the excitement.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-number">3</div>
                  <div>
                    <h3>SEND & Family Friendly</h3>
                    <p>As a SEND mum I understand accessibility and recommend ships that keep things easy.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-number">4</div>
                  <div>
                    <h3>Always Available</h3>
                    <p>I'm here before you travel, while you're away and when you return home.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-number">5</div>
                  <div>
                    <h3>Price Match Guarantee</h3>
                    <p>I search widely for deals and can price match or beat direct prices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Katherine - Modern Layout */}
      <section className="about-katherine">
        <div className="container">
          <div className="katherine-layout">
            <div className="katherine-content">
              <h2>Meet Katherine</h2>
              <p>Hi, I'm Katherine, the face behind Limitless Cruises. I live in the UK with my two children and I love travel, especially cruising.</p>
              <p>I've been lucky to visit Australia, Singapore, Florida, New York and many beautiful parts of Europe. Planning holidays has always been my passion.</p>
              <p>I bring that energy to every booking I support and focus on trips that feel relaxed, well organised and full of moments to remember.</p>

              <div className="katherine-elite">
                <a 
                  href="https://www.holidayelite.com/our-travel-agents/katherine-horton" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="elite-link"
                >
                  <img 
                    src={aboutImages.holidayEliteLogo}
                    alt="Holiday Elite Travel Agent - Katherine's professional membership" 
                    width="200" 
                    loading="lazy" 
                  />
                  <span>View Holiday Elite Profile →</span>
                </a>
              </div>
            </div>
            <div className="katherine-image">
              <img 
                src={aboutImages.katherine3}
                alt="Katherine with family" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="about-testimonials">
        <div className="container">
          <h2 className="section-title">What My Clients Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-quote">
                  "Katherine made planning our family cruise so easy. Her recommendations were spot on and she was always available when we needed her."
                </p>
              </div>
              <div className="testimonial-author">
                <strong>Sarah & Family</strong>
                <span>Sheffield</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-quote">
                  "We couldn't have asked for better service. From booking to return, Katherine handled everything with professionalism and care."
                </p>
              </div>
              <div className="testimonial-author">
                <strong>Michael & Pat</strong>
                <span>Yorkshire</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-quote">
                  "As a first-time cruiser, I was nervous. Katherine took the time to explain everything and found the perfect cruise for us."
                </p>
              </div>
              <div className="testimonial-author">
                <strong>Emma</strong>
                <span>Nottingham</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Promise Section */}
      <section className="about-promise">
        <div className="container">
          <div className="promise-content">
            <h2>My Promise to You</h2>
            <p className="promise-intro">
              When you book with Limitless Cruises, you're not just another booking. You're someone I care about, and I'm committed to making sure your cruise holiday is everything you hoped it would be.
            </p>
            <div className="promise-list">
              <div className="promise-item">
                <div className="promise-icon">✓</div>
                <div>
                  <h3>Honest Advice</h3>
                  <p>I'll always tell you what I really think, even if it means recommending a different cruise or cruise line.</p>
                </div>
              </div>
              <div className="promise-item">
                <div className="promise-icon">✓</div>
                <div>
                  <h3>Best Value</h3>
                  <p>I search for the best deals and promotions to ensure you get excellent value for your money.</p>
                </div>
              </div>
              <div className="promise-item">
                <div className="promise-icon">✓</div>
                <div>
                  <h3>Personal Service</h3>
                  <p>From first enquiry to returning home, I'm here to help with any questions or concerns.</p>
                </div>
              </div>
              <div className="promise-item">
                <div className="promise-icon">✓</div>
                <div>
                  <h3>Peace of Mind</h3>
                  <p>Every booking is ABTA protected, so you can book with complete confidence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Plan Your Perfect Cruise?</h2>
            <p>Get in touch today for personalised advice and exclusive deals</p>
            <div className="cta-buttons">
              <Button to="/find-a-cruise" variant="primary" size="lg">
                Find a Cruise
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Contact Katherine
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
