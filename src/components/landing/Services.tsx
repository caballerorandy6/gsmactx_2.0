"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/lib/data";
import ServiceCard from "@/components/services/ServiceCard";
import useSectionObserver from "@/hooks/useSectionObserver";
import { features } from "@/lib/data";

export default function Services() {
  const ref = useSectionObserver({ sectionName: "Services" });
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

  const staggerContainer = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
    },
  };

  const cardVariant = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : springTransition,
    },
  };

  return (
    <section id="services" ref={ref} className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="heading-section"
        >
          What Are Our Services?
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariant}>
              <ServiceCard
                title={service.title}
                description={service.description}
                imageUrl={service.src}
                link={service.link}
                href={service.href}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-20 grid max-w-2xl gap-10 lg:max-w-none lg:grid-cols-3 lg:gap-12"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={fadeInUp}
              className="relative flex flex-col"
            >
              <h3 className="text-lg/7 font-semibold tracking-tight text-pretty text-white">
                {feature.name}
              </h3>
              <p className="mt-3 text-base/7 text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
