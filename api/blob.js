/**
 * Blob Upload API with Sharp Processing
 * Handles image uploads with automatic optimization and WebP conversion
 */

import { put } from '@vercel/blob';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Sizing rules based on asset type
const SIZING_RULES = {
  home_hero: { maxWidth: 2560 },
  og_image: { maxWidth: 1200, maxHeight: 630 },
  destination_hero: { maxWidth: 2560 },
  cruise_line_hero: { maxWidth: 2560 },
  cruise_line_card: { maxWidth: 1920 },
  ship_hero: { maxWidth: 2560 },
  ship_card: { maxWidth: 1920 },
  site_logo: { maxWidth: 1200 },
  cruise_line_logo: { maxWidth: 1200 },
  favicon: { maxWidth: 512, maxHeight: 512, fit: 'contain' },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = req.query.filename;
    const assetType = req.headers['x-asset-type'];

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Read raw body
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Detect file type
    const isSvg = filename.toLowerCase().endsWith('.svg') || 
                  buffer.toString('utf8', 0, 100).includes('<svg');

    let processedBuffer = buffer;
    let contentType = 'image/jpeg';
    let finalFilename = filename;

    if (isSvg) {
      // SVG: upload as-is
      processedBuffer = buffer;
      contentType = 'image/svg+xml';
      finalFilename = filename;
    } else {
      // Raster images: process with Sharp
      const sizingRule = SIZING_RULES[assetType] || { maxWidth: 2560 };
      
      let sharpInstance = sharp(buffer)
        .rotate() // Auto-rotate based on EXIF
        .withMetadata({ 
          exif: {}, // Strip EXIF but keep essential metadata
          icc: true, // Keep color profile
        });

      // Apply sizing based on asset type
      if (assetType === 'favicon') {
        // Favicon: square with contain fit
        sharpInstance = sharpInstance.resize(512, 512, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        });
      } else {
        // Other assets: resize with inside fit
        const resizeOptions = {
          width: sizingRule.maxWidth,
          height: sizingRule.maxHeight,
          fit: 'inside',
          withoutEnlargement: true,
        };
        sharpInstance = sharpInstance.resize(resizeOptions);
      }

      // Convert to WebP
      processedBuffer = await sharpInstance
        .webp({ quality: 92, effort: 6 })
        .toBuffer();

      contentType = 'image/webp';
      
      // Update filename extension to .webp
      const baseFilename = filename.replace(/\.[^.]+$/, '');
      finalFilename = `${baseFilename}.webp`;
    }

    // Upload to Vercel Blob
    const blob = await put(finalFilename, processedBuffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType,
    });

    return res.status(200).json({ 
      url: blob.url,
      size: processedBuffer.length,
      type: contentType,
    });

  } catch (error) {
    console.error('Error processing/uploading image:', error);
    return res.status(500).json({ 
      error: 'Upload failed',
      message: error.message,
    });
  }
}

