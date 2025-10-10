"use server";

import type {
  GooglePlaceDetailsResponse,
  PlaceRatingData,
} from "@/types/google-places";

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
      // Cache for 1 hour to avoid hitting API limits
      next: { revalidate: 3600 },
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
