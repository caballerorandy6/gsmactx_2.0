interface JsonLdForBreadcrumbProps {
  itemList: {
    name: string;
    item: string;
  }[];
}

/**
 * Generates the JSON-LD structured data for a breadcrumb navigation list.
 *
 * @prop {Array<Object>} itemList - The list of breadcrumb items.
 * @prop {string} itemList[].name - The name of the breadcrumb item.
 * @prop {string} itemList[].item - The URL of the breadcrumb item.
 *
 * @example
 *  <JsonLdForBreadcrumb
 *    itemList={[
 *      { name: "useArray", item: "https://novajs.dev/react-hook-array" },
 *      { name: "useAsync", item: "https://novajs.dev/react-hook-async" },
 *    ]}
 *  />
 */
export const JsonLdForBreadcrumb = ({ itemList }: JsonLdForBreadcrumbProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemList.map((itemList, key) => {
      return {
        "@type": "ListItem",
        position: key + 1,
        ...itemList,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
