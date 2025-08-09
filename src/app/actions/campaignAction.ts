"use server";

import { Resend } from "resend";
import { CampaignSchema } from "@/libs/zod";
import { ActionResult } from "@/libs/types";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import { put } from "@vercel/blob";
import { Campaign } from "@/libs/interfaces";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import CampaignEmail, {
  CampaignEmailProps,
} from "@/components/admin-components/CampaignEmail";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

// Action to send or update campaign email
export async function upsertCampaignAction(
  formData: FormData
): Promise<ActionResult> {
  //Verify if the user is authenticated
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  // Extract FormData fields
  const rawData = {
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    subject: formData.get("subject"),
    content: formData.get("content"),
    image: formData.get("image"),
  };

  // Validate the input data
  const validateFields = CampaignSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Invalid input data",
    };
  }

  // Destructure the validated data
  const { id, image, title, subject, content } = validateFields.data;
  let imageUrl: string | undefined = undefined;

  try {
    if (image instanceof File && image.size > 0) {
      // Upload the image to Vercel Blob
      const blob = await put(image.name, image, {
        access: "public",
        allowOverwrite: true,
      });
      imageUrl = blob.url;
    } else if (typeof image === "string" && image.startsWith("http")) {
      imageUrl = image; // Use existing image URL
    }

    if (id) {
      await prisma.campaign.update({
        where: { id },
        data: { title, subject, content, imageUrl },
      });
      revalidatePath("/campaign-list");
      return { success: true, message: "Campaign updated successfully." };
    } else {
      await prisma.campaign.create({
        data: {
          title,
          subject,
          content,
          imageUrl,
          createdBy: user.id,
        },
      });
    }
    revalidatePath("/campaign-list");
    return {
      success: true,
      message: id
        ? "Campaign updated successfully."
        : "Campaign created successfully.",
    };
  } catch (error) {
    console.error("Error to save campaign:", error);
    return { success: false, message: "Failed to save campaign." };
  }
}

// Action to delete a campaign
export const deleteCampaignAction = async (
  id: string
): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    await prisma.campaign.delete({
      where: { id },
    });
    revalidatePath("/campaign-list");
    return { success: true, message: "Campaign deleted successfully." };
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return { success: false, message: "Failed to delete campaign." };
  }
};

// Action to get the list of campaigns
export async function getCampaignsListAction(): Promise<Campaign[]> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    const campaigns = await prisma.campaign.findMany({
      where: { createdBy: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        admin: true,
      },
    });
    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

export async function sendCampaignEmailAction(data: {
  id: string;
}): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const { id } = data;

  if (!id) {
    return { success: false, message: "Campaign ID is required" };
  }

  // Buscar campaña
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) {
    return { success: false, message: "Campaign not found" };
  }

  // Obtener suscriptores suscritos en lotes (paginación simple para evitar sobrecarga)
  const batchSize = 100;
  let page = 0;
  let hasMore = true;
  let totalSent = 0;

  try {
    while (hasMore) {
      const subscribers = await prisma.subscriber.findMany({
        where: { isSubscribed: true },
        skip: page * batchSize,
        take: batchSize,
      });

      if (subscribers.length === 0) {
        hasMore = false;
        if (totalSent === 0) {
          return { success: false, message: "No subscribers found." };
        }
        break;
      }

      // Emails Props
      const emailProps: CampaignEmailProps = {
        subject: campaign.subject,
        title: campaign.title,
        content: campaign.content,
        imageUrl: campaign.imageUrl || undefined,
      };

      // Rendering the email HTML
      const html = await render(CampaignEmail(emailProps));

      // Send emails using Resend
      await Promise.all(
        subscribers.map((sub) =>
          resend.emails.send({
            from: "GSMACTX <no-reply@gsmactx.com>",
            to: sub.email,
            subject: campaign.subject,
            html,
            text: `${campaign.title}\n\n${campaign.content}\n\nCall Us: +1 (281) 235-4684`,
          })
        )
      );

      revalidatePath("/campaign-list");

      totalSent += subscribers.length;
      page++;
    }

    return {
      success: true,
      message: `Campaign sent to ${totalSent} subscribers.`,
    };
  } catch (error) {
    console.error("Error sending campaign emails:", error);
    return { success: false, message: "Failed to send campaign emails." };
  }
}
