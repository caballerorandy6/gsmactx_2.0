"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { CalendarDaysIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ServiceDetailsProps } from "@/lib/types";

const ServiceDetails = ({
  id,
  title,
  imageSrc,
  array,
}: ServiceDetailsProps) => {
  const shouldReduceMotion = useReducedMotion();

  // Spring-based animation for natural feel
  // Using GPU-accelerated properties only (opacity, transform)
  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 24,
  };

  const fadeInUp = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : springTransition,
    },
  };

  const fadeInScale = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion ? { duration: 0 } : springTransition,
    },
  };

  const staggerContainer = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
    },
  };

  const itemVariant = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : springTransition,
    },
  };

  return (
    <section
      id={id}
      className="overflow-hidden bg-white pt-32 pb-24 sm:pt-36 sm:pb-32 custom-blue"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col items-center">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="heading-page text-center"
        >
          {title}
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInScale}
          className="relative w-full h-72 sm:h-88 md:h-104 my-8 sm:my-10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Files are pre-exported at 800w and 1536w, so the browser picks via srcSet
              instead of going through the image optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={1536}
            height={1024}
            alt={`${title} - Professional HVAC service by GSM A/C in Cypress, TX`}
            src={imageSrc}
            srcSet={`${imageSrc.replace(".avif", "-800.avif")} 800w, ${imageSrc} 1536w`}
            sizes="(max-width: 1280px) 100vw, 1216px"
            decoding="async"
            className="block size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-6 w-full max-w-2xl space-y-10"
        >
          {array.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
            >
              {item.name && (
                <h2 className="heading-sub mb-3">{item.name}</h2>
              )}
              <p className="text-base/7 text-gray-300 sm:text-lg/8">
                {item.description}
              </p>
            </motion.div>
          ))}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >
              <CalendarDaysIcon aria-hidden="true" className="size-5" />
              Book Appointment
            </Link>
            <Link
              href="tel:+12812354684"
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >
              <PhoneIcon aria-hidden="true" className="size-5" />
              Call (281) 235-4684
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDetails;
