"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AppointmentSchema, AppointmentFormData, SERVICE_TYPES, APPOINTMENT_STATUSES } from "@/lib/validations/zod";
import { upsertAppointmentAction } from "@/app/actions/appointmentAction";
import { ErrorMessage } from "@hookform/error-message";
import { SafeAdmin } from "@/lib/types";
import { Appointment, SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

interface AppointmentFormProps {
  appointment?: Appointment;
  user: SafeAdmin | null;
}

const AppointmentForm = ({ appointment, user }: AppointmentFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEditing = !!appointment?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      id: appointment?.id || undefined,
      clientName: appointment?.clientName || "",
      clientEmail: appointment?.clientEmail || "",
      clientPhone: appointment?.clientPhone || "",
      serviceType: appointment?.serviceType || undefined,
      scheduledDate: appointment?.scheduledDate
        ? new Date(appointment.scheduledDate).toISOString().split("T")[0]
        : "",
      scheduledTime: appointment?.scheduledTime || "",
      address: appointment?.address || "",
      notes: appointment?.notes || "",
      status: appointment?.status || "PENDING",
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    const formData = new FormData();

    if (isEditing && appointment?.id) {
      formData.append("id", appointment.id);
    }

    formData.append("clientName", data.clientName);
    formData.append("clientEmail", data.clientEmail);
    formData.append("clientPhone", data.clientPhone);
    formData.append("serviceType", data.serviceType);
    formData.append("scheduledDate", data.scheduledDate);
    formData.append("scheduledTime", data.scheduledTime);
    formData.append("address", data.address);
    formData.append("notes", data.notes || "");
    formData.append("status", data.status || "PENDING");

    startTransition(async () => {
      try {
        toast.loading(
          isEditing ? "Updating appointment..." : "Creating appointment..."
        );
        const result = await upsertAppointmentAction(formData);

        toast.dismiss();
        if (result.success) {
          toast.success(result.message);

          if (!isEditing) {
            reset();
          }
          router.push("/appointments");
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.dismiss();
        toast.error("An unexpected error occurred.");
      }
    });
  };

  const timeSlots = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  return (
    <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 mt-10 min-h-screen">
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          {isEditing ? "Edit Appointment" : "Create Appointment"}
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Welcome, {user?.name}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-800/50 rounded-xl border border-white/10 p-6 sm:p-8"
        >
          <div className="space-y-6">
            {/* Client Information Section */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
                Client Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="clientName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Client Name *
                  </label>
                  <input
                    {...register("clientName")}
                    id="clientName"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="clientName"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="clientEmail"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    {...register("clientEmail")}
                    id="clientEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="clientEmail"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="clientPhone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    {...register("clientPhone")}
                    id="clientPhone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(281) 555-0123"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="clientPhone"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Service Details Section */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">
                Service Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Service Type *
                  </label>
                  <select
                    {...register("serviceType")}
                    id="serviceType"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select a service...</option>
                    {SERVICE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {SERVICE_TYPE_LABELS[type]}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="serviceType"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="scheduledDate"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Date *
                  </label>
                  <input
                    {...register("scheduledDate")}
                    id="scheduledDate"
                    type="date"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="scheduledDate"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="scheduledTime"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Time *
                  </label>
                  <select
                    {...register("scheduledTime")}
                    id="scheduledTime"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select a time...</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="scheduledTime"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Service Address *
                  </label>
                  <input
                    {...register("address")}
                    id="address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="123 Main St, Cypress, TX 77433"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="address"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                {isEditing && (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Status
                    </label>
                    <select
                      {...register("status")}
                      id="status"
                      className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {APPOINTMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Notes{" "}
                    <span className="text-gray-500 text-xs">(optional)</span>
                  </label>
                  <textarea
                    {...register("notes")}
                    id="notes"
                    rows={3}
                    placeholder="Any additional information about the appointment..."
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 rounded-md text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isPending
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Appointment"
                  : "Create Appointment"}
            </button>
          </div>
        </form>
        </div>
      </main>
    </section>
  );
};

export default AppointmentForm;
