import SEO from '../components/SEO';
import './WebsiteTerms.css';

function WebsiteTerms() {
  return (
    <main className="website-terms-page">
      <SEO
        title="Website Terms & Conditions"
        description="Read the terms and conditions for using the Limitless Cruises website. Understanding your obligations and our disclaimers."
        canonical="https://limitlesscruises.com/website-terms"
        noindex={false}
      />

      <div className="terms-header">
        <div className="container">
          <h1>Website Conditions</h1>
        </div>
      </div>

      <div className="container">
        <article className="terms-content">
          <p>
            This website is operated by <strong>Limitless Cruises Ltd</strong> (Company Number: 16405644) ("we", "us" or "our").
            Limitless Cruises Ltd is a member of <strong>Holiday Elite (ABTA P7541)</strong>.
          </p>

          <p>
            By accessing, using, browsing or booking on this website you agree you have read, understood and are bound by these
            Website Conditions and by the booking conditions of the principal with whom you contract. Nothing on this website
            constitutes an offer to provide goods or services.
          </p>

          <section>
            <h2>Eligibility, Jurisdiction and Use</h2>
            <p>
              The holidays and services on this website are only available for purchase by those aged 18 or over, making the
              purchase from within the UK and with a UK address for booking documentation. Our business and the services we offer
              are governed by the laws of England and Wales. We are not licensed to trade outside the UK and cannot accept booking
              requests from individuals not based in the UK. We do not accept bookings made by travel agents or other agents acting
              for members of the public. Any such bookings will be cancelled; refunds will be given (less supplier charges) and we
              reserve the right to charge an administration fee of £100 per booking.
            </p>
            <p>
              No warranties or representations of any kind, express or implied, are given as to compliance of the information shown
              on this site, the services offered, or any related information with the laws of any country other than England and
              Wales. Access to this site is conditional on your agreement that all information and any dispute between you and us
              will be governed by English law and dealt with exclusively by the courts of England and Wales (unless you booked in
              Scotland or Northern Ireland, where local courts may apply). We may deny access to this site at any time without
              notice.
            </p>
          </section>

          <section>
            <h2>Your Obligations</h2>
            <ul className="terms-list">
              <li>You accept financial responsibility for all transactions made under your name or account.</li>
              <li>You confirm you are 18+ and have legal capacity to make a booking.</li>
              <li>You warrant all information you provide about yourself or others is true and accurate.</li>
              <li>You will not use this site for speculative, false or fraudulent bookings.</li>
              <li>You will not transmit threatening, defamatory, pornographic, political, racist or otherwise unlawful material.</li>
              <li>You will not modify, copy, transmit, distribute, sell, display, license or reproduce this site or any content,
                  except to make one personal, non-commercial copy of relevant information.</li>
              <li>You will use our security features and keep any passwords secret.</li>
            </ul>
          </section>

          <section>
            <h2>Disclaimers and Liability</h2>
            <p>
              The booking conditions of the principal supplier contain limitations and exclusions of liability for those who book
              and/or take any holidays or travel arrangements advertised. Cancellation and amendment charges may apply if you cancel
              or change a booking after confirmation.
            </p>
            <p>
              No warranties, promises or representations of any kind, express or implied, are given as to the nature, standard,
              suitability or otherwise of any services offered via this website. We shall not be liable for any loss or damage of
              whatever nature (direct, indirect, consequential or other) arising from the use of any information or material on this
              website and/or access to, or use of, any other information or material via web links from this site, or inability to
              access or use this website. These exclusions apply only to the extent permitted by law; if any exclusion is found
              unlawful or unenforceable, it shall be severed without affecting the remaining provisions.
            </p>
            <p>
              This site is provided on an "as is" and "as available" basis. We accept no liability for your inability to access or
              use the site at any time, nor for any failure to complete any transaction. We do not warrant the site is free from
              viruses or other harmful properties and accept no liability for losses arising from downloading or the adverse effects
              to your programs or data, browser incompatibilities, or breaches of security from unauthorised access attempts. We are
              not responsible for material supplied by independent contributors. Inclusion of links does not imply endorsement; access
              to a linked site is subject to that site's own terms.
            </p>
          </section>

          <section>
            <h2>Changes to These Conditions and Site Content</h2>
            <p>
              We may change or update these Website Conditions from time to time without notice. The current version will be
              displayed on this website from the date changes take effect. Continued use of the site following changes constitutes
              acceptance.
            </p>
            <p>
              We may change website content at any time (including adding/removing discounts, offers, holidays, features or
              services). We strive for accuracy but cannot guarantee the site is free from errors. Prices and availability are
              updated regularly but are not "live"; when you search, we check live availability and current prices with the relevant
              supplier and your final price may change before confirmation. If a price is obviously a mistake, any booking based on
              it will not be valid and we may cancel and refund in full. Prices/discounts shown on this site are applicable to
              bookings made via this site only and may differ from other channels.
            </p>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <p>
              We reserve copyright and all proprietary rights in this website and its content. All intellectual property rights
              (including copyright, database rights and trade marks) subsisting in this site/content and in the software and source
              materials used in connection with it are owned by us, our affiliates or licensors. The trading names, logos and
              graphics displayed are registered trade marks; no right or licence to use them is granted.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

export default WebsiteTerms;

