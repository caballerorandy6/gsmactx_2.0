"use client";

import clsx from "clsx";
import { AppointmentStatus, APPOINTMENT_STATUS_CONFIG } from "@/lib/interfaces";

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
  size?: "sm" | "md";
}

const AppointmentStatusBadge = ({
  status,
  size = "sm",
}: AppointmentStatusBadgeProps) => {
  const config = APPOINTMENT_STATUS_CONFIG[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md font-medium ring-1 ring-inset",
        config.bgColor,
        config.color,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        status === "PENDING" && "ring-yellow-400/20",
        status === "CONFIRMED" && "ring-blue-400/20",
        status === "IN_PROGRESS" && "ring-purple-400/20",
        status === "COMPLETED" && "ring-green-400/20",
        status === "CANCELLED" && "ring-red-400/20"
      )}
    >
      {config.label}
    </span>
  );
};

export default AppointmentStatusBadge;
