/**
 * Image Upload Component
 * 
 * Features:
 * - Drag-drop or file picker
 * - Real-time validation (file size, dimensions, format, ALT text)
 * - Auto-rename based on entity + type
 * - Preview before upload
 * - Progress indicator
 * - Uploads to Supabase Storage
 * - Stores metadata in site_images table
 * - Shows stats for existing images
 * - Copy URL button
 */

import { useState, useRef, useEffect } from 'react';
import { Upload, X, AlertTriangle, CheckCircle, Loader, Copy, Check } from 'lucide-react';
import { supabase, uploadImage, getPublicUrl } from '../../lib/supabase';
import { validateImage, getExpectedDimensions } from '../../utils/imageValidation';
import StatusIndicator from './StatusIndicator';
import { logger } from '../../utils/logger';
import './ImageUpload.css';

function ImageUpload({
  bucket,
  entityType,
  entityId,
  imageType,
  suggestedAltText = '',
  onUploadComplete,
  onUploadError,
  existingImage = null,
  existingData = null,
  autoRename = true,
  className = ''
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(existingImage);
  const [altText, setAltText] = useState(suggestedAltText);
  const [validationResult, setValidationResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);

  // Update preview when existingImage changes (only if no file selected)
  useEffect(() => {
    if (!file && existingImage) {
      // Clean up previous blob URL if it exists
      if (previewRef.current && previewRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previewRef.current);
      }
      setPreview(existingImage);
      previewRef.current = existingImage;
    }
    
    // Cleanup function to revoke blob URLs on unmount
    return () => {
      if (previewRef.current && previewRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, [existingImage, file]);

  // Update alt text when suggested changes
  useEffect(() => {
    if (suggestedAltText && !altText) {
      setAltText(suggestedAltText);
    }
  }, [suggestedAltText, altText]);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;

    // Clean up previous object URL if it was a file preview (not existingImage)
    if (previewRef.current && previewRef.current.startsWith('blob:')) {
      URL.revokeObjectURL(previewRef.current);
    }

    setFile(selectedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    previewRef.current = objectUrl;

    // Validate image
    try {
      const validation = await validateImage(selectedFile, {
        entityType,
        imageType,
        altText: altText || suggestedAltText
      });
      setValidationResult(validation);
    } catch (error) {
      logger.error('Validation error:', error);
      setValidationResult({
        valid: false,
        status: 'error',
        validations: [{ status: 'error', message: 'Validation failed' }]
      });
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    } else {
      // Reset file input if no file selected
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle ALT text change
  const handleAltTextChange = async (e) => {
    const newAltText = e.target.value;
    setAltText(newAltText);

    // Re-validate with new ALT text
    if (file) {
      try {
        const validation = await validateImage(file, {
          entityType,
          imageType,
          altText: newAltText
        });
        setValidationResult(validation);
      } catch (error) {
        logger.error('Validation error:', error);
      }
    }
  };

  // Generate file path based on entity structure
  const generateFilePath = () => {
    if (!autoRename) {
      return file.name;
    }

    // Determine file extension
    const ext = file.name.split('.').pop().toLowerCase();

    // Generate path based on entity type
    switch (entityType) {
      case 'site':
        if (imageType.startsWith('team-')) {
          const teamNumber = imageType.split('-')[1] || '001';
          return `team/${teamNumber}.${ext}`;
        }
        return `${imageType}.${ext}`;

      case 'destination':
        return `${entityId}/${imageType}.${ext}`;

      case 'cruise-line':
        return `${entityId}/${imageType}.${ext}`;

      case 'ship':
        return `${entityId}/${imageType}.${ext}`;

      case 'category':
        return `${entityId}.${ext}`;

      case 'team':
        return `team/${entityId}.${ext}`;

      default:
        return `${entityId}/${imageType}.${ext}`;
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (!file || !validationResult) {
      return;
    }

    // Block upload if validation has errors
    if (validationResult.status === 'error') {
      onUploadError?.({
        message: 'Please fix validation errors before uploading',
        errors: validationResult.validations.filter(v => v.status === 'error')
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Generate file path
      const filePath = generateFilePath();
      
      // Upload to Supabase Storage
      const { error: uploadError } = await uploadImage(file, bucket, filePath);

      if (uploadError) throw uploadError;

      setUploadProgress(50);

      // Get public URL
      const publicUrl = getPublicUrl(bucket, filePath);

      setUploadProgress(75);

      // Store metadata in site_images table
      const { error: metadataError } = await supabase
        .from('site_images')
        .upsert({
          bucket,
          path: filePath,
          entity_type: entityType,
          entity_id: entityId,
          image_type: imageType,
          alt_text: altText,
          width: validationResult.details.dimensions?.actual?.width,
          height: validationResult.details.dimensions?.actual?.height,
          file_size: validationResult.details.fileSize?.fileSize,
          format: file.type.split('/')[1],
          seo_compliant: validationResult.seoCompliant,
          validation_warnings: validationResult.warnings.length > 0 
            ? JSON.stringify(validationResult.warnings) 
            : null
        }, {
          onConflict: 'bucket,path'
        });

      if (metadataError) {
        logger.warn('Failed to store metadata:', metadataError);
      }

      setUploadProgress(100);

      // Notify parent component
      onUploadComplete?.({
        url: publicUrl,
        path: filePath,
        bucket,
        metadata: {
          altText,
          width: validationResult.details.dimensions?.actual?.width,
          height: validationResult.details.dimensions?.actual?.height,
          fileSize: validationResult.details.fileSize?.fileSize,
          format: file.type.split('/')[1],
          seoCompliant: validationResult.seoCompliant,
          warnings: validationResult.warnings
        }
      });

      // Clean up object URL before resetting
      if (previewRef.current && previewRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previewRef.current);
      }

      // Reset form
      setTimeout(() => {
        setFile(null);
        setValidationResult(null);
        setUploading(false);
        setUploadProgress(0);
        setPreview(publicUrl);
        previewRef.current = publicUrl;
      }, 1000);

    } catch (error) {
      logger.error('Upload error:', error);
      setUploading(false);
      setUploadProgress(0);
      onUploadError?.({
        message: error.message || 'Upload failed',
        error
      });
    }
  };

  // Clear selection
  const handleClear = () => {
    // Clean up object URL if it was a file preview
    if (previewRef.current && previewRef.current.startsWith('blob:')) {
      URL.revokeObjectURL(previewRef.current);
    }
    
    setFile(null);
    setPreview(existingImage);
    previewRef.current = existingImage;
    setValidationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    if (existingImage) {
      try {
        await navigator.clipboard.writeText(existingImage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        logger.error('Copy failed:', err);
      }
    }
  };

  // Get expected dimensions for display
  const expectedDims = getExpectedDimensions(entityType, imageType);

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={`image-upload ${className} ${file ? 'has-selection' : ''}`}>
      {/* When there's an existing image but no new file selected */}
      {existingImage && !file && (
        <div className="existing-image">
          <div className="existing-preview">
            <img src={preview} alt="Current" />
          </div>
          <div className="existing-details">
            {existingData && (
              <div className="existing-stats">
                <div className="stat-row">
                  <span className="stat-label">Dimensions:</span>
                  <span className="stat-value">
                    {existingData.width && existingData.height 
                      ? `${existingData.width}×${existingData.height}px` 
                      : '-'}
                  </span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">File size:</span>
                  <span className="stat-value">{formatFileSize(existingData.file_size)}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Format:</span>
                  <span className="stat-value">{existingData.format?.toUpperCase() || '-'}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">ALT text:</span>
                  <span className="stat-value">{existingData.alt_text || '-'}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Status:</span>
                  <StatusIndicator 
                    status={existingData.seo_compliant ? 'pass' : 'warning'} 
                    size="small" 
                  />
                </div>
              </div>
            )}
            <div className="existing-actions">
              <button 
                type="button" 
                className="btn-copy"
                onClick={handleCopyUrl}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                type="button"
                className="btn-replace"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} />
                Replace Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* When selecting a new file OR no existing image */}
      {(file || !existingImage) && (
        <>
          {/* Expected specs display */}
          {expectedDims && !file && (
            <div className="upload-specs">
              <strong>Required:</strong> {expectedDims.width}×{expectedDims.height}px, WebP format preferred
            </div>
          )}

          {/* Drop zone */}
          <div
            className={`upload-dropzone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            {preview && file ? (
              <div className="upload-preview">
                <img src={preview} alt="Preview" />
                <button
                  type="button"
                  className="preview-clear"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <Upload size={40} />
                <p>Drag & drop image here</p>
                <span className="upload-hint">or click to select • JPG, PNG, WebP</span>
              </div>
            )}
          </div>

          {/* File info and validation */}
          {file && (
            <div className="upload-info">
              <div className="file-details">
                <strong>{file.name}</strong>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>

              {/* ALT text input */}
              <div className="alt-text-input">
                <label htmlFor={`alt-${imageType}`}>
                  ALT Text <span className="required">*</span>
                </label>
                <input
                  id={`alt-${imageType}`}
                  type="text"
                  value={altText}
                  onChange={handleAltTextChange}
                  placeholder="Describe the image for accessibility and SEO"
                  className={validationResult?.validations.find(v => v.message.includes('ALT'))?.status === 'error' ? 'error' : ''}
                />
              </div>

              {/* Validation results */}
              {validationResult && (
                <div className="validation-results">
                  <h4>Validation:</h4>
                  {validationResult.validations.map((validation, index) => (
                    <div key={index} className={`validation-item validation-${validation.status}`}>
                      {validation.status === 'pass' && <CheckCircle size={14} />}
                      {validation.status === 'warning' && <AlertTriangle size={14} />}
                      {validation.status === 'error' && <X size={14} />}
                      <span>{validation.message}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload button */}
              <div className="upload-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleClear}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleUpload}
                  disabled={!validationResult || validationResult.status === 'error' || uploading}
                >
                  {uploading ? (
                    <>
                      <Loader size={14} className="spinning" />
                      {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageUpload;
