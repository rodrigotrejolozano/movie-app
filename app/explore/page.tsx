import { HeaderApp } from "@/components/header";
import { SearchFilters } from "@/components/search-filters";
import { MovieGrid } from "@/components/movie-grid";
import { movieService } from "@/lib/movie-service";
import type { PaginatedResponse, SearchFilters as FilterType } from "@/types";
import { Suspense } from "react";

async function ExploreResults({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = (searchParams.q as string) || "";
  const page = parseInt((searchParams.page as string) || "1");

  const filters: Partial<FilterType> = {
    year: searchParams.year ? parseInt(searchParams.year as string) : undefined,
    genreId: searchParams.genreId
      ? parseInt(searchParams.genreId as string)
      : undefined,
    minRating: searchParams.minRating
      ? parseInt(searchParams.minRating as string)
      : undefined,
    sortBy: searchParams.sortBy as any,
  };

  let response: PaginatedResponse;

  if (query) {
    response = await movieService.search(query, page, filters);
  } else {
    response = await movieService.discover(filters, page);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {response.total_results.toLocaleString()} película
        {response.total_results !== 1 ? "s" : ""} encontrada
        {response.total_results !== 1 ? "s" : ""}
      </p>

      <MovieGrid movies={response.results} />

      {/* Pagination - Simplified for now */}
      {response.total_pages > 1 && (
        <div className="flex justify-center gap-2 py-8">
          {page > 1 && (
            <a
              href={`/explore?${new URLSearchParams({ ...searchParams, page: String(page - 1) }).toString()}`}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Anterior
            </a>
          )}
          <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            {page} / {Math.min(response.total_pages, 500)}
          </span>
          {page < response.total_pages && page < 500 && (
            <a
              href={`/explore?${new URLSearchParams({ ...searchParams, page: String(page + 1) }).toString()}`}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Siguiente
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <HeaderApp />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Filters */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-6">
              Explorar Películas
            </h1>
            <SearchFilters />
          </div>

          {/* Results */}
          <Suspense fallback={<div>Cargando...</div>}>
            <ExploreResults searchParams={resolvedSearchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
