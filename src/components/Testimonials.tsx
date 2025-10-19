"use client";

import { motion } from "framer-motion";
import GSMSlider from "./GSMSlider";
import { Review } from "@/libs/interfaces";
import { useRef, useEffect, useState } from "react";
import useSectionObserver from "@/hooks/useSectionObserver";

const Testimonials = () => {
  const ref = useSectionObserver({ sectionName: "Testimonials" });
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // if you want to set a specific playback rate am just setting it to any value
    }
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`/api/reviews`);
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();

      if (data && data.result && Array.isArray(data.result.reviews)) {
        setTestimonials(data.result.reviews);
      } else {
        setTestimonials([]);
      }
    } catch {
      setTestimonials([]);
      return [];
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-24 sm:py-32 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8"
    >
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
      >
        What our customers say?
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <GSMSlider reviews={testimonials} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col xl:flex-row justify-between gap-8 items-center rounded-r-4xl"
      >
        <motion.div variants={fadeInUp} className="xl:w-1/2">
          <h2 className="text-2xl font-semibold tracking-tight text-pretty text-white">
            Committed to Excellence: Our Clients&apos; Satisfaction Speaks for
            Itself
          </h2>
          <p className="mt-6 text-base/7 text-gray-300">
            At GSM A/C & General Contractor INC., we don&apos;t just specialize in
            HVAC installation and repair — we build long-lasting relationships
            based on trust, transparency, and quality workmanship. Since day
            one, our mission has been to deliver exceptional service that goes
            beyond the technical: we listen, advise, and ensure each client
            receives exactly what they need. Thanks to our dedication to detail
            and excellence, we&apos;ve earned the loyalty of hundreds of families and
            businesses who rely on us as their trusted HVAC service provider.
            Every project is an opportunity to exceed expectations, and we prove
            it through consistent results and customer care that truly stands
            out. Our clients&apos; satisfaction isn&apos;t just a promise — it&apos;s our
            reputation. Positive reviews, referrals, and returning customers
            reflect the real impact of our work. At GSM A/C, your comfort and
            peace of mind are our top priorities, and we work every day to live
            up to that commitment.
          </p>
        </motion.div>
        <motion.video
          variants={fadeInUp}
          ref={videoRef}
          autoPlay
          muted
          loop
          controls
          src="/video_compressed.webm"
          className="inset-0 size-fit object-cover mt-20 saturate-200 xl:w-1/2 rounded-lg shadow-2xl"
        >
          <track
            kind="subtitles"
            src="/captions.vtt"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support the video tag.
        </motion.video>
      </motion.div>
    </section>
  );
};

export default Testimonials;
