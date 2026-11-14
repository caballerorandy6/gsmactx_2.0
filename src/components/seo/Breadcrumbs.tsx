import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { businessInfo } from "@/lib/data";
import { JsonLdForBreadcrumb } from "./JsonLdForBreadcrumb";

export interface BreadcrumbItem {
  name: string;
  /** Site-relative path, e.g. "/services". */
  href: string;
}

/**
 * Visible breadcrumb trail plus its BreadcrumbList JSON-LD, built from the same
 * items so the page and the schema can never disagree. The last item is the
 * current page and is not a link.
 */
export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          role="list"
          className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-sm text-gray-400"
        >
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-x-1.5">
                {index > 0 && (
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-4 flex-none text-gray-500"
                  />
                )}
                {isCurrent ? (
                  <span aria-current="page" className="text-gray-300">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLdForBreadcrumb
        itemList={items.map((item) => ({
          name: item.name,
          item: `${businessInfo.website}${item.href === "/" ? "" : item.href}`,
        }))}
      />
    </>
  );
}
