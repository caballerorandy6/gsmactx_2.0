import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { notFound, redirect } from "next/navigation";
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

  // Parallel fetch: user auth + appointment data
  const [user, appointment] = await Promise.all([
    getCurrentUser(cookieStore.get("token")?.value),
    getAppointmentByIdAction(id),
  ]);

  if (!user) {
    redirect("/login");
  }

  if (!appointment) {
    notFound();
  }

  return <AppointmentDetail appointment={appointment} />;
};

export default AppointmentDetailPage;
