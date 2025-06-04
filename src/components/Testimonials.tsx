"use client";

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
        console.log("Testimonials fetched successfully:", data.result.reviews);
      } else {
        console.warn("No reviews found or unexpected data structure:", data);
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
      return [];
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-24 sm:py-32 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8"
    >
      <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
        What our customers say?
      </p>

      <GSMSlider reviews={testimonials} />
      <div className="flex flex-col xl:flex-row justify-between gap-8 items-center rounded-r-4xl">
        <div className="xl:w-1/2">
          <h2 className="text-2xl font-semibold tracking-tight text-pretty text-white">
            Committed to Excellence: Our Clients&apos; Satisfaction Speaks for
            Itself
          </h2>
          <p className="mt-6 text-base/7 text-gray-300">
            At G S M A/C & General Contractor INC., we don’t just specialize in
            HVAC installation and repair — we build long-lasting relationships
            based on trust, transparency, and quality workmanship. Since day
            one, our mission has been to deliver exceptional service that goes
            beyond the technical: we listen, advise, and ensure each client
            receives exactly what they need. Thanks to our dedication to detail
            and excellence, we’ve earned the loyalty of hundreds of families and
            businesses who rely on us as their trusted HVAC service provider.
            Every project is an opportunity to exceed expectations, and we prove
            it through consistent results and customer care that truly stands
            out. Our clients’ satisfaction isn’t just a promise — it’s our
            reputation. Positive reviews, referrals, and returning customers
            reflect the real impact of our work. At G S M A/C, your comfort and
            peace of mind are our top priorities, and we work every day to live
            up to that commitment.
          </p>
        </div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          controls
          src="/video_compressed.webm"
          className="inset-0 size-fit object-cover mt-20 saturate-200 xl:w-1/2"
        >
          <track
            kind="subtitles"
            src="/captions.vtt"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Testimonials;
