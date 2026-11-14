import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAppointmentsListAction } from "@/app/actions/appointmentAction";
import AppointmentsList from "@/components/admin/appointments/AppointmentsList";

export const metadata: Metadata = {
  title: "Appointments - GSM A/C Admin",
  description: "Manage appointments for GSM A/C & General Contractor Inc",
};

const AppointmentsPage = async () => {
  const cookieStore = await cookies();

  // Parallel fetch: user auth + appointments data
  const [user, appointments] = await Promise.all([
    getCurrentUser(cookieStore.get("token")?.value),
    getAppointmentsListAction(),
  ]);

  if (!user) {
    redirect("/login");
  }

  return (
    <AppointmentsList appointments={appointments} />
  );
};

export default AppointmentsPage;
