import { useState } from 'react';
import { supabase } from '../providers/AuthProvider';

export const useSignOut = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  async function signOut() {
		
    try {
      setLoading(true);
      setError(null);

      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

    } catch (err: unknown) {

      if (err instanceof Error) {
        setError(err);
        console.error("Error signing out:", err.message);
      } else {
        const unknownError = new Error('Ocurrió un error inesperado al cerrar sesión');
        setError(unknownError);
        console.error("Error signing out:", unknownError);
      }

    } finally {
      setLoading(false);
    }
  }

  return { signOut, loading, error };
};

export default useSignOut;
