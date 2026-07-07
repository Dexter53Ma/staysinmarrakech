const skeletonWidths = [52, 65, 38, 57, 43, 61, 48, 55, 41, 63, 47, 59, 35, 68, 44, 56, 39, 62, 51, 46];

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="h-3.5 bg-gray-100 rounded-md animate-pulse"
              style={{ width: j === 0 ? 56 : `${skeletonWidths[(i * cols + j) % skeletonWidths.length]}%`, animationDelay: `${(i * cols + j) * 40}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200/60 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 bg-gray-100 rounded w-16 animate-pulse" />
              <div className="h-5 bg-gray-100 rounded w-12 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
