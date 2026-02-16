import { NextRequest, NextResponse } from "next/server";
import { rateLimit, createRateLimitedResponse } from "@/lib/rate-limit";
import { TRENDING_MOVIES } from "@/lib/mock-data";
import type { PaginatedResponse } from "@/types";

export async function GET(request: NextRequest): Promise<Response> {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  console.log("API_KEY", API_KEY);
  try {
    // Rate limiting (in-memory, caching via revalidate)
    const limit = await rateLimit();
    if (!limit.success) {
      return createRateLimitedResponse({ error: "Too many requests" }, limit);
    }

    // Get page from query
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    // If no API key, return mock data
    if (!API_KEY) {
      console.log("[API] Using mock data for trending movies");
      const response: PaginatedResponse = {
        results: TRENDING_MOVIES.slice(0, 20),
        page: 1,
        total_pages: 1,
        total_results: TRENDING_MOVIES.length,
      };

      return createRateLimitedResponse(response, limit);
    }
    console.log(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}&language=es-ES`,
    );
    // Fetch from TMDB - Next.js caches this automatically via revalidate
    const tmdbResponse = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}&language=es-ES`,
      {
        next: { revalidate: 3600 },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("tmdbResponse", tmdbResponse);
    console.log(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}&language=en-US`,
    );

    if (!tmdbResponse.ok) {
      throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
    }

    const data = await tmdbResponse.json();

    return createRateLimitedResponse(data, limit);
  } catch (error) {
    console.error("[API] Trending error:", error);

    // Fallback to mock data on error
    const mockResponse: PaginatedResponse = {
      results: TRENDING_MOVIES.slice(0, 20),
      page: 1,
      total_pages: 1,
      total_results: TRENDING_MOVIES.length,
    };

    const limit = await rateLimit();

    return createRateLimitedResponse(mockResponse, limit);
  }
}
