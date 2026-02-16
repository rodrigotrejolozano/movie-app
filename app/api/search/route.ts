import { NextRequest } from "next/server";
import { rateLimit, createRateLimitedResponse } from "@/lib/rate-limit";
import { MOCK_MOVIES } from "@/lib/mock-data";
import type { PaginatedResponse } from "@/types";

export async function GET(request: NextRequest): Promise<Response> {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";
  const year = searchParams.get("year");
  const minRating = searchParams.get("minRating");

  try {
    const limit = await rateLimit();
    if (!limit.success) {
      return createRateLimitedResponse({ error: "Too many requests" }, limit);
    }

    if (!query) {
      return createRateLimitedResponse(
        { error: "Query parameter is required" },
        limit,
      );
    }

    // If no API key, search mock data
    if (!API_KEY) {
      let filtered = MOCK_MOVIES.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()),
      );

      // Apply filters
      if (year) {
        filtered = filtered.filter((m) => m.release_date?.startsWith(year));
      }

      if (minRating) {
        filtered = filtered.filter((m) => m.vote_average >= Number(minRating));
      }

      const response: PaginatedResponse = {
        results: filtered.slice(0, 20),
        page: 1,
        total_pages: 1,
        total_results: filtered.length,
      };

      return createRateLimitedResponse(response, limit);
    }

    // Build TMDB URL with filters
    let tmdbUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=es-ES`;
    console.log(tmdbUrl);
    if (year) tmdbUrl += `&primary_release_year=${year}`;

    const tmdbResponse = await fetch(tmdbUrl, {
      next: { revalidate: 1800 },
      headers: { "Content-Type": "application/json" },
    });

    if (!tmdbResponse.ok) {
      throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
    }

    const data = await tmdbResponse.json();

    // Apply client-side filters for rating
    if (minRating) {
      data.results = data.results.filter(
        (m: { vote_average: number }) => m.vote_average >= Number(minRating),
      );
    }

    return createRateLimitedResponse(data, limit);
  } catch (error) {
    console.error("[API] Search error:", error);

    // Fallback to mock data
    const filtered = MOCK_MOVIES.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    );

    const mockResponse: PaginatedResponse = {
      results: filtered.slice(0, 20),
      page: 1,
      total_pages: 1,
      total_results: filtered.length,
    };

    return createRateLimitedResponse(mockResponse, {
      success: true,
      remaining: 100,
      resetTime: Date.now() + 60000,
    });
  }
}
