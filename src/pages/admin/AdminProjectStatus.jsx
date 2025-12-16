/**
 * Admin Project Status Page
 * 
 * Shows comprehensive project status, what's complete, pending, and requirements
 * Staff-only view for tracking website development progress
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  Image,
  FileText,
  Database,
  Settings,
  ChevronDown,
  ChevronRight,
  Layers,
  Globe,
  Ship,
  MapPin,
  Tag,
  MessageSquare,
  HelpCircle,
  Star,
  Newspaper,
  Percent,
  Shield,
  Users,
  Check,
  Edit2,
  Save,
  X
} from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import './AdminProjectStatus.css';

// Status definitions
const STATUS = {
  COMPLETE: { label: 'Complete', icon: CheckCircle2, color: '#10b981' },
  IN_PROGRESS: { label: 'In Progress', icon: Clock, color: '#f59e0b' },
  PENDING: { label: 'Pending', icon: Circle, color: '#6b7280' },
  NEEDS_CONTENT: { label: 'Needs Content', icon: AlertCircle, color: '#ef4444' },
  TESTED: { label: 'Tested', icon: CheckCircle2, color: '#10b981' },
  APPROVED: { label: 'Approved', icon: Shield, color: '#8b5cf6' }
};

// Project sections with detailed status
const projectSections = [
  {
    id: 'core-pages',
    title: 'Core Public Pages',
    icon: Globe,
    description: 'Main pages visible to all visitors',
    visibility: 'public',
    items: [
      {
        name: 'Home Page',
        path: '/',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Hero, trust bar, contact section, featured offers, news tiles',
        requirements: []
      },
      {
        name: 'Find a Cruise',
        path: '/find-a-cruise',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Embedded booking widget from The Cruise Village',
        requirements: []
      },
      {
        name: 'About Page',
        path: '/about',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Company info, values, CLIA certifications',
        requirements: []
      },
      {
        name: 'Contact Page',
        path: '/contact',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Contact form, phone, WhatsApp, social links',
        requirements: []
      },
      {
        name: 'Travel News',
        path: '/travel-news',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'News listing with categories, tags, search. Connected to CRM.',
        requirements: [
          { type: 'content', desc: 'Publish articles via CRM to populate' }
        ]
      },
      {
        name: 'Travel News Articles',
        path: '/travel-news/:slug',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Individual article pages with full content, gallery, related articles',
        requirements: []
      }
    ]
  },
  {
    id: 'offers',
    title: 'Offers System',
    icon: Percent,
    description: 'Cruise deals and special offers from CRM',
    visibility: 'public',
    items: [
      {
        name: 'Offers Listing Page',
        path: '/offers',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Horizontal card layout, filters by type/destination, search, pagination',
        requirements: [
          { type: 'content', desc: 'Publish offers via CRM to populate' }
        ]
      },
      {
        name: 'Offer Detail Page',
        path: '/offers/:slug',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Gallery, full details, itinerary, includes/excludes, enquiry form',
        requirements: []
      },
      {
        name: 'Featured Offers (Home)',
        path: '/#featured-offers',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Carousel of featured offers on homepage',
        requirements: [
          { type: 'content', desc: 'Mark offers as "featured" in CRM' }
        ]
      }
    ]
  },
  {
    id: 'legal',
    title: 'Legal & Policy Pages',
    icon: FileText,
    description: 'Terms, conditions, and legal requirements',
    visibility: 'public',
    items: [
      {
        name: 'Website Terms',
        path: '/website-terms',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'General website terms of use',
        requirements: []
      },
      {
        name: 'Privacy Policy',
        path: '/privacy-policy',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'GDPR compliant privacy policy',
        requirements: []
      },
      {
        name: 'Booking Terms',
        path: '/booking-terms',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Holiday Elite booking conditions',
        requirements: []
      },
      {
        name: 'Cookie Policy',
        path: '/cookie-policy',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Cookie usage and consent',
        requirements: []
      },
      {
        name: 'Price Match Guarantee',
        path: '/price-match-guarantee',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Price match T&Cs - ABTA, 48hrs, like-for-like rules',
        requirements: [
          { type: 'review', desc: 'Review T&Cs for accuracy' }
        ]
      }
    ]
  },
  {
    id: 'cruise-lines',
    title: 'Cruise Lines Section',
    icon: Ship,
    description: 'Individual cruise line pages',
    visibility: 'hidden',
    items: [
      {
        name: 'Cruise Lines Hub',
        path: '/cruise-lines',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Grid of all cruise lines with filtering',
        requirements: [
          { type: 'images', desc: 'Upload cruise line logos to Supabase (400x200, transparent PNG) - currently null' },
          { type: 'images', desc: 'Replace placeholder destination images with actual cruise line hero images (1920x800)' },
          { type: 'content', desc: 'Review/update cruise line descriptions' }
        ]
      },
      {
        name: 'Cruise Line Detail Pages',
        path: '/cruise-lines/:slug',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: '22 cruise lines with hero, overview, ships, USPs, offers',
        requirements: [
          { type: 'images', desc: 'Upload proper cruise line hero images (1920x800) - currently using destination placeholders' },
          { type: 'images', desc: 'Ship images for fleet sections' },
          { type: 'content', desc: 'Verify ship names and descriptions are current' }
        ]
      }
    ]
  },
  {
    id: 'destinations',
    title: 'Destinations Section',
    icon: MapPin,
    description: 'Cruise destination guides',
    visibility: 'hidden',
    items: [
      {
        name: 'Destinations Hub',
        path: '/destinations',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Interactive map and grid of all destinations',
        requirements: [
          { type: 'images', desc: 'Replace placeholder images with proper destination thumbnails (800x600) - currently using bucket list placeholders' }
        ]
      },
      {
        name: 'Destination Detail Pages',
        path: '/destinations/:slug',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Individual destination pages with regions, ports, best time to visit',
        requirements: [
          { type: 'images', desc: 'Upload proper destination hero images (1920x800) - currently using bucket list placeholders' },
          { type: 'images', desc: 'Port/highlight images' },
          { type: 'content', desc: 'Review destination descriptions for accuracy' }
        ]
      }
    ]
  },
  {
    id: 'bucket-list',
    title: 'Bucket List Experiences',
    icon: Star,
    description: 'Once-in-a-lifetime cruise experiences',
    visibility: 'hidden',
    items: [
      {
        name: 'Bucket List Hub',
        path: '/bucket-list',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Showcase of unique cruise experiences',
        requirements: [
          { type: 'images', desc: '✅ Hero images updated to Supabase URLs - all bucket list experiences now use real images' }
        ]
      },
      {
        name: 'Bucket List Detail Pages',
        path: '/bucket-list/:slug',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Individual experience pages with itinerary suggestions',
        requirements: [
          { type: 'images', desc: '✅ Hero images updated to Supabase URLs' },
          { type: 'content', desc: 'Add more bucket list experiences' }
        ]
      }
    ]
  },
  {
    id: 'cruise-types',
    title: 'Cruise Types',
    icon: Layers,
    description: 'Types of cruises (river, ocean, expedition, etc.)',
    visibility: 'hidden',
    items: [
      {
        name: 'Cruise Types Hub',
        path: '/cruise-types',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Overview of all cruise categories',
        requirements: [
          { type: 'images', desc: '✅ Category images updated to Supabase URLs' },
          { type: 'content', desc: 'Review category descriptions' }
        ]
      }
    ]
  },
  {
    id: 'support',
    title: 'Support & Trust Pages',
    icon: HelpCircle,
    description: 'FAQ, testimonials, and trust-building content',
    visibility: 'hidden',
    items: [
      {
        name: 'FAQ Page',
        path: '/faq',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Frequently asked questions with accordion',
        requirements: [
          { type: 'content', desc: 'Review/add more FAQs based on customer queries' }
        ]
      },
      {
        name: 'Testimonials',
        path: '/testimonials',
        status: 'COMPLETE',
        tested: true,
        approved: false,
        notes: 'Customer reviews and ratings',
        requirements: [
          { type: 'content', desc: 'Add real customer testimonials' },
          { type: 'images', desc: 'Customer photos (optional, with permission)' }
        ]
      }
    ]
  },
  {
    id: 'admin',
    title: 'Admin & Monitoring',
    icon: Settings,
    description: 'Staff-only dashboard and tools',
    visibility: 'staff',
    items: [
      {
        name: 'Admin Login',
        path: '/admin/login',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Password-protected staff access',
        requirements: []
      },
      {
        name: 'Monitoring Dashboard',
        path: '/admin',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Overview of errors, performance, SEO',
        requirements: []
      },
      {
        name: 'Error Tracking',
        path: '/admin/errors',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'JavaScript error logging and resolution',
        requirements: []
      },
      {
        name: 'Performance Metrics',
        path: '/admin/performance',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Core Web Vitals tracking',
        requirements: []
      },
      {
        name: 'SEO Monitoring',
        path: '/admin/seo',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'SEO scores and recommendations',
        requirements: []
      },
      {
        name: 'Project Status',
        path: '/admin/project-status',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'This page - project overview and requirements',
        requirements: []
      },
      {
        name: 'Image Upload (Vercel Blob)',
        path: '/admin/image-upload',
        status: 'COMPLETE',
        tested: true,
        approved: true,
        notes: 'Upload website images to Vercel Blob Storage',
        requirements: []
      }
    ]
  }
];

// Summary of what's needed
const contentRequirements = {
  images: [
    { 
      id: 'cruise-line-logos',
      priority: 'high', 
      desc: 'Cruise line logos (400x200, transparent PNG) - 16 needed (currently null)', 
      section: 'Cruise Lines', 
      status: 'pending',
      details: {
        count: 16,
        completed: 0,
        format: 'PNG (transparent)',
        dimensions: '400 × 200px',
        location: 'Supabase Storage: cruise-lines/logos/',
        notes: 'Currently null in database. Need to upload via admin image upload tool.',
        examples: ['Cunard', 'P&O Cruises', 'Princess Cruises', 'Royal Caribbean', 'Celebrity', 'Holland America']
      }
    },
    { 
      id: 'cruise-line-heroes',
      priority: 'high', 
      desc: 'Cruise line hero images (1920x800) - 22 needed (using destination placeholders)', 
      section: 'Cruise Lines', 
      status: 'pending',
      details: {
        count: 22,
        completed: 0,
        format: 'JPEG, WebP',
        dimensions: '1920 × 800px',
        location: 'Vercel Blob or Supabase Storage',
        notes: 'Currently using destination placeholders. Each cruise line needs unique hero image.',
        examples: ['Cunard', 'P&O Cruises', 'Princess Cruises', 'Royal Caribbean']
      }
    },
    { 
      id: 'destination-heroes',
      priority: 'high', 
      desc: 'Destination hero images (1920x800) - 15+ needed (using bucket list placeholders)', 
      section: 'Destinations', 
      status: 'pending',
      details: {
        count: 15,
        completed: 0,
        format: 'JPEG, WebP',
        dimensions: '1920 × 800px',
        location: 'Vercel Blob Storage',
        notes: 'Currently using bucket list placeholders. Need destination-specific hero images.',
        examples: ['Canada', 'Iceland', 'Amazon', 'Great Barrier Reef', 'French Polynesia']
      }
    },
    { 
      id: 'ship-images',
      priority: 'medium', 
      desc: 'Ship images for fleet sections', 
      section: 'Cruise Lines', 
      status: 'pending',
      details: {
        count: 0,
        completed: 0,
        format: 'JPEG, WebP',
        dimensions: '800 × 600px',
        location: 'Supabase Storage or Vercel Blob',
        notes: 'Ship images for individual cruise line fleet sections. Count varies by cruise line.',
        examples: []
      }
    },
    { 
      id: 'customer-photos',
      priority: 'low', 
      desc: 'Customer photos for testimonials', 
      section: 'Testimonials', 
      status: 'pending',
      details: {
        count: 0,
        completed: 0,
        format: 'JPEG, WebP',
        dimensions: '400 × 400px',
        location: 'Supabase Storage',
        notes: 'Optional customer photos for testimonials (with permission).',
        examples: []
      }
    },
    { 
      id: 'external-placeholders-removed',
      priority: 'complete', 
      desc: '✅ All external/placeholder images removed (Unsplash, via.placeholder)', 
      section: 'All Pages', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        format: 'N/A',
        dimensions: 'N/A',
        location: 'N/A',
        notes: 'All external placeholder images have been removed from the codebase.',
        examples: []
      }
    },
    { 
      id: 'vercel-blob-configured',
      priority: 'complete', 
      desc: '✅ Vercel Blob Storage configured for website images', 
      section: 'Infrastructure', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        format: 'N/A',
        dimensions: 'N/A',
        location: 'Vercel Blob',
        notes: 'Vercel Blob Storage is configured and ready for use.',
        examples: []
      }
    },
    { 
      id: 'website-images-migrated',
      priority: 'complete', 
      desc: '✅ Website images migrated to Vercel Blob (favicon, home hero, about page)', 
      section: 'Core Pages', 
      status: 'complete',
      details: {
        count: 3,
        completed: 3,
        format: 'JPEG, WebP',
        dimensions: 'Various',
        location: 'Vercel Blob',
        notes: 'Core website images have been migrated to Vercel Blob.',
        examples: ['Favicon', 'Home Hero', 'About Page']
      }
    },
    { 
      id: 'destination-images-migrated',
      priority: 'complete', 
      desc: '✅ Destination images migrated to Vercel Blob (Japan, Middle East, Pacific, South America, Antarctica, Fjords, World Cruise, Galápagos)', 
      section: 'Destinations', 
      status: 'complete',
      details: {
        count: 8,
        completed: 8,
        format: 'JPEG, WebP',
        dimensions: '1920 × 800px',
        location: 'Vercel Blob',
        notes: 'Multiple destination images have been migrated to Vercel Blob.',
        examples: ['Japan', 'Middle East', 'Pacific', 'South America', 'Antarctica', 'Fjords', 'World Cruise', 'Galápagos']
      }
    },
    { 
      id: 'image-optimization-updated',
      priority: 'complete', 
      desc: '✅ Image optimization system updated for Vercel Blob (automatic WebP, CDN, responsive)', 
      section: 'Performance', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        format: 'N/A',
        dimensions: 'N/A',
        location: 'N/A',
        notes: 'Image optimization system has been updated to work with Vercel Blob.',
        examples: []
      }
    },
    { 
      id: 'admin-upload-tool',
      priority: 'complete', 
      desc: '✅ Admin Image Upload tool created for Vercel Blob', 
      section: 'Admin Tools', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        format: 'N/A',
        dimensions: 'N/A',
        location: '/admin/image-upload',
        notes: 'Admin tool for uploading images to Vercel Blob is available.',
        examples: []
      }
    },
    { 
      id: 'bucket-list-images',
      priority: 'complete', 
      desc: '✅ Bucket list hero images updated to Supabase URLs', 
      section: 'Bucket List', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        format: 'JPEG, WebP',
        dimensions: '1920 × 800px',
        location: 'Supabase Storage',
        notes: 'All bucket list experience hero images are now using Supabase URLs.',
        examples: []
      }
    },
    { 
      id: 'cruise-types-images',
      priority: 'complete', 
      desc: '✅ Cruise types images updated to Supabase URLs', 
      section: 'Cruise Types', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        format: 'JPEG, WebP',
        dimensions: 'Various',
        location: 'Supabase Storage',
        notes: 'Cruise type category images are now using Supabase URLs.',
        examples: []
      }
    },
    { 
      id: 'placeholder-offers-updated',
      priority: 'complete', 
      desc: '✅ Placeholder offers updated with Supabase images', 
      section: 'Offers', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        format: 'JPEG, WebP',
        dimensions: '800 × 500px',
        location: 'Supabase Storage',
        notes: 'Placeholder offers now use Supabase images instead of external placeholders.',
        examples: []
      }
    }
  ],
  content: [
    { 
      id: 'publish-offers',
      priority: 'high', 
      desc: 'Publish initial offers via CRM', 
      section: 'Offers',
      status: 'pending',
      details: {
        count: 0,
        completed: 0,
        notes: 'Publish initial cruise offers through the CRM system to populate the offers page.',
        examples: []
      }
    },
    { 
      id: 'publish-news',
      priority: 'high', 
      desc: 'Publish initial news articles via CRM', 
      section: 'Travel News',
      status: 'pending',
      details: {
        count: 0,
        completed: 0,
        notes: 'Publish initial travel news articles through the CRM system.',
        examples: []
      }
    },
    { 
      id: 'remaining-destinations',
      priority: 'high', 
      desc: 'Upload remaining destination images to Vercel Blob (Canada, Iceland, Amazon, Rivers, Great Barrier Reef, French Polynesia, Arctic, Transatlantic, Grand Voyages)', 
      section: 'Destinations',
      status: 'pending',
      details: {
        count: 9,
        completed: 0,
        format: 'JPEG, WebP',
        dimensions: '1920 × 800px',
        location: 'Vercel Blob',
        notes: 'Upload hero images for remaining destinations that haven\'t been migrated yet.',
        examples: ['Canada', 'Iceland', 'Amazon', 'Rivers', 'Great Barrier Reef', 'French Polynesia', 'Arctic', 'Transatlantic', 'Grand Voyages']
      }
    },
    { 
      id: 'review-cruise-descriptions',
      priority: 'medium', 
      desc: 'Review cruise line descriptions for accuracy', 
      section: 'Cruise Lines',
      status: 'pending',
      details: {
        count: 22,
        completed: 0,
        notes: 'Review and update cruise line descriptions to ensure accuracy and current information.',
        examples: []
      }
    },
    { 
      id: 'verify-ship-names',
      priority: 'medium', 
      desc: 'Verify ship names are current', 
      section: 'Cruise Lines',
      status: 'pending',
      details: {
        count: 0,
        completed: 0,
        notes: 'Verify that all ship names in the fleet sections are current and accurate.',
        examples: []
      }
    },
    { 
      id: 'add-testimonials',
      priority: 'medium', 
      desc: 'Add real customer testimonials', 
      section: 'Testimonials',
      status: 'pending',
      details: {
        count: 0,
        completed: 0,
        notes: 'Add real customer testimonials and reviews to the testimonials page.',
        examples: []
      }
    },
    { 
      id: 'expand-faq',
      priority: 'low', 
      desc: 'Expand FAQ based on common questions', 
      section: 'FAQ',
      status: 'pending',
      details: {
        count: 0,
        completed: 0,
        notes: 'Add more FAQ items based on common customer questions.',
        examples: []
      }
    }
  ],
  technical: [
    { 
      id: 'crm-vercel-blob-integration',
      priority: 'high', 
      desc: 'Update CRM to upload website images to Vercel Blob (see docs/VERCEL_BLOB_CRM_INTEGRATION.md)', 
      section: 'CRM Integration',
      status: 'pending',
      details: {
        count: 1,
        completed: 0,
        notes: 'Update the CRM system to support uploading website images directly to Vercel Blob Storage. See documentation for details.',
        examples: []
      }
    },
    { 
      id: 'connect-offers-api',
      priority: 'high', 
      desc: 'Connect CRM offers API (Supabase RPC configured)', 
      section: 'Offers',
      status: 'pending',
      details: {
        count: 1,
        completed: 0,
        notes: 'Connect the website to the CRM offers API. Supabase RPC function is already configured.',
        examples: []
      }
    },
    { 
      id: 'connect-news-api',
      priority: 'high', 
      desc: 'Connect CRM news API (Supabase RPC configured)', 
      section: 'Travel News',
      status: 'pending',
      details: {
        count: 1,
        completed: 0,
        notes: 'Connect the website to the CRM news API. Supabase RPC function is already configured.',
        examples: []
      }
    },
    { 
      id: 'set-site-launched',
      priority: 'medium', 
      desc: 'Set VITE_SITE_LAUNCHED=true when ready to go live', 
      section: 'All Hidden Pages',
      status: 'pending',
      details: {
        count: 1,
        completed: 0,
        notes: 'Set the environment variable VITE_SITE_LAUNCHED=true to make all hidden pages publicly visible.',
        examples: []
      }
    },
    { 
      id: 'google-analytics',
      priority: 'low', 
      desc: 'Configure Google Analytics tracking', 
      section: 'All Pages',
      status: 'pending',
      details: {
        count: 1,
        completed: 0,
        notes: 'Configure Google Analytics tracking code for all pages.',
        examples: []
      }
    },
    { 
      id: 'vercel-blob-connected',
      priority: 'complete', 
      desc: '✅ Vercel Blob Storage connected to project', 
      section: 'Infrastructure', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        notes: 'Vercel Blob Storage has been successfully connected to the project.',
        examples: []
      }
    },
    { 
      id: 'image-optimization-refactored',
      priority: 'complete', 
      desc: '✅ Image optimization system refactored for Vercel Blob', 
      section: 'Performance', 
      status: 'complete',
      details: {
        count: 1,
        completed: 1,
        notes: 'Image optimization system has been refactored to work with Vercel Blob.',
        examples: []
      }
    }
  ]
};

// Calculate summary stats
const calculateStats = () => {
  let total = 0;
  let complete = 0;
  let tested = 0;
  let approved = 0;
  let needsContent = 0;
  
  projectSections.forEach(section => {
    section.items.forEach(item => {
      total++;
      if (item.status === 'COMPLETE') complete++;
      if (item.tested) tested++;
      if (item.approved) approved++;
      if (item.requirements && item.requirements.length > 0) needsContent++;
    });
  });
  
  return { total, complete, tested, approved, needsContent };
};

function StatusBadge({ status, tested, approved }) {
  const statusInfo = STATUS[status];
  const Icon = statusInfo.icon;
  
  return (
    <div className="status-badges">
      <span className="status-badge" style={{ '--badge-color': statusInfo.color }}>
        <Icon size={14} />
        {statusInfo.label}
      </span>
      {tested && (
        <span className="status-badge status-badge--tested">
          <CheckCircle2 size={14} />
          Tested
        </span>
      )}
      {approved && (
        <span className="status-badge status-badge--approved">
          <Shield size={14} />
          Approved
        </span>
      )}
    </div>
  );
}

function RequirementsList({ requirements }) {
  if (!requirements || requirements.length === 0) return null;
  
  const getIcon = (type) => {
    switch (type) {
      case 'images': return Image;
      case 'content': return FileText;
      case 'data': return Database;
      case 'review': return Eye;
      default: return AlertCircle;
    }
  };
  
  return (
    <ul className="requirements-list">
      {requirements.map((req, idx) => {
        const Icon = getIcon(req.type);
        return (
          <li key={idx} className={`requirement-item requirement-item--${req.type}`}>
            <Icon size={14} />
            <span>{req.desc}</span>
          </li>
        );
      })}
    </ul>
  );
}

function RequirementCard({ requirement, category, onToggleComplete, onUpdateDetails }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localDetails, setLocalDetails] = useState(requirement.details || {});
  const [notes, setNotes] = useState(requirement.notes || '');

  const handleToggleComplete = async (e) => {
    e.stopPropagation();
    const newStatus = requirement.status === 'complete' ? 'pending' : 'complete';
    await onToggleComplete(requirement.id, category, newStatus);
  };

  const handleSaveDetails = async () => {
    await onUpdateDetails(requirement.id, category, {
      ...localDetails,
      notes
    });
    setIsEditing(false);
  };

  const progress = requirement.details?.count 
    ? Math.round((requirement.details.completed / requirement.details.count) * 100)
    : requirement.status === 'complete' ? 100 : 0;

  return (
    <div className={`requirement-card priority-${requirement.priority} ${requirement.status === 'complete' ? 'requirement-complete' : ''}`}>
      <div className="requirement-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="requirement-card-left">
          <button
            className="requirement-checkbox"
            onClick={handleToggleComplete}
            aria-label={requirement.status === 'complete' ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {requirement.status === 'complete' ? (
              <Check size={18} className="check-icon" />
            ) : (
              <div className="checkbox-empty" />
            )}
          </button>
          <div className="requirement-info">
            <span className="priority-badge">{requirement.priority}</span>
            <p>{requirement.desc}</p>
            <span className="section-tag">{requirement.section}</span>
          </div>
        </div>
        <div className="requirement-card-right">
          {requirement.details?.count && (
            <div className="progress-indicator">
              <span className="progress-text">
                {requirement.details.completed}/{requirement.details.count}
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="requirement-details">
          {isEditing ? (
            <div className="requirement-edit-form">
              {requirement.details?.count !== undefined && (
                <div className="form-group">
                  <label>Completed Count</label>
                  <input
                    type="number"
                    value={localDetails.completed || 0}
                    onChange={(e) => setLocalDetails({...localDetails, completed: parseInt(e.target.value) || 0})}
                    min={0}
                    max={localDetails.count || 1}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes about this task..."
                />
              </div>
              <div className="form-actions">
                <button onClick={handleSaveDetails} className="btn-save">
                  <Save size={14} />
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="btn-cancel">
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {requirement.details && (
                <div className="details-grid">
                  {requirement.details.format && (
                    <div className="detail-item">
                      <strong>Format:</strong> {requirement.details.format}
                    </div>
                  )}
                  {requirement.details.dimensions && (
                    <div className="detail-item">
                      <strong>Dimensions:</strong> {requirement.details.dimensions}
                    </div>
                  )}
                  {requirement.details.location && (
                    <div className="detail-item">
                      <strong>Location:</strong> {requirement.details.location}
                    </div>
                  )}
                  {requirement.details.count !== undefined && (
                    <div className="detail-item">
                      <strong>Progress:</strong> {requirement.details.completed} of {requirement.details.count} completed
                    </div>
                  )}
                  {requirement.details.examples && requirement.details.examples.length > 0 && (
                    <div className="detail-item detail-item-full">
                      <strong>Examples:</strong>
                      <div className="examples-list">
                        {requirement.details.examples.map((ex, i) => (
                          <span key={i} className="example-tag">{ex}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {requirement.details.notes && (
                    <div className="detail-item detail-item-full">
                      <strong>Notes:</strong>
                      <p>{requirement.details.notes}</p>
                    </div>
                  )}
                  {notes && (
                    <div className="detail-item detail-item-full">
                      <strong>Your Notes:</strong>
                      <p>{notes}</p>
                    </div>
                  )}
                </div>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }} 
                className="btn-edit-details"
              >
                <Edit2 size={14} />
                Edit Details
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SectionCard({ section, isExpanded, onToggle }) {
  const Icon = section.icon;
  const completeCount = section.items.filter(i => i.status === 'COMPLETE').length;
  const totalCount = section.items.length;
  const allComplete = completeCount === totalCount;
  
  return (
    <div className={`section-card ${isExpanded ? 'expanded' : ''}`}>
      <button className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <Icon size={24} className="section-icon" />
          <div className="section-info">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        </div>
        <div className="section-header-right">
          <span className={`visibility-badge visibility-badge--${section.visibility}`}>
            {section.visibility === 'public' ? <Eye size={14} /> : section.visibility === 'hidden' ? <EyeOff size={14} /> : <Settings size={14} />}
            {section.visibility}
          </span>
          <span className={`progress-badge ${allComplete ? 'complete' : ''}`}>
            {completeCount}/{totalCount}
          </span>
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="section-content">
          <table className="items-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Requirements</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{item.name}</strong>
                    <code>{item.path}</code>
                  </td>
                  <td>
                    <StatusBadge 
                      status={item.status} 
                      tested={item.tested} 
                      approved={item.approved} 
                    />
                  </td>
                  <td className="notes-cell">{item.notes}</td>
                  <td>
                    <RequirementsList requirements={item.requirements} />
                  </td>
                  <td>
                    {!item.path.includes(':') && (
                      <Link 
                        to={item.path} 
                        className="view-link"
                        target="_blank"
                      >
                        <ExternalLink size={14} />
                        View
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AdminProjectStatus() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [expandedSections, setExpandedSections] = useState(['core-pages', 'offers']);
  const [activeTab, setActiveTab] = useState('overview');
  const [requirements, setRequirements] = useState(contentRequirements);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  
  const stats = calculateStats();
  
  // Load saved task status from Supabase or localStorage
  useEffect(() => {
    loadTaskStatus();
  }, []);

  const loadTaskStatus = useCallback(async () => {
    try {
      if (supabase) {
        // Try to load from Supabase
        const { data, error } = await supabase
          .from('admin_task_status')
          .select('*');
        
        // If table doesn't exist, fall back to localStorage
        if (error && error.code === '42P01') {
          const saved = localStorage.getItem('admin_task_status');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              const updated = { ...contentRequirements };
              Object.keys(updated).forEach(category => {
                updated[category] = updated[category].map(req => {
                  const savedKey = `${category}_${req.id}`;
                  const saved = parsed[savedKey];
                  if (saved) {
                    return { 
                      ...req, 
                      status: saved.status || req.status,
                      details: { ...req.details, ...(saved.details || {}) },
                      notes: saved.notes || req.notes || ''
                    };
                  }
                  return req;
                });
              });
              setRequirements(updated);
            } catch (e) {
              console.error('Error parsing saved task status:', e);
            }
          }
        } else if (!error && data && data.length > 0) {
          // Merge saved status with requirements
          const updated = { ...contentRequirements };
          Object.keys(updated).forEach(category => {
            updated[category] = updated[category].map(req => {
              const saved = data.find(s => s.task_id === req.id && s.category === category);
              if (saved) {
                return { 
                  ...req, 
                  status: saved.status || req.status, 
                  details: { ...req.details, ...(saved.details || {}) },
                  notes: saved.notes || req.notes || ''
                };
              }
              return req;
            });
          });
          setRequirements(updated);
        }
      } else {
        // Fallback to localStorage
        const saved = localStorage.getItem('admin_task_status');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const updated = { ...contentRequirements };
            Object.keys(updated).forEach(category => {
              updated[category] = updated[category].map(req => {
                const savedKey = `${category}_${req.id}`;
                const saved = parsed[savedKey];
                if (saved) {
                  return { 
                    ...req, 
                    status: saved.status || req.status,
                    details: { ...req.details, ...(saved.details || {}) },
                    notes: saved.notes || req.notes || ''
                  };
                }
                return req;
              });
            });
            setRequirements(updated);
          } catch (e) {
            console.error('Error parsing saved task status:', e);
          }
        }
      }
    } catch (err) {
      console.error('Error loading task status:', err);
      // On any error, try localStorage as fallback
      const saved = localStorage.getItem('admin_task_status');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const updated = { ...contentRequirements };
          Object.keys(updated).forEach(category => {
            updated[category] = updated[category].map(req => {
              const savedKey = `${category}_${req.id}`;
              const saved = parsed[savedKey];
              if (saved) {
                return { 
                  ...req, 
                  status: saved.status || req.status,
                  details: { ...req.details, ...(saved.details || {}) },
                  notes: saved.notes || req.notes || ''
                };
              }
              return req;
            });
          });
          setRequirements(updated);
        } catch (e) {
          console.error('Error parsing saved task status:', e);
        }
      }
    } finally {
      setIsLoadingTasks(false);
    }
  }, []);

  const handleToggleComplete = useCallback(async (taskId, category, newStatus) => {
    const updated = { ...requirements };
    updated[category] = updated[category].map(req => 
      req.id === taskId ? { ...req, status: newStatus } : req
    );
    setRequirements(updated);

    // Save to Supabase or localStorage
    try {
      if (supabase) {
        const { error } = await supabase
          .from('admin_task_status')
          .upsert({
            task_id: taskId,
            category: category,
            status: newStatus,
            updated_at: new Date().toISOString()
          });
        // If table doesn't exist, fall back to localStorage
        if (error && error.code === '42P01') {
          const saved = JSON.parse(localStorage.getItem('admin_task_status') || '{}');
          saved[`${category}_${taskId}`] = { ...saved[`${category}_${taskId}`], status: newStatus };
          localStorage.setItem('admin_task_status', JSON.stringify(saved));
        }
      } else {
        const saved = JSON.parse(localStorage.getItem('admin_task_status') || '{}');
        saved[`${category}_${taskId}`] = { ...saved[`${category}_${taskId}`], status: newStatus };
        localStorage.setItem('admin_task_status', JSON.stringify(saved));
      }
    } catch (err) {
      console.error('Error saving task status:', err);
    }
  }, [requirements]);

  const handleUpdateDetails = useCallback(async (taskId, category, details) => {
    const updated = { ...requirements };
    updated[category] = updated[category].map(req => 
      req.id === taskId ? { ...req, details: { ...req.details, ...details }, notes: details.notes || req.notes || '' } : req
    );
    setRequirements(updated);

    // Save to Supabase or localStorage
    try {
      if (supabase) {
        const { error } = await supabase
          .from('admin_task_status')
          .upsert({
            task_id: taskId,
            category: category,
            details: details,
            notes: details.notes || '',
            updated_at: new Date().toISOString()
          });
        // If table doesn't exist, fall back to localStorage
        if (error && error.code === '42P01') {
          const saved = JSON.parse(localStorage.getItem('admin_task_status') || '{}');
          saved[`${category}_${taskId}`] = { ...saved[`${category}_${taskId}`], details, notes: details.notes || '' };
          localStorage.setItem('admin_task_status', JSON.stringify(saved));
        }
      } else {
        const saved = JSON.parse(localStorage.getItem('admin_task_status') || '{}');
        saved[`${category}_${taskId}`] = { ...saved[`${category}_${taskId}`], details, notes: details.notes || '' };
        localStorage.setItem('admin_task_status', JSON.stringify(saved));
      }
    } catch (err) {
      console.error('Error saving task details:', err);
    }
  }, [requirements]);
  
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  if (authLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout onLogout={logout}>
      <div className="admin-project-status">
        <header className="page-header">
          <div className="page-header-content">
            <h1>Project Status</h1>
            <p>Website development progress and requirements tracker</p>
          </div>
          <div className="last-updated-info">
            Last updated: {new Date().toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </header>

        {/* Summary Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon--total">
              <Layers size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Pages</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--complete">
              <CheckCircle2 size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.complete}</span>
              <span className="stat-label">Complete</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--tested">
              <Eye size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.tested}</span>
              <span className="stat-label">Tested</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--approved">
              <Shield size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.approved}</span>
              <span className="stat-label">Approved</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--needs">
              <AlertCircle size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.needsContent}</span>
              <span className="stat-label">Need Content</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Layers size={16} />
            Pages Overview
          </button>
          <button 
            className={`tab ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <AlertCircle size={16} />
            Requirements
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="sections-list">
            {projectSections.map(section => (
              <SectionCard
                key={section.id}
                section={section}
                isExpanded={expandedSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="requirements-overview">
            {isLoadingTasks ? (
              <div className="admin-loading">
                <div className="admin-loading-spinner" />
                <p>Loading tasks...</p>
              </div>
            ) : (
              <>
                {/* Images Needed */}
                <div className="requirements-section">
                  <h2>
                    <Image size={20} />
                    Images Needed
                    <span className="section-count">
                      ({requirements.images.filter(r => r.status !== 'complete').length} pending)
                    </span>
                  </h2>
                  <div className="requirements-cards">
                    {requirements.images.map((req) => (
                      <RequirementCard
                        key={req.id}
                        requirement={req}
                        category="images"
                        onToggleComplete={handleToggleComplete}
                        onUpdateDetails={handleUpdateDetails}
                      />
                    ))}
                  </div>
                </div>

                {/* Content Needed */}
                <div className="requirements-section">
                  <h2>
                    <FileText size={20} />
                    Content Needed
                    <span className="section-count">
                      ({requirements.content.filter(r => r.status !== 'complete').length} pending)
                    </span>
                  </h2>
                  <div className="requirements-cards">
                    {requirements.content.map((req) => (
                      <RequirementCard
                        key={req.id}
                        requirement={req}
                        category="content"
                        onToggleComplete={handleToggleComplete}
                        onUpdateDetails={handleUpdateDetails}
                      />
                    ))}
                  </div>
                </div>

                {/* Technical Tasks */}
                <div className="requirements-section">
                  <h2>
                    <Settings size={20} />
                    Technical Tasks
                    <span className="section-count">
                      ({requirements.technical.filter(r => r.status !== 'complete').length} pending)
                    </span>
                  </h2>
                  <div className="requirements-cards">
                    {requirements.technical.map((req) => (
                      <RequirementCard
                        key={req.id}
                        requirement={req}
                        category="technical"
                        onToggleComplete={handleToggleComplete}
                        onUpdateDetails={handleUpdateDetails}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Quick Reference */}
            <div className="requirements-section">
              <h2>
                <HelpCircle size={20} />
                Image Size Reference
              </h2>
              <table className="reference-table">
                <thead>
                  <tr>
                    <th>Usage</th>
                    <th>Recommended Size</th>
                    <th>Format</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hero Images</td>
                    <td>1920 × 800px (or 1920 × 1080px)</td>
                    <td>JPEG, WebP</td>
                  </tr>
                  <tr>
                    <td>Card Images (Offers/News)</td>
                    <td>800 × 500px</td>
                    <td>JPEG, WebP</td>
                  </tr>
                  <tr>
                    <td>Cruise Line Logos</td>
                    <td>400 × 200px</td>
                    <td>PNG (transparent)</td>
                  </tr>
                  <tr>
                    <td>Thumbnails</td>
                    <td>400 × 300px</td>
                    <td>JPEG, WebP</td>
                  </tr>
                  <tr>
                    <td>Gallery Images</td>
                    <td>1200 × 800px</td>
                    <td>JPEG, WebP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="status-footer">
          <p>
            <strong>Note:</strong> Pages marked as "Hidden" are protected and only visible when authenticated 
            via staff login or when <code>VITE_SITE_LAUNCHED=true</code> is set.
          </p>
          <p>
            To publish hidden pages, either log in via <Link to="/admin/login">Staff Login</Link> or 
            update the environment variable and redeploy.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProjectStatus;

