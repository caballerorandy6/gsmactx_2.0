/**
 * Unit Tests para Admin Schemas
 *
 * PROPÓSITO: Verificar que los schemas de Zod validan correctamente
 * los datos de entrada para operaciones de admin.
 *
 * TIPO: Unit Test (prueba funciones aisladas)
 * DEPENDENCIAS: Solo Zod (no necesita mocks de BD ni servicios externos)
 *
 * IMPORTAMOS los schemas reales del proyecto - NO los recreamos.
 * Esto garantiza que testeamos exactamente lo que usa la aplicación.
 */

import { describe, it, expect } from "vitest";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
} from "@/lib/validations/zod";

// ============================================================
// Tests para CreateAdminSchema
// ============================================================

describe("CreateAdminSchema", () => {
  // ----------------------------------------------------------
  // CASOS VÁLIDOS (Happy Path)
  // ----------------------------------------------------------

  it("should accept valid admin data", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      password: "SecurePass123!",
    };

    const result = CreateAdminSchema.safeParse(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("John Doe");
      expect(result.data.email).toBe("john@example.com");
    }
  });

  it("should accept password with various special characters", () => {
    const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "_"];

    specialChars.forEach((char) => {
      const data = {
        name: "Test User",
        email: "test@test.com",
        password: `Password1${char}`,
      };

      const result = CreateAdminSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ----------------------------------------------------------
  // VALIDACIÓN DE NOMBRE
  // ----------------------------------------------------------

  it("should reject name shorter than 2 characters", () => {
    const data = {
      name: "A",
      email: "john@example.com",
      password: "SecurePass123!",
    };

    const result = CreateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      const nameError = result.error.issues.find((i) => i.path[0] === "name");
      expect(nameError?.message).toBe("Name must be at least 2 characters");
    }
  });

  it("should reject empty name", () => {
    const data = {
      name: "",
      email: "john@example.com",
      password: "SecurePass123!",
    };

    const result = CreateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  // ----------------------------------------------------------
  // VALIDACIÓN DE EMAIL
  // ----------------------------------------------------------

  it("should reject invalid email formats", () => {
    const invalidEmails = [
      "notanemail",
      "missing@domain",
      "@nodomain.com",
      "spaces in@email.com",
    ];

    invalidEmails.forEach((email) => {
      const data = {
        name: "John Doe",
        email,
        password: "SecurePass123!",
      };

      const result = CreateAdminSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  it("should accept valid email formats", () => {
    const validEmails = [
      "simple@example.com",
      "user.name@domain.com",
      "user+tag@example.org",
    ];

    validEmails.forEach((email) => {
      const data = {
        name: "John Doe",
        email,
        password: "SecurePass123!",
      };

      const result = CreateAdminSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ----------------------------------------------------------
  // VALIDACIÓN DE PASSWORD (Crítico para seguridad)
  // ----------------------------------------------------------

  it("should reject password shorter than 8 characters", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      password: "Short1!",
    };

    const result = CreateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject password without uppercase letter", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      password: "lowercase123!",
    };

    const result = CreateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject password without number", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      password: "NoNumbersHere!",
    };

    const result = CreateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject password without special character", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      password: "NoSpecial123",
    };

    const result = CreateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Tests para UpdateAdminSchema
// ============================================================

describe("UpdateAdminSchema", () => {
  it("should accept valid update data", () => {
    const data = {
      name: "Updated Name",
      email: "updated@example.com",
    };

    const result = UpdateAdminSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should not require password field", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
    };

    const result = UpdateAdminSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject if name is missing", () => {
    const data = {
      email: "john@example.com",
    };

    const result = UpdateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should reject if email is missing", () => {
    const data = {
      name: "John Doe",
    };

    const result = UpdateAdminSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Tests para ChangePasswordSchema
// ============================================================

describe("ChangePasswordSchema", () => {
  it("should accept valid password change data", () => {
    const data = {
      currentPassword: "OldPassword123!",
      newPassword: "NewSecure456@",
      confirmPassword: "NewSecure456@",
    };

    const result = ChangePasswordSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject when passwords don't match", () => {
    const data = {
      currentPassword: "OldPassword123!",
      newPassword: "NewSecure456@",
      confirmPassword: "DifferentPassword789#",
    };

    const result = ChangePasswordSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (!result.success) {
      const matchError = result.error.issues.find(
        (i) => i.path[0] === "confirmPassword"
      );
      expect(matchError?.message).toBe("Passwords don't match");
    }
  });

  it("should reject empty current password", () => {
    const data = {
      currentPassword: "",
      newPassword: "NewSecure456@",
      confirmPassword: "NewSecure456@",
    };

    const result = ChangePasswordSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should validate new password requirements", () => {
    const data = {
      currentPassword: "OldPassword123!",
      newPassword: "weak",
      confirmPassword: "weak",
    };

    const result = ChangePasswordSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Tests para ResetPasswordSchema
// ============================================================

describe("ResetPasswordSchema", () => {
  it("should accept valid reset password data", () => {
    const data = {
      password: "NewSecure123!",
      confirmPassword: "NewSecure123!",
    };

    const result = ResetPasswordSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject mismatched passwords", () => {
    const data = {
      password: "NewSecure123!",
      confirmPassword: "Different456@",
    };

    const result = ResetPasswordSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should enforce all password requirements", () => {
    const weakPasswords = [
      "short1!",
      "nouppercase123!",
      "NoNumbers!",
      "NoSpecial123",
    ];

    weakPasswords.forEach((password) => {
      const data = { password, confirmPassword: password };
      const result = ResetPasswordSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
