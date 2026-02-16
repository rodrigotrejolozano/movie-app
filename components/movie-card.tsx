'use client';

import React from "react"

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useMovieStore } from '@/lib/store';
import { getImageUrl } from '@/lib/movie-service';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
}

export function MovieCard({ movie, size = 'md' }: MovieCardProps) {
  const { isFavorited, addFavorite, removeFavorite } = useMovieStore();
  const [isHovered, setIsHovered] = useState(false);
  const favorited = isFavorited(movie.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const sizes = {
    sm: 'h-48 w-32',
    md: 'h-80 w-52',
    lg: 'h-96 w-64',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster Image */}
        <div className={`${sizes[size]} relative overflow-hidden rounded-xl bg-muted`}>
          <img
            src={getImageUrl(movie.poster_path, 'w500') || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={20}
              className={`transition-colors ${
                favorited
                  ? 'fill-red-500 text-red-500'
                  : 'text-white group-hover:text-red-500'
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
          {isHovered && (
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
              <h3 className={`font-bold line-clamp-2 ${titleSizes[size]}`}>
                {movie.title}
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                {movie.release_date.split('-')[0]}
              </p>
            </div>
          )}
        </div>

        {/* Title Below Card */}
        <div className="mt-3 space-y-1">
          <h3 className={`font-semibold ${titleSizes[size]} line-clamp-2 text-foreground`}>
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {movie.release_date.split('-')[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}
