"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { GENRES } from "@/lib/mock-data";

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [localQuery, setLocalQuery] = useState(searchParams.get("q") || "");

  // Update local query when URL changes (e.g. back button)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setLocalQuery((prev) => (prev === q ? prev : q));
  }, [searchParams]);

  const updateFilters = (newFilters: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "0") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to first page on filter change
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: localQuery });
  };

  const handleYearChange = (value: string) => {
    updateFilters({ year: value });
  };

  const handleGenreChange = (value: string) => {
    updateFilters({ genreId: value });
  };

  const handleRatingChange = (value: string) => {
    updateFilters({ minRating: value });
  };

  const handleSortChange = (value: string) => {
    updateFilters({ sortBy: value });
  };

  const resetFilters = () => {
    setLocalQuery("");
    router.push(pathname);
  };

  const hasActiveFilters = searchParams.toString().length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Buscar películas..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="px-6">
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Year Filter */}
        <Select
          value={searchParams.get("year") || "all"}
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los años</SelectItem>
            {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Genre Filter */}
        <Select
          value={searchParams.get("genreId") || "all"}
          onValueChange={handleGenreChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los géneros</SelectItem>
            {GENRES.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rating Filter */}
        <Select
          value={searchParams.get("minRating") || "0"}
          onValueChange={handleRatingChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Calificación Mín." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Cualquier calificación</SelectItem>
            <SelectItem value="6">6+</SelectItem>
            <SelectItem value="7">7+</SelectItem>
            <SelectItem value="8">8+</SelectItem>
            <SelectItem value="9">9+</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select
          value={searchParams.get("sortBy") || "popularity"}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Más populares</SelectItem>
            <SelectItem value="rating">Mejor valoradas</SelectItem>
            <SelectItem value="release_date">Más recientes</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="gap-2 bg-transparent"
          >
            <X size={16} />
            Limpiar
          </Button>
        )}
      </div>
    </div>
  );
}
