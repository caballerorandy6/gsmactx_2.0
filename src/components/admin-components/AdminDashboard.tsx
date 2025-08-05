// src/components/admin-components/AdminDashboard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  //Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  //MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import LogoutButton from "./LogoutButton";

const navigation = [
  {
    name: "Admin Dashboard",
    href: "/admin-dashboard",
    icon: HomeIcon,
    current: true,
  },
];

// const teams = [
//   { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
//   { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
//   { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
// ];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminDashboard({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Mobile sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 w-full max-w-xs flex-1 transform bg-indigo-600 px-6 pb-4 transition duration-300 ease-in-out">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar Content */}
            <div className="flex flex-col gap-y-5">
              <div className="h-16 flex items-center">
                <Image
                  width={500}
                  height={500}
                  alt="Logo"
                  src="/logo.avif"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex-1">
                <ul role="list" className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-700 text-white"
                            : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-indigo-600 px-6 pb-4">
        <div className="flex h-16 items-center">
          <Image
            width={500}
            height={500}
            alt="Logo"
            src="/logo.avif"
            className="h-10 w-auto"
          />
        </div>
        <nav className="mt-4 flex-1">
          <ul role="list" className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-indigo-700 text-white"
                      : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                  )}
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LogoutButton />
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 h-16 flex items-center bg-white px-4 shadow sm:px-6 lg:px-8 border-b">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </button>

          <div className="ml-auto flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-gray-400" />
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center">
                <Image
                  width={32}
                  height={32}
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <a
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>

        <main className="p-6">
          <h1 className="text-xl font-bold">Welcome, {user?.name}!</h1>
          {/* Aquí va el contenido principal del dashboard */}
        </main>
      </div>
    </div>
  );
}
