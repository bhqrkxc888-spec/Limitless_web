import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui';
import { Upload, Database, ImageIcon, Users } from 'lucide-react';
import './DashboardPage.css';

function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const dashboardCards = [
    {
      title: 'Upload Images',
      description: 'Upload new images to Supabase Storage',
      icon: Upload,
      link: '/admin/upload',
      color: '#0070c0'
    },
    {
      title: 'Image Gallery',
      description: 'Browse and manage uploaded images',
      icon: ImageIcon,
      link: '/admin/gallery',
      color: '#7c3aed'
    },
    {
      title: 'Migration Tool',
      description: 'Migrate local images to Supabase',
      icon: Database,
      link: '/admin/migration',
      color: '#059669'
    },
    {
      title: 'Manage Cruise Lines',
      description: 'Create and edit cruise line data',
      icon: Users,
      link: '/admin/cruise-lines',
      color: '#dc2626'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>

      <div className="admin-container">
        <div className="dashboard-grid">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.link}
                to={card.link}
                className="dashboard-card"
                style={{ '--card-color': card.color }}
              >
                <div className="dashboard-card-icon">
                  <Icon size={32} />
                </div>
                <h2 className="dashboard-card-title">{card.title}</h2>
                <p className="dashboard-card-description">{card.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="dashboard-info">
          <h2>Getting Started</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>1. Configure Supabase</h3>
              <p>Make sure your .env.local file has the correct Supabase URL and anon key.</p>
            </div>
            <div className="info-card">
              <h3>2. Upload Images</h3>
              <p>Use the Upload Images tool to add new cruise line, destination, or category images.</p>
            </div>
            <div className="info-card">
              <h3>3. Migrate Existing</h3>
              <p>Use the Migration Tool to batch upload images from /public/images to Supabase Storage.</p>
            </div>
            <div className="info-card">
              <h3>4. Manage Content</h3>
              <p>Create and edit cruise line entries with the Cruise Lines manager.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

