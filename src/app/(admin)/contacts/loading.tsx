import {
  Skeleton,
  SkeletonStat,
  SkeletonInput,
  SkeletonButton,
} from "@/components/ui/Skeleton";

export default function ContactsLoading() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <SkeletonStat />
          <SkeletonStat />
          <SkeletonStat />
        </div>
      </div>

      {/* Add Contact Form */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 sm:p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <SkeletonInput />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <SkeletonInput />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <Skeleton className="h-4 w-16 mb-1" />
              <SkeletonInput />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Skeleton className="h-3 w-48" />
            <SkeletonButton className="w-full sm:w-32" />
          </div>
        </div>
      </div>

      {/* Contacts List Header */}
      <div>
        <Skeleton className="h-6 w-40 mb-4" />

        {/* Search and Filter */}
        <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-10 flex-1 rounded-lg" />
            <Skeleton className="h-10 w-full sm:w-40 rounded-lg" />
          </div>
        </div>

        {/* Contact Cards */}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800/50 rounded-xl border border-white/10 p-4"
            >
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
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
