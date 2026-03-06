import { Skeleton, SkeletonButton, SkeletonStat } from "@/components/ui/Skeleton";

export default function CampaignDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Skeleton className="h-5 w-32 mb-6" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-3">
          <SkeletonButton />
          <SkeletonButton />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
      </div>

      {/* Email Preview Card */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6 mb-6">
        <Skeleton className="h-6 w-32 mb-4" />

        {/* Subject */}
        <div className="mb-4">
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Preview */}
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>

      {/* Recipient Stats */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
