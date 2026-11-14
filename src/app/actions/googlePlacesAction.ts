"use server";

import type {
  GooglePlaceDetailsResponse,
  PlaceRatingData,
} from "@/types/google-places";
import { Review } from "@/lib/interfaces";
import { businessInfo } from "@/lib/data";

/**
 * Fetches place details from Google Places API
 * Documentation: https://developers.google.com/maps/documentation/places/web-service/details
 */
export async function getGooglePlaceDetails(): Promise<PlaceRatingData | null> {
  try {
    const apiKey = process.env.API_KEY;
    const placeId = process.env.PLACE_ID;

    if (!apiKey || !placeId) {
      console.error("Missing API_KEY or PLACE_ID in environment variables");
      return null;
    }

    // Fetch place details with rating and reviews
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;

    const response = await fetch(url, {
      // Cache for 12 hours to keep Places API usage (and billing) low
      next: { revalidate: 43200 },
    });

    if (!response.ok) {
      console.error(
        `Google Places API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data: GooglePlaceDetailsResponse = await response.json();

    if (data.status !== "OK") {
      console.error(`Google Places API status: ${data.status}`);
      return null;
    }

    // Return only the data we need
    return {
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      lastFetched: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching Google Place details:", error);
    return null;
  }
}

/**
 * Live Google rating and review count, falling back to the snapshot in
 * businessInfo.reviews when the API is unavailable. Shared by every place
 * that shows or publishes the rating, so page text and JSON-LD always match.
 */
export async function getRatingSummary(): Promise<{
  rating: number;
  reviewCount: number;
}> {
  const googleData = await getGooglePlaceDetails();
  return {
    rating:
      googleData?.rating ?? parseFloat(businessInfo.reviews.aggregateRating),
    reviewCount:
      googleData?.totalReviews ?? parseInt(businessInfo.reviews.reviewCount),
  };
}

/**
 * Fetches the Google reviews shown in the testimonials carousel.
 * Runs on the server so the review text ships in the HTML.
 */
export async function getGoogleReviewsAction(): Promise<Review[]> {
  try {
    const apiKey = process.env.API_KEY;
    const placeId = process.env.PLACE_ID;

    if (!apiKey || !placeId) {
      console.error("Missing API_KEY or PLACE_ID in environment variables");
      return [];
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 43200 },
    });

    if (!response.ok) {
      console.error("Error fetching google reviews");
      return [];
    }

    const data = await response.json();
    const reviews: Review[] = data.result?.reviews ?? [];

    // Keep only what the carousel renders; never pass the API key along
    return reviews.map((review) => ({
      author_name: review.author_name,
      author_url: review.author_url,
      language: review.language,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time,
    }));
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return [];
  }
}
