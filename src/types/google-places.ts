/**
 * Types for Google Places API responses
 * Documentation: https://developers.google.com/maps/documentation/places/web-service/details
 */

export interface GooglePlaceDetailsResponse {
  result: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews?: GooglePlaceReview[];
    formatted_address?: string;
    formatted_phone_number?: string;
    opening_hours?: {
      weekday_text: string[];
      open_now: boolean;
    };
  };
  status: string;
}

export interface GooglePlaceReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface PlaceRatingData {
  rating: number;
  totalReviews: number;
  lastFetched: string;
}
