"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {
  useScrolled,
  useSetScrolled,
  useMobileMenuOpen,
  useSetMobileMenuOpen,
  useActiveSection,
} from "@/store/gsmactx-store";
import { navigation } from "@/lib/data";

const PHONE_HREF = "tel:+12812354684";
const PHONE_LABEL = "(281) 235-4684";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  // Using selectors for optimized re-renders
  const activeSection = useActiveSection();
  const scrolled = useScrolled();
  const setScrolled = useSetScrolled();
  const mobileMenuOpen = useMobileMenuOpen();
  const setMobileMenuOpen = useSetMobileMenuOpen();
  const pathname = usePathname();
  // Outside the home page the scroll-spy section is stale; mark by route instead.
  const isActive = (name: string) =>
    pathname === "/"
      ? activeSection === name
      : (name === "Services" && pathname.startsWith("/services")) ||
        (name === "Book Appointment" && pathname === "/book-appointment");
  const menuLinks = navigation.filter((item) => item.name !== "Book Appointment");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrolled]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
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
          <Link
            href="/#home"
            className="-m-1.5 p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg"
          >
            <span className="sr-only">GSM A/C - Go to homepage</span>
            <Image
              alt="GSM A/C General & Contractor Inc - HVAC Services in Cypress, TX"
              width={160}
              height={160}
              src="/logo-small.avif"
              className="h-20 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <Bars3Icon aria-hidden="true" className="size-10 cursor-pointer" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "text-sm/6 font-semibold transition-colors hover:text-primary-300",
                  {
                    "text-primary-300": isActive(item.name),
                  }
                )}
                aria-current={isActive(item.name) ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2 text-sm/6 font-semibold text-white">
          <Link
            href={PHONE_HREF}
            className="flex justify-center items-center gap-2 text-white text-sm/6 transition-colors rounded-md bg-primary-600 px-3.5 py-2.5 font-semibold shadow-xs hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
          >
            <span className="font-bold">Call Now!</span>
            <PhoneIcon aria-hidden="true" className="text-white w-4 h-4" />
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 overscroll-contain">
          <div className="flex items-center justify-between">
            <Link
              href="/#home"
              className="-m-1.5 p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
            >
              <span className="sr-only">GSM A/C - Go to homepage</span>
              <Image
                alt="GSM A/C General & Contractor Inc Logo"
                width={160}
                height={160}
                src="/logo-small.avif"
                className="h-20 w-auto"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white"
            >
              <XMarkIcon aria-hidden="true" className="size-6 cursor-pointer" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 text-white">
            <ul role="list" className="divide-y divide-white/10 border-y border-white/10">
              {menuLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.name) ? "page" : undefined}
                    className={clsx(
                      "block py-3.5 text-base font-semibold transition-colors hover:text-primary-300",
                      isActive(item.name) && "text-primary-300"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/book-appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-3 text-base font-semibold text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              >
                <CalendarDaysIcon aria-hidden="true" className="size-5" />
                Book Appointment
              </Link>
              <Link
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 rounded-md px-4 py-3 text-base font-semibold text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              >
                <PhoneIcon aria-hidden="true" className="size-5" />
                Call {PHONE_LABEL}
              </Link>
            </div>
          </nav>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
