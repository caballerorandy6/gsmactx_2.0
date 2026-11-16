"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import useSectionObserver from "@/hooks/useSectionObserver";

interface TestimonialsProps {
  /** Server-rendered Google reviews (wrapped in Suspense by the page) */
  reviewsSlot: ReactNode;
}

const Testimonials = ({ reviewsSlot }: TestimonialsProps) => {
  const ref = useSectionObserver({ sectionName: "Testimonials" });
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

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-24 sm:py-32 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 className="mt-2 max-w-lg heading-section">
        What our customers say?
      </h2>

      <div>
        {reviewsSlot}
      </div>

      <div className="flex flex-col xl:flex-row justify-between gap-8 items-center rounded-r-4xl">
        <div className="xl:w-1/2">
          <h3 className="heading-sub">
            Committed to Excellence: Our Clients&apos; Satisfaction Speaks for
            Itself
          </h3>
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
        </div>
        <div
          ref={videoContainerRef}
          className="w-full xl:w-1/2 mt-20"
        >
          {isVideoVisible ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              width={640}
              height={360}
              poster="/video-poster.avif"
              src="/video_compressed.webm"
              className="w-full h-auto aspect-video object-cover rounded-lg shadow-2xl"
            >
              <track
                kind="captions"
                src="/captions.vtt"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              className="aspect-video w-full rounded-lg shadow-2xl bg-gray-800"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
