import { renderHook } from '@testing-library/react';
import useMovieDetail from '../useMovieDetail';
import { fetchMovieDetails, clearMovieDetail } from '../../store/moviesDetailSlice';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

import * as reactRedux from 'react-redux';
import * as reactRouterDom from 'react-router-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockUseParams = jest.fn();


jest.mock('react-redux', () => ({
  ...reactRedux,
  useDispatch: () => mockDispatch,
  useSelector: mockUseSelector,
}));

jest.mock('react-router-dom', () => ({
  ...reactRouterDom,
  useParams: mockUseParams,
}));


describe('useMovieDetail', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockUseSelector.mockClear();
    mockUseParams.mockClear();
  });

  it('debería despachar fetchMovieDetails al montar con un ID válido', () => {
    mockUseParams.mockReturnValue({ id: '123' });
    mockUseSelector.mockReturnValue({
      details: null,
      director: null,
      loading: false,
      error: null,
    });

    renderHook(() => useMovieDetail());

    expect(mockDispatch).toHaveBeenCalledWith(fetchMovieDetails(123));
  });

  it('debería despachar clearMovieDetail al desmontar', () => {
    mockUseParams.mockReturnValue({ id: '123' });
    mockUseSelector.mockReturnValue({
      details: { id: 123, title: 'Test Movie' },
      director: null,
      loading: false,
      error: null,
    });

    const { unmount } = renderHook(() => useMovieDetail());
    unmount();

    expect(mockDispatch).toHaveBeenCalledWith(clearMovieDetail());
  });
});
