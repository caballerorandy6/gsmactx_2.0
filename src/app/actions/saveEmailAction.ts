"use server";

import { prisma } from "@/lib/db/prisma";
import { UserFormData, UserSchema } from "@/lib/validations/zod";
import { ActionResult } from "@/lib/types";

export async function saveEmailAction(
  data: UserFormData
): Promise<ActionResult> {
  const validateFields = UserSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Invalid Data. Please check your input and try again.",
    };
  }

  const { email, firstName, lastName, phone, address, subscribe } = validateFields.data;

  if (!subscribe || !email) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  const fullName = `${firstName} ${lastName}`.trim();

  try {
    // Save the email data to the database
    await prisma.subscriber.upsert({
      where: { email },
      update: {
        isSubscribed: true,
        name: fullName || undefined,
        phone: phone || undefined,
        address: address || undefined,
      },
      create: {
        email,
        isSubscribed: true,
        name: fullName || null,
        phone: phone || null,
        address: address || null,
      },
    });
  } catch (error) {
    console.error("Error saving email:", error);
    return {
      success: false,
      message: "Failed to save email",
    };
  }
}
