import { createContext, useState, useEffect, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Session } from '@supabase/supabase-js';
import type { ReactNode } from "react";

// Mueve la creación del cliente de Supabase aquí o a un archivo dedicado
// Asegúrate de reemplazar con tus credenciales reales
const supabase = createClient(
	import.meta.env.VITE_APP_SUPABASE_URL,
	import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true
});

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicia la carga de la sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escucha los cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpia la suscripción al desmontar el componente
    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// Exportamos el cliente para usarlo en otros lugares si es necesario
export { supabase };
