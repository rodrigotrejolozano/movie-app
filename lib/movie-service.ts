import {
  MOCK_MOVIES,
  TRENDING_MOVIES,
  TOP_RATED_MOVIES,
  NOW_PLAYING_MOVIES,
} from "./mock-data";
import type { Movie, PaginatedResponse, SearchFilters } from "@/types";

const API_KEY = process.env.API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromTMDB<T>(
  endpoint: string,
  revalidate = 3600,
): Promise<T | null> {
  if (!API_KEY) return null;

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${TMDB_BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=es-ES`;

  try {
    const response = await fetch(url, {
      next: { revalidate },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`TMDB API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`[fetchFromTMDB] Error fetching ${endpoint}:`, error);
    return null;
  }
}

// Utility function to build image URLs
export const getImageUrl = (
  path: string | null,
  size: "w200" | "w500" | "original" = "w500",
) => {
  if (!path) return "/placeholder.svg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Movie Service - direct TMDB integration (Server-side only)
export const movieService = {
  async getTrending(page = 1): Promise<PaginatedResponse> {
    const data = await fetchFromTMDB<PaginatedResponse>(
      `/trending/movie/week?page=${page}`,
      3600,
    );
    if (!data) {
      return {
        results: TRENDING_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: TRENDING_MOVIES.length,
      };
    }
    return data;
  },

  async getTopRated(page = 1): Promise<PaginatedResponse> {
    const data = await fetchFromTMDB<PaginatedResponse>(
      `/movie/top_rated?page=${page}`,
      3600,
    );
    if (!data) {
      return {
        results: TOP_RATED_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: TOP_RATED_MOVIES.length,
      };
    }
    return data;
  },

  async getNowPlaying(page = 1): Promise<PaginatedResponse> {
    const data = await fetchFromTMDB<PaginatedResponse>(
      `/movie/now_playing?page=${page}`,
      3600,
    );
    if (!data) {
      return {
        results: NOW_PLAYING_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: NOW_PLAYING_MOVIES.length,
      };
    }
    return data;
  },

  async search(
    query: string,
    page = 1,
    filters?: Partial<SearchFilters>,
  ): Promise<PaginatedResponse> {
    const params = new URLSearchParams({
      query,
      page: String(page),
    });

    if (filters?.year)
      params.append("primary_release_year", String(filters.year));

    const data = await fetchFromTMDB<PaginatedResponse>(
      `/search/movie?${params.toString()}`,
      3600,
    );

    if (!data) {
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
    return data;
  },

  async getMovieDetails(movieId: number): Promise<Movie | null> {
    const data = await fetchFromTMDB<Movie>(
      `/movie/${movieId}?append_to_response=videos,recommendations`,
      7200,
    );
    if (!data) {
      return MOCK_MOVIES.find((m) => m.id === movieId) || null;
    }
    return data;
  },

  async discover(
    filters: Partial<SearchFilters>,
    page = 1,
  ): Promise<PaginatedResponse> {
    const params = new URLSearchParams({
      page: String(page),
    });

    if (filters.year)
      params.append("primary_release_year", String(filters.year));
    if (filters.genreId) params.append("with_genres", String(filters.genreId));
    if (filters.minRating)
      params.append("vote_average.gte", String(filters.minRating));
    if (filters.sortBy) {
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

    const data = await fetchFromTMDB<PaginatedResponse>(
      `/discover/movie?${params.toString()}`,
      3600,
    );

    if (!data) {
      return {
        results: TRENDING_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: TRENDING_MOVIES.length,
      };
    }
    return data;
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
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    return filtered;
  },
};
