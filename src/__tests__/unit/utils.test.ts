/**
 * Unit Tests for General Utilities
 *
 * These test pure utility functions that:
 * - Take input and return output
 * - Have no side effects
 * - Don't depend on external services
 */

import { describe, it, expect } from "vitest";
import {
  formatRating,
  formatReviewsCount,
  capitalize,
  truncate,
  formatPhoneNumber,
  isValidEmail,
  isValidPhone,
  uniqueArray,
  chunkArray,
  deepClone,
  isEmptyObject,
  formatCurrency,
} from "@/lib/utils/utils";

// ============================================================================
// FORMATTERS
// ============================================================================
describe("formatRating", () => {
  it("should format rating to one decimal place", () => {
    expect(formatRating(5)).toBe("5.0");
    expect(formatRating(4.8)).toBe("4.8");
    // Note: JavaScript toFixed uses "round half to even" (banker's rounding)
    // 4.85 in floating point is actually 4.8499999... so it rounds to 4.8
    expect(formatRating(4.85)).toBe("4.8");
    expect(formatRating(4.86)).toBe("4.9"); // This does round up
    expect(formatRating(3.14159)).toBe("3.1");
  });
});

describe("formatReviewsCount", () => {
  it("should return count as string for small numbers", () => {
    expect(formatReviewsCount(199)).toBe("199");
    expect(formatReviewsCount(999)).toBe("999");
  });

  it("should format to K for thousands", () => {
    expect(formatReviewsCount(1000)).toBe("1.0K");
    expect(formatReviewsCount(1500)).toBe("1.5K");
    expect(formatReviewsCount(12345)).toBe("12.3K");
  });
});

describe("formatCurrency", () => {
  it("should format numbers as USD currency", () => {
    expect(formatCurrency(100)).toBe("$100.00");
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("should handle decimals correctly", () => {
    expect(formatCurrency(99.99)).toBe("$99.99");
    expect(formatCurrency(99.999)).toBe("$100.00"); // Rounds
  });
});

// ============================================================================
// STRING UTILITIES
// ============================================================================
describe("capitalize", () => {
  it("should capitalize first letter and lowercase rest", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("HELLO")).toBe("Hello");
    expect(capitalize("hELLO")).toBe("Hello");
  });

  it("should handle edge cases", () => {
    expect(capitalize("")).toBe("");
    expect(capitalize("a")).toBe("A");
  });
});

describe("truncate", () => {
  it("should truncate long strings with ellipsis", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
    expect(truncate("This is a long text", 10)).toBe("This is a ...");
  });

  it("should return original string if shorter than length", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
    expect(truncate("Hello", 5)).toBe("Hello");
  });
});

describe("formatPhoneNumber", () => {
  it("should format 11-digit number with country code", () => {
    // Input: 1-281-555-4321 → Output: +1 (281) 555-4321
    expect(formatPhoneNumber("12815554321")).toBe("+1 (281) 555-4321");
  });

  it("should return original if format doesn't match", () => {
    expect(formatPhoneNumber("1234567")).toBe("1234567");
    expect(formatPhoneNumber("invalid")).toBe("invalid");
  });
});

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================
describe("isValidEmail", () => {
  it("should accept valid email addresses", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@domain.org")).toBe(true);
    expect(isValidEmail("user+tag@example.com")).toBe(true);
  });

  it("should reject invalid email addresses", () => {
    expect(isValidEmail("invalid")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user@.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("should accept valid US phone formats", () => {
    expect(isValidPhone("(281) 235-4684")).toBe(true);
    expect(isValidPhone("281-235-4684")).toBe(true);
    expect(isValidPhone("281.235.4684")).toBe(true);
    expect(isValidPhone("2812354684")).toBe(true);
    expect(isValidPhone("+1 281-235-4684")).toBe(true);
  });

  it("should reject invalid phone formats", () => {
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("invalid")).toBe(false);
  });
});

// ============================================================================
// ARRAY UTILITIES
// ============================================================================
describe("uniqueArray", () => {
  it("should remove duplicates from array", () => {
    expect(uniqueArray([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(uniqueArray(["a", "b", "a"])).toEqual(["a", "b"]);
  });

  it("should return same array if no duplicates", () => {
    expect(uniqueArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("should handle empty array", () => {
    expect(uniqueArray([])).toEqual([]);
  });
});

describe("chunkArray", () => {
  it("should split array into chunks of specified size", () => {
    expect(chunkArray([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect(chunkArray([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  it("should handle array smaller than chunk size", () => {
    expect(chunkArray([1, 2], 5)).toEqual([[1, 2]]);
  });

  it("should handle empty array", () => {
    expect(chunkArray([], 3)).toEqual([]);
  });
});

// ============================================================================
// OBJECT UTILITIES
// ============================================================================
describe("deepClone", () => {
  it("should create a deep copy of an object", () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
  });

  it("should handle arrays", () => {
    const original = [1, [2, 3], { a: 4 }];
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });
});

describe("isEmptyObject", () => {
  it("should return true for empty object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("should return false for non-empty object", () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
    expect(isEmptyObject({ a: undefined })).toBe(false);
  });
});
