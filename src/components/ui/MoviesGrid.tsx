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

        console.log(totalPages)

    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (
                scrollTop + clientHeight >= scrollHeight &&
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
    <div>
        <h1>Películas Populares</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {movies.map((movie) => (
          <div key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "300px", borderRadius: "10px" }}
              />
            ) : (
              <div
                style={{
                  width: "200px",
                  height: "300px",
                  background: "#ccc",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              > {movie.title}
              </div>
            )}
          </div>
        ))}
      </div>

      {loading && <p>Cargando más películas...</p>}
      
    </div>
  )
}

export default MoviesGrid
