import moviesReducer, { fetchMovies, clearMovies } from '../moviesSlice';
import type { MoviesState } from '../../types/types';

describe('moviesSlice', () => {
  const initialState: MoviesState = {
    items: [],
    totalPages: 0,
    loading: false,
    error: null,
  };

  it('debería manejar el estado inicial', () => {
    expect(moviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('debería manejar clearMovies', () => {
    const stateWithMovies: MoviesState = { ...initialState, items: [{ id: 1, title: 'Movie 1', overview: '', poster_path: '', release_date: '' }] };
    expect(moviesReducer(stateWithMovies, clearMovies())).toEqual(initialState);
  });

  it('debería manejar fetchMovies.pending', () => {
    const action = { type: fetchMovies.pending.type };
    const state = moviesReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('debería manejar fetchMovies.fulfilled', () => {
    const mockMovies = { results: [{ id: 1, title: 'Test Movie', overview: '', poster_path: '', release_date: '' }], total_pages: 1 };
    const action = { type: fetchMovies.fulfilled.type, payload: mockMovies };
    const state = moviesReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockMovies.results);
    expect(state.totalPages).toBe(1);
  });

  it('debería manejar fetchMovies.rejected', () => {
    const action = { type: fetchMovies.rejected.type, payload: 'Error al cargar' };
    const state = moviesReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error al cargar');
  });
});
