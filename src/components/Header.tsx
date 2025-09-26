import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import useSignOut from '../hooks/useSignOut';

const Header = () => {
  const { id } = useParams<{ id: string }>();

	const isMoviePage = Boolean(id);

	const { signOut } = useSignOut();

  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
		<header className={`bg-blue-950 text-blue-950 flex flex-col justify-between items-center gap-8 py-10 h-40 ${!isMoviePage ? "mb-10" : ""}`}>
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
			<div className="absolute top-0 right-0 p-6">
				<button
					onClick={() => handleSignOutClick()}
					className="hover:bg-gray-100 bg-blue-950 hover:text-blue-950 text-gray-100 border-gray-100 border-2 font-bold py-2 px-4 rounded-lg"
				>
					Sign Out
				</button>
			</div>
		</header>
  );
};

export default Header;
