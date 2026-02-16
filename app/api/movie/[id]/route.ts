import { NextRequest } from 'next/server';
import { rateLimit, createRateLimitedResponse } from '@/lib/rate-limit';
import { MOCK_MOVIES } from '@/lib/mock-data';
import type { Movie } from '@/types';

export const revalidate = 7200; // Cache for 2 hours

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const limit = rateLimit();
    if (!limit.success) {
      return createRateLimitedResponse(
        { error: 'Too many requests' },
        limit
      );
    }

    const { id } = params;

    if (!id) {
      return createRateLimitedResponse(
        { error: 'Movie ID is required' },
        limit
      );
    }

    // If no API key, get from mock data
    if (!API_KEY) {
      const movie = MOCK_MOVIES.find((m) => m.id === Number(id));

      if (!movie) {
        return createRateLimitedResponse(
          { error: 'Movie not found' },
          limit
        );
      }

      return createRateLimitedResponse(movie, limit);
    }

    // Fetch from TMDB
    const tmdbResponse = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      {
        next: { revalidate: 7200 },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!tmdbResponse.ok) {
      if (tmdbResponse.status === 404) {
        return createRateLimitedResponse(
          { error: 'Movie not found' },
          limit
        );
      }

      throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
    }

    const data: Movie = await tmdbResponse.json();

    return createRateLimitedResponse(data, limit);
  } catch (error) {
    console.error('[API] Movie detail error:', error);

    // Fallback to mock data
    const movie = MOCK_MOVIES.find((m) => m.id === Number(params.id));
    if (movie) {
      return createRateLimitedResponse(movie, { success: true, remaining: 100, resetTime: Date.now() + 60000 });
    }

    return createRateLimitedResponse(
      { error: 'Failed to fetch movie details' },
      { success: true, remaining: 100, resetTime: Date.now() + 60000 }
    );
  }
}
