"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { useGSMStore } from "@/store/gsmactx-store";
import useSectionObserver from "@/hooks/useSectionObserver";
import Header from "@/components/layout/Header";
import CustomBadge from "@/components/ui/CustomBadge";
import TrustIndicators from "@/components/landing/TrustIndicators";
import { businessInfo } from "@/lib/data";
import type { PlaceRatingData } from "@/types/google-places";

interface HeroClientProps {
  googleData: PlaceRatingData | null;
}

export default function HeroClient({ googleData }: HeroClientProps) {
  const { setScrolled } = useGSMStore();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrolled]);

  const ref = useSectionObserver({ sectionName: "Home" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="bg-gray-900 min-h-screen flex flex-col"
    >
      <Header />
      <div className="relative isolate overflow-hidden flex-1 flex items-center pt-20 lg:pt-24">
        <Image
          src="/main.avif"
          alt="GSM AC Background"
          priority
          quality={90}
          width={1920}
          height={1080}
          sizes="100vw"
          className="absolute inset-0 -z-10 w-full h-full object-cover"
        />

        {/* Dark overlay with subtle shadow */}
        <div className="absolute inset-0 -z-10 bg-black/65" />

        {/* Vignette effect for additional depth */}
        <div className="absolute inset-0 -z-10 bg-gradient-radial from-transparent via-transparent to-black/40" />

        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            className="mx-auto max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Trust Indicators at top */}
            <div className="mb-6 sm:mb-8">
              <TrustIndicators
                googleData={googleData}
                itemVariants={itemVariants}
              />
            </div>

            {/* Main content wrapper */}
            <div className="text-center space-y-4 sm:space-y-6">
              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              >
                Expert HVAC Solutions
                <span className="block text-gold mt-2">Cypress, TX</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light"
              >
                Your trusted partner for all heating & cooling needs
              </motion.p>

              {/* Financing Badge */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <CustomBadge>
                  Easy financing available
                  <span className="font-bold ml-2">Apply now! &rarr;</span>
                </CustomBadge>
              </motion.div>

              {/* Special Offer Card */}
              <motion.div variants={itemVariants} className="max-w-lg mx-auto">
                <div className="bg-linear-to-br from-emerald-500/10 via-emerald-600/5 to-transparent backdrop-blur-md border-2 border-emerald-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl">
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="text-[10px] sm:text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                      Limited Time Special Offer
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      Heating Check-Up Special
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-400">
                        $69.99
                      </span>
                      <div className="text-left">
                        <p className="text-gray-400 line-through text-xs sm:text-sm">
                          Was $99.99
                        </p>
                        <p className="text-emerald-300 text-[10px] sm:text-xs font-semibold">
                          Save $30!
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-300 pt-1">
                      + Free filter & surge protection with system replacement
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6"
              >
                {/* Primary CTA - Call Now */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={floatAnimation}
                  className="w-full sm:w-auto order-1"
                >
                  <Link
                    href={`tel:${businessInfo.phone}`}
                    className="flex items-center justify-center gap-3 w-full sm:w-auto rounded-2xl bg-gold hover:bg-amber-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-gold/50 transition-all duration-300 border-2 border-amber-400/30"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, -15, 15, -15, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                    >
                      <PhoneIcon className="h-5 w-5 text-white" />
                    </motion.div>
                    <span>+1 (281) 235-4684</span>
                  </Link>
                </motion.div>

                {/* Secondary CTA - Book Appointment */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={floatAnimation}
                  className="w-full sm:w-auto order-2"
                >
                  <Link
                    href="/book-appointment"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 border-2 border-indigo-400/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    Book Appointment
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </section>
  );
}
