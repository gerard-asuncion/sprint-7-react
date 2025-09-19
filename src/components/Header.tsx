import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store/store'

const Header = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const movies = useSelector((state: RootState) => state.movies.items);

  return (
		<header className="bg-blue-950 text-blue-950 flex flex-col justify-between items-center gap-8 py-10 mb-10 h-40">
			<div className="px-6 py-4 rounded-2xl bg-gray-100 shadow-xl">
				<h1 className="text-3xl font-bold tracking-wide">
					MOVIES DIRECTORY
				</h1>
			</div>
		</header>
  );
};

export default Header;
