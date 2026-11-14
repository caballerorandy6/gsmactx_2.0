"use client";

import { allServices } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PhoneIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        // Base styles
        "fixed z-20 top-0 left-0 flex flex-col justify-between",
        "h-screen border-r border-white/10 bg-gray-900/95 backdrop-blur-sm shadow-xl",
        // Hidden on mobile, visible on sm+
        "hidden sm:flex",
        // Responsive width and padding
        "w-56 px-4 py-6",
        "md:w-60 md:px-5 md:py-7",
        "lg:w-64 lg:px-6 lg:py-8",
        // Smooth transitions for any dynamic changes
        "transition-all duration-300"
      )}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        href="/#home"
        className="shrink-0 transition-transform hover:scale-105 duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg"
      >
        <span className="sr-only">GSM A/C - Go to homepage</span>
        <Image
          alt="GSM A/C General & Contractor Inc Logo"
          width={64}
          height={64}
          src="/logo.avif"
          className="h-12 w-auto md:h-14 lg:h-16"
          priority
        />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col mt-6 md:mt-7 lg:mt-8 overflow-y-auto">
        <ul role="list" className="flex flex-1 flex-col gap-y-4 md:gap-y-5 lg:gap-y-6">
          <li>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 md:mb-3">
              Our Services
            </p>
            <ul role="list" className="-mx-1.5 md:-mx-2 space-y-0.5 md:space-y-1">
              {allServices.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/services/${item.id}`}
                    aria-current={pathname === `/services/${item.id}` ? "page" : undefined}
                    className={clsx(
                      "block text-xs md:text-sm/6 font-semibold transition-all duration-200",
                      "px-2 py-2 md:px-3 md:py-2.5 rounded-lg group",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                      pathname === `/services/${item.id}`
                        ? "text-white bg-primary-600 shadow-lg shadow-primary-600/50"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    <span className="flex items-center gap-1.5 md:gap-2">
                      <span
                        className={clsx(
                          "inline-block w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-colors shrink-0",
                          pathname === `/services/${item.id}`
                            ? "bg-white"
                            : "bg-gray-600 group-hover:bg-gray-400"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Bottom Actions */}
          <li className="-mx-4 md:-mx-5 lg:-mx-6 mt-auto flex flex-col gap-2 md:gap-3 pt-4 md:pt-5 lg:pt-6 border-t border-white/10">
            {/* Phone Number */}
            <Link
              href="tel:+12812354684"
              className={clsx(
                "flex items-center gap-x-2 md:gap-x-3",
                "px-4 py-2 md:px-5 md:py-2.5 lg:px-6",
                "text-xs md:text-sm/6 font-semibold text-gray-400 hover:text-white",
                "transition-colors group",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
              )}
            >
              <PhoneIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-500 group-hover:text-white transition-colors shrink-0" aria-hidden="true" />
              <span className="truncate">+1 (281) 235-4684</span>
            </Link>

            {/* Book Appointment CTA */}
            <Link
              href="/book-appointment"
              className={clsx(
                "flex items-center justify-center gap-x-1.5 md:gap-x-2",
                "mx-4 md:mx-5 lg:mx-6 py-2.5 md:py-3",
                "text-xs md:text-sm font-bold text-white",
                "bg-primary-600 hover:bg-primary-700 rounded-lg shadow-lg",
                "transition-all duration-200 hover:shadow-primary-600/50 hover:scale-[1.02]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              )}
            >
              <CalendarDaysIcon className="h-4 w-4 md:h-5 md:w-5 shrink-0" aria-hidden="true" />
              <span>Book Appointment</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
