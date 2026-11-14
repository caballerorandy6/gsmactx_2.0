import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  AppointmentStatus,
  APPOINTMENT_STATUS_CONFIG,
  SERVICE_TYPE_LABELS,
  ServiceType,
} from "@/lib/interfaces";
import { getBusinessToday } from "@/lib/utils/bookingTime";

export interface UpcomingAppointment {
  id: string;
  clientName: string;
  serviceType: ServiceType;
  /** Calendar day as "YYYY-MM-DD". */
  scheduledDate: string;
  scheduledTime: string;
  status: AppointmentStatus;
}

const STATUS_DOT: Partial<Record<AppointmentStatus, string>> = {
  PENDING: "bg-yellow-400",
  CONFIRMED: "bg-blue-400",
  IN_PROGRESS: "bg-purple-400",
};

const dayLabel = (date: string, today: string, tomorrow: string) => {
  if (date === today) return "Today";
  if (date === tomorrow) return "Tomorrow";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
};

const UpcomingAppointments = ({
  appointments,
}: {
  appointments: UpcomingAppointment[];
}) => {
  const today = getBusinessToday();
  const tomorrow = new Date(Date.parse(`${today}T12:00:00Z`) + 86_400_000)
    .toISOString()
    .slice(0, 10);

  return (
    <section
      aria-labelledby="upcoming-heading"
      className="rounded-lg border border-white/10 bg-gray-900/60"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
        <h2 id="upcoming-heading" className="text-base font-semibold text-white">
          Upcoming appointments
        </h2>
        <Link
          href="/appointments"
          className="rounded text-sm font-medium text-primary-300 hover:text-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          View all
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className="px-4 py-10 text-center sm:px-5">
          <p className="text-sm text-gray-300">
            No upcoming appointments on the calendar.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            New bookings from the website will show up here.
          </p>
        </div>
      ) : (
        <ul role="list" className="divide-y divide-white/5">
          {appointments.map((appointment) => {
            const status = APPOINTMENT_STATUS_CONFIG[appointment.status];
            const isPending = appointment.status === "PENDING";
            return (
              <li key={appointment.id}>
                <Link
                  href={`/appointments/${appointment.id}`}
                  className="group flex items-center gap-4 px-4 py-3 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-400 sm:px-5"
                >
                  <div className="w-20 shrink-0 sm:w-24">
                    <p
                      className={clsx(
                        "text-sm font-semibold",
                        appointment.scheduledDate === today
                          ? "text-white"
                          : "text-gray-300"
                      )}
                    >
                      {dayLabel(appointment.scheduledDate, today, tomorrow)}
                    </p>
                    <p className="text-xs tabular-nums text-gray-400">
                      {appointment.scheduledTime}
                    </p>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {appointment.clientName}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {SERVICE_TYPE_LABELS[appointment.serviceType] ??
                        appointment.serviceType}
                    </p>
                  </div>

                  <span
                    className={clsx(
                      "inline-flex shrink-0 items-center gap-1.5 text-xs font-medium",
                      isPending ? "text-yellow-300" : "text-gray-300"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "size-1.5 rounded-full",
                        STATUS_DOT[appointment.status]
                      )}
                    />
                    <span className="sr-only sm:not-sr-only">
                      {isPending ? "Needs confirmation" : status.label}
                    </span>
                  </span>

                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-gray-500 group-hover:text-gray-300"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default UpcomingAppointments;
