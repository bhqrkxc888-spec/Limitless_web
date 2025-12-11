import { useEffect } from 'react';
import './FindCruisePage.css';

function FindCruisePage() {
  useEffect(() => {
    // Load Widgety scripts
    const scripts = [
      'https://www.widgety.co.uk/assets/widgety_iframe-338e444fa45e2af836a1c162ed7b7fa3b57d6267f6e30c026f7d582a77e34dd7.js',
      'https://www.widgety.co.uk/assets/deep_linking_iframe-4355a96984c672f2dbc8ef1db67edcde1065f89371539db26a3483f3a6551479.js',
      'https://www.widgety.co.uk/assets/widgety_cruise_tour_search_navigation_script-e5c46a5521b82182ecdc1564d7f90c5cfb653f3ffed29c4220e85749607af1de.js'
    ];

    scripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.setAttribute('data-widgety', 'true');
      script.async = true;
      document.body.appendChild(script);
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      scripts.forEach((src) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      });
    };
  }, []);

  return (
    <main className="find-cruise-page" id="finder-block" role="region" aria-label="Find your perfect cruise with Limitless Cruises">
      {/* Blue header bar */}
      <div className="finder-header">
        <div className="container">
          <h1>Cruise Finder</h1>
        </div>
      </div>

      <div className="container">
        <div className="finder-content">
          {/* Keyworded H2 */}
          <h2 className="finder-subtitle">Find Your Perfect Cruise</h2>

          <p className="finder-lead">
            Use our Cruise Finder to search across major cruise lines and discover the holiday that suits you best.
            Filter by destination, departure date, cruise line or ship to narrow your options.
            Once you find a sailing you like, <a href="/contact">get in touch</a> for the latest availability and a personalised quote.
          </p>

          {/* Hidden H3 for structure/SEO */}
          <h3 className="sr-only">Cruise search filters and results</h3>

          {/* Widget Frame (now full width inside container) */}
          <div className="finder-frame" role="group" aria-label="Cruise Finder search widget">
            <iframe
              className="widgety-cruise-tour-search"
              title="Limitless Cruises Finder"
              frameBorder="0"
              width="100%"
              height="680"
              loading="lazy"
              src="https://www.widgety.co.uk/widgets/ugPj5zR1QMRisywLk13B.widget"
            />

            <noscript>
              <p className="finder-noscript">
                JavaScript is required to use the Cruise Finder.
                <a href="https://www.widgety.co.uk/widgets/ugPj5zR1QMRisywLk13B.widget" target="_blank" rel="noopener noreferrer">
                  {' '}Open the search in a new window
                </a>.
              </p>
            </noscript>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="finder-cta" id="finder-cta" role="region" aria-label="Can't find what you need? Cruise Finder Help Section">
        {/* Blue header */}
        <div className="finder-cta-header">
          <div className="container">
            <h2>Can't find what you are looking for?</h2>
          </div>
        </div>

        <div className="container">
          <div className="finder-cta-content">
            <p className="finder-cta-lead">
              If the Cruise Finder doesn't show exactly what you want, Limitless Cruises can build a trip that fits you perfectly.
              We design tailored cruise holidays that combine <strong>flights</strong>, <strong>hotels</strong> and <strong>cruises</strong> for seamless and extended journeys.
            </p>

            {/* Hidden H3 for SEO */}
            <h3 className="sr-only">Cruise Finder help and travel inspiration</h3>

            <div className="finder-cta-listwrap">
              <p className="finder-cta-intro">
                We work with leading cruise lines including P&amp;O Cruises, MSC Cruises, Royal Caribbean, Norwegian Cruise Line, Disney Cruise Line, Viking, Seabourn, Azamara and Explora Journeys.
                View all lines on our <a href="/cruise-lines">Cruise Lines</a> page.
              </p>
              <ul className="finder-cta-list" role="list">
                <li><strong>Destinations:</strong> Mediterranean, Greek Isles, Canary Islands, Caribbean, Norwegian Fjords, Baltic, Canada &amp; New England, Dubai, Singapore and South-East Asia.</li>
                <li><strong>Seasonal highlights:</strong> Christmas &amp; New Year sailings, school-holiday getaways, spring sunshine escapes and late-summer departures.</li>
                <li><strong>Japan in bloom:</strong> itineraries timed for cherry blossom season with pre-cruise stays in Tokyo, Kyoto or Osaka.</li>
                <li><strong>Alaska and rail:</strong> pair Inside Passage cruises with the <em>Rocky Mountaineer</em> rail journey for glaciers, mountains and epic scenery.</li>
                <li><strong>Polar adventures:</strong> Svalbard for wildlife and midnight sun, plus small-ship expeditions to the Antarctic Peninsula.</li>
                <li><strong>Grand voyages:</strong> back-to-back sailings, repositioning routes and world-cruise sectors tailored to your dates.</li>
                <li><strong>Cruise and stay:</strong> well-timed flights, private transfers and hand-picked hotels before or after your cruise.</li>
                <li>See detailed ships and deck plans in our <a href="/find-a-cruise">Ship Finder</a>, then ask us to customise the itinerary.</li>
              </ul>
            </div>

            {/* Faded ship logo for subtle branding */}
            <figure className="finder-cta-logo">
              <img 
                src="/images/placeholders/limitless-logo.png"
                alt="Limitless Cruises logo — Cruise Finder help section"
                width="120" 
                height="120" 
                loading="lazy" 
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FindCruisePage;

