import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Resend } from "resend";
import { render } from "@react-email/components";
import CampaignEmailTemplate from "@/components/admin/campaigns/CampaignEmailPreview";
import { notifyAdminsOfCompletion } from "@/lib/email/notifyAdminsOfCompletion";

const resend = new Resend(process.env.RESEND_API_KEY);
const DAILY_LIMIT = 100;
const FROM_EMAIL = process.env.FROM_EMAIL!;

/**
 * Check how many emails have been sent today across all campaigns
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
 * Cron job endpoint - runs daily at 8 AM CST (1 PM UTC)
 * Automatically sends pending campaign emails and notifies admins when complete
 */
export async function GET(request: Request) {
  try {
    // Verify this is a cron request (security)
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🚀 Starting automated campaign sending...");

    // Check daily quota
    const emailsSentToday = await getEmailsSentToday();
    const remainingQuota = DAILY_LIMIT - emailsSentToday;

    if (remainingQuota <= 0) {
      console.log("⚠️ Daily limit already reached");
      return NextResponse.json({
        success: false,
        message: "Daily limit already reached",
        emailsSentToday,
      });
    }

    console.log(`📊 Remaining quota: ${remainingQuota}/${DAILY_LIMIT}`);

    // Get all active campaigns with pending emails
    const campaignsWithPending = await prisma.campaign.findMany({
      where: {
        sent: false,
        emailLogs: {
          some: {
            status: "pending",
          },
        },
      },
      include: {
        emailLogs: {
          where: {
            status: "pending",
          },
          include: {
            subscriber: true,
          },
          take: remainingQuota,
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (campaignsWithPending.length === 0) {
      console.log("✅ No campaigns with pending emails");
      return NextResponse.json({
        success: true,
        message: "No campaigns with pending emails",
      });
    }

    console.log(
      `📧 Found ${campaignsWithPending.length} campaign(s) with pending emails`
    );

    let totalSent = 0;
    let totalFailed = 0;
    const completedCampaigns: Array<{ id: string; title: string; totalSent: number; totalFailed: number }> = [];

    // Process each campaign
    for (const campaign of campaignsWithPending) {
      if (totalSent >= remainingQuota) {
        console.log("⚠️ Reached daily quota");
        break;
      }

      const logsToSend = campaign.emailLogs.slice(0, remainingQuota - totalSent);
      console.log(
        `📤 Processing campaign "${campaign.title}": ${logsToSend.length} emails`
      );

      // Send emails for this campaign
      for (const log of logsToSend) {
        try {
          const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${log.subscriber.unsubscribeToken}`;

          // Render email template
          const emailHtml = await render(
            CampaignEmailTemplate({
              subject: campaign.subject,
              title: campaign.title,
              content: campaign.content,
              imageUrl: campaign.imageUrl || undefined,
              recipientEmail: log.subscriber.email,
              unsubscribeUrl,
            })
          );

          // Send email via Resend
          await resend.emails.send({
            from: FROM_EMAIL,
            to: log.subscriber.email,
            subject: campaign.subject,
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

          totalSent++;
        } catch (error) {
          console.error(`❌ Failed to send to ${log.subscriber.email}:`, error);

          // Update log with error
          await prisma.campaignEmailLog.update({
            where: { id: log.id },
            data: {
              status: "failed",
              error: error instanceof Error ? error.message : "Unknown error",
            },
          });

          totalFailed++;
        }
      }

      // Check if this campaign is now complete
      const remainingPending = await prisma.campaignEmailLog.count({
        where: {
          campaignId: campaign.id,
          status: "pending",
        },
      });

      if (remainingPending === 0) {
        // Campaign is complete when no pending emails remain
        // Parallel fetch: all counts are independent
        const [totalLogs, sentLogs, failedLogs] = await Promise.all([
          prisma.campaignEmailLog.count({
            where: { campaignId: campaign.id },
          }),
          prisma.campaignEmailLog.count({
            where: { campaignId: campaign.id, status: "sent" },
          }),
          prisma.campaignEmailLog.count({
            where: { campaignId: campaign.id, status: "failed" },
          }),
        ]);

        // Mark campaign as complete and save final stats
        await prisma.campaign.update({
          where: { id: campaign.id },
          data: {
            sent: true,
            sentAt: new Date(),
            totalEmails: totalLogs,
            sentCount: sentLogs,
            failedCount: failedLogs,
          },
        });

        completedCampaigns.push({
          id: campaign.id,
          title: campaign.title,
          totalSent: sentLogs,
          totalFailed: failedLogs,
        });

        console.log(`✅ Campaign "${campaign.title}" completed! Sent: ${sentLogs}, Failed: ${failedLogs}, Total: ${totalLogs}`);
      }
    }

    // Send admin notifications for completed campaigns
    for (const completedCampaign of completedCampaigns) {
      await notifyAdminsOfCompletion(completedCampaign);
    }

    console.log(
      `✅ Cron job completed: ${totalSent} sent, ${totalFailed} failed, ${completedCampaigns.length} campaign(s) completed`
    );

    return NextResponse.json({
      success: true,
      emailsSent: totalSent,
      emailsFailed: totalFailed,
      campaignsCompleted: completedCampaigns.length,
      completedCampaigns: completedCampaigns.map((c) => c.title),
    });
  } catch (error) {
    console.error("❌ Cron job error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
