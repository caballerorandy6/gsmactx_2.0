import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAppointmentByIdAction } from "@/app/actions/appointmentAction";
import AppointmentForm from "@/components/admin/appointments/AppointmentForm";

export const metadata: Metadata = {
  title: "Edit Appointment - GSM A/C Admin",
  description: "Edit appointment for GSM A/C & General Contractor Inc",
};

interface EditAppointmentPageProps {
  params: Promise<{ id: string }>;
}

const EditAppointmentPage = async ({ params }: EditAppointmentPageProps) => {
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

  return <AppointmentForm appointment={appointment} user={user} />;
};

export default EditAppointmentPage;
