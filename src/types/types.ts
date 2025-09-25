import type { Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
  }

export interface MoviesState {
    items: Movie[];
    totalPages: number;
    loading: boolean;
    error: string | null;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  crew: CrewMember[];
}

export interface Director {
    name: string;
    profile_path: string | null;
}

export interface MovieDetailState {
  details: MovieDetails | null;
  director: Director | null;
  loading: boolean;
  error: string | null;
}

export type AuthData = {
	loading: boolean;
	session: Session | null;
};

export interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}
