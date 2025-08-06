"use server";

import { Resend } from "resend";
import { UserFormData, UserSchema } from "@/libs/zod";
import { ActionResult } from "@/libs/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailContactAction(
  data: UserFormData
): Promise<ActionResult> {
  const validateFields = UserSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid Data. Please check your input and try again." };
  }

  const { firstName, lastName, phone, email, message } = validateFields.data;

  if (!email || !firstName || !lastName || !phone) {
    return { error: "All fields are required." };
  }

  try {
    // Send the email using your preferred email service
    await resend.emails.send({
      from: "GSMACTX <no-reply@gsmactx.com>",
      to: ["contactus@gsmactx.com"],
      subject: `New message from ${firstName} ${lastName}`,
      text: `You have received a new message from ${firstName} ${lastName}.\n\nCustomer request details:\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
