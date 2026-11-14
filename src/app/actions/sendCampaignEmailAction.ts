"use server";

import { prisma } from "@/lib/db/prisma";
import { Resend } from "resend";
import { ActionResult } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { renderCampaignEmail } from "@/lib/email/emailRenderer";
import { after } from "next/server";
import { notifyAdminsOfCompletion } from "@/lib/email/notifyAdminsOfCompletion";

const resend = new Resend(process.env.RESEND_API_KEY);
const DAILY_LIMIT = 100; // Resend free tier limit
const BATCH_SIZE = 100; // Resend batch limit
const FROM_EMAIL = process.env.FROM_EMAIL || "GSMACTX <no-reply@gsmactx.com>";

// Validate environment variables
if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
}

/**
 * Check how many emails have been sent today for rate limiting
 */
async function getEmailsSentToday(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const count = await prisma.campaignEmailLog.count({
    where: {
      sentAt: {
        gte: today,
      },
      status: "sent",
    },
  });

  return count;
}

/**
 * Get pending email logs for a campaign
 */
async function getPendingEmailLogs(campaignId: string, limit: number) {
  return await prisma.campaignEmailLog.findMany({
    where: {
      campaignId,
      status: "pending",
    },
    include: {
      subscriber: true,
      campaign: true,
    },
    take: limit,
    orderBy: {
      createdAt: "asc",
    },
  });
}

/**
 * Initialize campaign email logs for all active subscribers
 */
export async function initializeCampaignEmailLogsAction(
  campaignId: string
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    // Use transaction to prevent race conditions
    const result = await prisma.$transaction(async (tx) => {
      // Get the campaign
      const campaign = await tx.campaign.findUnique({
        where: { id: campaignId },
      });

      if (!campaign) {
        throw new Error("Campaign not found");
      }

      // Check if already sent
      if (campaign.sent) {
        throw new Error("Campaign has already been sent");
      }

      // Check if logs already exist
      const existingLogs = await tx.campaignEmailLog.count({
        where: { campaignId },
      });

      if (existingLogs > 0) {
        throw new Error("Campaign has already been initialized");
      }

      // Get all active subscribers
      const subscribers = await tx.subscriber.findMany({
        where: {
          isSubscribed: true,
        },
      });

      if (subscribers.length === 0) {
        throw new Error("No active subscribers found");
      }

      // Generate unsubscribe tokens for subscribers that don't have one
      const subscribersNeedingTokens = subscribers.filter(
        (sub) => !sub.unsubscribeToken
      );

      if (subscribersNeedingTokens.length > 0) {
        await Promise.all(
          subscribersNeedingTokens.map((sub) =>
            tx.subscriber.update({
              where: { id: sub.id },
              data: { unsubscribeToken: randomUUID() },
            })
          )
        );

        // Refresh subscriber data
        const updatedSubs = await tx.subscriber.findMany({
          where: {
            id: { in: subscribersNeedingTokens.map((s) => s.id) },
          },
        });

        // Update the array with new tokens
        subscribersNeedingTokens.forEach((sub) => {
          const updated = updatedSubs.find((u) => u.id === sub.id);
          if (updated) {
            sub.unsubscribeToken = updated.unsubscribeToken;
          }
        });
      }

      // Create email logs for all subscribers
      await tx.campaignEmailLog.createMany({
        data: subscribers.map((subscriber) => ({
          campaignId,
          subscriberId: subscriber.id,
          status: "pending",
        })),
      });

      return {
        subscriberCount: subscribers.length,
        campaignTitle: campaign.title,
      };
    });

    return {
      success: true,
      message: `Campaign initialized for ${result.subscriberCount} subscribers. Ready to send!`,
    };
  } catch (error) {
    console.error("Error initializing campaign:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to initialize campaign.",
    };
  }
}

/**
 * Send batch of campaign emails (respecting daily limit)
 */
