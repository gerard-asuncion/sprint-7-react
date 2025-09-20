import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const Header = () => {
  const { id } = useParams<{ id: string }>();

	const isMoviePage = Boolean(id)

  return (
		<header className="bg-blue-950 text-blue-950 flex flex-col justify-between items-center gap-8 py-10 mb-10 h-40">
			<div className="px-6 py-4 rounded-2xl bg-gray-100 shadow-xl">
				{isMoviePage ? (
          <Link to="/" className="font-bold cursor-pointer text-center">
            <h1 className="text-3xl md:text-4xl tracking-wide">MOVIES DIRECTORY</h1>
						<h2 className="text-xl">return to main menu</h2>
          </Link>
        ) : (
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">MOVIES DIRECTORY</h1>
        )}
			</div>
		</header>
  );
};

export default Header;
