"use client";

import { motion } from "framer-motion";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="mt-16 space-y-2 divide-y divide-white/10"
          >
            {faqs.map((faq) => (
              <motion.div key={faq.question} variants={itemVariant}>
                <Disclosure as="div" className="py-8 first:pt-0 last:pb-0">
                  <div>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-white hover:text-gray-300 transition-colors">
                      <span className="text-base/7 font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusIcon className="size-6 group-data-open:hidden transition-transform" />
                        <MinusIcon className="size-6 group-not-data-open:hidden transition-transform" />
                      </span>
                    </DisclosureButton>
                  </div>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-base/7 text-gray-300"
                    >
                      {faq.answer}
                    </motion.p>
                  </DisclosurePanel>
                </Disclosure>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
