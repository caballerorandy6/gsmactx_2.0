"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  Appointment,
  AppointmentStatus,
  SERVICE_TYPE_LABELS,
} from "@/lib/interfaces";
import { APPOINTMENT_STATUSES, SERVICE_TYPES } from "@/lib/validations/zod";
import AppointmentListItem from "./AppointmentListItem";
import AppointmentsCalendar from "./AppointmentsCalendar";
import {
  CalendarIcon,
  CalendarDaysIcon,
  ListBulletIcon,
  FunnelIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface AppointmentsListProps {
  appointments: Appointment[];
  userName: string;
}

type FilterStatus = AppointmentStatus | "ALL";
type ViewMode = "list" | "calendar";

const AppointmentsList = ({
  appointments,
  userName,
}: AppointmentsListProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("ALL");
  const [selectedService, setSelectedService] = useState<string>("ALL");
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>(appointments);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = appointments;

    if (selectedStatus !== "ALL") {
      filtered = filtered.filter((apt) => apt.status === selectedStatus);
    }

    if (selectedService !== "ALL") {
      filtered = filtered.filter((apt) => apt.serviceType === selectedService);
    }

    setFilteredAppointments(filtered);
  }, [appointments, selectedStatus, selectedService]);

  const statusCounts = APPOINTMENT_STATUSES.reduce(
    (acc, status) => {
      acc[status] = appointments.filter((apt) => apt.status === status).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const clearFilters = () => {
    setSelectedStatus("ALL");
    setSelectedService("ALL");
  };

  const hasActiveFilters = selectedStatus !== "ALL" || selectedService !== "ALL";

  return (
    <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 mt-10 min-h-screen px-4 sm:px-6 lg:px-8">
      <main className="pt-20">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Appointments</h1>
            <p className="text-gray-400 mt-1">
              Welcome, {userName}. Manage your scheduled appointments.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-800/50 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setViewMode("calendar")}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  viewMode === "calendar"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <CalendarDaysIcon className="h-4 w-4" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  viewMode === "list"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <ListBulletIcon className="h-4 w-4" />
                List
              </button>
            </div>
            <Link
              href="/create-appointment"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              New Appointment
            </Link>
          </div>
        </div>

        {/* Quick Stats - Only show in list view */}
        {viewMode === "list" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {APPOINTMENT_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() =>
                  setSelectedStatus(selectedStatus === status ? "ALL" : status)
                }
                className={clsx(
                  "rounded-lg p-3 text-center transition-all border",
                  selectedStatus === status
                    ? "bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500/30"
                    : "bg-gray-800/50 border-white/10 hover:bg-gray-700/50"
                )}
              >
                <p className="text-2xl font-bold text-white">
                  {statusCounts[status]}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {status.replace("_", " ").toLowerCase()}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Filter Controls - Only show in list view */}
        {viewMode === "list" && (
        <div className="bg-gray-800/50 rounded-lg border border-white/10 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
                Clear filters
              </button>
            )}

            <div className="flex-1" />

            <span className="text-sm text-gray-400">
              Showing {filteredAppointments.length} of {appointments.length}{" "}
              appointments
            </span>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
              <div>
                <label
                  htmlFor="status-filter"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Status
                </label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as FilterStatus)
                  }
                  className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="ALL">All Statuses</option>
                  {APPOINTMENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="service-filter"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Service Type
                </label>
                <select
                  id="service-filter"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-md bg-gray-900 border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="ALL">All Services</option>
                  {SERVICE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {SERVICE_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <AppointmentsCalendar appointments={appointments} />
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10">
            {filteredAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <CalendarIcon className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-400 text-center mb-6">
                  {hasActiveFilters
                    ? "Try adjusting your filters to see more results."
                    : "Start by creating your first appointment."}
                </p>
                {hasActiveFilters ? (
                  <button
                    onClick={clearFilters}
                    className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <Link
                    href="/create-appointment"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                  >
                    Create Appointment
                  </Link>
                )}
              </div>
            ) : (
              <ul role="list" className="divide-y divide-white/10">
                {filteredAppointments.map((appointment) => (
                  <AppointmentListItem
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
        </div>
      </main>
    </section>
  );
};

export default AppointmentsList;
