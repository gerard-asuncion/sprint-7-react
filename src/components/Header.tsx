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
		<header className="bg-blue-950 text-blue-950 flex flex-col justify-between items-center gap-8 py-10 mb-10">
			<div className="px-6 py-4 rounded-2xl bg-gray-100 shadow-xl">
				<h1 className="text-3xl font-bold tracking-wide">
					MOVIES DIRECTORY
				</h1>
			</div>
			<div className="text-gray-100 text-xl font-bold">
				{movieTitle && (
        	<h2 className="text-xl">{movieTitle}</h2>
      	)}
			</div>
		</header>
  );
};

export default Header;
