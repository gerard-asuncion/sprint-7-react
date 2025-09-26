import { createContext, useContext } from "react";
import type { AuthContextType } from "../types/types";

export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
