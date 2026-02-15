import { getGooglePlaceDetails } from "@/app/actions/googlePlacesAction";
import HeroClient from "./HeroClient";

/**
 * Hero Server Component
 * Fetches Google Places data and passes it to the client component
 */
export default async function Hero() {
  // Fetch Google Places data on the server
  const googleData = await getGooglePlaceDetails();

  return <HeroClient googleData={googleData} />;
}
