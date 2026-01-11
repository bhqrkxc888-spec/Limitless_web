import Accordion from '../ui/Accordion';
import { ionaShipInfo } from '../../data/cruise/g606-ship-info';
import './AboutIona.css';

function AboutIona() {
  return (
    <div className="about-iona">
      <Accordion title="About Iona" defaultOpen={false} variant="bordered">
        <div className="about-iona-content">
          <p className="about-iona-description">{ionaShipInfo.description}</p>
          
          <div className="about-iona-stats">
            <div className="stat">
              <span className="stat-icon">👥</span>
              <span className="stat-value">{ionaShipInfo.capacity}</span>
            </div>
            <div className="stat">
              <span className="stat-icon">⚓</span>
              <span className="stat-value">{ionaShipInfo.tonnage}</span>
            </div>
            <div className="stat">
              <span className="stat-icon">👔</span>
              <span className="stat-value">{ionaShipInfo.crew}</span>
            </div>
          </div>

          <hr className="about-iona-divider" />

          <div className="about-iona-venues">
            <h3>KEY VENUES</h3>
            <ul>
              {ionaShipInfo.keyVenues.map((venue, index) => (
                <li key={index}>{venue}</li>
              ))}
            </ul>
          </div>

          <hr className="about-iona-divider" />

          <div className="about-iona-link">
            <a 
              href={ionaShipInfo.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="iona-website-link"
            >
              More about Iona on P&O website →
            </a>
          </div>
        </div>
      </Accordion>
    </div>
  );
}

export default AboutIona;
