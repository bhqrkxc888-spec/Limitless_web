/**
 * Blog Blocks Demo Page
 * Non-obvious URL for testing block layouts
 * Shows all available block types with realistic content
 */

import BlogBlockRenderer from '../components/BlogBlockRenderer'
import SEO from '../components/SEO'

function BlogDemoBlockLayout() {
  const demoBlocks = {
    blocks: [
      {
        id: '1',
        type: 'text_section',
        title: 'Planning Your Mediterranean Cruise: A Complete Guide',
        titleLevel: 'h2',
        content: `<p>The Mediterranean offers some of the world's most spectacular cruise itineraries, combining ancient history, stunning coastlines, and vibrant cultures. From the sun-drenched Greek islands to the historic ports of Italy and Spain, a Mediterranean cruise delivers an unforgettable holiday experience.</p>
        <p>Most Mediterranean cruises operate between April and October, with peak season during the summer months. You'll find itineraries ranging from 7-night sampler cruises to extended 14-night voyages covering multiple countries. The region is served by all major cruise lines, making it accessible for every budget and preference.</p>
        <p>Whether you're a first-time cruiser or a seasoned traveller, the Mediterranean's warm waters, reliable weather, and diverse ports make it an ideal cruise destination.</p>`
      },
      
      {
        id: '2',
        type: 'image_left_text',
        imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop',
        imageAlt: 'Barcelona cruise terminal with ships docked',
        content: `<p><strong>Barcelona</strong> is one of the most popular embarkation ports for Mediterranean cruises. The cruise terminal is located at Port Vell, about 10 minutes from the famous Las Ramblas and Gothic Quarter.</p>
        <p>Most cruise lines use the World Trade Center Barcelona as their terminal. The port is well-connected to the city centre by taxi (€15-20), metro, and bus. Barcelona-El Prat Airport is approximately 20 minutes away by taxi or Aerobus.</p>
        <p>We strongly recommend arriving a day early to explore Gaudí's Sagrada Familia, stroll through Park Güell, and sample authentic tapas in the El Born district. The city offers an incredible mix of Gothic architecture, modernist masterpieces, and Mediterranean beaches.</p>`
      },
      
      {
        id: '3',
        type: 'quote_callout',
        variant: 'tip',
        quote: "Book shore excursions in advance during peak season (July-August). Popular sites like Pompeii, Santorini's cable car, and Florence's Uffizi Gallery sell out quickly.",
        author: 'Travel Tip'
      },
      
      {
        id: '4',
        type: 'comparison_table',
        title: 'Western vs Eastern Mediterranean Routes',
        columns: ['Route Type', 'Best For', 'Peak Season', 'Typical Duration', 'Average Temperature'],
        rows: [
          ['Western Med', 'First-timers, families', 'May-September', '7-10 nights', '24-28°C'],
          ['Eastern Med', 'History enthusiasts, Greece lovers', 'May-October', '10-14 nights', '26-30°C'],
          ['Full Mediterranean', 'Extended holidays, cruise veterans', 'April-October', '14-21 nights', '22-28°C']
        ]
      },
      
      {
        id: '5',
        type: 'text_section',
        title: 'Top Mediterranean Ports You Must Visit',
        titleLevel: 'h2',
        content: `<p>The Mediterranean is home to dozens of remarkable cruise ports, each offering unique experiences:</p>
        <ul>
          <li><strong>Rome (Civitavecchia):</strong> Gateway to the Eternal City, Colosseum, Vatican, and Sistine Chapel</li>
          <li><strong>Santorini, Greece:</strong> Iconic whitewashed buildings, stunning caldera views, and spectacular sunsets</li>
          <li><strong>Dubrovnik, Croatia:</strong> Medieval walled city, Game of Thrones filming location, crystal-clear Adriatic waters</li>
          <li><strong>Venice, Italy:</strong> Romantic canals, St. Mark's Square, and unparalleled Renaissance art</li>
          <li><strong>Istanbul, Turkey:</strong> Where East meets West - Blue Mosque, Hagia Sophia, and Grand Bazaar</li>
        </ul>`
      },
      
      {
        id: '6',
        type: 'image_right_text',
        imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
        imageAlt: 'Santorini white buildings overlooking the Aegean Sea',
        content: `<p>Santorini is the jewel of the Greek islands and arguably the most photographed port in the Mediterranean. Ships anchor offshore in the volcanic caldera and tender passengers to the old port below Fira town.</p>
        <p>From the old port, you have three options to reach Fira: take the cable car (€6 each way, recommended), ride a donkey (not recommended due to animal welfare concerns), or walk up 588 steps. The cable car operates continuously and offers spectacular views.</p>
        <p>The island is small but extremely crowded during peak season. We recommend booking a private tour in advance or taking the local bus to Oia village for the famous sunset. Allow 4-6 hours for a comprehensive visit. Don't miss the black sand beaches at Kamari and Perissa.</p>`
      },
      
      {
        id: '7',
        type: 'links_section',
        title: 'Useful Resources & Planning Tools',
        links: [
          {
            url: 'https://www.portofbarcelona.cat',
            title: 'Port of Barcelona Official Website',
            description: 'Terminal maps, transport information, cruise schedules, and real-time arrival data'
          },
          {
            url: 'https://www.royalcaribbean.com/shore-excursions',
            title: 'Royal Caribbean Shore Excursions',
            description: 'Browse and book official shore excursions for Mediterranean ports with guaranteed return to ship'
          },
          {
            url: 'https://www.trenitalia.com',
            title: 'Trenitalia - Italian Rail',
            description: 'Book trains from Italian cruise ports to Rome, Florence, and Venice. High-speed trains available.'
          },
          {
            url: 'https://www.rome2rio.com',
            title: 'Rome2Rio Transport Planner',
            description: 'Find the best transport options from cruise ports to city centres and attractions'
          }
        ]
      },
      
      {
        id: '8',
        type: 'amazon_products',
        title: 'Essential Mediterranean Cruise Packing',
        displayStyle: 'cards',
        showDisclosure: true,
        products: [
          {
            url: 'https://www.amazon.co.uk/dp/B07ZVKM319',
            name: 'Packing Cubes Set (6 Piece)',
            description: 'Keep your cruise cabin organised with compression packing cubes. Essential for Mediterranean cruises.',
            imageUrl: 'https://images.unsplash.com/photo-1565097559716-9b99cd5da4f9?w=400&h=300&fit=crop'
          },
          {
            url: 'https://www.amazon.co.uk/dp/B087LXZY78',
            name: 'Universal Travel Adapter with USB',
            description: 'Works in all Mediterranean ports. Includes USB charging for phones and tablets.',
            imageUrl: 'https://images.unsplash.com/photo-1591290619762-c8f98097e0bc?w=400&h=300&fit=crop'
          },
          {
            url: 'https://www.amazon.co.uk/dp/B08JCM7K3R',
            name: 'Waterproof Phone Pouch',
            description: 'Protect your phone at beaches and during water activities. Fits all smartphone sizes.',
            imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop'
          },
          {
            url: 'https://www.amazon.co.uk/dp/B089N1MXZL',
            name: 'Magnetic Cruise Cabin Hooks (8 Pack)',
            description: 'Cabin walls are metal - these hooks are lifesavers for extra storage and organisation.',
            imageUrl: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=400&h=300&fit=crop'
          }
        ]
      },
      
      {
        id: '9',
        type: 'text_section',
        title: 'What to Expect Onboard',
        titleLevel: 'h2',
        content: `<p>Modern cruise ships are floating resorts offering world-class amenities and entertainment. Here's what you can expect during your Mediterranean cruise:</p>
        <h3>Dining Options</h3>
        <p>Most ships offer multiple dining venues including a main dining room, buffet, specialty restaurants, and casual cafés. Breakfast and lunch are typically open seating, while dinner in the main dining room follows assigned seating times (early or late).</p>
        <h3>Entertainment</h3>
        <p>Evening entertainment includes Broadway-style shows, live music, comedy acts, and themed parties. Most ships also feature cinemas, casinos, nightclubs, and quiet lounges.</p>
        <h3>Onboard Activities</h3>
        <p>Daytime activities vary by ship size but may include swimming pools, water slides, fitness centres, spas, sports courts, rock climbing walls, and educational talks about upcoming ports.</p>`
      },
      
      {
        id: '10',
        type: 'full_width_image',
        imageUrl: 'https://images.unsplash.com/photo-1585859715235-4f0e83ff8173?w=1200&h=600&fit=crop',
        imageAlt: 'Cruise ship deck at sunset in the Mediterranean',
        caption: 'Sunset from the upper deck - one of the best parts of any Mediterranean cruise'
      },
      
      {
        id: '11',
        type: 'faq_accordion',
        items: [
          {
            question: 'Do I need a visa for Mediterranean cruise ports?',
            answer: '<p>British passport holders do not need visas for most Mediterranean countries including Spain, Italy, Greece, France, and Croatia. Turkey requires a visa which can be obtained online before travel (e-Visa). Always verify current requirements before booking as regulations can change.</p>'
          },
          {
            question: 'What currency should I bring?',
            answer: '<p>The Euro (€) is used in most Western Mediterranean countries. We recommend carrying €100-200 in small denominations for tips, small purchases, and public transport. Credit cards are widely accepted, but some markets and small cafés prefer cash. Turkey uses the Turkish Lira (TRY).</p>'
          },
          {
            question: 'How formal are evening dinners?',
            answer: '<p>Most Mediterranean cruises have 1-2 formal nights per week where suits and cocktail dresses are appropriate. The remaining evenings are "smart casual" (no shorts, flip-flops, or tank tops in the dining room). Some newer ships have eliminated formal nights entirely in favour of a more relaxed atmosphere.</p>'
          },
          {
            question: 'Can I drink the tap water in Mediterranean ports?',
            answer: '<p>Tap water is generally safe in Western European ports (Spain, Italy, France, Greece) but may taste different due to heavy chlorination. We recommend bottled water for peace of mind. In Turkey and North African ports, always drink bottled water.</p>'
          },
          {
            question: 'What happens if I miss the ship at a port?',
            answer: '<p>If you miss the ship departure (known as being "left behind"), you are responsible for catching up with the ship at the next port at your own expense. This is why we always recommend booking shore excursions through the cruise line - they guarantee your return and will wait for their tours if delayed. Always be back 1 hour before departure time.</p>'
          },
          {
            question: 'Is travel insurance necessary?',
            answer: '<p>Yes, comprehensive travel insurance is essential. It should cover medical emergencies (including evacuation), trip cancellation, lost luggage, and missed port departures. Basic cruise line insurance often lacks adequate medical coverage. European Health Insurance Cards (EHIC) provide limited coverage in EU countries but should not be your only protection.</p>'
          }
        ]
      },
      
      {
        id: '12',
        type: 'text_section',
        title: 'Ready to Book Your Mediterranean Cruise?',
        titleLevel: 'h2',
        content: `<p>A Mediterranean cruise offers incredible value, combining multiple destinations into one hassle-free holiday. You'll visit historic cities, relax on beautiful beaches, enjoy world-class cuisine, and make memories that last a lifetime - all while unpacking just once.</p>
        <p>Whether you choose a classic Western Mediterranean itinerary or venture into the Eastern Med's ancient wonders, you're guaranteed an unforgettable experience. The hardest part is deciding which ports to visit first!</p>`
      }
    ]
  }

  return (
    <main className="blog-demo-page">
      <SEO 
        title="Blog Layout Demo - Internal Testing" 
        noindex={true}
      />
      
      <section style={{ 
        background: 'linear-gradient(135deg, #2C344C 0%, #3d4766 100%)', 
        color: 'white',
        padding: '4rem 1.5rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ 
            fontFamily: 'var(--font-family-display)', 
            fontSize: '2.5rem', 
            margin: '0 0 1rem 0',
            fontWeight: '600'
          }}>
            Blog Blocks Demo
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            opacity: '0.9',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Testing flexible blog layout system with all available block types
          </p>
          <p style={{ 
            fontSize: '0.875rem', 
            opacity: '0.7',
            marginTop: '1rem'
          }}>
            Internal preview only - Not indexed by search engines
          </p>
        </div>
      </section>

      <section style={{ 
        padding: '3rem 1.5rem',
        background: 'var(--clr-bg)'
      }}>
        <div className="container">
          <BlogBlockRenderer blocks={demoBlocks.blocks} />
        </div>
      </section>

      <section style={{
        background: 'var(--clr-bg-alt)',
        padding: '2rem 1.5rem',
        borderTop: '1px solid var(--clr-border)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-family-display)',
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }}>
            Available Block Types
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Text Section</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Headings + paragraphs
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Image + Text (Left)</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Image on left side
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Image + Text (Right)</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Image on right side
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Full Width Image</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Hero image with caption
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Links Section</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                External resource links
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Amazon Products</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Affiliate product cards
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Comparison Table</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Side-by-side comparisons
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>Quote/Callout</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Highlighted tips/warnings
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <strong>FAQ Accordion</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: '0.5rem 0 0 0' }}>
                Expandable Q&A section
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BlogDemoBlockLayout
