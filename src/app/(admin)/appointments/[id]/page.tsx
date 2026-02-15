import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getAppointmentByIdAction } from "@/app/actions/appointmentAction";
import AppointmentDetail from "@/components/admin/appointments/AppointmentDetail";

export const metadata: Metadata = {
  title: "Appointment Details - GSM A/C Admin",
  description: "View appointment details for GSM A/C & General Contractor Inc",
};

interface AppointmentDetailPageProps {
  params: Promise<{ id: string }>;
}

const AppointmentDetailPage = async ({ params }: AppointmentDetailPageProps) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    notFound();
  }

  const appointment = await getAppointmentByIdAction(id);

  if (!appointment) {
    notFound();
  }

  return <AppointmentDetail appointment={appointment} />;
};

export default AppointmentDetailPage;
