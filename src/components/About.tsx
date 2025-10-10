"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import useSectionObserver from "@/hooks/useSectionObserver";

const About = () => {
  const ref = useSectionObserver({ sectionName: "About" });

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="overflow-hidden bg-white py-24 sm:py-32 custom-blue"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
          >
            About Our HVAC Repair & Installation Company
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-base/7 text-gray-300"
          >
            We established our HVAC repair & installation company in 2005 and
            since then, G S M A/C & General Contractor INC. has become a
            reference for quality, professionalism, and competence. Over the
            years, we have handled countless projects for many homeowners and
            businesses in Cypress, TX and we would be honored to assist you as
            well. Discover a dependable partner in us.
          </motion.p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <motion.div
            className="lg:pr-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-semibold tracking-tight text-pretty text-white"
            >
              Why Work With Us?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base/7 text-gray-300"
            >
              Unlike many companies in Cypress, TX that offer limited
              assistance, we offer a comprehensive service package. We
              specialize in AC and HVAC installation and repair, as well as in
              heating installation and heating repair. We can clean and sanitize
              air ducts and insulate attics to prevent air leaks. We pride
              ourselves on doing things right the first time, meaning we can
              complete your project in a prompt but correct manner. Your
              satisfaction is guaranteed.
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-semibold tracking-tight text-pretty text-white mt-10"
            >
              Why Trust Us?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-8 text-base/7 text-gray-300"
            >
              Our HVAC repair & installation company is based on honesty,
              teamwork, integrity, and accountability. Our core values have
              allowed us to earn the repeat business of countless customers and
              we believe they will win us yours as well. At G S M A/C & General
              Contractor INC., we are licensed, certified, and insured. Call now
              to ask about our attractive discounts. Reach us at (281) 235-4684
              now to schedule an appointment and book our heating repair
              services and other options. We are looking forward to helping you!
            </motion.p>
          </motion.div>

          <motion.div
            className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="-mx-8 grid grid-cols-2 px-4 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              <motion.div
                variants={imageVariant}
                className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10"
              >
                <div className="relative h-80 transition-transform duration-300 hover:scale-110">
                  <Image
                    width={560}
                    height={560}
                    alt="GSM AC Personal"
                    src="/worker.avif"
                    className="block size-full object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>
              <motion.div
                variants={imageVariant}
                className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40"
              >
                <div className="relative h-80 transition-transform duration-300 hover:scale-110">
                  <Image
                    width={560}
                    height={560}
                    alt="GSM AC Personal"
                    src="/worker2.avif"
                    className="block size-full object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>
              <motion.div
                variants={imageVariant}
                className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10"
              >
                <div className="relative h-80 transition-transform duration-300 hover:scale-110">
                  <Image
                    width={560}
                    height={560}
                    alt="GSM AC Personal"
                    src="/worker4.avif"
                    className="block size-full object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </motion.div>
              <motion.div
                variants={imageVariant}
                className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40"
              >
                <div className="relative h-80 transition-transform duration-300 hover:scale-110">
                  <Image
                    width={560}
                    height={560}
                    alt="GSM AC Personal"
                    src="/worker6.avif"
                    className="block size-full object-cover rounded-2xl shadow-[0_8px_24px_rgba(10,15,26,0.6)]"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
