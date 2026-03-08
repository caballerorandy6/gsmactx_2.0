/**
 * Integration Tests para adminAction.ts
 *
 * Estas acciones manejan:
 * - getAdminsAction() - Listar admins
 * - createAdminAction() - Crear admin
 * - updateAdminAction() - Actualizar admin
 * - deleteAdminAction() - Eliminar admin
 * - changePasswordAction() - Cambiar contraseña
 *
 * Usamos mocks para Prisma, cookies, bcrypt, etc.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  mockPrisma,
  mockPrismaAdmin,
  mockGetCurrentUser,
  mockRevalidatePath,
  resetAllMocks,
  testAdmin,
  testAdminList,
} from "../mocks";

// ============================================================
// Setup: Mockear módulos ANTES de importar las acciones
// ============================================================

// Mock Prisma
vi.mock("@/lib/db/prisma", () => ({
  prisma: mockPrisma,
}));

// Mock getCurrentUser
vi.mock("@/lib/auth/getCurrentUser", () => ({
  getCurrentUser: mockGetCurrentUser,
}));

// Mock cookies de next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: "mock-token" })),
  })),
}));

// Mock redirect de next/navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new Error(`NEXT_REDIRECT:${path}`);
  }),
}));

// Mock revalidatePath de next/cache
vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));

// Mock bcrypt
vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn((password: string) => Promise.resolve(`hashed_${password}`)),
    compare: vi.fn((password: string, hash: string) =>
      Promise.resolve(hash === `hashed_${password}`)
    ),
  },
}));

// ============================================================
// Importar acciones DESPUÉS de configurar los mocks
// ============================================================

import {
  getAdminsAction,
  createAdminAction,
  updateAdminAction,
  deleteAdminAction,
  changePasswordAction,
} from "@/app/actions/adminAction";

// ============================================================
// Tests
// ============================================================

describe("adminAction", () => {
  beforeEach(() => {
    resetAllMocks();
    // Por defecto, el usuario está autenticado
    mockGetCurrentUser.mockResolvedValue(testAdmin);
  });

  // --------------------------------------------------------
  // getAdminsAction
  // --------------------------------------------------------

  describe("getAdminsAction", () => {
    it("should return list of admins when authenticated", async () => {
      mockPrismaAdmin.findMany.mockResolvedValue(testAdminList);

      const result = await getAdminsAction();

      expect(result).toEqual(testAdminList);
      expect(mockPrismaAdmin.findMany).toHaveBeenCalledWith({
        select: { id: true, name: true, email: true },
        orderBy: { name: "asc" },
      });
    });

    it("should redirect to login when not authenticated", async () => {
      mockGetCurrentUser.mockResolvedValue(null);

      await expect(getAdminsAction()).rejects.toThrow("NEXT_REDIRECT:/login");
    });

    it("should return empty array on database error", async () => {
      mockPrismaAdmin.findMany.mockRejectedValue(new Error("DB Error"));

      const result = await getAdminsAction();

      expect(result).toEqual([]);
    });
  });

  // --------------------------------------------------------
  // createAdminAction
  // --------------------------------------------------------

  describe("createAdminAction", () => {
    const validAdminData = {
      name: "New Admin",
      email: "newadmin@test.com",
      password: "SecurePass123!",
    };

    it("should create admin with valid data", async () => {
      mockPrismaAdmin.findUnique.mockResolvedValue(null); // Email no existe
      mockPrismaAdmin.create.mockResolvedValue({ id: "new-admin-id" });

      const result = await createAdminAction(validAdminData);

      expect(result.success).toBe(true);
      expect(result.message).toBe("Admin created successfully.");
      expect(mockPrismaAdmin.create).toHaveBeenCalled();
      expect(mockRevalidatePath).toHaveBeenCalledWith("/settings");
    });

    it("should reject duplicate email", async () => {
      mockPrismaAdmin.findUnique.mockResolvedValue(testAdmin); // Email ya existe

      const result = await createAdminAction(validAdminData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("An admin with this email already exists.");
    });

    it("should reject invalid email format", async () => {
      const result = await createAdminAction({
        name: "Test",
        email: "invalid-email",
        password: "SecurePass123!",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("email");
    });

    it("should reject short password", async () => {
      const result = await createAdminAction({
        name: "Test",
        email: "test@test.com",
        password: "short",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("8 characters");
    });

    it("should reject password without uppercase", async () => {
      const result = await createAdminAction({
        name: "Test",
        email: "test@test.com",
        password: "lowercase123!",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("uppercase");
    });

    it("should reject password without number", async () => {
      const result = await createAdminAction({
        name: "Test",
        email: "test@test.com",
        password: "NoNumberHere!",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("number");
    });

    it("should reject password without special character", async () => {
      const result = await createAdminAction({
        name: "Test",
        email: "test@test.com",
        password: "NoSpecial123",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("special");
    });

    it("should reject short name", async () => {
      const result = await createAdminAction({
        name: "A",
        email: "test@test.com",
        password: "SecurePass123!",
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("2 characters");
    });

    it("should redirect when not authenticated", async () => {
      mockGetCurrentUser.mockResolvedValue(null);

      await expect(createAdminAction(validAdminData)).rejects.toThrow(
        "NEXT_REDIRECT:/login"
      );
    });
  });

  // --------------------------------------------------------
  // updateAdminAction
  // --------------------------------------------------------

  describe("updateAdminAction", () => {
    it("should update admin with valid data", async () => {
      mockPrismaAdmin.findUnique
        .mockResolvedValueOnce(testAdmin) // Admin existe
        .mockResolvedValueOnce(null); // Email no duplicado
      mockPrismaAdmin.update.mockResolvedValue(testAdmin);

      const result = await updateAdminAction("admin-123", {
        name: "Updated Name",
        email: "updated@test.com",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Admin updated successfully.");
      expect(mockRevalidatePath).toHaveBeenCalledWith("/settings");
    });

    it("should reject when admin not found", async () => {
      mockPrismaAdmin.findUnique.mockResolvedValue(null);

      const result = await updateAdminAction("nonexistent-id", {
        name: "Test",
        email: "test@test.com",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Admin not found.");
    });

    it("should reject duplicate email when changing email", async () => {
      const existingAdmin = { ...testAdmin, email: "existing@test.com" };
      mockPrismaAdmin.findUnique
        .mockResolvedValueOnce(testAdmin) // Admin existe
        .mockResolvedValueOnce(existingAdmin); // Email ya usado

      const result = await updateAdminAction("admin-123", {
        name: "Test",
        email: "existing@test.com",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("This email is already in use.");
    });

    it("should allow keeping same email", async () => {
      mockPrismaAdmin.findUnique.mockResolvedValue(testAdmin);
      mockPrismaAdmin.update.mockResolvedValue(testAdmin);

      const result = await updateAdminAction("admin-123", {
        name: "New Name",
        email: testAdmin.email, // Mismo email
      });

      expect(result.success).toBe(true);
    });
  });

  // --------------------------------------------------------
  // deleteAdminAction
  // --------------------------------------------------------

  describe("deleteAdminAction", () => {
    it("should delete admin successfully", async () => {
      mockPrismaAdmin.count.mockResolvedValue(2); // Hay más de 1 admin
      mockPrismaAdmin.delete.mockResolvedValue(testAdmin);

      const result = await deleteAdminAction("other-admin-id");

      expect(result.success).toBe(true);
      expect(result.message).toBe("Admin deleted successfully.");
      expect(mockRevalidatePath).toHaveBeenCalledWith("/settings");
    });

    it("should prevent deleting yourself", async () => {
      const result = await deleteAdminAction(testAdmin.id);

      expect(result.success).toBe(false);
      expect(result.message).toBe("You cannot delete your own account.");
    });

    it("should prevent deleting last admin", async () => {
      mockPrismaAdmin.count.mockResolvedValue(1); // Solo 1 admin

      const result = await deleteAdminAction("other-admin-id");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Cannot delete the last admin account.");
    });
  });

  // --------------------------------------------------------
  // changePasswordAction
  // --------------------------------------------------------

  describe("changePasswordAction", () => {
    it("should change password with valid data", async () => {
      mockPrismaAdmin.findUnique.mockResolvedValue({
        ...testAdmin,
        password: "hashed_OldPassword123!",
      });
      mockPrismaAdmin.update.mockResolvedValue(testAdmin);

      const result = await changePasswordAction({
        currentPassword: "OldPassword123!",
        newPassword: "NewSecure456@",
        confirmPassword: "NewSecure456@",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Password changed successfully.");
    });

    it("should reject incorrect current password", async () => {
      mockPrismaAdmin.findUnique.mockResolvedValue({
        ...testAdmin,
        password: "hashed_CorrectPassword123!",
      });

      const result = await changePasswordAction({
        currentPassword: "WrongPassword123!",
        newPassword: "NewSecure456@",
        confirmPassword: "NewSecure456@",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Current password is incorrect.");
    });

    it("should reject mismatched passwords", async () => {
      const result = await changePasswordAction({
        currentPassword: "OldPassword123!",
        newPassword: "NewSecure456@",
        confirmPassword: "DifferentPassword789#",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Passwords don't match");
    });

    it("should reject weak new password", async () => {
      const result = await changePasswordAction({
        currentPassword: "OldPassword123!",
        newPassword: "weak",
        confirmPassword: "weak",
      });

      expect(result.success).toBe(false);
    });

    it("should reject empty current password", async () => {
      const result = await changePasswordAction({
        currentPassword: "",
        newPassword: "NewSecure456@",
        confirmPassword: "NewSecure456@",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Current password is required");
    });
  });
});
