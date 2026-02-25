"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// Lazy load ContactWithReCaptcha to defer 357KB reCAPTCHA script
// Only loads when user scrolls within 400px of the contact section
const ContactWithReCaptcha = dynamic(
  () => import("@/components/landing/ContactWithReCaptcha"),
  {
    ssr: false,
    loading: () => (
      <section
        id="contact"
        className="relative isolate bg-gray-900 min-h-[600px] flex items-center justify-center"
      >
        <div className="animate-pulse text-gray-500">Loading contact form…</div>
      </section>
    ),
  }
);

// Placeholder shown before user scrolls near contact
function ContactPlaceholder() {
  return (
    <section
      id="contact"
      className="relative isolate bg-gray-900 min-h-[600px] flex items-center justify-center"
    >
      <div className="text-gray-500 text-center">
        <p className="text-lg">Contact form will load when you scroll here</p>
      </div>
    </section>
  );
}

export default function LazyContact() {
  const [shouldLoad, setShouldLoad] = useState(false);

  // Trigger load when user is within 400px of the contact section
  const { ref } = useInView({
    threshold: 0,
    rootMargin: "400px 0px",
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setShouldLoad(true);
      }
    },
  });

  return (
    <div ref={ref}>
      {shouldLoad ? <ContactWithReCaptcha /> : <ContactPlaceholder />}
    </div>
  );
}
