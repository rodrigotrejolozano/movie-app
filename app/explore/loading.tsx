export default function Loading() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>

        <div className="space-y-4 animate-pulse">
          <div className="flex gap-3 flex-wrap">
            <div className="h-10 bg-muted rounded w-32" />
            <div className="h-10 bg-muted rounded w-32" />
            <div className="h-10 bg-muted rounded w-32" />
            <div className="h-10 bg-muted rounded w-40" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="space-y-3 animate-pulse">
              <div className="h-80 w-52 bg-muted rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
