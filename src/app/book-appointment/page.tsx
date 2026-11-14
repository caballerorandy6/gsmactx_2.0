import { getRatingSummary } from "@/app/actions/googlePlacesAction";
import { Metadata } from "next";
import Link from "next/link";
import BookAppointmentForm from "@/components/forms/BookAppointmentForm";
import ReCaptchaProvider from "@/components/forms/ReCaptchaProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingCTAButtons from "@/components/ui/FloatingCTAButtons";
import {
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { JsonLdForLocalBusiness } from "@/components/seo/JsonLdForLocalBusiness";
import { JsonLdForBreadcrumb } from "@/components/seo/JsonLdForBreadcrumb";
import { businessInfo, heroOffer } from "@/lib/data";
import { SERVICE_TYPES } from "@/lib/validations/zod";
import type { ServiceType } from "@/lib/interfaces";
import { defaultOgImage } from "@/seo/genPageMetadata";

export const metadata: Metadata = {
  title: "Book an Appointment - GSM A/C & General Contractor",
  description:
    "Schedule your HVAC service appointment with GSM A/C & General Contractor in Houston, TX. A/C repair, heating services, duct cleaning, and more.",
  keywords: [
    "HVAC appointment",
    "AC repair Houston",
    "heating service Texas",
    "book HVAC service",
    "schedule AC maintenance",
    "Cypress TX HVAC",
  ],
  openGraph: {
    title: "Book an Appointment - GSM A/C & General Contractor",
    description:
      "Schedule your HVAC service appointment online. Fast, reliable service in Houston, TX.",
    type: "website",
    images: [defaultOgImage],
  },
};

type BookAppointmentPageProps = {
  searchParams: Promise<{ service?: string; offer?: string }>;
};

const isServiceType = (value: string | undefined): value is ServiceType =>
  SERVICE_TYPES.some((type) => type === value);

const BookAppointmentPage = async ({ searchParams }: BookAppointmentPageProps) => {
  const { service, offer: offerSlug } = await searchParams;
  const offer = offerSlug === heroOffer.slug ? heroOffer : undefined;
  const { rating, reviewCount } = await getRatingSummary();
  const initialService = offer?.serviceType ?? (isServiceType(service) ? service : undefined);

  return (
    <>
      <Header />
      <ScrollToTop />
      <FloatingCTAButtons />
      <main className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-page mb-4">
            Schedule Your Service
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Book your HVAC service appointment online. Our expert technicians
            are ready to help with A/C repair, heating services, installations,
            and more.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-gray-300">
              <ShieldCheckIcon className="h-5 w-5 text-green-400" />
              <span className="text-sm">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <ClockIcon className="h-5 w-5 text-primary-400" />
              <span className="text-sm">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <PhoneIcon className="h-5 w-5 text-primary-400" />
              <Link
                href="tel:+12812354684"
                className="text-sm hover:text-white transition-colors"
              >
                (281) 235-4684
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <ReCaptchaProvider>
          <BookAppointmentForm initialService={initialService} offer={offer} />
        </ReCaptchaProvider>
      </section>

      {/* Additional Info */}
      <section className="bg-gray-900/50 border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-section text-center mb-8">
            Why Choose GSM A/C?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/20 mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Licensed Experts
              </h3>
              <p className="text-gray-400 text-sm">
                Our technicians are fully licensed and trained to handle all
                HVAC systems.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/20 mb-4">
                <ClockIcon aria-hidden="true" className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Fast Response
              </h3>
              <p className="text-gray-400 text-sm">
                We confirm appointments within 24 hours and offer same-day
                emergency service.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/20 mb-4">
                <PhoneIcon className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Free Estimates
              </h3>
              <p className="text-gray-400 text-sm">
                Get a free estimate for system replacements and major
                installations.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Prefer to speak with someone directly?
            </p>
            <Link
              href="tel:+12812354684"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              <PhoneIcon className="h-5 w-5" />
              Call (281) 235-4684
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <JsonLdForBreadcrumb
        itemList={[
          { name: "Home", item: "https://www.gsmactx.com/" },
          { name: "Book Appointment", item: "https://www.gsmactx.com/book-appointment" },
        ]}
      />

      <JsonLdForLocalBusiness
        name={businessInfo.name}
        description="Schedule your HVAC service appointment with GSM A/C & General Contractor. Professional AC repair, heating services, and installations in Houston, TX."
        telephone={businessInfo.phone}
        streetAddress={businessInfo.address.street}
        addressLocality={businessInfo.address.city}
        addressRegion={businessInfo.address.state}
        postalCode={businessInfo.address.zip}
        addressCountry={businessInfo.address.country}
        latitude={businessInfo.geo.latitude}
        longitude={businessInfo.geo.longitude}
        url={businessInfo.website}
        image="/logo.avif"
        priceRange={businessInfo.priceRange}
        aggregateRating={{
          ratingValue: rating.toFixed(1),
          reviewCount: String(reviewCount),
        }}
        areaServed={businessInfo.serviceAreas}
        openingHours={businessInfo.openingHours}
        sameAs={[
          "https://www.facebook.com/gsmactx/",
          "https://www.google.com/maps/place/G+S+M+A%2FC+%26+General+Contractor+INC./@29.8801535,-95.7088008,15z",
        ]}
      />
    </>
  );
};

export default BookAppointmentPage;
