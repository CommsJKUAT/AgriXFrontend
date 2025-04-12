import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' && 
                         localStorage.getItem('access_token');

  if (!isAuthenticated) {
    
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
