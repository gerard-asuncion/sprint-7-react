import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { MovieDetails, CrewMember, CreditsResponse, MovieDetailState } from '../types/types'

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovieDetails = createAsyncThunk<
  { details: MovieDetails; credits: CreditsResponse },
  number,
  { rejectValue: string }
>('movieDetail/fetchMovieDetails', async (movieId, { rejectWithValue }) => {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const params = {
    api_key: API_KEY,
    language: 'es-ES',
  };

  try {
    const [detailsResponse, creditsResponse] = await Promise.all([
      axios.get<MovieDetails>(detailsUrl, { params }),
      axios.get<CreditsResponse>(creditsUrl, { params }),
    ]);

    return {
      details: detailsResponse.data,
      credits: creditsResponse.data,
    };

  } catch (error: unknown) {
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

        const directorData: CrewMember | undefined = action.payload.credits.crew.find(
          (member) => member.job === 'Director'
        );

        if (directorData) {
          state.director = {
            name: directorData.name,
            profile_path: directorData.profile_path,
          };
        } else {
            state.director = null;
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
