import { Skeleton, SkeletonButton } from "@/components/ui/Skeleton";

export default function AppointmentDetailLoading() {
  return (
    <div className="max-w-4xl">
      {/* Back Button */}
      <Skeleton className="h-5 w-32 mb-6" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-3">
          <SkeletonButton />
          <SkeletonButton />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info Card */}
        <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-56" />
            </div>
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Service Details Card */}
        <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
          <Skeleton className="h-6 w-36 mb-4" />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>

        {/* Notes Card */}
        <div className="lg:col-span-2 bg-gray-800/50 rounded-xl border border-white/10 p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
