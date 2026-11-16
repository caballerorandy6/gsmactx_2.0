"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { services } from "@/lib/data";
import ServiceCard from "@/components/services/ServiceCard";
import useSectionObserver from "@/hooks/useSectionObserver";
import { features } from "@/lib/data";

export default function Services() {
  const ref = useSectionObserver({ sectionName: "Services" });

  return (
    <section id="services" ref={ref} className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="heading-section">
          What Are Our Services?
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div className="reveal" key={service.title}>
              <ServiceCard
                title={service.title}
                description={service.description}
                imageUrl={service.src}
                link={service.link}
                href={service.href}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:justify-start">
          <Link
            href="/services"
            className="group inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-primary-400 hover:text-primary-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
          >
            View all services
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        <div className="mt-20 grid max-w-2xl gap-10 lg:max-w-none lg:grid-cols-3 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative flex flex-col"
            >
              <h3 className="text-lg/7 font-semibold tracking-tight text-pretty text-white">
                {feature.name}
              </h3>
              <p className="mt-3 text-base/7 text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
