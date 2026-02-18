"use server";

import { prisma } from "@/lib/db/prisma";

/**
 * Public action to get booked time slots for a specific date
 * Used by the public booking form to show reserved slots
 * Does not require authentication
 */
export async function getBookedTimeSlotsPublicAction(
  dateStr: string
): Promise<string[]> {
  try {
    // Parse the date string to get start and end of day
    const [year, month, day] = dateStr.split("-").map(Number);
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59);

    const appointments = await prisma.appointment.findMany({
      where: {
        scheduledDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        scheduledTime: true,
      },
    });

    return appointments.map((apt) => apt.scheduledTime);
  } catch (error) {
    console.error("Error fetching booked time slots:", error);
    return [];
  }
}
