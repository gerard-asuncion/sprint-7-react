import { useMovieDetail } from '../hooks/useMovieDetail'; // 1. Importamos el hook

const MovieDetail = () => {
  // 2. Usamos el hook para obtener todo lo que necesitamos
  const { id, details, director, loading, error } = useMovieDetail();

  // El resto del componente se mantiene igual, pero ahora está limpio de lógica
  if (!id) return <p>ID no válido</p>;
  if (loading) return <p>Cargando datos de la película...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!details) return <p>No hay datos disponibles.</p>;

  return (
    <article className="grid grid-cols-1 md:grid-cols-3 bg-black md:h-full md:overflow-hidden md:p-12">
      {/* Columna 1: Pòster de la pel·lícula */}
      <div className="md:col-span-1 flex justify-center items-start overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
          className="w-auto h-auto max-h-[500px] md:h-full md:max-w-full object-contain md:object-contain"
        />
      </div>

      {/* Columna 2: Informació de la pel·lícula */}
      <div className="md:col-span-2 text-neutral-200 flex flex-col justify-center gap-10 overflow-y-auto md:overflow-y-hidden">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          {details.title}
        </h1>

        {/* Secció del Director */}
        {director && (
          <div className="flex items-center gap-4">
            {director.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                alt={director.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-neutral-700"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-xl border-2 border-neutral-700">
                👤
              </div>
            )}
            <div>
              <p className="text-md text-neutral-400">Director</p>
              <p className="text-xl font-medium text-white">{director.name}</p>
            </div>
          </div>
        )}

        {/* Secció de la Sinopsi */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Sinopsis</h2>
          <p className="text-neutral-300 leading-relaxed max-w-3xl text-md">
            {details.overview || 'La sinopsi no està disponible.'}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MovieDetail;
