/**
 * Integration Tests for Zod Schemas
 *
 * Integration tests verify how multiple parts work together.
 * Here we test Zod schemas that:
 * - Combine multiple validation rules
 * - Transform data
 * - Work with custom refinements
 *
 * These are "integration" because they test the validation layer
 * that sits between user input and database operations.
 */

import { describe, it, expect } from "vitest";
import {
  UserSchema,
  AdminSchema,
  AppointmentBaseSchema,
  PublicAppointmentSchema,
  SERVICE_TYPES,
  APPOINTMENT_STATUSES,
} from "@/lib/validations/zod";

// ============================================================================
// UserSchema - Contact Form Validation
// ============================================================================
describe("UserSchema", () => {
  const validUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "8325465983",
    message: "I need AC repair",
    subscribe: true,
  };

  it("should accept valid user data", () => {
    const result = UserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should reject missing required fields", () => {
    const result = UserSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = UserSchema.safeParse({
      ...validUser,
      email: "invalid-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("email");
    }
  });

  it("should reject short names", () => {
    const result = UserSchema.safeParse({
      ...validUser,
      firstName: "J", // Too short (min 2)
    });
    expect(result.success).toBe(false);
  });

  it("should allow optional message", () => {
    const { message, ...userWithoutMessage } = validUser;
    const result = UserSchema.safeParse(userWithoutMessage);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// AdminSchema - Admin Login Validation
// ============================================================================
describe("AdminSchema", () => {
  it("should accept valid admin credentials", () => {
    const result = AdminSchema.safeParse({
      email: "admin@gsmactx.com",
      password: "SecurePass1!",
    });
    expect(result.success).toBe(true);
  });

  it("should reject password without uppercase", () => {
    const result = AdminSchema.safeParse({
      email: "admin@gsmactx.com",
      password: "securepass1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain(
        "Your password must contain at least one uppercase letter"
      );
    }
  });

  it("should reject password without number", () => {
    const result = AdminSchema.safeParse({
      email: "admin@gsmactx.com",
      password: "SecurePass!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain(
        "Your password must contain at least one number"
      );
    }
  });

  it("should reject password without symbol", () => {
    const result = AdminSchema.safeParse({
      email: "admin@gsmactx.com",
      password: "SecurePass1",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain(
        "Password must contain at least one symbol (e.g. !, @, #)"
      );
    }
  });

  it("should reject password shorter than 8 characters", () => {
    const result = AdminSchema.safeParse({
      email: "admin@gsmactx.com",
      password: "Pass1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain(
        "Your password must contain at least 8 characters"
      );
    }
  });
});

// ============================================================================
// AppointmentBaseSchema - Appointment Validation
// ============================================================================
describe("AppointmentBaseSchema", () => {
  const validAppointment = {
    clientName: "Jane Smith",
    clientEmail: "jane@example.com",
    clientPhone: "2815554321",
    serviceType: "AC_REPAIR" as const,
    scheduledDate: "2024-12-25",
    scheduledTime: "10:00",
    address: "123 Main St, Houston, TX 77001",
    notes: "Please call before arriving",
  };

  it("should accept valid appointment data", () => {
    const result = AppointmentBaseSchema.safeParse(validAppointment);
    expect(result.success).toBe(true);
  });

  it("should accept all valid service types", () => {
    SERVICE_TYPES.forEach((serviceType) => {
      const result = AppointmentBaseSchema.safeParse({
        ...validAppointment,
        serviceType,
      });
      expect(result.success).toBe(true);
    });
  });

  it("should accept all valid appointment statuses", () => {
    APPOINTMENT_STATUSES.forEach((status) => {
      const result = AppointmentBaseSchema.safeParse({
        ...validAppointment,
        status,
      });
      expect(result.success).toBe(true);
    });
  });

  it("should reject invalid service type", () => {
    const result = AppointmentBaseSchema.safeParse({
      ...validAppointment,
      serviceType: "INVALID_SERVICE",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid phone number", () => {
    const result = AppointmentBaseSchema.safeParse({
      ...validAppointment,
      clientPhone: "123", // Too short
    });
    expect(result.success).toBe(false);
  });

  it("should reject short address", () => {
    const result = AppointmentBaseSchema.safeParse({
      ...validAppointment,
      address: "123", // Min 5 characters
    });
    expect(result.success).toBe(false);
  });

  it("should allow optional notes", () => {
    const { notes, ...appointmentWithoutNotes } = validAppointment;
    const result = AppointmentBaseSchema.safeParse(appointmentWithoutNotes);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// PublicAppointmentSchema - Public Booking Form
// ============================================================================
describe("PublicAppointmentSchema", () => {
  const validPublicAppointment = {
    clientName: "Bob Wilson",
    clientEmail: "bob@example.com",
    clientPhone: "8325551234",
    serviceType: "FREE_ESTIMATE" as const,
    scheduledDate: "2024-12-30",
    scheduledTime: "14:00",
    address: "456 Oak Ave, Cypress, TX 77433",
  };

  it("should accept valid public appointment", () => {
    const result = PublicAppointmentSchema.safeParse(validPublicAppointment);
    expect(result.success).toBe(true);
  });

  it("should NOT have id field (omitted)", () => {
    const result = PublicAppointmentSchema.safeParse({
      ...validPublicAppointment,
      id: "some-id",
    });
    // The id should be stripped, but parse should still succeed
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("id");
    }
  });

  it("should NOT have status field (omitted)", () => {
    const result = PublicAppointmentSchema.safeParse({
      ...validPublicAppointment,
      status: "PENDING",
    });
    // The status should be stripped, but parse should still succeed
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("status");
    }
  });
});

// ============================================================================
// Edge Cases and Security
// ============================================================================
describe("Schema Security", () => {
  it("should handle XSS attempt in message field", () => {
    const result = UserSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "8325465983",
      message: "<script>alert('xss')</script>",
      subscribe: false,
    });
    // Schema accepts the string (sanitization should happen elsewhere)
    expect(result.success).toBe(true);
  });

  it("should handle SQL injection attempt in email", () => {
    const result = UserSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "'; DROP TABLE users; --",
      phone: "8325465983",
      subscribe: false,
    });
    // Email validation should reject this
    expect(result.success).toBe(false);
  });

  it("should handle very long strings", () => {
    const longString = "a".repeat(10000);
    const result = UserSchema.safeParse({
      firstName: longString,
      lastName: "Doe",
      email: "john@example.com",
      phone: "8325465983",
      subscribe: false,
    });
    // Schema accepts (length validation should be added if needed)
    expect(result.success).toBe(true);
  });
});
