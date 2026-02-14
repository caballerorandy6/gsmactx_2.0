import { Metadata } from "next";
import Link from "next/link";
import BookAppointmentForm from "@/components/BookAppointmentForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import {
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

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
  },
};

const BookAppointmentPage = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
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
              <ClockIcon className="h-5 w-5 text-blue-400" />
              <span className="text-sm">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <PhoneIcon className="h-5 w-5 text-indigo-400" />
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
        <BookAppointmentForm />
      </section>

      {/* Additional Info */}
      <section className="bg-gray-900/50 border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Why Choose GSM A/C?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-indigo-400" />
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-4">
                <ClockIcon className="h-6 w-6 text-green-400" />
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 mb-4">
                <PhoneIcon className="h-6 w-6 text-blue-400" />
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
    </>
  );
};

export default BookAppointmentPage;
