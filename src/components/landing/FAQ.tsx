"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import useSectionObserver from "@/hooks/useSectionObserver";

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const ref = useSectionObserver({ sectionName: "FAQ" });
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

  const itemVariant = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : springTransition,
    },
  };

  return (
    <section ref={ref} id="faq" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="heading-section"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="mt-12 divide-y divide-white/10"
          >
            {faqs.map((faq) => (
              <motion.div key={faq.question} variants={itemVariant}>
                {/* Native details: answers stay in the HTML even when closed */}
                <details className="group py-6">
                  <summary className="flex w-full cursor-pointer list-none items-start justify-between text-left text-white transition-colors hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base/7 font-semibold">
                      {faq.question}
                    </h3>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusIcon className="size-6 group-open:hidden" aria-hidden="true" />
                      <MinusIcon className="size-6 hidden group-open:block" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-2 pr-12 text-base/7 text-gray-300">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
