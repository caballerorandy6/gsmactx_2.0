// src/app/(admin)/admin-dashboard/page.tsx
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { cookies } from "next/headers";
import { getCampaignsListAction } from "@/app/actions/campaignAction";
import { getDashboardStatsAction } from "@/app/actions/getDashboardStatsAction";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const campaigns = await getCampaignsListAction();
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  const dashboardStats = await getDashboardStatsAction();

  if (!user) {
    redirect("/login");
  }

  return (
    <AdminDashboard
      user={user}
      campaigns={campaigns}
      dashboardStats={dashboardStats}
    />
  );
}
