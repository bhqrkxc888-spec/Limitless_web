/**
 * Admin Website Business Info Page
 * 
 * Manage business information and settings
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Clock, Save, AlertCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import useAdminAuth from '../../hooks/useAdminAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { logger } from '../../utils/logger';

function AdminWebsiteBusinessInfo() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  });

  // Fetch site settings from Supabase
  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .schema('web')
        .from('site_settings')
        .select('*')
        .eq('site_key', 'main')
        .single();

      if (fetchError) {
        // If no data exists, that's okay - we'll create it on save
        if (fetchError.code !== 'PGRST116') {
          throw fetchError;
        }
        logger.info('No site settings found - will create on save');
        return;
      }

      setSettings(data);

      // Parse JSON fields and populate form
      const contact = data.contact_json || {};
      const socials = data.socials_json || {};
      const hours = data.opening_hours_json || {};

      setFormData({
        phone: contact.phone || '',
        email: contact.email || '',
        address: contact.address || '',
        facebook: socials.facebook || '',
        instagram: socials.instagram || '',
        twitter: socials.twitter || '',
        linkedin: socials.linkedin || '',
        monday: hours.monday || '',
        tuesday: hours.tuesday || '',
        wednesday: hours.wednesday || '',
        thursday: hours.thursday || '',
        friday: hours.friday || '',
        saturday: hours.saturday || '',
        sunday: hours.sunday || ''
      });
    } catch (err) {
      logger.error('Error fetching site settings:', err);
      setError('Failed to load business information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated && supabase) {
      fetchSettings();
    }
  }, [isAuthenticated]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      // Build JSON objects
      const contact_json = {
        phone: formData.phone,
        email: formData.email,
        address: formData.address
      };

      const socials_json = {
        facebook: formData.facebook,
        instagram: formData.instagram,
        twitter: formData.twitter,
        linkedin: formData.linkedin
      };

      const opening_hours_json = {
        monday: formData.monday,
        tuesday: formData.tuesday,
        wednesday: formData.wednesday,
        thursday: formData.thursday,
        friday: formData.friday,
        saturday: formData.saturday,
        sunday: formData.sunday
      };

      if (settings) {
        // Update existing settings
        const { error: updateError } = await supabase
          .schema('web')
          .from('site_settings')
          .update({
            contact_json,
            socials_json,
            opening_hours_json,
            updated_at: new Date().toISOString()
          })
          .eq('site_key', 'main');

        if (updateError) throw updateError;
      } else {
        // Insert new settings
        const { error: insertError } = await supabase
          .schema('web')
          .from('site_settings')
          .insert({
            site_key: 'main',
            contact_json,
            socials_json,
            opening_hours_json
          });

        if (insertError) throw insertError;
      }

      // Refresh settings
      await fetchSettings();
      setSuccessMessage('Business information saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      logger.info('Updated site settings');
    } catch (err) {
      logger.error('Error saving site settings:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="admin-layout" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f1117'
      }}>
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout 
      onLogout={logout} 
      lastUpdated={settings?.updated_at}
      onRefresh={fetchSettings}
      isRefreshing={loading}
    >
      <div className="admin-website-business-info">
        <header className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Website Business Info</h1>
            <p className="admin-page-subtitle">
              Manage business information, contact details, and company settings
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="admin-btn admin-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {saving ? (
              <>
                <div className="admin-loading-spinner" style={{ width: 16, height: 16 }} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </header>

        {error && (
          <div className="admin-alert admin-alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="admin-alert admin-alert-success" style={{ marginBottom: '1.5rem' }}>
            <Save size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Instructions */}
        <div className="admin-info-box" style={{ marginBottom: '1.5rem' }}>
          <h3>🏢 Business Information</h3>
          <p>This information appears across your public website, including the header, footer, and contact page.</p>
          <ul>
            <li><strong>Contact Details:</strong> Phone number, email, and address shown in the footer and contact page.</li>
            <li><strong>Opening Hours:</strong> Business hours displayed on the contact page.</li>
            <li><strong>Social Media:</strong> Links to your social media profiles shown in the footer.</li>
          </ul>
          <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--admin-text-muted)' }}>
            💡 Changes are saved to the database and appear on your website after clicking "Save Changes".
          </p>
        </div>

        {loading && !settings ? (
          <div className="admin-card">
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div className="admin-loading-spinner" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--admin-text-muted)' }}>Loading business information...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Contact Information */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
              <div className="admin-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Building2 size={20} />
                  <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Contact Information</h2>
                </div>
              </div>
              <div className="admin-card-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="phone">
                      <Phone size={16} style={{ marginRight: '0.5rem' }} />
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="admin-input"
                      placeholder="01246 823815"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="email">
                      <Mail size={16} style={{ marginRight: '0.5rem' }} />
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="admin-input"
                      placeholder="dane@limitlesscruises.com"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="address">
                    <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                    Business Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="admin-input"
                    placeholder="51 Fairfields Way, Aston, Sheffield, S26 2HB"
                  />
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
              <div className="admin-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={20} />
                  <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Opening Hours</h2>
                </div>
              </div>
              <div className="admin-card-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="monday">Monday</label>
                    <input
                      id="monday"
                      type="text"
                      value={formData.monday}
                      onChange={(e) => handleInputChange('monday', e.target.value)}
                      className="admin-input"
                      placeholder="9:00 AM - 5:30 PM"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="tuesday">Tuesday</label>
                    <input
                      id="tuesday"
                      type="text"
                      value={formData.tuesday}
                      onChange={(e) => handleInputChange('tuesday', e.target.value)}
                      className="admin-input"
                      placeholder="9:00 AM - 5:30 PM"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="wednesday">Wednesday</label>
                    <input
                      id="wednesday"
                      type="text"
                      value={formData.wednesday}
                      onChange={(e) => handleInputChange('wednesday', e.target.value)}
                      className="admin-input"
                      placeholder="9:00 AM - 5:30 PM"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="thursday">Thursday</label>
                    <input
                      id="thursday"
                      type="text"
                      value={formData.thursday}
                      onChange={(e) => handleInputChange('thursday', e.target.value)}
                      className="admin-input"
                      placeholder="9:00 AM - 5:30 PM"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="friday">Friday</label>
                    <input
                      id="friday"
                      type="text"
                      value={formData.friday}
                      onChange={(e) => handleInputChange('friday', e.target.value)}
                      className="admin-input"
                      placeholder="9:00 AM - 5:30 PM"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="saturday">Saturday</label>
                    <input
                      id="saturday"
                      type="text"
                      value={formData.saturday}
                      onChange={(e) => handleInputChange('saturday', e.target.value)}
                      className="admin-input"
                      placeholder="Closed"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="sunday">Sunday</label>
                  <input
                    id="sunday"
                    type="text"
                    value={formData.sunday}
                    onChange={(e) => handleInputChange('sunday', e.target.value)}
                    className="admin-input"
                    placeholder="Closed"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="admin-card">
              <div className="admin-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Facebook size={20} />
                  <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Social Media Links</h2>
                </div>
              </div>
              <div className="admin-card-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="facebook">
                      <Facebook size={16} style={{ marginRight: '0.5rem' }} />
                      Facebook
                    </label>
                    <input
                      id="facebook"
                      type="url"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      className="admin-input"
                      placeholder="https://facebook.com/limitlesscruises"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="instagram">
                      <Instagram size={16} style={{ marginRight: '0.5rem' }} />
                      Instagram
                    </label>
                    <input
                      id="instagram"
                      type="url"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      className="admin-input"
                      placeholder="https://instagram.com/limitlesscruises"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="twitter">
                      <Twitter size={16} style={{ marginRight: '0.5rem' }} />
                      Twitter/X
                    </label>
                    <input
                      id="twitter"
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      className="admin-input"
                      placeholder="https://twitter.com/limitlesscruise"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="linkedin">
                      <Linkedin size={16} style={{ marginRight: '0.5rem' }} />
                      LinkedIn
                    </label>
                    <input
                      id="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="admin-input"
                      placeholder="https://linkedin.com/company/limitless-cruises"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .admin-website-business-info {
          max-width: 1000px;
        }

        .admin-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .admin-card-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-card-body {
          padding: 1.5rem;
        }

        .admin-form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .admin-form-row:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .admin-form-row {
            grid-template-columns: 1fr;
          }

          .admin-page-header {
            flex-direction: column;
          }
        }

        .admin-form-group {
          margin-bottom: 1.5rem;
        }

        .admin-form-group:last-child {
          margin-bottom: 0;
        }

        .admin-form-group label {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--admin-text-primary);
          margin-bottom: 0.5rem;
        }

        .admin-input {
          width: 100%;
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border);
          border-radius: 6px;
          padding: 0.75rem;
          color: var(--admin-text-primary);
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .admin-input:focus {
          outline: none;
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .admin-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
        }

        .admin-alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }

        .admin-alert-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
        }

        .admin-info-box {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
        }

        .admin-info-box h3 {
          margin: 0 0 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--admin-text-primary);
        }

        .admin-info-box p {
          margin: 0 0 0.75rem 0;
          font-size: 0.875rem;
          color: var(--admin-text-secondary);
          line-height: 1.5;
        }

        .admin-info-box ul {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.8125rem;
          color: var(--admin-text-secondary);
          line-height: 1.7;
        }

        .admin-info-box li {
          margin-bottom: 0.375rem;
        }

        .admin-info-box strong {
          color: var(--admin-text-primary);
          font-weight: 600;
        }
      `}</style>
    </AdminLayout>
  );
}

export default AdminWebsiteBusinessInfo;
