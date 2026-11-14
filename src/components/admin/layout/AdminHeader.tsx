"use client";

import Link from "next/link";
import Image from "next/image";
import { adminNavigationSections } from "@/lib/data";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

const AdminHeader = () => {
  const pathname = usePathname();
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
              className="h-12 w-auto md:h-20"
              priority
            />
          </Link>
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
        <div className="flex lg:flex-1 justify-end items-center gap-2 text-sm/6 font-semibold text-white">
          <LogoutButton />
        </div>
      </nav>

    </header>
  );
};

export default AdminHeader;
