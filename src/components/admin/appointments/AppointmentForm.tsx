"use client";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AppointmentBaseSchema, AppointmentFormData, SERVICE_TYPES, APPOINTMENT_STATUSES } from "@/lib/validations/zod";
import { upsertAppointmentAction, getBookedTimeSlotsAction } from "@/app/actions/appointmentAction";
import { ErrorMessage } from "@hookform/error-message";
import { SafeAdmin } from "@/lib/types";
import { Appointment, SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/common/AdminPageHeader";
import { LockClosedIcon } from "@heroicons/react/24/outline";

interface PrefillData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  address: string;
}

interface AppointmentFormProps {
  appointment?: Appointment;
  user: SafeAdmin | null;
  prefillData?: PrefillData;
}

const AppointmentForm = ({ appointment, prefillData }: AppointmentFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const isEditing = !!appointment?.id;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentBaseSchema),
    defaultValues: {
      id: appointment?.id || undefined,
      clientName: appointment?.clientName || prefillData?.clientName || "",
      clientEmail: appointment?.clientEmail || prefillData?.clientEmail || "",
      clientPhone: appointment?.clientPhone || prefillData?.clientPhone || "",
      serviceType: appointment?.serviceType || undefined,
      scheduledDate: appointment?.scheduledDate
        ? new Date(appointment.scheduledDate).toISOString().split("T")[0]
        : "",
      scheduledTime: appointment?.scheduledTime || "",
      address: appointment?.address || prefillData?.address || "",
      notes: appointment?.notes || "",
      status: appointment?.status || "PENDING",
    },
  });

  // 1-hour time slots (8 AM - 6 PM)
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  // Watch the date field to fetch booked time slots
  const selectedDate = watch("scheduledDate");

  // Fetch booked time slots when date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) {
        setBookedTimeSlots([]);
        return;
      }

      setIsLoadingSlots(true);
      try {
        // Exclude current appointment when editing
        const slots = await getBookedTimeSlotsAction(
          selectedDate,
          isEditing ? appointment?.id : undefined
        );
        setBookedTimeSlots(slots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        setBookedTimeSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, isEditing, appointment?.id]);

  // Watch selected time
  const selectedTime = watch("scheduledTime");

  // Check if a slot is booked
  const isSlotBooked = (slot: string): boolean => {
    return bookedTimeSlots.includes(slot);
  };

  // Check if there are any available slots
  const hasAvailableSlots = timeSlots.some(
    (slot) => !isSlotBooked(slot)
  );

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
          isEditing ? "Updating appointment…" : "Creating appointment…"
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

  // Get minimum date (today) - prevents selecting past dates
  const getMinDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        title={isEditing ? "Edit appointment" : "New appointment"}
        back={
          isEditing && appointment?.id
            ? { href: `/appointments/${appointment.id}`, label: "Appointment details" }
            : { href: "/appointments", label: "All appointments" }
        }
      />

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
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
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
                    spellCheck="false"
                    placeholder="john@example.com"
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
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
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
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
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    min={getMinDate()}
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="scheduledDate"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time *
                  </label>
                  {!selectedDate ? (
                    <p className="text-gray-500 text-sm py-3 text-center border border-dashed border-white/10 rounded-lg">
                      Select a date first to see available times
                    </p>
                  ) : isLoadingSlots ? (
                    <div className="flex items-center justify-center py-3 border border-dashed border-white/10 rounded-lg">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
                      <span className="ml-2 text-gray-400 text-sm">Loading…</span>
                    </div>
                  ) : !hasAvailableSlots ? (
                    <p className="text-yellow-400 text-sm py-3 text-center border border-dashed border-yellow-500/30 rounded-lg bg-yellow-500/5">
                      All time slots are booked for this date
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {timeSlots.map((time) => {
                        const isBooked = isSlotBooked(time);
                        const isSelected = selectedTime === time;

                        return (
                          <label
                            key={time}
                            className={`
                              relative flex items-center justify-center p-2.5 rounded-lg border text-xs font-medium transition-all
                              ${isBooked
                                ? "bg-red-500/10 border-red-500/30 text-red-400 cursor-not-allowed"
                                : isSelected
                                  ? "bg-primary-500/20 border-primary-500 text-white ring-2 ring-primary-500"
                                  : "bg-gray-900/50 border-white/10 text-white hover:bg-gray-800 hover:border-white/20 cursor-pointer"
                              }
                            `}
                          >
                            <input
                              {...register("scheduledTime")}
                              type="radio"
                              value={time}
                              disabled={isBooked}
                              className="sr-only"
                            />
                            {isBooked ? (
                              <span className="flex items-center gap-1">
                                <LockClosedIcon className="h-3 w-3" />
                                Reserved
                              </span>
                            ) : (
                              time
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                  <ErrorMessage
                    errors={errors}
                    name="scheduledTime"
                    render={({ message }) => (
                      <p className="text-red-400 text-xs mt-2">{message}</p>
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
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
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
                      className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500 resize-none"
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
              className="px-6 py-2.5 rounded-md text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
            >
              {isPending
                ? isEditing
                  ? "Updating…"
                  : "Creating…"
                : isEditing
                  ? "Update Appointment"
                  : "Create Appointment"}
            </button>
          </div>
        </form>
    </div>
  );
};

export default AppointmentForm;
