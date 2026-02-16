"use client";

import { HeaderApp } from "@/components/header";
import { MovieGrid } from "@/components/movie-grid";
import { useMovieStore } from "@/lib/store";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useMovieStore();

  return (
    <>
      <HeaderApp />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Mis Favoritos
            </h1>
            <p className="text-muted-foreground">
              {favorites.length} película{favorites.length !== 1 ? "s" : ""}{" "}
              guarda{favorites.length !== 1 ? "das" : "da"}
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="text-center space-y-4 max-w-md">
                <div className="text-6xl mb-4">💔</div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Aún no tienes favoritos
                </h2>
                <p className="text-muted-foreground">
                  Comienza a añadir películas a tu lista de favoritos haciendo
                  clic en el icono del corazón.
                </p>
                <Link
                  href="/explore"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-4"
                >
                  Explorar Películas
                </Link>
              </div>
            </div>
          ) : (
            <MovieGrid movies={favorites} showEmpty={false} />
          )}
        </div>
      </main>
    </>
  );
}
