-- Migration: Seed web schema with initial data
-- Description: Insert initial site settings and legal documents

-- ============================================================================
-- Seed web.site_settings
-- ============================================================================

INSERT INTO web.site_settings (site_key, contact_json, socials_json, opening_hours_json)
VALUES (
  'main',
  '{"phone": "01246 823815", "email": "dane@limitlesscruises.com", "address": "51 Fairfields Way, Aston, Sheffield, S26 2HB"}'::jsonb,
  '{"facebook": "", "instagram": "", "twitter": "", "linkedin": ""}'::jsonb,
  '{"monday": "9:00 AM - 5:30 PM", "tuesday": "9:00 AM - 5:30 PM", "wednesday": "9:00 AM - 5:30 PM", "thursday": "9:00 AM - 5:30 PM", "friday": "9:00 AM - 5:30 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
);

-- ============================================================================
-- Seed web.site_documents with existing legal page content
-- ============================================================================

-- Website Terms
INSERT INTO web.site_documents (slug, title, content, status, published_at)
VALUES (
  'website-terms',
  'Website Terms & Conditions',
  E'<h2>Website Conditions</h2>

<p>This website is operated by <strong>Limitless Cruises Ltd</strong> (Company Number: 16405644), a trading name of <strong>Co-op Travel Services Ltd</strong>. Limitless Cruises Ltd is a Member of <strong>Co-operative Travel Consortium (ABTA P7541)</strong>.</p>

<p>By accessing, using, browsing or booking on this website you agree you have read, understood and are bound by these Website Conditions and by the booking conditions of the principal with whom you contract.</p>

<h3>Eligibility, Jurisdiction and Use</h3>

<p>The holidays and services on this website are only available for purchase by those aged 18 or over, making the purchase from within the UK and with a UK address for booking documentation. Our business and the services we offer are governed by the laws of England and Wales.</p>

<h3>Your Obligations</h3>

<ul>
<li>You accept financial responsibility for all transactions made under your name or account</li>
<li>You confirm you are 18+ and have legal capacity to make a booking</li>
<li>You warrant all information you provide is true and accurate</li>
<li>You will not use this site for speculative, false or fraudulent bookings</li>
<li>You will use our security features and keep passwords secret</li>
</ul>

<h3>Disclaimers and Liability</h3>

<p>No warranties, promises or representations of any kind, express or implied, are given as to the nature, standard, suitability or otherwise of any services offered via this website.</p>

<h3>Changes to These Conditions</h3>

<p>We may change or update these Website Conditions from time to time without notice. Continued use of the site following changes constitutes acceptance.</p>

<h3>Intellectual Property</h3>

<p>All intellectual property rights in the website and its content are owned by us or our licensors. You may not copy, reproduce, distribute or modify any content without permission.</p>

<h3>Contact</h3>

<p>For questions about these terms, contact us at dane@limitlesscruises.com</p>',
  'published',
  now()
);

