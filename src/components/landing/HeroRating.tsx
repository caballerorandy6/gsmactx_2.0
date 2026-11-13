import StarRating from "@/components/ui/StarRating";
import { getGooglePlaceDetails } from "@/app/actions/googlePlacesAction";
import { businessInfo } from "@/lib/data";

/**
 * Skeleton fallback for the rating badge
 */
export function RatingBadgeSkeleton() {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20 animate-pulse">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 sm:h-5 sm:w-5 rounded bg-gray-600" />
          ))}
        </div>
        <div className="h-4 w-20 sm:w-24 bg-gray-600 rounded" />
      </div>
    </div>
  );
}

/**
 * Async server component that fetches and renders the rating badge
 * Streams in via Suspense - doesn't block initial render
 */
export default async function HeroRating() {
  const googleData = await getGooglePlaceDetails();

  const rating = googleData?.rating ?? parseFloat(businessInfo.reviews.aggregateRating);
  const reviewCount = googleData?.totalReviews ?? parseInt(businessInfo.reviews.reviewCount);

  return (
    <div className="mb-4 sm:mb-6">
      <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20">
        <StarRating rating={rating} starClassName="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-xs sm:text-sm font-medium text-white">
          {rating.toFixed(1)} · {reviewCount.toLocaleString()} reviews
        </span>
      </div>
    </div>
  );
}
