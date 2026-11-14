"use server";

import { prisma } from "@/lib/db/prisma";
import {
  getBusinessDayRange,
  getBusinessWeekRange,
  timeToMinutes,
} from "@/lib/utils/bookingTime";

export async function getDashboardStatsAction() {
  try {
    // Appointment dates are stored as the calendar day at 12:00 UTC;
    // "today" and "this week" follow the Houston calendar.
    const { start: today, end: tomorrow } = getBusinessDayRange();
    const { start: weekStart, end: weekEnd } = getBusinessWeekRange();

    const [
      // Email-related stats
      totalSubscribers,
      activeSubscribers,
      totalCampaigns,
      sentCampaigns,
      emailLogs,
      // SMS-related stats
      totalSMSCampaigns,
      sentSMSCampaigns,
      smsMessages,
      // Appointment stats
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      inProgressAppointments,
      completedAppointments,
      cancelledAppointments,
      todayAppointments,
      weekAppointments,
      upcomingCandidates,
    ] = await Promise.all([
      // Email
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { isSubscribed: true } }),
      prisma.campaign.count(),
      prisma.campaign.count({ where: { sent: true } }),
      prisma.campaignEmailLog.groupBy({
        by: ["status"],
        _count: true,
      }),
      // SMS
      prisma.sMSCampaign.count(),
      prisma.sMSCampaign.count({ where: { sent: true } }),
      prisma.sMSMessage.groupBy({
        by: ["status"],
        _count: true,
      }),
      // Appointments
      prisma.appointment.count(),
      // Only upcoming bookings still need a call; past unconfirmed ones live in the appointments list.
      prisma.appointment.count({
        where: { status: "PENDING", scheduledDate: { gte: today } },
      }),
      prisma.appointment.count({ where: { status: "CONFIRMED" } }),
      prisma.appointment.count({ where: { status: "IN_PROGRESS" } }),
      prisma.appointment.count({ where: { status: "COMPLETED" } }),
      prisma.appointment.count({ where: { status: "CANCELLED" } }),
      prisma.appointment.count({
        where: { scheduledDate: { gte: today, lt: tomorrow } },
      }),
      prisma.appointment.count({
        where: { scheduledDate: { gte: weekStart, lt: weekEnd } },
      }),
      prisma.appointment.findMany({
        where: {
          scheduledDate: { gte: today },
          status: { in: ["PENDING", "CONFIRMED", "IN_PROGRESS"] },
        },
        orderBy: { scheduledDate: "asc" },
        take: 20,
        select: {
          id: true,
          clientName: true,
          serviceType: true,
          scheduledDate: true,
          scheduledTime: true,
          status: true,
        },
      }),
    ]);

    // scheduledTime is a "2:00 PM" string, so order within each day in JS.
    const upcomingAppointments = upcomingCandidates
      .sort(
        (a, b) =>
          a.scheduledDate.getTime() - b.scheduledDate.getTime() ||
          timeToMinutes(a.scheduledTime) - timeToMinutes(b.scheduledTime)
      )
      .slice(0, 6)
      .map((a) => ({
        ...a,
        scheduledDate: a.scheduledDate.toISOString().slice(0, 10),
      }));

    const emailStats = emailLogs.reduce(
      (acc, log) => {
        acc[log.status] = log._count;
        return acc;
      },
      {} as Record<string, number>
    );

    const smsStats = smsMessages.reduce(
      (acc, message) => {
        acc[message.status] = message._count;
        return acc;
      },
      {} as Record<string, number>
    );

    // Get recent email campaigns with aggregated email counts (optimized query)
    const recentCampaigns = await prisma.campaign.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        sent: true,
        createdAt: true,
        // Use pre-computed stats when available (much faster)
        sentCount: true,
        failedCount: true,
        admin: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      success: true,
      stats: {
        // Email Campaign Stats
        totalSubscribers,
        activeSubscribers,
        inactiveSubscribers: totalSubscribers - activeSubscribers,
        totalCampaigns,
        sentCampaigns,
        notSentCampaigns: totalCampaigns - sentCampaigns,
        emailsSent: emailStats.sent || 0,
        emailsFailed: emailStats.failed || 0,
        emailsPending: emailStats.pending || 0,

        // SMS Campaign Stats
        totalSMSCampaigns,
        sentSMSCampaigns,
        notSentSMSCampaigns: totalSMSCampaigns - sentSMSCampaigns,
        smsSent: smsStats.sent || 0,
        smsFailed: smsStats.failed || 0,
        smsPending: smsStats.pending || 0,

        // Appointment Stats
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        inProgressAppointments,
        completedAppointments,
        cancelledAppointments,
        todayAppointments,
        weekAppointments,
      },
      upcomingAppointments,
      recentCampaigns: recentCampaigns.map((campaign) => ({
        id: campaign.id,
        title: campaign.title,
        sent: campaign.sent,
        createdAt: campaign.createdAt,
        adminName: campaign.admin.name,
        // Use pre-computed stats (stored when campaign completes)
        emailsSent: campaign.sentCount ?? 0,
        emailsFailed: campaign.failedCount ?? 0,
      })),
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      success: false,
      stats: null,
      upcomingAppointments: [],
      recentCampaigns: [],
    };
  }
}
