"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PhoneIcon, CalendarDaysIcon, StarIcon } from "@heroicons/react/24/solid";
import { useGSMStore } from "@/store/gsmactx-store";
import useSectionObserver from "@/hooks/useSectionObserver";
import Header from "@/components/layout/Header";
import { businessInfo } from "@/lib/data";
import type { PlaceRatingData } from "@/types/google-places";

interface HeroClientProps {
  googleData: PlaceRatingData | null;
}

export default function HeroClient({ googleData }: HeroClientProps) {
  const { setScrolled } = useGSMStore();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrolled]);

  const ref = useSectionObserver({ sectionName: "Home" });

  // Use Google data if available, fallback to static
  const rating = googleData?.rating ?? parseFloat(businessInfo.reviews.aggregateRating);
  const reviewCount = googleData?.totalReviews ?? parseInt(businessInfo.reviews.reviewCount);

  // Spring-based fade-in animation for natural feel
  // Using GPU-accelerated properties only (opacity, transform via y)
  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 24,
  };

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion ? { duration: 0 } : springTransition,
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <Header />

      {/* Background Image */}
      <Image
        src="/main.avif"
        alt="Professional HVAC technician installing air conditioning system in Cypress, Texas"
        priority
        quality={85}
        fill
        sizes="100vw"
        className="object-cover -z-20"
      />

      {/* Gradient overlay for better text readability */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">

          {/* Trust Badge - Compact */}
          <motion.div {...fadeIn} className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20">
              <div
                className="flex"
                role="img"
                aria-label={`${rating} out of 5 stars`}
              >
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      i < Math.round(rating) ? "text-yellow-400" : "text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-white">
                {rating.toFixed(1)} · {reviewCount.toLocaleString()} reviews
              </span>
            </div>
          </motion.div>

          {/* Main Heading - SEO Optimized */}
          <motion.h1
            {...fadeIn}
            transition={shouldReduceMotion ? { duration: 0 } : { ...springTransition, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight"
          >
            Expert HVAC Solutions
            <span className="block text-gold mt-1 sm:mt-2">Cypress & Houston, TX</span>
          </motion.h1>

          {/* Services Keywords - SEO */}
          <motion.p
            {...fadeIn}
            transition={shouldReduceMotion ? { duration: 0 } : { ...springTransition, delay: 0.2 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-300 font-light"
          >
            AC Installation · Heating Repair · Duct Cleaning · Attic Insulation
          </motion.p>

          {/* Special Offer Card with CTAs */}
          <motion.div
            {...fadeIn}
            transition={shouldReduceMotion ? { duration: 0 } : { ...springTransition, delay: 0.3 }}
            className="mt-6 sm:mt-8 max-w-sm sm:max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 sm:p-5 md:p-6">
              {/* Offer Badge - decorative pulse dot hidden from assistive tech */}
              <div className="flex items-center justify-center gap-1.5 mb-2 sm:mb-3">
                <span
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"
                  role="presentation"
                  aria-hidden="true"
                />
                <span className="text-[10px] sm:text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-400 tabular-nums">
                  $69.99
                </span>
                <div className="text-left">
                  <p className="text-gray-400 line-through text-xs sm:text-sm tabular-nums">$99.99</p>
                  <p className="text-emerald-300 text-[10px] sm:text-xs font-semibold">AC Check-Up</p>
                </div>
              </div>

              {/* CTAs - Single row on sm+ */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  href="/book-appointment"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-semibold transition-colors duration-200"
                >
                  <CalendarDaysIcon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  Book Now
                </Link>
                <Link
                  href={`tel:${businessInfo.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-sm sm:text-base font-semibold transition-colors duration-200"
                >
                  <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  Call Now
                </Link>
              </div>

              <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-400">
                + Free filter with any system replacement
              </p>
            </div>
          </motion.div>

          {/* Years Badge */}
          <motion.p
            {...fadeIn}
            transition={shouldReduceMotion ? { duration: 0 } : { ...springTransition, delay: 0.4 }}
            className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400"
          >
            Serving the Houston area since {businessInfo.established} · Licensed & Insured
          </motion.p>
        </div>
      </div>
    </section>
  );
}
