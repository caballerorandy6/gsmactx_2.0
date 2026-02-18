"use client";

import dynamic from "next/dynamic";
import ReCaptchaProvider from "@/components/forms/ReCaptchaProvider";

// Lazy load the Contact form to reduce initial bundle
const Contact = dynamic(() => import("./Contact"), {
  ssr: false,
  loading: () => (
    <section className="relative isolate bg-gray-900 min-h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading contact form…</div>
    </section>
  ),
});

export default function ContactWithReCaptcha() {
  return (
    <ReCaptchaProvider>
      <Contact />
    </ReCaptchaProvider>
  );
}
