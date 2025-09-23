import { useAuth, supabase } from '../providers/AuthProvider';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import App from '../App'; // Tu componente App con las rutas

export default function AuthGate() {
  const { session, loading } = useAuth();

  // Muestra un indicador de carga mientras se verifica la sesión
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay sesión, muestra el formulario de login
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  // Si hay sesión, muestra tu aplicación principal
  return <App />;
}
