import { notFound } from "next/navigation";
import { getRatingSummary } from "@/app/actions/googlePlacesAction";
import { Metadata } from "next";
import {
  allServices,
  businessInfo,
  businessSameAs,
  commonServiceFaqs,
  serviceFaqs,
  services,
} from "@/lib/data";
import { defaultOgImage } from "@/seo/genPageMetadata";

// Importing all service components
import AirConditioningInstallation from "@/components/services/AirConditioningInstallation";
import AirConditioningRepair from "@/components/services/AirConditioningRepair";
import AirDuctSanitizing from "@/components/services/AirDuctSanitizing";
import AtticInsullation from "@/components/services/AtticInsullation";
import HeatingInstallation from "@/components/services/HeatingInstallation";
import HeatingRepair from "@/components/services/HeatingRepair";
import { JsonLdForBreadcrumb } from "@/components/seo/JsonLdForBreadcrumb";
import { JsonLdForFaq } from "@/components/seo/JsonLdForFaq";
import { JsonLdForService } from "@/components/seo/JsonLdForService";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/landing/FAQ";

// Map service IDs to their images
const serviceImages: Record<string, string> = {
  "air-conditioning-installation": "/service1.avif",
  "air-conditioning-repair": "/service2.avif",
  "heating-installation": "/service3.avif",
  "heating-repair": "/service4.avif",
  "air-duct-sanitizing": "/service5.avif",
  "attic-insulation": "/service6.avif",
};

// Mapping service IDs to their respective components
const componentMap: Record<string, React.ComponentType> = {
  "air-conditioning-installation": AirConditioningInstallation,
  "air-conditioning-repair": AirConditioningRepair,
  "air-duct-sanitizing": AirDuctSanitizing,
  "attic-insulation": AtticInsullation,
  "heating-installation": HeatingInstallation,
  "heating-repair": HeatingRepair,
};

type Props = {
  params: Promise<{ id: string }>;
};

// Function to generate static parameters for all services
export async function generateStaticParams() {
  return allServices.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = allServices.find((s) => s.id === resolvedParams.id);
  if (!service) return {};

  const { name, id } = service;
  const pageUrl = `https://www.gsmactx.com/services/${id}`;

  // Find service description from services array
  const serviceData = services.find((s) => s.href === `/services/${id}`);
  const description =
    serviceData?.metaDescription ??
    `Professional ${name} services in Cypress, Katy and Houston, TX. Licensed HVAC contractor. Call (281) 235-4684 for same-day service.`;

  return {
    title: `${name} in Cypress & Houston TX | GSM A/C`,
    description,
    keywords: [
      `${name.toLowerCase()} Cypress TX`,
      `${name.toLowerCase()} Houston`,
      "HVAC services Texas",
      "licensed HVAC contractor",
      "same-day HVAC service",
    ],
    alternates: {
      canonical: `/services/${id}`,
    },
    openGraph: {
      title: `${name} - Professional HVAC Service | GSM A/C`,
      description,
      url: pageUrl,
      siteName: "GSM A/C General & Contractor Inc",
      type: "website",
      locale: "en_US",
      images: [
        {
          ...defaultOgImage,
          alt: `${name} - Professional HVAC Service in Cypress and Houston, TX`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | GSM A/C`,
      description,
      images: [defaultOgImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const service = allServices.find((s) => s.id === id);

  if (!service) {
    notFound();
    return null;
  }

  const serviceData = services.find((s) => s.href === `/services/${id}`);
  const { rating } = await getRatingSummary();
  const faqs = [...(serviceFaqs[service.id] ?? []), ...commonServiceFaqs];

  const ServiceComponent = componentMap[service.id];
  const serviceImage = serviceImages[service.id] || "/service1.avif";
  if (!ServiceComponent) notFound();

  return (
    <main>
      <ServiceComponent />
      <FAQ faqs={faqs} />
      <Footer />

      {/* JSON-LD Structured Data */}
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
          {
            name: service.name,
            item: `https://www.gsmactx.com/services/${service.id}`,
          },
        ]}
      />

      <JsonLdForFaq faqs={faqs} />

      <JsonLdForService
        serviceName={service.name}
        serviceType="HVAC Service"
        description={`${(serviceData?.metaDescription ?? `${service.name} in Cypress, Katy and Houston, TX.`).replace(/ Call .*$/, "")} Licensed and insured, same-day service, rated ${rating.toFixed(1)} on Google, serving the area since ${businessInfo.established}.`}
        providerName={businessInfo.name}
        providerUrl={businessInfo.website}
        providerSameAs={businessSameAs}
        telephone={businessInfo.phone}
        areaServed={businessInfo.serviceAreas}
        image={`https://www.gsmactx.com${serviceImage}`}
        url={`https://www.gsmactx.com/services/${service.id}`}
      />
    </main>
  );
}
