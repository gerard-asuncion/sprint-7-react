import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Session } from '@supabase/supabase-js';
import { supabase } from "../lib/supabase";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "../types/types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = { session, loading };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
