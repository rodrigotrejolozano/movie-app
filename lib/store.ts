'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchFilters, Movie } from '@/types';

interface MovieStore {
  favorites: Movie[];
  filters: SearchFilters;
  viewMode: 'grid' | 'list';

  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorited: (movieId: number) => boolean;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  year: undefined,
  genreId: undefined,
  minRating: 0,
  sortBy: 'popularity',
};

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      filters: defaultFilters,
      viewMode: 'grid',

      addFavorite: (movie) => {
        const { isFavorited } = get();
        if (!isFavorited(movie.id)) {
          set((state) => ({
            favorites: [movie, ...state.favorites],
          }));
        }
      },

      removeFavorite: (movieId) => {
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        }));
      },

      isFavorited: (movieId) => {
        const { favorites } = get();
        return favorites.some((m) => m.id === movieId);
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      resetFilters: () => {
        set({ filters: defaultFilters });
      },

      setViewMode: (mode) => {
        set({ viewMode: mode });
      },
    }),
    {
      name: 'movie-store',
      version: 1,
    }
  )
);
