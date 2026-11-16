"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { businessInfo } from "@/lib/data";

const FloatingCTAButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  // On the booking page itself only the call button is useful.
  const showBook = usePathname() !== "/book-appointment";

  useEffect(() => {
    const toggleVisibility = () => {
      // Show buttons after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Exit is faster than entrance; reduced motion falls back to the global
  // rule in globals.css, which makes the change instant.
  const slide =
    "translate-x-24 scale-90 opacity-0 transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[visible=true]/cta:translate-x-0 group-data-[visible=true]/cta:scale-100 group-data-[visible=true]/cta:opacity-100 group-data-[visible=true]/cta:duration-300";

  return (
    // Always mounted so hiding can animate; inert keeps hidden buttons out of
    // the tab order and away from screen readers.
    <div
      data-visible={isVisible}
      inert={!isVisible}
      className="group/cta fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden"
    >
      {/* Call Button */}
      <div className={slide}>
        <Link
          href={`tel:${businessInfo.phone}`}
          aria-label="Call us now"
          className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-primary-500/40 transition-all duration-300"
        >
          <PhoneIcon className="h-6 w-6" />
          <span className="hidden sm:inline font-semibold whitespace-nowrap">
            Call Now
          </span>
        </Link>
      </div>

      {/* Book Appointment Button */}
      {showBook && (
        <div className={`${slide} delay-0 group-data-[visible=true]/cta:delay-75`}>
          <Link
            href="/book-appointment"
            aria-label="Book an appointment"
            className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-primary-500/40 transition-all duration-300"
          >
            <CalendarDaysIcon className="h-6 w-6" />
            <span className="hidden sm:inline font-semibold whitespace-nowrap">
              Book Now
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FloatingCTAButtons;
