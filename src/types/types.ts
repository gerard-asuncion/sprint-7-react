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
