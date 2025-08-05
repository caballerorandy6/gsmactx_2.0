// src/app/(admin)/admin-dashboard/page.tsx
import { getCurrentUser } from "@/libs/getCurrentUser";

import AdminDashboard from "@/components/admin-components/AdminDashboard";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 custom-blue min-h-screen overflow-y-scroll">
        <div className="text-center">
          <p className="text-4xl font-semibold text-indigo-600">401</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
            You are not authorized to view this page!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/#home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard user={user} />;
}
