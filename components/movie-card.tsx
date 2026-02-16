"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useMovieStore } from "@/lib/store";
import { getImageUrl } from "@/lib/movie-service";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
  size?: "sm" | "md" | "lg";
}

export function MovieCard({ movie, size = "md" }: MovieCardProps) {
  const { isFavorited, addFavorite, removeFavorite } = useMovieStore();
  const [isHovered, setIsHovered] = useState(false);
  const favorited = isFavorited(movie.id);
  const mounted = useMounted();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const sizes = {
    sm: "w-24 h-32 shrink-0",
    md: "h-72 w-44",
    lg: "h-96 w-64",
  };

  const titleSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (!mounted) {
    return <div className="h-32 w-full rounded-lg bg-muted animate-pulse" />;
  }
  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster Image */}
        <div
          className={`${sizes[size]} relative overflow-hidden rounded-xl bg-muted`}
        >
          <div
            className={`
            relative overflow-hidden rounded-lg bg-muted
            ${sizes[size]}
          `}
          >
            <picture>
              <img
                src={
                  getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </picture>

            {/* FAVORITE */}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
            >
              <Heart
                size={18}
                className={
                  favorited
                    ? "fill-red-500 text-red-500"
                    : "text-white group-hover:text-red-500"
                }
              />
            </button>

            {/* RATING */}
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-semibold">
              ★ {movie.vote_average.toFixed(1)}
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
            aria-label={
              favorited ? "Quitar de favoritos" : "Añadir a favoritos"
            }
          >
            <Heart
              size={20}
              className={`transition-colors ${
                favorited
                  ? "fill-red-500 text-red-500"
                  : "text-white group-hover:text-red-500"
              }`}
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
            <span className="text-yellow-400 font-bold text-sm">★</span>
            <span className="text-white font-semibold text-sm">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Hover Info */}
        </div>

        {/* Title Below Card */}
        {size !== "sm" && (
          <div className="mt-3 space-y-1">
            <h3
              className={`font-semibold ${titleSizes[size]} line-clamp-2 text-foreground`}
            >
              {movie.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {movie.release_date.split("-")[0]}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

const useMounted = () => {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
};
