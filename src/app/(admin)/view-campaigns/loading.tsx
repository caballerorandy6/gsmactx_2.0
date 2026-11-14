import { Skeleton, SkeletonListItem } from "@/components/ui/Skeleton";

export default function CampaignsLoading() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <Skeleton className="h-8 w-48 mb-8" />

      {/* Campaign List */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10 divide-y divide-white/10">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonListItem key={i} />
        ))}
      </div>
    </div>
  );
}
