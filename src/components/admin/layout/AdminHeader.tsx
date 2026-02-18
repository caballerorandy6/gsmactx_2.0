"use client";

import Link from "next/link";
import Image from "next/image";
import { useMobileMenuOpen, useSetMobileMenuOpen } from "@/store/gsmactx-store";
import { adminNavigation } from "@/lib/data";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

const AdminHeader = () => {
  const pathname = usePathname();
  // Using selectors for optimized re-renders
  const mobileMenuOpen = useMobileMenuOpen();
  const setMobileMenuOpen = useSetMobileMenuOpen();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className={clsx(
          "flex items-center text-white justify-between p-2 lg:px-8 fixed w-full transition-all duration-300",
          hasMounted
            ? "bg-[rgba(10,15,26,0.50)] backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="flex lg:flex-1">
          <Link href="/admin-dashboard" className="-m-1.5 p-1.5">
            <Image
              alt="GSM AC Logo"
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
          {adminNavigation.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                // Solución alternativa sin pathname para el estilo activo
                className={clsx(
                  "text-sm/6 font-semibold transition-colors hover:text-indigo-300",
                  pathname === item.href ? "text-indigo-300" : "text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2 text-sm/6 font-semibold text-white">
          <LogoutButton />
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
            <Link href="/admin-dashboard" className="-m-1.5 p-1.5">
              <Image
                alt="GSM AC Logo"
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
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <XMarkIcon aria-hidden="true" className="size-6 cursor-pointer" />
            </button>
          </div>
          <div className="mt-6 flow-root text-white">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="flex flex-col space-y-6 py-6 text-sm/10 font-semibold">
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "font-semibold transition-colors hover:text-indigo-300",
                      pathname === item.href ? "text-indigo-300" : "text-white"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <LogoutButton />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default AdminHeader;
