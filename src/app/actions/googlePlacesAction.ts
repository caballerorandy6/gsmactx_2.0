"use server";

import type {
  GooglePlaceDetailsResponse,
  PlaceRatingData,
} from "@/types/google-places";
import { Review } from "@/lib/interfaces";

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
 * Fetches Google reviews with photos for testimonials
 */
export async function getGoogleReviewsAction(): Promise<Review[]> {
  try {
    const apiKey = process.env.API_KEY;
    const placeId = process.env.PLACE_ID;

    if (!apiKey || !placeId) {
      console.error("Missing API_KEY or PLACE_ID in environment variables");
      return [];
    }

    const fields = "name,rating,reviews,photos";
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 43200 },
    });

    if (!response.ok) {
      console.error("Error fetching google reviews");
      return [];
    }

    const data = await response.json();

    if (!data.result?.reviews) {
      return [];
    }

    const reviewsWithPhotoUrl = data.result.reviews.map((review: Review) => {
      let photoUrl = null;
      if (review.photos && review.photos.length > 0) {
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${review.photos[0].photo_reference}&key=${apiKey}`;
      }
      return {
        ...review,
        photoUrl,
      };
    });

    return reviewsWithPhotoUrl;
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return [];
  }
}
