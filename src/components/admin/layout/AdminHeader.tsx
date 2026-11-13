"use client";

import Link from "next/link";
import Image from "next/image";
import { useMobileMenuOpen, useSetMobileMenuOpen } from "@/store/gsmactx-store";
import { adminNavigationSections } from "@/lib/data";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
  UsersIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  BeakerIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

// Map href to icon
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "/admin-dashboard": HomeIcon,
  "/appointments": CalendarDaysIcon,
  "/create-appointment": PlusCircleIcon,
  "/contacts": UsersIcon,
  "/view-campaigns": DocumentTextIcon,
  "/create-campaign": EnvelopeIcon,
  "/test-campaign": BeakerIcon,
  "/settings": Cog6ToothIcon,
};

const AdminHeader = () => {
  const pathname = usePathname();
  const mobileMenuOpen = useMobileMenuOpen();
  const setMobileMenuOpen = useSetMobileMenuOpen();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin-dashboard") {
      return pathname === href;
    }
    if (href === "/appointments" && pathname.startsWith("/appointments")) {
      return !pathname.includes("/create");
    }
    if (href === "/contacts" && pathname.startsWith("/contacts")) {
      return true;
    }
    if (href === "/view-campaigns" && pathname.startsWith("/view-campaigns")) {
      return true;
    }
    if (href === "/settings" && pathname.startsWith("/settings")) {
      return true;
    }
    return pathname === href;
  };

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
        <div className="hidden lg:flex lg:gap-x-8">
          {adminNavigationSections.flatMap((section) =>
            section.items.slice(0, 1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm/6 font-semibold transition-colors hover:text-primary-300",
                  isActive(item.href) ? "text-primary-300" : "text-white"
                )}
              >
                {section.title}
              </Link>
            ))
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2 text-sm/6 font-semibold text-white">
          <LogoutButton />
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/50" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 overscroll-contain">
          <div className="flex items-center justify-between">
            <Link
              href="/admin-dashboard"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                alt="GSM AC Logo"
                width={160}
                height={160}
                src="/logo-small.avif"
                className="h-16 w-auto"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon aria-hidden="true" className="size-8 cursor-pointer" />
            </button>
          </div>

          <div className="mt-8 flow-root">
            <div className="space-y-6">
              {adminNavigationSections.map((section) => (
                <div key={section.title}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </p>
                  <nav className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = iconMap[item.href] || DocumentTextIcon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={clsx(
                            "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
                            active
                              ? "bg-primary-500/20 text-white border border-primary-500/30"
                              : "text-gray-300 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <Icon
                            className={clsx(
                              "h-5 w-5",
                              active ? "text-primary-400" : "text-gray-500"
                            )}
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <LogoutButton />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default AdminHeader;
