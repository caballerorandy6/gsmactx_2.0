"use client";

import dynamic from "next/dynamic";

// Lazy load ContactWithReCaptcha to defer 357KB reCAPTCHA script
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

export default function LazyContact() {
  return <ContactWithReCaptcha />;
}
