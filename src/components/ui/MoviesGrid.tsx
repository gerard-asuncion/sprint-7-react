import { useState, useEffect } from "react"

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
}

const MoviesGrid = () => {

    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        const API_KEY = import.meta.env.VITE_TMDB_API_KEY
        if(!API_KEY) return

        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
                );
                if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

                const data = await res.json();

                setMovies((prev) => [...prev, ...data.results]);
                setTotalPages(data.total_pages);
            } catch (err) {
                console.error("Error al obtener películas:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();

    }, [page])

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
			{movies.map((movie) => (
				<div key={movie.id} className="cursor-pointer transition-transform duration-300 transform hover:scale-102">
					{movie.poster_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
							alt={movie.title}
							className="rounded-lg"
						/>
					) : (
						<div className="bg-gray-500 rounded-lg flex items-center justify-center">{movie.title}</div>
					)}
				</div>
			))}
		</div>
  )
}

export default MoviesGrid
