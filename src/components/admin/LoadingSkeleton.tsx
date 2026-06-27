export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="h-4 bg-gray-100 rounded animate-pulse"
              style={{ width: j === 0 ? 64 : `${Math.random() * 40 + 30}%`, animationDelay: `${(i * cols + j) * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-100 rounded w-20 animate-pulse" />
              <div className="h-7 bg-gray-100 rounded w-16 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
