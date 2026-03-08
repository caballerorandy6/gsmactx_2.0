import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAdminsAction } from "@/app/actions/adminAction";
import SettingsPage from "@/components/admin/settings/SettingsPage";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage admin users and account settings",
};

export default async function Settings() {
  const cookieStore = await cookies();
  const [user, admins] = await Promise.all([
    getCurrentUser(cookieStore.get("token")?.value),
    getAdminsAction(),
  ]);

  if (!user) {
    redirect("/login");
  }

  return <SettingsPage currentUser={user} admins={admins} />;
}
