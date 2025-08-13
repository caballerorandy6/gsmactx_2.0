import CampaignForm from "@/components/admin-components/CampaignForm";
import { getCurrentUser } from "@/libs/getCurrentUser";
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
