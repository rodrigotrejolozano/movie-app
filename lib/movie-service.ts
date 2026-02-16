import {
  MOCK_MOVIES,
  TRENDING_MOVIES,
  TOP_RATED_MOVIES,
  NOW_PLAYING_MOVIES,
} from "./mock-data";
import type { Movie, PaginatedResponse, SearchFilters } from "@/types";

// Utility function to build image URLs
export const getImageUrl = (
  path: string | null,
  size: "w200" | "w500" | "original" = "w500",
) => {
  if (!path) return "/placeholder.svg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// Movie Service - all requests go through local API routes
export const movieService = {
  async getTrending(page = 1): Promise<PaginatedResponse> {
    try {
      const response = await fetch(
        `${baseUrl}/api/movies/trending?page=${page}`,
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch trending movies: ${response.statusText}`,
        );
      }

      return response.json();
    } catch (error) {
      console.error("[movieService] Error fetching trending:", error);
      return {
        results: TRENDING_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: TRENDING_MOVIES.length,
      };
    }
  },

  async getTopRated(page = 1): Promise<PaginatedResponse> {
    try {
      const response = await fetch(
        `${baseUrl}/api/movies/top-rated?page=${page}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch top-rated movies: ${response.statusText}`,
        );
      }

      return response.json();
    } catch (error) {
      console.error("[movieService] Error fetching top-rated:", error);
      return {
        results: TOP_RATED_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: TOP_RATED_MOVIES.length,
      };
    }
  },

  async getNowPlaying(page = 1): Promise<PaginatedResponse> {
    try {
      const response = await fetch(
        `${baseUrl}/api/movies/now-playing?page=${page}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch now-playing movies: ${response.statusText}`,
        );
      }

      return response.json();
    } catch (error) {
      console.error("[movieService] Error fetching now-playing:", error);
      return {
        results: NOW_PLAYING_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: NOW_PLAYING_MOVIES.length,
      };
    }
  },

  async search(
    query: string,
    page = 1,
    filters?: Partial<SearchFilters>,
  ): Promise<PaginatedResponse> {
    try {
      const params = new URLSearchParams({
        q: query,
        page: String(page),
      });

      if (filters?.year) params.append("year", String(filters.year));
      if (filters?.minRating)
        params.append("minRating", String(filters.minRating));

      const response = await fetch(
        `${baseUrl}/api/search?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to search movies: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("[movieService] Error searching:", error);

      // Fallback to mock data search
      const filtered = MOCK_MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.overview.toLowerCase().includes(query.toLowerCase()),
      );

      return {
        results: filtered,
        page: 1,
        total_pages: 1,
        total_results: filtered.length,
      };
    }
  },

  async getMovieDetails(movieId: number): Promise<Movie | null> {
    try {
      const response = await fetch(`${baseUrl}/api/movie/${movieId}`);

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(
          `Failed to fetch movie details: ${response.statusText}`,
        );
      }

      return response.json();
    } catch (error) {
      console.error("[movieService] Error fetching movie details:", error);
      return MOCK_MOVIES.find((m) => m.id === movieId) || null;
    }
  },

  async discover(
    filters: Partial<SearchFilters>,
    page = 1,
  ): Promise<PaginatedResponse> {
    try {
      const params = new URLSearchParams({
        page: String(page),
      });

      if (filters.year) params.append("year", String(filters.year));
      if (filters.genreId)
        params.append("with_genres", String(filters.genreId));
      if (filters.minRating)
        params.append("vote_average.gte", String(filters.minRating));
      if (filters.sortBy) {
        // Map sortBy to TMDB sort_by
        const sortMap = {
          popularity: "popularity.desc",
          rating: "vote_average.desc",
          release_date: "primary_release_date.desc",
        };
        params.append(
          "sort_by",
          sortMap[filters.sortBy as keyof typeof sortMap] || "popularity.desc",
        );
      }

      const response = await fetch(
        `${baseUrl}/api/discover?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to discover movies: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("[movieService] Error discovering:", error);
      return {
        results: TRENDING_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: TRENDING_MOVIES.length,
      };
    }
  },

  filterMovies(movies: Movie[], filters: SearchFilters): Movie[] {
    let filtered = movies;

    if (filters.query) {
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(filters.query.toLowerCase()) ||
          m.overview.toLowerCase().includes(filters.query.toLowerCase()),
      );
    }

    if (filters.year) {
      filtered = filtered.filter((m) =>
        m.release_date.startsWith(String(filters.year)),
      );
    }

    if (filters.genreId) {
      filtered = filtered.filter((m) => m.genre_ids.includes(filters.genreId!));
    }

    if (filters.minRating) {
      filtered = filtered.filter((m) => m.vote_average >= filters.minRating!);
    }

    // Sort
    const sortBy = filters.sortBy || "popularity";
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "release_date") {
      filtered.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    } else {
      // popularity
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    return filtered;
  },
};
