import { Skeleton, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

// Mirrors the campaign detail page: header, send/status panel, email preview.
export default function CampaignDetailLoading() {
  return (
    <SkeletonPage label="Loading campaign" className="max-w-5xl">
      <SkeletonPageHeader back titleWidth="w-64" />
      <Skeleton className="mb-10 h-40 w-full rounded-lg" />
      <Skeleton className="h-[32rem] w-full rounded-lg" />
    </SkeletonPage>
  );
}
