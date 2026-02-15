import CampaignForm from "@/components/admin/campaigns/CampaignForm";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { cookies } from "next/headers";

const EditCampaignPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  return (
    <>
      <CampaignForm user={user} />
    </>
  );
};

export default EditCampaignPage;
