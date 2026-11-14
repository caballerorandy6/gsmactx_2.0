import { StarIcon } from "@heroicons/react/24/solid";
import { getStarFills } from "@/lib/utils/utils";

interface StarRatingProps {
  rating: number;
  /** Tailwind size classes for each star */
  starClassName?: string;
}

/**
 * Star rating with fractional fill (4.9 -> four full stars + 90% of the fifth).
 * Server-compatible: no hooks or client APIs.
 */
export default function StarRating({
  rating,
  starClassName = "h-4 w-4",
}: StarRatingProps) {
  return (
    <div
      className="flex"
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {getStarFills(rating).map((fill, i) => (
        <span key={i} className={`relative inline-block ${starClassName}`}>
          <StarIcon
            className="absolute inset-0 h-full w-full text-gray-500"
            aria-hidden="true"
          />
          <span
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${Math.round(fill * 100)}%` }}
          >
            <StarIcon
              className={`h-full text-yellow-400 ${starClassName}`}
              aria-hidden="true"
            />
          </span>
        </span>
      ))}
    </div>
  );
}
