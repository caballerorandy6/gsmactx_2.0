"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { PublicAppointmentSchema, PublicAppointmentFormData, SERVICE_TYPES } from "@/lib/validations/zod";
import { SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import { createPublicAppointmentAction } from "@/app/actions/createPublicAppointmentAction";
import { getBookedTimeSlotsPublicAction } from "@/app/actions/getBookedTimeSlotsPublicAction";
import { getBusinessToday, isSlotInPast as isBusinessSlotInPast } from "@/lib/utils/bookingTime";
import { ErrorMessage } from "@hookform/error-message";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

// 1-hour time slots (8 AM - 6 PM)
const ALL_TIME_SLOTS = [
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

const BookAppointmentForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PublicAppointmentFormData>({
    resolver: zodResolver(PublicAppointmentSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceType: undefined,
      scheduledDate: "",
      scheduledTime: "",
      address: "",
      notes: "",
    },
  });

  const selectedDate = watch("scheduledDate");
  const selectedTime = watch("scheduledTime");

  // Fetch booked slots when date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) {
        setBookedTimeSlots([]);
        return;
      }

      setIsLoadingSlots(true);
      try {
        const slots = await getBookedTimeSlotsPublicAction(selectedDate);
        setBookedTimeSlots(slots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        setBookedTimeSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  // Same-day slots within the next hour (Houston time) can't be booked
  const isSlotInPast = (slot: string): boolean =>
    isBusinessSlotInPast(slot, selectedDate);

  // Check if a slot is booked
  const isSlotBooked = (slot: string): boolean => {
    return bookedTimeSlots.includes(slot);
  };

  // Check if there are any available slots
  const hasAvailableSlots = ALL_TIME_SLOTS.some(
    (slot) => !isSlotBooked(slot) && !isSlotInPast(slot)
  );

  const onSubmit = async (data: PublicAppointmentFormData) => {
    startTransition(async () => {
      try {
        if (!executeRecaptcha) {
          toast.error("reCAPTCHA not loaded. Please try again.");
          return;
        }

        const recaptchaToken = await executeRecaptcha("book_appointment");

        toast.loading("Scheduling your appointment…");
        const result = await createPublicAppointmentAction(data, recaptchaToken);
        toast.dismiss();

        if (result.success) {
          toast.success(result.message);
          setIsSuccess(true);
          reset();
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.dismiss();
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  // Minimum date is today in Houston, not UTC
  const getMinDate = () => getBusinessToday();

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
          <CheckCircleIcon className="h-10 w-10 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Appointment Scheduled!
        </h2>
        <p className="text-gray-300 mb-8">
          Thank you for scheduling an appointment with GSM A/C & General
          Contractor. We&apos;ve sent a confirmation email to your inbox with all the
          details. Our team will contact you shortly to confirm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsSuccess(false)}
            className="px-6 py-3 rounded-md text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Schedule Another
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-md text-sm font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-gray-800/50 rounded-xl border border-white/10 p-6 sm:p-8"
    >
      <div className="space-y-8">
        {/* Service Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <WrenchScrewdriverIcon className="h-5 w-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">
              Select Your Service
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICE_TYPES.map((type) => (
              <label
                key={type}
                className="relative flex items-center p-4 cursor-pointer rounded-lg border border-white/10 bg-gray-900/50 hover:bg-gray-900 transition-colors has-checked:border-primary-500 has-checked:bg-primary-500/10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-400"
              >
                <input
                  {...register("serviceType")}
                  type="radio"
                  value={type}
                  className="sr-only"
                />
                <span className="text-sm text-white">
                  {SERVICE_TYPE_LABELS[type]}
                </span>
              </label>
            ))}
          </div>
          <ErrorMessage
            errors={errors}
            name="serviceType"
            render={({ message }) => (
              <p className="text-red-400 text-sm mt-2">{message}</p>
            )}
          />
        </div>

        {/* Date & Time */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CalendarDaysIcon className="h-5 w-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">
              Choose Date & Time
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="scheduledDate"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                <CalendarDaysIcon className="h-4 w-4 inline mr-1" />
                Preferred Date *
              </label>
              <input
                {...register("scheduledDate")}
                id="scheduledDate"
                type="date"
                min={getMinDate()}
                className="w-full rounded-md bg-gray-900 border-white/10 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
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
                <ClockIcon className="h-4 w-4 inline mr-1" />
                Preferred Time *
              </label>
              {!selectedDate ? (
                <p className="text-gray-500 text-sm py-4 text-center border border-dashed border-white/10 rounded-lg">
                  Select a date first to see available times
                </p>
              ) : isLoadingSlots ? (
                <div className="flex items-center justify-center py-4 border border-dashed border-white/10 rounded-lg">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
                  <span className="ml-2 text-gray-400 text-sm">Loading available times…</span>
                </div>
              ) : !hasAvailableSlots ? (
                <p className="text-yellow-400 text-sm py-4 text-center border border-dashed border-yellow-500/30 rounded-lg bg-yellow-500/5">
                  No available time slots for this date. Please select a different date.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {ALL_TIME_SLOTS.map((time) => {
                    const isBooked = isSlotBooked(time);
                    const isPast = isSlotInPast(time);
                    const isUnavailable = isBooked || isPast;
                    const isSelected = selectedTime === time;

                    return (
                      <label
                        key={time}
                        className={`
                          relative flex items-center justify-center p-3 rounded-lg border text-sm font-medium transition-all has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-400
                          ${isUnavailable
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
                          disabled={isUnavailable}
                          className="sr-only"
                        />
                        {isBooked ? (
                          <span className="flex items-center gap-1">
                            <LockClosedIcon className="h-3.5 w-3.5" />
                            Reserved
                          </span>
                        ) : isPast ? (
                          <span className="text-gray-500">Passed</span>
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
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="h-5 w-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">
              Your Information
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="clientName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                <UserIcon className="h-4 w-4 inline mr-1" />
                Full Name *
              </label>
              <input
                {...register("clientName")}
                id="clientName"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                className="w-full rounded-md bg-gray-900 border-white/10 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
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
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                <EnvelopeIcon className="h-4 w-4 inline mr-1" />
                Email *
              </label>
              <input
                {...register("clientEmail")}
                id="clientEmail"
                type="email"
                autoComplete="email"
                spellCheck="false"
                placeholder="john@example.com"
                className="w-full rounded-md bg-gray-900 border-white/10 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
              />
              <ErrorMessage
                errors={errors}
                name="clientEmail"
                render={({ message }) => (
                  <p className="text-red-400 text-xs mt-1">{message}</p>
                )}
              />
            </div>

            <div>
              <label
                htmlFor="clientPhone"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                <PhoneIcon className="h-4 w-4 inline mr-1" />
                Phone *
              </label>
              <input
                {...register("clientPhone")}
                id="clientPhone"
                type="tel"
                autoComplete="tel"
                placeholder="(281) 555-0123"
                className="w-full rounded-md bg-gray-900 border-white/10 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
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

        {/* Address */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPinIcon className="h-5 w-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">
              Service Location
            </h3>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Address *
            </label>
            <input
              {...register("address")}
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="123 Main St, Cypress, TX 77433"
              className="w-full rounded-md bg-gray-900 border-white/10 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
            />
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => (
                <p className="text-red-400 text-xs mt-1">{message}</p>
              )}
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Additional Notes{" "}
              <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <textarea
              {...register("notes")}
              id="notes"
              rows={3}
              placeholder="Any details about the issue or special instructions..."
              className="w-full rounded-md bg-gray-900 border-white/10 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* reCAPTCHA Notice */}
      <p className="mt-6 text-xs text-gray-400">
        This site is protected by reCAPTCHA and the Google{" "}
        <Link
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 underline"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 underline"
        >
          Terms of Service
        </Link>{" "}
        apply.
      </p>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 rounded-md text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
        >
          {isPending ? "Scheduling…" : "Schedule Appointment"}
        </button>
        <p className="mt-3 text-center text-sm text-gray-400">
          We&apos;ll contact you to confirm your appointment within 24 hours.
        </p>
      </div>
    </form>
  );
};

export default BookAppointmentForm;
