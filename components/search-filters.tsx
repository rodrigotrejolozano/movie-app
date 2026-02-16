'use client';

import React from "react"

import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useMovieStore } from '@/lib/store';
import { GENRES } from '@/lib/mock-data';
import type { MovieFilters } from '@/types';

export function SearchFilters() {
  const { filters, setFilters, resetFilters } = useMovieStore();
  const [localQuery, setLocalQuery] = useState(filters.query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ query: localQuery });
  };

  const handleYearChange = (value: string) => {
    setFilters({ year: value ? parseInt(value) : undefined });
  };

  const handleGenreChange = (value: string) => {
    setFilters({ genreId: value ? parseInt(value) : undefined });
  };

  const handleRatingChange = (value: string) => {
    setFilters({ minRating: value ? parseInt(value) : 0 });
  };

  const handleSortChange = (value: string) => {
    setFilters({
      sortBy: value as 'popularity' | 'rating' | 'release_date',
    });
  };

  const hasActiveFilters =
    filters.query ||
    filters.year ||
    filters.genreId ||
    filters.minRating ||
    filters.sortBy !== 'popularity';

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search movies, shows..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="px-6">
          Search
        </Button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Year Filter */}
        <Select value={filters.year?.toString() || 'all'} onValueChange={handleYearChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Genre Filter */}
        <Select value={filters.genreId?.toString() || 'all'} onValueChange={handleGenreChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {GENRES.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rating Filter */}
        <Select value={filters.minRating?.toString() || '0'} onValueChange={handleRatingChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Min Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All Ratings</SelectItem>
            <SelectItem value="6">6+</SelectItem>
            <SelectItem value="7">7+</SelectItem>
            <SelectItem value="8">8+</SelectItem>
            <SelectItem value="9">9+</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select value={filters.sortBy || 'popularity'} onValueChange={handleSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="release_date">Newest</SelectItem>
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
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
