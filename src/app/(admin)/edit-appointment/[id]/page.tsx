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
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    redirect("/login");
  }

  const appointment = await getAppointmentByIdAction(id);

  if (!appointment) {
    notFound();
  }

  return <AppointmentForm appointment={appointment} user={user} />;
};

export default EditAppointmentPage;
