import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared frame for the small utility screens (login, password reset,
 * unsubscribe): logo back to home, one centered card, a real <main>.
 */
const AuthShell = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-dvh flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          aria-label="GSM A/C home"
          className="mx-auto mb-8 block w-fit rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
        >
          <Image
            src="/logo-small.avif"
            alt=""
            width={120}
            height={120}
            className="h-16 w-auto"
            preload
            fetchPriority="high"
          />
        </Link>
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthShell;

/** Shared control styles so every auth form reads the same. */
export const authInputClass =
  "block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500";

export const authLabelClass = "block text-sm/6 font-semibold text-white";

export const authPrimaryButtonClass =
  "flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors motion-reduce:transition-none disabled:bg-primary-300 disabled:cursor-not-allowed cursor-pointer";

export const authSecondaryLinkClass =
  "inline-flex items-center gap-2 rounded-sm text-sm text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors motion-reduce:transition-none";
