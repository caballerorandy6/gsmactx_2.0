import {
  Skeleton,
  SkeletonStat,
  SkeletonListItem,
} from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-4 sm:space-y-6 pb-24 lg:pb-6">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonStat key={i} />
        ))}
      </div>

      {/* Campaigns Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Skeleton className="h-6 w-36" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Campaign List */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10 divide-y divide-white/10">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonListItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
