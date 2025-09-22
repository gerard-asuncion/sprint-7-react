import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, clearMovieDetail } from '../store/moviesDetailSlice'; // Asegúrate que la ruta sea correcta
import type { RootState, AppDispatch } from '../store/store'; // Asegúrate que la ruta sea correcta

export const useMovieDetail = () => {
  // 1. Obtenemos el ID de la URL
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // 2. Seleccionamos los datos del estado de Redux
  const { details, director, loading, error } = useSelector(
    (state: RootState) => state.movieDetail
  );

  // 3. Manejamos el ciclo de vida y la obtención de datos
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }

    // Función de limpieza: se ejecuta cuando el componente se desmonta
    return () => {
      dispatch(clearMovieDetail());
    };
  }, [dispatch, id]);

  // 4. Devolvemos todo lo que el componente necesita para renderizar
  return { id, details, director, loading, error };
};
