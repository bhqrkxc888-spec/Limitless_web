import CTASection from '../components/CTASection';
import './AboutPage.css';

function AboutPage() {
  return (
    <main className="about-page">
      {/* Block 1: Intro + What I Offer */}
      <section className="about-intro" role="region" aria-label="About Limitless Cruises introduction">
        <div className="about-header">
          <div className="container">
            <h1>Personal Cruise Consultant | About Limitless Cruises</h1>
          </div>
        </div>

        <div className="container">
          <div className="about-content">
            <p className="about-lead">
              As your dedicated cruise consultant at Limitless Cruises, my role is to make planning your journey simple, personal and completely tailored to your needs. Whether you want a no fly sailing from the UK or a fly cruise to discover new destinations, I will help you choose the right itinerary, cruise line and added extras so your holiday feels effortless and perfectly suited to you.
            </p>

            {/* Credentials */}
            <div className="about-credentials">
              <div className="about-badge">CLIA Cruise Master</div>
              <div className="about-badge">ABTA P7541</div>
              <div className="about-badge">UK based support</div>
            </div>

            <h2 className="about-subtitle">What I Offer as your Personal Cruise Consultant</h2>

            {/* Offer Cards */}
            <ul className="about-cards" role="list">
              <li className="about-card">
                <h3>Personal Support</h3>
                <p>I will learn what you love so I can shortlist the right ships, cabins and itineraries. You only choose from options that truly fit your travel style.</p>
              </li>
              <li className="about-card">
                <h3>No Fly &amp; Fly Cruise Options</h3>
                <p>Prefer sailing from the UK. I plan sailings direct from ports like Southampton. Want the world. I match the right flights to your cruise dates so the trip feels seamless.</p>
              </li>
              <li className="about-card">
                <h3>Multi Cruise &amp; Stay</h3>
                <p>Back to back sailings or land and sea combinations let you see more in one holiday. I coordinate everything so it feels easy.</p>
              </li>
              <li className="about-card">
                <h3>Hotels, Flights &amp; Transfers</h3>
                <p>I handle every detail around your cruise, from pre and post hotel stays to private transfers and well timed flights for a smooth trip.</p>
              </li>
              <li className="about-card">
                <h3>Value Adds &amp; Onboard Extras</h3>
                <p>From drink packages to Wi Fi and onboard credit, I keep an eye on promotions and deals so you always get great value.</p>
              </li>
              <li className="about-card">
                <h3>ABTA Protection</h3>
                <p>Every booking is ABTA bonded with clear paperwork and friendly help before, during and after your cruise.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Block 2: 5 Reasons */}
      <section className="about-reasons" role="region" aria-label="5 Reasons to Choose Limitless Cruises with a personal cruise consultant">
        <div className="about-header">
          <div className="container">
            <h2>5 Reasons to Choose Limitless Cruises with a Personal Cruise Consultant</h2>
          </div>
        </div>

        <div className="container">
          <div className="about-content">
            <ul className="reasons-list" role="list">
              <li>
                <h3>Tailored Advice</h3>
                <p>Every itinerary is designed around you. I take time to understand your preferences so your cruise feels completely personal.</p>
              </li>
              <li>
                <h3>Stress Free Planning</h3>
                <p>From our first chat to the moment you step onboard I handle each detail so planning feels simple while you enjoy the excitement.</p>
              </li>
              <li>
                <h3>SEND Friendly &amp; Family Understanding</h3>
                <p>As a SEND mum I understand accessibility, flexibility and the right environment for each traveller. I recommend ships, cabins and excursions that keep things easy for families.</p>
              </li>
              <li>
                <h3>Always Available for Support</h3>
                <p>You will never feel alone in the booking process. I am here before you travel, while you are away and when you return home.</p>
              </li>
              <li>
                <h3>Great Value &amp; Price Match</h3>
                <p>I search widely for deals and promotions and I can price match or beat direct prices in most cases.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Block 3: About Me */}
      <section className="about-me" role="region" aria-label="About Katherine at Limitless Cruises">
        <div className="about-header">
          <div className="container">
            <h2>About me</h2>
          </div>
        </div>

        <div className="container">
          <div className="about-content">
            {/* Image trio */}
            <div className="about-gallery" aria-label="Photos of personal cruise consultant on travels">
              <figure>
                <img 
                  src="/images/placeholders/about-1.jpg" 
                  alt="Personal cruise consultant Katherine at the Arvia deck chair" 
                  loading="lazy" 
                  decoding="async"
                />
              </figure>
              <figure>
                <img 
                  src="/images/placeholders/about-2.jpg" 
                  alt="Walking a sunny seaside promenade" 
                  loading="lazy" 
                  decoding="async"
                />
              </figure>
              <figure>
                <img 
                  src="/images/placeholders/about-3.jpg" 
                  alt="Family sightseeing in a European city" 
                  loading="lazy" 
                  decoding="async"
                />
              </figure>
            </div>

            {/* Bio text */}
            <div className="about-text">
              <p>Hi, I am Katherine, the face behind Limitless Cruises. I live in the UK with my two children and I love travel, especially cruising. I have been lucky to visit Australia, Singapore, Florida, New York and many beautiful parts of Europe.</p>
              <p>Planning holidays has always been my passion. I bring that energy to every booking I support and focus on trips that feel relaxed, well organised and full of moments to remember.</p>

              {/* Holiday Elite badge below text */}
              <div className="about-elite-wrap">
                <a className="about-elite" href="https://www.holidayelite.com/our-travel-agents/katherine-horton" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="/images/placeholders/holiday-elite-badge.png"
                    alt="Holiday Elite badge for Katherine Horton" 
                    width="375" 
                    height="70" 
                    loading="lazy" 
                    decoding="async"
                  />
                  <span>View my Holiday Elite profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Cruise Lines We Work With */}
      <section className="about-cruise-lines" role="region" aria-label="Cruise lines we work with at Limitless Cruises">
        <div className="about-header">
          <div className="container">
            <h2>Cruise Lines We Work With</h2>
          </div>
        </div>

        <div className="container">
          <div className="about-content">
            <h3 className="about-subtitle">Explore Cruise Lines and Partners</h3>

            <p className="about-intro-text">
              We partner with a hand-picked range of cruise brands, from family-friendly favourites to small-ship specialists,
              so you can compare ships, itineraries and value in one place.
            </p>

            <ul className="cruise-lines-grid" role="list">
              <li><a href="/disney-cruise-line/" aria-label="Disney Cruise Line cruises with Limitless Cruises">Disney Cruise Line</a></li>
              <li><a href="/fred-olsen-cruises/" aria-label="Fred Olsen cruises and itineraries">Fred. Olsen Cruise Lines</a></li>
              <li><a href="/holland-america-line/" aria-label="Holland America Line cruises">Holland America Line</a></li>
              <li><a href="/marella-cruises/" aria-label="Marella Cruises holidays">Marella Cruises</a></li>
              <li><a href="/msc-cruises/" aria-label="MSC Cruises family and Med sailings">MSC Cruises</a></li>
              <li><a href="/norwegian-cruise-line/" aria-label="Norwegian Cruise Line cruises">Norwegian Cruise Line</a></li>
              <li><a href="/p-and-o-cruises/" aria-label="P and O Cruises ex-UK and fly-cruise">P&amp;O Cruises</a></li>
              <li><a href="/princess-cruises/" aria-label="Princess Cruises MedallionClass cruises">Princess Cruises</a></li>
              <li><a href="/royal-caribbean/" aria-label="Royal Caribbean cruises with activities and shows">Royal Caribbean</a></li>
              <li><a href="/celebrity-cruises/" aria-label="Celebrity Cruises premium holidays">Celebrity Cruises</a></li>
              <li><a href="/virgin-voyages-cruises/" aria-label="Virgin Voyages adult only cruises">Virgin Voyages</a></li>
              <li><a href="/azamara-cruises/" aria-label="Azamara destination immersive cruises">Azamara</a></li>
              <li><a href="/ae-expeditions/" aria-label="AE Expeditions polar and adventure cruises">AE Expeditions</a></li>
              <li><a href="/viking-cruises/" aria-label="Viking Cruises ocean and river">Viking</a></li>
              <li><a href="/seabourn-cruises/" aria-label="Seabourn ultra luxury small ship cruises">Seabourn</a></li>
            </ul>

            <p className="about-note">
              You can also search every brand at once in our
              <a href="/find-a-cruise/"> Cruise Finder</a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

export default AboutPage;

