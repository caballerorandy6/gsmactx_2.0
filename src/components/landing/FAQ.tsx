"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import useSectionObserver from "@/hooks/useSectionObserver";

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const ref = useSectionObserver({ sectionName: "FAQ" });

  return (
    <section ref={ref} id="faq" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="heading-section">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 divide-y divide-white/10">
            {faqs.map((faq) => (
              <div className="reveal" key={faq.question}>
                {/* Native details: answers stay in the HTML even when closed */}
                <details className="group py-6">
                  <summary className="flex w-full cursor-pointer list-none items-start justify-between text-left text-white transition-colors hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base/7 font-semibold">
                      {faq.question}
                    </h3>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusIcon className="size-6 group-open:hidden" aria-hidden="true" />
                      <MinusIcon className="size-6 hidden group-open:block" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-2 pr-12 text-base/7 text-gray-300">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
