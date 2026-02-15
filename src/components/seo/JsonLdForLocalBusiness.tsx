interface OpeningHours {
  dayOfWeek: string;
  opens: string;
  closes: string;
}

interface JsonLdForLocalBusinessProps {
  name: string;
  description: string;
  telephone: string;
  email?: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry?: string;
  latitude?: string;
  longitude?: string;
  priceRange?: string;
  image?: string;
  url: string;
  openingHours?: OpeningHours[];
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
  areaServed?: string[];
}

/**
 * Generates the JSON-LD structured data for a Local Business.
 * This is critical for local SEO and helps Google understand your business location,
 * contact info, hours, and service area.
 *
 * @prop {string} name - The business name.
 * @prop {string} description - Business description.
 * @prop {string} telephone - Contact phone number.
 * @prop {string} email - Contact email (optional).
 * @prop {string} streetAddress - Street address.
 * @prop {string} addressLocality - City.
 * @prop {string} addressRegion - State/Region.
 * @prop {string} postalCode - ZIP/Postal code.
 * @prop {string} addressCountry - Country code (default: "US").
 * @prop {string} latitude - Geo latitude (optional).
 * @prop {string} longitude - Geo longitude (optional).
 * @prop {string} priceRange - Price range (e.g., "$$").
 * @prop {string} image - Business logo/image URL.
 * @prop {string} url - Business website URL.
 * @prop {OpeningHours[]} openingHours - Business hours (optional).
 * @prop {Object} aggregateRating - Average rating and review count (optional).
 * @prop {string[]} areaServed - Service area cities/regions (optional).
 *
 * @example
 *  <JsonLdForLocalBusiness
 *    name="GSM A/C General & Contractor Inc"
 *    description="Professional HVAC services in Texas"
 *    telephone="+1-281-235-4684"
 *    streetAddress="123 Main St"
 *    addressLocality="Cypress"
 *    addressRegion="TX"
 *    postalCode="77429"
 *    url="https://www.gsmactx.com"
 *    priceRange="$$"
 *    aggregateRating={{ ratingValue: "5", reviewCount: "100" }}
 *    areaServed={["Cypress", "Houston", "Katy"]}
 *  />
 */
export const JsonLdForLocalBusiness = ({
  name,
  description,
  telephone,
  email,
  streetAddress,
  addressLocality,
  addressRegion,
  postalCode,
  addressCountry = "US",
  latitude,
  longitude,
  priceRange = "$$",
  image = "/logo.avif",
  url,
  openingHours,
  aggregateRating,
  areaServed,
}: JsonLdForLocalBusinessProps) => {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": url,
    name,
    description,
    image,
    telephone,
    url,
    priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
    },
  };

  // Add email if provided
  if (email) {
    jsonLd.email = email;
  }

  // Add geo coordinates if provided
  if (latitude && longitude) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    };
  }

  // Add opening hours if provided
  if (openingHours && openingHours.length > 0) {
    jsonLd.openingHoursSpecification = openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    }));
  }

  // Add aggregate rating if provided
  if (aggregateRating) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    };
  }

  // Add area served if provided
  if (areaServed && areaServed.length > 0) {
    jsonLd.areaServed = areaServed.map((area) => ({
      "@type": "City",
      name: area,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
