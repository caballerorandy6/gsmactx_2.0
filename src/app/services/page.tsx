import AirConditioningInstallation from "@/components/services/AirConditioningInstallation";
import AirConditioningRepair from "@/components/services/AirConditioningRepair";
import HeatingInstallation from "@/components/services/HeatingInstallation";
import HeatingRepair from "@/components/services/HeatingRepair";
import AirDuctSanitizing from "@/components/services/AirDuctSanitizing";
import AtticInsullation from "@/components/services/AtticInsullation";
import Footer from "@/components/layout/Footer";
import ServiceMenu from "@/components/services/ServiceMenu";
import FAQ from "@/components/landing/FAQ";
import { genPageMetadata } from "@/seo/genPageMetadata";
import { JsonLdForArticle } from "@/components/seo/JsonLdForArticle";
import { JsonLdForBreadcrumb } from "@/components/seo/JsonLdForBreadcrumb";
import { JsonLdForFaq } from "@/components/seo/JsonLdForFaq";
import { JsonLdForLocalBusiness } from "@/components/seo/JsonLdForLocalBusiness";
import { faqs, businessInfo } from "@/lib/data";
import { servicesIntro } from "@/lib/data";

// Function to generate metadata for the page
export const metadata = genPageMetadata({
  title: "GSM A/C General & Contractor Inc - Services",
  description:
    "Explore our comprehensive HVAC services including air conditioning installation, air conditioning repair, air duct sanitizing, attic insulation, heating installation and heating repair. Your comfort is our priority.",
  pageRoute: "/services",
  ogImg: "/worker6.avif",
});

const AllServicesPage = () => {
  const serviceComponents: React.ComponentType[] = [
    AirConditioningInstallation,
    AirConditioningRepair,
    HeatingInstallation,
    HeatingRepair,
    AirDuctSanitizing,
    AtticInsullation,
  ];

  return (
    <>
      <section
        id="all-services"
        className="min-h-screen py-16 sm:py-24 md:py-32"
        aria-labelledby="services-title"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="pb-16 sm:pb-0">
            <ServiceMenu />
          </div>

          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 md:pb-32">
            <h1
              id="services-title"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-pretty text-white text-center"
            >
              Home Heating Repair and Installation Available to You!
            </h1>

            <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
              {servicesIntro.map((item, index) => (
                <article key={index} className="text-center">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-pretty text-white">
                    {item.name}
                  </h2>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base/7 text-gray-300 max-w-3xl mx-auto">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {serviceComponents.map((Component, index) => (
            <Component key={index} />
          ))}

          <FAQ faqs={faqs} />

          <Footer />
        </div>
      </section>
      {/* // JSON-LD structured data */}
      <JsonLdForArticle
        url="https://www.gsmactx.com/services"
        headline="Home Heating Repair and Installation Available to You!"
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
          {
            name: "Home",
            item: "https://www.gsmactx.com",
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
            question: "How can I schedule a service?",
            answer:
              "You can schedule a service by contacting us through our website or calling our customer service number.",
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
};

export default AllServicesPage;
