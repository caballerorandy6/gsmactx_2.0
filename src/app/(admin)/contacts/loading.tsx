import { Skeleton, SkeletonButton, SkeletonInput, SkeletonPage, SkeletonPageHeader } from "@/components/ui/Skeleton";

// Mirrors the Contacts page: header, neutral stat tiles, add form, list.
export default function ContactsLoading() {
  return (
    <SkeletonPage label="Loading contacts" className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4">
        <SkeletonPageHeader titleWidth="w-36" className="" />
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 sm:px-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="mt-1.5 h-6 w-10 sm:h-8" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-gray-800/50 p-4 sm:p-6">
        <Skeleton className="mb-3 h-6 w-40 sm:mb-4" />
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <Skeleton className="mb-1 h-4 w-16" />
                <SkeletonInput />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-3 w-48" />
            <SkeletonButton className="w-full sm:w-32" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="mb-3 h-6 w-40 sm:mb-4" />
        <div className="mb-4 rounded-xl border border-white/10 bg-gray-800/50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-10 flex-1 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg sm:w-40" />
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-gray-800/50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="size-8 rounded" />
                  <Skeleton className="size-8 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonPage>
  );
}
