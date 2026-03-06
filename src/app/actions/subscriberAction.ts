"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResult } from "@/lib/types";
import { Subscriber } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { randomUUID } from "crypto";
import { isValidUSPhone } from "@/lib/utils/phone";

// Schema for subscriber validation
const SubscriberSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    isSubscribed: z.boolean().optional().default(true),
  })
  .refine(
    (data) => {
      const hasEmail = data.email && data.email.trim() !== "";
      const hasPhone = data.phone && data.phone.trim() !== "";
      return hasEmail || hasPhone;
    },
    { message: "At least email or phone is required" }
  )
  .refine(
    (data) => {
      if (data.phone && data.phone.trim() !== "") {
        return isValidUSPhone(data.phone);
      }
      return true;
    },
    { message: "Please enter a valid 10-digit US phone number" }
  );

type SubscriberInput = {
  name?: string;
  email?: string;
  phone?: string;
  isSubscribed?: boolean;
};

// Get all subscribers (contacts)
export async function getSubscribersAction(): Promise<Subscriber[]> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return subscribers;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

// Create a new subscriber (contact)
export async function createSubscriberAction(
  data: SubscriberInput
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  const validated = SubscriberSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Invalid data",
    };
  }

  const { name, email, phone } = validated.data;
  const trimmedEmail = email?.trim() || null;
  const trimmedPhone = phone?.trim() || null;
  const trimmedName = name?.trim() || null;

  try {
    // Check if email already exists (if provided)
    if (trimmedEmail) {
      const existingByEmail = await prisma.subscriber.findUnique({
        where: { email: trimmedEmail },
      });
      if (existingByEmail) {
        return {
          success: false,
          message: "This email is already registered.",
        };
      }
    }

    await prisma.subscriber.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        isSubscribed: true,
        unsubscribeToken: trimmedEmail ? randomUUID() : null,
      },
    });

    revalidatePath("/contacts");
    return { success: true, message: "Contact created successfully." };
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return { success: false, message: "Failed to create contact." };
  }
}

// Update a subscriber (contact)
export async function updateSubscriberAction(
  id: string,
  data: SubscriberInput
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { id },
    });

    if (!existingSubscriber) {
      return { success: false, message: "Contact not found." };
    }

    // Build update data, keeping existing values if not provided
    const updateEmail = data.email !== undefined ? (data.email.trim() || null) : existingSubscriber.email;
    const updatePhone = data.phone !== undefined ? (data.phone.trim() || null) : existingSubscriber.phone;
    const updateName = data.name !== undefined ? (data.name.trim() || null) : existingSubscriber.name;

    // Validate that at least email or phone exists after update
    if (!updateEmail && !updatePhone) {
      return {
        success: false,
        message: "At least email or phone is required.",
      };
    }

    // Validate email format if provided
    if (updateEmail) {
      const emailSchema = z.string().email();
      const emailResult = emailSchema.safeParse(updateEmail);
      if (!emailResult.success) {
        return { success: false, message: "Invalid email address." };
      }
    }

    // Validate phone format if provided
    if (updatePhone && !isValidUSPhone(updatePhone)) {
      return { success: false, message: "Please enter a valid 10-digit US phone number." };
    }

    // Check if email is being changed and if new email already exists
    if (updateEmail && updateEmail !== existingSubscriber.email) {
      const emailExists = await prisma.subscriber.findUnique({
        where: { email: updateEmail },
      });
      if (emailExists) {
        return { success: false, message: "This email is already registered." };
      }
    }

    await prisma.subscriber.update({
      where: { id },
      data: {
        name: updateName,
        email: updateEmail,
        phone: updatePhone,
        ...(typeof data.isSubscribed === "boolean" && {
          isSubscribed: data.isSubscribed,
        }),
        // Add unsubscribe token if email is added for the first time
        ...(!existingSubscriber.email && updateEmail && {
          unsubscribeToken: randomUUID(),
        }),
      },
    });

    revalidatePath("/contacts");
    return { success: true, message: "Contact updated successfully." };
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return { success: false, message: "Failed to update contact." };
  }
}

// Delete a subscriber (contact)
export async function deleteSubscriberAction(
  id: string
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { id },
    });

    if (!existingSubscriber) {
      return { success: false, message: "Contact not found." };
    }

    await prisma.subscriber.delete({
      where: { id },
    });

    revalidatePath("/contacts");
    return { success: true, message: "Contact deleted successfully." };
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return { success: false, message: "Failed to delete contact." };
  }
}

// Get a single subscriber by ID
export async function getSubscriberByIdAction(
  id: string
): Promise<Subscriber | null> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { id },
    });
    return subscriber;
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    return null;
  }
}
