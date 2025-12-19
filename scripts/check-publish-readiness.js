#!/usr/bin/env node

/**
 * Publish Readiness Checker
 * 
 * Scans the codebase and reports on the current publish status
 * and what's needed to publish each draft section.
 * 
 * Usage:
 *   node scripts/check-publish-readiness.js
 *   node scripts/check-publish-readiness.js --json
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const jsonOutput = args.includes('--json');

// Load publish status
async function loadPublishStatus() {
  const publishStatusModule = await import('../src/config/publishStatus.js');
  return publishStatusModule.PUBLISH_STATUS;
}

// Load data files
async function loadDataFiles() {
  const cruiseLinesModule = await import('../src/data/cruiseLines.js');
  const destinationsModule = await import('../src/data/destinations.js');
  const bucketListModule = await import('../src/data/bucketList.js');
  const cruiseTypesModule = await import('../src/data/cruiseTypes.js');

  return {
    cruiseLines: cruiseLinesModule.cruiseLines || [],
    destinations: destinationsModule.destinations || [],
    bucketList: bucketListModule.bucketListExperiences || [],
    cruiseTypes: cruiseTypesModule.cruiseTypes || [],
  };
}

// Check if images exist (basic URL validation)
function checkImageUrl(url) {
  if (!url) return { valid: false, issue: 'Missing image URL' };
  if (url.includes('placeholder') || url.includes('via.placeholder')) {
    return { valid: false, issue: 'Using placeholder image' };
  }
  if (!url.startsWith('http')) {
    return { valid: false, issue: 'Invalid image URL format' };
  }
  return { valid: true };
}

// Check data completeness for a section
function checkDataCompleteness(items, requiredFields) {
  const issues = [];
  
  items.forEach((item, index) => {
    const itemIssues = [];
    
    requiredFields.forEach(field => {
      const value = field.includes('.') 
        ? field.split('.').reduce((obj, key) => obj?.[key], item)
        : item[field];
      
      if (!value || (Array.isArray(value) && value.length === 0)) {
        itemIssues.push(`Missing ${field}`);
      }
    });
    
    // Check images
    if (item.image) {
      const imgCheck = checkImageUrl(item.image);
      if (!imgCheck.valid) {
        itemIssues.push(imgCheck.issue);
      }
    }
    
    if (item.heroImage) {
      const imgCheck = checkImageUrl(item.heroImage);
      if (!imgCheck.valid) {
        itemIssues.push(`Hero: ${imgCheck.issue}`);
      }
    }
    
    if (itemIssues.length > 0) {
      issues.push({
        item: item.slug || item.id || `Item ${index + 1}`,
        issues: itemIssues
      });
    }
  });
  
  return issues;
}

// Check if page component exists and has SEO
function checkPageComponent(pagePath) {
  const fullPath = join(__dirname, '..', pagePath);
  if (!existsSync(fullPath)) {
    return { exists: false, hasSEO: false };
  }
  
  const content = readFileSync(fullPath, 'utf-8');
  const hasSEO = content.includes('import SEO') || content.includes('from \'../components/SEO');
  const hasTitle = content.includes('title=');
  const hasDescription = content.includes('description=');
  const hasCanonical = content.includes('canonical=');
  
  return {
    exists: true,
    hasSEO,
    hasTitle,
    hasDescription,
    hasCanonical,
    hasStructuredData: content.includes('structuredData=')
  };
}

// Main analysis
async function analyzePublishReadiness() {
  const status = await loadPublishStatus();
  const data = await loadDataFiles();
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      published: [],
      preview: [],
      draft: [],
      protected: []
    },
    sections: {}
  };
  
  // Categorize sections
  Object.entries(status).forEach(([key, value]) => {
    report.summary[value].push(key);
  });
  
  // Analyze draft sections
  const draftSections = report.summary.draft;
  
  for (const section of draftSections) {
    const sectionReport = {
      status: 'draft',
      dataCount: 0,
      issues: [],
      readiness: 'unknown'
    };
    
    // Check each section
    switch (section) {
      case 'destinations':
        sectionReport.dataCount = data.destinations.length;
        sectionReport.hubPage = checkPageComponent('src/pages/DestinationsPage.jsx');
        sectionReport.detailPage = checkPageComponent('src/templates/DestinationPage.jsx');
        sectionReport.dataIssues = checkDataCompleteness(data.destinations, [
          'slug', 'name', 'description', 'image', 'meta.title', 'meta.description'
        ]);
        break;
        
      case 'cruiseLines':
        sectionReport.dataCount = data.cruiseLines.length;
        sectionReport.hubPage = checkPageComponent('src/pages/CruiseLinesPage.jsx');
        sectionReport.detailPage = checkPageComponent('src/templates/CruiseLinePage.jsx');
        sectionReport.dataIssues = checkDataCompleteness(data.cruiseLines, [
          'slug', 'name', 'description', 'image', 'logo', 'meta.title', 'meta.description'
        ]);
        break;
        
      case 'cruiseTypes':
        sectionReport.dataCount = data.cruiseTypes.length;
        sectionReport.hubPage = checkPageComponent('src/pages/CruiseTypesPage.jsx');
        sectionReport.detailPage = checkPageComponent('src/templates/CategoryPage.jsx');
        sectionReport.dataIssues = checkDataCompleteness(data.cruiseTypes, [
          'slug', 'name', 'description', 'image', 'meta.title', 'meta.description'
        ]);
        break;
        
      case 'bucketList':
        sectionReport.dataCount = data.bucketList.length;
        sectionReport.hubPage = checkPageComponent('src/pages/BucketListPage.jsx');
        sectionReport.detailPage = checkPageComponent('src/templates/BucketListExperiencePage.jsx');
        sectionReport.dataIssues = checkDataCompleteness(data.bucketList, [
          'slug', 'title', 'description', 'heroImage', 'meta.title', 'meta.description'
        ]);
        break;
        
      case 'cruiseGuides':
        sectionReport.hubPage = checkPageComponent('src/pages/CruiseGuidesPage.jsx');
        sectionReport.detailPage = checkPageComponent('src/pages/CruiseGuideDetailPage.jsx');
        sectionReport.dataSource = 'Supabase (cruise_guides table)';
        sectionReport.notes = 'Requires Supabase credentials to fetch data';
        break;
        
      case 'faq':
        sectionReport.hubPage = checkPageComponent('src/pages/FAQPage.jsx');
        sectionReport.dataSource = 'Hardcoded in component';
        sectionReport.notes = 'FAQ data is embedded in the page component';
        break;
        
      case 'testimonials':
        sectionReport.hubPage = checkPageComponent('src/pages/TestimonialsPage.jsx');
        sectionReport.dataSource = 'Hardcoded in component';
        sectionReport.notes = 'Has TODO comment: "Replace placeholder testimonials with real customer reviews"';
        break;
    }
    
    // Determine readiness
    const hasPageIssues = sectionReport.hubPage && !sectionReport.hubPage.hasSEO;
    const hasDataIssues = sectionReport.dataIssues && sectionReport.dataIssues.length > 0;
    
    if (!hasPageIssues && !hasDataIssues) {
      sectionReport.readiness = 'ready';
    } else if (hasDataIssues && sectionReport.dataIssues.length < 3) {
      sectionReport.readiness = 'mostly-ready';
    } else {
      sectionReport.readiness = 'needs-work';
    }
    
    report.sections[section] = sectionReport;
  }
  
  return report;
}

// Format output
function formatOutput(report) {
  if (jsonOutput) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('PUBLISH READINESS REPORT');
  console.log('='.repeat(70));
  console.log(`Generated: ${new Date(report.timestamp).toLocaleString()}\n`);
  
  // Summary
  console.log('📊 CURRENT STATUS SUMMARY\n');
  console.log(`✅ Published: ${report.summary.published.length} sections`);
  report.summary.published.forEach(s => console.log(`   - ${s}`));
  
  console.log(`\n🚫 Draft: ${report.summary.draft.length} sections`);
  report.summary.draft.forEach(s => console.log(`   - ${s}`));
  
  if (report.summary.preview.length > 0) {
    console.log(`\n👁️  Preview: ${report.summary.preview.length} sections`);
    report.summary.preview.forEach(s => console.log(`   - ${s}`));
  }
  
  // Detailed analysis of draft sections
  console.log('\n' + '='.repeat(70));
  console.log('DRAFT SECTIONS - PUBLISH READINESS');
  console.log('='.repeat(70));
  
  Object.entries(report.sections).forEach(([section, data]) => {
    console.log(`\n📦 ${section.toUpperCase()}`);
    console.log(`   Status: ${data.status}`);
    console.log(`   Readiness: ${data.readiness === 'ready' ? '✅ READY' : data.readiness === 'mostly-ready' ? '⚠️  MOSTLY READY' : '❌ NEEDS WORK'}`);
    
    if (data.dataCount) {
      console.log(`   Data: ${data.dataCount} items`);
    }
    
    if (data.dataSource) {
      console.log(`   Data Source: ${data.dataSource}`);
    }
    
    if (data.notes) {
      console.log(`   Notes: ${data.notes}`);
    }
    
    // Page component status
    if (data.hubPage) {
      const hub = data.hubPage;
      console.log(`   Hub Page: ${hub.exists ? '✅' : '❌'} ${hub.hasSEO ? '(has SEO)' : '(missing SEO)'}`);
    }
    
    if (data.detailPage) {
      const detail = data.detailPage;
      console.log(`   Detail Page: ${detail.exists ? '✅' : '❌'} ${detail.hasSEO ? '(has SEO)' : '(missing SEO)'}`);
    }
    
    // Data issues
    if (data.dataIssues && data.dataIssues.length > 0) {
      console.log(`\n   ⚠️  Data Issues (${data.dataIssues.length} items):`);
      data.dataIssues.slice(0, 5).forEach(issue => {
        console.log(`      - ${issue.item}: ${issue.issues.join(', ')}`);
      });
      if (data.dataIssues.length > 5) {
        console.log(`      ... and ${data.dataIssues.length - 5} more`);
      }
    }
  });
  
  // Publish checklist
  console.log('\n' + '='.repeat(70));
  console.log('TO PUBLISH A SECTION');
  console.log('='.repeat(70));
  console.log(`
1. Fix any data issues listed above
2. Update src/config/publishStatus.js:
   Change: sectionName: 'draft'
   To:     sectionName: 'published'
3. Rebuild: npm run build:ssg
4. Deploy
5. Submit updated sitemap to Google Search Console
  `);
  
  console.log('='.repeat(70) + '\n');
}

// Run
analyzePublishReadiness()
  .then(formatOutput)
  .catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });

