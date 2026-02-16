import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Simple in-memory rate limiting (caching handled by Next.js revalidate)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100; // 100 requests per minute

export async function rateLimit(): Promise<{
  success: boolean;
  remaining: number;
  resetTime: number;
}> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // New window
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return {
      success: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
  }

  if (limit.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      success: false,
      remaining: 0,
      resetTime: limit.resetTime,
    };
  }

  limit.count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS_PER_WINDOW - limit.count,
    resetTime: limit.resetTime,
  };
}

export function setRateLimitHeaders(
  response: Response,
  limit: { success: boolean; remaining: number; resetTime: number },
): Response {
  const headers = new Headers(response.headers);
  headers.set("X-RateLimit-Remaining", limit.remaining.toString());
  headers.set(
    "X-RateLimit-Reset",
    Math.ceil(limit.resetTime / 1000).toString(),
  );

  if (!limit.success) {
    return new Response("Too many requests", {
      status: 429,
      statusText: "Too Many Requests",
      headers,
    });
  }

  // For successful responses, create new response with same body
  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function createRateLimitedResponse<T>(
  data: T,
  limit: { success: boolean; remaining: number; resetTime: number },
): Promise<Response> {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-RateLimit-Remaining": limit.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(limit.resetTime / 1000).toString(),
  });

  if (!limit.success) {
    return new Response("Too many requests", {
      status: 429,
      statusText: "Too Many Requests",
      headers,
    });
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers,
  });
}
