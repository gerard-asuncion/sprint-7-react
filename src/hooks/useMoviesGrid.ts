import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store"; // Ajusta la ruta a tu store
import { fetchMovies } from "../store/moviesSlice"

export const useMoviesGrid = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Estado local para la página actual
    const [page, setPage] = useState<number>(1);

    // Selección de datos del store de Redux
    const { items: movies, loading, totalPages, error } = useSelector(
        (state: RootState) => state.movies
    );

    // Efecto para hacer fetch de las películas cuando la página cambia
    useEffect(() => {
        // Solo hacemos fetch si no estamos cargando y hay más páginas por cargar
        if (page <= totalPages || totalPages === 0) {
            dispatch(fetchMovies(page));
        }
    }, [dispatch, page, totalPages]);

    // Efecto para manejar el scroll infinito
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            // Condición para cargar más películas antes de llegar al final
            if (
                scrollTop + clientHeight >= scrollHeight - 100 &&
                !loading &&
                page < totalPages
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Limpieza del evento al desmontar el componente
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, page, totalPages]);

    // Lo que el hook devuelve al componente
    return { movies, loading, error };
};
