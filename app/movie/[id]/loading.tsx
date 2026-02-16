export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="relative w-full h-96 bg-muted animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8 mb-16 animate-pulse">
          <div className="flex-shrink-0 w-full md:w-64 h-96 bg-muted rounded-xl" />

          <div className="flex-1 space-y-6 pt-8">
            <div className="space-y-2">
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-5 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 bg-muted rounded-full"
                />
              ))}
            </div>

            <div className="flex gap-3">
              <div className="h-10 w-32 bg-muted rounded" />
              <div className="h-10 w-40 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
