import { cookies } from "next/headers";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin-components/AdminHeader";
import TestCampaignForm from "@/components/admin-components/TestCampaignForm";

const TestCampaignPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    redirect("/admin-login");
  }

  return (
    <>
      <AdminHeader />
      <TestCampaignForm user={user} />
    </>
  );
};

export default TestCampaignPage;