-- Privacy Policy
INSERT INTO web.site_documents (slug, title, content, status, published_at)
VALUES (
  'privacy-policy',
  'Privacy Policy',
  E'<h2>Privacy Policy</h2>

<p>Your privacy is important to us. This statement explains how we collect, use, transfer and store your personal data.</p>

<p><strong>Limitless Cruises Ltd</strong> (Company Number: 16405644) is a trading name of <strong>Co-op Travel Services Ltd</strong>, a Member of <strong>Co-operative Travel Consortium (ABTA P7541)</strong>.</p>

<p><strong>Data Protection Manager:</strong> <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a></p>

<h3>Important Information</h3>

<p>Limitless Cruises Ltd is responsible for this website and is the "data controller" for your data.</p>

<h3>The Information We Collect</h3>

<p>We may collect, use, store and transfer the following types of personal data:</p>

<ul>
<li><strong>Identity Data</strong> (name, title, date of birth, gender, passport details)</li>
<li><strong>Contact Data</strong> (address, email, telephone numbers)</li>
<li><strong>Sensitive Data</strong> (medical conditions, disabilities, dietary requirements)</li>
<li><strong>Financial Data</strong> (bank account and payment card details)</li>
<li><strong>Transaction Data</strong> (payments and services purchased)</li>
<li><strong>Technical Data</strong> (IP address, browser details, device information)</li>
<li><strong>Profile Data</strong> (username, preferences, feedback)</li>
<li><strong>Usage Data</strong> (how you use our website)</li>
<li><strong>Marketing &amp; Communications Data</strong> (your marketing preferences)</li>
</ul>

<h3>How We Collect Information</h3>

<ul>
<li>Direct interactions via forms, phone, email or post</li>
<li>Automated technologies including cookies</li>
<li>Third parties including payment providers and analytics services</li>
</ul>

<h3>How We Use Your Information</h3>

<p>We use your data to:</p>
<ul>
<li>Perform contracts and process bookings</li>
<li>Manage payments and collect debts</li>
<li>Provide customer service</li>
<li>Improve our website and services</li>
<li>Send marketing communications (with consent)</li>
<li>Comply with legal obligations</li>
</ul>

<h3>Data Security</h3>

<p>We have implemented appropriate security measures to prevent unauthorized access, disclosure or loss of your personal data.</p>

<h3>Your Rights</h3>

<p>You have the right to:</p>
<ul>
<li>Access your personal data</li>
<li>Correct inaccurate data</li>
<li>Request deletion of your data</li>
<li>Object to processing</li>
<li>Request data portability</li>
<li>Withdraw consent</li>
</ul>

<h3>Contact</h3>

<p>For questions about this policy or your data, contact our Data Protection Manager at <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a> or write to: Data Protection Manager, Limitless Cruises Ltd, 51 Fairfields Way, Aston, Sheffield, S26 2HB.</p>',
  'published',
  now()
);

-- Booking Terms
INSERT INTO web.site_documents (slug, title, content, status, published_at)
VALUES (
  'booking-terms',
  'Booking Terms & Conditions',
  E'<h2>Booking Terms &amp; Conditions</h2>

<p>These Booking Terms &amp; Conditions apply to all bookings made through Limitless Cruises Ltd, a trading name of Co-op Travel Services Ltd, Member of Co-operative Travel Consortium (ABTA P7541).</p>

<h3>Important Notice</h3>

<p>Limitless Cruises Ltd acts as an agent for cruise line principals. Your contract is with the cruise line, not with us. The cruise line\'s own booking conditions will apply.</p>

<h3>Making a Booking</h3>

<p>When you make a booking with us, you confirm that you have authority to accept these terms on behalf of all members of your party.</p>

<h3>Payment Terms</h3>

<ul>
<li>A deposit is required at time of booking</li>
<li>Full payment is typically due 90 days before departure</li>
<li>Payment can be made by bank transfer or credit/debit card</li>
<li>Card processing fees may apply</li>
</ul>

<h3>Changes to Your Booking</h3>

<ul>
<li>Amendment requests are subject to availability and cruise line policies</li>
<li>Amendment fees will apply</li>
<li>Some bookings may be non-changeable</li>
</ul>

<h3>Cancellations</h3>

<p>Cancellation charges apply as per the cruise line\'s terms:</p>
<ul>
<li>More than 90 days: Lose deposit</li>
<li>90-60 days: 50% of total cost</li>
<li>60-30 days: 75% of total cost</li>
<li>Less than 30 days: 100% of total cost</li>
</ul>

<h3>Travel Insurance</h3>

<p>We strongly recommend comprehensive travel insurance for all bookings. Insurance should be purchased at time of booking.</p>

<h3>Passports, Visas and Health</h3>

<p>You are responsible for ensuring you have valid travel documents, necessary visas, and meet health requirements for your cruise.</p>

<h3>Our Liability</h3>

<p>Our liability is limited to that of an agent. Claims for loss or damage should be directed to the cruise line.</p>

<h3>ABTA Protection</h3>

<p>As a member of Co-op Travel Services Ltd, which is a member of ABTA (P7541) through Co-operative Travel Consortium, your booking is protected by ABTA.</p>

<h3>Contact</h3>

<p>For booking enquiries, contact us at <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a> or call 01246 823815.</p>',
  'published',
  now()
);

