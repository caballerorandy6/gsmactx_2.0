import CampaignForm from "@/components/admin-components/CampaignForm";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getCampaignByIdAction } from "@/app/actions/campaignAction";

type Params = Promise<{ id: string }>;

const CampaignEditId = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const campaign = await getCampaignByIdAction(id);

  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  return <CampaignForm campaign={campaign} user={user} />;
};

export default CampaignEditId;
