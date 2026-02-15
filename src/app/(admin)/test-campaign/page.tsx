import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import TestCampaignForm from "@/components/admin/campaigns/TestCampaignForm";

const TestCampaignPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <AdminHeader />
      <TestCampaignForm user={user} />
    </>
  );
};

export default TestCampaignPage;
