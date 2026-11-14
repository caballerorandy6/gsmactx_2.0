import { getGoogleReviewsAction } from "@/app/actions/googlePlacesAction";
import TestimonialsCarousel from "./TestimonialsCarousel";

/**
 * Server Component: fetches Google reviews (cached 12h) so their text
 * is in the HTML that search engines read.
 */
export default async function GoogleReviews() {
  const reviews = await getGoogleReviewsAction();
  if (reviews.length === 0) return null;
  return <TestimonialsCarousel reviews={reviews} />;
}

export function GoogleReviewsSkeleton() {
  return (
    <div className="py-12" role="status">
      <span className="sr-only">Loading reviews</span>
      <div className="flex gap-4" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-67 flex-1 rounded-2xl border border-white/10 bg-gray-800/60 ${
              i > 0 ? "hidden md:block" : ""
            } ${i > 1 ? "md:hidden lg:block" : ""} ${i > 2 ? "lg:hidden xl:block" : ""}`}
          />
        ))}
      </div>
      {/* Same height as the carousel dots row, so nothing shifts on swap */}
      <div className="mt-8 h-2" aria-hidden="true" />
    </div>
  );
}
