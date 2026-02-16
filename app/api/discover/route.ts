import { NextRequest } from "next/server";
import { rateLimit, createRateLimitedResponse } from "@/lib/rate-limit";
import { TRENDING_MOVIES } from "@/lib/mock-data";
import type { PaginatedResponse } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<Response> {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const year = searchParams.get("year");
  const with_genres = searchParams.get("with_genres");
  const vote_average_gte = searchParams.get("vote_average.gte");
  const sort_by = searchParams.get("sort_by") || "popularity.desc";

  try {
    const limit = await rateLimit();
    if (!limit.success) {
      return createRateLimitedResponse({ error: "Too many requests" }, limit);
    }

    // If no API key, return mock data (subset)
    if (!API_KEY) {
      const response: PaginatedResponse = {
        results: TRENDING_MOVIES.slice(0, 20),
        page: 1,
        total_pages: 1,
        total_results: TRENDING_MOVIES.length,
      };
      return createRateLimitedResponse(response, limit);
    }

    // Build TMDB URL for discover
    let tmdbUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&language=es-ES&sort_by=${sort_by}`;

    if (year) tmdbUrl += `&primary_release_year=${year}`;
    if (with_genres) tmdbUrl += `&with_genres=${with_genres}`;
    if (vote_average_gte) tmdbUrl += `&vote_average.gte=${vote_average_gte}`;

    const tmdbResponse = await fetch(tmdbUrl, {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });

    if (!tmdbResponse.ok) {
      throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
    }

    const data = await tmdbResponse.json();
    return createRateLimitedResponse(data, limit);
  } catch (error) {
    console.error("[API] Discover error:", error);

    const mockResponse: PaginatedResponse = {
      results: TRENDING_MOVIES.slice(0, 20),
      page: 1,
      total_pages: 1,
      total_results: TRENDING_MOVIES.length,
    };

    return createRateLimitedResponse(mockResponse, {
      success: true,
      remaining: 100,
      resetTime: Date.now() + 60000,
    });
  }
}
