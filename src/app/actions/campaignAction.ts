"use server";

import { CampaignSchema } from "@/libs/zod";
import { ActionResult } from "@/libs/types";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import { put } from "@vercel/blob";
import { Campaign } from "@/libs/interfaces";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

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

  const templateType = formData.get("templateType") as string | null;

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
      // EDITAR CAMPAÑA EXISTENTE
      await prisma.campaign.update({
        where: { id },
        data: { title, subject, content, imageUrl },
      });
      revalidatePath("/view-campaigns");
      return { success: true, message: "Campaign updated successfully." };
    } else {
      // CREAR NUEVA CAMPAÑA
      await prisma.campaign.create({
        data: {
          title,
          subject,
          content,
          imageUrl,
          templateType: templateType || "promotional",
          createdBy: user.id,
        },
      });
      revalidatePath("/view-campaigns");
      return {
        success: true,
        message: "Campaign created successfully.",
      };
    }
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
    revalidatePath("/view-campaigns");
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

export async function unsubscribeFromCampaignAction(
  token: string
): Promise<ActionResult> {
  if (!token) {
    return { success: false, message: "Unsubscribe token is missing." };
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!subscriber) {
      return { success: false, message: "Subscriber not found." };
    }

    await prisma.subscriber.update({
      where: { id: subscriber.id },
      data: { isSubscribed: false },
    });

    return { success: true, message: "Unsubscribed successfully." };
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return { success: false, message: "Failed to unsubscribe." };
  }
}

export async function subscribeToCampaignAction(
  email: string
): Promise<ActionResult> {
  if (!email || typeof email !== "string") {
    return { success: false, message: "A valid email is required." };
  }

  try {
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    // If the subscriber exists and is not subscribed, update their status
    if (existingSubscriber) {
      if (!existingSubscriber.isSubscribed) {
        await prisma.subscriber.update({
          where: { email },
          data: { isSubscribed: true },
        });
        return {
          success: true,
          message: "Subscribed successfully, welcome back!",
        };
      }
      return { success: false, message: "This email is already subscribed." };
    }

    // If the subscriber does not exist, create a new one
    await prisma.subscriber.create({
      data: { email, isSubscribed: true },
    });

    return { success: true, message: "Subscribed successfully, welcome!" };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: false, message: "Failed to subscribe." };
  }
}

export async function getCampaignByIdAction(
  id: string
): Promise<Campaign | null> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: { admin: true },
    });

    if (!campaign) {
      return null;
    }

    return campaign;
  } catch (error) {
    console.error("Error fetching campaign by ID:", error);
    return null;
  }
}

// Action to duplicate a campaign
export async function duplicateCampaignAction(
  id: string
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    notFound();
  }

  try {
    // Get the original campaign
    const originalCampaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!originalCampaign) {
      return { success: false, message: "Campaign not found." };
    }

    // Create a duplicate with "(Copy)" appended to the title
    await prisma.campaign.create({
      data: {
        title: `${originalCampaign.title} (Copy)`,
        subject: originalCampaign.subject,
        content: originalCampaign.content,
        imageUrl: originalCampaign.imageUrl,
        templateType: originalCampaign.templateType,
        createdBy: user.id,
        sent: false, // New duplicate is never sent
      },
    });

    revalidatePath("/view-campaigns");
    return { success: true, message: "Campaign duplicated successfully." };
  } catch (error) {
    console.error("Error duplicating campaign:", error);
    return { success: false, message: "Failed to duplicate campaign." };
  }
}
