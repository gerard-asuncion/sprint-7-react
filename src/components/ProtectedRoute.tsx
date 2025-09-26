import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

const ProtectedRoute = () => {

  const { session, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
