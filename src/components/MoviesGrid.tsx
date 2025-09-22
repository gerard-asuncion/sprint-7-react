import { useNavigate } from "react-router-dom"
import type { Movie } from "../types/types"
import { useMoviesGrid } from "../hooks/useMoviesGrid"

const MoviesGrid = () => {

  const navigate = useNavigate();

	const { movies, loading, error } = useMoviesGrid();

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
