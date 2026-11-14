"use server";

import { PublicAppointmentSchema, PublicAppointmentFormData } from "@/lib/validations/zod";
import { ActionResult } from "@/lib/types";
import { prisma } from "@/lib/db/prisma";
import { Resend } from "resend";
import { SERVICE_TYPE_LABELS } from "@/lib/interfaces";
import { formatPhone, formatPhoneForTel } from "@/lib/utils/phone";
import { escapeHtml } from "@/lib/utils/escapeHtml";
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

    // Everything typed by the visitor is escaped before it goes into HTML
    const safe = {
      name: escapeHtml(clientName),
      email: escapeHtml(clientEmail),
      phone: escapeHtml(formatPhone(clientPhone)),
      phoneTel: escapeHtml(formatPhoneForTel(clientPhone)),
      address: escapeHtml(address),
      notes: notes ? escapeHtml(notes) : "",
      time: escapeHtml(scheduledTime),
    };

    const detailRow = (label: string, value: string) => `
      <tr>
        <td style="padding: 8px 0; width: 96px; vertical-align: top; color: #5b6b7b; font-size: 14px;">${label}</td>
        <td style="padding: 8px 0; vertical-align: top; color: #12202e; font-size: 15px;">${value}</td>
      </tr>`;

    const appointmentRows = [
      detailRow("Service", serviceLabel),
      detailRow("Date", formattedDate),
      detailRow("Time", safe.time),
      detailRow("Address", safe.address),
      safe.notes ? detailRow("Notes", safe.notes) : "",
    ].join("");

    // Send emails in background using after() - non-blocking for faster response
    after(async () => {
      try {
        // Send both emails in parallel
        await Promise.all([
          // Confirmation email to client
          resend.emails.send({
            from: "GSM A/C <no-reply@gsmactx.com>",
            to: [clientEmail],
            subject: "We received your appointment request - GSM A/C",
            html: `
              <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #12202e;">
                <div style="background: #005898; padding: 28px 32px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; line-height: 1.3;">We received your appointment request</h1>
                </div>
                <div style="padding: 32px; background: #f6f8fa;">
                  <p style="font-size: 16px; line-height: 1.5; margin: 0 0 12px;">Hi ${safe.name},</p>
                  <p style="font-size: 16px; line-height: 1.5; margin: 0 0 24px;">Thanks for choosing GSM A/C &amp; General Contractor. Your appointment is not confirmed yet: we will call you shortly to confirm the time.</p>

                  <div style="background: #ffffff; border-radius: 8px; padding: 16px 20px; border: 1px solid #dbe5ef;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                      ${appointmentRows}
                    </table>
                  </div>

                  <p style="font-size: 15px; line-height: 1.5; margin: 24px 0 0;">Need to change something? Call us at <a href="tel:+12812354684" style="color: #005898; font-weight: bold;">(281) 235-4684</a>.</p>

                  <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #dbe5ef; font-size: 13px; line-height: 1.6; color: #5b6b7b;">
                    GSM A/C &amp; General Contractor INC<br>
                    Cypress, TX 77433<br>
                    <a href="tel:+12812354684" style="color: #5b6b7b;">(281) 235-4684</a>
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
              <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #12202e;">
                <div style="background: #005898; padding: 28px 32px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; line-height: 1.3;">New appointment request</h1>
                </div>
                <div style="padding: 32px; background: #f6f8fa;">
                  <p style="font-size: 16px; line-height: 1.5; margin: 0 0 24px;">Booked through the website. It is pending until you confirm it with the client.</p>

                  <div style="background: #ffffff; border-radius: 8px; padding: 16px 20px; border: 1px solid #dbe5ef;">
                    <h2 style="margin: 4px 0 4px; font-size: 15px; color: #12202e;">Client</h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                      ${detailRow("Name", safe.name)}
                      ${detailRow("Phone", `<a href="tel:${safe.phoneTel}" style="color: #005898;">${safe.phone}</a>`)}
                      ${detailRow("Email", `<a href="mailto:${safe.email}" style="color: #005898;">${safe.email}</a>`)}
                    </table>
                    <h2 style="margin: 20px 0 4px; padding-top: 16px; border-top: 1px solid #dbe5ef; font-size: 15px; color: #12202e;">Appointment</h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                      ${appointmentRows}
                    </table>
                  </div>

                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${appointment.id}"
                     style="display: inline-block; background: #005898; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 24px; font-weight: bold;">
                    Review and confirm
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
