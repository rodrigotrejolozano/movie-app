"use client";

import { Heart } from "lucide-react";
import { useMovieStore } from "@/lib/store";
import type { Movie } from "@/types";

interface FavoriteButtonProps {
  movie: Movie;
}

export function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { isFavorited, addFavorite, removeFavorite } = useMovieStore();
  const favorited = isFavorited(movie.id);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
        favorited
          ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          : "bg-primary/20 text-primary hover:bg-primary/30"
      }`}
    >
      <Heart size={20} className={favorited ? "fill-current" : ""} />
      {favorited ? "Guardado" : "Guardar"}
    </button>
  );
}
