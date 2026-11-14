"use server";

import { PublicAppointmentSchema, PublicAppointmentFormData } from "@/lib/validations/zod";
import { ActionResult } from "@/lib/types";
import { prisma } from "@/lib/db/prisma";
import { Resend } from "resend";
import { SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import { formatPhone } from "@/lib/utils/phone";
import { after } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export async function createPublicAppointmentAction(
  data: PublicAppointmentFormData,
  recaptchaToken: string
): Promise<ActionResult & { appointmentId?: string }> {
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

  // Validate data
  const validateFields = PublicAppointmentSchema.safeParse(data);

  if (!validateFields.success) {
    const errors = validateFields.error.issues
      .map((e) => e.message)
      .join(", ");
    return {
      success: false,
      message: errors || "Invalid data. Please check your input.",
    };
  }

  const {
    clientName,
    clientEmail,
    clientPhone,
    serviceType,
    scheduledDate,
    scheduledTime,
    address,
    notes,
  } = validateFields.data;

  // Parse the date string "YYYY-MM-DD" and create date at noon local time
  // This prevents timezone issues where UTC midnight becomes previous day in CST
  const [year, month, day] = scheduledDate.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day, 12, 0, 0);

  try {
    // Create appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        serviceType,
        scheduledDate: parsedDate,
        scheduledTime,
        address,
        notes: notes || null,
        status: "PENDING",
      },
    });

    // Format date for emails
    const formattedDate = parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const serviceLabel =
      SERVICE_TYPE_LABELS[serviceType as keyof typeof SERVICE_TYPE_LABELS] ||
      serviceType;

    // Send emails in background using after() - non-blocking for faster response
    after(async () => {
      try {
        // Send both emails in parallel
        await Promise.all([
          // Confirmation email to client
          resend.emails.send({
            from: "GSM A/C <no-reply@gsmactx.com>",
            to: [clientEmail],
            subject: "Appointment Confirmation - GSM A/C & General Contractor",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #005898; padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Appointment Confirmed</h1>
                </div>
                <div style="padding: 30px; background: #f9f9f9;">
                  <p style="font-size: 16px;">Dear <strong>${clientName}</strong>,</p>
                  <p style="font-size: 16px;">Thank you for scheduling an appointment with GSM A/C & General Contractor. Here are your appointment details:</p>

                  <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #dbe5ef;">
                    <p style="margin: 10px 0;"><strong>Service:</strong> ${serviceLabel}</p>
                    <p style="margin: 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
                    <p style="margin: 10px 0;"><strong>Time:</strong> ${scheduledTime}</p>
                    <p style="margin: 10px 0;"><strong>Address:</strong> ${address}</p>
                    ${notes ? `<p style="margin: 10px 0;"><strong>Notes:</strong> ${notes}</p>` : ""}
                  </div>

                  <p style="font-size: 14px; color: #666;">We will contact you shortly to confirm this appointment. If you need to make any changes, please call us at <strong>(281) 235-4684</strong>.</p>

                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="font-size: 14px; color: #666; margin: 0;">GSM A/C & General Contractor INC</p>
                    <p style="font-size: 14px; color: #666; margin: 5px 0;">Cypress, TX 77433</p>
                    <p style="font-size: 14px; color: #666; margin: 5px 0;">(281) 235-4684</p>
                  </div>
                </div>
              </div>
            `,
          }),
          // Notification email to admin
          resend.emails.send({
            from: "GSM A/C <no-reply@gsmactx.com>",
            to: ["contactus@gsmactx.com"],
            subject: `New Appointment Request: ${serviceLabel}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0;">New Appointment Request</h1>
                </div>
                <div style="padding: 30px; background: #f9f9f9;">
                  <p style="font-size: 16px;">A new appointment has been requested through the website.</p>

                  <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #dbe5ef;">
                    <h3 style="margin-top: 0; color: #059669;">Client Information</h3>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${clientName}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${clientEmail}</p>
                    <p style="margin: 10px 0;"><strong>Phone:</strong> ${formatPhone(clientPhone)}</p>

                    <h3 style="margin-top: 20px; color: #059669;">Appointment Details</h3>
                    <p style="margin: 10px 0;"><strong>Service:</strong> ${serviceLabel}</p>
                    <p style="margin: 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
                    <p style="margin: 10px 0;"><strong>Time:</strong> ${scheduledTime}</p>
                    <p style="margin: 10px 0;"><strong>Address:</strong> ${address}</p>
                    ${notes ? `<p style="margin: 10px 0;"><strong>Notes:</strong> ${notes}</p>` : ""}
                  </div>

                  <p style="font-size: 14px; color: #666;">Please review and confirm this appointment in the admin dashboard.</p>

                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${appointment.id}"
                     style="display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px;">
                    View Appointment
                  </a>
                </div>
              </div>
            `,
          }),
        ]);
        console.log("✅ Appointment confirmation emails sent successfully");
      } catch (error) {
        console.error("Failed to send appointment emails:", error);
      }
    });

    return {
      success: true,
      message: "Appointment scheduled successfully! You will receive a confirmation email shortly.",
      appointmentId: appointment.id,
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return {
      success: false,
      message: "Failed to schedule appointment. Please try again or call us directly.",
    };
  }
}
