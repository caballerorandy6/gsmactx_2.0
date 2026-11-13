import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import LazyContact from "@/components/landing/LazyContact";
import ScrollSpyHandler from "@/components/layout/ScrollSpyHandler";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingCTAButtons from "@/components/ui/FloatingCTAButtons";
import { genPageMetadata } from "@/seo/genPageMetadata";
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
});

export default function Home() {
  return (
    <main>
      <ScrollSpyHandler />
      <ScrollToTop />
      <FloatingCTAButtons />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <LazyContact />
      <FAQ faqs={faqs} />
      <Footer />

      {/* JSON-LD Structured Data */}
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
        sameAs={[
          "https://www.facebook.com/gsmactx/",
          "https://www.google.com/maps/place/G+S+M+A%2FC+%26+General+Contractor+INC./@29.8801535,-95.7088008,15z",
        ]}
      />
    </main>
  );
}
