"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { PhoneIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import CustomBadge from "@/components/ui/CustomBadge";
import { useGSMStore } from "@/store/gsmactx-store";
import useSectionObserver from "@/hooks/useSectionObserver";
import Header from "@/components/layout/Header";
import { businessInfo } from "@/lib/data";

const { props: heroImgProps } = getImageProps({
  src: "/main.avif",
  alt: "GSM technicians cleaning air ducts in a Cypress, Texas home",
  width: 1080,
  height: 1080,
  unoptimized: true,
  loading: "eager",
  fetchPriority: "high",
});

interface HeroClientProps {
  ratingSlot: ReactNode;
}

export default function HeroClient({ ratingSlot }: HeroClientProps) {
  const { setScrolled } = useGSMStore();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrolled]);

  const ref = useSectionObserver({ sectionName: "Home" });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <Header />

      {/* Background Image */}
      {/* Art-directed: 1080px file on mobile, 2400px from md up.
          unoptimized because the files are already exported at final size. */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/main-2400.avif" type="image/avif" />
        <img
          {...heroImgProps}
          className="absolute inset-0 size-full object-cover object-[40%_center] md:object-[center_15%] -z-20"
        />
      </picture>

      {/* Gradient overlay for better text readability */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">

          {/* Trust Badge - Streamed via Suspense */}
          <div className="hero-rise">{ratingSlot}</div>

          {/* Main Heading - SEO Optimized */}
          <h1
            className="hero-rise text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight"
            style={{ "--hero-delay": "100ms" } as CSSProperties}
          >
            Expert HVAC Solutions
            <span className="block text-gold mt-1 sm:mt-2">Cypress & Houston, TX</span>
          </h1>

          {/* Services Keywords - SEO */}
          <p
            className="hero-rise mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-300 font-light"
            style={{ "--hero-delay": "200ms" } as CSSProperties}
          >
            AC Installation · Heating Repair · Duct Cleaning · Attic Insulation
          </p>

          {/* Special Offer Card with CTAs */}
          <div
            className="hero-rise mt-6 sm:mt-8 max-w-sm sm:max-w-md mx-auto"
            style={{ "--hero-delay": "300ms" } as CSSProperties}
          >
            <div className="bg-white/10 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-5 sm:p-6">
              {/* Offer Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-3">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
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
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
                >
                  <CalendarDaysIcon className="w-5 h-5" aria-hidden="true" />
                  Book Now
                </Link>
                <Link
                  href={`tel:${businessInfo.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/25 bg-white/5 hover:bg-white/15 text-white font-semibold transition-colors"
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
          </div>

          {/* Years Badge */}
          <p
            className="hero-rise mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400"
            style={{ "--hero-delay": "400ms" } as CSSProperties}
          >
            Serving the Houston area since {businessInfo.established} · Licensed & Insured
          </p>
        </div>
      </div>
    </section>
  );
}
