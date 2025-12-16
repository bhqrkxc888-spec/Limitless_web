import { useState } from 'react';
import { uploadImageToBlob, listBlobImages } from '../../lib/vercelBlob';
import logger from '../../utils/logger';
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      
      // Auto-suggest path based on filename
      if (!path) {
        setPath(`uploads/${selectedFile.name}`);
      }
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
          </div>

          <div className="form-group">
            <label htmlFor="path-input">Path (e.g., categories/home/hero.jpg):</label>
            <input
              id="path-input"
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="categories/home/hero.jpg"
              disabled={uploading}
            />
            <p className="help-text">
              Suggested paths:
              <br />- categories/about/image-name.jpg
              <br />- categories/home/hero.jpg
              <br />- destinations/caribbean/image.jpg
              <br />- cruise-lines/logo-name.png
            </p>
          </div>

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

