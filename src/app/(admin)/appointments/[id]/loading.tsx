import { Skeleton, SkeletonButton, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

const Row = ({ width }: { width: string }) => (
  <div className="flex items-start gap-3">
    <Skeleton className="mt-0.5 size-5 rounded" />
    <div className="space-y-1.5">
      <Skeleton className="h-3 w-16" />
      <Skeleton className={`h-4 ${width}`} />
    </div>
  </div>
);

// Mirrors AppointmentDetail: main card (2 cols) + contact, status and info cards.
export default function AppointmentDetailLoading() {
  return (
    <SkeletonPage label="Loading appointment" className="max-w-4xl">
      <SkeletonPageHeader
        back
        description={false}
        titleWidth="w-60"
        actions={
          <>
            <SkeletonButton className="w-20 rounded-md" />
            <SkeletonButton className="w-24 rounded-md" />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          <div className="space-y-4">
            <Row width="w-44" />
            <Row width="w-56" />
            <Row width="w-24" />
            <Row width="w-64" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6">
            <Skeleton className="mb-4 h-6 w-24" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6">
            <Skeleton className="mb-4 h-6 w-28" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
