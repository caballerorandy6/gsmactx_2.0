import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import CampaignForm from "@/components/admin/campaigns/CampaignForm";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getCampaignByIdAction } from "@/app/actions/campaignAction";

export const metadata: Metadata = {
  title: "Edit Campaign - GSM A/C Admin",
  description: "Edit email campaign for GSM A/C & General Contractor Inc",
};

type Params = Promise<{ id: string }>;

const CampaignEditPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const cookieStore = await cookies();

  // Parallel fetch: campaign data + user auth
  const [campaign, user] = await Promise.all([
    getCampaignByIdAction(id),
    getCurrentUser(cookieStore.get("token")?.value),
  ]);

  if (!user) {
    redirect("/login");
  }

  if (!campaign) {
    notFound();
  }

  return <CampaignForm campaign={campaign} />;
};

export default CampaignEditPage;
