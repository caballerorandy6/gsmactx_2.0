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

export async function sendCampaignEmailAction(data: {
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

  // Check if campaign was already sent
  if (campaign.sent) {
    return { success: false, message: "Campaign already sent" };
  }

  const batchSize = 100;
  let page = 0;
  let hasMore = true;
  let totalSent = 0;
  let totalFailed = 0;

  try {
    while (hasMore) {
      const subscribers = await prisma.subscriber.findMany({
        where: { isSubscribed: true },
        skip: page * batchSize,
        take: batchSize,
      });

      if (subscribers.length === 0) {
        hasMore = false;
        break;
      }

      // 1. Pre-generate unsubscribe tokens for subscribers without one
      const subscribersToUpdate = subscribers.filter(sub => !sub.unsubscribeToken);

      if (subscribersToUpdate.length > 0) {
        await Promise.all(
          subscribersToUpdate.map(sub =>
            prisma.subscriber.update({
              where: { id: sub.id },
              data: { unsubscribeToken: randomUUID() },
            })
          )
        );

        // Refresh subscribers data with new tokens
        const updatedSubs = await prisma.subscriber.findMany({
          where: {
            id: { in: subscribersToUpdate.map(s => s.id) }
          },
        });

        // Update the subscribers array with new tokens
        subscribersToUpdate.forEach(sub => {
          const updated = updatedSubs.find(u => u.id === sub.id);
          if (updated) {
            sub.unsubscribeToken = updated.unsubscribeToken;
          }
        });
      }

      // 2. Prepare batch of emails for Resend
      const emailBatch = await Promise.all(
        subscribers.map(async (sub) => {
          const emailProps: CampaignEmailProps = {
            subject: campaign.subject,
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
            subject: campaign.subject,
            html,
            text: `${campaign.title}\n\n${campaign.content}`,
            subscriberId: sub.id,
          };
        })
      );

      // 3. Send batch using Resend (max 100 emails per batch)
      try {
        // Create pending email logs
        await prisma.campaignEmailLog.createMany({
          data: emailBatch.map(email => ({
            campaignId: id,
            subscriberId: email.subscriberId,
            status: "pending",
          })),
          skipDuplicates: true,
        });

        // Prepare emails for Resend (remove subscriberId as it's not needed)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const emailsForResend = emailBatch.map(({ subscriberId, ...email }) => email);

        // Send in smaller chunks if batch is too large
        const chunkSize = 100;
        for (let i = 0; i < emailsForResend.length; i += chunkSize) {
          const chunk = emailsForResend.slice(i, i + chunkSize);
          const subscriberChunk = emailBatch.slice(i, i + chunkSize);

          try {
            // Use batch.send for multiple emails
            await resend.batch.send(chunk);

            // Update status to sent for successful emails
            await prisma.campaignEmailLog.updateMany({
              where: {
                campaignId: id,
                subscriberId: { in: subscriberChunk.map(e => e.subscriberId) },
                status: "pending",
              },
              data: {
                status: "sent",
                sentAt: new Date(),
              },
            });

            totalSent += chunk.length;
          } catch (error) {
            console.error(`Failed to send batch chunk:`, error);

            // Mark as failed
            await prisma.campaignEmailLog.updateMany({
              where: {
                campaignId: id,
                subscriberId: { in: subscriberChunk.map(e => e.subscriberId) },
                status: "pending",
              },
              data: {
                status: "failed",
                error: error instanceof Error ? error.message : "Unknown error",
              },
            });

            totalFailed += chunk.length;
          }

          // Small delay between chunks to respect rate limits
          if (i + chunkSize < emailsForResend.length) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      } catch (error) {
        console.error(`Failed to process batch:`, error);
        totalFailed += emailBatch.length;
      }

      page++;
    }

    // Update campaign status
    if (totalSent > 0) {
      await prisma.campaign.update({
        where: { id: id },
        data: {
          sent: true,
          sentAt: new Date(),
        },
      });
    }

    revalidatePath("/view-campaigns");

    if (totalSent === 0) {
      return {
        success: false,
        message: "No subscribed users found or all emails failed.",
      };
    }

    return {
      success: true,
      message: `Campaign sent successfully! Sent: ${totalSent}${totalFailed > 0 ? `, Failed: ${totalFailed}` : ""}.`,
    };
  } catch (error) {
    console.error(
      "A critical error occurred during the campaign sending process:",
      error
    );
    return { success: false, message: "A critical error occurred." };
  }
}
