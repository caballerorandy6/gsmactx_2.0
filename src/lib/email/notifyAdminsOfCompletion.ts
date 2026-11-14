import { Resend } from "resend";
import { prisma } from "@/lib/db/prisma";
import { buildCampaignCompletedEmail } from "@/lib/email/campaignCompletedEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "GSMACTX <no-reply@gsmactx.com>";

interface CompletedCampaign {
  id: string;
  title: string;
  totalSent: number;
  totalFailed: number;
}

/**
 * Tell every admin that a campaign finished sending.
 * Shared by the manual send action and the daily cron job.
 */
export async function notifyAdminsOfCompletion(campaign: CompletedCampaign) {
  try {
    const admins = await prisma.admin.findMany({
      select: { email: true, name: true },
    });

    if (admins.length === 0) {
      console.warn("No admins found to notify");
      return;
    }

    const completedAt = new Date();
    const campaignUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/view-campaigns/${campaign.id}`;

    const notifications = admins.map(async (admin) => {
      const { subject, html } = buildCampaignCompletedEmail({
        adminName: admin.name,
        campaignTitle: campaign.title,
        campaignUrl,
        totalSent: campaign.totalSent,
        totalFailed: campaign.totalFailed,
        completedAt,
      });

      try {
        await resend.emails.send({ from: FROM_EMAIL, to: admin.email, subject, html });
      } catch (error) {
        console.error(`Failed to notify admin ${admin.email}:`, error);
      }
    });

    await Promise.allSettled(notifications);
    console.log(
      `Completion notifications sent to ${admins.length} admin(s) for campaign: ${campaign.title}`
    );
  } catch (error) {
    console.error("Error sending admin notifications:", error);
  }
}
