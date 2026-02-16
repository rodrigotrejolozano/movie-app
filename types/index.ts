export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  runtime?: number;
  genres?: Genre[];
  videos?: {
    results: Video[];
  };
  recommendations?: {
    results: Movie[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface SearchFilters {
  query: string;
  year?: number;
  genreId?: number;
  minRating?: number;
  sortBy?: "popularity" | "rating" | "release_date";
}

export interface PaginatedResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
