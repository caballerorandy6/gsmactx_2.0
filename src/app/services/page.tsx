import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import ServiceMenu from "@/components/services/ServiceMenu";
import FAQ from "@/components/landing/FAQ";
import { genPageMetadata } from "@/seo/genPageMetadata";
import { JsonLdForArticle } from "@/components/seo/JsonLdForArticle";
import { JsonLdForBreadcrumb } from "@/components/seo/JsonLdForBreadcrumb";
import { JsonLdForFaq } from "@/components/seo/JsonLdForFaq";
import { JsonLdForLocalBusiness } from "@/components/seo/JsonLdForLocalBusiness";
import { faqs, businessInfo, allServices, services } from "@/lib/data";

export const metadata = genPageMetadata({
  title: "HVAC Services in Cypress & Houston, TX | GSM A/C",
  description:
    "Professional HVAC services: AC installation & repair, heating installation & repair, air duct sanitizing, and attic insulation. Serving Cypress, Houston, and surrounding areas since 2005.",
  pageRoute: "/services",
  ogImg: "/worker6.avif",
});

export default function ServicesOverviewPage() {
  return (
    <>
      <section
        id="services-overview"
        className="min-h-screen py-16 sm:py-24"
        aria-labelledby="services-title"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="pb-16 sm:pb-0">
            <ServiceMenu />
          </div>

          {/* Hero Section */}
          <div className="mx-auto max-w-4xl text-center pb-12 sm:pb-16">
            <h1
              id="services-title"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            >
              Our HVAC Services
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Professional heating and cooling solutions for homes and businesses in Cypress, Houston, and surrounding areas. Licensed, insured, and trusted since 2005.
            </p>
          </div>

          {/* Services Grid */}
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {allServices.map((service, index) => {
                const serviceData = services[index];
                return (
                  <Link
                    key={service.id}
                    href={service.href}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-800/50 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={serviceData?.src || "/service1.avif"}
                        alt={`${service.name} service in Cypress and Houston, TX`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {service.name}
                      </h2>
                      <p className="mt-2 text-sm text-gray-400 flex-1 line-clamp-3">
                        {serviceData?.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300">
                        Learn more
                        <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mx-auto max-w-4xl mt-16 sm:mt-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Choose GSM A/C?
            </h2>
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 rounded-xl bg-gray-800/30 border border-white/5">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-400">19+</div>
                <div className="mt-2 text-sm text-gray-400">Years of Experience</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-800/30 border border-white/5">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-400">5.0</div>
                <div className="mt-2 text-sm text-gray-400">Google Rating</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-800/30 border border-white/5">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-400">199+</div>
                <div className="mt-2 text-sm text-gray-400">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mx-auto max-w-2xl mt-16 sm:mt-24 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-gray-400">
              Contact us today for a free estimate on any HVAC service.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                href={`tel:${businessInfo.phone}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/20"
              >
                Call (281) 235-4684
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 sm:mt-24">
            <FAQ faqs={faqs} />
          </div>

          <Footer />
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <JsonLdForArticle
        url="https://www.gsmactx.com/services"
        headline="Professional HVAC Services in Cypress & Houston, TX"
        description="Professional HVAC solutions including air conditioning installation and repair, heating services, attic insulation, and air duct sanitizing in Texas."
        image="/worker6.avif"
        datePublished={new Date("2024-01-01").toISOString()}
        dateModified={new Date().toISOString()}
        author={{
          name: "GSM A/C General & Contractor Inc",
          url: "https://www.gsmactx.com",
        }}
      />
      <JsonLdForBreadcrumb
        itemList={[
          { name: "Home", item: "https://www.gsmactx.com" },
          { name: "Services", item: "https://www.gsmactx.com/services" },
        ]}
      />
      <JsonLdForFaq
        faqs={[
          {
            question: "What HVAC services do you offer?",
            answer:
              "We offer air conditioning installation and repair, heating installation and repair, air duct sanitizing, and attic insulation services.",
          },
          {
            question: "How can I schedule a service?",
            answer:
              "You can schedule a service by booking online through our website or calling us at (281) 235-4684.",
          },
          {
            question: "Do you provide emergency HVAC services?",
            answer:
              "Yes, we provide emergency HVAC services to ensure your comfort and safety at all times.",
          },
        ]}
      />
      <JsonLdForLocalBusiness
        name={businessInfo.name}
        description={businessInfo.description}
        telephone={businessInfo.phone}
        streetAddress={businessInfo.address.street}
        addressLocality={businessInfo.address.city}
        addressRegion={businessInfo.address.state}
        postalCode={businessInfo.address.zip}
        latitude={businessInfo.geo.latitude}
        longitude={businessInfo.geo.longitude}
        url={businessInfo.website}
        image="/logo.avif"
        priceRange={businessInfo.priceRange}
        areaServed={businessInfo.serviceAreas}
      />
    </>
  );
}
