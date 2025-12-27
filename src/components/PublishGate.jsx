import { useLocation } from 'react-router-dom';
import { getPublishStatus } from '../config/publishStatus';
import { isPreviewAuthenticated } from '../config/launchConfig';
import ComingSoon from './ComingSoon';

/**
 * PublishGate Component
 * 
 * Controls access to content based on publish status.
 * - published: Render children (content is live)
 * - draft: Show ComingSoon (unless admin/preview authenticated)
 * - preview: Show ComingSoon (unless admin/preview authenticated)
 * - protected: Should not be used with PublishGate (use ProtectedRoute instead)
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render if published
 * @param {string} props.section - Section name for ComingSoon message
 * @param {string} props.title - Title for ComingSoon page
 * @param {string} props.backLink - Link for "back" button
 * @param {string} props.backLabel - Label for "back" button
 */
function PublishGate({ 
  children, 
  section = 'This section',
  title = 'Coming Soon',
  backLink = '/',
  backLabel = 'Return Home'
}) {
  const location = useLocation();
  const status = getPublishStatus(location.pathname);
  
  // If published, render the actual content
  if (status === 'published') {
    return children;
  }
  
  // For draft or preview status, check if user is authenticated for preview access
  // This allows admin users to preview draft content while hiding it from public
  if ((status === 'draft' || status === 'preview') && isPreviewAuthenticated()) {
    return children;
  }
  
  // Not published and not authenticated - show ComingSoon
  return (
    <ComingSoon
      title={title}
      section={section}
      backLink={backLink}
      backLabel={backLabel}
    />
  );
}

export default PublishGate;

