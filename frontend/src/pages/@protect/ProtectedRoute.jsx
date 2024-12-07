import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;  
};

const ProtectedRoute = ({ element }) => {
  
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;  
  }

  
  return element;
};

export default ProtectedRoute;
