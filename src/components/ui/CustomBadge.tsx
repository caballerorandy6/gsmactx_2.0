import Link from "next/link";
import { ReactNode } from "react";
import { BanknotesIcon } from "@heroicons/react/24/solid";

interface CustomBadgeProps {
  children: ReactNode;
  showIcon?: boolean;
}

const CustomBadge = ({ children, showIcon = true }: CustomBadgeProps) => {
  return (
    <Link
      href="https://apply.optimusfinancing.com/EG-51065"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded text-sm font-medium text-gray-200 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
    >
      {showIcon && (
        <BanknotesIcon className="size-4 text-gold" aria-hidden="true" />
      )}
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </Link>
  );
};

export default CustomBadge;
