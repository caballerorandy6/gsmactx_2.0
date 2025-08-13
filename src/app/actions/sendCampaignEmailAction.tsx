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

      for (const sub of subscribers) {
        try {
          // 1. Generate a unique unsubscribe token for the subscriber
          const unsubscribeToken = randomUUID();

            await prisma.subscriber.update({
            where: { id: sub.id }, 
            data: { unsubscribeToken: unsubscribeToken },
          });

          // 1. Prepare the email properties
          const emailProps: CampaignEmailProps = {
            subject: campaign.subject,
            title: campaign.title,
            content: campaign.content,
            imageUrl: campaign.imageUrl || undefined,
            recipientEmail: sub.email,
            unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${unsubscribeToken}`,
          };

          // 2. Render the personalized HTML for this subscriber
          const html = await render(<CampaignEmail {...emailProps} />);

          // 3. Send the email with the personalized HTML
          await resend.emails.send({
            from: "GSMACTX <no-reply@gsmactx.com>",
            to: sub.email,
            subject: campaign.subject,
            html,
            text: `${campaign.title}\n\n${campaign.content}`,
          });
          totalSent++;
        } catch (error) {
          console.error(`Failed to send email to ${sub.email}:`, error);
          totalFailed++;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      page++;
    }

    if (totalSent > 0) {
      await prisma.campaign.update({
        where: { id: id },
        data: { sent: true },
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
      message: `Campaign process finished. Sent: ${totalSent}, Failed: ${totalFailed}.`,
    };
  } catch (error) {
    console.error(
      "A critical error occurred during the campaign sending process:",
      error
    );
    return { success: false, message: "A critical error occurred." };
  }
}
