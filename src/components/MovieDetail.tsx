import { useParams } from 'react-router-dom'

const MovieDetail = () => {

	const { id } = useParams<{ id: string }>();

  if (!id) return <p>ID no vàlid</p>;

  const movieId = Number(id);

	return (
		<div className='text-white'>
			{movieId}
		</div>
	)
}

export default MovieDetail
