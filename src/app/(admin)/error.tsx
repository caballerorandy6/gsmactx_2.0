"use client";

import { useEffect } from "react";
import { ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500/20 p-4">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Something went wrong
        </h2>

        <p className="text-gray-400 mb-6">
          An error occurred while loading this page. Please try again or contact support if the problem persists.
        </p>

        {error.digest && (
          <p className="text-xs text-gray-500 mb-4 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Try Again
          </button>
          <a
            href="/admin-dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-white/10"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
