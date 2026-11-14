import clsx from "clsx";
import type { ReactNode } from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={clsx(
      "animate-pulse rounded-md bg-gray-700/50 motion-reduce:animate-none",
      className
    )}
  />
);

interface SkeletonPageProps {
  /** What is loading, announced once to screen readers. */
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * Root of every route-level loading.tsx: announces the loading state to
 * assistive tech while the visual skeleton stays hidden from it.
 */
export const SkeletonPage = ({ label, className, children }: SkeletonPageProps) => (
  <div role="status" aria-busy="true">
    <span className="sr-only">{label}</span>
    <div aria-hidden="true" className={className}>
      {children}
    </div>
  </div>
);

/** Mirrors AdminPageHeader: optional back link, title, description, actions. */
export const SkeletonPageHeader = ({
  back = false,
  description = true,
  actions,
  titleWidth = "w-48",
  className = "mb-6 sm:mb-8",
}: {
  back?: boolean;
  description?: boolean;
  actions?: ReactNode;
  titleWidth?: string;
  /** Spacing below the header, same default as AdminPageHeader. */
  className?: string;
}) => (
  <div className={className}>
    {back && <Skeleton className="mb-3 h-5 w-36" />}
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div>
        <Skeleton className={clsx("h-8 sm:h-9", titleWidth)} />
        {description && <Skeleton className="mt-2 h-4 w-64 max-w-full" />}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 sm:gap-3">{actions}</div>}
    </div>
  </div>
);

export const SkeletonButton = ({ className }: SkeletonProps) => (
  <Skeleton className={clsx("h-10 w-32 rounded-lg", className)} />
);

export const SkeletonInput = ({ className }: SkeletonProps) => (
  <Skeleton className={clsx("h-10 w-full rounded-lg", className)} />
);

