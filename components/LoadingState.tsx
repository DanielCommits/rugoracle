'use client';

export function LoadingState() {
  return (
    <div className="w-full max-w-6xl mx-auto animate-pulse">
      {/* Risk Score Skeleton */}
      <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-6 mb-6">
        <div className="h-4 w-24 bg-slate-700 rounded mb-4" />
        <div className="h-16 w-32 bg-slate-700 rounded mb-4" />
        <div className="h-2 bg-slate-700 rounded-full" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Wallet Overview Skeleton */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-6">
          <div className="h-4 w-32 bg-slate-700 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-4 h-4 bg-slate-700 rounded" />
                <div className="flex-1">
                  <div className="h-3 w-20 bg-slate-700 rounded mb-2" />
                  <div className="h-6 w-24 bg-slate-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Analysis Skeleton */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-6">
          <div className="h-4 w-32 bg-slate-700 rounded mb-4" />
          <div className="space-y-4">
            <div>
              <div className="h-3 w-16 bg-slate-700 rounded mb-2" />
              <div className="h-8 w-32 bg-slate-700 rounded" />
            </div>
            <div>
              <div className="h-3 w-20 bg-slate-700 rounded mb-2" />
              <div className="h-8 w-24 bg-slate-700 rounded" />
            </div>
          </div>
        </div>

        {/* Placeholder */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-6">
          <div className="h-4 w-24 bg-slate-700 rounded mb-4" />
          <div className="h-32 bg-slate-700 rounded" />
        </div>
      </div>

      {/* AI Explanation Skeleton */}
      <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-6 mt-4">
        <div className="h-4 w-32 bg-slate-700 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-700 rounded w-5/6" />
          <div className="h-4 bg-slate-700 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
