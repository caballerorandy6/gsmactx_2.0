"use client";

import Link from "next/link";
import { Appointment, SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import { CalendarIcon, ClockIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { formatPhone } from "@/lib/utils/phone";

interface AppointmentListItemProps {
  appointment: Appointment;
}

const AppointmentListItem = ({ appointment }: AppointmentListItemProps) => {
  const formattedDate = new Date(appointment.scheduledDate).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const serviceLabel =
    SERVICE_TYPE_LABELS[appointment.serviceType] || appointment.serviceType;

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-gray-800/50 transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="text-base font-semibold text-white">
            {appointment.clientName}
          </p>
          <AppointmentStatusBadge status={appointment.status} />
        </div>

        <p className="text-sm font-medium text-indigo-400 mb-2">
          {serviceLabel}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {appointment.scheduledTime}
          </span>
          <span className="flex items-center gap-1">
            <PhoneIcon className="h-4 w-4" />
            {formatPhone(appointment.clientPhone)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
          <MapPinIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{appointment.address}</span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-3">
        <Link
          href={`/appointments/${appointment.id}`}
          className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/edit-appointment/${appointment.id}`}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
        >
          Edit
        </Link>
      </div>
    </li>
  );
};

export default AppointmentListItem;
