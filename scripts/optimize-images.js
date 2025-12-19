#!/usr/bin/env node

/**
 * Batch Image Optimizer
 * Resizes and converts images to WebP format
 * 
 * Usage:
 *   node scripts/optimize-images.js <input-folder> [output-folder] [options]
 * 
 * Options:
 *   --width <pixels>     Max width (default: 1920 for hero, 800 for others)
 *   --height <pixels>    Max height (default: 1080 for hero, 600 for others)
 *   --quality <1-100>    WebP quality (default: 85)
 *   --type <hero|card>   Image type (default: auto-detect from dimensions)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Default settings
const DEFAULTS = {
  hero: { width: 1920, height: 1080, quality: 85 },
  card: { width: 800, height: 600, quality: 85 },
  destination: { width: 800, height: 600, quality: 85 }
};

// Parse command line arguments
const args = process.argv.slice(2);
const inputDir = args[0];
const outputDir = args[1] || inputDir + '_optimized';
const options = {
  width: parseInt(args[args.indexOf('--width') + 1]) || null,
  height: parseInt(args[args.indexOf('--height') + 1]) || null,
  quality: parseInt(args[args.indexOf('--quality') + 1]) || 85,
  type: args[args.indexOf('--type') + 1] || 'auto'
};

if (!inputDir) {
  console.error('❌ Error: Input folder required');
  console.log('\nUsage:');
  console.log('  node scripts/optimize-images.js <input-folder> [output-folder] [options]');
  console.log('\nOptions:');
  console.log('  --width <pixels>     Max width (default: auto)');
  console.log('  --height <pixels>   Max height (default: auto)');
  console.log('  --quality <1-100>   WebP quality (default: 85)');
  console.log('  --type <hero|card>  Image type (default: auto-detect)');
  console.log('\nExamples:');
  console.log('  node scripts/optimize-images.js ./images');
  console.log('  node scripts/optimize-images.js ./images ./output --width 1920 --height 1080 --quality 80');
  console.log('  node scripts/optimize-images.js ./images ./output --type hero');
  process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];

// Get all image files
function getImageFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_FORMATS.includes(ext);
  });
}

// Determine image type from dimensions
function detectImageType(width, height) {
  const ratio = width / height;
  if (width >= 1800 && height >= 1000) {
    return 'hero';
  } else if (width >= 700 || height >= 500) {
    return 'card';
  }
  return 'destination';
}

// Process a single image
async function processImage(inputPath, outputPath, file) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const { width: originalWidth, height: originalHeight, format } = metadata;
    
    // Determine resize dimensions
    const imageType = options.type === 'auto' 
      ? detectImageType(originalWidth, originalHeight)
      : options.type;
    
    const settings = DEFAULTS[imageType] || DEFAULTS.destination;
    const maxWidth = options.width || settings.width;
    const maxHeight = options.height || settings.height;
    const quality = options.quality || settings.quality;
    
    // Calculate new dimensions (maintain aspect ratio)
    let newWidth = originalWidth;
    let newHeight = originalHeight;
    
    if (originalWidth > maxWidth || originalHeight > maxHeight) {
      const widthRatio = maxWidth / originalWidth;
      const heightRatio = maxHeight / originalHeight;
      const ratio = Math.min(widthRatio, heightRatio);
      
      newWidth = Math.round(originalWidth * ratio);
      newHeight = Math.round(originalHeight * ratio);
    }
    
    // Process image
    await sharp(inputPath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: quality,
        effort: 6 // Higher effort = better compression (0-6)
      })
      .toFile(outputPath);
    
    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${file}`);
    console.log(`   ${originalWidth}x${originalHeight} → ${newWidth}x${newHeight}`);
    console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);
    
    return { originalSize, newSize, reduction: parseFloat(reduction) };
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    return null;
  }
}

// Main processing function
async function main() {
  console.log('🖼️  Batch Image Optimizer\n');
  console.log(`Input:  ${inputDir}`);
  console.log(`Output: ${outputDir}`);
  console.log(`Quality: ${options.quality}\n`);
  
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Error: Input folder "${inputDir}" does not exist`);
    process.exit(1);
  }
  
  const files = getImageFiles(inputDir);
  
  if (files.length === 0) {
    console.log('⚠️  No image files found in input folder');
    process.exit(0);
  }
  
  console.log(`Found ${files.length} image(s) to process...\n`);
  
  const results = [];
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputName = path.parse(file).name + '.webp';
    const outputPath = path.join(outputDir, outputName);
    
    const result = await processImage(inputPath, outputPath, file);
    if (result) {
      results.push(result);
    }
    console.log('');
  }
  
  // Summary
  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
    const avgReduction = results.reduce((sum, r) => sum + r.reduction, 0) / results.length;
    
    console.log('📊 Summary:');
    console.log(`   Processed: ${results.length} image(s)`);
    console.log(`   Total size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Average reduction: ${avgReduction.toFixed(1)}%`);
    console.log(`\n✅ Optimized images saved to: ${outputDir}`);
  }
}

// Run
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

