"use server";

import { Resend } from "resend";
import { randomUUID } from "crypto";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import { cookies } from "next/headers";
import CampaignEmail from "@/components/admin-components/CampaignEmail";
import { render } from "@react-email/render";
import { CampaignEmailProps } from "@/libs/interfaces";
import { put } from "@vercel/blob";

const resend = new Resend(process.env.RESEND_API_KEY);

// Test emails for campaign testing
const TEST_EMAILS = [
  "caballerorandy7@gmail.com",
  "caballerorandy6@gmail.com",
  "yani.cruz4997@gmail.com",
];

export async function createAndSendTestCampaignAction(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  // Extract form data
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title || !subject || !content) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    let imageUrl: string | undefined;

    // Upload image if provided (same logic as campaignAction)
    if (imageFile instanceof File && imageFile.size > 0) {
      // Upload the image to Vercel Blob
      const blob = await put(imageFile.name, imageFile, {
        access: "public",
        allowOverwrite: true,
      });
      imageUrl = blob.url;
    }

    // Get test subscribers
    const subscribers = await prisma.subscriber.findMany({
      where: {
        email: { in: TEST_EMAILS },
        isSubscribed: true,
      },
    });

    if (subscribers.length === 0) {
      return {
        success: false,
        message: "No test subscribers found. Please ensure test emails are in the database.",
      };
    }

    // Pre-generate unsubscribe tokens for subscribers without one
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

    // Prepare emails for test subscribers
    const emailBatch = await Promise.all(
      subscribers.map(async (sub) => {
        const emailProps: CampaignEmailProps = {
          subject: `[TEST] ${subject}`,
          title,
          content,
          imageUrl,
          recipientEmail: sub.email,
          unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${sub.unsubscribeToken}`,
        };

        const html = await render(<CampaignEmail {...emailProps} />);

        return {
          from: "GSMACTX <no-reply@gsmactx.com>",
          to: sub.email,
          subject: `[TEST] ${subject}`,
          html,
          text: `${title}\n\n${content}`,
        };
      })
    );

    // Send test emails immediately
    await resend.batch.send(emailBatch);

    return {
      success: true,
      message: `Test campaign sent successfully to ${emailBatch.length} test email(s)!`,
    };
  } catch (error) {
    console.error("Error creating and sending test campaign:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send test campaign",
    };
  }
}
