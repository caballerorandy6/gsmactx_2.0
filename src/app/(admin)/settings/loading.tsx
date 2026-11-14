import { Skeleton, SkeletonButton, SkeletonInput, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

// Mirrors SettingsPage: change-password card + admin users card.
export default function SettingsLoading() {
  return (
    <SkeletonPage label="Loading settings" className="space-y-6">
      <SkeletonPageHeader titleWidth="w-32" className="" />

      <div className="rounded-xl border border-white/10 bg-gray-800/50 p-4 sm:p-6">
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="max-w-md space-y-4">
          {["w-32", "w-28", "w-36"].map((w) => (
            <div key={w}>
              <Skeleton className={`mb-2 h-4 ${w}`} />
              <SkeletonInput />
            </div>
          ))}
          <SkeletonButton className="w-40" />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-gray-800/50 p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <SkeletonButton className="w-32" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-gray-900/50 p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-8 rounded" />
                <Skeleton className="size-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonPage>
  );
}
