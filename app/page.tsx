import { HeaderApp } from "@/components/header";
import { MovieCarousel } from "@/components/movie-carousel";
import { movieService } from "@/lib/movie-service";

export const metadata = {
  title: "Movie Explorer - Descubre tu próxima película favorita",
  description:
    "Explora películas en tendencia, las mejor calificadas y descubre tu próxima favorita con Movie Explorer",
};

export default async function HomePage() {
  const [trending, topRated, nowPlaying] = await Promise.all([
    movieService.getTrending(),
    movieService.getTopRated(),
    movieService.getNowPlaying(),
  ]);

  if (typeof window !== "undefined") {
    return <></>;
  }
  return (
    <>
      <HeaderApp />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative w-full h-[500px] bg-gradient-to-br from-primary/20 via-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%23000%22 width=%22100%22 height=%22100%22/><path fill=%22%23003%22 d=%22M0 0h100v100H0z%22/></svg>')] opacity-5" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Descubre el <span className="text-primary">Cine</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Explora películas en tendencia, las mejor calificadas y crea tu
                lista de favoritos perfecta
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <a
                  href="/explore"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Empezar a Explorar
                </a>
                <a
                  href="/favorites"
                  className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Mis Favoritos
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Carousels */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <MovieCarousel
            title="🔥 Tendencias de Hoy"
            movies={trending.results.slice(0, 12)}
            href="/explore?view=trending"
          />

          <MovieCarousel
            title="⭐ Mejor Valoradas"
            movies={topRated.results.slice(0, 12)}
            href="/explore?view=top-rated"
          />

          <MovieCarousel
            title="🎬 En Cartelera"
            movies={nowPlaying.results.slice(0, 12)}
            href="/explore?view=now-playing"
          />
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tu guía personal de cine
            </h2>
            <p className="text-lg text-muted-foreground">
              Guarda tus películas favoritas, filtra por género y calificación,
              y nunca te pierdas de una gran película.
            </p>
            <a
              href="/explore"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Explorar Todas las Películas
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
