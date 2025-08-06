"use server";

import { prisma } from "@/libs/prisma";
import { UserFormData, UserSchema } from "@/libs/zod";
import { ActionResult } from "@/libs/types";

export async function saveEmailAction(
  data: UserFormData
): Promise<ActionResult> {
  const validateFields = UserSchema.safeParse(data);

  if (!validateFields.success) {
    throw new Error("Invalid input data.");
  }

  const { email, subscribe } = validateFields.data;

  if (!subscribe || !email) {
    return;
  }
  try {
    // Save the email data to the database
    await prisma.subscriber.upsert({
      where: { email },
      update: { isSubscribed: true },
      create: { email, isSubscribed: true },
    });
  } catch (error) {
    console.error("Error saving email:", error);
    throw new Error("Failed to save email");
  }
}
