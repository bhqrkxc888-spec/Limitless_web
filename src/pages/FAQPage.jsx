import { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { Button, Accordion } from '../components/ui';
import { createSanitizedMarkup } from '../utils/sanitizeHtml';
import './FAQPage.css';

// FAQ Data organized by category
const faqData = {
  booking: {
    title: 'Booking & Payments',
    questions: [
      {
        question: 'How do I book a cruise with Limitless Cruises?',
        answer: 'Simply give us a call, send a WhatsApp message, or complete our contact form. We\'ll discuss your preferences, find the perfect cruise, and handle all the booking details for you. There are no booking fees - our service is completely free.'
      },
      {
        question: 'Is my booking financially protected?',
        answer: 'Absolutely. All bookings through Limitless Cruises are ABTA protected (member P7541) through The Midcounties Co-operative. This means your money is safe and you\'re covered if anything goes wrong. Flight-inclusive holidays may also be ATOL protected.'
      },
      {
        question: 'Do you charge any booking fees?',
        answer: 'No, we don\'t charge any booking fees. Our service is completely free to you. We\'re paid commission by the cruise lines, so you pay the same price as booking direct - often with added perks and personal service.'
      },
      {
        question: 'What deposit do I need to pay?',
        answer: 'Deposits vary by cruise line and itinerary, typically ranging from £150-£300 per person for standard cruises. World cruises and luxury lines may require higher deposits. We\'ll confirm the exact amount before you commit.'
      },
      {
        question: 'When is the final balance due?',
        answer: 'Final balance can be up to 16 weeks prior to departure. The final payment date will be confirmed on any quotation. We\'ll send you reminders so you never miss a deadline.'
      },
      {
        question: 'Do you offer a price match guarantee?',
        answer: 'Yes, subject to terms. If you find the identical cruise, on the same ship, same date, same cabin category, at a lower price from another ABTA agent, let us know and we\'ll match it. <a href="/booking-terms">See full terms</a>.'
      }
    ]
  },
  firstTime: {
    title: 'First-Time Cruisers',
    questions: [
      {
        question: 'I\'ve never cruised before. Where should I start?',
        answer: 'Start by telling us what kind of holiday you enjoy - relaxing beaches, cultural exploration, adventure activities? We\'ll recommend the right cruise line and itinerary for you. Many first-timers love no-fly cruises from Southampton as an easy introduction.'
      },
      {
        question: 'Will I get seasick?',
        answer: 'Modern cruise ships are very stable thanks to advanced stabilizers. Most people don\'t experience seasickness. If you\'re concerned, choose larger ships and itineraries with calmer waters (Mediterranean, Caribbean). Remedies like sea bands and medications are available onboard.'
      },
      {
        question: 'What\'s included in the cruise fare?',
        answer: 'Your fare typically includes: accommodation, all main restaurant meals, entertainment, use of pools and facilities, and port visits. Extras like drinks, specialty dining, excursions, spa treatments, and gratuities may be additional, though some lines include these.'
      },
      {
        question: 'What should I pack for a cruise?',
        answer: 'Pack layers for varied temperatures, comfortable walking shoes for ports, swimwear, and smart casual for evenings. Most ships have formal nights (2-3 per week) - gentlemen may want a suit or tuxedo, ladies a cocktail dress. Don\'t forget medications, sunscreen, and a power adapter.'
      },
      {
        question: 'Can I use my mobile phone on a cruise?',
        answer: 'Yes, but be careful with costs. Ships use the maritime network which is extremely expensive. It is best to look into WiFi on board if absolutely required - we can advise on the best options. When in port, your phone will be covered by roaming.'
      }
    ]
  },
  onboard: {
    title: 'Life Onboard',
    questions: [
      {
        question: 'What are the dining options?',
        answer: 'Ships offer multiple dining venues: main restaurants (included), buffets (included), specialty restaurants (extra charge), room service (often free), and casual options. You can choose set-time dining or flexible "freestyle" dining depending on the cruise line.'
      },
      {
        question: 'What entertainment is available?',
        answer: 'Expect West End-style shows, live music, comedy, cinema, quizzes, dance classes, art auctions, guest speakers, and enrichment programmes. Many ships have pools, gyms, spas, casinos, and unique features like go-karts, surf simulators, or ice rinks.'
      },
      {
        question: 'Is there a dress code?',
        answer: 'During the day, casual wear is fine. Evenings are typically smart casual (no shorts or vests in main restaurants). Formal nights vary by line - some require black tie, others are more relaxed. Adults-only and luxury lines tend to be more formal.'
      },
      {
        question: 'What about dietary requirements?',
        answer: 'Cruise lines cater well to dietary needs - vegetarian, vegan, gluten-free, kosher, halal, and allergies. Inform us when booking and again at the restaurant. Ships can usually accommodate most requirements with advance notice.'
      },
      {
        question: 'Can I drink tap water on the ship?',
        answer: 'Yes, ship tap water is safe to drink and meets strict quality standards. Bottled water is also available. Some cruise lines include drinks packages or unlimited soft drinks.'
      }
    ]
  },
  family: {
    title: 'Family Cruising',
    questions: [
      {
        question: 'Are cruises good for families with children?',
        answer: 'Many cruises are excellent for families! Lines like Disney, Royal Caribbean, MSC, and P&O have fantastic kids clubs, waterparks, and family-friendly activities. Kids clubs are usually free and run by qualified staff.'
      },
      {
        question: 'What ages do kids clubs cater for?',
        answer: 'Most ships have clubs for ages 2-17, split into age groups. Some ships (like P&O) offer night nurseries from 6 months. Teen spaces are usually separate from younger children. We can advise which ships are best for your children\'s ages.'
      },
      {
        question: 'Can grandparents come too?',
        answer: 'Absolutely! Multi-generational cruising is very popular. Ships cater to all ages simultaneously - kids in clubs, adults relaxing by the pool, grandparents enjoying afternoon tea. It\'s a wonderful way to spend quality time together.'
      },
      {
        question: 'Are there discounts for children?',
        answer: 'Yes, many cruise lines offer kids-sail-free promotions, especially outside school holidays. Children sharing a cabin with two adults often receive significant discounts. We\'ll always find the best family deals available.'
      }
    ]
  },
  cabins: {
    title: 'Cabins & Accommodation',
    questions: [
      {
        question: 'What\'s the difference between cabin types?',
        answer: 'Inside cabins have no windows (best value). Ocean view cabins have a window or porthole. Balcony cabins have private outdoor space (most popular). Suites offer extra space and perks. All have the same access to ship facilities.'
      },
      {
        question: 'Is a balcony cabin worth the extra cost?',
        answer: 'Many guests love balcony cabins for the private outdoor space, fresh air, and scenic views. They\'re especially valued on scenic routes (fjords, Alaska) or longer cruises. However, if you\'ll be out exploring most of the time, an inside or ocean view may suit you fine.'
      },
      {
        question: 'Can solo travellers book?',
        answer: 'Yes! Solo cruising is increasingly popular. Many ships now have dedicated solo cabins with no single supplement. Lines like Norwegian, P&O, and Fred. Olsen are particularly good for solo travellers, with social events and meet-ups.'
      }
    ]
  },
  ports: {
    title: 'Ports & Excursions',
    questions: [
      {
        question: 'Do I have to book ship excursions?',
        answer: 'No, you can explore independently if you prefer. Ship excursions guarantee you won\'t be left behind and often include skip-the-line access. Independent exploration can be cheaper and more flexible. We can advise on each port.'
      },
      {
        question: 'What happens if my flight is delayed?',
        answer: 'If you\'ve booked flights through the cruise line, they\'ll wait or arrange to get you to the next port. For independent flights, travel insurance is essential. We recommend arriving the day before embarkation for peace of mind.'
      },
      {
        question: 'What is a tender port?',
        answer: 'When ships can\'t dock directly, small boats (tenders) ferry passengers to shore. This adds time but allows visits to more scenic locations. Tenders can be challenging for those with mobility issues - let us know if this is a concern.'
      }
    ]
  },
  ukSailings: {
    title: 'UK No-Fly Cruises',
    questions: [
      {
        question: 'Which UK ports can I sail from?',
        answer: 'Southampton is the main UK cruise port with the most options. You can also sail from Liverpool, Newcastle, Tilbury (London), Dover, and occasionally Scottish ports. P&O, Cunard, Fred. Olsen, and MSC all offer UK departures.'
      },
      {
        question: 'What are the benefits of no-fly cruising?',
        answer: 'No airport stress, generous luggage allowances, easy driving access, pounds sterling onboard (usually), and your holiday starts the moment you board. Perfect for those who prefer not to fly or want a more relaxed start.'
      },
      {
        question: 'Where can I cruise to from the UK without flying?',
        answer: 'Popular destinations include Norwegian Fjords, Mediterranean, Canary Islands, Baltic capitals, British Isles, Iceland, and transatlantic crossings to the USA. World cruises also depart from Southampton.'
      }
    ]
  }
};

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('booking');
  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'FAQ', path: '/faq' }
  ];

  // Filter questions based on search
  const getFilteredQuestions = () => {
    if (!searchTerm) return null;
    
    const results = [];
    Object.entries(faqData).forEach(([, category]) => {
      category.questions.forEach(q => {
        if (
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({ ...q, category: category.title });
        }
      });
    });
    return results;
  };

  const filteredQuestions = getFilteredQuestions();

  // Structured data for FAQ schema
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Object.values(faqData).flatMap(category =>
      category.questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer.replace(/<[^>]*>/g, '') // Strip HTML for schema
        }
      }))
    )
  };

  return (
    <main className="faq-page">
      <SEO
        title="Frequently Asked Questions | UK Cruise Consultant | Limitless Cruises"
        description="Find answers to common cruise questions. Booking, first-time cruising, what's included, cabins, family cruising, UK departures. Expert guidance from your personal consultant."
        canonical="https://www.limitlesscruises.com/faq"
        structuredData={structuredData}
      />

      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero */}
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p className="faq-hero-subtitle">
            Everything you need to know about cruise holidays. Can't find your answer? 
            <Link to="/contact"> Just ask us</Link>.
          </p>
          
          {/* Search */}
          <div className="faq-search">
            <input
              type="text"
              id="faq-search"
              name="faq-search"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="faq-search-input"
              aria-label="Search frequently asked questions"
            />
            {searchTerm && (
              <button 
                className="faq-search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search Results */}
      {filteredQuestions && (
        <section className="section">
          <div className="container">
            <h2 className="search-results-title">
              {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchTerm}"
            </h2>
            {filteredQuestions.length > 0 ? (
              <div className="faq-list">
                {filteredQuestions.map((q, index) => (
                  <Accordion key={index} title={q.question}>
                    <p className="faq-category-badge">{q.category}</p>
                    <div dangerouslySetInnerHTML={createSanitizedMarkup(q.answer)} />
                  </Accordion>
                ))}
              </div>
            ) : (
              <p className="no-results">
                No questions match your search. Try different keywords or <Link to="/contact">contact us directly</Link>.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Category Navigation & Questions */}
      {!filteredQuestions && (
        <section className="section">
          <div className="container">
            <div className="faq-layout">
              {/* Category Sidebar */}
              <nav className="faq-categories" aria-label="FAQ categories">
                {Object.entries(faqData).map(([categoryKey, category]) => (
                  <button
                    key={categoryKey}
                    className={`faq-category-btn ${activeCategory === categoryKey ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(categoryKey)}
                  >
                    <span className="category-name">{category.title}</span>
                    <span className="category-count">{category.questions.length}</span>
                  </button>
                ))}
              </nav>

              {/* Questions */}
              <div className="faq-questions">
                <h2>{faqData[activeCategory].title}</h2>
                <div className="faq-list">
                  {faqData[activeCategory].questions.map((q, index) => (
                    <Accordion key={index} title={q.question}>
                      <div dangerouslySetInnerHTML={createSanitizedMarkup(q.answer)} />
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Still Have Questions CTA */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2>Still Have Questions?</h2>
          <p>
            We're here to help with any cruise questions - no question is too simple or too detailed.
          </p>
          <div className="cta-buttons">
            <Button href={`tel:${siteConfig.phone}`} variant="primary" size="lg">
              Call {siteConfig.phone}
            </Button>
            <Button href={siteConfig.whatsappUrl} variant="outline" size="lg" className="btn-outline-white">
              WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQPage;

