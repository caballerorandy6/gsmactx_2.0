import { Skeleton, SkeletonButton, SkeletonInput, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

const Field = ({ label, className }: { label: string; className?: string }) => (
  <div className={className}>
    <Skeleton className={`mb-1 h-4 ${label}`} />
    <SkeletonInput />
  </div>
);

const SectionTitle = ({ width }: { width: string }) => (
  <div className="mb-4 border-b border-white/10 pb-2">
    <Skeleton className={`h-6 ${width}`} />
  </div>
);

/** Loading state for AppointmentForm (create and edit). */
export const AppointmentFormSkeleton = ({ label }: { label: string }) => (
  <SkeletonPage label={label} className="max-w-2xl">
    <SkeletonPageHeader back description={false} titleWidth="w-56" />
    <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 sm:p-8">
      <div className="space-y-6">
        <div>
          <SectionTitle width="w-44" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="w-24" />
            <Field label="w-28" />
            <Field label="w-20" />
          </div>
        </div>
        <div>
          <SectionTitle width="w-40" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="w-24" />
            <Field label="w-16" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-md" />
            ))}
          </div>
          <Field label="w-16" className="mt-4" />
        </div>
        <div>
          <Skeleton className="mb-1 h-4 w-14" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-end gap-3 border-t border-white/10 pt-6 sm:flex-row">
        <SkeletonButton className="w-full rounded-md sm:w-24" />
        <SkeletonButton className="w-full rounded-md sm:w-40" />
      </div>
    </div>
  </SkeletonPage>
);
