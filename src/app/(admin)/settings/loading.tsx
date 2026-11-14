import { Skeleton, SkeletonInput, SkeletonButton } from "@/components/ui/Skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Change Password Section */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-4 max-w-md">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <SkeletonInput />
          </div>
          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <SkeletonInput />
          </div>
          <div>
            <Skeleton className="h-4 w-36 mb-2" />
            <SkeletonInput />
          </div>
          <SkeletonButton className="w-40" />
        </div>
      </div>

      {/* Admin Users Section */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <SkeletonButton className="w-32" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-white/5"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
