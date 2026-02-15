import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AppointmentForm from "@/components/admin/appointments/AppointmentForm";

export const metadata: Metadata = {
  title: "Create Appointment - GSM A/C Admin",
  description: "Create a new appointment for GSM A/C & General Contractor Inc",
};

const CreateAppointmentPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    redirect("/login");
  }

  return <AppointmentForm user={user} />;
};

export default CreateAppointmentPage;
