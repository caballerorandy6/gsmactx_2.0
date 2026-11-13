"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  HomeIcon,
  EnvelopeIcon,
  BeakerIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navSections = [
  {
    title: "Overview",
    items: [
      {
        href: "/admin-dashboard",
        label: "Dashboard",
        icon: HomeIcon,
      },
    ],
  },
  {
    title: "Appointments",
    items: [
      {
        href: "/appointments",
        label: "All Appointments",
        icon: CalendarDaysIcon,
      },
      {
        href: "/create-appointment",
        label: "New Appointment",
        icon: PlusCircleIcon,
      },
    ],
  },
  {
    title: "Contacts",
    items: [
      {
        href: "/contacts",
        label: "All Contacts",
        icon: UsersIcon,
      },
    ],
  },
  {
    title: "Campaigns",
    items: [
      {
        href: "/view-campaigns",
        label: "All Campaigns",
        icon: DocumentTextIcon,
      },
      {
        href: "/create-campaign",
        label: "New Campaign",
        icon: EnvelopeIcon,
      },
      {
        href: "/test-campaign",
        label: "Test Campaign",
        icon: BeakerIcon,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        href: "/settings",
        label: "Settings",
        icon: Cog6ToothIcon,
      },
    ],
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

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
    if (href === "/edit-campaign" && pathname.startsWith("/edit-campaign")) {
      return true;
    }
    if (href === "/settings" && pathname.startsWith("/settings")) {
      return true;
    }
    return pathname === href;
  };

  return (
    <>
      {/* Tablet Sidebar (md-lg) - Collapsed with icons only */}
      <aside className="hidden md:flex lg:hidden flex-col w-20 min-h-[calc(100vh-4rem)] bg-gray-900/80 backdrop-blur-sm border-r border-white/10 py-6 relative z-30">
        {navSections.map((section) => (
          <div key={section.title} className="px-2 mb-4">
            <nav className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "group relative flex items-center justify-center p-3 rounded-lg transition-all motion-reduce:transition-none",
                      active
                        ? "bg-primary-500/20 text-white border border-primary-500/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={clsx(
                        "h-6 w-6 transition-colors motion-reduce:transition-none",
                        active ? "text-primary-400" : "text-gray-500 group-hover:text-gray-300"
                      )}
                    />
                    {/* Tooltip */}
                    <span className="absolute left-full ml-3 px-2.5 py-1.5 rounded-md bg-gray-800 text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg border border-white/10 z-50">
                      {item.label}
                      <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </aside>

      {/* Desktop Sidebar (lg+) - Full with labels */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:min-h-[calc(100vh-4rem)] bg-gray-900/80 backdrop-blur-sm border-r border-white/10 py-6">
        {navSections.map((section) => (
          <div key={section.title} className="px-4 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              {section.title}
            </p>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all motion-reduce:transition-none",
                      active
                        ? "bg-primary-500/20 text-white border border-primary-500/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        aria-hidden="true"
                        className={clsx(
                          "h-5 w-5 transition-colors motion-reduce:transition-none",
                          active ? "text-primary-400" : "text-gray-500 group-hover:text-gray-300"
                        )}
                      />
                      {item.label}
                    </div>
                    {active && (
                      <ChevronRightIcon aria-hidden="true" className="h-4 w-4 text-primary-400" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </aside>

      {/* Mobile Bottom Navigation (< md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-t border-white/10 px-1 py-2 safe-area-inset-bottom">
        <div className="flex justify-around items-center">
          {[
            { href: "/admin-dashboard", label: "Home", icon: HomeIcon },
            { href: "/appointments", label: "Appts", icon: CalendarDaysIcon },
            { href: "/contacts", label: "Contacts", icon: UsersIcon },
            { href: "/view-campaigns", label: "Campaigns", icon: DocumentTextIcon },
            { href: "/settings", label: "Settings", icon: Cog6ToothIcon },
          ].map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors motion-reduce:transition-none min-w-[60px]",
                  active
                    ? "text-primary-400"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <item.icon aria-hidden="true" className="h-6 w-6" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default AdminSidebar;
