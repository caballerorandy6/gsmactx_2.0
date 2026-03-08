import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-500/20 p-4">
            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/admin-dashboard"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
