import { Skeleton, SkeletonInput, SkeletonButton } from "@/components/ui/Skeleton";

export default function EditAppointmentLoading() {
  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Form */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 sm:p-6">
        <div className="space-y-6">
          {/* Customer Info */}
          <div>
            <Skeleton className="h-5 w-40 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <SkeletonInput />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <SkeletonInput />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <SkeletonInput />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <SkeletonInput />
              </div>
            </div>
          </div>

          {/* Service */}
          <div>
            <Skeleton className="h-5 w-36 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <SkeletonInput />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <SkeletonInput />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <SkeletonInput />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <SkeletonInput />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <SkeletonButton className="flex-1" />
            <SkeletonButton className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
