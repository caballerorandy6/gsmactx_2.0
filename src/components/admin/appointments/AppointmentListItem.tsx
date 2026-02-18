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
    <li className="flex flex-col gap-4 p-4 sm:p-5 hover:bg-gray-800/50 transition-colors motion-reduce:transition-none md:flex-row md:items-start md:justify-between">
      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-2">
        {/* Client name and status */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <h3 className="text-base sm:text-lg font-semibold text-white wrap-break-word">
            {appointment.clientName}
          </h3>
          <AppointmentStatusBadge status={appointment.status} />
        </div>

        {/* Service type */}
        <p className="text-sm font-medium text-indigo-400">
          {serviceLabel}
        </p>

        {/* Date, time, phone - responsive grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <CalendarIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="tabular-nums">{formattedDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="tabular-nums">{appointment.scheduledTime}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <PhoneIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="tabular-nums">{formatPhone(appointment.clientPhone)}</span>
          </span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-400">
          <MapPinIcon aria-hidden="true" className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="wrap-break-word line-clamp-2">{appointment.address}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-2 md:pt-0">
        <Link
          href={`/appointments/${appointment.id}`}
          className="flex-1 md:flex-none text-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-colors motion-reduce:transition-none"
        >
          View
        </Link>
        <Link
          href={`/edit-appointment/${appointment.id}`}
          className="flex-1 md:flex-none text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors motion-reduce:transition-none"
        >
          Edit
        </Link>
      </div>
    </li>
  );
};

export default AppointmentListItem;
