"use server";

import { prisma } from "@/libs/prisma";

export async function getDashboardStatsAction() {
  try {
    const [
      totalSubscribers,
      activeSubscribers,
      totalCampaigns,
      sentCampaigns,
      emailLogs,
    ] = await Promise.all([
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { isSubscribed: true } }),
      prisma.campaign.count(),
      prisma.campaign.count({ where: { sent: true } }),
      prisma.campaignEmailLog.groupBy({
        by: ["status"],
        _count: true,
      }),
    ]);

    const emailStats = emailLogs.reduce(
      (acc, log) => {
        acc[log.status] = log._count;
        return acc;
      },
      {} as Record<string, number>
    );

    // Get recent campaigns
    const recentCampaigns = await prisma.campaign.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        admin: {
          select: {
            name: true,
          },
        },
        emailLogs: {
          select: {
            status: true,
          },
        },
      },
    });

    return {
      success: true,
      stats: {
        totalSubscribers,
        activeSubscribers,
        inactiveSubscribers: totalSubscribers - activeSubscribers,
        totalCampaigns,
        sentCampaigns,
        notSentCampaigns: totalCampaigns - sentCampaigns,
        emailsSent: emailStats.sent || 0,
        emailsFailed: emailStats.failed || 0,
        emailsPending: emailStats.pending || 0,
      },
      recentCampaigns: recentCampaigns.map((campaign) => ({
        id: campaign.id,
        title: campaign.title,
        sent: campaign.sent,
        createdAt: campaign.createdAt,
        adminName: campaign.admin.name,
        emailsSent: campaign.emailLogs.filter((log) => log.status === "sent")
          .length,
        emailsFailed: campaign.emailLogs.filter((log) => log.status === "failed")
          .length,
      })),
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      success: false,
      stats: null,
      recentCampaigns: [],
    };
  }
}
