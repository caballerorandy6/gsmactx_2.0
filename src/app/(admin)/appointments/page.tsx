import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getAppointmentsListAction } from "@/app/actions/appointmentAction";
import AppointmentsList from "@/components/admin/appointments/AppointmentsList";

export const metadata: Metadata = {
  title: "Appointments - GSM A/C Admin",
  description: "Manage appointments for GSM A/C & General Contractor Inc",
};

const AppointmentsPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    notFound();
  }

  const appointments = await getAppointmentsListAction();

  return (
    <AppointmentsList appointments={appointments} userName={user.name} />
  );
};

export default AppointmentsPage;
