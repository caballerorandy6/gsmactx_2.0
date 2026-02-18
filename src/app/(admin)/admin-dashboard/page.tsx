// src/app/(admin)/admin-dashboard/page.tsx
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { cookies } from "next/headers";
import { getCampaignsListAction } from "@/app/actions/campaignAction";
import { getDashboardStatsAction } from "@/app/actions/getDashboardStatsAction";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  // Get cookies first (needed for auth), then fetch data in parallel
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Parallel fetch: user, campaigns, and dashboardStats are independent
  const [user, campaigns, dashboardStats] = await Promise.all([
    getCurrentUser(token),
    getCampaignsListAction(),
    getDashboardStatsAction(),
  ]);

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
