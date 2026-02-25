/**
 * Unit Tests for Phone Utilities
 *
 * Unit tests verify individual functions in isolation.
 * They should be:
 * - Fast (no external dependencies)
 * - Deterministic (same input = same output)
 * - Independent (don't rely on other tests)
 */

import { describe, it, expect } from "vitest";
import {
  normalizePhone,
  formatPhone,
  formatPhoneForTel,
  isValidUSPhone,
} from "@/lib/utils/phone";

// ============================================================================
// normalizePhone - Removes all non-digits, strips country code
// ============================================================================
describe("normalizePhone", () => {
  it("should remove all non-digit characters", () => {
    expect(normalizePhone("(832) 546-5983")).toBe("8325465983");
    expect(normalizePhone("832-546-5983")).toBe("8325465983");
    expect(normalizePhone("832.546.5983")).toBe("8325465983");
    expect(normalizePhone("832 546 5983")).toBe("8325465983");
  });

  it("should remove US country code (+1 or 1)", () => {
    expect(normalizePhone("+1 (832) 546-5983")).toBe("8325465983");
    expect(normalizePhone("1-832-546-5983")).toBe("8325465983");
    expect(normalizePhone("18325465983")).toBe("8325465983");
  });

  it("should return digits as-is if already clean", () => {
    expect(normalizePhone("8325465983")).toBe("8325465983");
  });

  it("should handle edge cases", () => {
    expect(normalizePhone("")).toBe("");
    expect(normalizePhone("abc")).toBe("");
  });
});

// ============================================================================
// formatPhone - Formats to (XXX) XXX-XXXX
// ============================================================================
describe("formatPhone", () => {
  it("should format a 10-digit number correctly", () => {
    expect(formatPhone("8325465983")).toBe("(832) 546-5983");
  });

  it("should normalize and format mixed input", () => {
    expect(formatPhone("(832) 546-5983")).toBe("(832) 546-5983");
    expect(formatPhone("+1-832-546-5983")).toBe("(832) 546-5983");
  });

  it("should return original if not 10 digits", () => {
    expect(formatPhone("12345")).toBe("12345");
    expect(formatPhone("123456789012")).toBe("123456789012");
    expect(formatPhone("invalid")).toBe("invalid");
  });
});

// ============================================================================
// formatPhoneForTel - Formats for tel: links (+1XXXXXXXXXX)
// ============================================================================
describe("formatPhoneForTel", () => {
  it("should add +1 prefix to 10-digit number", () => {
    expect(formatPhoneForTel("8325465983")).toBe("+18325465983");
  });

  it("should normalize input before formatting", () => {
    expect(formatPhoneForTel("(832) 546-5983")).toBe("+18325465983");
    expect(formatPhoneForTel("+1-832-546-5983")).toBe("+18325465983");
  });

  it("should return original if not 10 digits", () => {
    expect(formatPhoneForTel("12345")).toBe("12345");
    expect(formatPhoneForTel("invalid")).toBe("invalid");
  });
});

// ============================================================================
// isValidUSPhone - Validates US phone numbers
// ============================================================================
describe("isValidUSPhone", () => {
  it("should accept valid US phone numbers", () => {
    expect(isValidUSPhone("8325465983")).toBe(true);
    expect(isValidUSPhone("(832) 546-5983")).toBe(true);
    expect(isValidUSPhone("832-546-5983")).toBe(true);
    expect(isValidUSPhone("832.546.5983")).toBe(true);
  });

  it("should reject numbers with invalid area code (starts with 0 or 1)", () => {
    expect(isValidUSPhone("0325465983")).toBe(false);
    expect(isValidUSPhone("1325465983")).toBe(false);
  });

  it("should reject numbers with invalid exchange code (starts with 0 or 1)", () => {
    expect(isValidUSPhone("8320465983")).toBe(false);
    expect(isValidUSPhone("8321465983")).toBe(false);
  });

  it("should reject numbers that are not 10 digits", () => {
    expect(isValidUSPhone("12345")).toBe(false);
    expect(isValidUSPhone("123456789012")).toBe(false);
    expect(isValidUSPhone("")).toBe(false);
  });

  it("should reject numbers with country code", () => {
    // The function expects exactly 10 digits after removing non-digits
    // +1 adds an extra digit
    expect(isValidUSPhone("+18325465983")).toBe(false);
  });
});
