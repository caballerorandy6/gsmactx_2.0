"use server";

import { prisma } from "@/libs/prisma";
import { AdminSchema, AdminFormData } from "@/libs/zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResult } from "@/libs/types";

export async function loginAction(data: AdminFormData): Promise<ActionResult> {
  // Validate the input data using Zod schema
  const validateFields = AdminSchema.safeParse(data);

  if (!validateFields.success) {
    return { success: false, message: "Invalid input data" };
  }

  const { email, password } = validateFields.data;

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  try {
    // Find the admin by email
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin || !admin.password) {
      return { success: false, message: "Invalid email or password" };
    }

    // Check if the password is valid
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password" };
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set the token in the cookies
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch {
    return { success: false, message: "Internal server error" };
  }
  // Redirect to the admin dashboard, never use inside a try/catch block
  redirect("/admin-dashboard");
}
