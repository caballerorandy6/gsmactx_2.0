"use server";

import { Resend } from "resend";
import { UserFormData, UserSchema } from "@/lib/validations/zod";
import { ActionResult } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export async function sendEmailContactAction(
  data: UserFormData,
  recaptchaToken: string
): Promise<ActionResult> {
  // Verify reCAPTCHA token
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not defined");
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    };
  }

  try {
    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData: RecaptchaResponse = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error("reCAPTCHA verification failed:", recaptchaData);
      return {
        success: false,
        message: "reCAPTCHA verification failed. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return {
      success: false,
      message: "Failed to verify reCAPTCHA. Please try again.",
    };
  }

  const validateFields = UserSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Invalid Data. Please check your input and try again.",
    };
  }

  const { firstName, lastName, phone, email, message } = validateFields.data;

  if (!email || !firstName || !lastName || !phone) {
    return { success: false, message: "All fields are required." };
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
