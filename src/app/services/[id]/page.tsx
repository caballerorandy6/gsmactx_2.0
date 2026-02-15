import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allServices, businessInfo } from "@/lib/data";

// Importing all service components
import AirConditioningInstallation from "@/components/services/AirConditioningInstallation";
import AirConditioningRepair from "@/components/services/AirConditioningRepair";
import AirDuctSanitizing from "@/components/services/AirDuctSanitizing";
import AtticInsullation from "@/components/services/AtticInsullation";
import HeatingInstallation from "@/components/services/HeatingInstallation";
import HeatingRepair from "@/components/services/HeatingRepair";
import { JsonLdForArticle } from "@/components/seo/JsonLdForArticle";
import { JsonLdForBreadcrumb } from "@/components/seo/JsonLdForBreadcrumb";
import { JsonLdForFaq } from "@/components/seo/JsonLdForFaq";
import { JsonLdForService } from "@/components/seo/JsonLdForService";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/landing/FAQ";

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

  const { name } = service;

  return {
    title: `${name} - GSM A/C General & Contractor Inc`,
    description: `Learn more about our ${name} services at GSM AC. We provide top-notch solutions for all your HVAC needs.`,
    openGraph: {
      title: `${name} - GSM A/C General & Contractor Inc`,
      description: `Learn more about our ${name} services at GSM A/C General & Contractor Inc.`,
      images: [
        {
          url: `/service1.avif`,
          width: 1200,
          height: 630,
          alt: `${name} - Professional HVAC Service`,
        },
      ],
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

  const faqs = [
    {
      question: `What is ${service.name}?`,
      answer: `Learn more about our ${service.name} services at GSM A/C General & Contractor Inc.`,
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
  ];

  const ServiceComponent = componentMap[service.id];
  if (!ServiceComponent) notFound();
  return (
    <main className="p-8">
      <ServiceComponent />
      <FAQ faqs={faqs} />
      <Footer />
      <JsonLdForArticle
        url={`https://www.gsmactx.com/services/${service.id}`}
        headline={`About Our ${service.name} Services`}
        description={`Learn more about our ${service.name} services at GSM A/C General & Contractor Inc.`}
        image={`/logo.avif`}
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
          {
            name: service.name,
            item: `https://www.gsmactx.com/services/${service.id}`,
          },
        ]}
      />

      <JsonLdForFaq
        faqs={[
          {
            question: `What is ${service.name}?`,
            answer: `Learn more about our ${service.name} services at GSM A/C General & Contractor Inc.`,
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

      <JsonLdForService
        serviceName={service.name}
        serviceType="HVAC Service"
        description={`Professional ${service.name} services in Texas. Licensed and insured HVAC contractors providing quality service.`}
        providerName={businessInfo.name}
        providerUrl={businessInfo.website}
        telephone={businessInfo.phone}
        areaServed={businessInfo.serviceAreas}
        url={`https://www.gsmactx.com/services/${service.id}`}
      />
    </main>
  );
}
