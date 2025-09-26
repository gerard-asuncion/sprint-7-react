import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Movie, MoviesState } from '../types/types'

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = createAsyncThunk<
{ results: Movie[]; total_pages: number }, number, { rejectValue: string }>(
  'movies/fetchMovies',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: API_KEY,
          language: 'es-ES',
          page,
        },
      });

      return response.data;
    } catch (error: unknown) {

      let message: string = 'Error desconocido';

      if(axios.isAxiosError(error)){
        if (error.response) {
            message = `Error ${error.response.status}: ${error.response.data.status_message}`;
          } else if (error.request) {
            message = 'No se recibió respuesta del servidor';
          } else {
            message = error.message;
          }
      } else if (error instanceof Error){
        message = error.message
      }

      return rejectWithValue(message);
    }
  }
);

const initialState: MoviesState = {
    items: [],
    totalPages: 0,
    loading: false,
    error: null
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.items = [];
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;

        // --- CANVI CLAU AQUÍ ---
        // Crea un conjunt (Set) amb els IDs de les pel·lícules que ja tenim
        const existingMovieIds = new Set(state.items.map(movie => movie.id));

        // Filtra les noves pel·lícules per afegir només les que no existeixen
        const newMovies = action.payload.results.filter(
          movie => !existingMovieIds.has(movie.id)
        );

        // Afegeix només les pel·lícules úniques a l'estat
        state.items = [...state.items, ...newMovies];
        // --- FI DEL CANVI ---

        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      });
  },
});

export const { clearMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
