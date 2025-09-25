import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, clearMovieDetail } from '../store/moviesDetailSlice';
import type { RootState, AppDispatch } from '../store/store';

const useMovieDetail = () => {

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { details, director, loading, error } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }

    return () => {
      dispatch(clearMovieDetail());
    };
  }, [dispatch, id]);

  return { id, details, director, loading, error };

};

export default useMovieDetail
