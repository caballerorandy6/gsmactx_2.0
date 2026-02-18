import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import ContactWithReCaptcha from "@/components/landing/ContactWithReCaptcha";
import ScrollSpyHandler from "@/components/layout/ScrollSpyHandler";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { genPageMetadata } from "@/seo/genPageMetadata";
import { JsonLdForArticle } from "@/components/seo/JsonLdForArticle";
import { JsonLdForBreadcrumb } from "@/components/seo/JsonLdForBreadcrumb";
import { JsonLdForFaq } from "@/components/seo/JsonLdForFaq";
import { JsonLdForLocalBusiness } from "@/components/seo/JsonLdForLocalBusiness";
import FAQ from "@/components/landing/FAQ";
import { faqs, businessInfo } from "@/lib/data";
import Footer from "@/components/layout/Footer";

export const metadata = genPageMetadata({
  title: "GSM A/C General & Contractor Inc, the best HVAC company in Texas",
  description:
    "GSM A/C General & Contractor Inc. offers professional air conditioning installation, air conditioning repair, heating installation, heating repair, air duct sanitizing and attic insulation services in Texas. Trusted HVAC experts delivering efficient, reliable, and affordable climate solutions for homes and businesses.",
  pageRoute: "/",
  ogImg: "/logo.avif",
});

export default function Home() {
  return (
    <main>
      <ScrollSpyHandler />
      <ScrollToTop />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <ContactWithReCaptcha />
      <FAQ faqs={faqs} />
      <Footer />

      {/* JSON-LD Markup */}
      <JsonLdForArticle
        url="https://www.gsmactx.com"
        headline="About Our HVAC Repair & Installation Company"
        description="Explaining the services we offer and our commitment to quality."
        image="/worker.avif"
        datePublished={new Date("2024-01-01").toISOString()}
        dateModified={new Date().toISOString()}
        author={{
          name: "GSM A/C General & Contractor Inc",
          url: "https://www.gsmactx.com",
        }}
      />

      <JsonLdForBreadcrumb
        itemList={[
          {
            name: "Home",
            item: "https://www.gsmactx.com/",
          },
          {
            name: "Services",
            item: "https://www.gsmactx.com/services",
          },
        ]}
      />

      <JsonLdForFaq
        faqs={[
          {
            question: "What HVAC services do you offer?",
            answer:
              "We offer a range of HVAC services including air conditioning installation, air conditioning repair, heating installation, heating repair, air duct sanitizing, and attic insulation.",
          },
          {
            question:
              "Are your services available in Cypress Area And Houston?",
            answer:
              "Yes, we provide our HVAC services throughout Cypress Area and Houston.",
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
        addressCountry={businessInfo.address.country}
        latitude={businessInfo.geo.latitude}
        longitude={businessInfo.geo.longitude}
        url={businessInfo.website}
        image="/logo.avif"
        priceRange={businessInfo.priceRange}
        aggregateRating={{
          ratingValue: businessInfo.reviews.aggregateRating,
          reviewCount: businessInfo.reviews.reviewCount,
        }}
        areaServed={businessInfo.serviceAreas}
        openingHours={businessInfo.openingHours}
      />
    </main>
  );
}
