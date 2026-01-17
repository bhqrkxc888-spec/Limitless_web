import LegalPageTemplate from '../components/LegalPageTemplate';

const fallbackContent = `
<p>
  <strong>Limitless Cruises Ltd</strong><br />
  Company Number: 16405644<br />
  Member of Holiday Elite (ABTA P7541)
</p>

<p><strong>Last updated:</strong> January 2025</p>

<hr />

<p>
  By accessing, using or browsing this website, you confirm that you have read, understood and agree to be bound by these Website Terms. If you do not agree with any part of these terms, please do not use this website.
</p>

<p>
  <strong>No bookings are taken or completed on this website.</strong> Any prices, offers or travel information shown are for guidance only and are subject to availability and confirmation. If you choose to proceed, your booking will be arranged separately via communication with us, and you will enter into a contract with the relevant travel supplier(s) (for example: tour operator, cruise line, airline, hotel or accommodation provider). Separate Booking Terms and Conditions apply to any travel arrangements made through us.
</p>

<hr />

<h2>1. Eligibility, Jurisdiction and Use</h2>
<p>
  This website is intended for users aged <strong>18 or over</strong>, accessing the site from within the <strong>UK</strong>. Our business and these Website Terms are governed by the laws of <strong>England and Wales</strong>. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of England and Wales.
</p>

<h2>2. Your Obligations</h2>
<p>When using this website, you agree that:</p>
<ul>
  <li>You will not use this website to submit false, misleading or fraudulent enquiries</li>
  <li>You warrant that all information you provide via forms or enquiries is true, accurate and complete</li>
  <li>You will keep any account or login details (if applicable) confidential</li>
  <li>You will not attempt to gain unauthorised access to any part of this website, its servers, or any connected systems</li>
  <li>You will not use automated tools to scrape, copy or extract content from this website without our prior written permission</li>
  <li>You will not use this website in any way that could damage, disable, or impair the site or interfere with other users</li>
  <li>You will not submit false, misleading, defamatory, or offensive content in reviews, ratings, or other user submissions</li>
</ul>

<h2>3. Website Content and Disclaimers</h2>

<h3>General Content</h3>
<p>
  While we aim to keep information on this website accurate and up to date, we do not guarantee that all content is complete, current or error-free. Travel information, availability and prices can change quickly and must be confirmed at the time of enquiry.
</p>
<p>
  No warranties, promises or representations of any kind, express or implied, are given as to the nature, standard, suitability or otherwise of any travel services referred to on this website.
</p>

<h3>Content Types</h3>
<p>Our website includes various types of content:</p>
<ul>
  <li><strong>Cruise Guides and Port Guides</strong>: Comprehensive destination information including attractions, restaurants, accessibility information, medical facilities, food &amp; drink recommendations, and local services</li>
  <li><strong>Travel News Articles</strong>: Blog-style articles about cruise destinations, cruise lines, and travel tips</li>
  <li><strong>Ship Information</strong>: Individual pages for cruise ships with specifications, amenities, and details</li>
  <li><strong>Cruise Line Information</strong>: Details about different cruise operators</li>
  <li><strong>Destination Pages</strong>: Regional and port-specific destination information</li>
  <li><strong>Offers and Deals</strong>: Promotional cruise offers and special deals</li>
  <li><strong>Itineraries</strong>: Dynamically generated cruise itineraries based on ship, dates, and routes</li>
  <li><strong>User Reviews and Ratings</strong>: User-submitted ratings and reviews for port guides and other content</li>
</ul>
<p>
  This content is provided for general informational and planning purposes only. Details such as port facilities, venue opening times, attraction information, local services, transport options, accessibility information, medical facilities and excursion availability are subject to change without notice. We recommend you always verify important details directly with the relevant cruise line, port authority, local business, or official source before making plans or decisions based on our guides.
</p>

<h3>AI-Generated and AI-Assisted Content</h3>
<p>
  Certain content on this website, including but not limited to cruise guides, port guides, destination descriptions, travel articles, and offer descriptions, may be created, enhanced, or generated using artificial intelligence (AI) tools and services.
</p>
<p><strong>AI Models and Services Used:</strong></p>
<ul>
  <li>Anthropic Claude AI (various models including Claude 3.5 Haiku, Sonnet, and Opus)</li>
  <li>Perplexity AI (for real-time web search and travel research)</li>
  <li>All accessed via Vercel AI Gateway</li>
</ul>
<p><strong>Important Disclaimers:</strong></p>
<ul>
  <li>While we review AI-generated content for accuracy, such material may occasionally contain errors, outdated information, or inaccuracies</li>
  <li>AI-generated content should be treated as a helpful starting point for your own research rather than a definitive or authoritative source</li>
  <li>AI-generated content may not reflect the most current information available</li>
  <li>We accept no liability for any inaccuracies, errors, or outdated information in AI-generated or AI-assisted content</li>
  <li>We recommend verifying all important information from official sources before making travel decisions</li>
</ul>

<h3>AI Chat Assistant</h3>
<p>
  Our website features an AI-powered chat assistant (which may be referred to as "Captain Cruise", "Skipper", or similar names). This assistant is designed to help answer general questions about cruises and provide travel recommendations.
</p>
<p><strong>Please note:</strong></p>
<ul>
  <li>The AI assistant provides general information only and cannot make bookings or confirm prices</li>
  <li>Responses are generated by artificial intelligence using models including Anthropic Claude and Perplexity AI</li>
  <li>Responses may not always be accurate, complete, or current</li>
  <li>The AI assistant does not have access to real-time availability or pricing</li>
  <li>The AI assistant may use real-time web search (via Perplexity) to find current information, but this does not guarantee accuracy</li>
  <li>Any information provided should be verified with us directly before making travel decisions</li>
  <li>Conversations with the AI assistant are logged and may be reviewed by us to improve our services</li>
  <li>We accept no liability for any actions taken based on information provided by the AI assistant</li>
</ul>
<p>
  For booking enquiries, quotes, or confirmed information, please contact us directly via email, phone, or our contact form.
</p>

<h3>User-Generated Content</h3>
<p>
  Our website allows users to submit ratings, reviews, and other content. User-generated content represents the personal opinions and experiences of those users. We do not verify or endorse user submissions and accept no responsibility for their accuracy, completeness, or reliability.
</p>

<h2>4. Third-Party Data and Services</h2>
<p>
  Our website integrates with various third-party services to provide certain features and content. These services are operated by third parties and are subject to their own terms of use, privacy policies, and data practices.
</p>

<h3>Ship Tracking</h3>
<p>
  Our website displays live or near-live ship tracking information, including vessel positions, routes, and estimated arrival times. This data is provided by <strong>VesselFinder</strong> using AIS (Automatic Identification System) data.
</p>
<p><strong>Important Disclaimers:</strong></p>
<ul>
  <li>Ship tracking information is provided for general interest only</li>
  <li>We make no guarantees as to its accuracy, timeliness, or reliability</li>
  <li>Ship positions and ETAs are approximate and should not be relied upon for travel planning, port transfers, or any time-critical arrangements</li>
  <li>Tracking data may be delayed, incomplete, or unavailable at times</li>
  <li>VesselFinder is a third-party service and their terms and privacy policy apply to their tracking data</li>
</ul>

<h3>Weather Information</h3>
<p>
  Our website displays weather forecasts and marine weather data for cruise ports and destinations. This information is sourced from third-party providers including:
</p>
<ul>
  <li><strong>Stormglass.io</strong>: Marine weather data including wave height, water temperature, swell, wind speed/direction, and current information</li>
  <li><strong>OpenWeatherMap</strong>: General weather forecasts</li>
</ul>
<p><strong>Important Disclaimers:</strong></p>
<ul>
  <li>Weather forecasts are inherently uncertain and may be inaccurate</li>
  <li>Marine weather data is cached for up to 24 hours and may not reflect current conditions</li>
  <li>Weather forecasts are typically available up to 8 days in advance and update hourly</li>
  <li>We accept no responsibility for the accuracy of weather information displayed or for any decisions made based on such information</li>
  <li>Weather data is provided "as-is" without any warranties</li>
</ul>

<h3>Cruise Search and Itinerary Data</h3>
<p>
  Our website includes functionality to search for cruises by ship name and date range. This search uses data from:
</p>
<ul>
  <li><strong>CruiseMapper</strong> (via <strong>Apify</strong> platform): Cruise itinerary data and ship schedules</li>
  <li>The search uses the Apify actor <code>vulnv~cruisemapper-cruises-scraper</code></li>
</ul>
<p><strong>Important Disclaimers:</strong></p>
<ul>
  <li>Cruise search results are based on third-party data and may not be complete or current</li>
  <li>Availability, prices, and itinerary details shown in search results are for guidance only</li>
  <li>All cruise information must be confirmed directly with us or the cruise line</li>
  <li>We accept no responsibility for the accuracy or completeness of cruise search results</li>
</ul>

<h3>Cruise Booking Widgets</h3>
<p>
  Our website includes embedded widgets from <strong>Widgety</strong> that allow you to search for and view cruise information for specific ships. These widgets are operated by Widgety, a third-party service provider.
</p>
<p><strong>Important Disclaimers:</strong></p>
<ul>
  <li>Widgety widgets are subject to Widgety's own terms of use and privacy policies</li>
  <li>Widgety may set cookies on their domain when you interact with their widgets</li>
  <li>When you interact with these widgets, you may be directed to third-party websites to complete enquiries or bookings</li>
  <li>We are not responsible for the content, availability, or practices of Widgety or any third-party booking services</li>
  <li>Any bookings or transactions completed through Widgety are subject to their terms and conditions</li>
</ul>

<h3>Maps and Directions</h3>
<p>
  Our website includes links to external mapping services and may use interactive map technology:
</p>
<ul>
  <li><strong>Google Maps</strong>: Links to Google Maps for walking directions between port attractions and locations</li>
  <li><strong>Mapbox</strong>: Interactive map rendering (if used)</li>
</ul>
<p><strong>Important Disclaimers:</strong></p>
<ul>
  <li>Mapping services are provided by third parties and are subject to their own terms of use</li>
  <li>Directions, distances, and journey times shown are estimates only and should be verified before travel</li>
  <li>We accept no responsibility for the accuracy of mapping information or directions provided by third-party services</li>
</ul>

<h3>Analytics and Performance Monitoring</h3>
<p>
  Our website uses analytics and monitoring services to understand usage and improve performance:
</p>
<ul>
  <li><strong>Google Analytics 4</strong>: Website usage analytics (tracking ID: G-GNY4BEL0HQ)</li>
  <li><strong>Vercel Analytics</strong>: Performance and usage analytics</li>
  <li><strong>Web Vitals Tracking</strong>: Core Web Vitals monitoring (LCP, INP, CLS)</li>
  <li><strong>SEO Monitoring</strong>: SEO health tracking</li>
  <li><strong>Error Tracking</strong>: JavaScript error logging (if enabled)</li>
</ul>
<p>
  These services collect anonymized usage data. For more information about data collection, please see our Privacy Policy and Cookie Policy.
</p>

<h2>5. User Submissions</h2>

<h3>Contact Forms and Enquiries</h3>
<p>When you submit information through our contact forms, quote request forms, or other enquiry methods, you agree that:</p>
<ul>
  <li>The information you provide is accurate and complete</li>
  <li>We may use your information to respond to your enquiry and provide our services</li>
  <li>Your information will be handled in accordance with our Privacy Policy</li>
  <li>We may store your information in our database (hosted by Supabase) for the purposes of responding to your enquiry and providing our services</li>
</ul>
<p><strong>Data Collected:</strong></p>
<ul>
  <li>Contact forms collect: name, email address, phone number, message, and GDPR consent</li>
  <li>Quote request forms collect: name, email, phone, cruise details (URL or manual entry), package preferences, and existing customer status</li>
  <li>All forms include honeypot fields and rate limiting to prevent spam and fraudulent submissions</li>
</ul>

<h3>Reviews and Ratings</h3>
<p>
  Our website allows users to submit ratings and reviews for port guides and other content. By submitting a review or rating, you agree that:
</p>
<ul>
  <li>Your submission is your own genuine opinion based on your experience</li>
  <li>You will not submit false, misleading, defamatory, or offensive content</li>
  <li>We may display, edit, or remove your submission at our discretion</li>
  <li>We may use your submission for any purpose related to our services</li>
  <li>Your submission may be stored in our database (hosted by Supabase)</li>
  <li>Reviews and ratings may be tracked using anonymous session identifiers</li>
</ul>
<p>
  Reviews and ratings from other users represent their personal opinions and experiences. We do not verify or endorse user submissions and accept no responsibility for their accuracy.
</p>

<h3>AI Chat Assistant Conversations</h3>
<p>When you use our AI chat assistant, you agree that:</p>
<ul>
  <li>Your conversations may be logged and stored</li>
  <li>We may review conversations to improve our services and the AI assistant's responses</li>
  <li>Your name and email (if provided) may be stored with conversation history</li>
  <li>We may extract preferences and information from conversations for service improvement purposes</li>
</ul>

<h2>6. Cookies and Local Storage</h2>
<p>
  Our website uses cookies and local storage technologies. For detailed information about the cookies we use, how we use them, and how to manage your preferences, please see our Cookie Policy.
</p>
<p><strong>Summary:</strong></p>
<ul>
  <li><strong>First-party cookies</strong>: Used for website functionality, preferences, and session management</li>
  <li><strong>Third-party cookies</strong>: Set by Google Analytics, Widgety, VesselFinder, and other third-party services</li>
  <li><strong>Local Storage</strong>: Used to store user preferences (UI scale, accessibility settings, etc.)</li>
  <li><strong>Session Storage</strong>: Used for temporary data during your browsing session</li>
</ul>
<p>
  By using this website, you consent to our use of cookies and local storage as described in our Cookie Policy, unless you have disabled cookies in your browser settings.
</p>

<h2>7. Intellectual Property</h2>
<p>
  All intellectual property rights in this website and its content (including but not limited to text, images, graphics, logos, cruise guides, port guides, travel articles, and software) are owned by us or our licensors, unless otherwise stated.
</p>
<p>
  You may not copy, reproduce, distribute, publish, adapt, modify, or create derivative works from any part of this website without our prior written permission, except for your own personal, non-commercial use in planning your travel.
</p>
<p><strong>Third-Party Intellectual Property:</strong></p>
<ul>
  <li>Ship tracking data displayed on this website is the intellectual property of VesselFinder and/or their data providers</li>
  <li>Weather information is the intellectual property of Stormglass.io, OpenWeatherMap, and/or their data providers</li>
  <li>Cruise itinerary data is the intellectual property of CruiseMapper, Apify, and/or their data providers</li>
  <li>Content from embedded widgets (such as Widgety) remains the intellectual property of those third-party providers</li>
  <li>AI-generated content may incorporate information from various sources, and original source materials remain the property of their respective owners</li>
</ul>

<h2>8. Data Storage and Processing</h2>

<h3>Data Storage</h3>
<p>
  Your data (including enquiries, form submissions, and chat conversations) is stored in databases hosted by <strong>Supabase</strong>, a third-party database service provider. Supabase is EU-based and complies with GDPR requirements.
</p>

<h3>Data Processing</h3>
<p>We may process your data for the following purposes:</p>
<ul>
  <li>Responding to your enquiries and providing our services</li>
  <li>Improving our website and services</li>
  <li>Analyzing usage patterns and website performance</li>
  <li>Training and improving our AI systems (conversations may be used for this purpose)</li>
  <li>Complying with legal obligations</li>
</ul>
<p>
  For more information about how we handle your data, please see our Privacy Policy.
</p>

<h2>9. Limitation of Liability</h2>
<p>To the fullest extent permitted by law:</p>
<ul>
  <li>This website and its content are provided "as is" without any warranties or guarantees of any kind, whether express or implied</li>
  <li>We accept no liability for any loss, damage, expense, or disappointment arising from your use of this website or reliance on any information contained within it</li>
  <li>We accept no liability for any loss arising from the unavailability of this website, technical failures, or errors in content</li>
  <li>We accept no liability for any actions you take based on information in our cruise guides, port guides, AI-generated content, ship tracking, weather data, cruise search results, or other third-party information</li>
  <li>We accept no liability for the accuracy, availability, or reliability of any third-party services integrated into this website (including but not limited to VesselFinder, Stormglass.io, CruiseMapper, Widgety, Google Maps, Mapbox, and analytics services)</li>
  <li>We accept no liability for any loss arising from the use of embedded widgets or third-party booking services</li>
  <li>Our total liability to you for any claim arising from your use of this website shall not exceed £100</li>
</ul>
<p>
  Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.
</p>

<h2>10. Links to Third-Party Websites</h2>
<p>
  This website may contain links to external websites operated by third parties, including:
</p>
<ul>
  <li>Cruise line websites</li>
  <li>Port authority websites</li>
  <li>Booking and travel service websites</li>
  <li>Mapping services (Google Maps)</li>
  <li>Social media platforms</li>
  <li>Other travel-related websites</li>
</ul>
<p>
  We have no control over and accept no responsibility for the content, privacy practices, or availability of these websites. The inclusion of any link does not imply endorsement by us. When you click on a link to a third-party website, you will be subject to that website's terms of use and privacy policy.
</p>

<h2>11. Changes to These Terms</h2>
<p>
  We may update these Website Terms from time to time without notice. The date of the last update is shown at the top of this page. Your continued use of the website following any changes constitutes acceptance of the updated terms.
</p>
<p>
  We recommend that you review these terms periodically to stay informed of any updates.
</p>

<h2>12. Severability</h2>
<p>
  If any provision of these terms is found to be invalid or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.
</p>

<h2>13. Contact</h2>
<p>
  If you have any questions about these Website Terms, please contact us:
</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:travel@limitlesscruises.com">travel@limitlesscruises.com</a></li>
  <li><strong>Phone:</strong> <a href="tel:01143213208">0114 321 3208</a></li>
</ul>

<hr />

<p><em>These Website Terms apply to your use of our website only. For terms relating to travel bookings, please refer to our separate Booking Terms and Conditions.</em></p>

<p><em>For information about how we handle your personal data, please see our Privacy Policy. For information about cookies and tracking technologies, please see our Cookie Policy.</em></p>
`;

function WebsiteTerms() {
  return (
    <LegalPageTemplate
      fallbackTitle="Website Terms & Conditions"
      fallbackDescription="Read the terms and conditions for using the Limitless Cruises website. Understanding your obligations and our disclaimers."
      fallbackContent={fallbackContent}
    />
  );
}

export default WebsiteTerms;
