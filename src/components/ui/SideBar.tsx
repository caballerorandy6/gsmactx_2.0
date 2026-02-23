"use client";

import { allServices } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PhoneIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="hidden sm:flex fixed z-10 top-0 px-6 flex-col justify-between h-screen border-r border-white/10 bg-gray-900/95 backdrop-blur-sm transition duration-300 w-64 py-8 shadow-xl">
      {/* Logo */}
      <Link
        href="/#home"
        className="transition-transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
      >
        <span className="sr-only">GSM A/C - Go to homepage</span>
        <Image
          alt="GSM A/C General & Contractor Inc Logo"
          width={64}
          height={64}
          src="/logo.avif"
          className="h-16 w-auto"
          priority
        />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col mt-8">
        <ul role="list" className="flex flex-1 flex-col gap-y-6">
          <li>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Our Services
            </p>
            <ul role="list" className="-mx-2 space-y-1">
              {allServices.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/services/${item.id}`}
                    className={clsx(
                      "block text-sm/6 font-semibold transition-all duration-200 px-3 py-2.5 rounded-lg group",
                      pathname === `/services/${item.id}`
                        ? "text-white bg-indigo-600 shadow-lg shadow-indigo-600/50"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={clsx(
                          "inline-block w-1.5 h-1.5 rounded-full transition-colors",
                          pathname === `/services/${item.id}`
                            ? "bg-white"
                            : "bg-gray-600 group-hover:bg-gray-400"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Bottom Actions */}
          <li className="-mx-6 mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
            {/* Phone Number */}
            <Link
              href="tel:+12812354684"
              className="flex items-center gap-x-3 px-6 py-2.5 text-sm/6 font-semibold text-gray-400 hover:text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            >
              <PhoneIcon className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" aria-hidden="true" />
              <span>+1 (281) 235-4684</span>
            </Link>

            {/* Back to Home Button */}
            <Link
              href="/#home"
              className="flex items-center justify-center gap-x-2 mx-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg shadow-lg hover:shadow-indigo-600/50 hover:scale-105"
            >
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
              Back to Home
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
