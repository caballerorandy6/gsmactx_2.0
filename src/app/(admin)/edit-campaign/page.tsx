import { redirect } from "next/navigation";

/**
 * /edit-campaign without an id has nothing to edit; it used to render an
 * empty, unauthenticated copy of the create form. Editing lives at
 * /edit-campaign/[id]; new campaigns at /create-campaign (which checks auth).
 */
export default function EditCampaignPage() {
  redirect("/create-campaign");
}
