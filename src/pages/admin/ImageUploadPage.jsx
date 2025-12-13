import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Button } from '../../components/ui';
import { uploadImage, getPublicUrl, supabase } from '../../lib/supabase';
import { STORAGE_BUCKETS, UPLOAD_CONSTRAINTS, ENTITY_TYPES } from '../../config/supabaseConfig';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import './ImageUploadPage.css';

function ImageUploadPage() {
  const [selectedBucket, setSelectedBucket] = useState(STORAGE_BUCKETS.CRUISE_LINES);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState([]);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > UPLOAD_CONSTRAINTS.MAX_FILE_SIZE) {
        alert(`${file.name} is too large. Max size is 5MB.`);
        return false;
      }
      if (!UPLOAD_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
        alert(`${file.name} has invalid type. Only JPG, PNG, WebP allowed.`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending'
    }))]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS
    },
    multiple: true
  });

  const removeFile = (index) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const fileItem = files[i];
      const timestamp = Date.now();
      const fileName = `${timestamp}-${fileItem.file.name}`;
      const filePath = `${fileName}`;

      try {
        // Upload to storage
        const { data, error } = await uploadImage(fileItem.file, selectedBucket, filePath);

        if (error) throw error;

        // Get public URL
        const publicUrl = getPublicUrl(selectedBucket, filePath);

        // Insert into images table
        const { error: dbError } = await supabase
          .from('images')
          .insert([{
            bucket_name: selectedBucket,
            file_path: filePath,
            public_url: publicUrl,
            original_filename: fileItem.file.name,
            entity_type: ENTITY_TYPES.CRUISE_LINE, // Default, can be updated later
            metadata: {
              size: fileItem.file.size,
              type: fileItem.file.type,
              width: null, // Can be added with image processing
              height: null
            }
          }]);

        if (dbError) console.error('DB insert error:', dbError);

        results.push({
          fileName: fileItem.file.name,
          status: 'success',
          url: publicUrl
        });

        // Update file status
        setFiles(prev => {
          const newFiles = [...prev];
          newFiles[i].status = 'success';
          return newFiles;
        });

      } catch (error) {
        console.error('Upload error:', error);
        results.push({
          fileName: fileItem.file.name,
          status: 'error',
          error: error.message
        });

        setFiles(prev => {
          const newFiles = [...prev];
          newFiles[i].status = 'error';
          return newFiles;
        });
      }
    }

    setUploadResults(results);
    setUploading(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Upload Images</h1>
            <p>Upload cruise line, destination, or category images to Supabase Storage</p>
          </div>
          <Button onClick={() => navigate('/admin/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="admin-container">
        <div className="upload-section">
          <div className="bucket-selector">
            <label>Select Storage Bucket:</label>
            <select 
              value={selectedBucket} 
              onChange={(e) => setSelectedBucket(e.target.value)}
              disabled={uploading}
            >
              <option value={STORAGE_BUCKETS.CRUISE_LINES}>Cruise Lines</option>
              <option value={STORAGE_BUCKETS.DESTINATIONS}>Destinations</option>
              <option value={STORAGE_BUCKETS.CATEGORIES}>Categories</option>
            </select>
          </div>

          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}>
            <input {...getInputProps()} />
            <Upload size={48} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <>
                <p>Drag & drop images here, or click to select</p>
                <p className="dropzone-hint">JPG, PNG, WebP up to 5MB each</p>
              </>
            )}
          </div>

          {files.length > 0 && (
            <div className="files-preview">
              <div className="files-header">
                <h3>{files.length} file(s) ready</h3>
                {!uploading && (
                  <div className="files-actions">
                    <Button onClick={() => setFiles([])} variant="outline" size="sm">
                      Clear All
                    </Button>
                    <Button onClick={handleUpload} variant="primary" size="sm">
                      Upload All
                    </Button>
                  </div>
                )}
              </div>

              <div className="files-grid">
                {files.map((fileItem, index) => (
                  <div key={index} className="file-card">
                    <div className="file-preview">
                      <img src={fileItem.preview} alt={fileItem.file.name} />
                      {fileItem.status === 'success' && (
                        <div className="file-status file-status-success">
                          <Check size={20} />
                        </div>
                      )}
                      {fileItem.status === 'error' && (
                        <div className="file-status file-status-error">
                          <AlertCircle size={20} />
                        </div>
                      )}
                    </div>
                    <div className="file-info">
                      <p className="file-name">{fileItem.file.name}</p>
                      <p className="file-size">{(fileItem.file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    {!uploading && fileItem.status === 'pending' && (
                      <button onClick={() => removeFile(index)} className="file-remove">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadResults.length > 0 && (
            <div className="upload-results">
              <h3>Upload Results</h3>
              {uploadResults.map((result, index) => (
                <div key={index} className={`result-item result-${result.status}`}>
                  {result.status === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                  <span>{result.fileName}</span>
                  {result.status === 'error' && <span className="error-message">{result.error}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUploadPage;

