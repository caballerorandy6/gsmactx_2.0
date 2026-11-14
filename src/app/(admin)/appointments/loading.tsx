import { Skeleton, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

// Mirrors AppointmentsList in its default calendar view: month grid + day panel.
export default function AppointmentsLoading() {
  return (
    <SkeletonPage label="Loading appointments" className="max-w-6xl">
      <SkeletonPageHeader
        titleWidth="w-44"
        actions={
          <>
            <Skeleton className="h-10 w-24 rounded-lg sm:w-48" />
            <Skeleton className="h-10 w-36 rounded-lg" />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4 sm:p-6 lg:col-span-2 lg:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-44" />
              <Skeleton className="mt-2 h-4 w-28" />
            </div>
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4 sm:p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-28" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
