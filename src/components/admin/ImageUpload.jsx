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
 */

import { useState, useRef, useEffect } from 'react';
import { Upload, X, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
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
  
  const fileInputRef = useRef(null);

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

    setFile(selectedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

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
        // site/hero.webp, site/logo.webp, site/team/001.webp
        if (imageType.startsWith('team-')) {
          const teamNumber = imageType.split('-')[1] || '001';
          return `team/${teamNumber}.${ext}`;
        }
        return `${imageType}.${ext}`;

      case 'destination':
        // destinations/{slug}/hero.webp
        return `${entityId}/${imageType}.${ext}`;

      case 'cruise-line':
        // cruise-lines/{slug}/logo.webp
        return `${entityId}/${imageType}.${ext}`;

      case 'ship':
        // cruise-lines/{cruise-line-slug}/ships/{ship-slug}/{type}.webp
        // entityId should be: '{cruise-line-slug}/ships/{ship-slug}'
        return `${entityId}/${imageType}.${ext}`;

      case 'category':
        // categories/{category-slug}.webp
        return `${entityId}.${ext}`;

      case 'team':
        // site/team/{number}.webp
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
        // Don't fail upload if metadata storage fails
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

      // Reset form
      setTimeout(() => {
        setFile(null);
        setValidationResult(null);
        setUploading(false);
        setUploadProgress(0);
        setPreview(publicUrl);
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
    setFile(null);
    setPreview(existingImage);
    setValidationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get expected dimensions for display
  const expectedDims = getExpectedDimensions(entityType, imageType);

  return (
    <div className={`image-upload ${className}`}>
      {/* Expected specs display */}
      {expectedDims && (
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
        {preview ? (
          <div className="upload-preview">
            <img src={preview} alt="Preview" />
            {file && (
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
            )}
          </div>
        ) : (
          <div className="upload-placeholder">
            <Upload size={48} />
            <p>Drag & drop image here, or click to select</p>
            <span className="upload-hint">Supports JPG, PNG, WebP</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* File info and validation */}
      {file && (
        <div className="upload-info">
          <div className="file-details">
            <strong>{file.name}</strong>
            <span className="file-size">
              {(file.size / 1024).toFixed(0)} KB
            </span>
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
            <span className="input-hint">
              Required for accessibility and SEO ({altText.length} characters)
            </span>
          </div>

          {/* Validation results */}
          {validationResult && (
            <div className="validation-results">
              <h4>Validation Results:</h4>
              {validationResult.validations.map((validation, index) => (
                <div key={index} className={`validation-item validation-${validation.status}`}>
                  {validation.status === 'pass' && <CheckCircle size={16} />}
                  {validation.status === 'warning' && <AlertTriangle size={16} />}
                  {validation.status === 'error' && <X size={16} />}
                  <span>{validation.message}</span>
                </div>
              ))}
              
              <div className="validation-summary">
                <StatusIndicator 
                  status={validationResult.status} 
                  warnings={validationResult.warnings}
                  showDetails
                />
              </div>
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
                  <Loader size={16} className="spinning" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;

