import { useState } from 'react';
import { uploadImageToBlob, listBlobImages } from '../../lib/vercelBlob';
import { logger } from '../../utils/logger';
import { generateImageFilename } from '../../utils/imageNaming';
import './AdminImageUpload.css';

/**
 * Admin Image Upload Page
 * Upload images to Vercel Blob Storage
 */
function AdminImageUpload() {
  const [file, setFile] = useState(null);
  const [path, setPath] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  const [dimensionWarning, setDimensionWarning] = useState(null);
  const [imageType, setImageType] = useState('card');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setDimensionWarning(null);
      setImageInfo(null);
      
      // Don't auto-set path, let user choose type first
      // Path will be suggested based on image type selection
      
      // Check image dimensions
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const aspectRatio = (width / height).toFixed(2);
          const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
          
          setImageInfo({
            width,
            height,
            aspectRatio,
            fileSizeMB
          });
          
          // Check against common requirements
          const warnings = [];
          
          // Check file size
          if (selectedFile.size > 2 * 1024 * 1024) {
            warnings.push(`⚠️ File size (${fileSizeMB}MB) exceeds 2MB recommended maximum`);
          }
          
          // Check aspect ratios
          const ratio16_9 = (16 / 9).toFixed(2); // 1.78
          const ratio1_1 = 1.00;
          const ratio4_3 = (4 / 3).toFixed(2); // 1.33
          const ratio2_1 = 2.00;
          
          const isOfferCard = Math.abs(aspectRatio - ratio16_9) < 0.05;
          const isSquare = Math.abs(aspectRatio - ratio1_1) < 0.05;
          const isDestination = Math.abs(aspectRatio - ratio4_3) < 0.05;
          const isLogo = Math.abs(aspectRatio - ratio2_1) < 0.05;
          
          // Auto-detect and suggest type
          if (isOfferCard) {
            if (width >= 1900 && height >= 1000) {
              setImageType('hero');
              warnings.push(`✅ Perfect for hero images (16:9, high resolution)`);
            } else if (width >= 1600 && height >= 900) {
              setImageType('card');
              warnings.push(`✅ Perfect for card images (16:9 aspect ratio)`);
            } else {
              warnings.push(`⚠️ Image resolution too low. Need 1600×900 for cards or 1920×1080 for hero`);
            }
          } else if (isSquare) {
            if (width < 1080) {
              warnings.push(`⚠️ Square images should be at least 1080×1080px (current: ${width}×${height})`);
            } else {
              setImageType('card');
              warnings.push(`ℹ️ Square image (1:1) - CRM will auto-crop to 16:9 for offer cards`);
            }
          } else if (isDestination) {
            warnings.push(`ℹ️ 4:3 aspect ratio - suitable for destination cards`);
          } else if (isLogo) {
            warnings.push(`ℹ️ 2:1 aspect ratio - suitable for cruise line logos`);
          } else {
            warnings.push(`⚠️ Unusual aspect ratio (${aspectRatio}:1). Recommended: 16:9 for offers, 1:1 for social media, 4:3 for destinations`);
          }
          
          if (warnings.length > 0) {
            setDimensionWarning(warnings.join('\n'));
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    if (!path) {
      setError('Please enter a path');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadedUrl(null);

    try {
      const { url, error: uploadError } = await uploadImageToBlob(file, path);
      
      if (uploadError) {
        throw uploadError;
      }

      setUploadedUrl(url);
      logger.info('Image uploaded successfully:', url);
      
      // Reset form
      setFile(null);
      setPath('');
      if (document.getElementById('file-input')) {
        document.getElementById('file-input').value = '';
      }
      
      // Refresh image list
      loadImages();
    } catch (err) {
      setError(err.message || 'Upload failed');
      logger.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const loadImages = async () => {
    setLoading(true);
    try {
      const blobs = await listBlobImages();
      setImages(blobs);
    } catch (err) {
      logger.error('Error loading images:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="admin-image-upload">
      <div className="admin-header">
        <h1>Image Upload - Vercel Blob</h1>
        <p>Upload images to Vercel Blob Storage</p>
      </div>

      {/* Image Guidelines */}
      <div className="guidelines-section">
        <h2>📐 Image Size Guidelines</h2>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h3>Offer Images</h3>
            <p><strong>1600 × 900px</strong> (16:9)</p>
            <p className="guideline-note">Card images for homepage & listings</p>
          </div>
          <div className="guideline-card">
            <h3>Cruise Line Logos</h3>
            <p><strong>400 × 200px</strong> (2:1)</p>
            <p className="guideline-note">PNG with transparent background</p>
          </div>
          <div className="guideline-card">
            <h3>Hero Images</h3>
            <p><strong>1920 × 1080px</strong> (16:9)</p>
            <p className="guideline-note">Detail page hero banners</p>
          </div>
          <div className="guideline-card">
            <h3>Destination Cards</h3>
            <p><strong>800 × 600px</strong> (4:3)</p>
            <p className="guideline-note">Hub thumbnails</p>
          </div>
        </div>
        <p className="guidelines-footer">
          <strong>Important:</strong> Keep important content centered - edges may be cropped. 
          <br />
          <a href="/docs/IMAGE_UPLOAD_GUIDELINES.md" target="_blank" rel="noopener noreferrer">
            View full guidelines →
          </a>
        </p>
      </div>

      <div className="upload-section">
        <h2>Upload New Image</h2>
        
        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-group">
            <label htmlFor="file-input">Select Image:</label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {file && <p className="file-info">Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)</p>}
            {imageInfo && (
              <div className="image-dimension-info">
                <strong>Image Info:</strong>
                <ul>
                  <li><strong>Dimensions:</strong> {imageInfo.width} × {imageInfo.height}px</li>
                  <li><strong>Aspect Ratio:</strong> {imageInfo.aspectRatio}:1</li>
                  <li><strong>File Size:</strong> {imageInfo.fileSizeMB}MB</li>
                </ul>
              </div>
            )}
            {dimensionWarning && (
              <div className={dimensionWarning.includes('✅') ? 'dimension-success' : dimensionWarning.includes('⚠️') ? 'dimension-warning' : 'dimension-info'}>
                {dimensionWarning.split('\n').map((warning, i) => (
                  <div key={i}>{warning}</div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="type-select">Image Type:</label>
            <select
              id="type-select"
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              disabled={uploading}
              className="image-type-select"
            >
              <option value="card">Card Image (1600×900 - for listings/carousel)</option>
              <option value="hero">Hero Image (1920×1080 - for detail pages)</option>
              <option value="other">Other (custom path)</option>
            </select>
            <p className="help-text">
              {imageType === 'card' && '📸 Card images appear in offer listings and homepage carousel'}
              {imageType === 'hero' && '🖼️ Hero images appear at top of detail pages'}
              {imageType === 'other' && '📁 Custom path for logos, destinations, etc.'}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="offer-name">Offer Name (for auto-naming):</label>
            <input
              id="offer-name"
              type="text"
              placeholder="e.g., Norwegian Fjords Cruise"
              onChange={(e) => {
                const offerName = e.target.value;
                if (offerName && file && imageType !== 'other') {
                  const filename = generateImageFilename(offerName, imageType);
                  setPath(`offers/${filename}`);
                }
              }}
              disabled={uploading || imageType === 'other'}
            />
            <p className="help-text">
              {imageType !== 'other' 
                ? `Auto-generates filename: offer-name-${imageType.toUpperCase()}.jpg` 
                : 'Enter custom path below for non-offer images'}
            </p>
          </div>

          {imageType === 'other' && (
            <div className="form-group">
              <label htmlFor="path-input">Custom Path:</label>
              <input
                id="path-input"
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="destinations/caribbean-image.jpg"
                disabled={uploading}
              />
              <p className="help-text">
                Examples:
                <br />- destinations/caribbean-sunset.jpg
                <br />- cruise-lines/cunard-logo.png
                <br />- categories/home/hero.jpg
              </p>
            </div>
          )}

          {imageType !== 'other' && path && (
            <div className="path-preview">
              <strong>Upload Path:</strong> <code>{path}</code>
            </div>
          )}

          <button 
            type="submit" 
            disabled={uploading || !file || !path}
            className="upload-button"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {uploadedUrl && (
          <div className="success-message">
            <h3>✅ Upload Successful!</h3>
            <p><strong>URL:</strong></p>
            <div className="url-display">
              <code>{uploadedUrl}</code>
              <button onClick={() => copyToClipboard(uploadedUrl)} className="copy-button">
                Copy URL
              </button>
            </div>
            <p className="help-text">
              Use this URL in your data files (cruiseLines.js, destinations.js, etc.)
            </p>
          </div>
        )}
      </div>

      <div className="images-section">
        <div className="section-header">
          <h2>Uploaded Images</h2>
          <button onClick={loadImages} disabled={loading} className="refresh-button">
            {loading ? 'Loading...' : 'Refresh List'}
          </button>
        </div>

        {images.length > 0 ? (
          <div className="images-grid">
            {images.map((blob) => (
              <div key={blob.url} className="image-card">
                <img src={blob.url} alt={blob.pathname} className="image-preview" />
                <div className="image-info">
                  <p className="image-path">{blob.pathname}</p>
                  <p className="image-size">{(blob.size / 1024).toFixed(2)} KB</p>
                  <button onClick={() => copyToClipboard(blob.url)} className="copy-button-small">
                    Copy URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-images">No images uploaded yet. Upload your first image above!</p>
        )}
      </div>
    </div>
  );
}

export default AdminImageUpload;

