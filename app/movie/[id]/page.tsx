import { ExternalLink, Calendar, Clock, Star } from "lucide-react";
import { HeaderApp } from "@/components/header";
import { MovieCarousel } from "@/components/movie-carousel";
import { movieService, getImageUrl } from "@/lib/movie-service";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const movie = await movieService.getMovieDetails(parseInt(resolvedParams.id));

  if (!movie) {
    return (
      <>
        <HeaderApp />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-foreground">
                Película no encontrada
              </h1>
              <p className="text-muted-foreground">
                La película que buscas no existe o hubo un error al cargarla.
              </p>
              <Link
                href="/explore"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Volver a Explorar
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0";
  const relatedMovies = movie.recommendations?.results?.slice(0, 10) || [];

  return (
    <>
      <HeaderApp />
      <main className="min-h-screen bg-background">
        {/* Backdrop */}
        {movie.backdrop_path && (
          <div className="relative w-full h-96 overflow-hidden">
            <img
              src={getImageUrl(movie.backdrop_path, "original")}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-64">
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6 pt-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {movie.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {movie.overview}
                </p>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Fecha de Lanzamiento
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <p className="font-semibold text-foreground">
                      {releaseYear}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duración</p>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    <p className="font-semibold text-foreground">
                      {movie.runtime ? `${movie.runtime}m` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Calificación</p>
                  <div className="flex items-center gap-2">
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <p className="font-semibold text-foreground">{rating}/10</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Votos</p>
                  <p className="font-semibold text-foreground">
                    {movie.vote_count
                      ? (movie.vote_count / 1000).toFixed(1) + "K"
                      : "0"}
                  </p>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Géneros</p>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <FavoriteButton movie={movie} />
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  <ExternalLink size={20} />
                  Ver en TMDB
                </a>
              </div>
            </div>
          </div>

          {/* Related Movies */}
          {relatedMovies.length > 0 && (
            <div className="pt-8 border-t border-border">
              <MovieCarousel
                title="Películas Recomendadas"
                movies={relatedMovies}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
