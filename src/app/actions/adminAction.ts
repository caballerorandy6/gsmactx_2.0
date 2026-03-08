"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResult } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

// Validation schemas
const CreateAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

const UpdateAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

// Get all admins
export async function getAdminsAction(): Promise<AdminUser[]> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: { name: "asc" },
    });
    return admins;
  } catch (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
}

// Create new admin
export async function createAdminAction(data: {
  name: string;
  email: string;
  password: string;
}): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  const validated = CreateAdminSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Invalid data",
    };
  }

  const { name, email, password } = validated.data;

  try {
    // Check if email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return {
        success: false,
        message: "An admin with this email already exists.",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    revalidatePath("/settings");
    return { success: true, message: "Admin created successfully." };
  } catch (error) {
    console.error("Error creating admin:", error);
    return { success: false, message: "Failed to create admin." };
  }
}

// Update admin
export async function updateAdminAction(
  id: string,
  data: { name: string; email: string }
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  const validated = UpdateAdminSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Invalid data",
    };
  }

  const { name, email } = validated.data;

  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      return { success: false, message: "Admin not found." };
    }

    // Check if email is being changed and if new email already exists
    if (email !== existingAdmin.email) {
      const emailExists = await prisma.admin.findUnique({
        where: { email },
      });
      if (emailExists) {
        return { success: false, message: "This email is already in use." };
      }
    }

    await prisma.admin.update({
      where: { id },
      data: { name, email },
    });

    revalidatePath("/settings");
    return { success: true, message: "Admin updated successfully." };
  } catch (error) {
    console.error("Error updating admin:", error);
    return { success: false, message: "Failed to update admin." };
  }
}

// Delete admin
export async function deleteAdminAction(id: string): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  try {
    // Prevent deleting yourself
    if (user.id === id) {
      return {
        success: false,
        message: "You cannot delete your own account.",
      };
    }

    // Check if this is the last admin
    const adminCount = await prisma.admin.count();
    if (adminCount <= 1) {
      return {
        success: false,
        message: "Cannot delete the last admin account.",
      };
    }

    await prisma.admin.delete({
      where: { id },
    });

    revalidatePath("/settings");
    return { success: true, message: "Admin deleted successfully." };
  } catch (error) {
    console.error("Error deleting admin:", error);
    return { success: false, message: "Failed to delete admin." };
  }
}

// Change password
export async function changePasswordAction(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<ActionResult> {
  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  const validated = ChangePasswordSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Invalid data",
    };
  }

  const { currentPassword, newPassword } = validated.data;

  try {
    // Get admin with password
    const admin = await prisma.admin.findUnique({
      where: { id: user.id },
    });

    if (!admin) {
      return { success: false, message: "Admin not found." };
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
    if (!isValidPassword) {
      return { success: false, message: "Current password is incorrect." };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.admin.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Password changed successfully." };
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, message: "Failed to change password." };
  }
}
