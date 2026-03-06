import { Skeleton, SkeletonInput, SkeletonButton } from "@/components/ui/Skeleton";

export default function CreateCampaignLoading() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Form */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 sm:p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <SkeletonInput />
          </div>

          {/* Subject */}
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <SkeletonInput />
          </div>

          {/* Template Type */}
          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <SkeletonInput />
          </div>

          {/* Content Editor */}
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>

          {/* Image Upload */}
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-32 w-full rounded-lg border-2 border-dashed border-gray-600" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <SkeletonButton className="flex-1" />
            <SkeletonButton className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
