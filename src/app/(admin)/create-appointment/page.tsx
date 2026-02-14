import { Metadata } from "next";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import AppointmentForm from "@/components/admin-components/AppointmentForm";

export const metadata: Metadata = {
  title: "Create Appointment - GSM A/C Admin",
  description: "Create a new appointment for GSM A/C & General Contractor Inc",
};

const CreateAppointmentPage = async () => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    notFound();
  }

  return <AppointmentForm user={user} />;
};

export default CreateAppointmentPage;
