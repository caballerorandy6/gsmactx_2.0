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
        aria-label="Global"
        className={clsx(
          "flex items-center text-white justify-between p-2 lg:px-8 fixed w-full transition-all duration-300",
          scrolled
            ? "bg-[rgba(10,15,26,0.50)] backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="flex lg:flex-1">
          <Link href="/#home" className="-m-1.5 p-1.5">
            <Image
              alt="GSM AC Logo"
              width={1000}
              height={1000}
              src="/logo.avif"
              className="h-20 w-auto"
              priority
            />
          </Link>
        </div>

        <Link
          href="/#home"
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-colors"
        >
          Back to Home
        </Link>
      </nav>
    </header>
  );
};

export default ServiceMenu;
