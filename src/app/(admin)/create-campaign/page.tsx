import { Metadata } from "next";
import CampaignForm from "@/components/admin/campaigns/CampaignForm";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
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
    redirect("/login");
  }

  return <CampaignForm />;
};

export default CampaignCreatePage;
