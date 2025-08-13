import { Metadata } from "next";
import CampaignForm from "@/components/admin-components/CampaignForm";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "GSM A/C General & Contractor Inc - Campaign Form",
  description:
    "Create and manage campaigns for GSM A/C General & Contractor Inc",
};

const CampaignCreatePage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    notFound();
  }

  return <CampaignForm user={user} />;
};

export default CampaignCreatePage;