-- Cookie Policy
INSERT INTO web.site_documents (slug, title, content, status, published_at)
VALUES (
  'cookie-policy',
  'Cookie Policy',
  E'<h2>Cookie Policy</h2>

<p>This Cookie Policy explains how Limitless Cruises Ltd uses cookies and similar technologies on our website.</p>

<h3>What Are Cookies?</h3>

<p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>

<h3>Types of Cookies We Use</h3>

<p><strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</p>

<p><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</p>

<p><strong>Functionality Cookies:</strong> Remember your preferences and personalize your experience.</p>

<p><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness.</p>

<h3>Cookie Categories</h3>

<p><strong>Strictly Necessary:</strong></p>
<ul>
<li>Session management</li>
<li>Security features</li>
<li>Load balancing</li>
</ul>

<p><strong>Analytics:</strong></p>
<ul>
<li>Google Analytics</li>
<li>Usage statistics</li>
<li>Performance monitoring</li>
</ul>

<p><strong>Marketing:</strong></p>
<ul>
<li>Social media integration</li>
<li>Advertising networks</li>
<li>Conversion tracking</li>
</ul>

<h3>Managing Cookies</h3>

<p>You can control cookies through your browser settings:</p>
<ul>
<li>Accept or reject cookies</li>
<li>Delete existing cookies</li>
<li>Set preferences for different types</li>
</ul>

<p><strong>Note:</strong> Blocking cookies may affect website functionality.</p>

<h3>Third-Party Cookies</h3>

<p>We use third-party services that may set their own cookies:</p>
<ul>
<li>Google Analytics</li>
<li>Social media platforms</li>
<li>Payment processors</li>
</ul>

<h3>Updates to This Policy</h3>

<p>We may update this Cookie Policy from time to time. Please check back regularly for changes.</p>

<h3>Contact</h3>

<p>For questions about our use of cookies, contact <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a></p>',
  'published',
  now()
);

-- Price Match Guarantee
INSERT INTO web.site_documents (slug, title, content, status, published_at)
VALUES (
  'price-match-guarantee',
  'Price Match Guarantee',
  E'<h2>Price Match Guarantee</h2>

<p>At Limitless Cruises, we endeavor to offer you the best value cruise holidays. If you find a better price, we\'ll match it.</p>

<h3>Our Promise</h3>

<p>We want you to book with confidence knowing you\'re getting the best price available.</p>

<h3>How It Works</h3>

<ol>
<li>Find a lower price for the same cruise</li>
<li>Submit a price match request with details</li>
<li>We verify the quote meets our criteria</li>
<li>We match the price or explain why we can\'t</li>
</ol>

<h3>Eligibility Criteria</h3>

<p>The quote must be:</p>
<ul>
<li>For the identical cruise (same ship, same date, same itinerary)</li>
<li>The same cabin category and grade</li>
<li>From a UK-based, ABTA-registered travel agent</li>
<li>Available to book at the time of your request</li>
<li>A genuine public price (not staff rates, group bookings, or errors)</li>
</ul>

<h3>Timeframes</h3>

<ul>
<li>Price match requests must be submitted within 48 hours of booking</li>
<li>The lower price must be verifiable at time of request</li>
<li>We aim to respond within 24 hours</li>
</ul>

<h3>Exclusions</h3>

<p>We cannot price match:</p>
<ul>
<li>Staff or industry rates</li>
<li>Group bookings (10+ cabins)</li>
<li>Quotes from non-ABTA agents</li>
<li>Prices from auction sites</li>
<li>Obvious pricing errors</li>
<li>Packages with significantly different inclusions</li>
</ul>

<h3>Our Right to Refuse</h3>

<p>We reserve the right to decline price match requests that don\'t meet our criteria or cannot be verified.</p>

<h3>Terms</h3>

<ul>
<li>One price match per booking</li>
<li>Must be requested before final payment</li>
<li>Cannot be combined with other offers</li>
<li>Subject to availability</li>
</ul>

<h3>Verification</h3>

<p>You\'ll need to provide:</p>
<ul>
<li>Screenshot or written quote</li>
<li>Name of travel agent</li>
<li>ABTA number</li>
<li>Date of quote</li>
<li>Full cruise details</li>
</ul>

<h3>Contact</h3>

<p>To submit a price match request:</p>
<ul>
<li>Email: <a href="mailto:dane@limitlesscruises.com">dane@limitlesscruises.com</a></li>
<li>Phone: 01246 823815</li>
</ul>

<p>See our full Booking Terms &amp; Conditions for additional information.</p>',
  'published',
  now()
);

-- ============================================================================
-- Verify seed data
-- ============================================================================

-- These queries are for reference only (commented out for migration)
-- SELECT * FROM web.site_settings;
-- SELECT slug, title, status FROM web.site_documents ORDER BY slug;

