import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    // Muestra un mensaje de carga mientras se verifica la sesión
    return <div>Cargando...</div>;
  }

  if (!session) {
    // Si no hay sesión, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión, muestra el contenido de la ruta anidada
  return <Outlet />;
};

export default ProtectedRoute;
