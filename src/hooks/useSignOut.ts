import { useState } from 'react';
import { supabase } from '../providers/AuthProvider'; // Asegúrate que la ruta sea correcta

export const useSignOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function signOut() {
    try {
      setLoading(true);
      setError(null); // Limpia errores previos

      const { error: signOutError } = await supabase.auth.signOut();

      // Si Supabase devuelve un error, lánzalo para que lo capture el 'catch'
      if (signOutError) {
        throw signOutError;
      }
    } catch (err: any) {
      setError(err);
      console.error("Error signing out:", err.message);
    } finally {
      setLoading(false); // Asegúrate de que el loading termine siempre
    }
  }

  return { signOut, loading, error };
};

export default useSignOut;
