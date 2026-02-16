"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart, ExternalLink, Calendar, Clock, Star } from "lucide-react";
import { HeaderApp } from "@/components/header";
import { MovieCarousel } from "@/components/movie-carousel";
import { useMovieStore } from "@/lib/store";
import { movieService, getImageUrl } from "@/lib/movie-service";
import { MOCK_MOVIES } from "@/lib/mock-data";
import Link from "next/link";
import type { Movie } from "@/types";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = parseInt(params.id as string);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorited, addFavorite, removeFavorite } = useMovieStore();

  const favorited = movie ? isFavorited(movie.id) : false;

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      const found = MOCK_MOVIES.find((m) => m.id === movieId) || null;
      setMovie(found);
      setIsLoading(false);
    };
    fetchMovie();
  }, [movieId]);

  if (isLoading) {
    return (
      <>
        <HeaderApp />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-border border-t-primary rounded-full" />
        </main>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <HeaderApp />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-foreground">
                Movie not found
              </h1>
              <p className="text-muted-foreground">
                The movie you're looking for doesn't exist.
              </p>
              <Link
                href="/explore"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Back to Explore
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const releaseYear = movie.release_date.split("-")[0];
  const rating = movie.vote_average.toFixed(1);

  // Get related movies
  const relatedMovies = MOCK_MOVIES.filter(
    (m) =>
      m.id !== movie.id && m.genre_ids.some((g) => movie.genre_ids.includes(g)),
  ).slice(0, 8);

  return (
    <>
      <HeaderApp />
      <main className="min-h-screen bg-background">
        {/* Backdrop */}
        {movie.backdrop_path && (
          <div className="relative w-full h-96 overflow-hidden">
            <img
              src={
                getImageUrl(movie.backdrop_path, "original") ||
                "/placeholder.svg"
              }
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
          {/* Movie HeaderApp */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-64">
              <img
                src={
                  getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"
                }
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
                  <p className="text-sm text-muted-foreground">Release Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <p className="font-semibold text-foreground">
                      {releaseYear}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    <p className="font-semibold text-foreground">
                      {movie.runtime ? `${movie.runtime}m` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-2">
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <p className="font-semibold text-foreground">{rating}/10</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Votes</p>
                  <p className="font-semibold text-foreground">
                    {(movie.vote_count / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Genres</p>
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
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    favorited
                      ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                      : "bg-primary/20 text-primary hover:bg-primary/30"
                  }`}
                >
                  <Heart
                    size={20}
                    className={favorited ? "fill-current" : ""}
                  />
                  {favorited ? "Saved" : "Save"}
                </button>
                <a
                  href={`https://www.themoviedb.org/movie/${movieId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  <ExternalLink size={20} />
                  View on TMDB
                </a>
              </div>
            </div>
          </div>

          {/* Related Movies */}
          {relatedMovies.length > 0 && (
            <div className="pt-8 border-t border-border">
              <MovieCarousel title="Similar Movies" movies={relatedMovies} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
