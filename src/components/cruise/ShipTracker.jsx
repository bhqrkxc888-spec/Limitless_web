import './ShipTracker.css';

/**
 * ShipTracker - Live ship position using VesselFinder embed
 * 
 * Uses VesselFinder's iframe embed for reliable loading.
 * The iframe approach works better with React's virtual DOM.
 * 
 * Features:
 * - Real-time AIS ship position
 * - 24-hour track line showing where ship has been
 * - Shows speed, heading, destination
 * - Completely FREE - no API key required
 * 
 * Props:
 * - imo: Ship's IMO number (Iona = 9826548)
 * - mmsi: Ship's MMSI number (alternative to IMO)
 * - height: Map height in pixels
 * - title: Section title
 */
const ShipTracker = ({ 
  imo = "9826548", // P&O Iona
  mmsi = "310857000", // P&O Iona MMSI
  height = 400,
  title = "Where's Iona Right Now?"
}) => {
  // VesselFinder iframe embed URL
  // Using MMSI for more reliable tracking
  const iframeSrc = `https://www.vesselfinder.com/aismap?zoom=6&track=true&mmsi=${mmsi}&names=true&width=100%25&height=${height}`;

  return (
    <div className="ship-tracker-wrapper">
      {title && <h3 className="ship-tracker-title">{title}</h3>}
      
      <div className="ship-tracker-container">
        <div className="ship-tracker-map">
          <iframe
            src={iframeSrc}
            width="100%"
            height={height}
            style={{ border: 'none' }}
            title={`Live tracking map for P&O Iona (IMO: ${imo})`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="geolocation"
          />
        </div>
        
        <div className="ship-tracker-footer">
          <span className="ship-tracker-live-indicator">
            <span className="live-dot" aria-hidden="true"></span>
            Live AIS tracking
          </span>
          <a 
            href={`https://www.vesselfinder.com/vessels/IONA-IMO-${imo}-MMSI-${mmsi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ship-tracker-credit"
          >
            View on VesselFinder →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShipTracker;
