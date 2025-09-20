import Header from "../components/Header"
import MovieDetail from "../components/MovieDetail"

const MoviePage = () => {
  return (
    <section className="flex flex-col h-screen bg-black">
      <Header />
      {/* En pantalles petites, el contenidor no té una alçada fixa */}
      {/* En pantalles mitjanes i grans, ocupa tot l'espai restant */}
      <div className="md:flex-1 md:overflow-hidden">
        <MovieDetail />
      </div>
    </section>
  )
}

export default MoviePage
