import { useState, useEffect } from 'react';
import { Check, X, Upload, ExternalLink } from 'lucide-react';
import destinations, { getDestinationsByRegion } from '../../config/destinations';
import './AdminDestinationHeroes.css';

/**
 * Admin page for managing destination hero images
 * Shows checklist of 30 required hero images
 */
function AdminDestinationHeroes() {
  const [uploadedImages, setUploadedImages] = useState(new Set());
  const [checkingImages, setCheckingImages] = useState(true);
  const [imageUrls, setImageUrls] = useState({});

  // Check which hero images are already uploaded
  const checkUploadedImages = async () => {
    setCheckingImages(true);
    const uploaded = new Set();
    const urls = {};

    // Check each destination hero
    for (const dest of destinations) {
      const heroUrl = `https://blob.vercel-storage.com/destinations/${dest.heroFilename}`;
      
      try {
        const response = await fetch(heroUrl, { method: 'HEAD' });
        if (response.ok) {
          uploaded.add(dest.slug);
          urls[dest.slug] = heroUrl;
        }
      } catch {
        // Image doesn't exist yet
      }
    }

    setUploadedImages(uploaded);
    setImageUrls(urls);
    setCheckingImages(false);
  };

  useEffect(() => {
    checkUploadedImages();
  }, []);

  const destinationsByRegion = getDestinationsByRegion();
  const totalDestinations = destinations.length;
  const uploadedCount = uploadedImages.size;
  const progressPercent = Math.round((uploadedCount / totalDestinations) * 100);

  return (
    <div className="admin-destination-heroes">
      <header className="admin-header">
        <h1>Destination Hero Images</h1>
        <p>
          Manage the {totalDestinations} destination hero images (1920×1080, 16:9).
          These are used on offer detail pages instead of offer-specific heroes.
        </p>
      </header>

      {/* Progress Overview */}
      <div className="progress-overview">
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-value">{uploadedCount}</span>
            <span className="stat-label">Uploaded</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalDestinations - uploadedCount}</span>
            <span className="stat-label">Remaining</span>
          </div>
          <div className="stat">
            <span className="stat-value">{progressPercent}%</span>
            <span className="stat-label">Complete</span>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions-card">
        <h2>📸 How to Upload Hero Images</h2>
        <ol>
          <li>Generate or source high-quality images for each destination (1920×1080)</li>
          <li>Name them exactly as shown below (e.g., <code>caribbean-HERO.jpg</code>)</li>
          <li>Upload directly to Vercel Blob at path: <code>destinations/{'{'}filename{'}'}</code></li>
          <li>Click "Refresh Status" to update the checklist</li>
        </ol>
        <div className="instruction-links">
          <button onClick={checkUploadedImages} className="btn-refresh" disabled={checkingImages}>
            {checkingImages ? 'Checking...' : 'Refresh Status'}
          </button>
        </div>
      </div>

      {/* Destinations by Region */}
      {Object.entries(destinationsByRegion).map(([region, dests]) => (
        <div key={region} className="region-section">
          <h2 className="region-title">
            {region}
            <span className="region-count">
              {dests.filter(d => uploadedImages.has(d.slug)).length} / {dests.length}
            </span>
          </h2>
          
          <div className="destinations-grid">
            {dests.map(dest => {
              const isUploaded = uploadedImages.has(dest.slug);
              
              return (
                <div 
                  key={dest.slug} 
                  className={`destination-card ${isUploaded ? 'uploaded' : 'pending'}`}
                >
                  <div className="destination-header">
                    <div className="destination-info">
                      <h3>{dest.name}</h3>
                      <p className="destination-description">{dest.description}</p>
                    </div>
                    <div className={`status-badge ${isUploaded ? 'success' : 'pending'}`}>
                      {isUploaded ? (
                        <>
                          <Check size={16} />
                          Uploaded
                        </>
                      ) : (
                        <>
                          <X size={16} />
                          Needed
                        </>
                      )}
                    </div>
                  </div>

                  <div className="destination-details">
                    <div className="detail-row">
                      <strong>Filename:</strong>
                      <code>{dest.heroFilename}</code>
                    </div>
                    <div className="detail-row">
                      <strong>Path:</strong>
                      <code>destinations/{dest.heroFilename}</code>
                    </div>
                    <div className="detail-row">
                      <strong>Dimensions:</strong>
                      <span>1920 × 1080 (16:9)</span>
                    </div>
                  </div>

                  {isUploaded && imageUrls[dest.slug] && (
                    <div className="destination-preview">
                      <img 
                        src={imageUrls[dest.slug]} 
                        alt={dest.name}
                        loading="lazy"
                      />
                      <a 
                        href={imageUrls[dest.slug]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-image-link"
                      >
                        <ExternalLink size={14} />
                        View Full Size
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Export List */}
      <div className="export-section">
        <h2>📋 Copy List for Image Generation</h2>
        <p>Copy this list to use with AI image generation or for your design team:</p>
        <div className="export-box">
          <pre>
            {destinations.map((d, i) => 
              `${i + 1}. ${d.name} (${d.slug})\n   ${d.description}\n   File: ${d.heroFilename}\n`
            ).join('\n')}
          </pre>
        </div>
        <button 
          onClick={() => {
            const text = destinations.map((d, i) => 
              `${i + 1}. ${d.name} (${d.slug}) - ${d.description} - File: ${d.heroFilename}`
            ).join('\n');
            navigator.clipboard.writeText(text);
            alert('List copied to clipboard!');
          }}
          className="btn-copy"
        >
          Copy to Clipboard
        </button>
      </div>

      {/* Quick Reference */}
      <div className="quick-reference">
        <h2>🎨 Image Guidelines</h2>
        <div className="guidelines-grid">
          <div className="guideline">
            <h4>Dimensions</h4>
            <p>1920 × 1080 pixels</p>
          </div>
          <div className="guideline">
            <h4>Aspect Ratio</h4>
            <p>16:9 (landscape)</p>
          </div>
          <div className="guideline">
            <h4>Format</h4>
            <p>JPEG (.jpg)</p>
          </div>
          <div className="guideline">
            <h4>Quality</h4>
            <p>85-90%</p>
          </div>
          <div className="guideline">
            <h4>Max Size</h4>
            <p>2MB per file</p>
          </div>
          <div className="guideline">
            <h4>Naming</h4>
            <p>{'{'}destination-slug{'}'}-HERO.jpg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDestinationHeroes;

