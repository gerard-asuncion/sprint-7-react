import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchMovies } from "../store/moviesSlice";

export const useMoviesGrid = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(1);

    const { items: movies, loading, totalPages, error } = useSelector(
        (state: RootState) => state.movies
    );

    useEffect(() => {
        if (page <= totalPages || totalPages === 0) {
            dispatch(fetchMovies(page));
        }
    }, [dispatch, page, totalPages]);

    useEffect(() => {

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (
                scrollTop + clientHeight >= scrollHeight - 100 &&
                !loading &&
                page < totalPages
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, [loading, page, totalPages]);

    return { movies, loading, error };
};
