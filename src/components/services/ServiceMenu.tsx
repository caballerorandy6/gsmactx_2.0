"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useGSMStore } from "@/store/gsmactx-store";

const ServiceMenu = () => {
  const { scrolled } = useGSMStore();

  return (
    <header className="absolute inset-x-0 top-0 z-50 sm:hidden">
      <nav
        aria-label="Services navigation"
        className={clsx(
          "flex items-center text-white justify-between p-2 fixed w-full transition-all duration-300",
          scrolled
            ? "bg-gray-900/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="flex">
          <Link
            href="/#home"
            className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
          >
            <span className="sr-only">Go to homepage</span>
            <Image
              alt="GSM A/C General & Contractor Inc Logo"
              width={80}
              height={80}
              src="/logo.avif"
              className="h-16 w-auto"
              priority
            />
          </Link>
        </div>

        <Link
          href="/#home"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
        >
          Back to Home
        </Link>
      </nav>
    </header>
  );
};

export default ServiceMenu;
