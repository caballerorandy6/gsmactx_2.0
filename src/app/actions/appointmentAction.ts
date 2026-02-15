"use server";

import { AppointmentSchema, APPOINTMENT_STATUSES } from "@/lib/validations/zod";
import { ActionResult } from "@/lib/types";
import { Appointment, AppointmentStatus } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

// Create or Update appointment (Admin)
export async function upsertAppointmentAction(
  formData: FormData
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  const rawData = {
    id: formData.get("id") || undefined,
    clientName: formData.get("clientName"),
    clientEmail: formData.get("clientEmail"),
    clientPhone: formData.get("clientPhone"),
    serviceType: formData.get("serviceType"),
    scheduledDate: formData.get("scheduledDate"),
    scheduledTime: formData.get("scheduledTime"),
    address: formData.get("address"),
    notes: formData.get("notes") || undefined,
    status: formData.get("status") || "PENDING",
  };

  const validateFields = AppointmentSchema.safeParse(rawData);
  if (!validateFields.success) {
    const errors = validateFields.error.issues
      .map((e) => e.message)
      .join(", ");
    return {
      success: false,
      message: errors || "Invalid input data",
    };
  }

  const {
    id,
    clientName,
    clientEmail,
    clientPhone,
    serviceType,
    scheduledDate,
    scheduledTime,
    address,
    notes,
    status,
  } = validateFields.data;

  try {
    if (id) {
      // UPDATE
      await prisma.appointment.update({
        where: { id },
        data: {
          clientName,
          clientEmail,
          clientPhone,
          serviceType,
          scheduledDate: new Date(scheduledDate),
          scheduledTime,
          address,
          notes: notes || null,
          status,
        },
      });
      revalidatePath("/appointments");
      return { success: true, message: "Appointment updated successfully." };
    } else {
      // CREATE
      await prisma.appointment.create({
        data: {
          clientName,
          clientEmail,
          clientPhone,
          serviceType,
          scheduledDate: new Date(scheduledDate),
          scheduledTime,
          address,
          notes: notes || null,
          status: status || "PENDING",
          createdBy: user.id,
        },
      });
      revalidatePath("/appointments");
      return { success: true, message: "Appointment created successfully." };
    }
  } catch (error) {
    console.error("Error saving appointment:", error);
    return { success: false, message: "Failed to save appointment." };
  }
}

// Delete appointment
export async function deleteAppointmentAction(
  id: string
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    await prisma.appointment.delete({
      where: { id },
    });
    revalidatePath("/appointments");
    return { success: true, message: "Appointment deleted successfully." };
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return { success: false, message: "Failed to delete appointment." };
  }
}

// Get all appointments with optional filters
export async function getAppointmentsListAction(filters?: {
  status?: AppointmentStatus;
  serviceType?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Appointment[]> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    const where: Record<string, unknown> = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.serviceType) {
      where.serviceType = filters.serviceType;
    }

    if (filters?.startDate || filters?.endDate) {
      where.scheduledDate = {};
      if (filters?.startDate) {
        (where.scheduledDate as Record<string, Date>).gte = new Date(
          filters.startDate
        );
      }
      if (filters?.endDate) {
        (where.scheduledDate as Record<string, Date>).lte = new Date(
          filters.endDate
        );
      }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { scheduledDate: "asc" },
      include: { admin: true },
    });

    return appointments as unknown as Appointment[];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

// Get single appointment by ID
export async function getAppointmentByIdAction(
  id: string
): Promise<Appointment | null> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { admin: true },
    });

    if (!appointment) {
      return null;
    }

    return appointment as unknown as Appointment;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return null;
  }
}

// Update appointment status
export async function updateAppointmentStatusAction(
  id: string,
  status: string
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  if (
    !APPOINTMENT_STATUSES.includes(
      status as (typeof APPOINTMENT_STATUSES)[number]
    )
  ) {
    return { success: false, message: "Invalid status." };
  }

  try {
    await prisma.appointment.update({
      where: { id },
      data: { status: status as AppointmentStatus },
    });
    revalidatePath("/appointments");
    return { success: true, message: "Status updated successfully." };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return { success: false, message: "Failed to update status." };
  }
}

// Get appointments count by status (for dashboard stats)
export async function getAppointmentStatsAction(): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  todayCount: number;
  weekCount: number;
}> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const [
      total,
      pending,
      confirmed,
      inProgress,
      completed,
      cancelled,
      todayCount,
      weekCount,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "PENDING" } }),
      prisma.appointment.count({ where: { status: "CONFIRMED" } }),
      prisma.appointment.count({ where: { status: "IN_PROGRESS" } }),
      prisma.appointment.count({ where: { status: "COMPLETED" } }),
      prisma.appointment.count({ where: { status: "CANCELLED" } }),
      prisma.appointment.count({
        where: {
          scheduledDate: { gte: today, lt: tomorrow },
        },
      }),
      prisma.appointment.count({
        where: {
          scheduledDate: { gte: weekStart, lt: weekEnd },
        },
      }),
    ]);

    return {
      total,
      pending,
      confirmed,
      inProgress,
      completed,
      cancelled,
      todayCount,
      weekCount,
    };
  } catch (error) {
    console.error("Error fetching appointment stats:", error);
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      todayCount: 0,
      weekCount: 0,
    };
  }
}
