interface JsonLdForFaqProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

/**
 * Generates the JSON-LD structured data for a FAQ page.
 *
 * @prop {Array<Object>} faqs - The list of FAQ entries.
 * @prop {string} faqs[].question - The question being answered.
 * @prop {string} faqs[].answer - The corresponding answer to the question.
 *
 * @example
 *  <JsonLdForFaq
 *    faqs={[
 *      { question: "What is Nova.js?", answer: "Nova.js is a library of dependency-free React hooks." },
 *      { question: "Is Nova.js free?", answer: "Yes, it's completely free and open-source." }
 *    ]}
 *  />
 */
export const JsonLdForFaq = ({ faqs }: JsonLdForFaqProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => {
      return {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
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
