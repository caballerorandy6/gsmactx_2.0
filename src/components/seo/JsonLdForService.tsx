interface JsonLdForServiceProps {
  serviceName: string;
  serviceType: string;
  description: string;
  providerName: string;
  providerUrl: string;
  telephone: string;
  areaServed: string[];
  image?: string;
  url: string;
}

/**
 * Generates the JSON-LD structured data for a Service offering.
 * Use this for individual HVAC services like AC Repair, Heating Installation, etc.
 *
 * @prop {string} serviceName - The name of the service (e.g., "Air Conditioning Repair").
 * @prop {string} serviceType - The type of service for schema.org.
 * @prop {string} description - Detailed description of the service.
 * @prop {string} providerName - The business name providing the service.
 * @prop {string} providerUrl - The business website URL.
 * @prop {string} telephone - Contact phone number.
 * @prop {string[]} areaServed - Cities/regions where service is available.
 * @prop {string} image - Service image URL (optional).
 * @prop {string} url - Direct URL to this service page.
 *
 * @example
 *  <JsonLdForService
 *    serviceName="Air Conditioning Repair"
 *    serviceType="HVAC Repair"
 *    description="Professional AC repair services in Texas"
 *    providerName="GSM A/C General & Contractor Inc"
 *    providerUrl="https://www.gsmactx.com"
 *    telephone="+1-281-235-4684"
 *    areaServed={["Cypress", "Houston", "Katy"]}
 *    url="https://www.gsmactx.com/services/air-conditioning-repair"
 *  />
 */
export const JsonLdForService = ({
  serviceName,
  serviceType,
  description,
  providerName,
  providerUrl,
  telephone,
  areaServed,
  image,
  url,
}: JsonLdForServiceProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    serviceType,
    description,
    url,
    image: image || "/logo.avif",
    provider: {
      "@type": "HVACBusiness",
      name: providerName,
      url: providerUrl,
      telephone,
    },
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: {
        "@type": "ContactPoint",
        telephone,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
