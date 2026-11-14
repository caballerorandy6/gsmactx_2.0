import { Skeleton, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

// Mirrors CampaignList: header with actions + list of campaign rows.
export default function CampaignsLoading() {
  return (
    <SkeletonPage label="Loading campaigns" className="max-w-4xl">
      <SkeletonPageHeader
        titleWidth="w-40"
        actions={
          <>
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-36 rounded-md" />
          </>
        }
      />
      <div className="divide-y divide-white/10 rounded-lg border border-white/10 bg-gray-900/50">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:gap-x-6 sm:p-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 sm:gap-x-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-5 w-14 rounded-md" />
              </div>
              <Skeleton className="mt-2 h-4 w-full max-w-md" />
              <Skeleton className="mt-3 h-3 w-40" />
            </div>
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </SkeletonPage>
  );
}
