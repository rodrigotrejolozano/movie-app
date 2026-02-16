"use client";

import { useEffect, useRef, useState } from "react";
import { HeaderApp } from "@/components/header";
import { SearchFilters } from "@/components/search-filters";
import { MovieGrid } from "@/components/movie-grid";
import { useMovieStore } from "@/lib/store";
import { movieService } from "@/lib/movie-service";
import { MOCK_MOVIES } from "@/lib/mock-data";
import type { Movie } from "@/types";

export default function ExplorePage() {
  const { filters } = useMovieStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter and display movies
  const filteredMovies = movieService.filterMovies(MOCK_MOVIES, filters);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setMovies(filteredMovies);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, filteredMovies]);

  // Infinite scroll handler
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          movies.length < filteredMovies.length
        ) {
          // Load more movies (in this case, already loaded above)
          setMovies((prev) => [
            ...prev,
            ...filteredMovies.slice(prev.length, prev.length + 12),
          ]);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [movies.length, filteredMovies]);

  return (
    <>
      <HeaderApp />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Filters */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-6">
              Explorar Películas
            </h1>
            <SearchFilters />
          </div>

          {/* Results */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {movies.length} película{movies.length !== 1 ? "s" : ""}{" "}
              encontrada{movies.length !== 1 ? "s" : ""}
            </p>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-80 w-52 bg-muted rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                <MovieGrid movies={movies} />

                {/* Infinite Scroll Trigger */}
                {movies.length < filteredMovies.length && (
                  <div
                    ref={observerTarget}
                    className="flex justify-center py-8"
                  >
                    <div className="animate-spin w-8 h-8 border-4 border-border border-t-primary rounded-full" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
