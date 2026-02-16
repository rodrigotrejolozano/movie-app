import { NextRequest } from "next/server";
import { rateLimit, createRateLimitedResponse } from "@/lib/rate-limit";
import { NOW_PLAYING_MOVIES } from "@/lib/mock-data";
import type { PaginatedResponse } from "@/types";

export async function GET(request: NextRequest): Promise<Response> {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  try {
    const limit = await rateLimit();
    if (!limit.success) {
      return createRateLimitedResponse({ error: "Too many requests" }, limit);
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    if (!API_KEY) {
      const response: PaginatedResponse = {
        results: NOW_PLAYING_MOVIES.slice(0, 20),
        page: 1,
        total_pages: 1,
        total_results: NOW_PLAYING_MOVIES.length,
      };

      return createRateLimitedResponse(response, limit);
    }

    const tmdbResponse = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&language=en-US`,
      {
        next: { revalidate: 3600 },
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!tmdbResponse.ok) {
      throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
    }

    const data = await tmdbResponse.json();

    return createRateLimitedResponse(data, limit);
  } catch (error) {
    console.error("[API] Now-playing error:", error);

    // Fallback to mock data
    const mockResponse: PaginatedResponse = {
      results: NOW_PLAYING_MOVIES.slice(0, 20),
      page: 1,
      total_pages: 1,
      total_results: NOW_PLAYING_MOVIES.length,
    };

    return createRateLimitedResponse(mockResponse, {
      success: true,
      remaining: 100,
      resetTime: Date.now() + 60000,
    });
  }
}