export async function sendCampaignBatchAction(
  campaignId: string
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    // Check how many emails we've sent today
    const emailsSentToday = await getEmailsSentToday();
    const remainingQuota = DAILY_LIMIT - emailsSentToday;

    console.log(
      `📊 Daily quota: ${emailsSentToday}/${DAILY_LIMIT} used, ${remainingQuota} remaining`
    );

    if (remainingQuota <= 0) {
      return {
        success: false,
        message: `Daily limit of ${DAILY_LIMIT} emails reached. Please try again tomorrow.`,
      };
    }

    // Get pending email logs (up to remaining quota, respecting batch size)
    const batchLimit = Math.min(remainingQuota, BATCH_SIZE);
    const pendingLogs = await getPendingEmailLogs(campaignId, batchLimit);

    if (pendingLogs.length === 0) {
      // Check if campaign is complete
      const stats = await prisma.campaignEmailLog.groupBy({
        by: ["status"],
        where: { campaignId },
        _count: true,
      });

      const totalLogs =
        stats.reduce((sum, stat) => sum + stat._count, 0);
      const sentLogs =
        stats.find((s) => s.status === "sent")?._count || 0;
      const failedLogs =
        stats.find((s) => s.status === "failed")?._count || 0;

      if (totalLogs > 0 && sentLogs + failedLogs === totalLogs) {
        // Campaign is complete
        const campaign = await prisma.campaign.findUnique({
          where: { id: campaignId },
        });

        await prisma.campaign.update({
          where: { id: campaignId },
          data: {
            sent: true,
            sentAt: new Date(),
            totalEmails: totalLogs,
            sentCount: sentLogs,
            failedCount: failedLogs,
          },
        });

        // Send admin notifications in background - non-blocking
        if (campaign) {
          after(async () => {
            await notifyAdminsOfCompletion({
              id: campaignId,
              title: campaign.title,
              totalSent: sentLogs,
              totalFailed: failedLogs,
            });
          });
        }

        let message = `Campaign completed! ${sentLogs}/${totalLogs} emails sent successfully.`;
        if (failedLogs > 0) {
          message += ` ${failedLogs} email(s) failed - these may be invalid addresses.`;
        }
        message += " Admins will be notified shortly.";

        return {
          success: true,
          message,
        };
      }

      return {
        success: false,
        message: "No pending emails to send.",
      };
    }

    console.log(
      `📧 Preparing to send batch of ${pendingLogs.length} emails...`
    );

    // Prepare email batch using renderCampaignEmail
    const emailBatch = await Promise.all(
      pendingLogs.map(async (log) => {
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${log.subscriber.unsubscribeToken}`;

        const html = await renderCampaignEmail({
          subject: log.campaign.subject,
          title: log.campaign.title,
          content: log.campaign.content,
          imageUrl: log.campaign.imageUrl || undefined,
          recipientEmail: log.subscriber.email,
          unsubscribeUrl,
        });

        return {
          logId: log.id,
          subscriberId: log.subscriber.id,
          email: {
            from: FROM_EMAIL,
            to: log.subscriber.email,
            subject: log.campaign.subject,
            html,
          },
        };
      })
    );

    // Send batch using Resend batch API
    try {
      console.log(`📤 Sending batch via Resend...`);

      const emailsToSend = emailBatch.map((item) => item.email);
      await resend.batch.send(emailsToSend);

      // Mark all as sent (Resend batch doesn't provide per-email status in free tier)
      await prisma.campaignEmailLog.updateMany({
        where: {
          id: { in: emailBatch.map((item) => item.logId) },
        },
        data: {
          status: "sent",
          sentAt: new Date(),
        },
      });

      const successCount = emailBatch.length;

      // Get updated campaign progress
      const stats = await prisma.campaignEmailLog.groupBy({
        by: ["status"],
        where: { campaignId },
        _count: true,
      });

      const totalLogs = stats.reduce((sum, stat) => sum + stat._count, 0);
      const sentLogs = stats.find((s) => s.status === "sent")?._count || 0;
      const failedLogs =
        stats.find((s) => s.status === "failed")?._count || 0;
      const pendingCount =
        stats.find((s) => s.status === "pending")?._count || 0;

      // Check if campaign is now complete
      if (pendingCount === 0 && totalLogs > 0) {
        const campaign = await prisma.campaign.findUnique({
          where: { id: campaignId },
        });

        await prisma.campaign.update({
          where: { id: campaignId },
          data: {
            sent: true,
            sentAt: new Date(),
            totalEmails: totalLogs,
            sentCount: sentLogs,
            failedCount: failedLogs,
          },
        });

        // Send admin notifications in background - non-blocking
        if (campaign) {
          after(async () => {
            await notifyAdminsOfCompletion({
              id: campaignId,
              title: campaign.title,
              totalSent: sentLogs,
              totalFailed: failedLogs,
            });
          });
        }

        let message = `Campaign completed! All ${sentLogs}/${totalLogs} emails sent successfully.`;
        if (failedLogs > 0) {
          message += ` ${failedLogs} email(s) failed.`;
        }
        message += " Admins will be notified shortly.";

        return {
          success: true,
          message,
        };
      }

      return {
        success: true,
        message: `Batch sent successfully: ${successCount} emails sent. Progress: ${sentLogs}/${totalLogs} sent, ${pendingCount} remaining. ${remainingQuota - successCount} quota left today.`,
      };
    } catch (error) {
      console.error("Batch send failed:", error);

      // Mark all as failed
      await prisma.campaignEmailLog.updateMany({
        where: {
          id: { in: emailBatch.map((item) => item.logId) },
        },
        data: {
          status: "failed",
          error: error instanceof Error ? error.message : "Batch send failed",
        },
      });

      return {
        success: false,
        message: `Failed to send batch: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  } catch (error) {
    console.error("Error in sendCampaignBatchAction:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to send batch.",
    };
  }
}

/**
 * Get campaign sending progress/stats
 */
export async function getCampaignStatsAction(
  campaignId: string
): Promise<{
  total: number;
  sent: number;
  failed: number;
  pending: number;
  emailsSentToday: number;
  remainingQuota: number;
} | null> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    // Parallel fetch: stats and emailsSentToday are independent
    const [stats, emailsSentToday] = await Promise.all([
      prisma.campaignEmailLog.groupBy({
        by: ["status"],
        where: { campaignId },
        _count: true,
      }),
      getEmailsSentToday(),
    ]);

    const total = stats.reduce((sum, stat) => sum + stat._count, 0);
    const sent = stats.find((s) => s.status === "sent")?._count || 0;
    const failed = stats.find((s) => s.status === "failed")?._count || 0;
    const pending = stats.find((s) => s.status === "pending")?._count || 0;

    const remainingQuota = Math.max(0, DAILY_LIMIT - emailsSentToday);

    return {
      total,
      sent,
      failed,
      pending,
      emailsSentToday,
      remainingQuota,
    };
  } catch (error) {
    console.error("Error getting campaign stats:", error);
    return null;
  }
}

/**
 * Retry failed emails in a campaign
 */
export async function retryFailedEmailsAction(
  campaignId: string
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    // Reset failed emails to pending
    const result = await prisma.campaignEmailLog.updateMany({
      where: {
        campaignId,
        status: "failed",
      },
      data: {
        status: "pending",
        error: null,
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "No failed emails found to retry.",
      };
    }

    return {
      success: true,
      message: `Reset ${result.count} failed emails to pending. Click "Send Batch" to retry them.`,
    };
  } catch (error) {
    console.error("Error retrying failed emails:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to retry emails.",
    };
  }
}
