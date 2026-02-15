interface JsonLdForArticleProps {
  url: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url: string;
  };
}

/**
 * Generates the JSON-LD structured data for an article page.
 *
 * @prop {string} url - The URL of the page.
 * @prop {string} headline - The headline of the article.
 * @prop {string} description - The description of the article.
 * @prop {string} image - The image associated with the article.
 * @prop {string} datePublished - The publication date of the article.
 * @prop {string} dateModified - The last modification date of the article.
 * @prop {Object} author - The author information of the article.
 * @prop {string} author.name - The name of the author of the article.
 * @prop {string} author.url - The URL of the author of the article.
 *
 * @example
 *  <JsonLdForArticle
 *    url="https://novajs.dev/getting-started"
 *    headline="Getting started with Nova.js"
 *    description="Learn how to add dependency-free React hooks to your project in 3 easy steps."
 *    image="https://novajs.dev/getting-started.png"
 *    datePublished="2024-01-06"
 *    dateModified="2025-01-06"
 *    author={{ name: "Daniel Castillo", url: "https://dlcastillop.com" }}
 *  />
 */
export const JsonLdForArticle = ({
  url,
  headline,
  description,
  image,
  author,
  datePublished,
  dateModified,
}: JsonLdForArticleProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline,
    description,
    image,
    author: {
      "@type": "Person",
      ...author,
    },
    datePublished,
    dateModified,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
