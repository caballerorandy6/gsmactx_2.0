"use server";

import { prisma } from "@/libs/prisma";
import { Resend } from "resend";
import { ActionResult } from "@/libs/types";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { render } from "@react-email/components";
import CampaignEmailTemplate from "@/components/admin-components/CampaignEmailPreview";

const resend = new Resend(process.env.RESEND_API_KEY);
const DAILY_LIMIT = 100; // Resend free tier limit
const FROM_EMAIL = process.env.FROM_EMAIL!;

/**
 * Send completion notification to all admins
 */
async function notifyAdminsOfCompletion(
  campaignTitle: string,
  totalSent: number,
  totalFailed: number = 0
) {
  try {
    // Get all admin emails
    const admins = await prisma.admin.findMany({
      select: { email: true, name: true },
    });

    // Send notification to each admin
    for (const admin of admins) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: admin.email,
        subject: `✅ Campaign Completed: ${campaignTitle}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">✅ Campaign Completed!</h1>
              </div>

              <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
                <p style="font-size: 16px; margin-bottom: 20px;">Hello ${admin.name},</p>

                <p style="font-size: 16px; margin-bottom: 20px;">Great news! Your email campaign has been successfully completed.</p>

                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                  <h2 style="margin-top: 0; color: #667eea; font-size: 20px;">Campaign Details</h2>
                  <p style="margin: 10px 0;"><strong>Campaign:</strong> ${campaignTitle}</p>
                  <p style="margin: 10px 0;"><strong>Total Emails Sent:</strong> ${totalSent}</p>
                  ${
                    totalFailed > 0
                      ? `<p style="margin: 10px 0; color: #e53e3e;"><strong>Failed Emails:</strong> ${totalFailed} (invalid/unreachable addresses)</p>`
                      : ""
                  }
                  <p style="margin: 10px 0;"><strong>Completed:</strong> ${new Date().toLocaleString(
                    "en-US",
                    {
                      dateStyle: "full",
                      timeStyle: "short",
                    }
                  )}</p>
                </div>

                <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  This is an automated notification from your campaign management system.
                </p>
              </div>
            </body>
          </html>
        `,
      });
    }

    console.log(
      `✅ Completion notification sent to ${admins.length} admin(s) for campaign: ${campaignTitle}`
    );
  } catch (error) {
    console.error("Error sending admin notification:", error);
  }
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
    notFound();
  }

  try {
    // Get the campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return { success: false, message: "Campaign not found." };
    }

    // Check if logs already exist
    const existingLogs = await prisma.campaignEmailLog.count({
      where: { campaignId },
    });

    if (existingLogs > 0) {
      return {
        success: false,
        message: "Campaign has already been initialized.",
      };
    }

    // Get all active subscribers
    const subscribers = await prisma.subscriber.findMany({
      where: {
        isSubscribed: true,
      },
    });

    if (subscribers.length === 0) {
      return {
        success: false,
        message: "No active subscribers found.",
      };
    }

    // Create email logs for all subscribers
    await prisma.campaignEmailLog.createMany({
      data: subscribers.map((subscriber) => ({
        campaignId,
        subscriberId: subscriber.id,
        status: "pending",
      })),
    });

    return {
      success: true,
      message: `Campaign initialized for ${subscribers.length} subscribers.`,
    };
  } catch (error) {
    console.error("Error initializing campaign:", error);
    return { success: false, message: "Failed to initialize campaign." };
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
    notFound();
  }

  try {
    // Check how many emails we've sent today
    const emailsSentToday = await getEmailsSentToday();
    const remainingQuota = DAILY_LIMIT - emailsSentToday;

    if (remainingQuota <= 0) {
      return {
        success: false,
        message: `Daily limit of ${DAILY_LIMIT} emails reached. Please try again tomorrow.`,
      };
    }

    // Get pending email logs (up to remaining quota)
    const pendingLogs = await getPendingEmailLogs(campaignId, remainingQuota);

    if (pendingLogs.length === 0) {
      // Check if campaign is complete
      const totalLogs = await prisma.campaignEmailLog.count({
        where: { campaignId },
      });
      const sentLogs = await prisma.campaignEmailLog.count({
        where: { campaignId, status: "sent" },
      });

      if (totalLogs > 0 && sentLogs === totalLogs) {
        // Mark campaign as sent
        await prisma.campaign.update({
          where: { id: campaignId },
          data: {
            sent: true,
            sentAt: new Date(),
          },
        });

        return {
          success: true,
          message: `Campaign completed! All ${totalLogs} emails have been sent.`,
        };
      }

      return {
        success: false,
        message: "No pending emails to send.",
      };
    }

    let successCount = 0;
    let failureCount = 0;

    // Send emails in batch
    for (const log of pendingLogs) {
      try {
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${log.subscriber.unsubscribeToken}`;

        // Render email template
        const emailHtml = await render(
          CampaignEmailTemplate({
            subject: log.campaign.subject,
            title: log.campaign.title,
            content: log.campaign.content,
            imageUrl: log.campaign.imageUrl || undefined,
            recipientEmail: log.subscriber.email,
            unsubscribeUrl,
          })
        );

        // Send email via Resend
        await resend.emails.send({
          from: FROM_EMAIL,
          to: log.subscriber.email,
          subject: log.campaign.subject,
          html: emailHtml,
        });

        // Update log status
        await prisma.campaignEmailLog.update({
          where: { id: log.id },
          data: {
            status: "sent",
            sentAt: new Date(),
          },
        });

        successCount++;
      } catch (error) {
        console.error(`Failed to send email to ${log.subscriber.email}:`, error);

        // Update log with error
        await prisma.campaignEmailLog.update({
          where: { id: log.id },
          data: {
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error",
          },
        });

        failureCount++;
      }
    }

    // Get campaign progress
    const totalLogs = await prisma.campaignEmailLog.count({
      where: { campaignId },
    });
    const sentLogs = await prisma.campaignEmailLog.count({
      where: { campaignId, status: "sent" },
    });
    const failedLogs = await prisma.campaignEmailLog.count({
      where: { campaignId, status: "failed" },
    });
    const pendingCount = await prisma.campaignEmailLog.count({
      where: { campaignId, status: "pending" },
    });

    // Check if campaign is now complete (no pending emails left)
    if (pendingCount === 0 && totalLogs > 0) {
      // If there are failed emails, make ONE FINAL automatic retry attempt
      if (failedLogs > 0) {
        console.log(
          `🔄 Making final retry attempt for ${failedLogs} failed email(s)...`
        );

        // Reset failed emails to pending for final retry
        await prisma.campaignEmailLog.updateMany({
          where: {
            campaignId,
            status: "failed",
          },
          data: {
            status: "pending",
            error: null,
          },
        });

        // Get the failed emails for final retry
        const finalRetryLogs = await getPendingEmailLogs(
          campaignId,
          failedLogs
        );

        let finalRetrySuccess = 0;
        let finalRetryFailed = 0;

        // Attempt to send failed emails one last time
        for (const log of finalRetryLogs) {
          try {
            const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${log.subscriber.unsubscribeToken}`;

            const emailHtml = await render(
              CampaignEmailTemplate({
                subject: log.campaign.subject,
                title: log.campaign.title,
                content: log.campaign.content,
                imageUrl: log.campaign.imageUrl || undefined,
                recipientEmail: log.subscriber.email,
                unsubscribeUrl,
              })
            );

            await resend.emails.send({
              from: FROM_EMAIL,
              to: log.subscriber.email,
              subject: log.campaign.subject,
              html: emailHtml,
            });

            await prisma.campaignEmailLog.update({
              where: { id: log.id },
              data: {
                status: "sent",
                sentAt: new Date(),
              },
            });

            finalRetrySuccess++;
          } catch (error) {
            console.error(
              `Final retry failed for ${log.subscriber.email}:`,
              error
            );

            await prisma.campaignEmailLog.update({
              where: { id: log.id },
              data: {
                status: "failed",
                error:
                  error instanceof Error ? error.message : "Unknown error",
              },
            });

            finalRetryFailed++;
          }
        }

        console.log(
          `✅ Final retry completed: ${finalRetrySuccess} recovered, ${finalRetryFailed} permanently failed`
        );

        // Recalculate final stats after retry
        const finalSentLogs = await prisma.campaignEmailLog.count({
          where: { campaignId, status: "sent" },
        });
        const finalFailedLogs = await prisma.campaignEmailLog.count({
          where: { campaignId, status: "failed" },
        });

        // Get campaign details
        const campaign = await prisma.campaign.findUnique({
          where: { id: campaignId },
        });

        // Mark campaign as complete
        await prisma.campaign.update({
          where: { id: campaignId },
          data: {
            sent: true,
            sentAt: new Date(),
          },
        });

        // Send notification to admins
        if (campaign) {
          await notifyAdminsOfCompletion(
            campaign.title,
            finalSentLogs,
            finalFailedLogs
          );
        }

        // Create completion message
        let completionMessage = `Campaign completed! ${finalSentLogs}/${totalLogs} emails sent successfully.`;
        if (finalFailedLogs > 0) {
          completionMessage += ` ${finalFailedLogs} email(s) permanently failed after final retry - please review these addresses.`;
        }
        completionMessage += " Admins have been notified.";

        return {
          success: true,
          message: completionMessage,
        };
      }

      // No failed emails - campaign completed successfully
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
      });

      await prisma.campaign.update({
        where: { id: campaignId },
        data: {
          sent: true,
          sentAt: new Date(),
        },
      });

      if (campaign) {
        await notifyAdminsOfCompletion(campaign.title, sentLogs, 0);
      }

      return {
        success: true,
        message: `Campaign completed! All ${totalLogs} emails sent successfully. Admins have been notified.`,
      };
    }

    return {
      success: true,
      message: `Batch sent: ${successCount} succeeded, ${failureCount} failed. Progress: ${sentLogs}/${totalLogs} sent, ${pendingCount} pending.`,
    };
  } catch (error) {
    console.error("Error sending campaign batch:", error);
    return { success: false, message: "Failed to send batch." };
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
    notFound();
  }

  try {
    const total = await prisma.campaignEmailLog.count({
      where: { campaignId },
    });
    const sent = await prisma.campaignEmailLog.count({
      where: { campaignId, status: "sent" },
    });
    const failed = await prisma.campaignEmailLog.count({
      where: { campaignId, status: "failed" },
    });
    const pending = await prisma.campaignEmailLog.count({
      where: { campaignId, status: "pending" },
    });

    const emailsSentToday = await getEmailsSentToday();
    const remainingQuota = DAILY_LIMIT - emailsSentToday;

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
    notFound();
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

    return {
      success: true,
      message: `Reset ${result.count} failed emails to pending. You can now send the batch again.`,
    };
  } catch (error) {
    console.error("Error retrying failed emails:", error);
    return { success: false, message: "Failed to retry emails." };
  }
}
