interface JsonLdForServiceListProps {
  url: string;
  name: string;
  services: { name: string; url: string }[];
}

/**
 * ItemList of the services linked from an overview page, so search engines
 * and AI assistants can read the full catalogue in one place.
 */
export const JsonLdForServiceList = ({
  url,
  name,
  services,
}: JsonLdForServiceListProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#services`,
    name,
    url,
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: service.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
