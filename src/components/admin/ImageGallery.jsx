import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { supabase } from '../../lib/supabase';
import { Copy, Trash2 } from 'lucide-react';

function ImageGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error loading images:', error);
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const deleteImage = async (image) => {
    if (!confirm(`Delete ${image.original_filename}?`)) return;

    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', image.id);

    if (error) {
      alert('Error deleting image');
    } else {
      loadImages();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Image Gallery</h1>
          <Button onClick={() => navigate('/admin/dashboard')} variant="outline">
            Back
          </Button>
        </div>
      </div>
      <div className="admin-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="files-grid">
            {images.map(image => (
              <div key={image.id} className="file-card">
                <img src={image.public_url} alt={image.original_filename} style={{width: '100%', aspectRatio: '3/2', objectFit: 'cover'}} />
                <div style={{padding: '12px'}}>
                  <p style={{fontSize: '14px', marginBottom: '8px'}}>{image.original_filename}</p>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button onClick={() => copyUrl(image.public_url)} style={{padding: '4px 8px', fontSize: '12px'}}>
                      <Copy size={14} /> Copy URL
                    </button>
                    <button onClick={() => deleteImage(image)} style={{padding: '4px 8px', fontSize: '12px', color: 'red'}}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGalleryPage;

