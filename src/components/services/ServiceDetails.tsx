"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ServiceDetailsProps } from "@/lib/types";

const ServiceDetails = ({
  id,
  title,
  imageSrc,
  array,
}: ServiceDetailsProps) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          className="relative w-full h-[20rem] sm:h-[24rem] my-10 rounded-2xl overflow-hidden shadow-2xl group"
        >
          <Image
            width={560}
            height={560}
            alt="GSM AC Service"
            src={imageSrc}
            className="block size-full object-cover w-full transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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
