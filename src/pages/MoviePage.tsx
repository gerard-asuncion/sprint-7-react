import Header from "../components/Header"
import MovieDetail from "../components/MovieDetail"

const MoviePage = () => {
	return (
		<section className="flex flex-col h-screen bg-black">
      <Header />
      <div className="flex-grow">
        <MovieDetail />
      </div>
    </section>
	)
}

export default MoviePage
