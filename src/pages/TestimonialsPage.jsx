import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
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
    quote: "Our first cruise was made so easy. They listened to exactly what we wanted and found the perfect Mediterranean itinerary. We can't wait to book our next one!",
    author: "Sarah & Michael",
    location: "Sheffield",
    cruise: "Mediterranean on P&O Arvia",
    rating: 5,
    featured: true
  },
  {
    id: 2,
    quote: "As a solo traveller, I was nervous about cruising alone. Norwegian's studio cabins were recommended and I was helped to feel completely at ease. The whole experience was wonderful.",
    author: "Janet T.",
    location: "Edinburgh",
    cruise: "Norwegian Fjords Solo",
    rating: 5,
    featured: true
  },
  {
    id: 3,
    quote: "Booking our family Disney cruise through Limitless was the best decision. Everything was handled - flights, transfers, the lot. The kids are still talking about it!",
    author: "The Williams Family",
    location: "Bristol",
    cruise: "Disney Caribbean",
    rating: 5,
    featured: true
  },
  {
    id: 4,
    quote: "We've booked three cruises now with Limitless. The knowledge of the different cruise lines is incredible, and we're always found deals we wouldn't have found ourselves.",
    author: "David & Anne",
    location: "Cardiff",
    cruise: "Multiple cruises",
    rating: 5,
    featured: false
  },
  {
    id: 5,
    quote: "The advice on accessible cabins and assistance was invaluable. Everything was arranged before we sailed. Truly a personal service.",
    author: "Robert P.",
    location: "Newcastle",
    cruise: "P&O British Isles",
    rating: 5,
    featured: false
  },
  {
    id: 6,
    quote: "After comparing prices online, we found Limitless matched the best deal and added onboard credit. Plus the personal service means if anything goes wrong, we have someone to call.",
    author: "Christine & Paul",
    location: "Southampton",
    cruise: "MSC Mediterranean",
    rating: 5,
    featured: false
  },
  {
    id: 7,
    quote: "Great service overall. The cruise recommendations were spot on, though the initial response took a day longer than expected. Still very happy with the final result.",
    author: "Jennifer M.",
    location: "Glasgow",
    cruise: "Royal Caribbean Mediterranean",
    rating: 4,
    featured: false
  },
  {
    id: 8,
    quote: "Excellent knowledge of different cruise lines. Helped us find the perfect adults-only ship for our anniversary. Would definitely recommend.",
    author: "Mark & Lisa",
    location: "Birmingham",
    cruise: "P&O Aurora Adults-Only",
    rating: 5,
    featured: false
  },
  {
    id: 9,
    quote: "Very professional service. The personal touch made all the difference when booking our first world cruise. Katherine's expertise was invaluable.",
    author: "Elizabeth R.",
    location: "Brighton",
    cruise: "Cunard World Cruise",
    rating: 5,
    featured: false
  },
  {
    id: 10,
    quote: "Good service and competitive prices. Communication was excellent throughout the booking process.",
    author: "Andrew S.",
    location: "Liverpool",
    cruise: "Norwegian Caribbean",
    rating: 4,
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
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const otherTestimonials = testimonials.filter(t => !t.featured);

  // Calculate stats
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '5.0'; // Default to 5.0 if no testimonials
  const totalReviews = testimonials.length;

  return (
    <main className="testimonials-page">
      <SEO
        title="Client Experiences | Real Reviews from Cruise Travellers"
        description="Read genuine experiences from clients who've booked their cruise holidays through Limitless Cruises. See why travellers trust our personal consultant service."
        canonical="https://www.limitlesscruises.com/testimonials"
      />

      {/* Hero */}
      <section className="testimonials-hero">
        <div className="container">
          <h1>Client Experiences</h1>
          <p className="testimonials-hero-subtitle">
            Hear from real travellers who've experienced the difference of personal consultant service for their dream cruise holidays.
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
              <p>Qualified with the highest cruise industry certification.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">💬</div>
              <h3>Personal Service</h3>
              <p>Speak directly with your consultant - not a call centre.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">💰</div>
              <h3>Price Match*</h3>
              <p>We'll match genuine like-for-like quotes. <a href="/price-match-guarantee">See terms</a></p>
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
              find their perfect cruise holiday.
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
            Join our happy customers and let us plan your perfect cruise holiday.
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

