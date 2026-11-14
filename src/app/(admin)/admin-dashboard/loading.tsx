import { Skeleton, SkeletonPage } from "@/components/ui/Skeleton";

// Mirrors AdminDashboard: header, summary strip, upcoming list + outreach panel.
export default function DashboardLoading() {
  return (
    <SkeletonPage label="Loading dashboard" className="space-y-4 sm:space-y-6 pb-24 lg:pb-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-40 rounded-md" />
      </div>

      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-white/10 bg-gray-900/60 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 px-4 py-4 sm:px-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-12" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-gray-900/60 lg:col-span-2">
          <div className="border-b border-white/10 px-4 py-3 sm:px-5">
            <Skeleton className="h-5 w-48" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 sm:px-5">
              <Skeleton className="h-9 w-20" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 rounded-lg border border-white/10 bg-gray-900/60 px-4 py-4 sm:px-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>
    </SkeletonPage>
  );
}
