"use client";

import { motion, useReducedMotion } from "framer-motion";
import TestimonialsCarousel from "./TestimonialsCarousel";
import { Review } from "@/lib/interfaces";
import { useRef, useEffect, useState } from "react";
import useSectionObserver from "@/hooks/useSectionObserver";
import { getGoogleReviewsAction } from "@/app/actions/googlePlacesAction";

const Testimonials = () => {
  const ref = useSectionObserver({ sectionName: "Testimonials" });
  const shouldReduceMotion = useReducedMotion();
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Lazy load video when it comes into view
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, [isVideoVisible]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const reviews = await getGoogleReviewsAction();
      setTestimonials(reviews);
    };
    fetchTestimonials();
  }, []);

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

  const fadeIn = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
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
        <TestimonialsCarousel reviews={testimonials} />
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
        <motion.div
          ref={videoContainerRef}
          variants={fadeInUp}
          className="xl:w-1/2 mt-20"
        >
          {isVideoVisible ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              src="/video_compressed.webm"
              className="inset-0 size-fit object-cover saturate-200 rounded-lg shadow-2xl"
            >
              <track
                kind="captions"
                src="/captions.vtt"
                srcLang="en"
                label="English"
                default
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="aspect-video bg-gray-800 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="animate-pulse text-gray-500">Loading video…</div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
