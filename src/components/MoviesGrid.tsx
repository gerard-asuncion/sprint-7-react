import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchMovies } from "../store/moviesSlice"
import type { RootState, AppDispatch } from "../store/store"
import type { Movie } from "../types/types"

const MoviesGrid = () => {

    const dispatch = useDispatch<AppDispatch>();
		const navigate = useNavigate();

    // Página local (para scroll infinito)
    const [page, setPage] = useState<number>(1);

    // Accede al estado desde Redux
    const movies = useSelector((state: RootState) => state.movies.items);
    const loading = useSelector((state: RootState) => state.movies.loading);
    const totalPages = useSelector((state: RootState) => state.movies.totalPages);
    const error = useSelector((state: RootState) => state.movies.error);

    // Disparar la llamada a la API cuando cambia la página
    useEffect(() => {
        dispatch(fetchMovies(page));
    }, [dispatch, page]);

    // Scroll infinito
    useEffect(() => {
        const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (
            scrollTop + clientHeight >= scrollHeight - 100 &&
            !loading &&
            page < totalPages
        ) {
            setPage((prev) => prev + 1);
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, page, totalPages]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-2 max-w-95/100 mx-auto">
        {movies.map((movie: Movie) => (
            <div
                key={movie.id}
                className="cursor-pointer transition-transform duration-300 transform hover:scale-102"
								onClick={() => navigate(`/movie/${movie.id}`)}
            >
                {movie.poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg"
                />
                ) : (
                <div className="bg-gray-500 rounded-lg flex items-center justify-center">
                    {movie.title}
                </div>
                )}
            </div>
        ))}

        {loading && (
            <p className="col-span-full text-center text-gray-500 mt-4">Cargando...</p>
        )}

        {error && (
            <p className="col-span-full text-center text-red-500 mt-4">{error}</p>
        )}
    </div>
  )
}

export default MoviesGrid
