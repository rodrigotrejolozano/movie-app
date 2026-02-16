"use client";

import { useMovieStore } from "@/lib/store";
import { MovieCard } from "./movie-card";
import type { Movie } from "@/types";

interface MovieGridProps {
  movies: Movie[];
  showEmpty?: boolean;
}

export function MovieGrid({ movies, showEmpty = true }: MovieGridProps) {
  const { viewMode } = useMovieStore();

  if (movies.length === 0 && showEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            No se encontraron películas
          </h3>
          <p className="text-muted-foreground">
            Intenta ajustar tu búsqueda o los filtros
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex gap-4 p-4 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
          >
            <div className="w-24 h-32 flex-shrink-0">
              <MovieCard movie={movie} size="sm" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {movie.release_date.split("-")[0]} · ★{" "}
                {movie.vote_average.toFixed(1)}
              </p>
              <p className="text-sm text-foreground line-clamp-2">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
