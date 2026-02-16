"use client";

import Link from "next/link";
import { Heart, Layout, List } from "lucide-react";
import { useMovieStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function HeaderApp() {
  const { favorites, viewMode, setViewMode } = useMovieStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                🎬
              </span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground">
              Movie Explorer
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/explore"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Explorar
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <Heart size={16} />
              Favoritos
              {favorites.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex gap-1 bg-muted p-1 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="w-9 h-9 p-0"
              >
                <Layout size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="w-9 h-9 p-0"
              >
                <List size={16} />
              </Button>
            </div>

            {/* Mobile Menu */}
            <Link
              href="/favorites"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
