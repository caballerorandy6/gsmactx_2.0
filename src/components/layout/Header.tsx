"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useGSMStore } from "@/store/gsmactx-store";
import { navigation } from "@/lib/data";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { activeSection, scrolled, setScrolled, mobileMenuOpen, setMobileMenuOpen } =
    useGSMStore();

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
          <Link href="/#home" className="-m-1.5 p-1.5">
            <Image
              alt="GSM AC Logo"
              width={500}
              height={500}
              src="/logo.avif"
              className="h-20 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <Bars3Icon className="size-10 cursor-pointer" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "text-sm/6 font-semibold transition-colors hover:text-indigo-300",
                  {
                    "text-indigo-300": activeSection === item.name,
                  }
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2 text-sm/6 font-semibold text-white">
          <Link
            href="tel:+12812354684"
            passHref
            className="flex justify-center items-center gap-2 text-white text-sm/6 transition-colors rounded-md bg-indigo-500 px-3.5 py-2.5 font-semibold shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            <span className="font-bold">Call Now!</span>
            <PhoneIcon className="text-white w-4 h-4" />
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                alt="GSM AC Logo"
                width={1000}
                height={1000}
                src="/logo.avif"
                className="h-20 w-auto"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6 cursor-pointer" />
            </button>
          </div>
          <div className="mt-6 flow-root text-white">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="flex flex-col space-y-6 py-6 text-sm/10 font-semibold">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "font-semibold transition-colors hover:text-indigo-300",
                      {
                        "text-indigo-300": activeSection === item.name,
                      }
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="tel:+12812354684"
                  passHref
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-sm/10 font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  <span className="hover">Call Now!</span>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
