import { Skeleton, SkeletonInput, SkeletonButton } from "@/components/ui/Skeleton";

export default function TestCampaignLoading() {
  return (
    <div className="max-w-md">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Form Card */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
        <div className="space-y-6">
          {/* Campaign Select */}
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <SkeletonInput />
          </div>

          {/* Email Input */}
          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <SkeletonInput />
            <Skeleton className="h-3 w-64 mt-2" />
          </div>

          {/* Submit Button */}
          <SkeletonButton className="w-full" />
        </div>
      </div>
    </div>
  );
}
