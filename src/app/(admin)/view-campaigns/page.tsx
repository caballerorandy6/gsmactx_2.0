import { Metadata } from "next";
import AdminCampaignList from "@/components/admin-components/CampaignList";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "GSM A/C General & Contractor Inc - Campaign List",
  description: "View and manage campaigns for GSM A/C General & Contractor Inc",
};

const CampaignListPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    notFound();
  }

  return <AdminCampaignList user={user} />;
};

export default CampaignListPage;
