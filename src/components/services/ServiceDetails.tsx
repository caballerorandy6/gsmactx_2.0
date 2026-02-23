"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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
      className="overflow-hidden bg-white py-24 sm:py-32 custom-blue"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 flex flex-col items-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl text-center"
        >
          {title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInScale}
          className="relative w-full h-72 sm:h-88 md:h-104 my-8 sm:my-10 rounded-2xl overflow-hidden shadow-2xl group"
        >
          <Image
            width={800}
            height={500}
            alt={`${title} - Professional HVAC service by GSM A/C in Cypress, TX`}
            src={imageSrc}
            className={`block size-full object-cover w-full transition-transform duration-500 ${shouldReduceMotion ? "" : "group-hover:scale-105"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-10 w-full space-y-12"
        >
          {array.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              className="w-full flex flex-col items-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-colors"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-pretty text-white w-full text-center mb-4">
                {item.name}
              </h3>
              <p className="text-base/7 text-gray-300 w-full text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDetails;
