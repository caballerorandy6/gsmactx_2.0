import { Skeleton, SkeletonButton, SkeletonInput, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

const Field = ({ label, tall }: { label: string; tall?: string }) => (
  <div>
    <Skeleton className={`h-4 ${label}`} />
    {tall ? <Skeleton className={`mt-2.5 w-full rounded-lg ${tall}`} /> : <SkeletonInput className="mt-2.5" />}
  </div>
);

interface CampaignFormSkeletonProps {
  label: string;
  /** Create form shows the template picker above the fields. */
  withTemplates?: boolean;
  /** Test form: no back link, description + recipients note instead. */
  variant?: "campaign" | "test";
}

/** Loading state for CampaignForm and TestCampaignForm (same fields and actions). */
export const CampaignFormSkeleton = ({
  label,
  withTemplates = false,
  variant = "campaign",
}: CampaignFormSkeletonProps) => {
  const isTest = variant === "test";
  return (
    <SkeletonPage label={label} className={isTest ? "max-w-md" : "max-w-2xl"}>
      <SkeletonPageHeader back={!isTest} description={isTest} titleWidth="w-52" />

      {isTest && (
        <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <Skeleton className="h-4 w-32" />
          <div className="mt-3 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-48" />
            ))}
          </div>
        </div>
      )}

      {withTemplates && (
        <div className="mb-6">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full" />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <Field label="w-12" />
        <Field label="w-16" />
        <Field label="w-14" tall="h-32" />
        <Field label="w-20" tall="h-64" />
      </div>

      <div className="mt-8 flex justify-between gap-4">
        <SkeletonButton className="w-24 rounded-md" />
        <div className="flex gap-4">
          <SkeletonButton className="w-20 rounded-md" />
          <SkeletonButton className="w-28 rounded-md" />
        </div>
      </div>
    </SkeletonPage>
  );
};
