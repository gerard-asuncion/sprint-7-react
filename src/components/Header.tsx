import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store/store'
import type { Movie } from '../types/types'

const Header = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const movies = useSelector((state: RootState) => state.movies.items);

  const currentMovie: Movie | null = id ? movies.find((movie: Movie) => movie.id === parseInt(id))! : null

  let movieTitle: string = "";

  if (location.pathname.startsWith("/movie/") && currentMovie) {
    movieTitle = currentMovie.title;
  }

  return (
		<header className="bg-blue-950 text-blue-950 py-6 mb-10 text-center">
			<div className="inline-flex flex-col px-6 py-4 mx-auto rounded-2xl bg-gray-100 shadow-xl gap-3">
				<h1 className="text-3xl font-bold tracking-wide">
					MOVIES DIRECTORY
				</h1>
				{movieTitle && (
        	<h2 className="text-xl">{movieTitle}</h2>
      	)}
			</div>
		</header>
  );
};

export default Header;
