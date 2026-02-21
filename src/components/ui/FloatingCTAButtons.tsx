"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { businessInfo } from "@/lib/data";

const FloatingCTAButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show buttons after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* Call Button */}
          <motion.div
            custom={0}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link
              href={`tel:${businessInfo.phone}`}
              aria-label="Call us now"
              className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 hover:shadow-emerald-500/40 transition-all duration-300"
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <PhoneIcon className="h-6 w-6" />
              </motion.div>
              <span className="hidden sm:inline font-semibold whitespace-nowrap">
                Call Now
              </span>
            </Link>
          </motion.div>

          {/* Book Appointment Button */}
          <motion.div
            custom={1}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link
              href="/book-appointment"
              aria-label="Book an appointment"
              className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all duration-300"
            >
              <motion.div
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <CalendarDaysIcon className="h-6 w-6" />
              </motion.div>
              <span className="hidden sm:inline font-semibold whitespace-nowrap">
                Book Now
              </span>
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTAButtons;
