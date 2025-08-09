import { Metadata } from "next";
import AdminCampaignForm from "@/components/admin-components/AdminCampaignForm";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "GSM A/C General & Contractor Inc - Campaign Form",
  description:
    "Create and manage campaigns for GSM A/C General & Contractor Inc",
};

const CampaignFormPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    notFound();
  }

  return <AdminCampaignForm user={user} />;
};

export default CampaignFormPage;
