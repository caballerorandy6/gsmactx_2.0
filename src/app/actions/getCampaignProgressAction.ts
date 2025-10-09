"use server";

import { prisma } from "@/libs/prisma";

export async function getCampaignProgressAction(campaignId: string) {
  try {
    const stats = await prisma.campaignEmailLog.groupBy({
      by: ['status'],
      where: { campaignId },
      _count: true,
    });

    const pending = stats.find(s => s.status === 'pending')?._count || 0;
    const sent = stats.find(s => s.status === 'sent')?._count || 0;
    const failed = stats.find(s => s.status === 'failed')?._count || 0;
    const total = pending + sent + failed;

    return {
      success: true,
      data: {
        pending,
        sent,
        failed,
        total,
        progress: total > 0 ? Math.round((sent / total) * 100) : 0,
      },
    };
  } catch (error) {
    console.error("Error getting campaign progress:", error);
    return {
      success: false,
      data: null,
    };
  }
}
