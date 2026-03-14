import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AppointmentForm from "@/components/admin/appointments/AppointmentForm";
import { getSubscriberByIdAction } from "@/app/actions/subscriberAction";

export const metadata: Metadata = {
  title: "Create Appointment - GSM A/C Admin",
  description: "Create a new appointment for GSM A/C & General Contractor Inc",
};

interface CreateAppointmentPageProps {
  searchParams: Promise<{ contactId?: string }>;
}

const CreateAppointmentPage = async ({ searchParams }: CreateAppointmentPageProps) => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    redirect("/login");
  }

  const { contactId } = await searchParams;

  // Pre-fill form with contact data if contactId is provided
  let prefillData = undefined;
  if (contactId) {
    const contact = await getSubscriberByIdAction(contactId);
    if (contact) {
      prefillData = {
        clientName: contact.name || "",
        clientEmail: contact.email || "",
        clientPhone: contact.phone || "",
        address: contact.address || "",
      };
    }
  }

  return <AppointmentForm user={user} prefillData={prefillData} />;
};

export default CreateAppointmentPage;
