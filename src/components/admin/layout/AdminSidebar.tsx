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
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  const pathname = usePathname();

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
  ];

  const isActive = (href: string) => {
    if (href === "/admin-dashboard") {
      return pathname === href;
    }
    // Handle dynamic routes like /appointments/[id]
    if (href === "/appointments" && pathname.startsWith("/appointments")) {
      return !pathname.includes("/create");
    }
    if (href === "/view-campaigns" && pathname.startsWith("/view-campaigns")) {
      return true;
    }
    if (href === "/edit-campaign" && pathname.startsWith("/edit-campaign")) {
      return true;
    }
    return pathname === href;
  };

  return (
    <>
      {/* Desktop Sidebar */}
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
                        ? "bg-indigo-500/20 text-white border border-indigo-500/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        aria-hidden="true"
                        className={clsx(
                          "h-5 w-5 transition-colors motion-reduce:transition-none",
                          active ? "text-indigo-400" : "text-gray-500 group-hover:text-gray-300"
                        )}
                      />
                      {item.label}
                    </div>
                    {active && (
                      <ChevronRightIcon aria-hidden="true" className="h-4 w-4 text-indigo-400" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-t border-white/10 px-2 py-2 safe-area-inset-bottom">
        <div className="flex justify-around items-center">
          {[
            { href: "/admin-dashboard", label: "Home", icon: HomeIcon },
            { href: "/appointments", label: "Appointments", icon: CalendarDaysIcon },
            { href: "/create-appointment", label: "New", icon: PlusCircleIcon },
            { href: "/view-campaigns", label: "Campaigns", icon: DocumentTextIcon },
          ].map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors motion-reduce:transition-none",
                  active
                    ? "text-indigo-400"
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
