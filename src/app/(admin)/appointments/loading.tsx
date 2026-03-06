import { Skeleton, SkeletonStat } from "@/components/ui/Skeleton";

export default function AppointmentsLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
      </div>

      {/* Status Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonStat key={i} />
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-800/50 rounded-lg border border-white/10 p-4 mb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-20" />
          <div className="flex-1" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* List */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10 divide-y divide-white/10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-3 w-64" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
