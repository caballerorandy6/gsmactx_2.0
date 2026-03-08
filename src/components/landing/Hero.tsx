import { Suspense } from "react";
import HeroClient from "./HeroClient";
import HeroRating, { RatingBadgeSkeleton } from "./HeroRating";

/**
 * Hero Server Component
 * Uses Suspense to stream the rating badge without blocking initial render
 */
export default function Hero() {
  return (
    <HeroClient
      ratingSlot={
        <Suspense fallback={<RatingBadgeSkeleton />}>
          <HeroRating />
        </Suspense>
      }
    />
  );
}
