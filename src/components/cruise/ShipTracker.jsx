import { useEffect, useRef } from 'react';
import './ShipTracker.css';

/**
 * ShipTracker - Live ship position using VesselFinder free embed
 * 
 * Features:
 * - Real-time AIS ship position
 * - 24-hour track line showing where ship has been
 * - Shows speed, heading, destination
 * - Completely FREE - no API key required
 * 
 * Props:
 * - imo: Ship's IMO number (Iona = 9826548)
 * - height: Map height in pixels
 * - showTrack: Whether to show 24hr track line
 * - showNames: Whether to show ship names on hover
 * - title: Section title
 */
const ShipTracker = ({ 
  imo = "9826548", // P&O Iona
  height = 400,
  showTrack = true,
  showNames = true,
  title = "Where's Iona Right Now?"
}) => {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Prevent double-loading in React strict mode
    if (scriptLoadedRef.current) return;
    
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create the config script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.text = `
      var width = "100%";
      var height = "${height}";
      var names = ${showNames};
      var imo = "${imo}";
      var show_track = ${showTrack};
    `;

    // Create the VesselFinder script
    const vfScript = document.createElement('script');
    vfScript.type = 'text/javascript';
    vfScript.src = 'https://www.vesselfinder.com/aismap.js';
    vfScript.async = true;

    // Append scripts to container
    container.appendChild(configScript);
    container.appendChild(vfScript);
    
    scriptLoadedRef.current = true;

    return () => {
      // Cleanup on unmount
      if (container) {
        container.innerHTML = '';
      }
      scriptLoadedRef.current = false;
    };
  }, [imo, height, showTrack, showNames]);

  return (
    <div className="ship-tracker-wrapper">
      {title && <h3 className="ship-tracker-title">{title}</h3>}
      
      <div className="ship-tracker-container">
        <div 
          ref={containerRef} 
          className="ship-tracker-map"
          style={{ minHeight: `${height}px` }}
          aria-label={`Live tracking map for ship IMO ${imo}`}
        />
        
        <div className="ship-tracker-footer">
          <span className="ship-tracker-live-indicator">
            <span className="live-dot" aria-hidden="true"></span>
            Live AIS tracking
          </span>
          <span className="ship-tracker-credit">
            Powered by VesselFinder
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShipTracker;
