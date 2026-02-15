import { Metadata } from "next";
import AdminCampaignList from "@/components/admin/campaigns/CampaignList";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "GSM A/C General & Contractor Inc - Campaign List",
  description: "View and manage campaigns for GSM A/C General & Contractor Inc",
};

const CampaignListPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    redirect("/login");
  }

  return <AdminCampaignList user={user} />;
};

export default CampaignListPage;
