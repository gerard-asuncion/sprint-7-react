import { useAuth } from '../providers/AuthProvider';
import App from '../App';
import LoginPage from './LoginPage';

export default function AuthGate() {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <LoginPage />;
  }

  return <App />;
}
