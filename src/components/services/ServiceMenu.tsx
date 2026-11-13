"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useGSMStore } from "@/store/gsmactx-store";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const ServiceMenu = () => {
  const { scrolled } = useGSMStore();

  return (
    <header className="absolute inset-x-0 top-0 z-50 sm:hidden">
      <nav
        aria-label="Services navigation"
        className={clsx(
          "flex items-center text-white justify-between",
          "px-3 py-2 fixed w-full",
          "transition-all duration-300",
          scrolled
            ? "bg-gray-900/90 backdrop-blur-md shadow-md"
            : "bg-gray-900/60 backdrop-blur-sm"
        )}
      >
        {/* Logo - goes to homepage */}
        <Link
          href="/#home"
          className="shrink-0 -m-1 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg transition-transform hover:scale-105"
        >
          <span className="sr-only">GSM A/C - Go to homepage</span>
          <Image
            alt="GSM A/C General & Contractor Inc Logo"
            width={56}
            height={56}
            src="/logo.avif"
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Book Appointment CTA */}
        <Link
          href="/book-appointment"
          className={clsx(
            "flex items-center gap-x-1.5",
            "rounded-lg bg-primary-600 px-3 py-2",
            "text-xs font-semibold text-white shadow-sm",
            "hover:bg-primary-700 transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          )}
        >
          <CalendarDaysIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Book Now</span>
        </Link>
      </nav>
    </header>
  );
};

export default ServiceMenu;
