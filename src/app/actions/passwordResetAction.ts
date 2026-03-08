"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResult } from "@/lib/types";
import { Resend } from "resend";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { ResetPasswordSchema } from "@/lib/validations/zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "GSM A/C <no-reply@gsmactx.com>";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gsmactx.com";

// Token expires in 1 hour
const TOKEN_EXPIRY_HOURS = 1;

/**
 * Request password reset - sends email with reset link
 */
export async function requestPasswordResetAction(
  email: string
): Promise<ActionResult> {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // Always return success to prevent email enumeration attacks
    if (!admin) {
      return {
        success: true,
        message: "If an account exists with this email, you will receive a password reset link.",
      };
    }

    // Generate reset token
    const resetToken = randomUUID();
    const resetExpires = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

    // Save token to database
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    // Send reset email
    const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: admin.email,
      subject: "Password Reset Request - GSM A/C Admin",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
            </div>

            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hello ${admin.name},</p>

              <p style="font-size: 16px; margin-bottom: 20px;">
                We received a request to reset your password for the GSM A/C Admin Panel.
              </p>

              <p style="font-size: 16px; margin-bottom: 20px;">
                Click the button below to create a new password:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}"
                   style="display: inline-block; background: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Reset Password
                </a>
              </div>

              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                This link will expire in <strong>${TOKEN_EXPIRY_HOURS} hour</strong>.
              </p>

              <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
                If you didn't request this password reset, you can safely ignore this email.
              </p>

              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">

              <p style="font-size: 12px; color: #999;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #4f46e5; word-break: break-all;">${resetUrl}</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return {
      success: true,
      message: "If an account exists with this email, you will receive a password reset link.",
    };
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return {
      success: false,
      message: "Failed to send reset email. Please try again.",
    };
  }
}

/**
 * Validate reset token - checks if token is valid and not expired
 */
export async function validateResetTokenAction(
  token: string
): Promise<{ valid: boolean; email?: string }> {
  if (!token) {
    return { valid: false };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { passwordResetToken: token },
      select: { email: true, passwordResetExpires: true },
    });

    if (!admin || !admin.passwordResetExpires) {
      return { valid: false };
    }

    // Check if token is expired
    if (new Date() > admin.passwordResetExpires) {
      return { valid: false };
    }

    return { valid: true, email: admin.email };
  } catch (error) {
    console.error("Error validating reset token:", error);
    return { valid: false };
  }
}

/**
 * Reset password - validates token and updates password
 */
export async function resetPasswordAction(
  token: string,
  data: { password: string; confirmPassword: string }
): Promise<ActionResult> {
  if (!token) {
    return { success: false, message: "Invalid reset link." };
  }

  // Validate password
  const validated = ResetPasswordSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Invalid password.",
    };
  }

  try {
    // Find admin with valid token
    const admin = await prisma.admin.findUnique({
      where: { passwordResetToken: token },
    });

    if (!admin || !admin.passwordResetExpires) {
      return { success: false, message: "Invalid or expired reset link." };
    }

    // Check if token is expired
    if (new Date() > admin.passwordResetExpires) {
      return {
        success: false,
        message: "This reset link has expired. Please request a new one.",
      };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validated.data.password, 12);

    // Update password and clear reset token
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return {
      success: true,
      message: "Password reset successfully. You can now log in with your new password.",
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, message: "Failed to reset password. Please try again." };
  }
}
