"use client";

import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Appointment, SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import Link from "next/link";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="xl:col-span-2 bg-gray-800/50 rounded-lg border border-white/10 p-4 sm:p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <CalendarDaysIcon className="h-6 w-6 text-indigo-400" />
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors"
            >
              Today
            </button>
            <button
              onClick={goToPreviousMonth}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors"
              aria-label="Next month"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((item, index) => {
            const dayAppointments = getAppointmentsForDate(item.date);
            const hasAppointments = dayAppointments.length > 0;

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(item.date)}
                className={clsx(
                  "relative aspect-square p-1 sm:p-2 rounded-lg transition-all text-sm sm:text-base",
                  item.isCurrentMonth
                    ? "text-white hover:bg-gray-700/50"
                    : "text-gray-600 hover:bg-gray-800/50",
                  isToday(item.date) &&
                    "ring-2 ring-indigo-500 ring-offset-1 ring-offset-gray-900",
                  isSelected(item.date) && "bg-indigo-600 hover:bg-indigo-500"
                )}
              >
                <span className="absolute top-1 left-1 sm:top-2 sm:left-2">
                  {item.day}
                </span>
                {hasAppointments && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {dayAppointments.length <= 3 ? (
                      dayAppointments.map((_, i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        />
                      ))
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="text-[10px] text-indigo-400 font-medium">
                          +{dayAppointments.length - 1}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Appointments */}
      <div className="bg-gray-800/50 rounded-lg border border-white/10 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {selectedDate
            ? `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
            : "Select a day"}
        </h3>

        {!selectedDate ? (
          <div className="text-center py-8">
            <CalendarDaysIcon className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
              Click on a day to view appointments
            </p>
          </div>
        ) : selectedDateAppointments.length === 0 ? (
          <div className="text-center py-8">
            <CalendarDaysIcon className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-4">
              No appointments scheduled for this day
            </p>
            <Link
              href="/create-appointment"
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              + Create appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {selectedDateAppointments
              .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
              .map((apt) => (
                <Link
                  key={apt.id}
                  href={`/appointments/${apt.id}`}
                  className="block p-3 rounded-lg bg-gray-900/50 border border-white/5 hover:border-indigo-500/30 hover:bg-gray-900/80 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-lg font-semibold text-indigo-400">
                      {apt.scheduledTime}
                    </span>
                    <AppointmentStatusBadge status={apt.status} size="sm" />
                  </div>
                  <p className="font-medium text-white truncate">
                    {apt.clientName}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {SERVICE_TYPE_LABELS[apt.serviceType]}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {apt.clientPhone}
                  </p>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
