import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { Button } from '../components/ui';
import './TestimonialsPage.css';

/**
 * Testimonials Data
 * TODO: Replace placeholder testimonials with real customer reviews
 * Can be moved to Supabase CMS later for easier management
 */
const testimonials = [
  {
    id: 1,
    quote: "Katherine made our first cruise so easy. She listened to exactly what we wanted and found the perfect Mediterranean itinerary. We can't wait to book our next one!",
    author: "Sarah & Michael",
    location: "Sheffield",
    cruise: "Mediterranean on P&O Arvia",
    rating: 5,
    featured: true
  },
  {
    id: 2,
    quote: "As a solo traveller, I was nervous about cruising alone. Katherine recommended Norwegian's studio cabins and helped me feel completely at ease. The whole experience was wonderful.",
    author: "Janet T.",
    location: "Leeds",
    cruise: "Norwegian Fjords Solo",
    rating: 5,
    featured: true
  },
  {
    id: 3,
    quote: "Booking our family Disney cruise through Limitless was the best decision. Katherine handled everything - flights, transfers, the lot. The kids are still talking about it!",
    author: "The Williams Family",
    location: "Manchester",
    cruise: "Disney Caribbean",
    rating: 5,
    featured: true
  },
  {
    id: 4,
    quote: "We've booked three cruises now with Katherine. Her knowledge of the different cruise lines is incredible, and she always finds us deals we wouldn't have found ourselves.",
    author: "David & Anne",
    location: "Doncaster",
    cruise: "Multiple cruises",
    rating: 5,
    featured: false
  },
  {
    id: 5,
    quote: "Katherine's advice on accessible cabins and assistance was invaluable. She made sure everything was arranged before we sailed. Truly a personal service.",
    author: "Robert P.",
    location: "Barnsley",
    cruise: "P&O British Isles",
    rating: 5,
    featured: false
  },
  {
    id: 6,
    quote: "After comparing prices online, we found Katherine matched the best deal and added onboard credit. Plus the personal service means if anything goes wrong, we have someone to call.",
    author: "Christine & Paul",
    location: "Rotherham",
    cruise: "MSC Mediterranean",
    rating: 5,
    featured: false
  }
];

// Star rating component
const StarRating = ({ rating }) => (
  <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        fill={i < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className={`star ${i < rating ? 'filled' : ''}`}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

function TestimonialsPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Testimonials', path: '/testimonials' }
  ];

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const otherTestimonials = testimonials.filter(t => !t.featured);

  // Calculate stats
  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);
  const totalReviews = testimonials.length;

  return (
    <main className="testimonials-page">
      <SEO
        title="Customer Reviews & Testimonials | What Our Clients Say"
        description="Read what our customers say about booking their cruise holidays with Limitless Cruises. Real reviews from real travellers."
        canonical="https://limitlesscruises.com/testimonials"
      />

      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero */}
      <section className="testimonials-hero">
        <div className="container">
          <h1>What Our Customers Say</h1>
          <p className="testimonials-hero-subtitle">
            Don't just take our word for it - hear from real travellers who booked their dream cruises with Limitless Cruises.
          </p>
          
          {/* Stats */}
          <div className="testimonials-stats">
            <div className="stat">
              <span className="stat-value">{averageRating}</span>
              <span className="stat-label">Average Rating</span>
              <StarRating rating={Math.round(parseFloat(averageRating))} />
            </div>
            <div className="stat">
              <span className="stat-value">{totalReviews}+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-value">100%</span>
              <span className="stat-label">ABTA Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Reviews</h2>
          <div className="testimonials-featured-grid">
            {featuredTestimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card featured">
                <div className="testimonial-quote">
                  <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote>{testimonial.quote}</blockquote>
                </div>
                <div className="testimonial-footer">
                  <div className="testimonial-author">
                    <span className="author-name">{testimonial.author}</span>
                    <span className="author-location">{testimonial.location}</span>
                  </div>
                  <div className="testimonial-meta">
                    <StarRating rating={testimonial.rating} />
                    <span className="testimonial-cruise">{testimonial.cruise}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Reviews */}
      {otherTestimonials.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <h2 className="section-title">More Happy Customers</h2>
            <div className="testimonials-grid">
              {otherTestimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial-card">
                  <blockquote>{testimonial.quote}</blockquote>
                  <div className="testimonial-footer">
                    <div className="testimonial-author">
                      <span className="author-name">{testimonial.author}</span>
                      <span className="author-location">{testimonial.location}</span>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals */}
      <section className="section">
        <div className="container">
          <div className="trust-signals">
            <div className="trust-item">
              <div className="trust-icon">🛡️</div>
              <h3>ABTA Protected</h3>
              <p>Every booking is financially protected through ABTA member P7541.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🎓</div>
              <h3>CLIA Cruise Master</h3>
              <p>Katherine holds the highest cruise industry qualification.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">💬</div>
              <h3>Personal Service</h3>
              <p>Speak directly with Katherine - not a call centre.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">💰</div>
              <h3>Price Match*</h3>
              <p>We'll match genuine like-for-like quotes. <a href="/booking-terms">*T&Cs apply</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="section section-alt">
        <div className="container">
          <div className="leave-review-cta">
            <h2>Recently Cruised With Us?</h2>
            <p>
              We'd love to hear about your experience! Share your feedback and help other travellers 
              discover their perfect cruise holiday.
            </p>
            <Button to="/contact" variant="secondary" size="lg">
              Share Your Experience
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Ready to Create Your Own Story?</h2>
          <p>
            Join our happy customers and let Katherine plan your perfect cruise holiday.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="btn-outline-white">
              Get a Quote
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TestimonialsPage;

