"use server";

import { Resend } from "resend";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import { cookies } from "next/headers";
import CampaignEmail from "@/components/admin-components/CampaignEmail";
import { render } from "@react-email/render";
import { CampaignEmailProps } from "@/libs/interfaces";

const resend = new Resend(process.env.RESEND_API_KEY);

// Test emails for campaign testing
const TEST_EMAILS = [
  "caballerorandy7@gmail.com",
  "caballerorandy6@gmail.com",
  "yani.cruz4997@gmail.com",
  "contactus@rcweb.dev",
  "gsmactx@outlook.com",
  "michel@gsmactx.com",
];

export async function sendTestCampaignAction(data: {
  id: string;
}): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const { id } = data;
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) {
    return { success: false, message: "Campaign not found" };
  }

  let totalSent = 0;
  let totalFailed = 0;

  try {
    // Get only test subscribers
    const subscribers = await prisma.subscriber.findMany({
      where: {
        email: { in: TEST_EMAILS },
        isSubscribed: true,
      },
    });

    if (subscribers.length === 0) {
      return {
        success: false,
        message:
          "No test subscribers found. Please ensure test emails are in the database.",
      };
    }

    // Pre-generate unsubscribe tokens for subscribers without one
    const subscribersToUpdate = subscribers.filter(
      (sub) => !sub.unsubscribeToken
    );

    if (subscribersToUpdate.length > 0) {
      await Promise.all(
        subscribersToUpdate.map((sub) =>
          prisma.subscriber.update({
            where: { id: sub.id },
            data: { unsubscribeToken: randomUUID() },
          })
        )
      );

      // Refresh subscribers data with new tokens
      const updatedSubs = await prisma.subscriber.findMany({
        where: {
          id: { in: subscribersToUpdate.map((s) => s.id) },
        },
      });

      // Update the subscribers array with new tokens
      subscribersToUpdate.forEach((sub) => {
        const updated = updatedSubs.find((u) => u.id === sub.id);
        if (updated) {
          sub.unsubscribeToken = updated.unsubscribeToken;
        }
      });
    }

    // Prepare emails for test subscribers
    const emailBatch = await Promise.all(
      subscribers.map(async (sub) => {
        const emailProps: CampaignEmailProps = {
          subject: `[TEST] ${campaign.subject}`,
          title: campaign.title,
          content: campaign.content,
          imageUrl: campaign.imageUrl || undefined,
          recipientEmail: sub.email,
          unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${sub.unsubscribeToken}`,
        };

        const html = await render(<CampaignEmail {...emailProps} />);

        return {
          from: "GSMACTX <no-reply@gsmactx.com>",
          to: sub.email,
          subject: `[TEST] ${campaign.subject}`,
          html,
          text: `${campaign.title}\n\n${campaign.content}`,
          subscriberId: sub.id,
        };
      })
    );

    // Create test email logs
    await prisma.campaignEmailLog.createMany({
      data: emailBatch.map((email) => ({
        campaignId: id,
        subscriberId: email.subscriberId,
        status: "pending",
      })),
      skipDuplicates: true,
    });

    try {
      // Send test emails (remove subscriberId as it's not needed by Resend)
      const emailsForResend = emailBatch.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ subscriberId, ...email }) => email
      );
      await resend.batch.send(emailsForResend);

      // Update status to sent
      await prisma.campaignEmailLog.updateMany({
        where: {
          campaignId: id,
          subscriberId: { in: emailBatch.map((e) => e.subscriberId) },
          status: "pending",
        },
        data: {
          status: "sent",
          sentAt: new Date(),
        },
      });

      totalSent = emailsForResend.length;
    } catch (error) {
      console.error(`Failed to send test emails:`, error);

      // Mark as failed
      await prisma.campaignEmailLog.updateMany({
        where: {
          campaignId: id,
          subscriberId: { in: emailBatch.map((e) => e.subscriberId) },
          status: "pending",
        },
        data: {
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        },
      });

      totalFailed = emailBatch.length;
    }

    revalidatePath("/view-campaigns");

    if (totalSent === 0) {
      return {
        success: false,
        message: "All test emails failed to send.",
      };
    }

    return {
      success: true,
      message: `Test campaign sent successfully to ${totalSent} test email(s)${totalFailed > 0 ? `, Failed: ${totalFailed}` : ""}.`,
    };
  } catch (error) {
    console.error(
      "A critical error occurred during test campaign sending:",
      error
    );
    return { success: false, message: "A critical error occurred." };
  }
}
