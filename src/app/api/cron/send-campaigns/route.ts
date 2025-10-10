import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Resend } from "resend";
import { render } from "@react-email/components";
import CampaignEmailTemplate from "@/components/admin-components/CampaignEmailPreview";

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
 * Send completion notification to all admins
 */
async function notifyAdminsOfCompletion(
  campaignTitle: string,
  totalSent: number
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
                  <p style="margin: 10px 0;"><strong>Completed:</strong> ${new Date().toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}</p>
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
    const completedCampaigns: Array<{ title: string; totalSent: number }> = [];

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
        // Check if all emails were sent (no failed ones left)
        const totalLogs = await prisma.campaignEmailLog.count({
          where: { campaignId: campaign.id },
        });
        const sentLogs = await prisma.campaignEmailLog.count({
          where: { campaignId: campaign.id, status: "sent" },
        });

        if (sentLogs === totalLogs) {
          // Mark campaign as complete
          await prisma.campaign.update({
            where: { id: campaign.id },
            data: {
              sent: true,
              sentAt: new Date(),
            },
          });

          completedCampaigns.push({
            title: campaign.title,
            totalSent: sentLogs,
          });

          console.log(`✅ Campaign "${campaign.title}" completed!`);
        }
      }
    }

    // Send admin notifications for completed campaigns
    for (const completedCampaign of completedCampaigns) {
      await notifyAdminsOfCompletion(
        completedCampaign.title,
        completedCampaign.totalSent
      );
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
