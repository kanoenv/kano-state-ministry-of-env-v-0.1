
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

const CatchAllRoute: React.FC = () => {
  const location = useLocation();
  
  // List of valid route patterns that should redirect to specific pages
  const routeRedirects: Record<string, string> = {
    '/agencies/remasab': '/agencies/remasab',
    '/agencies/weccma': '/agencies/weccma',
    '/agencies/waste-management': '/agencies/waste-management',
    '/agencies/pollution-lab': '/agencies/pollution-lab',
    '/agencies/climate-action-plan': '/agencies/climate-action-plan',
    '/agencies/skp': '/agencies/skp',
    '/agencies/knap': '/agencies/knap',
    '/agencies/afforestation': '/agencies/afforestation',
    '/agencies/planting': '/agencies/afforestation',
    '/agencies/renewable-energy': '/agencies/renewable-energy',
    '/programs/remasab': '/programs/remasab',
    '/programs/weccma': '/programs/weccma',
    '/programs/skp': '/programs/skp',
    '/programs/knap': '/programs/knap',
    '/programs/dorayi-compost-plant': '/programs/dorayi-compost-plant',
    '/programs/urban-greening': '/programs/urban-greening',
    '/programs/sensitization-campaign': '/programs/sensitization-campaign',
    '/programs/waste-management': '/programs/waste-management',
    '/programs/pollution-lab': '/programs/pollution-lab',
    '/programs/climate-action-plan': '/programs/climate-action-plan',
    '/programs/five-million-trees': '/programs/five-million-trees',
  };

  // Check if the current path should be redirected
  const redirectPath = routeRedirects[location.pathname];
  
  if (redirectPath && redirectPath !== location.pathname) {
    return <Navigate to={redirectPath} replace />;
  }

  // If no redirect is needed, show 404 page
  return <NotFound />;
};

export default CatchAllRoute;
