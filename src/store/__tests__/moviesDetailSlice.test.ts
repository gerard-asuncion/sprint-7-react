import movieDetailReducer, { clearMovieDetail } from '../moviesDetailSlice';
import type { MovieDetailState } from '../../types/types';

describe('movieDetailSlice', () => {
  const initialState: MovieDetailState = {
    details: null,
    director: null,
    loading: false,
    error: null,
  };

  it('debería manejar el estado inicial', () => {
    expect(movieDetailReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('debería manejar clearMovieDetail', () => {
    const stateWithDetails: MovieDetailState = {
      ...initialState,
      details: { id: 1, title: 'Movie Detail', overview: '', poster_path: '' },
      director: { name: 'Director', profile_path: '' }
    };
    expect(movieDetailReducer(stateWithDetails, clearMovieDetail())).toEqual(initialState);
  });

});
