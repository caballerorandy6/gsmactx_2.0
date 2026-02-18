"use client";

import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Appointment, SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import Link from "next/link";

// Status color mapping for appointment indicators
const STATUS_COLORS: Record<string, { bg: string; label: string }> = {
  PENDING: { bg: "bg-yellow-400", label: "Pending" },
  CONFIRMED: { bg: "bg-blue-400", label: "Confirmed" },
  IN_PROGRESS: { bg: "bg-purple-400", label: "In Progress" },
  COMPLETED: { bg: "bg-green-400", label: "Completed" },
  CANCELLED: { bg: "bg-red-400", label: "Cancelled" },
};

interface AppointmentsCalendarProps {
  appointments: Appointment[];
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AppointmentsCalendar = ({ appointments }: AppointmentsCalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  // Get first day of month and total days
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  // Get days from previous month to fill the first week
  const prevMonthLastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  // Build calendar grid
  const calendarDays: {
    day: number;
    isCurrentMonth: boolean;
    date: Date;
  }[] = [];

  // Previous month days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day),
    });
  }

  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    });
  }

  // Next month days to complete grid (6 rows)
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day),
    });
  }

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.scheduledDate);
      return (
        aptDate.getFullYear() === date.getFullYear() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getDate() === date.getDate()
      );
    });
  };

  // Check if date is today
  const isToday = (date: Date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  // Get appointments for selected date
  const selectedDateAppointments = selectedDate
    ? getAppointmentsForDate(selectedDate)
    : [];

  // Get status color for appointment indicator
  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status]?.bg || "bg-indigo-400";
  };

  // Format date for aria-label
  const formatDateForAria = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Calendar */}
      <section
        aria-label="Appointments calendar"
        className="lg:col-span-2 bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-xl"
      >
        {/* Calendar Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
              {MONTHS[currentDate.getMonth()]}
            </h2>
            <p className="text-gray-400 text-sm mt-1 tabular-nums">
              {currentDate.getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              aria-label="Go to today's date"
            >
              Today
            </button>
            <nav aria-label="Calendar navigation" className="flex items-center bg-gray-800/80 rounded-lg p-1 border border-white/5">
              <button
                onClick={goToPreviousMonth}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label={`Go to ${MONTHS[currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1]} ${currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear()}`}
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label={`Go to ${MONTHS[currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1]} ${currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}`}
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </header>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {DAYS_OF_WEEK.map((day, index) => (
            <div
              key={day}
              className={clsx(
                "text-center text-xs font-semibold uppercase tracking-wider py-3",
                index === 0 || index === 6
                  ? "text-indigo-400"
                  : "text-gray-500"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((item, index) => {
            const dayAppointments = getAppointmentsForDate(item.date);
            const hasAppointments = dayAppointments.length > 0;
            const isWeekend = item.date.getDay() === 0 || item.date.getDay() === 6;

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(item.date)}
                aria-label={`${formatDateForAria(item.date)}${hasAppointments ? `, ${dayAppointments.length} appointment${dayAppointments.length > 1 ? "s" : ""}` : ""}`}
                aria-pressed={isSelected(item.date)}
                className={clsx(
                  "relative aspect-square rounded-xl flex flex-col items-center justify-center group transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900",
                  item.isCurrentMonth
                    ? "text-white"
                    : "text-gray-600",
                  !isSelected(item.date) && item.isCurrentMonth && "hover:bg-white/5",
                  !isSelected(item.date) && !item.isCurrentMonth && "hover:bg-white/2",
                  isToday(item.date) && !isSelected(item.date) &&
                    "bg-indigo-500/10 ring-2 ring-indigo-500/50",
                  isSelected(item.date) &&
                    "bg-linear-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30 scale-105",
                  isWeekend && item.isCurrentMonth && !isSelected(item.date) && "text-gray-400"
                )}
              >
                <span
                  className={clsx(
                    "text-sm sm:text-base font-medium transition-all duration-200",
                    isSelected(item.date) && "font-bold",
                    isToday(item.date) && !isSelected(item.date) && "text-indigo-400 font-semibold"
                  )}
                >
                  {item.day}
                </span>

                {/* Appointment Indicators */}
                {hasAppointments && (
                  <div className="flex gap-0.5 mt-1">
                    {dayAppointments.slice(0, 3).map((apt, i) => (
                      <span
                        key={i}
                        className={clsx(
                          "w-1.5 h-1.5 rounded-full transition-transform duration-200",
                          isSelected(item.date) ? "bg-white/80" : getStatusColor(apt.status),
                          "group-hover:scale-125"
                        )}
                      />
                    ))}
                    {dayAppointments.length > 3 && (
                      <span
                        className={clsx(
                          "text-[9px] font-bold ml-0.5",
                          isSelected(item.date) ? "text-white/80" : "text-indigo-400"
                        )}
                      >
                        +{dayAppointments.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/5">
          <span className="text-xs text-gray-500 font-medium">Status:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-xs text-gray-400">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-gray-400">Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-xs text-gray-400">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
            <span className="text-xs text-gray-400">Completed</span>
          </div>
        </div>
      </section>

      {/* Selected Day Appointments Panel */}
      <aside
        aria-label="Selected day appointments"
        className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl flex flex-col"
      >
        <>
        {/* Panel Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">
              {selectedDate
                ? selectedDate.getDate()
                : "--"}
            </h3>
            <p className="text-sm text-gray-400">
              {selectedDate
                ? `${MONTHS[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getFullYear()}`
                : "Select a day"}
            </p>
          </div>
          {selectedDate && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/80 rounded-lg border border-white/5">
              <CalendarDaysIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm text-gray-300 font-medium">
                {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Appointments List */}
        <div className="flex-1 overflow-hidden">
          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 rounded-2xl bg-gray-800/80 flex items-center justify-center mb-4">
                <CalendarDaysIcon className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-gray-400 text-sm text-center">
                Click on a day to view<br />scheduled appointments
              </p>
            </div>
          ) : selectedDateAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <CalendarDaysIcon className="h-8 w-8 text-indigo-400" />
              </div>
              <p className="text-gray-300 font-medium mb-1">No appointments</p>
              <p className="text-gray-500 text-sm text-center mb-6">
                This day is available for scheduling
              </p>
              <Link
                href="/create-appointment"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
              >
                <PlusIcon className="h-4 w-4" />
                New Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[450px] pr-1 custom-scrollbar">
              {selectedDateAppointments
                .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
                .map((apt) => (
                  <Link
                    key={apt.id}
                    href={`/appointments/${apt.id}`}
                    className="block p-3 sm:p-4 rounded-xl bg-gray-900/60 border border-white/5 hover:border-indigo-500/30 hover:bg-gray-900/80 transition-all motion-reduce:transition-none group"
                  >
                    {/* Time & Status - stack on very small screens */}
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 rounded-lg w-fit">
                        <ClockIcon aria-hidden="true" className="h-3.5 w-3.5 text-indigo-400" />
                        <span className="text-xs sm:text-sm font-bold text-indigo-400 tabular-nums">
                          {apt.scheduledTime}
                        </span>
                      </div>
                      <AppointmentStatusBadge status={apt.status} size="sm" />
                    </div>

                    {/* Client Info - allow full name to wrap */}
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors motion-reduce:transition-none wrap-break-word hyphens-auto">
                      {apt.clientName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 mb-3">
                      {SERVICE_TYPE_LABELS[apt.serviceType]}
                    </p>

                    {/* Contact & Location */}
                    <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <PhoneIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                        <span className="tabular-nums">{apt.clientPhone}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <MapPinIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span className="wrap-break-word line-clamp-2">{apt.address}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* Quick Add Button (when there are appointments) */}
        {selectedDate && selectedDateAppointments.length > 0 && (
          <Link
            href="/create-appointment"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gray-800/50 hover:bg-gray-800 border border-white/5 hover:border-indigo-500/30 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Add Appointment
          </Link>
        )}
        </>
      </aside>
    </div>
  );
};

export default AppointmentsCalendar;
