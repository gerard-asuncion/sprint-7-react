import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { MovieDetails, CrewMember, CreditsResponse, Director, MovieDetailState } from '../types/types'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// L'Async Thunk per anar a buscar les dades
// Farà dues crides a l'API en paral·lel per ser més eficient
export const fetchMovieDetails = createAsyncThunk<
  { details: MovieDetails; credits: CreditsResponse }, // Tipus del que retorna si té èxit
  number, // Tipus de l'argument que rep (el movie_id)
  { rejectValue: string } // Tipus del que retorna si falla
>('movieDetail/fetchMovieDetails', async (movieId, { rejectWithValue }) => {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const params = {
    api_key: API_KEY,
    language: 'es-ES',
  };

  try {
    // Fem les dues crides alhora amb Promise.all
    const [detailsResponse, creditsResponse] = await Promise.all([
      axios.get<MovieDetails>(detailsUrl, { params }),
      axios.get<CreditsResponse>(creditsUrl, { params }),
    ]);

    // Retornem les dades de les dues respostes
    return {
      details: detailsResponse.data,
      credits: creditsResponse.data,
    };
  } catch (error: unknown) {
    // Gestió d'errors (similar al teu slice original)
    let message = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        message = `Error ${error.response.status}: ${error.response.data.status_message}`;
      } else if (error.request) {
        message = 'No se recibió respuesta del servidor';
      } else {
        message = error.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

const initialState: MovieDetailState = {
  details: null,
  director: null,
  loading: false,
  error: null,
};

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    // Podem afegir un reducer per netejar l'estat quan sortim de la pàgina de detall
    clearMovieDetail: (state) => {
      state.details = null;
      state.director = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.details;

        // Busquem el director dins de l'array 'crew'
        const directorData: CrewMember | undefined = action.payload.credits.crew.find(
          (member) => member.job === 'Director'
        );

        if (directorData) {
          state.director = {
            name: directorData.name,
            profile_path: directorData.profile_path,
          };
        } else {
            state.director = null; // En cas que no es trobi
        }
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al cargar detalles';
      });
  },
});

export const { clearMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
