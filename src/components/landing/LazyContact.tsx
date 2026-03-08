"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// Skeleton that matches the Contact form layout
function ContactSkeleton() {
  return (
    <section id="contact" className="relative isolate bg-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left side - Contact info skeleton */}
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg animate-pulse">
            <div className="h-12 w-64 bg-gray-700 rounded-lg" />
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-700 rounded" />
              <div className="h-4 w-4/5 bg-gray-700 rounded" />
            </div>
            <div className="mt-10 space-y-4">
              <div className="flex gap-x-4">
                <div className="h-7 w-6 bg-gray-700 rounded" />
                <div className="h-4 w-48 bg-gray-700 rounded" />
              </div>
              <div className="flex gap-x-4">
                <div className="h-7 w-6 bg-gray-700 rounded" />
                <div className="h-4 w-36 bg-gray-700 rounded" />
              </div>
              <div className="flex gap-x-4">
                <div className="h-7 w-6 bg-gray-700 rounded" />
                <div className="h-4 w-44 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
        {/* Right side - Form skeleton */}
        <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg animate-pulse">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <div className="h-4 w-20 bg-gray-700 rounded mb-2" />
                <div className="h-10 w-full bg-gray-800 rounded-md" />
              </div>
              <div>
                <div className="h-4 w-20 bg-gray-700 rounded mb-2" />
                <div className="h-10 w-full bg-gray-800 rounded-md" />
              </div>
              <div className="sm:col-span-2">
                <div className="h-4 w-12 bg-gray-700 rounded mb-2" />
                <div className="h-10 w-full bg-gray-800 rounded-md" />
              </div>
              <div className="sm:col-span-2">
                <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                <div className="h-10 w-full bg-gray-800 rounded-md" />
              </div>
              <div className="sm:col-span-2">
                <div className="h-4 w-16 bg-gray-700 rounded mb-2" />
                <div className="h-24 w-full bg-gray-800 rounded-md" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-x-3">
              <div className="h-4 w-4 bg-gray-700 rounded" />
              <div className="h-4 w-48 bg-gray-700 rounded" />
            </div>
            <div className="mt-8 flex justify-end">
              <div className="h-10 w-32 bg-indigo-600/50 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Lazy load ContactWithReCaptcha to defer 357KB reCAPTCHA script
// Only loads when user scrolls within 400px of the contact section
const ContactWithReCaptcha = dynamic(
  () => import("@/components/landing/ContactWithReCaptcha"),
  {
    ssr: false,
    loading: () => <ContactSkeleton />,
  }
);

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
      {shouldLoad ? <ContactWithReCaptcha /> : <ContactSkeleton />}
    </div>
  );
}
