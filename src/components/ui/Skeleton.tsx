import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={clsx(
      "animate-pulse rounded-md bg-gray-700/50",
      className
    )}
  />
);

export const SkeletonText = ({ className }: SkeletonProps) => (
  <Skeleton className={clsx("h-4 w-full", className)} />
);

export const SkeletonCard = ({ className }: SkeletonProps) => (
  <div
    className={clsx(
      "rounded-xl bg-gray-800/50 border border-white/10 p-4 sm:p-6",
      className
    )}
  >
    <Skeleton className="h-6 w-1/3 mb-4" />
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

export const SkeletonButton = ({ className }: SkeletonProps) => (
  <Skeleton className={clsx("h-10 w-32 rounded-lg", className)} />
);

export const SkeletonInput = ({ className }: SkeletonProps) => (
  <Skeleton className={clsx("h-10 w-full rounded-lg", className)} />
);

export const SkeletonStat = ({ className }: SkeletonProps) => (
  <div
    className={clsx(
      "text-center px-2 sm:px-4 py-3 rounded-lg bg-gray-800/50 border border-white/10",
      className
    )}
  >
    <Skeleton className="h-8 w-12 mx-auto mb-2" />
    <Skeleton className="h-3 w-16 mx-auto" />
  </div>
);

export const SkeletonListItem = ({ className }: SkeletonProps) => (
  <div
    className={clsx(
      "flex items-center justify-between gap-4 p-4 sm:p-5",
      className
    )}
  >
    <div className="flex-1 space-y-2">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <Skeleton className="h-8 w-24 rounded-md" />
  </div>
);
