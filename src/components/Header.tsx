import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store/store'
import type { Movie } from '../types/types'

const Header = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // Accedes a las películas desde Redux (o como tú manejes el estado)
  const movies = useSelector((state: RootState) => state.movies.items);

  // Busca la película actual si estás en /movie/:id
  const currentMovie: Movie | null = id ? movies.find((movie: Movie) => movie.id === parseInt(id))! : null

  // Decide el texto del h1 según la ruta
  let movieTitle = ""; // default o nombre de página

  if (location.pathname.startsWith("/movie/") && currentMovie) {
    movieTitle = currentMovie.title;
  }

  return (
		<header className="bg-blue-950 text-blue-950 py-6 mb-10 text-center">
			<div className="inline-block px-6 py-4 mx-auto rounded-2xl bg-gray-100 shadow-xl">
				<h1 className="text-3xl font-bold tracking-wide text-center">
					MOVIES DIRECTORY
				</h1>
				<h2 className="text-xl text-center">
					{movieTitle}
				</h2>
			</div>
		</header>
  );
};

export default Header;
