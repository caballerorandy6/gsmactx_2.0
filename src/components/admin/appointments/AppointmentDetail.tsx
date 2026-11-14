"use client";

import Link from "next/link";
import AdminPageHeader from "@/components/admin/common/AdminPageHeader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Appointment,
  SERVICE_TYPE_LABELS,
  APPOINTMENT_STATUS_CONFIG,
} from "@/lib/interfaces";
import { APPOINTMENT_STATUSES } from "@/lib/validations/zod";
import { formatPhone, formatPhoneForTel } from "@/lib/utils/phone";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import {
  updateAppointmentStatusAction,
  deleteAppointmentAction,
} from "@/app/actions/appointmentAction";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface AppointmentDetailProps {
  appointment: Appointment;
}

const AppointmentDetail = ({ appointment }: AppointmentDetailProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const formattedDate = new Date(appointment.scheduledDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const serviceLabel =
    SERVICE_TYPE_LABELS[appointment.serviceType] || appointment.serviceType;

  const handleStatusChange = async (newStatus: string) => {
    startTransition(async () => {
      toast.loading("Updating status...");
      const result = await updateAppointmentStatusAction(
        appointment.id,
        newStatus
      );
      toast.dismiss();

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const toastId = toast.loading("Deleting appointment…");
      const result = await deleteAppointmentAction(appointment.id);

      if (result.success) {
        toast.success(result.message, { id: toastId });
        setConfirmDeleteOpen(false);
        router.push("/appointments");
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  return (
    <div className="max-w-4xl">
        <AdminPageHeader
          title="Appointment details"
          back={{ href: "/appointments", label: "All appointments" }}
          actions={
          <>
            <Link
              href={`/edit-appointment/${appointment.id}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => setConfirmDeleteOpen(true)}
              disabled={isPending || isDeletePending}
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors disabled:opacity-50"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </button>
          </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2 bg-gray-800/50 rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {appointment.clientName}
              </h2>
              <AppointmentStatusBadge status={appointment.status} size="md" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <WrenchScrewdriverIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Service</p>
                  <p className="text-white font-medium">{serviceLabel}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white font-medium">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ClockIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="text-white font-medium">
                    {appointment.scheduledTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white font-medium">{appointment.address}</p>
                </div>
              </div>

              {appointment.notes && (
                <div className="flex items-start gap-3">
                  <DocumentTextIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Notes</p>
                    <p className="text-white">{appointment.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-white">{appointment.clientName}</span>
                </div>
                <a
                  href={`mailto:${appointment.clientEmail}`}
                  className="flex items-center gap-3 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  <span className="truncate">{appointment.clientEmail}</span>
                </a>
                <a
                  href={`tel:${formatPhoneForTel(appointment.clientPhone)}`}
                  className="flex items-center gap-3 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span>{formatPhone(appointment.clientPhone)}</span>
                </a>
              </div>
            </div>

            {/* Status Update Card */}
            <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Update Status
              </h3>
              <div className="space-y-2">
                {APPOINTMENT_STATUSES.map((status) => {
                  const config = APPOINTMENT_STATUS_CONFIG[status];
                  const isCurrentStatus = appointment.status === status;

                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={isPending || isCurrentStatus}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isCurrentStatus
                          ? `${config.bgColor} ${config.color} ring-1 ring-current cursor-default`
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      } disabled:opacity-50`}
                    >
                      {config.label}
                      {isCurrentStatus && (
                        <span className="text-xs ml-2">(Current)</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timestamps Card */}
            <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Timeline
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Created</span>
                  <span className="text-white">
                    {new Date(appointment.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Updated</span>
                  <span className="text-white">
                    {new Date(appointment.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                {appointment.admin && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created by</span>
                    <span className="text-white">{appointment.admin.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete this appointment?"
        description={
          <>
            The appointment for{" "}
            <strong className="font-semibold text-white">
              {appointment.clientName}
            </strong>{" "}
            on {formattedDate} will be permanently deleted. This can&apos;t be
            undone.
          </>
        }
        confirmLabel="Delete appointment"
        pendingLabel="Deleting…"
        isPending={isDeletePending}
      />
    </div>
  );
};

export default AppointmentDetail;
