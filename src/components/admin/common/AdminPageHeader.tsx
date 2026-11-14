import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: ReactNode;
  back?: { href: string; label: string };
  actions?: ReactNode;
  /** Spacing below the header; override when the parent already uses gap. */
  className?: string;
}

/**
 * Shared page header for every admin screen: left-aligned title,
 * optional one-line description, optional back link and right-side actions.
 */
const AdminPageHeader = ({
  title,
  description,
  back,
  actions,
  className = "mb-6 sm:mb-8",
}: AdminPageHeaderProps) => (
  <div className={className}>
    {back && (
      <Link
        href={back.href}
        className="mb-3 inline-flex items-center gap-1.5 rounded-sm text-sm text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        {back.label}
      </Link>
    )}
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {actions}
        </div>
      )}
    </div>
  </div>
);

export default AdminPageHeader;
