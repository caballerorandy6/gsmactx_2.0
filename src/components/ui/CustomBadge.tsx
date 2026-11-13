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
      className="group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl border-2 border-gold bg-gold/10 text-gold text-sm sm:text-base font-semibold transition-all duration-200 hover:bg-gold hover:text-gray-900 hover:scale-105"
    >
      {showIcon && (
        <BanknotesIcon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
      )}
      {children}
    </Link>
  );
};

export default CustomBadge;
