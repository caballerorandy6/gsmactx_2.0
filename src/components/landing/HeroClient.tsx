"use client";

import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PhoneIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import CustomBadge from "@/components/ui/CustomBadge";
import { useGSMStore } from "@/store/gsmactx-store";
import useSectionObserver from "@/hooks/useSectionObserver";
import Header from "@/components/layout/Header";
import { businessInfo } from "@/lib/data";

interface HeroClientProps {
  ratingSlot: ReactNode;
}

export default function HeroClient({ ratingSlot }: HeroClientProps) {
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

          {/* Trust Badge - Streamed via Suspense */}
          <motion.div {...fadeIn}>
            {ratingSlot}
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
            <div className="bg-white/10 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-5 sm:p-6">
              {/* Offer Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-3">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  role="presentation"
                  aria-hidden="true"
                />
                <span className="text-[10px] sm:text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </span>

              {/* Service Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                AC Check-Up
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline justify-center gap-3 mb-5">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 tabular-nums">
                  $69.99
                </span>
                <span className="text-base text-gray-400 line-through tabular-nums">
                  $99.99
                </span>
                <span className="px-2 py-0.5 text-xs font-bold text-emerald-900 bg-emerald-400 rounded">
                  30% OFF
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Link
                  href="/book-appointment"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
                >
                  <CalendarDaysIcon className="w-5 h-5" aria-hidden="true" />
                  Book Now
                </Link>
                <Link
                  href={`tel:${businessInfo.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" aria-hidden="true" />
                  Call Now
                </Link>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-white/10" />

              {/* Financing */}
              <CustomBadge>Financing Available</CustomBadge>

              <p className="mt-3 text-xs sm:text-sm text-gray-300">
                <span className="text-emerald-400">+</span> Free filter with any system replacement
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
